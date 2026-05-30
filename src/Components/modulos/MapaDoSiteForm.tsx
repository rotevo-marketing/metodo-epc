"use client";

import { useState } from "react";
import Link from "next/link";
import RichTextEditor from "@/Components/RichTextEditor";

export type SiteMapPageItem = {
  title: string;
  type: string;
  objective: string;
  description: string;
  requiredSections: string;
  mainCta: string;
  priority: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

export type SiteMapData = {
  pages: SiteMapPageItem[];
  strategicNotes: string;
  references: ExternalReference[];
};

export const pageTypes = [
  "Institucional",
  "Comercial",
  "Captação",
  "Conteúdo",
  "Relacionamento",
  "Conversão",
  "Suporte",
  "Legal",
  "Outro",
];

export const pagePriorities = ["Alta", "Média", "Baixa", "Futura"];

const initialPage: SiteMapPageItem = {
  title: "",
  type: "Institucional",
  objective: "",
  description: "",
  requiredSections: "",
  mainCta: "",
  priority: "Alta",
};

export const initialSiteMapData: SiteMapData = {
  pages: [{ ...initialPage }],
  strategicNotes: "",
  references: [{ title: "", link: "" }],
};

type MapaDoSiteFormProps = {
  data: SiteMapData;
  setData: React.Dispatch<React.SetStateAction<SiteMapData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function MapaDoSiteForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: MapaDoSiteFormProps) {
  const [expandedPage, setExpandedPage] = useState<number | null>(0);

  function updatePage(index: number, key: keyof SiteMapPageItem, value: string) {
    setData((current) => {
      const next = [...current.pages];
      next[index] = { ...next[index], [key]: value };
      return { ...current, pages: next };
    });
  }

  function addPage() {
    setData((current) => ({
      ...current,
      pages: [...current.pages, { ...initialPage }],
    }));
    setExpandedPage(data.pages.length);
  }

  function removePage(index: number) {
    setData((current) => ({
      ...current,
      pages:
        current.pages.length > 1
          ? current.pages.filter((_, i) => i !== index)
          : [{ ...initialPage }],
    }));
    setExpandedPage(null);
  }

  function movePage(index: number, direction: "up" | "down") {
    setData((current) => {
      const next = [...current.pages];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return current;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return { ...current, pages: next };
    });
    setExpandedPage((prev) => {
      if (prev === index) return direction === "up" ? index - 1 : index + 1;
      return prev;
    });
  }

  function updateReference(index: number, key: "title" | "link", value: string) {
    setData((current) => {
      const next = [...current.references];
      next[index] = { ...next[index], [key]: value };
      return { ...current, references: next };
    });
  }

  function addReference() {
    setData((current) => ({
      ...current,
      references: [...current.references, { title: "", link: "" }],
    }));
  }

  function removeReference(index: number) {
    setData((current) => ({
      ...current,
      references:
        current.references.length > 1
          ? current.references.filter((_, i) => i !== index)
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
      {/* Páginas do site */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Páginas do site</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Defina as páginas principais, a função de cada uma, as seções necessárias, prioridade e chamada principal.
        </p>

        <div className="mt-6 space-y-5">
          {data.pages.map((page, index) => (
            <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <button
                  type="button"
                  onClick={() => setExpandedPage(expandedPage === index ? null : index)}
                  className="flex flex-col text-left"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Página {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {page.title || `Página ${index + 1}`}
                    {page.type ? ` — ${page.type}` : ""}
                    {page.priority ? ` · ${page.priority}` : ""}
                  </p>
                </button>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => movePage(index, "up")}
                    disabled={index === 0}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Subir
                  </button>
                  <button
                    type="button"
                    onClick={() => movePage(index, "down")}
                    disabled={index === data.pages.length - 1}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Descer
                  </button>
                  <button
                    type="button"
                    onClick={() => removePage(index)}
                    className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              {expandedPage === index && (
                <div className="mt-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_220px_180px]">
                    <div>
                      <label className={labelClass}>Título da página</label>
                      <input
                        type="text"
                        value={page.title}
                        onChange={(e) => updatePage(index, "title", e.target.value)}
                        placeholder="Ex: Início, Sobre, Serviços, Blog, Contato, Landing Page..."
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Tipo da página</label>
                      <select
                        value={page.type}
                        onChange={(e) => updatePage(index, "type", e.target.value)}
                        className={inputClass}
                      >
                        {pageTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Prioridade</label>
                      <select
                        value={page.priority}
                        onChange={(e) => updatePage(index, "priority", e.target.value)}
                        className={inputClass}
                      >
                        {pagePriorities.map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={labelClass}>Objetivo da página</label>
                    <input
                      type="text"
                      value={page.objective}
                      onChange={(e) => updatePage(index, "objective", e.target.value)}
                      placeholder="Ex: Apresentar a marca, captar leads, vender uma oferta, educar o público ou gerar contato."
                      className={inputClass}
                    />
                  </div>

                  <div className="mt-4">
                    <label className={labelClass}>Descrição</label>
                    <RichTextEditor
                      value={page.description}
                      onChange={(value) => updatePage(index, "description", value)}
                      placeholder="Descreva o que essa página deve conter, qual será sua função, qual mensagem ela precisa transmitir e qual ação o visitante deve realizar."
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Seções obrigatórias</label>
                      <RichTextEditor
                        value={page.requiredSections}
                        onChange={(value) => updatePage(index, "requiredSections", value)}
                        placeholder="Ex: Hero, prova social, benefícios, serviços, depoimentos, FAQ, formulário, chamada final..."
                      />
                    </div>

                    <div>
                      <label className={labelClass}>CTA principal</label>
                      <RichTextEditor
                        value={page.mainCta}
                        onChange={(value) => updatePage(index, "mainCta", value)}
                        placeholder="Ex: Entrar em contato, agendar diagnóstico, baixar material, comprar, solicitar orçamento ou falar no WhatsApp."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPage}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova página
        </button>
      </section>

      {/* Observações estratégicas */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Observações sobre a estrutura do site</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Use este campo para registrar orientações gerais sobre menu, navegação, hierarquia, páginas obrigatórias, páginas futuras e prioridades do desenvolvimento.
        </p>

        <div className="mt-6">
          <RichTextEditor
            value={data.strategicNotes}
            onChange={(value) => setData((c) => ({ ...c, strategicNotes: value }))}
            placeholder="Registre observações estratégicas sobre a organização do site, fluxo de navegação, experiência do usuário e prioridades."
          />
        </div>
      </section>

      {/* Referências externas */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <h2 className="text-base font-semibold text-slate-950">Anexos e referências externas</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estrutura do site.
        </p>

        <div className="mt-6 space-y-4">
          {data.references.map((reference, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className={labelClass}>Título da referência</label>
                <input
                  type="text"
                  value={reference.title}
                  onChange={(e) => updateReference(index, "title", e.target.value)}
                  placeholder="Ex: Sitemap, wireframe, briefing, referência de navegação ou site exemplo"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Link</label>
                <input
                  type="url"
                  value={reference.link}
                  onChange={(e) => updateReference(index, "link", e.target.value)}
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
