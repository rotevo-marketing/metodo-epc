import Link from "next/link";
import { MetodoLogo } from "@/Components/MetodoBrand";

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
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
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 left-[35%] h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="absolute bottom-[-120px] left-[-40px] h-[180px] w-[180px] rounded-full border border-white/10" />
        <div className="absolute right-[-120px] top-[20%] h-[320px] w-[320px] rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col px-6 py-6 sm:px-8 lg:px-14">
        <header className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <MetodoLogo
  href="/"
  size="md"
  className="brightness-0 invert"
/>

          </div>

          <Link
            href="/estrategista/login"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Espaço do estrategista
          </Link>
        </header>

        <section className="flex flex-1 items-center py-10 lg:py-14">
          <div className="grid w-full gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-[900px]">
              <p className="text-[0.82rem] font-medium uppercase tracking-[0.42em] text-white/65">
                Bem-vindo ao seu ambiente estratégico!
              </p>

              <h1 className="mt-8 text-[3.15rem] font-light leading-[1.02] tracking-[-0.055em] text-white sm:text-[3.65rem] lg:text-[4rem]">
                <span className="block whitespace-nowrap">
                  Agora existe um caminho claro
                </span>
                <span className="block whitespace-nowrap">
                  para o seu projeto crescer.
                </span>
              </h1>

              <p className="mt-8 max-w-[720px] text-[1.05rem] leading-relaxed text-white/82 lg:whitespace-nowrap">
                Entre com seus dados para visualizar a apresentação estratégica do projeto.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-sm">
              <div className="rounded-[1.75rem] bg-white p-6 text-slate-950 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.82rem] font-semibold uppercase tracking-[0.38em] text-slate-400">
                      Acessar planejamento
                    </p>

                    <h2 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-slate-950">
                      Entrar
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#020617] text-white">
                    <LockIcon />
                  </div>
                </div>

                <form className="mt-8 space-y-5">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Senha"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <EyeIcon />
                    </span>
                  </div>

                  <button
                    type="button"
                    className="text-sm text-slate-400 transition hover:text-slate-700"
                  >
                    Esqueci minha senha
                  </button>

                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 accent-[#020617]"
                    />
                    <span>Lembrar de mim</span>
                  </label>

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
                    <Link
                      href="/apresentacao/demo"
                      className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#020617] px-7 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Login
                    </Link>

                    <p className="text-sm text-slate-500">
                      Ainda não tem acesso?{" "}
                      <span className="font-semibold text-slate-950">
                        Fale com o estrategista.
                      </span>
                    </p>
                  </div>
                </form>

                <p className="mt-8 text-center text-sm text-slate-400">
                  Acesso exclusivo para clientes com planejamento ativo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-6 text-center text-xs text-white/55">
          © 2026 Metodo EPC. Todos os direitos reservados.
        </footer>
      </div>
    </main>
  );
}