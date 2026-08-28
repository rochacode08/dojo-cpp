import type { TestResultRow } from "../lib/types";

type Phase = "idle" | "running" | "result";

interface TestsPanelProps {
  phase: Phase;
  rows: TestResultRow[];
  height: number;
  canRun: boolean;
  onRun: () => void;
  onReset: () => void;
  onResizeStart: (e: React.MouseEvent) => void;
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function Play() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function TestsPanel({ phase, rows, height, canRun, onRun, onReset, onResizeStart }: TestsPanelProps) {
  const running = phase === "running";
  const passed = rows.filter((r) => r.passed).length;

  let summary = "aguardando execução";
  let summaryColor = "#8a8a8a";
  if (phase !== "idle") {
    summary = `${passed}/${rows.length} testes aprovados`;
    summaryColor = running ? "#b3b3b3" : passed === rows.length ? "#6ee7a0" : "#ff8585";
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            onClick={onReset}
            disabled={!canRun}
            title={canRun ? undefined : "Só o piloto pode reiniciar"}
            className="inline-flex items-center gap-1.5 rounded-md border border-dojo-border2 bg-[#171717] px-3 py-1.5 font-sans text-[12.5px] text-[#d6d6d6] transition hover:border-[#565656] hover:bg-[#1f1f1f] hover:text-dojo-textBright disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-dojo-border2 disabled:hover:bg-[#171717]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reiniciar
          </button>
          <button
            onClick={onRun}
            disabled={running || !canRun}
            title={canRun ? undefined : "Só o piloto pode executar"}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-sans text-[13px] font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:hover:brightness-100"
            style={{
              background: running || !canRun ? "#1a1a1a" : "#2ea043",
              border: `1px solid ${running || !canRun ? "#454545" : "rgba(255,255,255,0.14)"}`,
              boxShadow: running || !canRun ? "none" : "0 0 0 1px rgba(46,160,67,0.25), 0 2px 10px rgba(46,160,67,0.35)",
              opacity: !canRun && !running ? 0.5 : 1,
            }}
          >
            {running ? <Spinner /> : <Play />}
            {running ? "Executando..." : "Executar e Testar"}
          </button>
        </div>
      </div>

      <div className="flex flex-none flex-col border-t border-dojo-border bg-dojo-panel" style={{ height }}>
        <div
          onMouseDown={onResizeStart}
          className="group flex h-[6px] flex-none cursor-row-resize items-center justify-center"
        >
          <div className="h-[3px] w-10 rounded-full bg-[#3a3a3a] group-hover:bg-dojo-accent" />
        </div>

        <div className="flex h-[34px] flex-none items-center justify-between gap-3 border-b border-dojo-border px-3.5">
          <div className="flex h-full items-center gap-[18px]">
            <div className="flex h-full items-center gap-1.5 border-b border-dojo-accent text-[11px] font-semibold tracking-[0.06em] text-dojo-textBright">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              TESTES
            </div>
          </div>
          <div className="font-mono text-[11px]" style={{ color: summaryColor }}>
            {summary}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-4 pt-2.5 font-mono text-[12.5px]">
          {rows.map((row, i) => (
            <div key={i} className="animate-dojo-fade border-b border-[#242424] py-[7px]">
              <div className="flex items-center gap-2.5">
                <span className="flex w-3.5 items-center" style={{ color: row.passed ? "#6ee7a0" : "#ff8585" }}>
                  {row.passed ? <Check /> : <Cross />}
                </span>
                <span className="w-[78px] text-[#b3b3b3]">{row.name}</span>
                <span
                  className="rounded-full border px-2 py-[1px] text-[11px] font-semibold"
                  style={
                    row.passed
                      ? { background: "rgba(110,231,160,0.14)", color: "#6ee7a0", borderColor: "rgba(110,231,160,0.35)" }
                      : { background: "rgba(255,133,133,0.14)", color: "#ff8585", borderColor: "rgba(255,133,133,0.35)" }
                  }
                >
                  {row.status}
                </span>
                <span className="ml-auto text-[#7a7a7a]">{row.time}</span>
              </div>
              {!row.passed && (
                <div className="ml-6 mt-1.5 rounded-r border-l-2 border-[#d64545] bg-[#241010] px-2.5 py-2 leading-[1.65] text-[#e0b0b0]">
                  <div>entrada:   {row.input}</div>
                  <div>
                    esperado:  <span className="text-[#c8e0ba]">{row.expected}</span>
                  </div>
                  <div>
                    recebido:  <span className="text-[#ff9d8a]">{row.received}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="pt-2.5 text-[#7a7a7a]">{footerLine}</div>
        </div>
      </div>
    </>
  );
}
