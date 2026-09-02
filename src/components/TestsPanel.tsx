import type { TestResultRow } from "../lib/types";

type Phase = "idle" | "running" | "result";

const GCC_LOCATION = /^([^:]+):(\d+):(\d+):\s*(error|warning|note):/;

function formatCompilerOutput(text: string) {
  return text.split("\n").map((line, i) => {
    const m = line.match(GCC_LOCATION);
    if (!m) return <div key={i}>{line || " "}</div>;
    const [, file, ln, col, kind] = m;
    const rest = line.slice(m[0].length);
    const kindColor =
      kind === "error" ? "var(--dojo-red)" : kind === "warning" ? "var(--dojo-amber)" : "var(--dojo-note)";
    return (
      <div key={i}>
        <span style={{ color: "var(--dojo-code-path)" }}>{file}</span>
        <span className="text-dojo-textSubtle">:</span>
        <span style={{ color: "var(--dojo-code-number)" }}>{ln}</span>
        <span className="text-dojo-textSubtle">:</span>
        <span style={{ color: "var(--dojo-code-number)" }}>{col}</span>
        <span className="text-dojo-textSubtle">: </span>
        <span className="font-semibold" style={{ color: kindColor }}>
          {kind}:
        </span>
        {rest}
      </div>
    );
  });
}

interface TestsPanelProps {
  phase: Phase;
  rows: TestResultRow[];
  height: number;
  canRun: boolean;
  onRun: () => void;
  onReset: () => void;
  onResizeStart: (e: React.MouseEvent) => void;
  onResizeStep: (delta: number) => void;
}

function Check() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function Play() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l14 9-14 9V3z" />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-[13px] w-[13px] animate-dojo-spin rounded-full"
      style={{ border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff" }}
    />
  );
}

