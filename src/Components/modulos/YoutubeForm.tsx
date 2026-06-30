"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type YoutubeFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

export type YoutubeTextListItem = {
  value: string;
};

export type YoutubeVisualReference = {
  image: string;
};

export type YoutubeExternalReference = {
  title: string;
  link: string;
};

export type YoutubeData = {
  frequencyItems: YoutubeFrequencyItem[];
  objectives: YoutubeTextListItem[];
  languageStructures: YoutubeTextListItem[];
  editingStyle: string;
  visualReferences: YoutubeVisualReference[];
  seoStrategies: YoutubeTextListItem[];
  contents: YoutubeTextListItem[];
  channelPhoto: string;
  channelCover: string;
  channelName: string;
  channelCategory: string;
  channelDescription: string;
  suggestedPlaylists: string;
  references: YoutubeExternalReference[];
};

export const initialYoutubeFrequencyItems: YoutubeFrequencyItem[] = [
  {
    format: "Vídeo principal",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Shorts",
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
  {
    format: "Cortes",
    quantity: "",
    period: "por semana",
    observation: "",
  },
];

export const initialYoutubeData: YoutubeData = {
  frequencyItems: initialYoutubeFrequencyItems,
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  editingStyle: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  seoStrategies: [{ value: "" }],
  contents: [{ value: "" }],
  channelPhoto: "",
  channelCover: "",
  channelName: "",
  channelCategory: "",
  channelDescription: "",
  suggestedPlaylists: "",
  references: [{ title: "", link: "" }],
};

export function normalizeYoutubeTextList(
  value: unknown
): YoutubeTextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return { value: item };
    }

    if (item && typeof item === "object") {
      const record = item as Partial<YoutubeTextListItem>;

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

type YoutubeListKey =
  | "objectives"
  | "languageStructures"
  | "seoStrategies"
  | "contents";

type YoutubeFormProps = {
  data: YoutubeData;
  setData: Dispatch<SetStateAction<YoutubeData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function YoutubeForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: YoutubeFormProps) {
  function updateFrequencyItem(
    index: number,
    key: keyof YoutubeFrequencyItem,
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
    listKey: YoutubeListKey,
    index: number,
    value: string
  ) {
    setData((current) => {
      const nextList = [...current[listKey]];

      nextList[index] = {
        value,
      };

      return {
        ...current,
        [listKey]: nextList,
      };
    });
  }

  function addTextListItem(listKey: YoutubeListKey) {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(listKey: YoutubeListKey, index: number) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, itemIndex) => itemIndex !== index)
          : [{ value: "" }],
    }));
  }

  function updateImage(
    key: "channelPhoto" | "channelCover",
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

  function removeImage(key: "channelPhoto" | "channelCover") {
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

      nextReferences[index] = {
        image: "",
      };

      return {
        ...current,
        visualReferences: nextReferences,
      };
    });
  }

  function updateReference(
    index: number,
    key: keyof YoutubeExternalReference,
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
    listKey: YoutubeListKey;
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
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + {buttonLabel}
        </button>
      </SectionCard>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Configurações do canal"
        description="Defina a apresentação visual e estratégica do canal, incluindo capa, foto, nome, categoria, descrição e playlists sugeridas."
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <label className="flex aspect-[16/5] cursor-pointer items-center justify-center bg-slate-200 text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-300">
            {data.channelCover ? (
              <img
                src={data.channelCover}
                alt="Capa do canal"
                className="h-full w-full object-cover"
              />
            ) : (
              <span>
                +<br />
                Adicionar capa do canal
              </span>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => updateImage("channelCover", event)}
              className="hidden"
            />
          </label>

          <div className="p-5">
            <button
              type="button"
              onClick={() => removeImage("channelCover")}
              className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Remover capa
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
          <div>
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
              {data.channelPhoto ? (
                <img
                  src={data.channelPhoto}
                  alt="Foto do canal"
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
                  onChange={(event) => updateImage("channelPhoto", event)}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => removeImage("channelPhoto")}
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
                  Nome do canal
                </label>

                <input
                  type="text"
                  value={data.channelName}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      channelName: event.target.value,
                    }))
                  }
                  placeholder="Ex: Nome do especialista ou da marca"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Categoria do canal
                </label>

                <input
                  type="text"
                  value={data.channelCategory}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      channelCategory: event.target.value,
                    }))
                  }
                  placeholder="Ex: Educação, negócios, marketing, saúde..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Descrição do canal
              </label>

              <RichTextEditor
                value={data.channelDescription}
                onChange={(value) =>
                  setData((current) => ({ ...current, channelDescription: value }))
                }
                placeholder="Escreva uma sugestão de descrição para o canal do YouTube."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Playlists sugeridas
              </label>

              <input
                type="text"
                value={data.suggestedPlaylists}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    suggestedPlaylists: event.target.value,
                  }))
                }
                placeholder="Ex: Comece por aqui, aulas, entrevistas, estudos de caso..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Tamanho recomendado para capa do YouTube: 2560x1440px.
        </p>
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
                  placeholder="Ex: Vídeo principal"
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
                  placeholder="Ex: Priorizar vídeos educativos e estratégicos."
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Novo formato
        </button>
      </SectionCard>

      <TextListSection
        title="Objetivos"
        description="Defina os objetivos específicos dos vídeos no YouTube."
        listKey="objectives"
        placeholder="Ex: Aumentar autoridade, educar o público, gerar tráfego, captar leads..."
        buttonLabel="Novo objetivo"
      />

      <TextListSection
        title="Estruturas de linguagem"
        description="Descreva a estrutura de linguagem que deve ser empregada na fala dos vídeos."
        listKey="languageStructures"
        placeholder="Ex: Abertura com promessa clara, contextualização, desenvolvimento, exemplo prático e chamada final."
        buttonLabel="Nova estrutura de linguagem"
      />

      <SectionCard
        title="Estilo de edição dos vídeos"
        description="Defina o estilo visual dos vídeos e as peculiaridades de como devem ser editados."
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Estratégia de edição
          </label>

          <RichTextEditor
            value={data.editingStyle}
            onChange={(value) =>
              setData((current) => ({ ...current, editingStyle: value }))
            }
            placeholder="Explique ritmo de edição, cortes, trilhas, legendas, vinhetas, thumbnails, enquadramento e estilo dos vídeos."
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

      <TextListSection
        title="Estratégia de SEO"
        description="Defina tags, palavras-chave, categorias, playlists, títulos e temas buscáveis para o canal."
        listKey="seoStrategies"
        placeholder="Ex: Palavras-chave do canal, tags principais, playlists, títulos otimizados e temas buscáveis."
        buttonLabel="Nova estratégia"
      />

      <TextListSection
        title="Conteúdos"
        description="Defina os assuntos e temas que podem ser publicados no YouTube."
        listKey="contents"
        placeholder="Ex: Vídeo 01, tema, objetivo, formato, data sugerida e chamada principal."
        buttonLabel="Novo conteúdo"
      />

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do YouTube."
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
                  placeholder="Ex: Canal, vídeo, playlist, thumbnail, referência visual ou pesquisa"
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
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
