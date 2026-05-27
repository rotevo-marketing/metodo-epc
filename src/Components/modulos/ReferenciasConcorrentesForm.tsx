"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type ChannelKey =
  | "site"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "linkedin"
  | "whatsapp"
  | "blog"
  | "pinterest"
  | "podcast";

type ChannelItem = {
  key: ChannelKey;
  label: string;
  icon: string;
};

export type AnalysisItem = {
  title: string;
  description: string;
};

export type ReferenceCompetitorItem = {
  image: string;
  title: string;
  channels: Record<ChannelKey, string>;
  analyses: AnalysisItem[];
};

export type ReferencesCompetitorsData = {
  items: ReferenceCompetitorItem[];
};

const channelItems: ChannelItem[] = [
  { key: "site", label: "Site", icon: "/icons/29-estrategia-do-site.svg" },
  { key: "instagram", label: "Instagram", icon: "/icons/18-instagram.svg" },
  { key: "tiktok", label: "TikTok", icon: "/icons/19-tik-tok.svg" },
  { key: "youtube", label: "YouTube", icon: "/icons/20-youtube.svg" },
  { key: "facebook", label: "Facebook", icon: "/icons/21-facebook.svg" },
  { key: "linkedin", label: "LinkedIn", icon: "/icons/22-linkedin.svg" },
  { key: "whatsapp", label: "WhatsApp", icon: "/icons/23-whatsaap.svg" },
  { key: "blog", label: "Blog", icon: "/icons/24-blog.svg" },
  { key: "pinterest", label: "Pinterest", icon: "/icons/25-pinterest.svg" },
  { key: "podcast", label: "Podcast", icon: "/icons/26-podcast.svg" },
];

function createEmptyChannels(): Record<ChannelKey, string> {
  return {
    site: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
    linkedin: "",
    whatsapp: "",
    blog: "",
    pinterest: "",
    podcast: "",
  };
}

function createEmptyItem(): ReferenceCompetitorItem {
  return {
    image: "",
    title: "",
    channels: createEmptyChannels(),
    analyses: [
      {
        title: "",
        description: "",
      },
    ],
  };
}

export const initialReferencesCompetitorsData: ReferencesCompetitorsData = {
  items: [createEmptyItem()],
};

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
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      ) : null}

      <div className="mt-6">{children}</div>
    </section>
  );
}

