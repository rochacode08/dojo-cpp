import { Link } from "react-router-dom";
import type { Profile } from "../lib/types";

interface HeaderProps {
  profiles: Profile[];
  subtitle: string;
  backTo?: string;
}

export default function Header({ profiles, subtitle, backTo }: HeaderProps) {
  return (
    <header className="flex h-11 flex-none items-center justify-between gap-4 border-b border-dojo-border bg-dojo-panel px-4">
      <div className="flex items-center gap-2.5">
        <Link to={backTo ?? "/"} className="flex items-center gap-2.5 hover:opacity-90">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-dojo-accent font-mono text-[11px] font-bold text-white">
            C+
          </div>
          <span className="text-sm font-semibold tracking-tight text-dojo-textBright">
            C++ Dojo
          </span>
        </Link>
        <span className="ml-1 border-l border-dojo-border2 pl-2.5 text-[11px] text-dojo-textDim">
          {subtitle}
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-1.5 text-[11px] text-dojo-textDim">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>{profiles.length} no dojo</span>
        </div>
        <div className="flex">
          {profiles.map((p) => (
            <div
              key={p.id}
              title={p.display_name}
              className="-ml-2 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-dojo-panel text-[10px] font-semibold first:ml-0"
              style={{ background: p.avatar_color, color: "#ffffff" }}
            >
              {p.avatar_initials}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
