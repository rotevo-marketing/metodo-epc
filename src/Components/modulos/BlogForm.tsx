"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type BlogFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

export type BlogTextListItem = {
  value: string;
};

export type BlogVisualReference = {
  image: string;
};

export type BlogContentItem = {
  title: string;
  suggestedDate: string;
  observation: string;
};

export type BlogExternalReference = {
  title: string;
  link: string;
};

export type BlogData = {
  frequencyItems: BlogFrequencyItem[];
  objectives: BlogTextListItem[];
  languageStructures: BlogTextListItem[];
  visualStrategy: string;
  visualReferences: BlogVisualReference[];
  priorityKeywords: string;
  blogCategories: string;
  seoGuidelines: string;
  contents: BlogContentItem[];
  references: BlogExternalReference[];
};

export const initialBlogFrequencyItems: BlogFrequencyItem[] = [
  { format: "Artigo SEO", quantity: "", period: "por semana", observation: "" },
  { format: "Artigo de autoridade", quantity: "", period: "por mês", observation: "" },
  { format: "Atualização de artigo", quantity: "", period: "por mês", observation: "" },
  { format: "Conteúdo pilar", quantity: "", period: "por mês", observation: "" },
];

export const initialBlogData: BlogData = {
  frequencyItems: initialBlogFrequencyItems,
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  priorityKeywords: "",
  blogCategories: "",
  seoGuidelines: "",
  contents: [{ title: "", suggestedDate: "", observation: "" }],
  references: [{ title: "", link: "" }],
};

export function normalizeBlogTextList(value: unknown): BlogTextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") return { value: item };
    if (item && typeof item === "object") {
      return { value: (item as Partial<BlogTextListItem>).value || "" };
    }
    return { value: "" };
  });
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

