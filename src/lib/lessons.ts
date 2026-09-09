/**
 * As aulas são markdown versionado junto com o código (src/content/aulas), não
 * linhas no banco: são anotações do professor que mudam por commit, não algo que
 * o grupo edita pela interface.
 *
 * Título, resumo e tópicos saem do próprio arquivo — assim adicionar uma aula é
 * só criar o .md com o nome numerado, sem nenhum cadastro paralelo pra manter
 * em sincronia.
 */

const files = import.meta.glob("../content/aulas/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface Lesson {
  slug: string;
  /** "01", "02"... o prefixo numérico do arquivo. */
  number: string;
  title: string;
  summary: string;
  /** Os títulos de nível 2, usados como sumário e como chips na listagem. */
  topics: string[];
  /** O markdown sem o título de nível 1 (a página já mostra o título). */
  body: string;
  /** Estimativa grosseira de leitura, em minutos. */
  minutes: number;
}

const WORDS_PER_MINUTE = 190;

function parse(path: string, raw: string): Lesson {
  const fileName = path.split("/").pop() ?? path;
  const slug = fileName.replace(/\.md$/, "");
  const number = slug.split("-")[0];

  const lines = raw.split("\n");
  const titleIndex = lines.findIndex((l) => l.startsWith("# "));
  const heading = titleIndex === -1 ? slug : lines[titleIndex].slice(2).trim();
  // "Aula 04 — Tipos derivados" na listagem vira só "Tipos derivados": o número
  // já aparece no cartão, em destaque.
  const title = heading.replace(/^Aula\s+\d+\s*[—-]\s*/, "");

  const body = titleIndex === -1 ? raw : [...lines.slice(0, titleIndex), ...lines.slice(titleIndex + 1)].join("\n").trim();

  const topics = lines.filter((l) => l.startsWith("## ")).map((l) => l.slice(3).trim());

  // Resumo = primeiro parágrafo depois do título.
  const summaryLines: string[] = [];
  for (let i = titleIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") {
      if (summaryLines.length > 0) break;
      continue;
    }
    if (line.startsWith("#")) break;
    summaryLines.push(line);
  }
  const summary = summaryLines.join(" ").replace(/[`*]/g, "");

  const minutes = Math.max(1, Math.round(raw.split(/\s+/).length / WORDS_PER_MINUTE));

  return { slug, number, title, summary, topics, body, minutes };
}

export const LESSONS: Lesson[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

/** Slug legível pra âncora de um título de seção (usado no sumário lateral). */
export function anchorId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    // tira os acentos que o NFD separou das letras
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
