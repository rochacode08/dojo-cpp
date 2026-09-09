import { useState } from "react";
import { TOKEN_COLOR, isHighlightable, tokenize } from "../lib/highlight";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const LABELS: Record<string, string> = {
  c: "C",
  cpp: "C++",
  "c++": "C++",
  cc: "C++",
};

function CopyIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const highlight = isHighlightable(language);
  const label = language ? (LABELS[language.toLowerCase()] ?? language) : null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error("não deu pra copiar o código:", err);
    }
  }

  return (
    <div className="group relative mt-4 overflow-hidden rounded-lg border border-dojo-border2 bg-dojo-surfaceSunken">
      <div className="flex items-center justify-between border-b border-dojo-border2 px-3 py-1">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-dojo-textFaint">
          {label ?? "código"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10.5px] text-dojo-textDim transition hover:text-dojo-textBright"
          title="Copiar o código"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "copiado" : "copiar"}
        </button>
      </div>
      {/* Sem ligaduras: a JetBrains Mono junta "--" num traço só, e num material
          de ensino isso faz o aluno ler o operador errado. */}
      <pre
        className="m-0 overflow-x-auto px-3.5 py-3 font-mono text-[12.5px] leading-[1.65] text-dojo-text"
        style={{ fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0' }}
      >
        <code>
          {highlight
            ? tokenize(code).map((token, i) => (
                <span key={i} style={{ color: TOKEN_COLOR[token.kind] }}>
                  {token.text}
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}
