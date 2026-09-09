// Supabase Edge Function: recebe { problem_id, code, mode, language }, compila e
// roda os casos de teste num compilador online público, e devolve o resultado no
// formato que o TestsPanel espera.
//
// mode = "test"   -> roda só os casos de exemplo, NÃO registra submissão
// mode = "submit" -> roda todos os casos e registra a submissão (padrão)
//
// language = "cpp" (padrão) ou "c"
//
// Dois provedores, tentados nessa ordem:
//   1. Wandbox (wandbox.org) — devolve a saída crua, então dá pra detectar
//      quebra de linha faltando no fim. É a opção preferida.
//   2. Compiler Explorer (godbolt.org) — só entra quando a Wandbox está fora
//      do ar. Entrega a saída já quebrada em linhas, e aí a quebra final se
//      perde: nesse modo o aviso de "\n faltando" fica desligado, porque um
//      palpite errado seria pior que nenhum aviso.
// Os dois são gratuitos e sem chave.

import { createClient } from "jsr:@supabase/supabase-js@2";

const REQUEST_TIMEOUT_MS = 15000;

// #region pure — daqui até o #endregion não há nada de Deno/rede: é só montar
// requisição e interpretar resposta. O script scripts/check-providers.mjs
// extrai exatamente este trecho e roda contra as APIs de verdade.

type Language = "cpp" | "c";
type ProviderName = "wandbox" | "godbolt";

interface RunOutcome {
  kind: "ok" | "compile_error" | "runtime_error" | "infra";
  /** Saída do programa. Em "compile_error"/"infra" carrega a mensagem. */
  output: string;
  /**
   * Se dá pra confiar na quebra de linha final de `output`. O Godbolt devolve
   * a saída em linhas separadas, e aí essa informação simplesmente não existe.
   */
  trailingNewlineKnown: boolean;
}

interface ProviderRequest {
  url: string;
  body: unknown;
}

const WANDBOX_COMPILERS: Record<Language, { compiler: string; options: string }> = {
  cpp: { compiler: "gcc-13.2.0", options: "c++17" },
  c: { compiler: "gcc-13.2.0-c", options: "c11" },
};

// Ids do Compiler Explorer (ver https://godbolt.org/api/compilers/c). Os
// compiladores de C são os mesmos do C++ com o prefixo "c".
const GODBOLT_COMPILERS: Record<Language, { id: string; std: string; lang: string }> = {
  cpp: { id: "g132", std: "-std=c++17", lang: "c++" },
  c: { id: "cg132", std: "-std=c11", lang: "c" },
};

function wandboxRequest(code: string, stdin: string, language: Language): ProviderRequest {
  const { compiler, options } = WANDBOX_COMPILERS[language];
  return {
    url: "https://wandbox.org/api/compile.json",
    body: { compiler, code, stdin, options },
  };
}

function godboltRequest(code: string, stdin: string, language: Language): ProviderRequest {
  const { id, std, lang } = GODBOLT_COMPILERS[language];
  return {
    url: `https://godbolt.org/api/compiler/${id}/compile`,
    body: {
      source: code,
      lang,
      options: {
        userArguments: std,
        executeParameters: { args: [], stdin },
        compilerOptions: { executorRequest: true },
        filters: { execute: true },
      },
    },
  };
}

interface WandboxResponse {
  status?: string;
  signal?: string;
  compiler_error?: string;
  program_output?: string;
  program_error?: string;
}

function parseWandbox(data: WandboxResponse): RunOutcome {
  const succeeded = data.status === "0";

  if (!succeeded && data.compiler_error && !data.program_output) {
    return { kind: "compile_error", output: data.compiler_error.trim(), trailingNewlineKnown: true };
  }

  if (!succeeded && (data.signal || data.program_error)) {
    return {
      kind: "runtime_error",
      output: (data.program_error || data.signal || "").trim(),
      trailingNewlineKnown: true,
    };
  }

  return { kind: "ok", output: data.program_output ?? "", trailingNewlineKnown: true };
}

interface GodboltLine {
  text?: string;
}

