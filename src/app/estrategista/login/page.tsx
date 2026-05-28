"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MetodoLogo } from "@/Components/MetodoBrand";
import { supabase } from "@/lib/supabase";

export default function EstrategistaLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    const typedEmail = email.trim().toLowerCase();
    const typedPassword = password.trim();

    if (!typedEmail || !typedPassword) {
      setErrorMessage("Informe o e-mail e a senha para acessar.");
      setIsLoading(false);
      return;
    }

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: typedEmail,
        password: typedPassword,
      });

    if (loginError || !loginData.user) {
      setErrorMessage("E-mail ou senha inválidos.");
      setIsLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", loginData.user.id)
      .single();

    if (profileError || profile?.role !== "strategist") {
      await supabase.auth.signOut();
      setErrorMessage("Este usuário não tem permissão de estrategista.");
      setIsLoading(false);
      return;
    }

    window.localStorage.setItem("metodo-epc-strategist-auth", "true");

    if (rememberMe) {
      window.localStorage.setItem("metodo-epc-strategist-remember", "true");
    } else {
      window.localStorage.removeItem("metodo-epc-strategist-remember");
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative flex min-h-screen flex-col px-6 py-8 lg:px-16">
        <div className="pointer-events-none absolute left-[35%] top-[-120px] h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-[-120px] top-[190px] h-[300px] w-[300px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] h-[260px] w-[260px] rounded-full border border-white/10" />

        <header className="relative z-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-4">
            <MetodoLogo href="/" size="md" variant="light" />
          </a>

          <a
            href="/"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
          >
            Voltar ao login do cliente
          </a>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.55em] text-slate-300">
              Acesso interno
            </p>

            <h1 className="mt-8 max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.07em] text-white lg:text-7xl">
              Espaço do estrategista.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80">
              Entre com seus dados para acessar o painel administrativo, editar
              planejamentos e acompanhar os módulos estratégicos dos clientes.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-8 text-slate-950 shadow-xl lg:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">
                    Acessar painel
                  </p>

                  <h2 className="mt-4 text-5xl font-light tracking-[-0.07em] text-slate-950">
                    Entrar
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white">
                  🔐
                </div>
              </div>

              <form onSubmit={handleLogin} className="mt-10 space-y-5">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 text-base outline-none transition placeholder:text-slate-400 focus:border-[#c79e40]/60 focus:ring-2 focus:ring-[#c79e40]/10"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Senha"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-5 pr-14 text-base outline-none transition placeholder:text-slate-400 focus:border-[#c79e40]/60 focus:ring-2 focus:ring-[#c79e40]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 transition hover:text-slate-950"
                  >
                    {showPassword ? "ocultar" : "ver"}
                  </button>
                </div>

                <label className="flex items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-5 w-5 rounded border-slate-300"
                  />
                  Lembrar de mim
                </label>

                {errorMessage ? (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 cursor-pointer rounded-2xl bg-slate-950 px-8 text-sm font-semibold text-white transition hover:bg-slate-900 hover:ring-2 hover:ring-[#c79e40]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Entrando..." : "Entrar no painel"}
                  </button>

                  <p className="text-sm text-slate-500">
                    Acesso exclusivo para estrategistas autorizados.
                  </p>
                </div>

                <p className="pt-6 text-center text-sm text-slate-400">
                  Painel interno do Metodo EPC.
                </p>
              </form>
            </div>
          </div>
        </div>

        <footer className="relative z-10 text-center text-xs text-white/50">
          © 2026 Metodo EPC. Todos os direitos reservados.
        </footer>
      </section>
    </main>
  );
}