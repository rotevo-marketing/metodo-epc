"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MetodoLogo } from "@/Components/MetodoBrand";

const STRATEGIST_EMAIL = "estrategista@metodoepc.com";
const STRATEGIST_PASSWORD = "metodoepc2026";

export default function EstrategistaLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const typedEmail = email.trim().toLowerCase();
    const typedPassword = password.trim();

    if (
      typedEmail === STRATEGIST_EMAIL &&
      typedPassword === STRATEGIST_PASSWORD
    ) {
      window.localStorage.setItem("metodo-epc-strategist-auth", "true");

      if (rememberMe) {
        window.localStorage.setItem("metodo-epc-strategist-remember", "true");
      } else {
        window.localStorage.removeItem("metodo-epc-strategist-remember");
      }

      router.push("/admin");
      return;
    }

    setErrorMessage("Email ou senha incorretos. Verifique os dados e tente novamente.");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative flex min-h-screen flex-col px-6 py-8 lg:px-16">
        <div className="pointer-events-none absolute left-[35%] top-[-120px] h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-[-120px] top-[190px] h-[300px] w-[300px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] h-[260px] w-[260px] rounded-full border border-white/10" />

        <header className="relative z-10 flex items-center justify-between">
          <MetodoLogo
  href="/"
  size="md"
  className="brightness-0 invert"
/>

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

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              Entre com seus dados para acessar o painel administrativo, editar planejamentos e acompanhar os módulos estratégicos dos clientes.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20">
            <form
              onSubmit={handleLogin}
              className="rounded-[1.5rem] bg-white p-8 text-slate-950 lg:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">
                    Acessar painel
                  </p>

                  <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em]">
                    Entrar
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white">
                  <span className="text-lg">🔒</span>
                </div>
              </div>

              <div className="mt-9 space-y-5">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Email"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-base outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Senha"
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4 pr-12 text-base outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-950"
                  >
                    {showPassword ? "ocultar" : "ver"}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {errorMessage}
                </p>
              )}

              <div className="mt-6 flex items-center gap-3">
                <input
                  id="remember-strategist"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-5 w-5 rounded border-slate-300"
                />

                <label
                  htmlFor="remember-strategist"
                  className="text-sm font-medium text-slate-600"
                >
                  Lembrar de mim
                </label>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="rounded-2xl bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Entrar no painel
                </button>

                <p className="text-sm text-slate-500">
                  Acesso exclusivo para estrategistas autorizados.
                </p>
              </div>

              <p className="mt-8 text-center text-sm text-slate-400">
                Painel interno do Metodo EPC.
              </p>
            </form>
          </div>
        </div>

        <footer className="relative z-10 text-center text-xs text-slate-400">
          © 2026 Metodo EPC. Todos os direitos reservados.
        </footer>
      </section>
    </main>
  );
}