interface GodboltResponse {
  code?: number;
  didExecute?: boolean;
  timedOut?: boolean;
  stdout?: GodboltLine[];
  stderr?: GodboltLine[];
  buildResult?: {
    code?: number;
    stderr?: GodboltLine[];
  };
}

/** O Godbolt colore o diagnóstico do GCC; os códigos ANSI virariam lixo na tela. */
function stripAnsi(text: string): string {
  return text.replace(/\u001b\[[0-9;]*[A-Za-z]/g, "");
}

function joinLines(lines: GodboltLine[] | undefined): string {
  return (lines ?? []).map((l) => stripAnsi(l.text ?? "")).join("\n");
}

function parseGodbolt(data: GodboltResponse): RunOutcome {
  if ((data.buildResult?.code ?? 0) !== 0) {
    return {
      kind: "compile_error",
      output: joinLines(data.buildResult?.stderr).trim(),
      trailingNewlineKnown: false,
    };
  }

  if (data.timedOut) {
    return {
      kind: "runtime_error",
      output: "o programa passou do tempo limite — verifique se algum laço não termina.",
      trailingNewlineKnown: false,
    };
  }

  const stdout = joinLines(data.stdout);

  // Saiu com código diferente de zero: erro em tempo de execução (divisão por
  // zero, acesso fora do vetor, return != 0...).
  if ((data.code ?? 0) !== 0) {
    const stderr = joinLines(data.stderr).trim();
    return {
      kind: "runtime_error",
      output: stderr || `o programa terminou com código ${data.code}`,
      trailingNewlineKnown: false,
    };
  }

  return { kind: "ok", output: stdout, trailingNewlineKnown: false };
}

/**
 * A comparação em si ignora espaços nas bordas (senão uma quebra de linha a
 * mais reprovaria uma solução correta). Mas vale avisar quando a formatação
 * está diferente do esperado, porque juízes online costumam ser rígidos.
 */
function formatWarning(
  outcome: RunOutcome,
  received: string,
  expected: string,
  passed: boolean,
): string | undefined {
  const collapse = (s: string) => s.replace(/\s+/g, " ").trim();

  if (!passed) {
    if (collapse(received) === collapse(expected)) {
      return "o conteúdo está certo, mas os espaços/quebras de linha não batem com o esperado.";
    }
    return undefined;
  }

  // Sem saber a quebra final, calar é melhor que chutar.
  if (!outcome.trailingNewlineKnown) return undefined;

  if (received.length > 0 && !outcome.output.endsWith("\n")) {
    return "sua saída não termina com quebra de linha. Aqui passou, mas em juízes online (Beecrowd e afins) isso costuma dar erro — use endl ou \\n no final.";
  }

  return undefined;
}

// #endregion pure

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface TestCase {
  id: string;
  input: string;
  expected_output: string;
  is_sample: boolean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userError } = await authClient.auth.getUser();
    if (userError || !userData.user) {
      return json({ error: "não autenticado" }, 401);
    }
    const userId = userData.user.id;

    const db = createClient(supabaseUrl, serviceRoleKey);

    const { problem_id, code, mode: rawMode, language: rawLanguage } = await req.json();
    if (!problem_id || typeof code !== "string") {
      return json({ error: "problem_id e code são obrigatórios" }, 400);
    }
    const mode: "test" | "submit" = rawMode === "test" ? "test" : "submit";
    const language: Language = rawLanguage === "c" ? "c" : "cpp";

    let query = db
      .from("test_cases")
      .select("id, input, expected_output, is_sample")
      .eq("problem_id", problem_id);

    // No modo "testar" só rodamos os exemplos do enunciado: é rápido e não
    // revela os casos ocultos.
    if (mode === "test") query = query.eq("is_sample", true);

    const { data: testCases, error: testsError } = await query.order("order_index");

    if (testsError || !testCases || testCases.length === 0) {
      return json(
        {
          error:
            mode === "test"
              ? "esse problema não tem casos de exemplo cadastrados — use Enviar"
              : "problema sem casos de teste cadastrados",
        },
        400,
      );
    }

    // Provedor que caiu não é tentado de novo nos casos seguintes desta mesma
    // execução: durante uma queda isso pouparia uma requisição perdida por caso.
    const dead = new Set<ProviderName>();
    let usedProvider: ProviderName | null = null;

    // Roda em sequência (não em paralelo) para não sobrecarregar serviços
    // públicos gratuitos.
    const results = [];
    for (let i = 0; i < testCases.length; i++) {
      const result = await runOne(code, testCases[i] as TestCase, i, language, dead);
      if (result.provider) usedProvider = result.provider;
      results.push(result);
    }

    // Falha de infraestrutura (todos os compiladores fora do ar) não é um
    // julgamento de correção — não grava como submissão, senão polui o
    // histórico e o placar com uma tentativa que não rodou de verdade.
    const hasInfraFailure = results.some(
      (r) => r.status === "TEMPO ESGOTADO" || r.status === "ERRO INTERNO",
    );

    const passedAll = results.every((r) => r.passed);
    const status = passedAll
      ? "accepted"
      : results.some((r) => r.status === "ERRO DE COMPILAÇÃO")
        ? "compile_error"
        : results.some((r) => r.status === "RUNTIME ERROR")
          ? "runtime_error"
          : "wrong_answer";

    // Só "Enviar" conta como tentativa — "Testar" é pra iterar à vontade sem
    // sujar o histórico nem o placar.
    if (mode === "submit" && !hasInfraFailure) {
      await db.from("submissions").insert({
        user_id: userId,
        problem_id,
        code,
        language,
        status,
        results,
      });
    }

    return json({ status, results, mode, language, provider: usedProvider });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
});

