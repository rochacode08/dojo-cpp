import type { ReactElement, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { anchorId } from "../lib/lessons";
import CodeBlock from "./CodeBlock";

interface MarkdownProps {
  children: string;
}

/** Extrai o texto cru de dentro de um <code> pra mandar pro CodeBlock. */
function textOf(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as ReactElement<{ children?: ReactNode }>).props.children);
  }
  return "";
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2
            id={anchorId(textOf(children))}
            className="mt-9 scroll-mt-20 border-b border-dojo-border pb-1.5 text-[19px] font-semibold tracking-tight text-dojo-textBright first:mt-0"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 id={anchorId(textOf(children))} className="mt-6 scroll-mt-20 text-[15px] font-semibold text-dojo-textBright">
            {children}
          </h3>
        ),
        h4: ({ children }) => <h4 className="mt-5 text-[13.5px] font-semibold text-dojo-text">{children}</h4>,
        p: ({ children }) => <p className="mt-3 leading-[1.7] text-dojo-text">{children}</p>,
        ul: ({ children }) => <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 leading-[1.65] text-dojo-text">{children}</ul>,
        ol: ({ children }) => <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 leading-[1.65] text-dojo-text">{children}</ol>,
        li: ({ children }) => <li className="pl-0.5">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-dojo-textBright">{children}</strong>,
        a: ({ children, href }) => (
          <a href={href} className="underline decoration-dojo-border2 underline-offset-2 hover:text-dojo-textBright" style={{ color: "var(--dojo-accent)" }}>
            {children}
          </a>
        ),
        hr: () => <hr className="mt-8 border-0 border-t border-dojo-border" />,
        blockquote: ({ children }) => (
          <blockquote
            className="mt-4 rounded-r-md border-l-[3px] px-3.5 py-0.5 text-[13px]"
            style={{ borderColor: "var(--dojo-accent)", background: "var(--dojo-accent-soft-bg)" }}
          >
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="mt-4 overflow-x-auto rounded-lg border border-dojo-border2">
            <table className="w-full border-collapse text-[12.5px]">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-dojo-surfaceSunken">{children}</thead>,
        th: ({ children }) => (
          <th className="border-b border-dojo-border2 px-3 py-2 text-left font-semibold text-dojo-textBright">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border-b border-dojo-border2 px-3 py-2 align-top text-dojo-text last:border-r-0">{children}</td>
        ),
        code: ({ children }) => (
          <code
            className="rounded border border-dojo-border2 bg-dojo-surfaceSunken px-1 py-[1px] font-mono text-[12px] text-dojo-textBright"
            style={{ fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0' }}
          >
            {children}
          </code>
        ),
        // O bloco de código é montado a partir do <pre>: o filho é o <code> com
        // a classe "language-xxx" que o markdown gerou.
        pre: ({ children }) => {
          const child = Array.isArray(children) ? children[0] : children;
          const props =
            child && typeof child === "object" && "props" in child
              ? (child as ReactElement<{ className?: string; children?: ReactNode }>).props
              : {};
          const language = /language-([\w+]+)/.exec(props.className ?? "")?.[1];
          return <CodeBlock code={textOf(props.children).replace(/\n$/, "")} language={language} />;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
