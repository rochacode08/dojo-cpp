import type { Language } from "./types";

export interface LanguageDef {
  id: Language;
  /** Rótulo curto mostrado na aba do editor e nos seletores. */
  label: string;
  /** Nome do arquivo fictício exibido na aba (e usado pelo GCC nas mensagens). */
  fileName: string;
  /** Identificador de linguagem do Monaco (highlight/autocomplete). */
  monacoId: string;
  /** Como descrever o compilador na barra de testes. */
  compilerLabel: string;
  /**
   * Esqueleto inicial. O `starter_code` do banco é o de C++ (todos os
   * problemas usam o mesmo, ver migration 0007); o de C vive aqui porque não
   * varia por problema.
   */
  starterCode: string;
}

export const CPP_STARTER = "#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n";
export const C_STARTER = "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n";

export const LANGUAGES: Record<Language, LanguageDef> = {
  cpp: {
    id: "cpp",
    label: "C++",
    fileName: "main.cpp",
    monacoId: "cpp",
    compilerLabel: "GCC 13.2 (C++17)",
    starterCode: CPP_STARTER,
  },
  c: {
    id: "c",
    label: "C",
    fileName: "main.c",
    monacoId: "c",
    compilerLabel: "GCC 13.2 (C11)",
    starterCode: C_STARTER,
  },
};

export const LANGUAGE_IDS: Language[] = ["cpp", "c"];

export function isLanguage(value: unknown): value is Language {
  return value === "cpp" || value === "c";
}

/**
 * Código inicial do problema na linguagem escolhida. Em C++ respeitamos o que
 * está no banco (caso algum problema ganhe um esqueleto próprio um dia).
 */
export function starterFor(language: Language, problemStarterCode: string): string {
  if (language === "cpp") return problemStarterCode || CPP_STARTER;
  return C_STARTER;
}

/**
 * Trocar de linguagem não pode apagar código escrito. Só substituímos quando o
 * que está no editor ainda é um esqueleto (ou está vazio).
 */
export function isUntouchedStarter(code: string, problemStarterCode: string): boolean {
  const normalized = code.trim();
  if (normalized === "") return true;
  return [problemStarterCode, CPP_STARTER, C_STARTER].some((s) => s.trim() === normalized);
}
