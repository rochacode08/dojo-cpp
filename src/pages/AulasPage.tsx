import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Profile } from "../lib/types";
import { LESSONS } from "../lib/lessons";
import Header from "../components/Header";

interface AulasPageProps {
  session: Session;
}

export default function AulasPage({ session }: AulasPageProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.error("erro ao buscar profiles:", error);
      if (data) setProfiles(data as Profile[]);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-dojo-bg font-sans text-dojo-text">
      <Header profiles={profiles} subtitle="Aulas" />

      <main className="mx-auto max-w-4xl px-4 py-7 sm:px-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-dojo-textBright">Aulas</h1>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-[1.6] text-dojo-textDim">
          As anotações da disciplina do prof. Mozar, organizadas por assunto. A teoria fica aqui; a
          prática, nos <Link to="/" className="underline underline-offset-2" style={{ color: "var(--dojo-accent)" }}>problemas</Link>.
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {LESSONS.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                to={`/aulas/${lesson.slug}`}
                className="flex gap-3.5 rounded-xl border border-dojo-border2 bg-dojo-card p-4 transition hover:border-dojo-accent hover:bg-dojo-cardHover sm:gap-4"
              >
                <div
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-lg font-mono text-[15px] font-bold"
                  style={{ background: "var(--dojo-accent-soft-bg)", color: "var(--dojo-accent)" }}
                >
                  {lesson.number}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <h2 className="text-[15px] font-semibold text-dojo-textBright">{lesson.title}</h2>
                    <span className="text-[11px] text-dojo-textFaint">{lesson.minutes} min de leitura</span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-[1.55] text-dojo-textDim">{lesson.summary}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {lesson.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-dojo-border2 px-2 py-[2px] text-[10.5px] text-dojo-textFaint"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

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
