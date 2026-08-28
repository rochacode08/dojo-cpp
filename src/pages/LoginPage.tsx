import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabaseClient";

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
    <div className="flex h-screen items-center justify-center bg-dojo-bg font-sans text-dojo-text">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-dojo-border bg-dojo-panel p-8"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-dojo-accent font-mono text-[11px] font-bold text-white">
            C+
          </div>
          <span className="text-sm font-semibold tracking-tight text-dojo-textBright">
            C++ Dojo
          </span>
        </div>

        <label className="flex flex-col gap-1 text-xs text-dojo-textDim">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-dojo-border2 bg-[#0d0d0d] px-3 py-2 text-sm text-dojo-text outline-none focus:border-dojo-accent"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-dojo-textDim">
          Senha
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-dojo-border2 bg-[#0d0d0d] px-3 py-2 text-sm text-dojo-text outline-none focus:border-dojo-accent"
          />
        </label>

        {error && <div className="text-xs text-dojo-red">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-dojo-accent px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
