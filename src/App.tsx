import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabaseClient";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import PlacarPage from "./pages/PlacarPage";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dojo-bg text-dojo-textDim font-sans text-sm">
        Carregando...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={session ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={session ? <HomePage session={session} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/problema/:slug"
        element={session ? <ProblemPage session={session} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/placar"
        element={session ? <PlacarPage session={session} /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
