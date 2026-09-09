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

/**
 * Aula que o usuário viu por último, guardada no navegador. Não é progresso de
 * verdade (não há como saber se ele leu), mas é o suficiente pra dizer "seu
 * próximo passo" sem inventar um estado de "concluída" que ninguém marcou.
 */
const LAST_READ_KEY = "dojo-ultima-aula";

function ClockIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function AulasPage({ session }: AulasPageProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [lastRead, setLastRead] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLastRead(localStorage.getItem(LAST_READ_KEY));
    } catch {
      // navegador sem localStorage: segue sem "próximo passo" personalizado
    }
    (async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.error("erro ao buscar profiles:", error);
      if (data) setProfiles(data as Profile[]);
    })();
  }, []);

  const lastIndex = lastRead ? LESSONS.findIndex((l) => l.slug === lastRead) : -1;
  const nextLesson = LESSONS[lastIndex + 1] ?? LESSONS[0];
  const resuming = lastIndex >= 0 && lastIndex + 1 < LESSONS.length;

  return (
    <div className="min-h-screen bg-dojo-bg font-sans text-dojo-text">
      <Header profiles={profiles} subtitle="" me={profiles.find((p) => p.id === session.user.id) ?? null} />

      <main className="mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-9">
        <h1 className="m-0 text-[26px] font-bold leading-tight tracking-[-0.02em] text-dojo-textBright sm:text-[30px]">
          Aulas
        </h1>
        <p className="mt-1.5 max-w-[65ch] text-[15px] leading-relaxed text-dojo-textDim">
          As anotações da disciplina do prof. Mozar, na ordem em que foram dadas. A teoria fica
          aqui; a prática, nos{" "}
          <Link to="/" className="font-medium underline underline-offset-2" style={{ color: "var(--dojo-accent)" }}>
            problemas
          </Link>
          .
        </p>

        {/* Seu próximo passo */}
        <div
          className="mt-6 flex flex-col gap-3 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ background: "var(--dojo-accent-soft-bg)", border: "1px solid var(--dojo-border2)" }}
        >
          <div className="min-w-0">
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--dojo-accent)" }}>
              Seu próximo passo
            </span>
            <p className="m-0 mt-1 text-[16px] font-semibold text-dojo-textBright">
              Aula {nextLesson.number} · {nextLesson.title}
            </p>
            <p className="m-0 mt-0.5 text-[13.5px] text-dojo-textDim">
              {resuming ? "Continuando de onde você parou." : "Comece por aqui."} {nextLesson.minutes} min de leitura.
            </p>
          </div>
          <Link
            to={`/aulas/${nextLesson.slug}`}
            className="flex h-11 flex-none items-center justify-center gap-2 rounded-lg px-5 text-[14.5px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
            style={{ background: "var(--dojo-accent-solid)" }}
          >
            {resuming ? "Continuar" : "Começar"}
            <ArrowIcon />
          </Link>
        </div>

        {/* Trilha */}
        <ol className="relative mt-8 flex list-none flex-col gap-4 pl-0">
          {/* Linha que conecta as aulas, atrás dos números */}
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-6 bottom-6 w-[2px] rounded-full"
            style={{ background: "var(--dojo-border)" }}
          />

          {LESSONS.map((lesson, i) => {
            const isNext = lesson.slug === nextLesson.slug;
            const seen = lastIndex >= 0 && i <= lastIndex;
            return (
              <li key={lesson.slug} className="relative">
                <Link
                  to={`/aulas/${lesson.slug}`}
                  className="group flex gap-4 rounded-xl bg-dojo-card p-4 transition-all duration-200 hover:-translate-y-[2px] hover:bg-dojo-cardHover sm:p-5"
                  style={{ border: `1px solid ${isNext ? "var(--dojo-accent)" : "var(--dojo-border)"}` }}
                >
                  <div
                    className="z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full font-mono text-[15px] font-bold"
                    style={
                      isNext
                        ? { background: "var(--dojo-accent-solid)", color: "#ffffff" }
                        : seen
                          ? { background: "var(--dojo-surface-raised)", color: "var(--dojo-green-bright)", border: "1px solid var(--dojo-border2)" }
                          : { background: "var(--dojo-surface-raised)", color: "var(--dojo-text-dim)", border: "1px solid var(--dojo-border2)" }
                    }
                  >
                    {lesson.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="m-0 text-[18px] font-semibold text-dojo-textBright">{lesson.title}</h2>
                      <span className="flex items-center gap-1 text-[13px] text-dojo-textFaint">
                        <ClockIcon />
                        {lesson.minutes} min
                      </span>
                      {isNext && (
                        <span
                          className="rounded-md px-2 py-[2px] text-[11.5px] font-bold uppercase tracking-[0.05em]"
                          style={{ background: "var(--dojo-accent-soft-bg)", color: "var(--dojo-accent)" }}
                        >
                          {resuming ? "Continuar" : "Começar"}
                        </span>
                      )}
                    </div>

                    <p className="m-0 mt-1.5 text-[14px] leading-[1.55] text-dojo-textDim">{lesson.summary}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {lesson.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md px-2 py-[3px] text-[11.5px] text-dojo-textFaint"
                          style={{ background: "var(--dojo-surface-sunken)" }}
                        >
                          {topic}
                        </span>
                      ))}
                      {lesson.topics.length > 4 && (
                        <span className="px-1 py-[3px] text-[11.5px] text-dojo-textFaint">
                          +{lesson.topics.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="hidden flex-none self-center text-dojo-textFaint transition-all group-hover:translate-x-1 group-hover:text-dojo-accent sm:block">
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>

      <button
        onClick={() => supabase.auth.signOut()}
        className="fixed bottom-2 right-2 rounded-lg border border-dojo-border2 bg-dojo-panel px-2.5 py-1.5 font-mono text-[11px] text-dojo-textDim transition-colors hover:text-dojo-textBright"
        title={session.user.email}
      >
        sair
      </button>
    </div>
  );
}
