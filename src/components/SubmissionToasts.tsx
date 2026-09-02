import { useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface ToastItem {
  id: string;
  text: string;
  color: string;
  leaving: boolean;
}

interface ProfileInfo {
  display_name: string;
  avatar_color: string;
}

export default function SubmissionToasts({ session }: { session: Session }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const profilesRef = useRef<Record<string, ProfileInfo>>({});
  const problemsRef = useRef<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const [{ data: profiles }, { data: problems }] = await Promise.all([
        supabase.from("profiles").select("id, display_name, avatar_color"),
        supabase.from("problems").select("id, title"),
      ]);
      if (profiles) {
        for (const p of profiles) profilesRef.current[p.id] = { display_name: p.display_name, avatar_color: p.avatar_color };
      }
      if (problems) {
        for (const p of problems) problemsRef.current[p.id] = p.title;
      }
    })();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("submissions-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "submissions" },
        (payload) => {
          const row = payload.new as { id: string; user_id: string; problem_id: string; status: string };
          if (row.status !== "accepted" || row.user_id === session.user.id) return;

          const profile = profilesRef.current[row.user_id];
          const title = problemsRef.current[row.problem_id];
          const text = `${profile?.display_name ?? "Alguém"} resolveu ${title ?? "um problema"}`;

          setToasts((prev) => [...prev, { id: row.id, text, color: profile?.avatar_color ?? "#2b95e0", leaving: false }]);
          setTimeout(() => {
            setToasts((prev) => prev.map((t) => (t.id === row.id ? { ...t, leaving: true } : t)));
          }, 5200);
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== row.id));
          }, 5500);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session.user.id]);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[998] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex max-w-[300px] items-center gap-2.5 rounded-lg bg-dojo-panel px-4 py-3 text-[13px] text-dojo-text shadow-lg transition-all duration-300 ${
            t.leaving ? "translate-x-4 opacity-0" : "animate-dojo-toast-in"
          }`}
          style={{ border: "1px solid var(--dojo-hairline)", borderLeft: `3px solid ${t.color}` }}
        >
          <span>🎉</span>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}
