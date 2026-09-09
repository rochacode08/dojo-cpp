import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Profile } from "../lib/types";
import { LESSONS, anchorId, getLesson } from "../lib/lessons";
import Header from "../components/Header";
import Markdown from "../components/Markdown";

interface AulaPageProps {
  session: Session;
}

export default function AulaPage({ session }: AulaPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const lesson = slug ? getLesson(slug) : undefined;

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.error("erro ao buscar profiles:", error);
      if (data) setProfiles(data as Profile[]);
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    try {
      localStorage.setItem("dojo-ultima-aula", slug);
    } catch {
      // sem localStorage a trilha só perde o "continuar"; nada quebra
    }
  }, [slug]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-dojo-bg font-sans text-dojo-text">
        <Header profiles={profiles} subtitle="Aulas" backTo="/aulas" />
        <main className="mx-auto max-w-3xl px-4 py-12 text-center">
          <p className="text-[15px] text-dojo-textDim">Aula não encontrada.</p>
          <Link to="/aulas" className="mt-3 inline-block text-[13px] underline underline-offset-2" style={{ color: "var(--dojo-accent)" }}>
            Ver todas as aulas
          </Link>
        </main>
      </div>
    );
  }

  const index = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const previous = index > 0 ? LESSONS[index - 1] : null;
  const next = index < LESSONS.length - 1 ? LESSONS[index + 1] : null;

  return (
    <div className="min-h-screen bg-dojo-bg font-sans text-dojo-text">
      <Header profiles={profiles} subtitle={`Aula ${lesson.number}`} backTo="/aulas" me={profiles.find((p) => p.id === session.user.id) ?? null} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_220px]">
        <main className="min-w-0 text-[15px]">
          <Link to="/aulas" className="text-[13.5px] text-dojo-textDim transition-colors hover:text-dojo-textBright">
            ← Todas as aulas
          </Link>

          <h1 className="mt-2 text-[26px] font-bold tracking-[-0.02em] text-dojo-textBright sm:text-[30px]">
            <span className="font-mono text-[14px] font-semibold" style={{ color: "var(--dojo-accent)" }}>
              Aula {lesson.number}
            </span>
            <span className="mt-0.5 block">{lesson.title}</span>
          </h1>

          <div className="mt-6">
            <Markdown>{lesson.body}</Markdown>
          </div>

          {lesson.practiceTags.length > 0 && (
            <section
              aria-label="Pratique o conteúdo desta aula"
              className="mt-10 rounded-xl p-5"
              style={{ background: "var(--dojo-accent-soft-bg)", border: "1px solid var(--dojo-border2)" }}
            >
              <h2 className="m-0 text-[16px] font-semibold text-dojo-textBright">Agora pratique</h2>
              <p className="m-0 mt-1 text-[14px] text-dojo-textDim">
                Os desafios abaixo usam o que você acabou de ler.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {lesson.practiceTags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/?tema=${encodeURIComponent(tag)}`}
                    className="flex h-10 items-center gap-2 rounded-lg px-3.5 text-[14px] font-medium text-white transition hover:brightness-110"
                    style={{ background: "var(--dojo-accent-solid)" }}
                  >
                    {tag}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <nav aria-label="Navegação entre aulas" className="mt-12 flex flex-col gap-2 border-t border-dojo-border pt-5 sm:flex-row sm:justify-between">
            {previous ? (
              <Link
                to={`/aulas/${previous.slug}`}
                className="rounded-lg border border-dojo-border2 bg-dojo-card px-3.5 py-2.5 text-[12.5px] transition hover:border-dojo-accent hover:bg-dojo-cardHover"
              >
                <span className="block text-[10.5px] text-dojo-textFaint">← Aula {previous.number}</span>
                <span className="text-dojo-textBright">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/aulas/${next.slug}`}
                className="rounded-lg border border-dojo-border2 bg-dojo-card px-3.5 py-2.5 text-right text-[12.5px] transition hover:border-dojo-accent hover:bg-dojo-cardHover"
              >
                <span className="block text-[10.5px] text-dojo-textFaint">Aula {next.number} →</span>
                <span className="text-dojo-textBright">{next.title}</span>
              </Link>
            )}
          </nav>
        </main>

        <aside className="hidden lg:block">
          <nav aria-label="Sumário da aula" className="sticky top-6">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-dojo-textFaint">
              Nesta aula
            </span>
            <ul className="mt-2.5 flex flex-col gap-1.5 border-l border-dojo-border pl-3">
              {lesson.topics.map((topic) => (
                <li key={topic}>
                  <a
                    href={`#${anchorId(topic)}`}
                    className="block text-[13.5px] leading-[1.45] text-dojo-textDim transition-colors hover:text-dojo-textBright"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <button
        onClick={() => supabase.auth.signOut()}
        className="fixed bottom-2 right-2 rounded border border-dojo-border2 bg-dojo-panel px-2 py-1 font-mono text-[10px] text-dojo-textDim hover:text-dojo-textBright"
        title={session.user.email}
      >
        sair
      </button>
    </div>
  );
}
