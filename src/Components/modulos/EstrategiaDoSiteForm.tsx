"use client";

import Link from "next/link";

type SiteReference = {
  title: string;
  url: string;
};

type SiteIntegration = {
  name: string;
};

type SiteSimpleItem = {
  value: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

export type SiteStrategyData = {
  visualIdentity: string;
  references: SiteReference[];
  integrations: SiteIntegration[];
  essentialPages: SiteSimpleItem[];
  importantFeatures: SiteSimpleItem[];
  strategicNotes: string;
  externalReferences: ExternalReference[];
};

export const initialSiteStrategyData: SiteStrategyData = {
  visualIdentity: "",
  references: [{ title: "", url: "" }],
  integrations: [{ name: "" }],
  essentialPages: [{ value: "" }],
  importantFeatures: [{ value: "" }],
  strategicNotes: "",
  externalReferences: [{ title: "", link: "" }],
};

type EstrategiaDoSiteFormProps = {
  data: SiteStrategyData;
  setData: React.Dispatch<React.SetStateAction<SiteStrategyData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function EstrategiaDoSiteForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: EstrategiaDoSiteFormProps) {
  function updateReference(index: number, key: keyof SiteReference, value: string) {
    setData((current) => {
      const next = [...current.references];
      next[index] = { ...next[index], [key]: value };
      return { ...current, references: next };
    });
  }

  function addReference() {
    setData((current) => ({
      ...current,
      references: [...current.references, { title: "", url: "" }],
    }));
  }

  function removeReference(index: number) {
    setData((current) => ({
      ...current,
      references:
        current.references.length > 1
          ? current.references.filter((_, i) => i !== index)
          : [{ title: "", url: "" }],
    }));
  }

  function updateIntegration(index: number, value: string) {
    setData((current) => {
      const next = [...current.integrations];
      next[index] = { name: value };
      return { ...current, integrations: next };
    });
  }

  function addIntegration() {
    setData((current) => ({
      ...current,
      integrations: [...current.integrations, { name: "" }],
    }));
  }

  function removeIntegration(index: number) {
    setData((current) => ({
      ...current,
      integrations:
        current.integrations.length > 1
          ? current.integrations.filter((_, i) => i !== index)
          : [{ name: "" }],
    }));
  }

  function updateSimpleItem(
    listKey: "essentialPages" | "importantFeatures",
    index: number,
    value: string
  ) {
    setData((current) => {
      const next = [...current[listKey]];
      next[index] = { value };
      return { ...current, [listKey]: next };
    });
  }

  function addSimpleItem(listKey: "essentialPages" | "importantFeatures") {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeSimpleItem(listKey: "essentialPages" | "importantFeatures", index: number) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, i) => i !== index)
          : [{ value: "" }],
    }));
  }

  function updateExternalReference(index: number, key: keyof ExternalReference, value: string) {
    setData((current) => {
      const next = [...current.externalReferences];
      next[index] = { ...next[index], [key]: value };
      return { ...current, externalReferences: next };
    });
  }

  function addExternalReference() {
    setData((current) => ({
      ...current,
      externalReferences: [...current.externalReferences, { title: "", link: "" }],
    }));
  }

  function removeExternalReference(index: number) {
    setData((current) => ({
      ...current,
      externalReferences:
        current.externalReferences.length > 1
          ? current.externalReferences.filter((_, i) => i !== index)
          : [{ title: "", link: "" }],
    }));
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";
  const textareaClass =
    "w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";
  const labelClass = "mb-2 block text-sm font-semibold text-slate-600";

  return (
    <div className="mt-6 space-y-6">
      {/* Identidade visual do site */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Identidade visual do site</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Faça uma extensão da identidade visual do projeto para o site. Registre cores, estilo das imagens, fontes, elementos visuais, sensações desejadas e referências de aparência.
        </p>

        <div className="mt-6">
          <textarea
            rows={8}
            value={data.visualIdentity}
            onChange={(e) => setData((c) => ({ ...c, visualIdentity: e.target.value }))}
            placeholder="Descreva a direção visual do site, incluindo estilo, cores, referências, imagens, tipografia, elementos gráficos e sensação desejada."
            className={textareaClass}
          />
        </div>
      </section>

      {/* Referências de site */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Referências</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Registre referências que podem nortear a concepção ou remodelação do site.
        </p>

        <div className="mt-6 space-y-4">
          {data.references.map((reference, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className={labelClass}>Referência</label>
                <input
                  type="text"
                  value={reference.title}
                  onChange={(e) => updateReference(index, "title", e.target.value)}
                  placeholder="Ex: Site, página, landing page ou projeto de referência"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>URL</label>
                <input
                  type="url"
                  value={reference.url}
                  onChange={(e) => updateReference(index, "url", e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addReference}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova referência
        </button>
      </section>

      {/* Integrações e plugins */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Integrações e plugins</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Liste os plugins, ferramentas e integrações que o site deve conter para que a estratégia atinja os resultados esperados.
        </p>

        <div className="mt-6 space-y-4">
          {data.integrations.map((integration, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto]"
            >
              <div>
                <label className={labelClass}>Integração ou plugin</label>
                <input
                  type="text"
                  value={integration.name}
                  onChange={(e) => updateIntegration(index, e.target.value)}
                  placeholder="Ex: Formulário de contato, WhatsApp, RD Station, Pixel, Google Analytics, CRM..."
                  className={inputClass}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeIntegration(index)}
                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addIntegration}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova integração
        </button>
      </section>

      {/* Páginas essenciais */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Páginas essenciais</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Liste as páginas que precisam existir no site para apresentar a empresa, educar o público, gerar conversão e apoiar a jornada.
        </p>

        <div className="mt-6 space-y-4">
          {data.essentialPages.map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto]"
            >
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateSimpleItem("essentialPages", index, e.target.value)}
                placeholder="Ex: Home, sobre, serviços, blog, contato, página de captura, obrigado, vendas..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeSimpleItem("essentialPages", index)}
                className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSimpleItem("essentialPages")}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova página
        </button>
      </section>

      {/* Funcionalidades importantes */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Funcionalidades importantes</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Liste recursos, blocos ou funcionalidades que o site precisa ter para melhorar navegação, conversão, clareza e experiência do usuário.
        </p>

        <div className="mt-6 space-y-4">
          {data.importantFeatures.map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto]"
            >
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateSimpleItem("importantFeatures", index, e.target.value)}
                placeholder="Ex: Botão fixo de WhatsApp, formulário, captura de leads, prova social, FAQ, depoimentos..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeSimpleItem("importantFeatures", index)}
                className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSimpleItem("importantFeatures")}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova funcionalidade
        </button>
      </section>

      {/* Observações estratégicas */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Observações estratégicas do site</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Use este campo para registrar objetivos, prioridades, páginas indispensáveis, cuidados e recomendações gerais para o site.
        </p>

        <div className="mt-6">
          <textarea
            rows={8}
            value={data.strategicNotes}
            onChange={(e) => setData((c) => ({ ...c, strategicNotes: e.target.value }))}
            placeholder="Registre observações sobre estrutura, função comercial, experiência do usuário, conversão, conteúdo, SEO e prioridades do site."
            className={textareaClass}
          />
        </div>
      </section>

      {/* Referências externas */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Anexos e referências externas</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do site.
        </p>

        <div className="mt-6 space-y-4">
          {data.externalReferences.map((reference, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className={labelClass}>Título da referência</label>
                <input
                  type="text"
                  value={reference.title}
                  onChange={(e) => updateExternalReference(index, "title", e.target.value)}
                  placeholder="Ex: Briefing, wireframe, referência visual ou documento do projeto"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Link</label>
                <input
                  type="url"
                  value={reference.link}
                  onChange={(e) => updateExternalReference(index, "link", e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeExternalReference(index)}
                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addExternalReference}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova referência
        </button>
      </section>

      {/* Ações */}
      <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/admin/planejamentos/${clientSlug}`}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Voltar para módulos
        </Link>

        <div className="flex gap-3">
          <Link
            href={presentationHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
