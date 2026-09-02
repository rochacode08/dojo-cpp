import { useEffect, useState } from "react";
import type { RunMode, TestResultRow } from "../lib/types";

type Phase = "idle" | "running" | "result";

const GCC_LOCATION = /^([^:]+):(\d+):(\d+):\s*(error|warning|note):/;

const INFRA_STATUSES = ["TEMPO ESGOTADO", "ERRO INTERNO", "ERRO"];

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
  mode: RunMode;
  height: number;
  canRun: boolean;
  onRun: (mode: RunMode) => void;
  onReset: () => void;
  onResizeStart: (e: React.MouseEvent) => void;
  onResizeStep: (delta: number) => void;
}

function Play() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l14 9-14 9V3z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
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

export default function TestsPanel({
  phase,
  rows,
  mode,
  height,
  canRun,
  onRun,
  onReset,
  onResizeStart,
  onResizeStep,
}: TestsPanelProps) {
  const running = phase === "running";
  const passed = rows.filter((r) => r.passed).length;
  const [selected, setSelected] = useState(0);

  // Quando chega um resultado novo, já abre no primeiro caso que falhou —
  // que é o que interessa olhar.
  useEffect(() => {
    if (rows.length === 0) {
      setSelected(0);
      return;
    }
    const firstFailure = rows.findIndex((r) => !r.passed);
    setSelected(firstFailure === -1 ? 0 : firstFailure);
  }, [rows]);

  let summary = "aguardando execução";
  let summaryColor = "var(--dojo-text-dim)";
  if (phase !== "idle") {
    summary = `${passed}/${rows.length} testes aprovados`;
    summaryColor = running
      ? "var(--dojo-text-dim)"
      : passed === rows.length
        ? "var(--dojo-green-bright)"
        : "var(--dojo-red)";
  }

  const current = rows[Math.min(selected, Math.max(rows.length - 1, 0))];

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
                : mode === "test"
                  ? "último teste nos exemplos · GCC 13.2 (C++17)"
                  : "último envio · GCC 13.2 (C++17)"}
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
            onClick={() => !running && canRun && onRun("test")}
            aria-disabled={running || !canRun}
            title={canRun ? "Roda só os exemplos do enunciado · Ctrl+Enter" : "Só o piloto pode testar"}
            className={`inline-flex items-center gap-2 rounded-md border px-3.5 py-2 font-sans text-[13px] font-semibold transition hover:bg-dojo-surfaceHover active:scale-[0.97] ${
              running || !canRun ? "pointer-events-none cursor-not-allowed opacity-50" : ""
            }`}
            style={{
              background: "var(--dojo-surface-raised)",
              borderColor: "var(--dojo-border2)",
              color: "var(--dojo-text-bright)",
            }}
          >
            {running && mode === "test" ? <Spinner /> : <Play />}
            {running && mode === "test" ? "Testando..." : "Testar"}
          </button>

          <button
            type="button"
            onClick={() => !running && canRun && onRun("submit")}
            aria-disabled={running || !canRun}
            title={canRun ? "Roda todos os casos e registra a tentativa · Ctrl+Shift+Enter" : "Só o piloto pode enviar"}
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
            {running && mode === "submit" ? <Spinner /> : <SendIcon />}
            {running && mode === "submit" ? "Enviando..." : "Enviar"}
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
          <div className="flex h-full items-center gap-2.5">
            <div className="flex h-full items-center gap-1.5 border-b border-dojo-accent text-[11px] font-semibold tracking-[0.06em] text-dojo-textBright">
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              TESTES
            </div>
            {phase === "result" && (
              <span className="text-[10.5px] text-dojo-textFaint">
                {mode === "test" ? "só exemplos · não conta como tentativa" : "todos os casos · tentativa registrada"}
              </span>
            )}
          </div>
          <div role="status" aria-live="polite" aria-atomic="true" className="font-mono text-[11px]" style={{ color: summaryColor }}>
            {summary}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-4 pt-2.5 font-mono text-[12.5px]">
          {rows.length === 0 ? (
            <div className="text-dojo-textFaint">
              {running
                ? "> compilando e rodando os casos de teste..."
                : "> Testar roda só os exemplos do enunciado. Enviar roda todos os casos e registra a tentativa."}
            </div>
          ) : (
            <>
              <div className="mb-3 flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Casos de teste">
                {rows.map((row, i) => {
                  const active = i === selected;
                  const ok = row.passed;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelected(i)}
                      className="flex h-7 min-w-[28px] items-center justify-center rounded-md border px-2 text-[11.5px] font-semibold transition active:scale-95"
                      style={{
                        background: active
                          ? ok
                            ? "var(--dojo-pass-soft-bg)"
                            : "var(--dojo-fail-soft-bg)"
                          : "var(--dojo-surface-sunken)",
                        borderColor: active
                          ? ok
                            ? "var(--dojo-pass-soft-border)"
                            : "var(--dojo-fail-soft-border)"
                          : "transparent",
                        color: ok ? "var(--dojo-green-bright)" : "var(--dojo-red)",
                      }}
                    >
                      {i + 1}
                      <span className="sr-only">{ok ? " aprovado" : " reprovado"}</span>
                    </button>
                  );
                })}
              </div>

              {current && <CaseDetail row={current} rows={rows} index={selected} />}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function CaseDetail({ row, rows, index }: { row: TestResultRow; rows: TestResultRow[]; index: number }) {
  const isCompileError = row.status === "ERRO DE COMPILAÇÃO";
  const isRuntimeError = row.status === "RUNTIME ERROR";
  const isInfra = INFRA_STATUSES.includes(row.status);
  const firstCompileErrorIndex = rows.findIndex((r) => r.status === "ERRO DE COMPILAÇÃO");
  const isRepeatedCompileError = isCompileError && firstCompileErrorIndex !== index;

  return (
    <div className="animate-dojo-fade flex flex-col gap-2.5 rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.06em] text-dojo-textDim">{row.name}</span>
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
        {row.isSample === false && (
          <span className="rounded-full border border-dojo-border2 px-2 py-[1px] text-[10.5px] text-dojo-textFaint">
            caso oculto
          </span>
        )}
        {row.time && <span className="ml-auto text-[11px] text-dojo-textFaint">{row.time}</span>}
      </div>

      {row.warning && (
        <div
          className="flex items-start gap-2 rounded-md px-2.5 py-2 text-[12px] leading-[1.5]"
          style={{
            background: "rgba(240,198,116,0.12)",
            border: "1px solid rgba(240,198,116,0.35)",
            color: "var(--dojo-amber)",
          }}
        >
          <span className="mt-[2px] flex-none">
            <WarningIcon />
          </span>
          <span>{row.warning}</span>
        </div>
      )}

      {isCompileError ? (
        <div className="overflow-x-auto whitespace-pre rounded-r border-l-2 border-dojo-dangerBorder bg-dojo-dangerBg px-2.5 py-2 leading-[1.65] text-dojo-dangerText">
          {isRepeatedCompileError
            ? "(mesmo erro de compilação do caso #1 — corrija-o para rodar os demais)"
            : formatCompilerOutput(row.received ?? "")}
        </div>
      ) : isInfra ? (
        <div className="whitespace-pre-wrap break-words rounded-r border-l-2 border-dojo-dangerBorder bg-dojo-dangerBg px-2.5 py-2 leading-[1.65] text-dojo-dangerText">
          {row.received}
        </div>
      ) : (
        <>
          {row.input && row.input !== "-" && (
            <div className="flex flex-col gap-1">
              <span className="text-[10.5px] uppercase tracking-[0.06em] text-dojo-textDim">Entrada</span>
              <pre className="m-0 overflow-x-auto rounded-md border border-dojo-border2 bg-dojo-panel px-2.5 py-2 leading-[1.6] text-dojo-text">
                {row.input}
              </pre>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10.5px] uppercase tracking-[0.06em] text-dojo-textDim">Resposta esperada</span>
              <pre
                className="m-0 min-h-[42px] overflow-x-auto rounded-md border border-dojo-border2 bg-dojo-panel px-2.5 py-2 leading-[1.6]"
                style={{ color: "var(--dojo-code-output)" }}
              >
                {row.expected}
              </pre>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10.5px] uppercase tracking-[0.06em] text-dojo-textDim">Sua resposta</span>
              <pre
                className="m-0 min-h-[42px] overflow-x-auto rounded-md px-2.5 py-2 leading-[1.6]"
                style={
                  row.passed
                    ? {
                        border: "1px solid var(--dojo-border2)",
                        background: "var(--dojo-panel)",
                        color: "var(--dojo-code-output)",
                      }
                    : {
                        border: "1px solid var(--dojo-danger-border)",
                        background: "var(--dojo-danger-bg)",
                        color: "var(--dojo-danger-text)",
                      }
                }
              >
                {isRuntimeError ? row.received : row.received || "(vazio)"}
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
