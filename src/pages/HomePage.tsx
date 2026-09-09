import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

/** De quantos em quantos problemas comemoramos uma meta. */
const MILESTONE_STEP = 10;

type StatusFilter = "todos" | "resolvidos" | "pendentes";
type ViewMode = "grid" | "list";
type SortOption =
  "padrao" | "alfabetica" | "dificuldade" | "pendentes-primeiro";

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
  return first.length > 150 ? first.slice(0, 147).trimEnd() + "…" : first;
}

export default function HomePage({ session }: HomePageProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ?tema=Loops chega das aulas ("agora pratique") já com o filtro aplicado.
  const [searchParams] = useSearchParams();
  const temaParam = searchParams.get("tema");

  const [search, setSearch] = useState("");
  const [difficulties, setDifficulties] = useState<Set<Difficulty>>(new Set());
  const [tags, setTags] = useState<Set<string>>(() => new Set(temaParam ? [temaParam] : []));
  const [status, setStatus] = useState<StatusFilter>("todos");
  const [viewMode, setViewMode] = useState<ViewMode>(
    () => (localStorage.getItem("dojo-view-mode") as ViewMode) || "grid",
  );
  const [sortBy, setSortBy] = useState<SortOption>("padrao");
  // Em telas estreitas os filtros começam fechados: eles ocupavam a tela toda
  // antes de o usuário ver um desafio sequer.
  const [filtersOpen, setFiltersOpen] = useState(
    () => window.innerWidth >= 768,
  );
  const [showMoreFilters, setShowMoreFilters] = useState(() => temaParam !== null);

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

      if (profilesError)
        console.error("erro ao buscar profiles:", profilesError);
      if (profilesData) setProfiles(profilesData as Profile[]);

      if (problemsError) {
        console.error("erro ao buscar problems:", problemsError);
        setLoadError(problemsError.message);
      }
      if (problemsData) setProblems(problemsData as Problem[]);

      if (submissionsError)
        console.error("erro ao buscar submissions:", submissionsError);
      if (submissionsData) {
        setSolvedIds(
          new Set(submissionsData.map((s) => s.problem_id as string)),
        );
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
    (search !== "" ? 1 : 0) +
    difficulties.size +
    tags.size +
    (status !== "todos" ? 1 : 0);
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
      if (q) {
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDescription = p.description.toLowerCase().includes(q);
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDescription && !matchesTag) return false;
      }
      if (difficulties.size > 0 && !difficulties.has(p.difficulty))
        return false;
      if (tags.size > 0 && !p.tags.some((t) => tags.has(t))) return false;
      const solved = solvedIds.has(p.id);
      if (status === "resolvidos" && !solved) return false;
      if (status === "pendentes" && solved) return false;
      return true;
    });

    switch (sortBy) {
      case "alfabetica":
        return [...result].sort((a, b) =>
          a.title.localeCompare(b.title, "pt-BR"),
        );
      case "dificuldade":
        return [...result].sort(
          (a, b) =>
            DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty],
        );
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

  const solved = solvedIds.size;
  const total = problems.length;
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

  /** Próximo problema ainda não resolvido, na ordem do curso. */
  const nextProblem = useMemo(
    () => problems.find((p) => !solvedIds.has(p.id)) ?? null,
    [problems, solvedIds],
  );

  const nextMilestone = Math.min(
    (Math.floor(solved / MILESTONE_STEP) + 1) * MILESTONE_STEP,
    total,
  );
  const toMilestone = Math.max(nextMilestone - solved, 0);

  const listKey = `${viewMode}-${sortBy}-${status}-${[...difficulties].sort().join(",")}-${[...tags].sort().join(",")}`;

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="animate-dojo-fade flex h-screen flex-col items-center justify-center gap-3 bg-dojo-bg font-sans text-[15px] text-dojo-textDim"
      >
        <Spinner />
        Carregando problemas...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-dojo-bg font-sans text-dojo-text">
      <Header
        profiles={profiles}
        subtitle=""
        me={profiles.find((p) => p.id === session.user.id) ?? null}
      />

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-7 sm:px-6 sm:py-9">
          <div className="flex flex-col gap-1.5">
            <h1 className="m-0 text-[26px] font-bold leading-tight tracking-[-0.02em] text-dojo-textBright sm:text-[30px]">
              Problemas do Dojo
            </h1>
            <p className="m-0 max-w-[65ch] text-[15px] leading-relaxed text-dojo-textDim">
              Domine C++ resolvendo desafios reais, junto com o grupo.
            </p>
          </div>

          {loadError && (
            <div
              role="alert"
              className="rounded-lg bg-dojo-dangerBg px-4 py-3 text-[14px] text-dojo-red"
              style={{ border: "1px solid var(--dojo-red-soft-border)" }}
            >
              Erro ao carregar problemas: {loadError}
            </div>
          )}

          {/* Camada 1: busca larga à esquerda, progresso acionável à direita */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-3">
              <SearchField value={search} onChange={setSearch} />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-[14px] text-dojo-textDim">
                  <strong className="font-semibold text-dojo-textBright">
                    {filtered.length}
                  </strong>
                  {filtered.length === total
                    ? " desafios"
                    : ` de ${total} desafios`}
                </span>
                {filtersActive && (
                  <button
                    onClick={clearFilters}
                    className="rounded-lg px-2 py-1 text-[13.5px] font-medium text-dojo-accent transition-colors hover:bg-dojo-surfaceHover"
                  >
                    Limpar filtros ({activeFilterCount})
                  </button>
                )}
                <button
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                  className="ml-auto flex h-9 items-center gap-2 rounded-lg border border-dojo-border2 px-3 text-[13.5px] font-medium text-dojo-text transition-colors hover:bg-dojo-surfaceHover md:hidden"
                >
                  <FilterIcon />
                  Filtrar
                  {activeFilterCount > 0 && (
                    <span
                      className="flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-bold text-white"
                      style={{ background: "var(--dojo-accent-solid)" }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Camadas 2 e 3: principais sempre visíveis, secundários recolhidos */}
              {filtersOpen && (
                <div
                  className="flex flex-col gap-4 rounded-xl bg-dojo-panel p-4 sm:p-5"
                  style={{ border: "1px solid var(--dojo-border)" }}
                >
                  <div className="flex flex-col gap-3">
                    <FilterRow label="Nível">
                      <FilterChip
                        active={difficulties.size === 0}
                        onClick={() => setDifficulties(new Set())}
                      >
                        Todos
                      </FilterChip>
                      {DIFFICULTIES.map((d) => (
                        <FilterChip
                          key={d}
                          active={difficulties.has(d)}
                          onClick={() => toggleDifficulty(d)}
                          dot={DIFFICULTY_COLOR[d]}
                        >
                          {d}
                        </FilterChip>
                      ))}
                    </FilterRow>

                    <FilterRow label="Status">
                      <FilterChip
                        active={status === "todos"}
                        onClick={() => setStatus("todos")}
                      >
                        Todos
                      </FilterChip>
                      <FilterChip
                        active={status === "pendentes"}
                        onClick={() => setStatus("pendentes")}
                      >
                        Pendentes
                      </FilterChip>
                      <FilterChip
                        active={status === "resolvidos"}
                        onClick={() => setStatus("resolvidos")}
                      >
                        Resolvidos
                      </FilterChip>
                    </FilterRow>
                  </div>

                  <div className="border-t border-dojo-border pt-3.5">
                    <button
                      onClick={() => setShowMoreFilters((v) => !v)}
                      aria-expanded={showMoreFilters}
                      className="flex items-center gap-1.5 text-[13.5px] font-medium text-dojo-textDim transition-colors hover:text-dojo-textBright"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: showMoreFilters
                            ? "rotate(180deg)"
                            : "none",
                          transition: "transform 150ms",
                        }}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      Tema e ordenação
                      {tags.size > 0 && (
                        <span className="text-dojo-accent">({tags.size})</span>
                      )}
                    </button>

                    {showMoreFilters && (
                      <div className="mt-3.5 flex flex-col gap-3.5">
                        <FilterRow label="Tema">
                          <FilterChip
                            active={tags.size === 0}
                            onClick={() => setTags(new Set())}
                          >
                            Todos
                          </FilterChip>
                          {allTags.map((t) => (
                            <FilterChip
                              key={t}
                              active={tags.has(t)}
                              onClick={() => toggleTag(t)}
                            >
                              {t}
                            </FilterChip>
                          ))}
                        </FilterRow>
                        <FilterRow label="Ordem">
                          <SortSelect value={sortBy} onChange={setSortBy} />
                          <ViewToggle mode={viewMode} onChange={setViewMode} />
                        </FilterRow>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <ProgressCard
              solved={solved}
              total={total}
              pct={pct}
              toMilestone={toMilestone}
              nextMilestone={nextMilestone}
              nextProblem={nextProblem}
            />
          </div>

          {filtered.length === 0 ? (
            <div
              className="rounded-xl bg-dojo-panel px-4 py-14 text-center"
              style={{ border: "1px solid var(--dojo-border)" }}
            >
              <p className="m-0 text-[15px] text-dojo-text">
                Nenhum desafio com esses filtros.
              </p>
              <button
                onClick={clearFilters}
                className="mt-3 text-[14px] font-medium text-dojo-accent hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div
              key={listKey}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((p, i) => (
                <ProblemCard
                  key={p.id}
                  index={p.order_index}
                  entryDelay={i}
                  problem={p}
                  solved={solvedIds.has(p.id)}
                />
              ))}
            </div>
          ) : (
            <div key={listKey} className="flex flex-col gap-3">
              {filtered.map((p, i) => (
                <ProblemCard
                  key={p.id}
                  index={p.order_index}
                  entryDelay={i}
                  problem={p}
                  solved={solvedIds.has(p.id)}
                  wide
                />
              ))}
            </div>
          )}
        </div>
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

function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M7 12h10M10 18h4" />
    </svg>
  );
}

function SearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <svg
        width="17"
        height="17"
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por título, tema ou enunciado..."
        aria-label="Buscar problemas"
        className="h-12 w-full rounded-xl bg-dojo-panel pl-11 pr-4 text-[15px] text-dojo-text outline-none transition focus:ring-2 focus:ring-dojo-accent"
        style={{ border: "1px solid var(--dojo-border)" }}
      />
    </div>
  );
}

