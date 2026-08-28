import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Difficulty, Problem, Profile } from "../lib/types";
import Header from "../components/Header";

const DIFFICULTIES: Difficulty[] = ["Fácil", "Médio", "Difícil"];

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  Fácil: "#6ee7a0",
  Médio: "#f0c674",
  Difícil: "#ff8585",
};

type StatusFilter = "todos" | "resolvidos" | "pendentes";

interface HomePageProps {
  session: Session;
}

function shortDescription(description: string): string {
  const first = description.split("\n\n")[0]?.trim() ?? "";
  return first.length > 120 ? first.slice(0, 117).trimEnd() + "…" : first;
}

export default function HomePage({ session }: HomePageProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "todas">("todas");
  const [tag, setTag] = useState<string | "todas">("todas");
  const [status, setStatus] = useState<StatusFilter>("todos");

  useEffect(() => {
    (async () => {
      const [
        { data: profilesData, error: profilesError },
        { data: problemsData, error: problemsError },
        { data: submissionsData, error: submissionsError },
      ] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("problems").select("*").order("order_index"),
        supabase
          .from("submissions")
          .select("problem_id")
          .eq("user_id", session.user.id)
          .eq("status", "accepted"),
      ]);

      if (profilesError) console.error("erro ao buscar profiles:", profilesError);
      if (profilesData) setProfiles(profilesData as Profile[]);

      if (problemsError) {
        console.error("erro ao buscar problems:", problemsError);
        setLoadError(problemsError.message);
      }
      if (problemsData) setProblems(problemsData as Problem[]);

      if (submissionsError) console.error("erro ao buscar submissions:", submissionsError);
      if (submissionsData) {
        setSolvedIds(new Set(submissionsData.map((s) => s.problem_id as string)));
      }

      setLoading(false);
    })();
  }, [session.user.id]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    problems.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [problems]);

  const activeFilterCount =
    (search !== "" ? 1 : 0) + (difficulty !== "todas" ? 1 : 0) + (tag !== "todas" ? 1 : 0) + (status !== "todos" ? 1 : 0);
  const filtersActive = activeFilterCount > 0;

  function clearFilters() {
    setSearch("");
    setDifficulty("todas");
    setTag("todas");
    setStatus("todos");
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return problems.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q)) return false;
      if (difficulty !== "todas" && p.difficulty !== difficulty) return false;
      if (tag !== "todas" && !p.tags.includes(tag)) return false;
      const solved = solvedIds.has(p.id);
      if (status === "resolvidos" && !solved) return false;
      if (status === "pendentes" && solved) return false;
      return true;
    });
  }, [problems, search, difficulty, tag, status, solvedIds]);

  const pct = problems.length > 0 ? Math.round((solvedIds.size / problems.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dojo-bg font-sans text-sm text-dojo-textDim">
        Carregando problemas...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-dojo-bg font-sans text-dojo-text">
      <Header profiles={profiles} subtitle="Problemas" />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-10">
          {/* Hero */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="m-0 text-[32px] font-bold leading-tight tracking-[-0.025em] text-dojo-textBright">
                Problemas do Dojo
              </h1>
              <p className="m-0 text-[14.5px] text-dojo-textDim">
                Domine C++ resolvendo desafios reais, junto com o grupo.
              </p>
            </div>

            <div className="flex-none rounded-xl bg-dojo-panel px-5 py-3.5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[22px] font-bold text-dojo-textBright">{solvedIds.size}</span>
                <span className="font-mono text-[13px] text-dojo-textDim">/ {problems.length} concluídos</span>
              </div>
              <div className="mt-2.5 h-2 w-44 overflow-hidden rounded-full bg-[#0a0a0a]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.max(pct, 4)}%`, background: "#2b95e0", boxShadow: "0 0 8px rgba(43,149,224,0.6)" }}
                />
              </div>
              <div className="mt-1.5 text-right font-mono text-[11px] text-dojo-accent">{pct}% concluído</div>
            </div>
          </div>

          {loadError && (
            <div className="rounded-md border border-dojo-red/40 bg-[#241010] px-3 py-2 text-[13px] text-dojo-red">
              Erro ao carregar problemas: {loadError}
            </div>
          )}

          {/* Busca */}
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dojo-textDim"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar um problema..."
              className="w-full rounded-xl bg-dojo-panel py-3.5 pl-11 pr-4 text-[14.5px] text-dojo-text outline-none ring-1 ring-inset ring-white/[0.06] transition focus:ring-2 focus:ring-dojo-accent"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-col gap-4 rounded-xl bg-dojo-panel p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-dojo-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-dojo-textDim">
                Filtros
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <FilterRow label="Nível">
                <FilterChip active={difficulty === "todas"} onClick={() => setDifficulty("todas")}>
                  Todos
                </FilterChip>
                {DIFFICULTIES.map((d) => (
                  <FilterChip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
                    {d}
                  </FilterChip>
                ))}
              </FilterRow>

              <FilterRow label="Tema">
                <FilterChip active={tag === "todas"} onClick={() => setTag("todas")}>
                  Todos
                </FilterChip>
                {allTags.map((t) => (
                  <FilterChip key={t} active={tag === t} onClick={() => setTag(t)}>
                    {t}
                  </FilterChip>
                ))}
              </FilterRow>

              <FilterRow label="Status">
                <FilterChip active={status === "todos"} onClick={() => setStatus("todos")}>
                  Todos
                </FilterChip>
                <FilterChip active={status === "pendentes"} onClick={() => setStatus("pendentes")}>
                  Pendentes
                </FilterChip>
                <FilterChip active={status === "resolvidos"} onClick={() => setStatus("resolvidos")}>
                  Resolvidos
                </FilterChip>
              </FilterRow>
            </div>

            {filtersActive && (
              <div className="flex items-center gap-2 border-t border-white/[0.06] pt-3 text-[11.5px]">
                <span className="text-dojo-textDim">
                  {activeFilterCount} {activeFilterCount === 1 ? "filtro ativo" : "filtros ativos"}
                </span>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 font-medium text-dojo-accent hover:underline"
                >
                  <span>×</span> Limpar
                </button>
              </div>
            )}
          </div>

          {/* Lista */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-dojo-textDim">
              {filtered.length} {filtered.length === 1 ? "desafio" : "desafios"}
            </span>

            {filtered.length === 0 ? (
              <div className="rounded-xl bg-dojo-panel px-4 py-12 text-center text-sm text-dojo-textDim">
                Nenhum problema encontrado com esses filtros.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((p, i) => (
                  <ProblemCard key={p.id} index={i + 1} problem={p} solved={solvedIds.has(p.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
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

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-16 flex-none text-[11px] uppercase tracking-[0.04em] text-dojo-textDim">
        {label}
      </span>
      {children}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-1.5 text-[12px] font-medium transition"
      style={
        active
          ? { background: "rgba(43,149,224,0.18)", color: "#2b95e0", boxShadow: "0 0 0 1px rgba(43,149,224,0.4) inset" }
          : { background: "#0e1013", color: "#a3a3a3" }
      }
    >
      {children}
    </button>
  );
}

function ProblemCard({ problem, solved, index }: { problem: Problem; solved: boolean; index: number }) {
  const diffColor = DIFFICULTY_COLOR[problem.difficulty];

  return (
    <Link
      to={`/problema/${problem.slug}`}
      className="group relative flex flex-col gap-3.5 overflow-hidden rounded-xl bg-dojo-card px-6 py-5 transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-dojo-cardHover"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(43,149,224,0.45)";
        e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.05)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: diffColor, opacity: 0.7 }} />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] text-[#5a5a5a]">{String(index).padStart(2, "0")}</span>
        <span
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em]"
          style={{ color: diffColor }}
        >
          <span className="h-[6px] w-[6px] rounded-full" style={{ background: diffColor }} />
          {problem.difficulty}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-[18px] font-semibold leading-tight text-dojo-textBright transition-colors group-hover:text-white">
          {problem.title}
        </span>
        <div className="h-px w-full bg-white/[0.06]" />
        <p className="m-0 text-[13.5px] leading-snug text-[#9a9a9a]">{shortDescription(problem.description)}</p>
      </div>

      <div className="mt-1 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {problem.tags.map((t) => (
            <span key={t} className="rounded-md bg-white/[0.05] px-2 py-[3px] text-[10.5px] text-[#a3a3a3]">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-none items-center gap-2.5">
          <span
            className="flex items-center gap-1.5 text-[11.5px] font-medium"
            style={{ color: solved ? "#6ee7a0" : "#b0b0b0" }}
          >
            {solved ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
            )}
            {solved ? "Resolvido" : "Pendente"}
          </span>
          <span className="hidden text-[11.5px] font-medium text-dojo-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:inline">
            Abrir desafio
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#4a4a4a] transition-all duration-200 group-hover:translate-x-1 group-hover:text-dojo-accent"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
