// Supabase Edge Function: recebe { problem_id, code, mode }, roda os casos de
// teste na Wandbox (https://wandbox.org, compilador online público mantido
// pela comunidade C++ — gratuito, sem chave, sem cartão) e devolve o resultado
// no formato que o TestsPanel espera.
//
// mode = "test"   -> roda só os casos de exemplo, NÃO registra submissão
// mode = "submit" -> roda todos os casos e registra a submissão (padrão)

import { createClient } from "jsr:@supabase/supabase-js@2";

const WANDBOX_URL = "https://wandbox.org/api/compile.json";
const WANDBOX_COMPILER = "gcc-13.2.0";
const WANDBOX_OPTIONS = "c++17";
const WANDBOX_TIMEOUT_MS = 15000;

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

interface WandboxResponse {
  status: string;
  signal?: string;
  compiler_error?: string;
  program_output?: string;
  program_error?: string;
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

    const { problem_id, code, mode: rawMode } = await req.json();
    if (!problem_id || typeof code !== "string") {
      return json({ error: "problem_id e code são obrigatórios" }, 400);
    }
    const mode: "test" | "submit" = rawMode === "test" ? "test" : "submit";

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

    // Roda em sequência (não em paralelo) para não sobrecarregar o serviço
    // público gratuito da Wandbox.
    const results = [];
    for (let i = 0; i < testCases.length; i++) {
      results.push(await runOne(code, testCases[i] as TestCase, i));
    }

    // Falha de infraestrutura (timeout ou erro de rede com o compilador
    // público) não é um julgamento de correção — não grava como submissão,
    // senão polui o histórico e o placar com uma tentativa que não rodou de
    // verdade.
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
        status,
        results,
      });
    }

    return json({ status, results, mode });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
});

async function runOne(code: string, tc: TestCase, index: number) {
  const name = `caso #${index + 1}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WANDBOX_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(WANDBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: WANDBOX_COMPILER,
        code,
        stdin: tc.input,
        options: WANDBOX_OPTIONS,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "AbortError";
    return {
      name,
      passed: false,
      status: timedOut ? "TEMPO ESGOTADO" : "ERRO INTERNO",
      time: "",
      input: tc.input,
      expected: tc.expected_output,
      isSample: tc.is_sample,
      received: timedOut
        ? `o compilador público (Wandbox) não respondeu em ${WANDBOX_TIMEOUT_MS / 1000}s — tente executar de novo em instantes.`
        : String(err),
    };
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    const text = await res.text();
    return {
      name,
      passed: false,
      status: "ERRO INTERNO",
      time: "",
      input: tc.input,
      expected: tc.expected_output,
      isSample: tc.is_sample,
      received: `wandbox respondeu ${res.status}: ${text}`,
    };
  }

  const data = (await res.json()) as WandboxResponse;
  const succeeded = data.status === "0";

  if (!succeeded && data.compiler_error && !data.program_output) {
    return {
      name,
      passed: false,
      status: "ERRO DE COMPILAÇÃO",
      time: "",
      input: tc.input,
      expected: tc.expected_output,
      isSample: tc.is_sample,
      received: data.compiler_error.trim(),
    };
  }

  if (!succeeded && (data.signal || data.program_error)) {
    return {
      name,
      passed: false,
      status: "RUNTIME ERROR",
      time: "",
      input: tc.input,
      expected: tc.expected_output,
      isSample: tc.is_sample,
      received: (data.program_error || data.signal || "").trim(),
    };
  }

  const receivedRaw = data.program_output ?? "";
  const received = receivedRaw.trim();
  const expected = tc.expected_output.trim();
  const passed = received === expected;

  return {
    name,
    passed,
    status: passed ? "PASSOU" : "SAÍDA ERRADA",
    time: "",
    input: tc.input,
    expected: tc.expected_output,
    received,
    isSample: tc.is_sample,
    warning: formatWarning(receivedRaw, received, expected, passed),
  };
}

// A comparação em si ignora espaços nas bordas (senão uma quebra de linha a
// mais reprovaria uma solução correta). Mas vale avisar quando a formatação
// está diferente do esperado, porque juízes online costumam ser rígidos.
function formatWarning(
  receivedRaw: string,
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

  if (received.length > 0 && !receivedRaw.endsWith("\n")) {
    return "sua saída não termina com quebra de linha. Aqui passou, mas em juízes online (Beecrowd e afins) isso costuma dar erro — use endl ou \\n no final.";
  }

  return undefined;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
