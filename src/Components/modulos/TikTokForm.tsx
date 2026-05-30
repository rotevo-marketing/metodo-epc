"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type TikTokFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

export type TikTokTextListItem = {
  value: string;
};

export type TikTokVisualReference = {
  image: string;
};

export type TikTokExternalReference = {
  title: string;
  link: string;
};

export type TikTokData = {
  frequencyItems: TikTokFrequencyItem[];
  objectives: TikTokTextListItem[];
  languageStructures: TikTokTextListItem[];
  contents: TikTokTextListItem[];
  mainFormats: string;
  contentSeries: string;
  visualStrategy: string;
  visualReferences: TikTokVisualReference[];
  openingHooks: string;
  retentionResources: string;
  references: TikTokExternalReference[];
};

export const initialTikTokFrequencyItems: TikTokFrequencyItem[] = [
  {
    format: "Vídeos curtos",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Séries de conteúdo",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Reaproveitamento de conteúdo",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Lives",
    quantity: "",
    period: "por mês",
    observation: "",
  },
];

export const initialTikTokData: TikTokData = {
  frequencyItems: initialTikTokFrequencyItems,
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  contents: [{ value: "" }],
  mainFormats: "",
  contentSeries: "",
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  openingHooks: "",
  retentionResources: "",
  references: [{ title: "", link: "" }],
};

export function normalizeTikTokTextList(
  value: unknown
): TikTokTextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return { value: item };
    }

    if (item && typeof item === "object") {
      const record = item as Partial<TikTokTextListItem>;

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

type TikTokListKey = "objectives" | "languageStructures" | "contents";

type TikTokFormProps = {
  data: TikTokData;
  setData: Dispatch<SetStateAction<TikTokData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function TikTokForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: TikTokFormProps) {
  function updateFrequencyItem(
    index: number,
    key: keyof TikTokFrequencyItem,
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
    listKey: TikTokListKey,
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

  function addTextListItem(listKey: TikTokListKey) {
    setData((current) => ({
      ...current,
      [listKey]: [...current[listKey], { value: "" }],
    }));
  }

  function removeTextListItem(listKey: TikTokListKey, index: number) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, itemIndex) => itemIndex !== index)
          : [{ value: "" }],
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
    key: keyof TikTokExternalReference,
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
    listKey: TikTokListKey;
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
                  placeholder="Ex: Vídeos curtos"
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
                  placeholder="Ex: 5"
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
                  placeholder="Ex: Priorizar vídeos de descoberta e autoridade."
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
        description="Defina os objetivos específicos do conteúdo para o TikTok."
        listKey="objectives"
        placeholder="Ex: Aumentar alcance, gerar descoberta, fortalecer autoridade, educar o público..."
        buttonLabel="Novo objetivo"
      />

      <TextListSection
        title="Estruturas de linguagem"
        description="Descreva estruturas de linguagem adequadas para que os vídeos do TikTok cumpram seu papel na estratégia."
        listKey="languageStructures"
        placeholder="Ex: Gancho nos 3 primeiros segundos, contexto rápido, desenvolvimento objetivo, exemplo prático e chamada final."
        buttonLabel="Nova estrutura de linguagem"
      />

      <TextListSection
        title="Conteúdos"
        description="Defina ideias, formatos, séries e temas que podem ser publicados no TikTok."
        listKey="contents"
        placeholder="Ex: Dicas rápidas, tendências adaptadas, mitos e verdades, bastidores, antes e depois, respostas a dúvidas..."
        buttonLabel="Novo conteúdo"
      />

      <SectionCard
        title="Formatos e séries"
        description="Organize formatos recorrentes para facilitar a produção de vídeos e criar consistência no canal."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Formatos principais
            </label>

            <RichTextEditor
              value={data.mainFormats}
              onChange={(value) =>
                setData((current) => ({ ...current, mainFormats: value }))
              }
              placeholder="Ex: Dicas rápidas, bastidores, reacts, storytelling, perguntas e respostas, cortes, tendências adaptadas..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Séries de conteúdo
            </label>

            <RichTextEditor
              value={data.contentSeries}
              onChange={(value) =>
                setData((current) => ({ ...current, contentSeries: value }))
              }
              placeholder="Ex: Série de mitos, erros comuns, passo a passo, análise de casos, rotina, desafios, bastidores..."
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Identidade visual"
        description="Defina o estilo visual do TikTok, incluindo enquadramento, legenda na tela, ritmo, cenário, cortes, estética e referências."
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
            placeholder="Explique a direção visual do TikTok: cenário, luz, enquadramento, legendas, cortes, ritmo, estilo dos vídeos e referências."
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.visualReferences.map((reference, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
            >
              <label className="flex aspect-[9/16] cursor-pointer items-center justify-center text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100">
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
          Tamanho recomendado para vídeo ou imagem vertical: 1080x1920px.
        </p>
      </SectionCard>

      <SectionCard
        title="Ganchos e retenção"
        description="Registre ideias de ganchos, primeiras frases, chamadas visuais e recursos para aumentar retenção nos vídeos."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Ganchos de abertura
            </label>

            <RichTextEditor
              value={data.openingHooks}
              onChange={(value) =>
                setData((current) => ({ ...current, openingHooks: value }))
              }
              placeholder="Ex: Você está cometendo esse erro..., Pare de fazer isso..., Ninguém te conta isso sobre..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Recursos de retenção
            </label>

            <RichTextEditor
              value={data.retentionResources}
              onChange={(value) =>
                setData((current) => ({ ...current, retentionResources: value }))
              }
              placeholder="Ex: Cortes rápidos, legenda dinâmica, mudança de enquadramento, exemplos práticos, listas e suspense."
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do TikTok."
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
                  placeholder="Ex: Perfil, vídeo, tendência, áudio, formato ou referência visual"
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
