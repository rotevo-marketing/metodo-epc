"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { MetodoLogo } from "@/Components/MetodoBrand";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M7 10V8a5 5 0 1 1 10 0v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 14v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage("Informe o e-mail e a senha para acessar.");
      setIsLoading(false);
      return;
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (loginError || !loginData.user) {
      setErrorMessage("E-mail ou senha inválidos.");
      setIsLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", loginData.user.id)
      .single();

    if (!profile) {
      await supabase.auth.signOut();
      setErrorMessage("Usuário sem perfil configurado. Fale com o estrategista.");
      setIsLoading(false);
      return;
    }

    if (profile.role === "client") {
      router.push("/cliente");
      return;
    }

    if (profile.role === "strategist") {
      router.push("/admin");
      return;
    }

    await supabase.auth.signOut();
    setErrorMessage("Acesso não autorizado. Fale com o estrategista.");
    setIsLoading(false);
  }

  return (
    <main className="flex min-h-screen overflow-hidden">
      {/* ── Left column – purple ───────────────────────────── */}
      <div className="relative hidden flex-col overflow-hidden bg-black lg:flex lg:w-1/2">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full border border-white/15" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-[360px] w-[360px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-[28%] right-[-80px] h-[220px] w-[220px] rounded-full border border-white/12" />

        {/* Nav */}
        <header className="relative z-10 flex items-center px-10 py-8">
          <a href="/">
            <Image src="/brand/logo-light.png" width={150} height={40} alt="Método EPC" style={{ width: "150px", height: "auto" }} />
          </a>
        </header>

        {/* Hero */}
        <div className="relative z-10 flex flex-1 items-center px-16 pb-12 xl:px-20">
          <div className="w-full">
            <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-tight text-white/65">
              Bem-vindo ao seu ambiente estratégico!
            </p>

            <h1 className="mt-7 max-w-2xl text-4xl font-light leading-[1.1] tracking-[-0.04em] text-white xl:text-[2.75rem]">
              Agora existe um caminho claro<br />para o seu projeto crescer.
            </h1>

            <p className="mt-6 whitespace-nowrap text-lg leading-7 text-white/72">
              Entre com seus dados para visualizar a apresentação estratégica do projeto.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 px-10 pb-8 text-xs text-white/40">
          © 2026 Metodo EPC. Todos os direitos reservados.
        </footer>
      </div>

      {/* ── Right column – white ───────────────────────────── */}
      <div className="relative flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <Link
          href="/estrategista/login"
          className="absolute right-6 top-6 inline-flex h-10 items-center justify-center rounded-full border border-black bg-white px-5 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-50"
        >
          Espaço do estrategista
        </Link>
        {/* Mobile-only logo */}
        <div className="mb-10 w-full max-w-md lg:hidden">
          <MetodoLogo href="/" size="md" variant="dark" />
        </div>

        <div className="w-full max-w-md">
          {/* Eyebrow + lock icon */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-tight text-slate-400">
              Acessar planejamento
            </p>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
              <LockIcon />
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Entrar
          </h1>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-14 w-full rounded-xl bg-gray-100 px-5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-black/10"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="h-14 w-full rounded-xl bg-gray-100 px-5 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-black/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                <EyeIcon />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="cursor-default text-sm text-slate-400"
                title="Recuperação de senha disponível em breve. Fale com o estrategista."
              >
                Esqueci minha senha
              </button>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                em breve
              </span>
            </div>

            {errorMessage && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-xl bg-black px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>

              <p className="text-sm text-slate-500">
                Ainda não tem acesso?{" "}
                <span className="font-semibold text-slate-950">
                  Fale com o estrategista.
                </span>
              </p>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-slate-400">
            Acesso exclusivo para clientes com planejamento ativo.
          </p>
        </div>
      </div>
    </main>
  );
}
