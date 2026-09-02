#!/usr/bin/env node
// Verifica todos os arquivos supabase/migrations/*.sql em busca do mesmo tipo
// de bug que já pegou o Dojo de surpresa uma vez: uma string comum ('...')
// contendo uma sequência de escape literal tipo \n ou \t, quando quem
// escreveu queria uma string com escape (E'...') e esqueceu o "E".
//
// Nesse caso o Postgres grava os dois caracteres "\" e "n" ao pé da letra em
// vez de uma quebra de linha real — quebrando silenciosamente qualquer
// solução correta que dependa daquele caso de teste.
//
// Uso: node scripts/check-migrations.mjs

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "..", "supabase", "migrations");
const ESCAPE_PATTERN = /\\[ntr]/;

// Migrations já aplicadas em produção não devem ser editadas — então estes
// acertos são grandfathered em vez de corrigidos:
// - 0004: é o próprio bug histórico que causou o problema (o valor ficou
//   gravado errado até a 0012 corrigir via UPDATE).
// - 0012: referencia a string ruim de propósito, no "where", pra encontrar e
//   corrigir a linha afetada — não é um bug novo.
const ALLOWLIST = new Set([
  "0004_beecrowd_problems.sql:73",
  "0012_fix_fibonacci_testcase.sql:2",
  "0012_fix_fibonacci_testcase.sql:9",
]);

function extractStringLiterals(sql) {
  const literals = [];
  let i = 0;
  let line = 1;

  while (i < sql.length) {
    const ch = sql[i];

    if (ch === "\n") {
      line++;
      i++;
      continue;
    }

    const isEPrefix = (ch === "E" || ch === "e") && sql[i + 1] === "'";
    const isPlainQuote = ch === "'";

    if (isEPrefix || isPlainQuote) {
      const isEString = isEPrefix;
      const startLine = line;
      let j = isEPrefix ? i + 2 : i + 1;
      let buf = "";

      while (j < sql.length) {
        if (sql[j] === "\n") line++;

        if (isEString && sql[j] === "\\") {
          buf += sql[j] + (sql[j + 1] ?? "");
          j += 2;
          continue;
        }

        if (sql[j] === "'") {
          if (sql[j + 1] === "'") {
            buf += "'";
            j += 2;
            continue;
          }
          j++;
          break;
        }

        buf += sql[j];
        j++;
      }

      literals.push({ isEString, line: startLine, text: buf });
      i = j;
      continue;
    }

    i++;
  }

  return literals;
}

function checkFile(path, filename) {
  const sql = readFileSync(path, "utf8");
  const literals = extractStringLiterals(sql);
  const issues = [];

  for (const lit of literals) {
    if (!lit.isEString && ESCAPE_PATTERN.test(lit.text) && !ALLOWLIST.has(`${filename}:${lit.line}`)) {
      issues.push({
        file: filename,
        line: lit.line,
        snippet: lit.text.length > 60 ? lit.text.slice(0, 57) + "..." : lit.text,
      });
    }
  }

  return issues;
}

const files = readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
let allIssues = [];

for (const file of files) {
  allIssues = allIssues.concat(checkFile(join(MIGRATIONS_DIR, file), file));
}

if (allIssues.length > 0) {
  console.error(`\n✗ ${allIssues.length} string(s) com escape suspeito sem prefixo E encontradas:\n`);
  for (const issue of allIssues) {
    console.error(`  ${issue.file}:${issue.line}  '${issue.snippet}'`);
  }
  console.error(
    `\nSe alguma dessas strings deveria ter uma quebra de linha/tab de verdade, troque '...' por E'...'.\n` +
      `Se for intencional (texto que realmente contém "\\n" ao pé da letra), adicione um comentário explicando.\n`,
  );
  process.exit(1);
}

console.log(`✓ ${files.length} arquivo(s) de migration verificados — nenhuma string com escape suspeito.`);
