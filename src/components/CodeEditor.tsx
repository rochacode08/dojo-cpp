import { useEffect, useRef, useState } from "react";
import Editor, { type BeforeMount, type Monaco, type OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditorNS, Position } from "monaco-editor";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

interface SnippetDef {
  label: string;
  detail: string;
  insertText: string;
}

// Trechos comuns de C++ básico/CS1 — não é IntelliSense de verdade (isso
// exigiria um language server como o clangd rodando em algum lugar), só um
// atalho pra não digitar de novo os padrões mais repetidos do curso.
const SNIPPETS: SnippetDef[] = [
  { label: "main", detail: "Esqueleto de função main", insertText: "int main() {\n\t${0}\n\treturn 0;\n}" },
  { label: "incliostream", detail: "#include <iostream>", insertText: "#include <iostream>" },
  { label: "inclvector", detail: "#include <vector>", insertText: "#include <vector>" },
  { label: "inclstring", detail: "#include <string>", insertText: "#include <string>" },
  { label: "inclalgorithm", detail: "#include <algorithm>", insertText: "#include <algorithm>" },
  { label: "inclcmath", detail: "#include <cmath>", insertText: "#include <cmath>" },
  { label: "inclmap", detail: "#include <map>", insertText: "#include <map>" },
  { label: "usingnamespacestd", detail: "using namespace std;", insertText: "using namespace std;" },
  {
    label: "for",
    detail: "Loop for clássico",
    insertText: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${0}\n}",
  },
  {
    label: "forrange",
    detail: "Loop for baseado em intervalo",
    insertText: "for (${1:auto}& ${2:x} : ${3:vetor}) {\n\t${0}\n}",
  },
  { label: "while", detail: "Loop while", insertText: "while (${1:condicao}) {\n\t${0}\n}" },
  { label: "ifelse", detail: "if / else", insertText: "if (${1:condicao}) {\n\t${2}\n} else {\n\t${0}\n}" },
  { label: "cin", detail: "Ler entrada", insertText: "cin >> ${0:variavel};" },
  { label: "cout", detail: "Imprimir com quebra de linha", insertText: "cout << ${0:valor} << endl;" },
  { label: "vectorint", detail: "vector<int>", insertText: "vector<int> ${1:v}(${2:n});" },
  { label: "vectorstring", detail: "vector<string>", insertText: "vector<string> ${1:v}(${2:n});" },
  {
    label: "class",
    detail: "Esqueleto de classe",
    insertText: "class ${1:Nome} {\nprivate:\n\t${2}\npublic:\n\t${0}\n};",
  },
  {
    label: "struct",
    detail: "Esqueleto de struct",
    insertText: "struct ${1:Nome} {\n\t${0}\n};",
  },
  { label: "setprecision", detail: "cout com casas decimais fixas", insertText: "cout << fixed << setprecision(${1:2});" },
];

let completionsRegistered = false;

function registerCompletions(monaco: Monaco) {
  if (completionsRegistered) return;
  completionsRegistered = true;
  monaco.languages.registerCompletionItemProvider("cpp", {
    provideCompletionItems(model: MonacoEditorNS.ITextModel, position: Position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: SNIPPETS.map((s) => ({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: s.detail,
          insertText: s.insertText,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        })),
      };
    },
  });
}

const handleBeforeMount: BeforeMount = (monaco) => {
  registerCompletions(monaco);

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
        <div className="flex items-center gap-2 border-r border-dojo-border bg-dojo-bg px-3.5 text-[12.5px] text-dojo-textBright" style={{ borderTop: "1px solid var(--dojo-accent)" }}>
          <span className="font-mono text-[11px]" style={{ color: "var(--dojo-accent)" }}>C++</span>
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
