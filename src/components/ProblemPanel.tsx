import type { Difficulty, Problem, TestCase } from "../lib/types";

const DIFFICULTY_PALETTE: Record<Difficulty, [string, string, string]> = {
  Fácil: ["rgba(35,134,54,0.16)", "#5ac37a", "rgba(90,195,122,0.35)"],
  Médio: ["rgba(191,135,0,0.16)", "#e2b93b", "rgba(226,185,59,0.35)"],
  Difícil: ["rgba(191,45,45,0.16)", "#f07171", "rgba(240,113,113,0.35)"],
};

interface ProblemPanelProps {
  problem: Problem;
  sampleTests: TestCase[];
}

export default function ProblemPanel({ problem, sampleTests }: ProblemPanelProps) {
  const [diffBg, diffFg, diffBorder] = DIFFICULTY_PALETTE[problem.difficulty];

  return (
    <section className="min-h-0 overflow-y-auto border-b border-dojo-border bg-dojo-bg md:border-b-0 md:border-r">
      <div className="flex max-w-[640px] flex-col gap-[22px] px-4 pb-10 pt-6 sm:px-8 sm:pt-7">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-dojo-textDim">
            <span>PROBLEMA</span>
            <span className="text-[#4a4a4a]">/</span>
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
                className="rounded-full border border-dojo-border2 bg-[#171717] px-2.5 py-[3px] text-[11px] text-[#b3b3b3]"
              >
                {tag}
              </span>
            ))}
            <span className="rounded-full border border-dojo-border2 bg-[#171717] px-2.5 py-[3px] text-[11px] text-[#b3b3b3]">
              {problem.time_limit_ms / 1000}s · {problem.memory_limit_mb}MB
            </span>
          </div>
        </div>

        <div className="h-px bg-dojo-border" />

        <div className="flex flex-col gap-3.5 text-sm leading-[1.68] text-[#dcdcdc]">
          {problem.description.split("\n\n").map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sampleTests.map((tc) => (
            <div key={tc.id} className="overflow-hidden rounded-lg border border-dojo-border2 bg-[#0d0d0d]">
              <div className="border-b border-dojo-border2 bg-[#171717] px-3 py-2 text-[11px] font-semibold tracking-[0.04em] text-[#b3b3b3]">
                ENTRADA
              </div>
              <pre className="m-0 p-3 font-mono text-[12.5px] leading-[1.7] text-dojo-text">
                {tc.input}
              </pre>
            </div>
          ))}
          {sampleTests.map((tc) => (
            <div key={tc.id + "-out"} className="overflow-hidden rounded-lg border border-dojo-border2 bg-[#0d0d0d]">
              <div className="border-b border-dojo-border2 bg-[#171717] px-3 py-2 text-[11px] font-semibold tracking-[0.04em] text-[#b3b3b3]">
                SAÍDA
              </div>
              <pre className="m-0 p-3 font-mono text-[12.5px] leading-[1.7] text-[#b5cea8]">
                {tc.expected_output}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
