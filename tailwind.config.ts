import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        dojo: {
          bg: "var(--dojo-bg)",
          panel: "var(--dojo-panel)",
          panel2: "var(--dojo-panel2)",
          card: "var(--dojo-card)",
          cardHover: "var(--dojo-card-hover)",
          border: "var(--dojo-border)",
          border2: "var(--dojo-border2)",
          text: "var(--dojo-text)",
          textBright: "var(--dojo-text-bright)",
          textDim: "var(--dojo-text-dim)",
          textFaint: "var(--dojo-text-faint)",
          textSubtle: "var(--dojo-text-subtle)",
          accent: "var(--dojo-accent)",
          green: "var(--dojo-green)",
          greenBright: "var(--dojo-green-bright)",
          red: "var(--dojo-red)",
          amber: "var(--dojo-amber)",
          surfaceSunken: "var(--dojo-surface-sunken)",
          surfaceRaised: "var(--dojo-surface-raised)",
          surfaceHover: "var(--dojo-surface-hover)",
          dangerBg: "var(--dojo-danger-bg)",
          dangerBorder: "var(--dojo-danger-border)",
          dangerText: "var(--dojo-danger-text)",
        },
      },
      keyframes: {
        dojoSpin: { to: { transform: "rotate(360deg)" } },
        dojoFade: {
          from: { opacity: "0", transform: "translateY(3px)" },
          to: { opacity: "1", transform: "none" },
        },
        dojoConfetti: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        dojoToastIn: {
          from: { opacity: "0", transform: "translateX(16px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "dojo-spin": "dojoSpin 700ms linear infinite",
        "dojo-fade": "dojoFade 160ms ease-out",
        "dojo-confetti": "dojoConfetti 2s ease-in forwards",
        "dojo-toast-in": "dojoToastIn 200ms ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
