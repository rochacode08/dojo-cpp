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

  const leader = ranking[0] ?? null;
  const rest = ranking.slice(1);

  /**
   * Uma linha de comparação objetiva: quantos desafios faltam pra alcançar quem
   * está logo à frente. Só usa dado que existe — nada de "sequência" ou
   * "subiu X posições", que exigiriam histórico que o dojo não guarda.
   */
  const gapMessage = useMemo(() => {
    const myIndex = ranking.findIndex((r) => r.profile.id === session.user.id);
    if (myIndex === -1) return null;
    const me = ranking[myIndex];
    if (myIndex === 0) {
      const second = ranking[1];
      if (!second) return null;
      const lead = me.solved - second.solved;
      return lead > 0
        ? `Você lidera por ${lead} ${lead === 1 ? "desafio" : "desafios"}.`
        : `Você está empatado com ${second.profile.display_name} na liderança.`;
    }
    const ahead = ranking[myIndex - 1];
    const gap = ahead.solved - me.solved;
    if (gap === 0) return `Você está empatado com ${ahead.profile.display_name}.`;
    return `Faltam ${gap} ${gap === 1 ? "desafio" : "desafios"} para alcançar ${ahead.profile.display_name}.`;
  }, [ranking, session.user.id]);

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="animate-dojo-fade flex h-screen flex-col items-center justify-center gap-3 bg-dojo-bg font-sans text-[15px] text-dojo-textDim">
        <Spinner />
        Carregando placar...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-dojo-bg font-sans text-dojo-text">
      <Header profiles={profiles} subtitle="" me={profiles.find((p) => p.id === session.user.id) ?? null} />

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-4 py-7 sm:px-6 sm:py-9">
          <div className="flex flex-col gap-1.5">
            <h1 className="m-0 text-[26px] font-bold leading-tight tracking-[-0.02em] text-dojo-textBright sm:text-[30px]">
              Placar do Dojo
            </h1>
            <p className="m-0 text-[15px] leading-relaxed text-dojo-textDim">
              Quem já resolveu mais desafios, de {totalProblems} no total.
            </p>
          </div>

          {leader && <LeaderCard r={leader} totalProblems={totalProblems} isMe={leader.profile.id === session.user.id} />}

          {gapMessage && (
            <p
              className="m-0 rounded-xl px-4 py-3 text-[14.5px]"
              style={{ background: "var(--dojo-accent-soft-bg)", border: "1px solid var(--dojo-border2)", color: "var(--dojo-text)" }}
            >
              {gapMessage}
            </p>
          )}

          <div className="flex flex-col gap-2.5">
            {rest.map((r, i) => (
              <RankRow key={r.profile.id} rank={i + 2} index={i} r={r} totalProblems={totalProblems} isMe={r.profile.id === session.user.id} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const MEDAL = ["#f0c674", "#c9c9c9", "#c97b4a"];

/** O primeiro lugar ganha uma composição própria, em vez de ser só a linha 1. */
function LeaderCard({ r, totalProblems, isMe }: { r: Ranking; totalProblems: number; isMe: boolean }) {
  const pct = totalProblems > 0 ? Math.round((r.solved / totalProblems) * 100) : 0;

  return (
    <div
      className="animate-dojo-fade flex items-center gap-4 rounded-xl p-5 sm:gap-5 sm:p-6"
      style={{
        background: "var(--dojo-card)",
        border: `1px solid ${isMe ? "var(--dojo-accent)" : "var(--dojo-border2)"}`,
      }}
    >
      <div className="relative flex-none">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full text-[17px] font-bold text-white sm:h-16 sm:w-16 sm:text-[19px]"
          style={{ background: r.profile.avatar_color }}
        >
          {r.profile.avatar_initials}
        </div>
        <span
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full text-[14px]"
          style={{ background: "var(--dojo-card)", border: "1px solid var(--dojo-border2)" }}
          title="Primeiro lugar"
        >
          🏆
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: MEDAL[0] }}>
          Primeiro lugar
        </span>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2.5">
          <h2 className="m-0 truncate text-[20px] font-bold text-dojo-textBright">{r.profile.display_name}</h2>
          {isMe && (
            <span
              className="rounded-md px-1.5 py-[1px] text-[11.5px] font-semibold"
              style={{ background: "var(--dojo-accent-soft-bg)", color: "var(--dojo-accent)" }}
            >
              você
            </span>
          )}
        </div>
        <p className="m-0 mt-1 text-[14px] text-dojo-textDim">
          <strong className="font-semibold text-dojo-textBright">{r.solved}</strong> de {totalProblems} desafios · {pct}%
        </p>
      </div>
    </div>
  );
}

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
        border: isMe ? "1px solid var(--dojo-accent)" : "1px solid var(--dojo-border)",
        animationDelay: `${index * 60}ms`,
        animationFillMode: "backwards",
      }}
    >
      <span
        className="w-6 flex-none text-center font-mono text-[16px] font-bold"
        style={{ color: medal ?? "var(--dojo-text-subtle)" }}
      >
        {rank}
      </span>

      <div
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-[12.5px] font-semibold text-white"
        style={{ background: r.profile.avatar_color }}
      >
        {r.profile.avatar_initials}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="truncate text-[15.5px] font-semibold text-dojo-textBright">
            {r.profile.display_name}
          </span>
          {isMe && (
            <span
              className="rounded-md px-1.5 py-[1px] text-[11.5px] font-semibold text-dojo-accent"
              style={{ background: "var(--dojo-accent-soft-bg)" }}
            >
              você
            </span>
          )}
        </div>
        {r.solved === 0 ? (
          <span className="text-[13px] text-dojo-textFaint">ainda sem desafios — comece pelo 01</span>
        ) : (
          <div
            className="h-2 w-full overflow-hidden rounded-full"
            style={{ background: "var(--dojo-surface-sunken)", border: "1px solid var(--dojo-border)" }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${Math.max(barPct, 4)}%`, background: "var(--dojo-accent)" }}
            />
          </div>
        )}
      </div>

      <div className="flex-none text-right">
        <div className="font-mono text-[17px] font-bold text-dojo-textBright">{r.solved}</div>
        <div className="font-mono text-[12px] text-dojo-textDim">de {totalProblems}</div>
      </div>
    </div>
  );
}