type BlogFormProps = {
  data: BlogData;
  setData: Dispatch<SetStateAction<BlogData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function BlogForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: BlogFormProps) {
  function updateFrequencyItem(
    index: number,
    key: keyof BlogFrequencyItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.frequencyItems];
      nextItems[index] = { ...nextItems[index], [key]: value };
      return { ...current, frequencyItems: nextItems };
    });
  }

  function addFrequencyItem() {
    setData((current) => ({
      ...current,
      frequencyItems: [
        ...current.frequencyItems,
        { format: "", quantity: "", period: "por semana", observation: "" },
      ],
    }));
  }

  function removeFrequencyItem(index: number) {
    setData((current) => ({
      ...current,
      frequencyItems:
        current.frequencyItems.length > 1
          ? current.frequencyItems.filter((_, i) => i !== index)
          : [{ format: "", quantity: "", period: "por semana", observation: "" }],
    }));
  }

  function updateTextListItem(
    listKey: "objectives" | "languageStructures",
    index: number,
    value: string
  ) {
    setData((current) => {
      const nextList = [...current[listKey]];
      nextList[index] = { value };
      return { ...current, [listKey]: nextList };
    });
  }

  function addTextListItem(listKey: "objectives" | "languageStructures") {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(
    listKey: "objectives" | "languageStructures",
    index: number
  ) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, i) => i !== index)
          : [{ value: "" }],
    }));
  }

  function updateVisualReferenceImage(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setData((current) => {
        const nextReferences = [...current.visualReferences];
        nextReferences[index] = { image: String(reader.result || "") };
        return { ...current, visualReferences: nextReferences };
      });
    };
    reader.readAsDataURL(file);
  }

  function removeVisualReferenceImage(index: number) {
    setData((current) => {
      const nextReferences = [...current.visualReferences];
      nextReferences[index] = { image: "" };
      return { ...current, visualReferences: nextReferences };
    });
  }

  function updateContent(
    index: number,
    key: keyof BlogContentItem,
    value: string
  ) {
    setData((current) => {
      const nextContents = [...current.contents];
      nextContents[index] = { ...nextContents[index], [key]: value };
      return { ...current, contents: nextContents };
    });
  }

  function addContent() {
    setData((current) => ({
      ...current,
      contents: [
        ...current.contents,
        { title: "", suggestedDate: "", observation: "" },
      ],
    }));
  }

  function removeContent(index: number) {
    setData((current) => ({
      ...current,
      contents:
        current.contents.length > 1
          ? current.contents.filter((_, i) => i !== index)
          : [{ title: "", suggestedDate: "", observation: "" }],
    }));
  }

  function updateReference(
    index: number,
    key: keyof BlogExternalReference,
    value: string
  ) {
    setData((current) => {
      const nextReferences = [...current.references];
      nextReferences[index] = { ...nextReferences[index], [key]: value };
      return { ...current, references: nextReferences };
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

  function TextListSection({
    title,
    description,
    listKey,
    placeholder,
    buttonLabel,
  }: {
    title: string;
    description: string;
    listKey: "objectives" | "languageStructures";
    placeholder: string;
    buttonLabel: string;
  }) {
    return (
      <SectionCard title={title} description={description}>
        <div className="space-y-3">
          {data[listKey].map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={item.value}
                onChange={(event) =>
                  updateTextListItem(listKey, index, event.target.value)
                }
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
              <button
                type="button"
                onClick={() => removeTextListItem(listKey, index)}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addTextListItem(listKey)}
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + {buttonLabel}
        </button>
      </SectionCard>
    );
  }

  return (
    <div>
      <SectionCard
        title="Frequência"
        description="Defina a frequência por tipo de publicação. Use quantidade e período para deixar a orientação mais clara."
      >
        <div className="space-y-4">
          {data.frequencyItems.map((item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_160px_180px_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Formato
                </label>
                <input
                  type="text"
                  value={item.format}
                  onChange={(event) =>
                    updateFrequencyItem(index, "format", event.target.value)
                  }
                  placeholder="Ex: Artigo SEO"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Quantidade
                </label>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(event) =>
                    updateFrequencyItem(index, "quantity", event.target.value)
                  }
                  placeholder="Ex: 1"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Período
                </label>
                <select
                  value={item.period}
                  onChange={(event) =>
                    updateFrequencyItem(index, "period", event.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  <option value="por dia">por dia</option>
                  <option value="por semana">por semana</option>
                  <option value="por quinzena">por quinzena</option>
                  <option value="por mês">por mês</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Observação
                </label>
                <input
                  type="text"
                  value={item.observation}
                  onChange={(event) =>
                    updateFrequencyItem(index, "observation", event.target.value)
                  }
                  placeholder="Ex: Priorizar palavras-chave com intenção de busca."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeFrequencyItem(index)}
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
          onClick={addFrequencyItem}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + Novo formato
        </button>
      </SectionCard>

      <TextListSection
        title="Objetivos"
        description="Defina os objetivos específicos do conteúdo do blog: autoridade, SEO, tráfego orgânico, educação do público, geração de leads ou apoio comercial."
        listKey="objectives"
        placeholder="Ex: Aumentar tráfego orgânico, educar o público, fortalecer autoridade, gerar leads..."
        buttonLabel="Novo objetivo"
      />

      <TextListSection
        title="Estruturas de linguagem"
        description="Descreva estruturas de linguagem adequadas para que o conteúdo do blog cumpra seu papel na estratégia."
        listKey="languageStructures"
        placeholder="Ex: Introdução com problema, desenvolvimento educativo, exemplos práticos, conclusão com chamada para ação..."
        buttonLabel="Nova estrutura de linguagem"
      />

      <SectionCard
        title="Identidade visual"
        description="Defina o layout do blog, tanto na página inicial quanto na página de cada artigo. Registre referências visuais, estilo de imagens, organização das seções e aparência geral."
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Estratégia visual
          </label>
          <textarea
            rows={6}
            value={data.visualStrategy}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                visualStrategy: event.target.value,
              }))
            }
            placeholder="Explique a direção visual do blog: layout da página inicial, página de artigo, imagens, categorias, chamadas, organização e referências."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.visualReferences.map((reference, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
            >
              <label className="flex aspect-video cursor-pointer items-center justify-center text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100">
                {reference.image ? (
                  <img
                    src={reference.image}
                    alt={`Referência ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    +<br />
                    Adicionar referência
                  </span>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) => updateVisualReferenceImage(index, event)}
                  className="hidden"
                />
              </label>
              <div className="p-3">
                <button
                  type="button"
                  onClick={() => removeVisualReferenceImage(index)}
                  className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Tamanho recomendado para imagem: 1920x1080px.
        </p>
      </SectionCard>

      <SectionCard
        title="Estratégia de SEO do blog"
        description="Defina como o blog deve ser usado para gerar tráfego orgânico, ranquear palavras-chave e apoiar a estratégia de conteúdo."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Palavras-chave prioritárias
            </label>
            <textarea
              rows={5}
              value={data.priorityKeywords}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  priorityKeywords: event.target.value,
                }))
              }
              placeholder="Liste palavras-chave principais para orientar os artigos."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Categorias do blog
            </label>
            <textarea
              rows={5}
              value={data.blogCategories}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  blogCategories: event.target.value,
                }))
              }
              placeholder="Liste categorias, editorias ou temas centrais do blog."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Orientações de SEO
          </label>
          <textarea
            rows={6}
            value={data.seoGuidelines}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                seoGuidelines: event.target.value,
              }))
            }
            placeholder="Registre orientações sobre títulos, subtítulos, links internos, CTAs, intenção de busca e estrutura dos artigos."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Conteúdos"
        description="Defina os assuntos e datas em que os temas do blog serão publicados. Este campo pode funcionar como um calendário de conteúdo."
      >
        <div className="space-y-4">
          {data.contents.map((content, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Tema do conteúdo
                  </label>
                  <input
                    type="text"
                    value={content.title}
                    onChange={(event) =>
                      updateContent(index, "title", event.target.value)
                    }
                    placeholder="Ex: Como construir uma estratégia de conteúdo eficiente"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Data sugerida
                  </label>
                  <input
                    type="text"
                    value={content.suggestedDate}
                    onChange={(event) =>
                      updateContent(index, "suggestedDate", event.target.value)
                    }
                    placeholder="Ex: 15/06/2026"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Observação
                </label>
                <textarea
                  rows={5}
                  value={content.observation}
                  onChange={(event) =>
                    updateContent(index, "observation", event.target.value)
                  }
                  placeholder="Registre objetivo do artigo, palavra-chave, abordagem e CTA sugerido."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <button
                type="button"
                onClick={() => removeContent(index)}
                className="mt-4 cursor-pointer rounded-full border border-red-100 bg-white px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir conteúdo
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addContent}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + Novo conteúdo
        </button>
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do blog."
      >
        <div className="space-y-4">
          {data.references.map((reference, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Título da referência
                </label>
                <input
                  type="text"
                  value={reference.title}
                  onChange={(event) =>
                    updateReference(index, "title", event.target.value)
                  }
                  placeholder="Ex: Blog, artigo, referência visual, pauta ou pesquisa"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Link
                </label>
                <input
                  type="url"
                  value={reference.link}
                  onChange={(event) =>
                    updateReference(index, "link", event.target.value)
                  }
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + Nova referência
        </button>
      </SectionCard>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
            className="cursor-pointer inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
