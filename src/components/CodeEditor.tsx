import { useEffect, useRef, useState } from "react";
import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditorNS } from "monaco-editor";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const handleBeforeMount: BeforeMount = (monaco) => {
  // Paleta clássica de IDE de C++ (tipo Code::Blocks/Dev-C++), em versão clara e escura.
  monaco.editor.defineTheme("dojo-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6BAF5B" },
      { token: "keyword.directive", foreground: "6BAF5B" },
      { token: "keyword", foreground: "4FA6E8" },
      { token: "string", foreground: "E0705C" },
      { token: "string.escape", foreground: "D7BA7D" },
      { token: "string.include.identifier", foreground: "E0705C" },
      { token: "number", foreground: "B5CEA8" },
      { token: "identifier", foreground: "E4E4E4" },
      { token: "delimiter", foreground: "B0B0B0" },
      { token: "annotation", foreground: "4FA6E8" },
    ],
    colors: {
      "editor.background": "#000000",
      "editor.lineHighlightBackground": "#000000",
      "editorGutter.background": "#000000",
    },
  });

  monaco.editor.defineTheme("dojo-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "008000" },
      { token: "keyword.directive", foreground: "008000" },
      { token: "keyword", foreground: "0000FF" },
      { token: "string", foreground: "C41A16" },
      { token: "string.escape", foreground: "9A6E3A" },
      { token: "string.include.identifier", foreground: "C41A16" },
      { token: "number", foreground: "098658" },
      { token: "identifier", foreground: "000000" },
      { token: "delimiter", foreground: "000000" },
      { token: "annotation", foreground: "0000FF" },
    ],
    colors: {
      "editor.background": "#FFFFFF",
      "editor.lineHighlightBackground": "#FFFFFF",
      "editorGutter.background": "#FFFFFF",
    },
  });
};

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function CodeEditor({ code, onChange, readOnly }: CodeEditorProps) {
  const [light, setLight] = useState(false);
  const editorRef = useRef<MonacoEditorNS.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editorInstance) => {
    editorRef.current = editorInstance;
  };

  // Só empurra texto pro editor quando a mudança veio de fora (outra pessoa
  // editando, reinício, troca de problema) — nunca em resposta ao próprio
  // onChange, senão o Monaco reseta o cursor a cada tecla digitada.
  useEffect(() => {
    const editorInstance = editorRef.current;
    if (editorInstance && editorInstance.getValue() !== code) {
      const position = editorInstance.getPosition();
      editorInstance.setValue(code);
      if (position) editorInstance.setPosition(position);
    }
  }, [code]);

  return (
    <div className="flex h-[50vh] flex-none flex-col bg-dojo-bg md:h-auto md:min-h-0 md:flex-1">
      <div className="flex h-[38px] flex-none items-stretch justify-between border-b border-dojo-border bg-dojo-panel">
        <div className="flex items-center gap-2 border-r border-dojo-border bg-dojo-bg px-3.5 text-[12.5px] text-dojo-textBright" style={{ borderTop: "1px solid #2b95e0" }}>
          <span className="font-mono text-[11px] text-[#66c2e0]">C++</span>
          main.cpp
        </div>
        <button
          onClick={() => setLight((v) => !v)}
          title={light ? "Mudar pro tema escuro" : "Mudar pro tema claro"}
          className="flex items-center gap-1.5 px-3 text-[11px] text-dojo-textDim hover:text-dojo-textBright"
        >
          {light ? <MoonIcon /> : <SunIcon />}
          {light ? "Escuro" : "Claro"}
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          defaultValue={code}
          theme={light ? "dojo-light" : "dojo-dark"}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          onChange={(value) => onChange(value ?? "")}
          options={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 13.5,
            minimap: { enabled: false },
            tabSize: 4,
            scrollBeyondLastLine: false,
            folding: false,
            guides: { indentation: false, highlightActiveIndentation: false },
            renderLineHighlight: "none",
            occurrencesHighlight: "off",
            readOnly: readOnly ?? false,
            domReadOnly: readOnly ?? false,
          }}
        />
      </div>
    </div>
  );
}
