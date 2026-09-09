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
  }, [slug]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-dojo-bg font-sans text-dojo-text">
        <Header profiles={profiles} subtitle="Aulas" backTo="/aulas" />
        <main className="mx-auto max-w-3xl px-4 py-12 text-center">
          <p className="text-sm text-dojo-textDim">Aula não encontrada.</p>
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
      <Header profiles={profiles} subtitle={`Aula ${lesson.number}`} backTo="/aulas" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_220px]">
        <main className="min-w-0 text-[13.5px]">
          <Link to="/aulas" className="text-[11.5px] text-dojo-textDim transition-colors hover:text-dojo-textBright">
            ← Todas as aulas
          </Link>

          <h1 className="mt-2 text-[24px] font-semibold tracking-tight text-dojo-textBright">
            <span className="font-mono text-[15px]" style={{ color: "var(--dojo-accent)" }}>
              Aula {lesson.number}
            </span>
            <span className="mt-0.5 block">{lesson.title}</span>
          </h1>

          <div className="mt-6">
            <Markdown>{lesson.body}</Markdown>
          </div>

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
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-dojo-textFaint">
              Nesta aula
            </span>
            <ul className="mt-2.5 flex flex-col gap-1.5 border-l border-dojo-border pl-3">
              {lesson.topics.map((topic) => (
                <li key={topic}>
                  <a
                    href={`#${anchorId(topic)}`}
                    className="block text-[12px] leading-[1.4] text-dojo-textDim transition-colors hover:text-dojo-textBright"
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
