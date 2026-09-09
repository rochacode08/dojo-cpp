/**
 * Realce de sintaxe mínimo para os trechos de C/C++ das aulas.
 *
 * Não é um parser: é um scanner de tokens que reconhece o que importa pra
 * leitura (comentário, diretiva, string, número, palavra-chave). O editor de
 * verdade usa o Monaco — aqui um tokenizador de ~80 linhas evita carregar o
 * Monaco inteiro só pra pintar um bloco estático de código.
 */

export type TokenKind = "comment" | "preproc" | "string" | "number" | "keyword" | "type" | "plain";

export interface Token {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set([
  "alignas", "auto", "break", "case", "catch", "class", "const", "constexpr", "continue",
  "default", "delete", "do", "else", "enum", "explicit", "export", "extern", "false", "for",
  "friend", "goto", "if", "inline", "namespace", "new", "nullptr", "operator", "private",
  "protected", "public", "return", "sizeof", "static", "struct", "switch", "template", "this",
  "throw", "true", "try", "typedef", "typename", "union", "using", "virtual", "volatile", "while",
]);

const TYPES = new Set([
  "bool", "char", "double", "float", "int", "long", "short", "signed", "string", "unsigned",
  "void", "size_t", "wchar_t",
]);

const IDENT_START = /[A-Za-z_]/;
const IDENT_PART = /[A-Za-z0-9_]/;
const DIGIT = /[0-9]/;

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let plain = "";
  let i = 0;

  function flush() {
    if (plain) {
      tokens.push({ kind: "plain", text: plain });
      plain = "";
    }
  }

  function push(kind: TokenKind, text: string) {
    flush();
    tokens.push({ kind, text });
  }

  while (i < code.length) {
    const c = code[i];
    const next = code[i + 1];

    // comentário de linha
    if (c === "/" && next === "/") {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      push("comment", code.slice(i, stop));
      i = stop;
      continue;
    }

    // comentário de bloco
    if (c === "/" && next === "*") {
      const end = code.indexOf("*/", i + 2);
      const stop = end === -1 ? code.length : end + 2;
      push("comment", code.slice(i, stop));
      i = stop;
      continue;
    }

    // diretiva de pré-processador: vale até o fim da linha
    if (c === "#" && (i === 0 || code[i - 1] === "\n" || /^[ \t]*$/.test(currentLineStart(code, i)))) {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      push("preproc", code.slice(i, stop));
      i = stop;
      continue;
    }

    // string ou caractere
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== c) {
        if (code[j] === "\\") j++;
        if (code[j] === "\n") break;
        j++;
      }
      const stop = Math.min(j + 1, code.length);
      push("string", code.slice(i, stop));
      i = stop;
      continue;
    }

    // número
    if (DIGIT.test(c)) {
      let j = i;
      while (j < code.length && /[0-9.a-fA-FxX]/.test(code[j])) j++;
      push("number", code.slice(i, j));
      i = j;
      continue;
    }

    // identificador / palavra-chave
    if (IDENT_START.test(c)) {
      let j = i;
      while (j < code.length && IDENT_PART.test(code[j])) j++;
      const word = code.slice(i, j);
      if (KEYWORDS.has(word)) push("keyword", word);
      else if (TYPES.has(word)) push("type", word);
      else plain += word;
      i = j;
      continue;
    }

    plain += c;
    i++;
  }

  flush();
  return tokens;
}

/** Texto da linha atual até a posição — pra saber se o `#` abre a linha. */
function currentLineStart(code: string, index: number): string {
  const lineStart = code.lastIndexOf("\n", index - 1) + 1;
  return code.slice(lineStart, index);
}

export const TOKEN_COLOR: Record<TokenKind, string | undefined> = {
  comment: "var(--dojo-syn-comment)",
  preproc: "var(--dojo-syn-preproc)",
  string: "var(--dojo-syn-string)",
  number: "var(--dojo-syn-number)",
  keyword: "var(--dojo-syn-keyword)",
  type: "var(--dojo-syn-type)",
  plain: undefined,
};

/** Linguagens que o tokenizador entende; qualquer outra sai sem realce. */
export function isHighlightable(language: string | undefined): boolean {
  if (!language) return false;
  return ["c", "cpp", "c++", "cc"].includes(language.toLowerCase());
}
