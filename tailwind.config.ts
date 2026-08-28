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
          bg: "#000000",
          panel: "#111318",
          panel2: "#181b21",
          card: "#15171c",
          cardHover: "#1b1e24",
          border: "#262a31",
          border2: "#3a3f47",
          text: "#e4e4e4",
          textBright: "#f7f7f7",
          textDim: "#a3a3a3",
          accent: "#2b95e0",
          green: "#2ea043",
          greenBright: "#6ee7a0",
          red: "#ff8585",
          amber: "#f0c674",
        },
      },
      keyframes: {
        dojoSpin: { to: { transform: "rotate(360deg)" } },
        dojoFade: {
          from: { opacity: "0", transform: "translateY(3px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "dojo-spin": "dojoSpin 700ms linear infinite",
        "dojo-fade": "dojoFade 160ms ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
