import { Link, useLocation } from "react-router-dom";
import type { Profile } from "../lib/types";
import { useTheme } from "../lib/useTheme";
import { CppLogo } from "./Logos";

interface HeaderProps {
  profiles: Profile[];
  subtitle: string;
  backTo?: string;
  /** Perfil de quem está logado, mostrado à direita em telas largas. */
  me?: Profile | null;
}

function SunIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ProblemsIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function LessonsIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4a2 2 0 0 0 0 4h1" />
      <path d="M17 6h3a2 2 0 0 1 0 4h-1" />
    </svg>
  );
}

interface NavItemProps {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Item de navegação com estado ativo por cor E por forma (fundo + linha
 * embaixo) — só a cor não bastava pra dizer em que página se está.
 */
function NavItem({ to, active, icon, children }: NavItemProps) {
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className="relative flex h-9 items-center gap-2 rounded-lg px-2.5 text-[13.5px] font-medium transition-colors sm:px-3"
      style={{
        color: active ? "var(--dojo-text-bright)" : "var(--dojo-text-dim)",
        background: active ? "var(--dojo-surface-hover)" : "transparent",
      }}
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-x-2.5 -bottom-[7px] h-[2px] rounded-full"
          style={{ background: "var(--dojo-accent)" }}
        />
      )}
    </Link>
  );
}

export default function Header({ profiles, subtitle, backTo, me }: HeaderProps) {
  const location = useLocation();
  const path = location.pathname;
  const onProblems = path === "/" || path.startsWith("/problema");
  const onAulas = path.startsWith("/aulas");
  const onPlacar = path === "/placar";
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-14 flex-none items-center justify-between gap-3 border-b border-dojo-border bg-dojo-panel px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        <Link to={backTo ?? "/"} className="flex flex-none items-center gap-2.5 transition-opacity hover:opacity-80">
          <CppLogo size={26} className="flex-none" />
          <span className="hidden text-[16px] font-semibold tracking-tight text-dojo-textBright sm:inline">
            C++ Dojo
          </span>
        </Link>

        <nav aria-label="Principal" className="flex items-center gap-0.5 sm:gap-1">
          <NavItem to="/" active={onProblems} icon={<ProblemsIcon />}>
            Problemas
          </NavItem>
          <NavItem to="/aulas" active={onAulas} icon={<LessonsIcon />}>
            Aulas
          </NavItem>
          <NavItem to="/placar" active={onPlacar} icon={<TrophyIcon />}>
            Placar
          </NavItem>
        </nav>

        {subtitle && (
          <span className="hidden min-w-0 truncate border-l border-dojo-border pl-4 text-[13px] text-dojo-textDim lg:inline">
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex flex-none items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === "dark" ? "Mudar pro tema claro" : "Mudar pro tema escuro"}
          aria-label={theme === "dark" ? "Mudar pro tema claro" : "Mudar pro tema escuro"}
          aria-pressed={theme === "light"}
          className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-[13px] text-dojo-textDim transition-colors hover:bg-dojo-surfaceHover hover:text-dojo-textBright"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          <span className="hidden lg:inline">{theme === "dark" ? "Claro" : "Escuro"}</span>
        </button>

        <div
          className="hidden items-center gap-2 border-l border-dojo-border pl-3 md:flex"
          title={`No dojo: ${profiles.map((p) => p.display_name).join(", ")}`}
        >
          <div className="flex">
            {profiles.map((p) => (
              <div
                key={p.id}
                title={p.display_name}
                className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-dojo-panel text-[10.5px] font-semibold first:ml-0"
                style={{ background: p.avatar_color, color: "#ffffff" }}
              >
                {p.avatar_initials}
              </div>
            ))}
          </div>
          <span className="text-[13px] text-dojo-textDim">
            {profiles.length} no dojo
          </span>
        </div>

        {me && (
          <span className="hidden text-[13.5px] font-medium text-dojo-text xl:inline">
            {me.display_name}
          </span>
        )}
      </div>
    </header>
  );
}
