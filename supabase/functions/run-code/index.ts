// Supabase Edge Function: recebe { problem_id, code }, roda cada caso de teste
// na Wandbox (https://wandbox.org, compilador online público mantido pela
// comunidade C++ — gratuito, sem chave, sem cartão) e devolve o resultado no
// formato que o TestsPanel espera.

import { createClient } from "jsr:@supabase/supabase-js@2";

const WANDBOX_URL = "https://wandbox.org/api/compile.json";
const WANDBOX_COMPILER = "gcc-13.2.0";
const WANDBOX_OPTIONS = "c++17";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface TestCase {
  id: string;
  input: string;
  expected_output: string;
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

    const { problem_id, code } = await req.json();
    if (!problem_id || typeof code !== "string") {
      return json({ error: "problem_id e code são obrigatórios" }, 400);
    }

    const { data: testCases, error: testsError } = await db
      .from("test_cases")
      .select("id, input, expected_output")
      .eq("problem_id", problem_id)
      .order("order_index");

    if (testsError || !testCases || testCases.length === 0) {
      return json({ error: "problema sem casos de teste cadastrados" }, 400);
    }

    // Roda em sequência (não em paralelo) para não sobrecarregar o serviço
    // público gratuito da Wandbox.
    const results = [];
    for (let i = 0; i < testCases.length; i++) {
      results.push(await runOne(code, testCases[i] as TestCase, i));
    }

    const passedAll = results.every((r) => r.passed);
    const status = passedAll
      ? "accepted"
      : results.some((r) => r.status === "ERRO DE COMPILAÇÃO")
        ? "compile_error"
        : results.some((r) => r.status === "RUNTIME ERROR")
          ? "runtime_error"
          : "wrong_answer";

    await db.from("submissions").insert({
      user_id: userId,
      problem_id,
      code,
      status,
      results,
    });

    return json({ status, results });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
});

async function runOne(code: string, tc: TestCase, index: number) {
  const name = `caso #${index + 1}`;

  const res = await fetch(WANDBOX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      compiler: WANDBOX_COMPILER,
      code,
      stdin: tc.input,
      options: WANDBOX_OPTIONS,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return {
      name,
      passed: false,
      status: "ERRO INTERNO",
      time: "",
      input: tc.input,
      expected: tc.expected_output,
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
      received: (data.program_error || data.signal || "").trim(),
    };
  }

  const received = (data.program_output ?? "").trim();
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
  };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
