import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Difficulty, Problem, Profile } from "../lib/types";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const DIFFICULTIES: Difficulty[] = ["Fácil", "Médio", "Difícil"];

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  Fácil: "var(--dojo-green-bright)",
  Médio: "var(--dojo-amber)",
  Difícil: "var(--dojo-red)",
};

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  Fácil: 0,
  Médio: 1,
  Difícil: 2,
};

type StatusFilter = "todos" | "resolvidos" | "pendentes";
type ViewMode = "grid" | "list";
type SortOption = "padrao" | "alfabetica" | "dificuldade" | "pendentes-primeiro";

const SORT_LABEL: Record<SortOption, string> = {
  padrao: "Padrão",
  alfabetica: "Ordem alfabética",
  dificuldade: "Dificuldade (fácil → difícil)",
  "pendentes-primeiro": "Pendentes primeiro",
};

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
  const [difficulties, setDifficulties] = useState<Set<Difficulty>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<StatusFilter>("todos");
  const [viewMode, setViewMode] = useState<ViewMode>(
    () => (localStorage.getItem("dojo-view-mode") as ViewMode) || "grid",
  );
  const [sortBy, setSortBy] = useState<SortOption>("padrao");

  useEffect(() => {
    localStorage.setItem("dojo-view-mode", viewMode);
  }, [viewMode]);

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
    (search !== "" ? 1 : 0) + difficulties.size + tags.size + (status !== "todos" ? 1 : 0);
  const filtersActive = activeFilterCount > 0;

  function clearFilters() {
    setSearch("");
    setDifficulties(new Set());
    setTags(new Set());
    setStatus("todos");
  }

  function toggleDifficulty(d: Difficulty) {
    setDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  }

  function toggleTag(t: string) {
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = problems.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q)) return false;
      if (difficulties.size > 0 && !difficulties.has(p.difficulty)) return false;
      if (tags.size > 0 && !p.tags.some((t) => tags.has(t))) return false;
      const solved = solvedIds.has(p.id);
      if (status === "resolvidos" && !solved) return false;
      if (status === "pendentes" && solved) return false;
      return true;
    });

    switch (sortBy) {
      case "alfabetica":
        return [...result].sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
      case "dificuldade":
        return [...result].sort((a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]);
      case "pendentes-primeiro":
        return [...result].sort((a, b) => {
          const aSolved = solvedIds.has(a.id) ? 1 : 0;
          const bSolved = solvedIds.has(b.id) ? 1 : 0;
          return aSolved - bSolved;
        });
      default:
        return result;
    }
  }, [problems, search, difficulties, tags, status, solvedIds, sortBy]);

  const pct = problems.length > 0 ? Math.round((solvedIds.size / problems.length) * 100) : 0;

  // Chave que muda quando view/ordenação/filtros de categoria mudam (não a
  // busca, pra não reanimar a cada tecla digitada) — força o grid a remontar
  // e os cards a entrarem de novo com o efeito de cascata.
  const listKey = `${viewMode}-${sortBy}-${status}-${[...difficulties].sort().join(",")}-${[...tags].sort().join(",")}`;

  if (loading) {
    return (
      <div className="animate-dojo-fade flex h-screen flex-col items-center justify-center gap-3 bg-dojo-bg font-sans text-sm text-dojo-textDim">
        <Spinner />
        Carregando problemas...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-dojo-bg font-sans text-dojo-text">
      <Header profiles={profiles} subtitle="Problemas" />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10">
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

            <div className="flex-none rounded-xl bg-dojo-panel px-5 py-3.5" style={{ border: "1px solid var(--dojo-hairline)" }}>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[22px] font-bold text-dojo-textBright">{solvedIds.size}</span>
                <span className="font-mono text-[13px] text-dojo-textDim">/ {problems.length} concluídos</span>
              </div>
              <div className="mt-2.5 h-2 w-44 overflow-hidden rounded-full bg-dojo-surfaceSunken">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.max(pct, 4)}%`, background: "var(--dojo-accent)", boxShadow: "0 0 8px rgba(43,149,224,0.6)" }}
                />
              </div>
              <div className="mt-1.5 text-right font-mono text-[11px] text-dojo-accent">{pct}% concluído</div>
            </div>
          </div>

          {loadError && (
            <div className="rounded-md bg-dojo-dangerBg px-3 py-2 text-[13px] text-dojo-red" style={{ border: "1px solid var(--dojo-red-soft-border)" }}>
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
          <div className="flex flex-col gap-4 rounded-xl bg-dojo-panel p-5" style={{ border: "1px solid var(--dojo-hairline)" }}>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-dojo-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-dojo-textDim">
                Filtros
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <FilterRow label="Nível">
                <FilterChip active={difficulties.size === 0} onClick={() => setDifficulties(new Set())}>
                  Todos
                </FilterChip>
                {DIFFICULTIES.map((d) => (
                  <FilterChip key={d} active={difficulties.has(d)} onClick={() => toggleDifficulty(d)}>
                    {d}
                  </FilterChip>
                ))}
              </FilterRow>

              <FilterRow label="Tema">
                <FilterChip active={tags.size === 0} onClick={() => setTags(new Set())}>
                  Todos
                </FilterChip>
                {allTags.map((t) => (
                  <FilterChip key={t} active={tags.has(t)} onClick={() => toggleTag(t)}>
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
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-dojo-textDim">
                {filtered.length} {filtered.length === 1 ? "desafio" : "desafios"}
              </span>
              <div className="flex items-center gap-2.5">
                <SortSelect value={sortBy} onChange={setSortBy} />
                <ViewToggle mode={viewMode} onChange={setViewMode} />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl bg-dojo-panel px-4 py-12 text-center text-sm text-dojo-textDim">
                Nenhum problema encontrado com esses filtros.
              </div>
            ) : viewMode === "grid" ? (
              <div key={listKey} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProblemCard key={p.id} index={i + 1} entryDelay={i} problem={p} solved={solvedIds.has(p.id)} compact />
                ))}
              </div>
            ) : (
              <div key={listKey} className="flex flex-col gap-4">
                {filtered.map((p, i) => (
                  <ProblemCard key={p.id} index={i + 1} entryDelay={i} problem={p} solved={solvedIds.has(p.id)} />
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
      className="rounded-full px-3 py-1.5 text-[12px] font-medium transition active:scale-95"
      style={
        active
          ? { background: "var(--dojo-accent-soft-bg)", color: "var(--dojo-accent)", boxShadow: "0 0 0 1px rgba(43,149,224,0.4) inset" }
          : { background: "var(--dojo-surface-sunken)", color: "var(--dojo-text-dim)" }
      }
    >
      {children}
    </button>
  );
}

function SortSelect({ value, onChange }: { value: SortOption; onChange: (s: SortOption) => void }) {
  return (
    <div className="relative flex items-center">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute left-2.5 text-dojo-textDim"
      >
        <path d="M3 6h18M6 12h12M10 18h4" />
      </svg>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="cursor-pointer appearance-none rounded-lg py-1.5 pl-7 pr-6 text-[12px] font-medium text-dojo-textDim outline-none transition hover:text-dojo-textBright"
        style={{ background: "var(--dojo-surface-sunken)" }}
      >
        {(Object.keys(SORT_LABEL) as SortOption[]).map((opt) => (
          <option key={opt} value={opt}>
            {SORT_LABEL[opt]}
          </option>
        ))}
      </select>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-2 text-dojo-textDim"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "var(--dojo-surface-sunken)" }}>
      <ViewToggleButton active={mode === "grid"} onClick={() => onChange("grid")} title="Ver em grade">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </ViewToggleButton>
      <ViewToggleButton active={mode === "list"} onClick={() => onChange("list")} title="Ver em lista">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </ViewToggleButton>
    </div>
  );
}

function ViewToggleButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center rounded-md p-1.5 transition active:scale-90"
      style={
        active
          ? { background: "var(--dojo-accent-soft-bg)", color: "var(--dojo-accent)" }
          : { background: "transparent", color: "var(--dojo-text-dim)" }
      }
    >
      {children}
    </button>
  );
}

function ProblemCard({
  problem,
  solved,
  index,
  compact,
  entryDelay = 0,
}: {
  problem: Problem;
  solved: boolean;
  index: number;
  compact?: boolean;
  entryDelay?: number;
}) {
  const diffColor = DIFFICULTY_COLOR[problem.difficulty];

  return (
    <Link
      to={`/problema/${problem.slug}`}
      className={`group animate-dojo-fade relative flex flex-col gap-3.5 overflow-hidden rounded-xl bg-dojo-card px-6 py-5 transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-dojo-cardHover active:scale-[0.98] ${compact ? "h-full" : ""}`}
      style={{
        border: "1px solid var(--dojo-hairline)",
        animationDelay: `${Math.min(entryDelay, 12) * 40}ms`,
        animationFillMode: "backwards",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(43,149,224,0.45)";
        e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid var(--dojo-hairline)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: diffColor, opacity: 0.7 }} />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] text-dojo-textSubtle">{String(index).padStart(2, "0")}</span>
        <span
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em]"
          style={{ color: diffColor }}
        >
          <span className="h-[6px] w-[6px] rounded-full" style={{ background: diffColor }} />
          {problem.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <span className="text-[18px] font-semibold leading-tight text-dojo-textBright">
          {problem.title}
        </span>
        <div className="h-px w-full" style={{ background: "var(--dojo-hairline)" }} />
        <p className="m-0 line-clamp-2 text-[13.5px] leading-snug text-dojo-textDim">{shortDescription(problem.description)}</p>
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {problem.tags.map((t) => (
            <span
              key={t}
              className="rounded-md px-2 py-[3px] text-[10.5px] text-dojo-textDim"
              style={{ background: "var(--dojo-hairline)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-none items-center gap-2.5">
          <span
            className="flex items-center gap-1.5 text-[11.5px] font-medium"
            style={{ color: solved ? "var(--dojo-green-bright)" : "var(--dojo-text-dim)" }}
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
            className="text-dojo-textSubtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-dojo-accent"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
