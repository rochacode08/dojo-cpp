import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const SNIPPETS = [
  `class Filtro {
private:
    vector<int> dados;
public:
    void adicionar(int v) {
        dados.push_back(v);
    }
    vector<int> pares() {
        vector<int> saida;
        for (int x : dados)
            if (x % 2 == 0)
                saida.push_back(x);
        return saida;
    }
};`,
  `#include <iostream>
using namespace std;

int fatorial(int n) {
    if (n == 0) return 1;
    return n * fatorial(n - 1);
}

int main() {
    int n;
    cin >> n;
    cout << fatorial(n) << endl;
    return 0;
}`,
  `vector<long long> fib(31);
fib[0] = 0;
fib[1] = 1;
for (int i = 2; i <= 30; i++)
    fib[i] = fib[i-1] + fib[i-2];

cout << "Fib(" << x << ") = "
     << fib[x] << endl;`,
  `class Matriz {
    vector<vector<int>> dados;
public:
    int somaColuna(int c) {
        int soma = 0;
        for (auto& linha : dados)
            soma += linha[c];
        return soma;
    }
};`,
  `switch (opcao) {
    case 1: cout << "Ligar"; break;
    case 2: cout << "Desligar"; break;
    case 3: cout << "Reiniciar"; break;
    default: cout << "Opcao invalida";
}`,
  `stable_sort(palavras.begin(), palavras.end(),
    [](const string& a, const string& b) {
        return a.size() > b.size();
    });

for (auto& p : palavras)
    cout << p << " ";`,
];

function highlight(code: string) {
  const KW = /\b(class|private|public|void|int|long|vector|string|for|if|else|return|using|namespace|include|switch|case|break|default|auto|const)\b/g;
  const STR = /"[^"]*"/g;
  const NUM = /\b\d+\b/g;
  const parts: { text: string; className: string }[] = [];
  let last = 0;
  const combined = new RegExp(`${STR.source}|${KW.source}|${NUM.source}`, "g");
  let m: RegExpExecArray | null;
  while ((m = combined.exec(code)) !== null) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), className: "text-[#8a8f98]" });
    const cls = m[0].startsWith('"') ? "text-[#c97b63]" : /^\d/.test(m[0]) ? "text-[#7fae95]" : "text-[#4a7fb5]";
    parts.push({ text: m[0], className: cls });
    last = m.index + m[0].length;
  }
  parts.push({ text: code.slice(last), className: "text-[#8a8f98]" });
  return parts;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-dojo-bg font-sans text-dojo-text">
      {/* Fundo de código */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-8 p-8 opacity-[0.32] sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <pre key={i} className="whitespace-pre font-mono text-[11.5px] leading-[1.6]">
            {highlight(SNIPPETS[i % SNIPPETS.length]).map((part, j) => (
              <span key={j} className={part.className}>
                {part.text}
              </span>
            ))}
          </pre>
        ))}
      </div>

      {/* Vinheta + brilho central */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(560px 440px at 50% 42%, rgba(0,0,0,0.45), rgba(0,0,0,0.8) 65%, #000000 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(43,149,224,0.35), transparent 70%)" }}
      />

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full max-w-[380px] flex-col gap-5 rounded-2xl p-9"
        style={{
          background: "rgba(17,19,24,0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl font-mono text-[13px] font-bold text-white"
            style={{ background: "#2b95e0", boxShadow: "0 0 0 1px rgba(255,255,255,0.15), 0 8px 20px rgba(43,149,224,0.4)" }}
          >
            C++
          </div>
          <div>
            <h1 className="m-0 text-[19px] font-bold tracking-[-0.01em] text-dojo-textBright">C++ Dojo</h1>
            <p className="m-0 mt-1 text-[12.5px] text-dojo-textDim">Você entra vibecoder e sai programando no bloco de notas</p>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5 text-[11.5px] font-medium text-dojo-textDim">
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="rounded-lg px-3.5 py-2.5 text-[13.5px] text-dojo-text outline-none ring-1 ring-inset ring-white/[0.08] transition focus:ring-2 focus:ring-dojo-accent"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-[11.5px] font-medium text-dojo-textDim">
            Senha
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="rounded-lg px-3.5 py-2.5 text-[13.5px] text-dojo-text outline-none ring-1 ring-inset ring-white/[0.08] transition focus:ring-2 focus:ring-dojo-accent"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
          </label>
        </div>

        {error && (
          <div className="animate-dojo-fade rounded-lg border border-dojo-red/30 bg-[#241010] px-3 py-2 text-[12px] text-dojo-red">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-lg py-2.5 text-[13.5px] font-semibold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "#2b95e0", boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 6px 20px rgba(43,149,224,0.35)" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="flex items-center justify-center gap-2 border-t border-white/[0.06] pt-4">
          <div className="flex">
            {[
              { i: "FE", c: "#2d5f3f" },
              { i: "GA", c: "#4a3a6b" },
              { i: "JO", c: "#6b4a2a" },
              { i: "MA", c: "#7a2d55" },
            ].map((p) => (
              <div
                key={p.i}
                className="-ml-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 text-[8px] font-semibold text-white first:ml-0"
                style={{ background: p.c, borderColor: "rgba(17,19,24,0.85)" }}
              >
                {p.i}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-dojo-textDim">4 no dojo</span>
        </div>
      </form>
    </div>
  );
}