async function runOne(
  code: string,
  tc: TestCase,
  index: number,
  language: Language,
  dead: Set<ProviderName>,
) {
  const name = `caso #${index + 1}`;
  const base = {
    name,
    time: "",
    input: tc.input,
    expected: tc.expected_output,
    isSample: tc.is_sample,
  };

  const order: ProviderName[] = ["wandbox", "godbolt"];
  const problems: string[] = [];

  for (const provider of order) {
    if (dead.has(provider)) continue;

    const outcome = await callProvider(provider, code, tc.input, language);

    if (outcome.kind === "infra") {
      dead.add(provider);
      problems.push(`${provider}: ${outcome.output}`);
      continue;
    }

    if (outcome.kind === "compile_error") {
      return { ...base, passed: false, status: "ERRO DE COMPILAÇÃO", received: outcome.output, provider };
    }

    if (outcome.kind === "runtime_error") {
      return { ...base, passed: false, status: "RUNTIME ERROR", received: outcome.output, provider };
    }

    const received = outcome.output.trim();
    const expected = tc.expected_output.trim();
    const passed = received === expected;

    return {
      ...base,
      passed,
      status: passed ? "PASSOU" : "SAÍDA ERRADA",
      received,
      provider,
      warning: formatWarning(outcome, received, expected, passed),
    };
  }

  return {
    ...base,
    passed: false,
    status: "ERRO INTERNO",
    provider: null,
    received:
      "os compiladores online estão fora do ar no momento — tente de novo em alguns minutos.\n\n" +
      problems.join("\n"),
  };
}

async function callProvider(
  provider: ProviderName,
  code: string,
  stdin: string,
  language: Language,
): Promise<RunOutcome> {
  const { url, body } =
    provider === "wandbox"
      ? wandboxRequest(code, stdin, language)
      : godboltRequest(code, stdin, language);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        kind: "infra",
        output: `respondeu ${res.status}: ${text.slice(0, 300)}`,
        trailingNewlineKnown: false,
      };
    }

    const data = await res.json();
    return provider === "wandbox" ? parseWandbox(data) : parseGodbolt(data);
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "AbortError";
    return {
      kind: "infra",
      output: timedOut ? `não respondeu em ${REQUEST_TIMEOUT_MS / 1000}s` : String(err),
      trailingNewlineKnown: false,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