/**
 * Progresso como bloco de ação, não como placar passivo: além do quanto já foi
 * feito, diz quanto falta pra próxima meta e leva direto ao próximo desafio.
 */
function ProgressCard({
  solved,
  total,
  pct,
  toMilestone,
  nextMilestone,
  nextProblem,
}: {
  solved: number;
  total: number;
  pct: number;
  toMilestone: number;
  nextMilestone: number;
  nextProblem: Problem | null;
}) {
  const done = nextProblem === null;

  return (
    <div
      className="flex flex-col gap-3.5 rounded-xl bg-dojo-panel p-5"
      style={{ border: "1px solid var(--dojo-border)" }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[28px] font-bold leading-none text-dojo-textBright">
            {solved}
          </span>
          <span className="text-[14px] text-dojo-textDim">
            de {total} resolvidos
          </span>
        </div>
        <span
          className="font-mono text-[14px] font-semibold"
          style={{ color: "var(--dojo-accent)" }}
        >
          {pct}%
        </span>
      </div>

      <div
        className="h-2.5 overflow-hidden rounded-full bg-dojo-surfaceSunken"
        role="progressbar"
        aria-valuenow={solved}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${solved} de ${total} desafios resolvidos`}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.max(pct, 2)}%`,
            background: "var(--dojo-accent)",
          }}
        />
      </div>

      {done ? (
        <p
          className="m-0 text-[14px] font-medium"
          style={{ color: "var(--dojo-green-bright)" }}
        >
          Você resolveu todos os desafios. 🥋
        </p>
      ) : (
        <>
          <p className="m-0 text-[14px] text-dojo-textDim">
            {toMilestone === 0
              ? "Continue de onde parou."
              : `Faltam ${toMilestone} para chegar a ${nextMilestone}.`}
          </p>
          <Link
            to={`/problema/${nextProblem.slug}`}
            className="flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-[14.5px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
            style={{ background: "var(--dojo-accent-solid)" }}
          >
            Continuar de onde parei
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
          <span className="-mt-1 truncate text-center text-[12.5px] text-dojo-textFaint">
            {String(nextProblem.order_index).padStart(2, "0")} ·{" "}
            {nextProblem.title}
          </span>
        </>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-[52px] flex-none text-[12px] font-semibold uppercase tracking-[0.05em] text-dojo-textFaint">
        {label}
      </span>
      {children}
    </div>
  );
}

/** Ativo = preenchimento sólido. Só borda não se distinguia o bastante. */
function FilterChip({
  active,
  onClick,
  children,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex h-10 items-center gap-2 rounded-lg px-3.5 text-[13.5px] font-medium transition active:scale-95 sm:h-9"
      style={
        active
          ? { background: "var(--dojo-accent-solid)", color: "#ffffff" }
          : {
              background: "var(--dojo-surface-sunken)",
              color: "var(--dojo-text-dim)",
              border: "1px solid var(--dojo-border)",
            }
      }
    >
      {dot && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: active ? "#ffffff" : dot }}
        />
      )}
      {children}
    </button>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (s: SortOption) => void;
}) {
  return (
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        aria-label="Ordenar problemas"
        className="h-10 cursor-pointer appearance-none rounded-lg pl-3.5 pr-9 text-[13.5px] font-medium text-dojo-text transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-accent sm:h-9"
        style={{
          background: "var(--dojo-surface-sunken)",
          border: "1px solid var(--dojo-border)",
        }}
      >
        {(Object.keys(SORT_LABEL) as SortOption[]).map((opt) => (
          <option key={opt} value={opt}>
            {SORT_LABEL[opt]}
          </option>
        ))}
      </select>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 text-dojo-textDim"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function ViewToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div
      className="flex h-10 items-center gap-1 rounded-lg p-1 sm:h-9"
      style={{
        background: "var(--dojo-surface-sunken)",
        border: "1px solid var(--dojo-border)",
      }}
    >
      <ViewToggleButton
        active={mode === "grid"}
        onClick={() => onChange("grid")}
        title="Ver em grade"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </ViewToggleButton>
      <ViewToggleButton
        active={mode === "list"}
        onClick={() => onChange("list")}
        title="Ver em lista"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className="flex h-full items-center justify-center rounded-md px-2 transition active:scale-90"
      style={
        active
          ? { background: "var(--dojo-accent-solid)", color: "#ffffff" }
          : { background: "transparent", color: "var(--dojo-text-dim)" }
      }
    >
      {children}
    </button>
  );
}

