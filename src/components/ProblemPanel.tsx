import { useEffect, useState } from "react";
import type { Problem, Profile, SubmissionHistoryEntry, SubmissionStatus, TestCase } from "../lib/types";
import { LANGUAGES } from "../lib/languages";
import { LanguageLogo } from "./Logos";

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  accepted: "Aceito",
  wrong_answer: "Saída errada",
  compile_error: "Erro de compilação",
  runtime_error: "Erro em execução",
  pending: "Pendente",
};

const STATUS_COLOR: Record<SubmissionStatus, string> = {
  accepted: "var(--dojo-green-bright)",
  wrong_answer: "var(--dojo-red)",
  compile_error: "var(--dojo-red)",
  runtime_error: "var(--dojo-red)",
  pending: "var(--dojo-text-dim)",
};

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
}

interface ProblemPanelProps {
  problem: Problem;
  sampleTests: TestCase[];
  history?: SubmissionHistoryEntry[];
  profiles?: Profile[];
}

export default function ProblemPanel({ problem, sampleTests, history = [], profiles = [] }: ProblemPanelProps) {
  const [mode, setMode] = useState<"statement" | "notes">("statement");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setMode("statement");
    setNotes(localStorage.getItem(`dojo-notes-${problem.id}`) ?? "");
  }, [problem.id]);

  function handleNotesChange(value: string) {
    setNotes(value);
    localStorage.setItem(`dojo-notes-${problem.id}`, value);
  }

  return (
    <section aria-label="Enunciado" className="min-h-0 overflow-y-auto border-b border-dojo-border bg-dojo-bg md:border-b-0 md:border-r">
      <div className="flex max-w-[68ch] flex-col gap-6 px-4 pb-10 pt-5 sm:px-7 sm:pt-6">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-dojo-textFaint">
            Enunciado
          </span>
          <span className="rounded-md px-2 py-[3px] text-[12px] text-dojo-textFaint" style={{ background: "var(--dojo-surface-sunken)" }}>
            {problem.time_limit_ms / 1000}s · {problem.memory_limit_mb}MB
          </span>
          <div className="h-px flex-1 bg-dojo-border" />
          <button
            type="button"
            onClick={() => setMode((m) => (m === "statement" ? "notes" : "statement"))}
            title={mode === "statement" ? "Abrir rascunho pessoal" : "Voltar pro enunciado"}
            aria-pressed={mode === "notes"}
            aria-controls="painel-enunciado-conteudo"
            className="flex h-8 flex-none items-center gap-1.5 rounded-lg border border-dojo-border2 bg-dojo-surfaceRaised px-3 text-[13px] font-medium text-dojo-textDim transition hover:bg-dojo-surfaceHover hover:text-dojo-textBright active:scale-95"
          >
            {mode === "statement" ? (
              <>
                <NotebookIcon /> Rascunho
              </>
            ) : (
              <>
                <DocIcon /> Enunciado
              </>
            )}
          </button>
        </div>

        {mode === "statement" ? (
          <div id="painel-enunciado-conteudo" key="statement" className="animate-dojo-fade flex flex-col gap-[22px]">
            <div className="flex flex-col gap-3.5 text-[15px] leading-[1.6] text-dojo-text">
              {problem.description.split("\n\n").map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sampleTests.map((tc) => (
                <div key={tc.id} className="overflow-hidden rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken">
                  <div className="border-b border-dojo-border2 bg-dojo-surfaceRaised px-3 py-2 text-[12px] font-semibold tracking-[0.05em] text-dojo-textDim">
                    ENTRADA
                  </div>
                  <pre className="m-0 p-3 font-mono text-[13.5px] leading-[1.7] text-dojo-text">
                    {tc.input}
                  </pre>
                </div>
              ))}
              {sampleTests.map((tc) => (
                <div key={tc.id + "-out"} className="overflow-hidden rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken">
                  <div className="border-b border-dojo-border2 bg-dojo-surfaceRaised px-3 py-2 text-[12px] font-semibold tracking-[0.05em] text-dojo-textDim">
                    SAÍDA
                  </div>
                  <pre className="m-0 p-3 font-mono text-[12.5px] leading-[1.7]" style={{ color: "var(--dojo-code-output)" }}>
                    {tc.expected_output}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div id="painel-enunciado-conteudo" key="notes" className="animate-dojo-fade flex flex-col gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-dojo-textDim">
              <NotebookIcon />
              Rascunho — só você vê isso, fica salvo neste navegador
            </span>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Rascunhe aqui: ideias, pseudocódigo, contas..."
              aria-label="Rascunho pessoal"
              className="min-h-[320px] w-full resize-y rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken p-4 font-mono text-[13px] leading-[1.8] text-dojo-text outline-none transition focus:ring-2 focus:ring-dojo-accent"
            />
          </div>
        )}

        {problem.hints.length > 0 && <HintsBox key={problem.id} hints={problem.hints} />}

        {history.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="h-px bg-dojo-border" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-dojo-textDim">
              Histórico de envios
            </span>
            <div className="flex flex-col overflow-hidden rounded-lg border border-dojo-border2">
              {history.map((h) => {
                const profile = profiles.find((p) => p.id === h.user_id);
                return (
                  <div
                    key={h.id}
                    className="flex items-center gap-2.5 border-b border-dojo-border2 bg-dojo-surfaceSunken px-3 py-2 text-[12px] last:border-b-0"
                  >
                    <div
                      className="flex h-5 w-5 flex-none items-center justify-center rounded-full text-[8px] font-semibold text-white"
                      style={{ background: profile?.avatar_color ?? "var(--dojo-border2)" }}
                    >
                      {profile?.avatar_initials ?? "?"}
                    </div>
                    <span className="min-w-0 flex-1 truncate text-dojo-text">
                      {profile?.display_name ?? "alguém"}
                    </span>
                    {h.language && (
                      <span
                        className="flex flex-none items-center gap-1 rounded border border-dojo-border2 px-1.5 py-[1px] font-mono text-[10px] text-dojo-textFaint"
                        title={LANGUAGES[h.language].compilerLabel}
                      >
                        <LanguageLogo language={h.language} size={10} />
                        {LANGUAGES[h.language].label}
                      </span>
                    )}
                    <span className="flex-none font-medium" style={{ color: STATUS_COLOR[h.status] }}>
                      {STATUS_LABEL[h.status]}
                    </span>
                    <span className="flex-none text-[11px] text-dojo-textFaint">{relativeTime(h.created_at)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function NotebookIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3h13a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4V3Z" />
      <path d="M4 7h1M4 11h1M4 15h1M4 19h1" />
      <path d="M9 8h7M9 12h7M9 16h4" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  );
}

function HintsBox({ hints }: { hints: string[] }) {
  const [revealed, setRevealed] = useState(0);
  const allRevealed = revealed >= hints.length;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="h-px bg-dojo-border" />
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-dojo-textDim">
        <LightbulbIcon />
        Dicas
      </span>

      {revealed > 0 && (
        <ol className="m-0 flex list-none flex-col gap-2 p-0">
          {hints.slice(0, revealed).map((hint, i) => (
            <li
              key={i}
              className="animate-dojo-fade flex gap-2.5 rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken px-3 py-2.5 text-[13px] leading-[1.6] text-dojo-text"
            >
              <span className="flex-none font-mono text-[12px] font-semibold text-dojo-accent">{i + 1}.</span>
              <span>{hint}</span>
            </li>
          ))}
        </ol>
      )}

      {!allRevealed && (
        <button
          onClick={() => setRevealed((r) => r + 1)}
          className="flex items-center justify-center gap-1.5 self-start rounded-lg border border-dojo-border2 bg-dojo-surfaceRaised px-3.5 py-2 text-[12.5px] font-medium text-dojo-textDim transition hover:bg-dojo-surfaceHover hover:text-dojo-textBright active:scale-95"
        >
          <LightbulbIcon />
          Mostrar dica {revealed + 1} de {hints.length}
        </button>
      )}
    </div>
  );
}
