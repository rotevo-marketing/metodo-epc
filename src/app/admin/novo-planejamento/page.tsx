"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";
import { supabase } from "@/lib/supabase";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 text-slate-400"
    >
      <path
        d="M12 16V8m0 0-3 3m3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 16v2a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NovoPlanejamentoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [clientName, setClientName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clientSlug = useMemo(() => createSlug(clientName), [clientName]);

  const projectSlug = useMemo(() => {
    const baseSlug = createSlug(projectTitle);
    if (baseSlug) return baseSlug;
    if (clientSlug) return clientSlug;
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

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Formato inválido. Use apenas PNG, JPEG ou WebP.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setUploadError("Arquivo muito grande. O limite é 5 MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!clientSlug) {
      setUploadError("Informe o nome do cliente antes de enviar a imagem.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${clientSlug}/${timestamp}-${safeName}`;

    const { error: storageError } = await supabase.storage
      .from("planning-covers")
      .upload(path, file, { contentType: file.type });

    if (storageError) {
      setUploadError("Erro ao enviar a imagem. Tente novamente.");
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const { data: urlData } = supabase.storage
      .from("planning-covers")
      .getPublicUrl(path);

    setCoverImageUrl(urlData.publicUrl);
    setIsUploading(false);
  }

  function handleRemoveImage() {
    setCoverImageUrl("");
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
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
          <MetodoLogo variant="dark" />
          <Link
            href="/admin"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40"
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
        <MetodoLogo variant="dark" />
        <Link
          href="/admin"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40"
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

          {errorMessage && (
            <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {/* Nome do cliente */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nome do cliente
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Cliente Demo"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c79e40]/60 focus:ring-2 focus:ring-[#c79e40]/10"
              />
              {clientSlug && (
                <p className="mt-2 text-xs text-slate-400">
                  Slug do cliente: {clientSlug}
                </p>
              )}
            </div>

            {/* Título do planejamento */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Título do planejamento
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Ex: Planejamento Estratégico 2026"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c79e40]/60 focus:ring-2 focus:ring-[#c79e40]/10"
              />
              {projectSlug && (
                <p className="mt-2 text-xs text-slate-400">
                  Slug da apresentação: {projectSlug}
                </p>
              )}
            </div>

            {/* Imagem de capa — upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Imagem de capa do cliente
              </label>

              {/* Upload area */}
              {!coverImageUrl && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploading ? (
                    <>
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
                      <p className="text-sm font-medium text-slate-600">
                        Enviando imagem...
                      </p>
                    </>
                  ) : (
                    <>
                      <UploadIcon />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Clique para selecionar uma imagem
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          PNG, JPEG ou WebP · Máximo 5 MB
                        </p>
                      </div>
                    </>
                  )}
                </button>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload error */}
              {uploadError && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {uploadError}
                </p>
              )}

              {/* Preview after upload */}
              {coverImageUrl && (
                <div className="mt-4 flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                    <img
                      src={coverImageUrl}
                      alt="Prévia da imagem de capa"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      Imagem enviada com sucesso
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Aparecerá no card e no hero da apresentação.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-red-50 hover:text-red-600 hover:ring-red-200"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Descrição opcional
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Planejamento estratégico inicial do cliente."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c79e40]/60 focus:ring-2 focus:ring-[#c79e40]/10"
              />
            </div>

            {/* Info box */}
            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-700">
                Próxima etapa
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Depois de avançar, você escolherá quais módulos entram no
                planejamento deste cliente.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-[#c79e40]/5 hover:ring-[#c79e40]/40"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#c79e40] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
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
