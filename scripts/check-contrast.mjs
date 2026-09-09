#!/usr/bin/env node
// Confere o contraste WCAG AA (4.5:1) dos pares texto/fundo que a interface
// realmente usa, lendo os tokens direto do src/index.css. Roda nos dois temas.
//
// Existe porque a paleta já foi ajustada duas vezes e é fácil escurecer um
// token "só um pouquinho" e derrubar a legibilidade sem perceber.
//
// Uso: npm run check:contrast

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(__dirname, "..", "src", "index.css"), "utf8");

const V = {};

function vars(block) {
  const out = {};
  for (const m of block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) out["--" + m[1]] = m[2];
  return out;
}
const darkBlock = css.slice(css.indexOf(":root {"), css.indexOf(':root[data-theme="light"]'));
const lightBlock = css.slice(css.indexOf(':root[data-theme="light"]'));
V.dark = vars(darkBlock);
V.light = vars(lightBlock);

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const PAIRS = [
  ["--dojo-text", "--dojo-bg"], ["--dojo-text", "--dojo-card"], ["--dojo-text", "--dojo-panel"],
  ["--dojo-text-bright", "--dojo-bg"], ["--dojo-text-bright", "--dojo-card"],
  ["--dojo-text-dim", "--dojo-bg"], ["--dojo-text-dim", "--dojo-card"], ["--dojo-text-dim", "--dojo-panel"],
  ["--dojo-text-faint", "--dojo-bg"], ["--dojo-text-faint", "--dojo-card"], ["--dojo-text-faint", "--dojo-panel"],
  ["--dojo-text-subtle", "--dojo-card"],
  ["--dojo-accent", "--dojo-bg"], ["--dojo-accent", "--dojo-card"], ["--dojo-accent", "--dojo-panel"],
  ["--dojo-green-bright", "--dojo-card"], ["--dojo-red", "--dojo-card"], ["--dojo-amber", "--dojo-card"],
];
let bad = 0;
for (const theme of ["dark", "light"]) {
  console.log(`\n=== ${theme}`);
  for (const [fg, bg] of PAIRS) {
    const f = V[theme][fg], b = V[theme][bg];
    if (!f || !b) { console.log(`  ? ${fg} / ${bg} (indefinido)`); continue; }
    const r = ratio(f, b);
    const ok = r >= 4.5;
    if (!ok) bad++;
    console.log(`  ${ok ? "✓" : "x"} ${r.toFixed(2)}  ${fg} sobre ${bg}`);
  }
}
console.log(`\n${bad === 0 ? "✓ tudo em AA (4.5:1)" : "✗ " + bad + " par(es) abaixo de 4.5:1"}`);
process.exit(bad === 0 ? 0 : 1);
