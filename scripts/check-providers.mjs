/**
 * Testa os provedores de execução de código da Edge Function contra as APIs
 * de verdade.
 *
 * Não reimplementa nada: extrai o trecho marcado com "#region pure" do próprio
 * supabase/functions/run-code/index.ts, tira os tipos e roda. Se o parser
 * mudar lá, é a versão nova que é testada aqui.
 *
 *   node scripts/check-providers.mjs
 *
 * Sai com código 1 se algum caso não bater com o esperado. Um provedor fora do
 * ar não reprova o teste — é justamente o cenário que o fallback existe pra
 * cobrir —, mas aparece no relatório.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(here, "..", "supabase", "functions", "run-code", "index.ts");

function loadPureRegion() {
  const source = readFileSync(SOURCE, "utf8");
  const start = source.indexOf("// #region pure");
  const end = source.indexOf("// #endregion pure");
  if (start === -1 || end === -1) {
    throw new Error("não achei os marcadores #region pure / #endregion pure em index.ts");
  }

  const region = source.slice(start, end);
  const exported = `${region}\nexport { wandboxRequest, godboltRequest, parseWandbox, parseGodbolt, formatWarning, stripAnsi };`;
  const js = ts.transpileModule(exported, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;

  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

const CASES = [
  {
    name: "C — soma com scanf/printf",
    language: "c",
    code: '#include <stdio.h>\nint main(){int t,v;scanf("%d %d",&t,&v);printf("%.3f\\n",(t*v)/12.0);return 0;}',
    stdin: "10 85",
    expect: { kind: "ok", output: "70.833" },
  },
  {
    name: "C++ — soma com cin/cout",
    language: "cpp",
    code:
      "#include <iostream>\n#include <iomanip>\nusing namespace std;\n" +
      "int main(){int t,v;cin>>t>>v;cout<<fixed<<setprecision(3)<<(t*v)/12.0<<endl;return 0;}",
    stdin: "10 85",
    expect: { kind: "ok", output: "70.833" },
  },
  {
    name: "C — erro de compilação",
    language: "c",
    code: "int main(){ retrn 0; }",
    stdin: "",
    expect: { kind: "compile_error", contains: "retrn" },
  },
  {
    name: "C++ — erro em tempo de execução",
    language: "cpp",
    code: "#include <cstdlib>\nint main(){ abort(); }",
    stdin: "",
    expect: { kind: "runtime_error" },
  },
];

async function run(mod, provider, testCase) {
  const { url, body } =
    provider === "wandbox"
      ? mod.wandboxRequest(testCase.code, testCase.stdin, testCase.language)
      : mod.godboltRequest(testCase.code, testCase.stdin, testCase.language);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    return { unavailable: `HTTP ${res.status}: ${(await res.text()).slice(0, 120)}` };
  }

  const data = await res.json();
  return { outcome: provider === "wandbox" ? mod.parseWandbox(data) : mod.parseGodbolt(data) };
}

function check(outcome, expect) {
  // Diagnóstico do GCC vem colorido do Godbolt; se um código ANSI escapar do
  // stripAnsi, o aluno vê lixo no lugar do erro.
  if (outcome.output.includes(String.fromCharCode(27))) {
    return `sobrou código ANSI na saída: ${JSON.stringify(outcome.output.slice(0, 120))}`;
  }
  if (outcome.kind !== expect.kind) {
    return `esperava kind="${expect.kind}", veio "${outcome.kind}" (${outcome.output.slice(0, 120)})`;
  }
  if (expect.output !== undefined && outcome.output.trim() !== expect.output) {
    return `esperava saída "${expect.output}", veio "${outcome.output.trim().slice(0, 120)}"`;
  }
  if (expect.contains !== undefined && !outcome.output.includes(expect.contains)) {
    return `esperava a saída conter "${expect.contains}", veio "${outcome.output.slice(0, 120)}"`;
  }
  return null;
}

const mod = await loadPureRegion();
let failures = 0;
let unavailable = 0;

for (const provider of ["wandbox", "godbolt"]) {
  console.log(`\n=== ${provider}`);
  for (const testCase of CASES) {
    let result;
    try {
      result = await run(mod, provider, testCase);
    } catch (err) {
      result = { unavailable: String(err) };
    }

    if (result.unavailable) {
      unavailable++;
      console.log(`  ~ ${testCase.name} — provedor indisponível (${result.unavailable.slice(0, 90)})`);
      continue;
    }

    const problem = check(result.outcome, testCase.expect);
    if (problem) {
      failures++;
      console.log(`  x ${testCase.name} — ${problem}`);
    } else {
      console.log(`  ✓ ${testCase.name}`);
    }
  }
}

// A quebra de linha final só é confiável na Wandbox; o Godbolt entrega a saída
// já em linhas. Se essa flag se inverter, o aviso de "\n faltando" passa a
// mentir — então ela é verificada aqui.
const flags = [
  ["wandbox", mod.parseWandbox({ status: "0", program_output: "oi\n" }).trailingNewlineKnown, true],
  ["godbolt", mod.parseGodbolt({ code: 0, stdout: [{ text: "oi" }] }).trailingNewlineKnown, false],
];
console.log("\n=== quebra de linha final é conhecida?");
for (const [name, actual, expected] of flags) {
  if (actual !== expected) {
    failures++;
    console.log(`  x ${name}: esperava ${expected}, veio ${actual}`);
  } else {
    console.log(`  ✓ ${name}: ${actual}`);
  }
}

console.log(
  `\n${failures === 0 ? "✓" : "✗"} ${failures} falha(s)` +
    (unavailable > 0 ? `, ${unavailable} caso(s) pulado(s) por provedor fora do ar` : ""),
);
process.exit(failures === 0 ? 0 : 1);