type ReferenciasConcorrentesFormProps = {
  data: ReferencesCompetitorsData;
  setData: Dispatch<SetStateAction<ReferencesCompetitorsData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function ReferenciasConcorrentesForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: ReferenciasConcorrentesFormProps) {
  function updateItem(
    index: number,
    key: keyof Pick<ReferenceCompetitorItem, "image" | "title">,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.items];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        items: nextItems,
      };
    });
  }

  function updateItemImage(index: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateItem(index, "image", String(reader.result || ""));
    };

    reader.readAsDataURL(file);
  }

  function removeItemImage(index: number) {
    updateItem(index, "image", "");
  }

  function updateChannel(
    itemIndex: number,
    channelKey: ChannelKey,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.items];
      const currentChannels = nextItems[itemIndex].channels || createEmptyChannels();

      nextItems[itemIndex] = {
        ...nextItems[itemIndex],
        channels: {
          ...currentChannels,
          [channelKey]: value,
        },
      };

      return {
        ...current,
        items: nextItems,
      };
    });
  }

  function updateAnalysis(
    itemIndex: number,
    analysisIndex: number,
    key: keyof AnalysisItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.items];
      const nextAnalyses = [...nextItems[itemIndex].analyses];

      nextAnalyses[analysisIndex] = {
        ...nextAnalyses[analysisIndex],
        [key]: value,
      };

      nextItems[itemIndex] = {
        ...nextItems[itemIndex],
        analyses: nextAnalyses,
      };

      return {
        ...current,
        items: nextItems,
      };
    });
  }

  function addAnalysis(itemIndex: number) {
    setData((current) => {
      const nextItems = [...current.items];

      nextItems[itemIndex] = {
        ...nextItems[itemIndex],
        analyses: [
          ...nextItems[itemIndex].analyses,
          {
            title: "",
            description: "",
          },
        ],
      };

      return {
        ...current,
        items: nextItems,
      };
    });
  }

  function removeAnalysis(itemIndex: number, analysisIndex: number) {
    setData((current) => {
      const nextItems = [...current.items];
      const currentAnalyses = nextItems[itemIndex].analyses;

      nextItems[itemIndex] = {
        ...nextItems[itemIndex],
        analyses:
          currentAnalyses.length > 1
            ? currentAnalyses.filter(
                (_, itemIndexValue) => itemIndexValue !== analysisIndex
              )
            : [
                {
                  title: "",
                  description: "",
                },
              ],
      };

      return {
        ...current,
        items: nextItems,
      };
    });
  }

  function addItem() {
    setData((current) => ({
      ...current,
      items: [...current.items, createEmptyItem()],
    }));
  }

  function removeItem(index: number) {
    setData((current) => ({
      ...current,
      items:
        current.items.length > 1
          ? current.items.filter((_, itemIndex) => itemIndex !== index)
          : [createEmptyItem()],
    }));
  }

  return (
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Referências e concorrentes"
        description="Cadastre referências, concorrentes, marcas, perfis ou projetos que devem ser analisados estrategicamente."
      >
        <div className="space-y-6">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Referência ou concorrente {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    {item.title || "Nova referência ou concorrente"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
                <div>
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Imagem da referência ou concorrente"
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
                        onChange={(event) => updateItemImage(index, event)}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => removeItemImage(index)}
                      className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                      Remover
                    </button>
                  </div>

                  <p className="mt-3 max-w-28 text-xs leading-5 text-slate-500">
                    Use imagem quadrada para melhor recorte circular.
                  </p>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Título da referência ou concorrência
                    </label>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        updateItem(index, "title", event.target.value)
                      }
                      placeholder="Ex: Nome do concorrente, referência, marca ou perfil analisado"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Canais analisados
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Preencha apenas os canais que serão considerados na análise. Eles aparecerão na apresentação como botões clicáveis com ícone.
                      </p>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {channelItems.map((channel) => (
                        <div key={channel.key}>
                          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                              <img
                                src={channel.icon}
                                alt=""
                                className="h-4 w-4 object-contain"
                              />
                            </span>
                            {channel.label}
                          </label>

                          <input
                            type="url"
                            value={(item.channels || createEmptyChannels())[channel.key] || ""}
                            onChange={(event) =>
                              updateChannel(index, channel.key, event.target.value)
                            }
                            placeholder="https://..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Análises estratégicas
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Registre os pontos observados nesta referência ou concorrente, como posicionamento, pontos fortes, diferenciais, riscos, oportunidades e aprendizados.
                      </p>
                    </div>

                    <div className="mt-5 space-y-5">
                      {item.analyses.map((analysis, analysisIndex) => (
                        <div
                          key={analysisIndex}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                        >
                          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Análise {String(analysisIndex + 1).padStart(2, "0")}
                              </p>

                              <h4 className="mt-2 text-lg font-semibold text-slate-950">
                                {analysis.title || "Nova análise"}
                              </h4>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeAnalysis(index, analysisIndex)}
                              className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                            >
                              Excluir
                            </button>
                          </div>

                          <div className="grid gap-4">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-600">
                                Título da análise
                              </label>

                              <input
                                type="text"
                                value={analysis.title}
                                onChange={(event) =>
                                  updateAnalysis(
                                    index,
                                    analysisIndex,
                                    "title",
                                    event.target.value
                                  )
                                }
                                placeholder="Ex: Pontos fortes, posicionamento, diferenciais, presença digital..."
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-600">
                                Descrição da análise
                              </label>

                              <textarea
                                rows={5}
                                value={analysis.description}
                                onChange={(event) =>
                                  updateAnalysis(
                                    index,
                                    analysisIndex,
                                    "description",
                                    event.target.value
                                  )
                                }
                                placeholder="Descreva o que deve ser observado nessa referência ou concorrência, incluindo pontos positivos, oportunidades, diferenciais, riscos e aprendizados."
                                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addAnalysis(index)}
                      className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                    >
                      + Nova análise
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-6 cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          + Novo concorrente
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