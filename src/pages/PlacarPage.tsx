import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Profile } from "../lib/types";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

interface PlacarPageProps {
  session: Session;
}

interface Ranking {
  profile: Profile;
  solved: number;
  lastSolvedAt: string | null;
}

export default function PlacarPage({ session }: PlacarPageProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rows, setRows] = useState<{ user_id: string; problem_id: string; created_at: string }[]>([]);
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [
        { data: profilesData, error: profilesError },
        { data: submissionsData, error: submissionsError },
        { count: problemsCount },
      ] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase
          .from("submissions")
          .select("user_id, problem_id, created_at")
          .eq("status", "accepted"),
        supabase.from("problems").select("*", { count: "exact", head: true }),
      ]);

      if (profilesError) console.error("erro ao buscar profiles:", profilesError);
      if (profilesData) setProfiles(profilesData as Profile[]);

      if (submissionsError) console.error("erro ao buscar submissions:", submissionsError);
      if (submissionsData) setRows(submissionsData as typeof rows);

      setTotalProblems(problemsCount ?? 0);
      setLoading(false);
    })();
  }, []);

  const ranking = useMemo<Ranking[]>(() => {
    const byUser = new Map<string, { solved: Set<string>; lastSolvedAt: string | null }>();
    for (const r of rows) {
      const entry = byUser.get(r.user_id) ?? { solved: new Set<string>(), lastSolvedAt: null };
      entry.solved.add(r.problem_id);
      if (!entry.lastSolvedAt || r.created_at > entry.lastSolvedAt) entry.lastSolvedAt = r.created_at;
      byUser.set(r.user_id, entry);
    }

    return profiles
      .map((profile) => {
        const entry = byUser.get(profile.id);
        return {
          profile,
          solved: entry?.solved.size ?? 0,
          lastSolvedAt: entry?.lastSolvedAt ?? null,
        };
      })
      .sort((a, b) => b.solved - a.solved);
  }, [profiles, rows]);

  if (loading) {
    return (
      <div className="animate-dojo-fade flex h-screen flex-col items-center justify-center gap-3 bg-dojo-bg font-sans text-sm text-dojo-textDim">
        <Spinner />
        Carregando placar...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-dojo-bg font-sans text-dojo-text">
      <Header profiles={profiles} subtitle="Placar" />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-6 py-10">
          <div className="flex flex-col gap-2">
            <h1 className="m-0 text-[32px] font-bold leading-tight tracking-[-0.025em] text-dojo-textBright">
              Placar do Dojo
            </h1>
            <p className="m-0 text-[14.5px] text-dojo-textDim">
              Quem já resolveu mais desafios, de {totalProblems} no total.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {ranking.map((r, i) => (
              <RankRow key={r.profile.id} rank={i + 1} index={i} r={r} totalProblems={totalProblems} isMe={r.profile.id === session.user.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const MEDAL = ["#f0c674", "#c9c9c9", "#c97b4a"];

function RankRow({
  rank,
  index,
  r,
  totalProblems,
  isMe,
}: {
  rank: number;
  index: number;
  r: Ranking;
  totalProblems: number;
  isMe: boolean;
}) {
  const pct = totalProblems > 0 ? Math.round((r.solved / totalProblems) * 100) : 0;
  const medal = MEDAL[rank - 1];
  const [barPct, setBarPct] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setBarPct(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);

  return (
    <div
      className="animate-dojo-fade flex items-center gap-4 rounded-xl bg-dojo-card px-5 py-4"
      style={{
        border: isMe ? "1px solid rgba(43,149,224,0.4)" : "1px solid var(--dojo-hairline)",
        animationDelay: `${index * 60}ms`,
        animationFillMode: "backwards",
      }}
    >
      <span
        className="w-6 flex-none text-center font-mono text-[15px] font-bold"
        style={{ color: medal ?? "var(--dojo-text-subtle)" }}
      >
        {rank}
      </span>

      <div
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-[11px] font-semibold text-white"
        style={{ background: r.profile.avatar_color }}
      >
        {r.profile.avatar_initials}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="truncate text-[14px] font-semibold text-dojo-textBright">
            {r.profile.display_name}
          </span>
          {isMe && (
            <span
              className="rounded-full px-1.5 py-[1px] text-[10px] font-medium text-dojo-accent"
              style={{ background: "var(--dojo-accent-soft-bg)" }}
            >
              você
            </span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-dojo-surfaceSunken">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${Math.max(barPct, r.solved > 0 ? 4 : 0)}%`, background: "var(--dojo-accent)" }}
          />
        </div>
      </div>

      <div className="flex-none text-right">
        <div className="font-mono text-[15px] font-bold text-dojo-textBright">{r.solved}</div>
        <div className="font-mono text-[10.5px] text-dojo-textDim">de {totalProblems}</div>
      </div>
    </div>
  );
}
