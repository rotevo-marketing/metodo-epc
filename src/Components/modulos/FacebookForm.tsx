"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type FacebookFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

export type FacebookTextListItem = {
  value: string;
};

export type FacebookVisualReference = {
  image: string;
};

export type FacebookExternalReference = {
  title: string;
  link: string;
};

export type FacebookData = {
  frequencyItems: FacebookFrequencyItem[];
  objectives: FacebookTextListItem[];
  languageStructures: FacebookTextListItem[];
  contents: FacebookTextListItem[];
  visualStrategy: string;
  visualReferences: FacebookVisualReference[];
  pagePhoto: string;
  pageCover: string;
  pageName: string;
  pageCategory: string;
  pageDescription: string;
  siteLink: string;
  contactLink: string;
  serviceRegion: string;
  otherLinks: string;
  references: FacebookExternalReference[];
};

export const initialFacebookFrequencyItems: FacebookFrequencyItem[] = [
  {
    format: "Post institucional",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Vídeo curto",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Link estratégico",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Live",
    quantity: "",
    period: "por mês",
    observation: "",
  },
];

export const initialFacebookData: FacebookData = {
  frequencyItems: initialFacebookFrequencyItems,
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  contents: [{ value: "" }],
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  pagePhoto: "",
  pageCover: "",
  pageName: "",
  pageCategory: "",
  pageDescription: "",
  siteLink: "",
  contactLink: "",
  serviceRegion: "",
  otherLinks: "",
  references: [{ title: "", link: "" }],
};

