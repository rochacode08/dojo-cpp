import type { Difficulty, Problem, Profile, SubmissionHistoryEntry, SubmissionStatus, TestCase } from "../lib/types";

const DIFFICULTY_PALETTE: Record<Difficulty, [string, string, string]> = {
  Fácil: ["rgba(35,134,54,0.16)", "#5ac37a", "rgba(90,195,122,0.35)"],
  Médio: ["rgba(191,135,0,0.16)", "#e2b93b", "rgba(226,185,59,0.35)"],
  Difícil: ["rgba(191,45,45,0.16)", "#f07171", "rgba(240,113,113,0.35)"],
};

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
  const [diffBg, diffFg, diffBorder] = DIFFICULTY_PALETTE[problem.difficulty];

  return (
    <section className="min-h-0 overflow-y-auto border-b border-dojo-border bg-dojo-bg md:border-b-0 md:border-r">
      <div className="flex max-w-[640px] flex-col gap-[22px] px-4 pb-10 pt-6 sm:px-8 sm:pt-7">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-dojo-textDim">
            <span>PROBLEMA</span>
            <span className="text-dojo-textSubtle">/</span>
            <span>{problem.tags[0]?.toUpperCase() ?? "GERAL"}</span>
          </div>
          <h1 className="m-0 text-[26px] font-semibold leading-[1.22] tracking-[-0.02em] text-dojo-textBright">
            {problem.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[11px] font-semibold tracking-[0.02em]"
              style={{ background: diffBg, color: diffFg, borderColor: diffBorder }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: diffFg }} />
              {problem.difficulty}
            </span>
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-dojo-border2 bg-dojo-surfaceRaised px-2.5 py-[3px] text-[11px] text-dojo-textDim"
              >
                {tag}
              </span>
            ))}
            <span className="rounded-full border border-dojo-border2 bg-dojo-surfaceRaised px-2.5 py-[3px] text-[11px] text-dojo-textDim">
              {problem.time_limit_ms / 1000}s · {problem.memory_limit_mb}MB
            </span>
          </div>
        </div>

        <div className="h-px bg-dojo-border" />

        <div className="flex flex-col gap-3.5 text-sm leading-[1.68] text-dojo-text">
          {problem.description.split("\n\n").map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sampleTests.map((tc) => (
            <div key={tc.id} className="overflow-hidden rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken">
              <div className="border-b border-dojo-border2 bg-dojo-surfaceRaised px-3 py-2 text-[11px] font-semibold tracking-[0.04em] text-dojo-textDim">
                ENTRADA
              </div>
              <pre className="m-0 p-3 font-mono text-[12.5px] leading-[1.7] text-dojo-text">
                {tc.input}
              </pre>
            </div>
          ))}
          {sampleTests.map((tc) => (
            <div key={tc.id + "-out"} className="overflow-hidden rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken">
              <div className="border-b border-dojo-border2 bg-dojo-surfaceRaised px-3 py-2 text-[11px] font-semibold tracking-[0.04em] text-dojo-textDim">
                SAÍDA
              </div>
              <pre className="m-0 p-3 font-mono text-[12.5px] leading-[1.7]" style={{ color: "var(--dojo-code-output)" }}>
                {tc.expected_output}
              </pre>
            </div>
          ))}
        </div>

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
