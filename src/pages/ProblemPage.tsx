import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Problem, Profile, RunCodeResponse, SubmissionHistoryEntry, TestCase } from "../lib/types";
import { useCollabRoom } from "../lib/useCollabRoom";
import Header from "../components/Header";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditor from "../components/CodeEditor";
import TestsPanel from "../components/TestsPanel";
import Confetti from "../components/Confetti";
import Spinner from "../components/Spinner";

interface ProblemPageProps {
  session: Session;
}

// Cada caso de teste tem até 15s pra responder no backend (ver run-code);
// esse teto do lado do cliente cobre vários casos em sequência com folga.
const RUN_TIMEOUT_MS = 90000;

export default function ProblemPage({ session }: ProblemPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [sampleTests, setSampleTests] = useState<TestCase[]>([]);
  const [history, setHistory] = useState<SubmissionHistoryEntry[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [testsHeight, setTestsHeight] = useState(268);
  const [celebrating, setCelebrating] = useState(false);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const draggingRef = useRef(false);
  const celebrateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const room = useCollabRoom(problem?.id ?? null, session.user.id, problem?.starter_code ?? "");

  useEffect(() => {
    if (!slug) return;

    setProblem(null);
    setLoadError(null);

    (async () => {
      const [
        { data: profilesData, error: profilesError },
        { data: problemData, error: problemError },
      ] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("problems").select("*").eq("slug", slug).single(),
      ]);

      if (profilesError) console.error("erro ao buscar profiles:", profilesError);
      if (profilesData) setProfiles(profilesData as Profile[]);

      if (problemError) console.error("erro ao buscar problems:", problemError);

      if (problemData) {
        const p = problemData as Problem;
        setProblem(p);

        const { data: testsData, error: testsError } = await supabase
          .from("test_cases")
          .select("*")
          .eq("problem_id", p.id)
          .eq("is_sample", true)
          .order("order_index");

        if (testsError) console.error("erro ao buscar test_cases:", testsError);
        if (testsData) setSampleTests(testsData as TestCase[]);

        await fetchHistory(p.id);
      } else {
        setLoadError(
          problemError
            ? `Erro ao buscar problema: ${problemError.message}`
            : "Problema não encontrado.",
        );
      }
    })();
  }, [slug]);

  async function fetchHistory(problemId: string) {
    const { data, error } = await supabase
      .from("submissions")
      .select("id, user_id, status, created_at")
      .eq("problem_id", problemId)
      .order("created_at", { ascending: false })
      .limit(15);

    if (error) console.error("erro ao buscar histórico de envios:", error);
    if (data) setHistory(data as SubmissionHistoryEntry[]);
  }

  async function handleRun() {
    if (!problem || !room.isPilot) return;
    room.setRunning();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RUN_TIMEOUT_MS);

    let data: RunCodeResponse | null = null;
    let error: { message: string } | null = null;
    try {
      const res = await supabase.functions.invoke<RunCodeResponse>("run-code", {
        body: { problem_id: problem.id, code: room.state.code },
        signal: controller.signal,
      });
      data = res.data;
      error = res.error;
    } catch (err) {
      const timedOut = err instanceof Error && err.name === "AbortError";
      error = {
        message: timedOut
          ? `sem resposta em ${RUN_TIMEOUT_MS / 1000}s — o compilador público pode estar sobrecarregado, tente de novo`
          : String(err),
      };
    } finally {
      clearTimeout(timeoutId);
    }

    if (error || !data) {
      room.setResult([
        {
          name: "execução",
          passed: false,
          status: "ERRO",
          time: "",
          input: "-",
          expected: "-",
          received: error?.message ?? "falha ao chamar run-code",
        },
      ]);
      return;
    }

    room.setResult(data.results);
    fetchHistory(problem.id);

    if (data.results.length > 0 && data.results.every((r) => r.passed)) {
      celebrate();
    }
  }

  function celebrate() {
    if (celebrateTimeoutRef.current) clearTimeout(celebrateTimeoutRef.current);
    setCelebrateKey((k) => k + 1);
    setCelebrating(true);
    celebrateTimeoutRef.current = setTimeout(() => setCelebrating(false), 2800);
  }

  useEffect(() => {
    return () => {
      if (celebrateTimeoutRef.current) clearTimeout(celebrateTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (room.isPilot && room.state.phase !== "running") handleRun();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function handleReset() {
    if (problem && room.isPilot) room.resetRoom(problem.starter_code);
  }

  function handleResizeStart(e: React.MouseEvent) {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor = "row-resize";
    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);
  }

  function handleResizeMove(e: MouseEvent) {
    if (!draggingRef.current) return;
    const newHeight = window.innerHeight - e.clientY;
    setTestsHeight(Math.min(Math.max(newHeight, 120), window.innerHeight - 260));
  }

  function handleResizeStep(delta: number) {
    setTestsHeight((h) => Math.min(Math.max(h + delta, 120), window.innerHeight - 260));
  }

  function handleResizeEnd() {
    draggingRef.current = false;
    document.body.style.cursor = "";
    window.removeEventListener("mousemove", handleResizeMove);
    window.removeEventListener("mouseup", handleResizeEnd);
  }

  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center bg-dojo-bg font-sans text-sm text-dojo-red">
        {loadError}
      </div>
    );
  }

  if (!problem) {
    return (
      <div role="status" aria-live="polite" className="animate-dojo-fade flex h-screen flex-col items-center justify-center gap-3 bg-dojo-bg font-sans text-sm text-dojo-textDim">
        <Spinner />
        Carregando problema...
      </div>
    );
  }

  const pilotProfile = profiles.find((p) => p.id === room.pilotId);
  const presentProfiles = room.participantIds
    .map((id) => profiles.find((p) => p.id === id))
    .filter((p): p is Profile => Boolean(p));

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-dojo-bg font-sans text-dojo-text">
      {celebrating && <Confetti key={celebrateKey} />}
      <Header profiles={profiles} subtitle={problem.tags.join(" · ")} />

      <div className="flex flex-none flex-col gap-2 border-b border-dojo-border bg-dojo-panel px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex">
            {presentProfiles.map((p) => (
              <div
                key={p.id}
                title={p.id === room.pilotId ? `${p.display_name} (piloto)` : p.display_name}
                className="relative -ml-1.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-dojo-panel text-[9px] font-semibold first:ml-0"
                style={{ background: p.avatar_color, color: "#ffffff" }}
              >
                {p.avatar_initials}
                {p.id === room.pilotId && (
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-dojo-accent text-[7px]" title="Piloto">
                    🚗
                  </span>
                )}
              </div>
            ))}
          </div>
          <span className="text-[12px] text-dojo-textDim">
            {presentProfiles.length} {presentProfiles.length === 1 ? "pessoa" : "pessoas"} na sala
          </span>
        </div>

        {room.isPilot ? (
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-dojo-accent">🚗 Você é o piloto — pode editar e executar</span>
        ) : (
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[12px] text-dojo-textDim">
              {pilotProfile ? `${pilotProfile.display_name} é o piloto` : "aguardando piloto"} — você está no modo copiloto
            </span>
            <button
              onClick={room.claimPilot}
              className="rounded-md bg-dojo-accentSolid px-2.5 py-1 text-[11.5px] font-semibold text-white transition hover:brightness-110 active:scale-95"
            >
              Pegar o volante
            </button>
          </div>
        )}
      </div>

      <main className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[minmax(360px,42%)_1fr] md:overflow-hidden">
        <ProblemPanel problem={problem} sampleTests={sampleTests} history={history} profiles={profiles} />

        <section aria-label="Editor e testes" className="flex min-h-0 flex-col bg-dojo-bg">
          <CodeEditor code={room.state.code} onChange={room.updateCode} readOnly={!room.isPilot} />
          <TestsPanel
            phase={room.state.phase}
            rows={room.state.rows}
            height={testsHeight}
            canRun={room.isPilot}
            onRun={handleRun}
            onReset={handleReset}
            onResizeStart={handleResizeStart}
            onResizeStep={handleResizeStep}
          />
        </section>
      </main>

      <button
        onClick={() => supabase.auth.signOut()}
        className="fixed bottom-2 right-2 rounded border border-dojo-border2 bg-dojo-panel px-2 py-1 font-mono text-[10px] text-dojo-textDim hover:text-dojo-textBright"
        title={session.user.email}
      >
        sair
      </button>
    </div>
  );
}
