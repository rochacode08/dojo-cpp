import { useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import type { TestResultRow } from "./types";

export interface RoomState {
  code: string;
  phase: "idle" | "running" | "result";
  rows: TestResultRow[];
}

export interface CursorPosition {
  lineNumber: number;
  column: number;
}

interface PresenceMeta {
  online_at: string;
}

const CODE_BROADCAST_DEBOUNCE_MS = 200;
const CURSOR_BROADCAST_DEBOUNCE_MS = 80;
const STATE_REQUEST_TIMEOUT_MS = 600;

function computePilotId(
  presenceState: Record<string, PresenceMeta[]>,
  overridePilotId: string | null,
): string | null {
  const userIds = Object.keys(presenceState);
  if (userIds.length === 0) return null;
  if (overridePilotId && presenceState[overridePilotId]) return overridePilotId;

  let bestId: string | null = null;
  let bestTime = Infinity;
  for (const userId of userIds) {
    const metas = presenceState[userId];
    const earliest = Math.min(...metas.map((m) => new Date(m.online_at).getTime()));
    if (earliest < bestTime) {
      bestTime = earliest;
      bestId = userId;
    }
  }
  return bestId;
}

export function useCollabRoom(problemId: string | null, userId: string, starterCode: string) {
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [pilotId, setPilotId] = useState<string | null>(null);
  const [state, setState] = useState<RoomState>({ code: starterCode, phase: "idle", rows: [] });
  const [pilotCursor, setPilotCursor] = useState<CursorPosition | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const overridePilotRef = useRef<{ id: string; ts: number } | null>(null);
  const overrideTsRef = useRef(0);
  const hasReceivedStateRef = useRef(false);
  const codeDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPilotRef = useRef(false);
  const pilotIdRef = useRef<string | null>(null);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!problemId) return;

    hasReceivedStateRef.current = false;
    overridePilotRef.current = null;
    pilotIdRef.current = null;
    setState({ code: starterCode, phase: "idle", rows: [] });
    setPilotCursor(null);

    const channel = supabase.channel(`problem:${problemId}`, {
      config: { presence: { key: userId } },
    });
    channelRef.current = channel;

    function recomputePilot() {
      const presenceState = channel.presenceState() as Record<string, PresenceMeta[]>;
      setParticipantIds(Object.keys(presenceState));
      const pilot = computePilotId(presenceState, overridePilotRef.current?.id ?? null);
      if (pilotIdRef.current !== pilot) setPilotCursor(null);
      pilotIdRef.current = pilot;
      setPilotId(pilot);
      isPilotRef.current = pilot === userId;
    }

    channel
      .on("presence", { event: "sync" }, recomputePilot)
      .on("broadcast", { event: "state_sync" }, ({ payload }) => {
        hasReceivedStateRef.current = true;
        setState(payload as RoomState);
      })
      .on("broadcast", { event: "request_state" }, () => {
        if (isPilotRef.current) {
          channel.send({ type: "broadcast", event: "state_sync", payload: stateRef.current });
        }
      })
      .on("broadcast", { event: "pilot_change" }, ({ payload }) => {
        const { userId: newPilot, ts } = payload as { userId: string; ts: number };
        if (ts >= overrideTsRef.current) {
          overrideTsRef.current = ts;
          overridePilotRef.current = { id: newPilot, ts };
          setPilotCursor(null);
          recomputePilot();
        }
      })
      .on("broadcast", { event: "cursor_move" }, ({ payload }) => {
        const { userId: fromId, lineNumber, column } = payload as CursorPosition & { userId: string };
        if (fromId !== userId) setPilotCursor({ lineNumber, column });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
          channel.send({ type: "broadcast", event: "request_state", payload: {} });
          setTimeout(async () => {
            if (hasReceivedStateRef.current) return;

            const { data, error } = await supabase
              .from("problem_drafts")
              .select("code")
              .eq("problem_id", problemId)
              .maybeSingle();

            if (error) console.error("erro ao buscar rascunho salvo:", error);
            if (!hasReceivedStateRef.current) {
              setState({ code: data?.code ?? starterCode, phase: "idle", rows: [] });
            }
          }, STATE_REQUEST_TIMEOUT_MS);
        }
      });

    return () => {
      if (codeDebounceRef.current) clearTimeout(codeDebounceRef.current);
      if (cursorDebounceRef.current) clearTimeout(cursorDebounceRef.current);
      channel.unsubscribe();
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, userId]);

  function broadcastState(next: RoomState) {
    channelRef.current?.send({ type: "broadcast", event: "state_sync", payload: next });
  }

  function broadcastCursor(lineNumber: number, column: number) {
    if (!isPilotRef.current) return;
    if (cursorDebounceRef.current) clearTimeout(cursorDebounceRef.current);
    cursorDebounceRef.current = setTimeout(() => {
      channelRef.current?.send({
        type: "broadcast",
        event: "cursor_move",
        payload: { userId, lineNumber, column },
      });
    }, CURSOR_BROADCAST_DEBOUNCE_MS);
  }

  async function persistDraft(code: string) {
    if (!problemId) return;
    const { error } = await supabase
      .from("problem_drafts")
      .upsert({ problem_id: problemId, code, updated_by: userId, updated_at: new Date().toISOString() });
    if (error) console.error("erro ao salvar rascunho:", error);
  }

  function updateCode(code: string) {
    setState((prev) => {
      const next = { ...prev, code };
      if (codeDebounceRef.current) clearTimeout(codeDebounceRef.current);
      codeDebounceRef.current = setTimeout(() => {
        broadcastState(next);
        persistDraft(code);
      }, CODE_BROADCAST_DEBOUNCE_MS);
      return next;
    });
  }

  function setRunning() {
    setState((prev) => {
      const next: RoomState = { ...prev, phase: "running", rows: [] };
      broadcastState(next);
      return next;
    });
  }

  function setResult(rows: TestResultRow[]) {
    setState((prev) => {
      const next: RoomState = { ...prev, phase: "result", rows };
      broadcastState(next);
      return next;
    });
  }

  function resetRoom(code: string) {
    const next: RoomState = { code, phase: "idle", rows: [] };
    setState(next);
    broadcastState(next);
    persistDraft(code);
  }

  function claimPilot() {
    const ts = Date.now();
    overrideTsRef.current = ts;
    overridePilotRef.current = { id: userId, ts };
    setPilotId(userId);
    isPilotRef.current = true;
    channelRef.current?.send({ type: "broadcast", event: "pilot_change", payload: { userId, ts } });
  }

  return {
    participantIds,
    pilotId,
    isPilot: pilotId === userId,
    state,
    pilotCursor,
    updateCode,
    setRunning,
    setResult,
    resetRoom,
    claimPilot,
    broadcastCursor,
  };
}