export default function TestsPanel({ phase, rows, height, canRun, onRun, onReset, onResizeStart, onResizeStep }: TestsPanelProps) {
  const running = phase === "running";
  const passed = rows.filter((r) => r.passed).length;

  let summary = "aguardando execução";
  let summaryColor = "var(--dojo-text-dim)";
  if (phase !== "idle") {
    summary = `${passed}/${rows.length} testes aprovados`;
    summaryColor = running ? "var(--dojo-text-dim)" : passed === rows.length ? "var(--dojo-green-bright)" : "var(--dojo-red)";
  }

  let footerLine = "> pressione Executar e Testar para compilar main.cpp";
  if (running) footerLine = "> compilando com GCC 13.2 (C++17) ... executando casos de teste";
  else if (phase === "result") {
    footerLine =
      passed === rows.length
        ? "> todos os casos aprovados — solução aceita ✓"
        : `> ${rows.length - passed} caso(s) falharam — confira o painel de testes`;
  }

  return (
    <>
      <div className="flex flex-none items-center justify-between gap-3 border-t border-dojo-border bg-dojo-panel2 px-3.5 py-2.5">
        <div className="flex items-center gap-2.5 text-xs text-dojo-textDim">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>
            {running
              ? "compilando com GCC 13.2 (C++17)"
              : phase === "idle"
                ? "nenhuma execução nesta sessão"
                : "última execução há instantes · GCC 13.2 (C++17)"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => canRun && onReset()}
            aria-disabled={!canRun}
            title={canRun ? undefined : "Só o piloto pode reiniciar"}
            className={`inline-flex items-center gap-1.5 rounded-md border border-dojo-border2 bg-dojo-surfaceRaised px-3 py-1.5 font-sans text-[12.5px] text-dojo-text transition hover:bg-dojo-surfaceHover hover:text-dojo-textBright active:scale-95 ${
              !canRun ? "pointer-events-none cursor-not-allowed opacity-40" : ""
            }`}
          >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reiniciar
          </button>
          <button
            type="button"
            onClick={() => !running && canRun && onRun()}
            aria-disabled={running || !canRun}
            title={canRun ? "Atalho: Ctrl+Enter" : "Só o piloto pode executar"}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 font-sans text-[13px] font-semibold text-white transition hover:brightness-110 active:scale-[0.97] ${
              running || !canRun ? "pointer-events-none cursor-not-allowed" : ""
            }`}
            style={{
              background: running || !canRun ? "var(--dojo-surface-raised)" : "#1f7a34",
              border: `1px solid ${running || !canRun ? "var(--dojo-border2)" : "rgba(255,255,255,0.14)"}`,
              boxShadow: running || !canRun ? "none" : "0 0 0 1px rgba(46,160,67,0.25), 0 2px 10px rgba(46,160,67,0.35)",
              opacity: !canRun && !running ? 0.5 : 1,
            }}
          >
            {running ? <Spinner /> : <Play />}
            {running ? "Executando..." : "Executar e Testar"}
            {!running && canRun && (
              <span className="ml-0.5 rounded border border-white/20 px-1.5 py-[1px] font-mono text-[10px] font-normal opacity-70">
                Ctrl+Enter
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-none flex-col border-t border-dojo-border bg-dojo-panel" style={{ height }}>
        <div
          onMouseDown={onResizeStart}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              onResizeStep(16);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              onResizeStep(-16);
            }
          }}
          role="separator"
          aria-orientation="horizontal"
          aria-label="Redimensionar painel de testes (setas para cima/baixo)"
          aria-valuenow={height}
          tabIndex={0}
          className="group flex h-[6px] flex-none cursor-row-resize items-center justify-center focus:outline-none"
        >
          <div className="h-[3px] w-10 rounded-full bg-dojo-border2 group-hover:bg-dojo-accent group-focus-visible:bg-dojo-accent" />
        </div>

        <div className="flex h-[34px] flex-none items-center justify-between gap-3 border-b border-dojo-border px-3.5">
          <div className="flex h-full items-center gap-[18px]">
            <div className="flex h-full items-center gap-1.5 border-b border-dojo-accent text-[11px] font-semibold tracking-[0.06em] text-dojo-textBright">
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              TESTES
            </div>
          </div>
          <div role="status" aria-live="polite" aria-atomic="true" className="font-mono text-[11px]" style={{ color: summaryColor }}>
            {summary}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-4 pt-2.5 font-mono text-[12.5px]">
        <ul aria-live="polite" aria-busy={running} className="m-0 list-none p-0">
          {rows.map((row, i) => {
            const firstCompileErrorIndex = rows.findIndex((r) => r.status === "ERRO DE COMPILAÇÃO");
            const isRepeatedCompileError =
              row.status === "ERRO DE COMPILAÇÃO" && firstCompileErrorIndex !== i;

            return (
            <li
              key={i}
              className="animate-dojo-fade border-b border-dojo-border py-[7px]"
              style={{ animationDelay: `${Math.min(i, 15) * 35}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-center gap-2.5">
                <span aria-hidden="true" className="flex w-3.5 items-center" style={{ color: row.passed ? "var(--dojo-green-bright)" : "var(--dojo-red)" }}>
                  {row.passed ? <Check /> : <Cross />}
                </span>
                <span className="sr-only">{row.passed ? "aprovado" : "reprovado"}</span>
                <span className="w-[78px] text-dojo-textDim">{row.name}</span>
                <span
                  className="rounded-full border px-2 py-[1px] text-[11px] font-semibold"
                  style={
                    row.passed
                      ? { background: "var(--dojo-pass-soft-bg)", color: "var(--dojo-green-bright)", borderColor: "var(--dojo-pass-soft-border)" }
                      : { background: "var(--dojo-fail-soft-bg)", color: "var(--dojo-red)", borderColor: "var(--dojo-fail-soft-border)" }
                  }
                >
                  {row.status}
                </span>
                <span className="ml-auto text-dojo-textFaint">{row.time}</span>
              </div>
              {!row.passed && row.status === "ERRO DE COMPILAÇÃO" && (
                <div className="ml-6 mt-1.5 overflow-x-auto whitespace-pre rounded-r border-l-2 border-dojo-dangerBorder bg-dojo-dangerBg px-2.5 py-2 leading-[1.65] text-dojo-dangerText">
                  {isRepeatedCompileError
                    ? "(mesmo erro de compilação do caso #1 acima — corrija-o para rodar os demais)"
                    : formatCompilerOutput(row.received ?? "")}
                </div>
              )}
              {!row.passed && row.status === "RUNTIME ERROR" && (
                <div className="ml-6 mt-1.5 whitespace-pre-wrap break-words rounded-r border-l-2 border-dojo-dangerBorder bg-dojo-dangerBg px-2.5 py-2 leading-[1.65] text-dojo-dangerText">
                  <div>entrada: {row.input}</div>
                  <div>
                    erro em tempo de execução: <span className="text-dojo-red">{row.received}</span>
                  </div>
                </div>
              )}
              {!row.passed && (row.status === "TEMPO ESGOTADO" || row.status === "ERRO INTERNO" || row.status === "ERRO") && (
                <div className="ml-6 mt-1.5 whitespace-pre-wrap break-words rounded-r border-l-2 border-dojo-dangerBorder bg-dojo-dangerBg px-2.5 py-2 leading-[1.65] text-dojo-dangerText">
                  {row.received}
                </div>
              )}
              {!row.passed &&
                row.status !== "ERRO DE COMPILAÇÃO" &&
                row.status !== "RUNTIME ERROR" &&
                row.status !== "TEMPO ESGOTADO" &&
                row.status !== "ERRO INTERNO" &&
                row.status !== "ERRO" && (
                <div className="ml-6 mt-1.5 whitespace-pre-wrap break-words rounded-r border-l-2 border-dojo-dangerBorder bg-dojo-dangerBg px-2.5 py-2 leading-[1.65] text-dojo-dangerText">
                  <div>entrada:   {row.input}</div>
                  <div>
                    esperado:  <span className="text-dojo-greenBright">{row.expected}</span>
                  </div>
                  <div>
                    recebido:  <span className="text-dojo-red">{row.received}</span>
                  </div>
                </div>
              )}
            </li>
            );
          })}
        </ul>
        <div className="pt-2.5 text-dojo-textFaint">{footerLine}</div>
        </div>
      </div>
    </>
  );
}