export function normalizeFacebookTextList(
  value: unknown
): FacebookTextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return { value: item };
    }

    if (item && typeof item === "object") {
      const record = item as Partial<FacebookTextListItem>;

      return { value: record.value || "" };
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
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>

        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

type FacebookListKey = "objectives" | "languageStructures" | "contents";

type FacebookFormProps = {
  data: FacebookData;
  setData: Dispatch<SetStateAction<FacebookData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function FacebookForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: FacebookFormProps) {
  function updateFrequencyItem(
    index: number,
    key: keyof FacebookFrequencyItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.frequencyItems];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        frequencyItems: nextItems,
      };
    });
  }

  function addFrequencyItem() {
    setData((current) => ({
      ...current,
      frequencyItems: [
        ...current.frequencyItems,
        {
          format: "",
          quantity: "",
          period: "por semana",
          observation: "",
        },
      ],
    }));
  }

  function removeFrequencyItem(index: number) {
    setData((current) => ({
      ...current,
      frequencyItems:
        current.frequencyItems.length > 1
          ? current.frequencyItems.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                format: "",
                quantity: "",
                period: "por semana",
                observation: "",
              },
            ],
    }));
  }

  function updateTextListItem(
    listKey: FacebookListKey,
    index: number,
    value: string
  ) {
    setData((current) => {
      const nextList = [...current[listKey]];

      nextList[index] = { value };

      return {
        ...current,
        [listKey]: nextList,
      };
    });
  }

  function addTextListItem(listKey: FacebookListKey) {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(listKey: FacebookListKey, index: number) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, itemIndex) => itemIndex !== index)
          : [{ value: "" }],
    }));
  }

  function updateImage(
    key: "pagePhoto" | "pageCover",
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setData((current) => ({
        ...current,
        [key]: String(reader.result || ""),
      }));
    };

    reader.readAsDataURL(file);
  }

  function removeImage(key: "pagePhoto" | "pageCover") {
    setData((current) => ({
      ...current,
      [key]: "",
    }));
  }

  function updateVisualReferenceImage(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setData((current) => {
        const nextReferences = [...current.visualReferences];

        nextReferences[index] = {
          image: String(reader.result || ""),
        };

        return {
          ...current,
          visualReferences: nextReferences,
        };
      });
    };

    reader.readAsDataURL(file);
  }

  function removeVisualReferenceImage(index: number) {
    setData((current) => {
      const nextReferences = [...current.visualReferences];

      nextReferences[index] = { image: "" };

      return {
        ...current,
        visualReferences: nextReferences,
      };
    });
  }

  function updateReference(
    index: number,
    key: keyof FacebookExternalReference,
    value: string
  ) {
    setData((current) => {
      const nextReferences = [...current.references];

      nextReferences[index] = {
        ...nextReferences[index],
        [key]: value,
      };

      return {
        ...current,
        references: nextReferences,
      };
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
          ? current.references.filter(
              (_, referenceIndex) => referenceIndex !== index
            )
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
    listKey: FacebookListKey;
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
          className="mt-4 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + {buttonLabel}
        </button>
      </SectionCard>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Configurações da página"
        description="Defina a apresentação visual e estratégica da página, incluindo capa, foto, nome, categoria, descrição e informações principais."
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <label className="flex aspect-[16/5] cursor-pointer items-center justify-center bg-slate-200 text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-300">
            {data.pageCover ? (
              <img
                src={data.pageCover}
                alt="Capa da página"
                className="h-full w-full object-cover"
              />
            ) : (
              <span>
                +<br />
                Adicionar capa da página
              </span>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => updateImage("pageCover", event)}
              className="hidden"
            />
          </label>

          <div className="p-5">
            <button
              type="button"
              onClick={() => removeImage("pageCover")}
              className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Remover capa
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
          <div>
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
              {data.pagePhoto ? (
                <img
                  src={data.pagePhoto}
                  alt="Foto da página"
                  className="h-full w-full object-cover"
                />
              ) : (
                "Foto"
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <label className="cursor-pointer rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800">
                Escolher foto
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) => updateImage("pagePhoto", event)}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => removeImage("pagePhoto")}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Remover
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Nome da página
                </label>

                <input
                  type="text"
                  value={data.pageName}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      pageName: event.target.value,
                    }))
                  }
                  placeholder="Ex: Nome da marca, especialista ou empresa"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Categoria da página
                </label>

                <input
                  type="text"
                  value={data.pageCategory}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      pageCategory: event.target.value,
                    }))
                  }
                  placeholder="Ex: Serviço, educação, negócio local..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Descrição da página
              </label>

              <RichTextEditor
                value={data.pageDescription}
                onChange={(value) =>
                  setData((current) => ({ ...current, pageDescription: value }))
                }
                placeholder="Escreva uma sugestão de descrição para a página do Facebook."
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Tamanho recomendado para capa do Facebook: 1920x720px.
        </p>
      </SectionCard>

      <SectionCard
        title="Links e informações da página"
        description="Liste links e informações importantes que podem aparecer na página ou orientar a configuração do perfil."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Site
            </label>

            <input
              type="url"
              value={data.siteLink}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  siteLink: event.target.value,
                }))
              }
              placeholder="https://..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Link de contato
            </label>

            <input
              type="url"
              value={data.contactLink}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  contactLink: event.target.value,
                }))
              }
              placeholder="https://..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Endereço ou região de atendimento
            </label>

            <input
              type="text"
              value={data.serviceRegion}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  serviceRegion: event.target.value,
                }))
              }
              placeholder="Ex: Atendimento online, cidade, região ou endereço"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Outros links
            </label>

            <input
              type="text"
              value={data.otherLinks}
              onChange={(event) =>
                setData((current) => ({
                  ...current,
                  otherLinks: event.target.value,
                }))
              }
              placeholder="Ex: WhatsApp, catálogo, landing page, formulário..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Frequência"
        description="Defina a frequência por formato de conteúdo. Use quantidade e período para deixar a orientação mais clara."
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
                  placeholder="Ex: Post institucional"
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
                  placeholder="Ex: 3"
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
                    updateFrequencyItem(
                      index,
                      "observation",
                      event.target.value
                    )
                  }
                  placeholder="Ex: Priorizar conteúdos institucionais e relacionamento."
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
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo formato
        </button>
      </SectionCard>

      <TextListSection
        title="Objetivos"
        description="Defina os objetivos específicos do conteúdo para o Facebook."
        listKey="objectives"
        placeholder="Ex: Fortalecer autoridade, gerar tráfego para o site, captar leads, divulgar conteúdos..."
        buttonLabel="Novo objetivo"
      />

      <TextListSection
        title="Estruturas de linguagem"
        description="Descreva estruturas de linguagem adequadas para que o conteúdo do Facebook cumpra seu papel na estratégia."
        listKey="languageStructures"
        placeholder="Ex: Texto direto, legenda educativa, chamada para link, perguntas para engajamento..."
        buttonLabel="Nova estrutura de linguagem"
      />

      <TextListSection
        title="Conteúdos"
        description="Defina os assuntos, formatos e datas de cada post no Facebook."
        listKey="contents"
        placeholder="Ex: Post institucional, vídeo curto, link para blog, chamada para evento, prova social..."
        buttonLabel="Novo conteúdo"
      />

      <SectionCard
        title="Identidade visual"
        description="Defina o estilo visual do Facebook, tanto na capa quanto nos posts. Você pode carregar imagens de referência para exemplificar."
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Estratégia visual
          </label>

          <RichTextEditor
            value={data.visualStrategy}
            onChange={(value) =>
              setData((current) => ({ ...current, visualStrategy: value }))
            }
            placeholder="Explique a direção visual do Facebook: capa, posts, vídeos, cores, estilo de imagem, estética geral e referências."
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
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do Facebook."
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
                  placeholder="Ex: Página, post, campanha, anúncio ou referência visual"
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
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova referência
        </button>
      </SectionCard>

      <div className="sticky bottom-0 rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href={`/admin/planejamentos/${clientSlug}`}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Voltar para módulos
          </Link>

          <Link
            href={presentationHref}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
