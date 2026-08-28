import { Link, useLocation } from "react-router-dom";
import type { Profile } from "../lib/types";
import { useTheme } from "../lib/useTheme";

interface HeaderProps {
  profiles: Profile[];
  subtitle: string;
  backTo?: string;
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Header({ profiles, subtitle, backTo }: HeaderProps) {
  const location = useLocation();
  const onPlacar = location.pathname === "/placar";
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-11 flex-none items-center justify-between gap-3 border-b border-dojo-border bg-dojo-panel px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <Link to={backTo ?? "/"} className="flex flex-none items-center gap-2.5 hover:opacity-90">
          <div className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-dojo-accent font-mono text-[11px] font-bold text-white">
            C+
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-dojo-textBright sm:inline">
            C++ Dojo
          </span>
        </Link>
        <span className="truncate border-l border-dojo-border2 pl-2.5 text-[11px] text-dojo-textDim">
          {subtitle}
        </span>
      </div>

      <div className="flex flex-none items-center gap-2.5 sm:gap-3.5">
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Mudar pro tema claro" : "Mudar pro tema escuro"}
          className="flex items-center text-dojo-textDim transition-colors hover:text-dojo-textBright"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        <Link
          to="/placar"
          className="flex items-center gap-1.5 text-[11.5px] font-medium transition-colors"
          style={{ color: onPlacar ? "var(--dojo-accent)" : "var(--dojo-text-dim)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
            <path d="M7 6H4a2 2 0 0 0 0 4h1" />
            <path d="M17 6h3a2 2 0 0 1 0 4h-1" />
          </svg>
          <span className="hidden sm:inline">Placar</span>
        </Link>
        <div className="hidden items-center gap-1.5 text-[11px] text-dojo-textDim md:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>{profiles.length} no dojo</span>
        </div>
        <div className="hidden sm:flex">
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
