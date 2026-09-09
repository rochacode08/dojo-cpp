import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Language, Problem, Profile, RunCodeResponse, RunMode, SubmissionHistoryEntry, TestCase } from "../lib/types";
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

const DIFFICULTY_COLOR: Record<string, string> = {
  "Fácil": "var(--dojo-green-bright)",
  "Médio": "var(--dojo-amber)",
  "Difícil": "var(--dojo-red)",
};

export default function ProblemPage({ session }: ProblemPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [sampleTests, setSampleTests] = useState<TestCase[]>([]);
  const [history, setHistory] = useState<SubmissionHistoryEntry[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [testsHeight, setTestsHeight] = useState(268);
  // Divisão horizontal entre enunciado e editor, em % da largura. O relatório
  // de UI pediu 42/58 como ponto de partida e a possibilidade de arrastar.
  const [splitPct, setSplitPct] = useState(42);
  // Em telas estreitas os dois painéis não cabem lado a lado: viram abas.
  const [mobileTab, setMobileTab] = useState<"enunciado" | "codigo" | "testes">("enunciado");
  // Rascunho pessoal por problema: fica no navegador de quem escreveu, não no
  // banco — é anotação, não solução compartilhada.
  const [notes, setNotes] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const draggingRef = useRef(false);
  const splitDraggingRef = useRef(false);
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

  useEffect(() => {
    if (!problem) return;
    try {
      setNotes(localStorage.getItem(`dojo-notes-${problem.id}`) ?? "");
    } catch {
      setNotes("");
    }
  }, [problem]);

  function handleNotesChange(value: string) {
    setNotes(value);
    if (!problem) return;
    try {
      localStorage.setItem(`dojo-notes-${problem.id}`, value);
    } catch {
      // navegador sem storage: o rascunho vale só enquanto a aba estiver aberta
    }
  }

  async function fetchHistory(problemId: string) {
    const { data, error } = await supabase
      .from("submissions")
      .select("id, user_id, status, created_at, language")
      .eq("problem_id", problemId)
      .order("created_at", { ascending: false })
      .limit(15);

    if (error) console.error("erro ao buscar histórico de envios:", error);
    if (data) setHistory(data as SubmissionHistoryEntry[]);
  }

  async function handleRun(mode: RunMode) {
    if (!problem || !room.isPilot) return;
    room.setRunning(mode);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RUN_TIMEOUT_MS);

    let data: RunCodeResponse | null = null;
    let error: { message: string } | null = null;
    try {
      const res = await supabase.functions.invoke<RunCodeResponse>("run-code", {
        body: { problem_id: problem.id, code: room.state.code, mode, language: room.state.language },
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
      room.setResult(
        [
          {
            name: "execução",
            passed: false,
            status: "ERRO",
            time: "",
            input: "-",
            expected: "-",
            received: error?.message ?? "falha ao chamar run-code",
          },
        ],
        mode,
        null,
      );
      return;
    }

    room.setResult(data.results, mode, data.provider ?? null);

    // Só "Enviar" grava submissão, então só aí o histórico muda.
    if (mode === "submit") fetchHistory(problem.id);

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
        if (!room.isPilot || room.state.phase === "running") return;
        // Ctrl+Enter testa (iteração rápida); com Shift, envia de verdade.
        handleRun(e.shiftKey ? "submit" : "test");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function handleReset() {
    if (problem && room.isPilot) room.resetRoom(problem.starter_code);
  }

  function handleLanguageChange(language: Language) {
    if (problem && room.isPilot) room.setLanguage(language, problem.starter_code);
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

  function handleSplitStart(e: React.MouseEvent) {
    e.preventDefault();
    splitDraggingRef.current = true;
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", handleSplitMove);
    window.addEventListener("mouseup", handleSplitEnd);
  }

  function handleSplitMove(e: MouseEvent) {
    if (!splitDraggingRef.current) return;
    setSplitPct(Math.min(Math.max((e.clientX / window.innerWidth) * 100, 25), 70));
  }

  function handleSplitStep(delta: number) {
    setSplitPct((v) => Math.min(Math.max(v + delta, 25), 70));
  }

  function handleSplitEnd() {
    splitDraggingRef.current = false;
    document.body.style.cursor = "";
    window.removeEventListener("mousemove", handleSplitMove);
    window.removeEventListener("mouseup", handleSplitEnd);
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
      <Header profiles={profiles} subtitle="" me={profiles.find((p) => p.id === session.user.id) ?? null} />

      {/* Cabeçalho de contexto do desafio: onde estou, o que é, e quem manda */}
      <div className="flex flex-none flex-col gap-2 border-b border-dojo-border bg-dojo-panel px-3 py-2.5 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            title="Voltar para os problemas"
            aria-label="Voltar para os problemas"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-dojo-textDim transition-colors hover:bg-dojo-surfaceHover hover:text-dojo-textBright"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>

          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
              <h1 className="m-0 truncate text-[17px] font-semibold text-dojo-textBright">{problem.title}</h1>
              <span
                className="flex-none rounded-md px-2 py-[2px] text-[11.5px] font-bold uppercase tracking-[0.05em]"
                style={{ color: DIFFICULTY_COLOR[problem.difficulty], background: "var(--dojo-surface-sunken)" }}
              >
                {problem.difficulty}
              </span>
            </div>
            <span className="hidden truncate text-[12.5px] text-dojo-textFaint sm:block">
              {problem.tags.join(" · ")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="flex">
              {presentProfiles.map((p) => (
                <div
                  key={p.id}
                  title={p.id === room.pilotId ? `${p.display_name} (piloto)` : p.display_name}
                  className="relative -ml-1.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border-2 border-dojo-panel text-[10px] font-semibold first:ml-0"
                  style={{ background: p.avatar_color, color: "#ffffff" }}
                >
                  {p.avatar_initials}
                  {p.id === room.pilotId && (
                    <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-dojo-accent text-[8px]" title="Piloto">
                      🚗
                    </span>
                  )}
                </div>
              ))}
            </div>
            <span className="text-[13px] text-dojo-textDim">
              {presentProfiles.length} na sala
            </span>
          </div>

          {room.isPilot ? (
            <span
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13px] font-medium"
              style={{ background: "var(--dojo-accent-soft-bg)", color: "var(--dojo-accent)" }}
            >
              🚗 Você é o piloto
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[13px] text-dojo-textDim">
                {pilotProfile ? `${pilotProfile.display_name} pilota` : "aguardando piloto"} — você é copiloto
              </span>
              <button
                onClick={room.claimPilot}
                className="h-8 rounded-lg bg-dojo-accentSolid px-3 text-[13px] font-semibold text-white transition hover:brightness-110 active:scale-95"
              >
                Pegar o volante
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Abas só no mobile: os dois painéis lado a lado não cabem em 390px */}
      <div className="flex flex-none border-b border-dojo-border bg-dojo-panel md:hidden" role="tablist" aria-label="Seções do desafio">
        {(["enunciado", "codigo", "testes"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={mobileTab === tab}
            onClick={() => setMobileTab(tab)}
            className="flex h-11 flex-1 items-center justify-center text-[13.5px] font-medium capitalize transition-colors"
            style={{
              color: mobileTab === tab ? "var(--dojo-text-bright)" : "var(--dojo-text-dim)",
              borderBottom: `2px solid ${mobileTab === tab ? "var(--dojo-accent)" : "transparent"}`,
            }}
          >
            {tab === "codigo" ? "Código" : tab}
          </button>
        ))}
      </div>

      <main
        className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:overflow-hidden"
        style={{ gridTemplateColumns: undefined }}
      >
        <div
          className="contents md:grid md:min-h-0"
          style={{ gridTemplateColumns: `${splitPct}% 6px 1fr` }}
        >
          <div className={`min-h-0 ${mobileTab === "enunciado" ? "" : "hidden md:block"}`}>
            <ProblemPanel problem={problem} sampleTests={sampleTests} history={history} profiles={profiles} />
          </div>

          {/* Divisor arrastável (só faz sentido com os painéis lado a lado) */}
          <div
            onMouseDown={handleSplitStart}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                handleSplitStep(-4);
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                handleSplitStep(4);
              }
            }}
            role="separator"
            aria-orientation="vertical"
            aria-label="Ajustar a largura do enunciado (setas esquerda/direita)"
            aria-valuenow={Math.round(splitPct)}
            tabIndex={0}
            className="group hidden cursor-col-resize items-center justify-center border-x border-dojo-border bg-dojo-panel focus:outline-none md:flex"
          >
            <div className="h-10 w-[3px] rounded-full bg-dojo-border2 transition-colors group-hover:bg-dojo-accent group-focus-visible:bg-dojo-accent" />
          </div>

          <section
            aria-label="Editor e testes"
            className={`flex min-h-0 flex-col bg-dojo-bg ${mobileTab === "enunciado" ? "hidden md:flex" : ""}`}
          >
          {/* "contents" mantém o filho participando do flex do pai; no mobile
              cada aba esconde o que não é dela. */}
          <div className={mobileTab === "codigo" ? "contents" : "hidden md:contents"}>
          <CodeEditor
            code={room.state.code}
            language={room.state.language}
            onLanguageChange={handleLanguageChange}
            onChange={room.updateCode}
            notes={notes}
            onNotesChange={handleNotesChange}
            readOnly={!room.isPilot}
            onCursorChange={room.isPilot ? room.broadcastCursor : undefined}
            remoteCursor={
              !room.isPilot && room.pilotCursor
                ? { ...room.pilotCursor, label: pilotProfile?.display_name ?? "o piloto" }
                : null
            }
          />
          </div>
          <div className={mobileTab === "testes" ? "contents" : "hidden md:contents"}>
          <TestsPanel
            phase={room.state.phase}
            rows={room.state.rows}
            mode={room.state.mode}
            language={room.state.language}
            provider={room.state.provider}
            height={testsHeight}
            canRun={room.isPilot}
            onRun={handleRun}
            onReset={handleReset}
            onResizeStart={handleResizeStart}
            onResizeStep={handleResizeStep}
          />
          </div>
        </section>
        </div>
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
