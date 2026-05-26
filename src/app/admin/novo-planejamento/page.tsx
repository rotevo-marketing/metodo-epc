"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";
import { supabase } from "@/lib/supabase";

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NovoPlanejamentoPage() {
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const clientSlug = useMemo(() => {
    return createSlug(clientName);
  }, [clientName]);

  const projectSlug = useMemo(() => {
    const baseSlug = createSlug(projectTitle);

    if (baseSlug) {
      return baseSlug;
    }

    if (clientSlug) {
      return clientSlug;
    }

    return "";
  }, [clientSlug, projectTitle]);

  useEffect(() => {
    async function validateStrategist() {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        window.localStorage.removeItem("metodo-epc-strategist-auth");
        router.push("/estrategista/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (profileError || profile?.role !== "strategist") {
        await supabase.auth.signOut();
        window.localStorage.removeItem("metodo-epc-strategist-auth");
        router.push("/estrategista/login");
        return;
      }

      setIsLoading(false);
    }

    validateStrategist();
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!clientName.trim()) {
      setErrorMessage("Informe o nome do cliente.");
      return;
    }

    if (!projectTitle.trim()) {
      setErrorMessage("Informe o título do planejamento.");
      return;
    }

    if (!clientSlug || !projectSlug) {
      setErrorMessage("Não foi possível gerar o slug do cliente ou do projeto.");
      return;
    }

    const draft = {
      clientName: clientName.trim(),
      clientSlug,
      projectTitle: projectTitle.trim(),
      projectSlug,
      description: description.trim(),
      coverImageUrl: coverImageUrl.trim(),
    };

    window.localStorage.setItem(
      "metodo-epc-new-planning-draft",
      JSON.stringify(draft)
    );

    router.push("/admin/novo-planejamento/modulos");
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-950">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
          <MetodoLogo />

          <Link
            href="/admin"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Voltar
          </Link>
        </header>

        <section className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500">Carregando...</p>
          </div>
        </section>

        <MetodoFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />

        <Link
          href="/admin"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Voltar ao painel
        </Link>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-20 lg:px-10">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Novo planejamento
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950">
            Criar novo projeto
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Preencha as informações iniciais do cliente. Na próxima etapa, você
            vai selecionar quais módulos farão parte do planejamento.
          </p>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nome do cliente
              </label>

              <input
                type="text"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                placeholder="Ex: Cliente Demo"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />

              {clientSlug ? (
                <p className="mt-2 text-xs text-slate-400">
                  Slug do cliente: {clientSlug}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Título do planejamento
              </label>

              <input
                type="text"
                value={projectTitle}
                onChange={(event) => setProjectTitle(event.target.value)}
                placeholder="Ex: Planejamento Estratégico 2026"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />

              {projectSlug ? (
                <p className="mt-2 text-xs text-slate-400">
                  Slug da apresentação: {projectSlug}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Imagem de capa do cliente
              </label>

              <input
                type="url"
                value={coverImageUrl}
                onChange={(event) => setCoverImageUrl(event.target.value)}
                placeholder="Cole aqui a URL da imagem de capa"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />

              <p className="mt-2 text-xs text-slate-400">
                Por enquanto, use uma URL de imagem. Depois podemos trocar para upload direto.
              </p>

              {coverImageUrl ? (
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                    <img
                      src={coverImageUrl}
                      alt="Prévia da imagem do cliente"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <p className="text-sm text-slate-500">
                    Essa imagem aparecerá no card do planejamento.
                  </p>
                </div>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Descrição opcional
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ex: Planejamento estratégico inicial do cliente."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
              />
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                Próxima etapa
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Depois de avançar, você escolherá quais módulos entram no
                planejamento deste cliente.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Escolher módulos
              </button>
            </div>
          </form>
        </div>
      </section>

      <MetodoFooter />
    </main>
  );
}