function CheckCircle() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="currentColor"
        opacity="0.16"
        stroke="none"
      />
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

function ProblemCard({
  problem,
  solved,
  index,
  wide,
  entryDelay = 0,
}: {
  problem: Problem;
  solved: boolean;
  index: number;
  wide?: boolean;
  entryDelay?: number;
}) {
  const diffColor = DIFFICULTY_COLOR[problem.difficulty];

  return (
    <Link
      to={`/problema/${problem.slug}`}
      className={`group animate-dojo-fade relative flex flex-col gap-3 overflow-hidden rounded-xl bg-dojo-card p-5 transition-all duration-200 ease-out hover:-translate-y-[2px] hover:bg-dojo-cardHover active:scale-[0.99] ${wide ? "" : "h-full"}`}
      style={{
        border: "1px solid var(--dojo-border)",
        animationDelay: `${Math.min(entryDelay, 12) * 40}ms`,
        animationFillMode: "backwards",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--dojo-accent)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.28)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--dojo-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Topo: número e dificuldade */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[13px] font-medium text-dojo-textFaint">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2.5">
          {solved && (
            <span
              style={{ color: "var(--dojo-green-bright)" }}
              title="Resolvido"
            >
              <CheckCircle />
            </span>
          )}
          <span
            className="rounded-md px-2 py-1 text-[11.5px] font-bold uppercase tracking-[0.05em]"
            style={{
              color: diffColor,
              background: "var(--dojo-surface-sunken)",
            }}
          >
            {problem.difficulty}
          </span>
        </div>
      </div>

      {/* Centro: título e enunciado */}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="m-0 text-[18px] font-semibold leading-snug text-dojo-textBright">
          {problem.title}
        </h3>
        <p className="m-0 line-clamp-3 hidden text-[14px] leading-[1.55] text-dojo-textDim sm:line-clamp-3 sm:block">
          {shortDescription(problem.description)}
        </p>
      </div>

      {/* Base: temas e ação */}
      <div className="mt-1 flex items-center justify-between gap-3 border-t border-dojo-border pt-3">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {problem.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-md px-2 py-[3px] text-[11.5px] text-dojo-textFaint"
              style={{ background: "var(--dojo-surface-sunken)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <span
          className="flex flex-none items-center gap-1.5 text-[13.5px] font-semibold transition-colors"
          style={{
            color: solved ? "var(--dojo-text-dim)" : "var(--dojo-accent)",
          }}
        >
          {solved ? "Revisar" : "Começar"}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
