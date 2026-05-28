"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-podcast";

type FrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type TextListItem = {
  value: string;
};

type VisualReference = {
  image: string;
};

type PodcastContentItem = {
  title: string;
  suggestedDate: string;
  guestOrResponsible: string;
  format: string;
  observation: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type PodcastData = {
  frequencyItems: FrequencyItem[];
  objectives: TextListItem[];
  languageStructures: TextListItem[];
  mainFormat: string;
  durationAndRhythm: string;
  seriesOrSegments: string;
  guestsAndParticipants: string;
  visualStrategy: string;
  visualReferences: VisualReference[];
  contents: PodcastContentItem[];
  publishingPlatforms: string;
  repurposingStrategy: string;
  references: ExternalReference[];
};

const initialFrequencyItems: FrequencyItem[] = [
  {
    format: "Episódio principal",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Corte para redes sociais",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Temporada temática",
    quantity: "",
    period: "por mês",
    observation: "",
  },
  {
    format: "Entrevista com convidado",
    quantity: "",
    period: "por mês",
    observation: "",
  },
];

const initialData: PodcastData = {
  frequencyItems: initialFrequencyItems,
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  mainFormat: "",
  durationAndRhythm: "",
  seriesOrSegments: "",
  guestsAndParticipants: "",
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  contents: [
    {
      title: "",
      suggestedDate: "",
      guestOrResponsible: "",
      format: "",
      observation: "",
    },
  ],
  publishingPlatforms: "",
  repurposingStrategy: "",
  references: [{ title: "", link: "" }],
};

function PageSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-80 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block">
      <a href="/admin" className="block">
        <h1 className="text-2xl font-bold">Metodo EPC</h1>
        <p className="mt-2 text-sm text-slate-500">Painel administrativo</p>
      </a>

      <div className="mt-8 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Planejamento
        </p>
        <p className="mt-1 font-bold">Cliente Demo</p>
      </div>

      <nav className="mt-8 space-y-6">
        {moduleCategories.map((category) => (
          <div key={category}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {category}
            </p>

            <div className="space-y-1">
              {planningModules
                .filter((module) => module.category === category)
                .map((module) => {
                  const isActive = module.slug === "podcast";

                  return (
                    <a
                      key={module.slug}
                      href={`/admin/planejamentos/demo/modulos/${module.slug}`}
                      className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-slate-100 text-slate-950"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      }`}
                    >
                      {module.title}
                    </a>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
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

function normalizeTextList(value: unknown): TextListItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return [{ value: "" }];
  }

  return value.map((item) => {
    if (typeof item === "string") {
      return { value: item };
    }

    if (item && typeof item === "object") {
      const record = item as Partial<TextListItem>;
      return { value: record.value || "" };
    }

    return { value: "" };
  });
}

export default function PodcastPage() {
  const [data, setData] = useState<PodcastData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        frequencyItems:
          Array.isArray(parsed.frequencyItems) && parsed.frequencyItems.length
            ? parsed.frequencyItems.map((item: Partial<FrequencyItem>) => ({
                format: item.format || "",
                quantity: item.quantity || "",
                period: item.period || "por semana",
                observation: item.observation || "",
              }))
            : initialFrequencyItems,
        objectives: normalizeTextList(parsed.objectives),
        languageStructures: normalizeTextList(parsed.languageStructures),
        mainFormat: parsed.mainFormat || "",
        durationAndRhythm: parsed.durationAndRhythm || "",
        seriesOrSegments: parsed.seriesOrSegments || "",
        guestsAndParticipants: parsed.guestsAndParticipants || "",
        visualStrategy: parsed.visualStrategy || "",
        visualReferences:
          Array.isArray(parsed.visualReferences) &&
          parsed.visualReferences.length
            ? parsed.visualReferences.map(
                (reference: Partial<VisualReference>) => ({
                  image: reference.image || "",
                })
              )
            : [{ image: "" }, { image: "" }, { image: "" }],
        contents:
          Array.isArray(parsed.contents) && parsed.contents.length
            ? parsed.contents.map((content: Partial<PodcastContentItem>) => ({
                title: content.title || "",
                suggestedDate: content.suggestedDate || "",
                guestOrResponsible: content.guestOrResponsible || "",
                format: content.format || "",
                observation: content.observation || "",
              }))
            : [
                {
                  title: "",
                  suggestedDate: "",
                  guestOrResponsible: "",
                  format: "",
                  observation: "",
                },
              ],
        publishingPlatforms: parsed.publishingPlatforms || "",
        repurposingStrategy: parsed.repurposingStrategy || "",
        references:
          Array.isArray(parsed.references) && parsed.references.length
            ? parsed.references.map((reference: Partial<ExternalReference>) => ({
                title: reference.title || "",
                link: reference.link || "",
              }))
            : [{ title: "", link: "" }],
      });
    } catch {
      setData(initialData);
    }
  }, []);

  function saveData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedMessage("Módulo salvo com sucesso.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2800);
  }

  function updateFrequencyItem(
    index: number,
    key: keyof FrequencyItem,
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
    listKey: "objectives" | "languageStructures",
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

  function updateContent(
    index: number,
    key: keyof PodcastContentItem,
    value: string
  ) {
    setData((current) => {
      const nextContents = [...current.contents];

      nextContents[index] = {
        ...nextContents[index],
        [key]: value,
      };

      return {
        ...current,
        contents: nextContents,
      };
    });
  }

  function addContent() {
    setData((current) => ({
      ...current,
      contents: [
        ...current.contents,
        {
          title: "",
          suggestedDate: "",
          guestOrResponsible: "",
          format: "",
          observation: "",
        },
      ],
    }));
  }

  function removeContent(index: number) {
    setData((current) => ({
      ...current,
      contents:
        current.contents.length > 1
          ? current.contents.filter((_, contentIndex) => contentIndex !== index)
          : [
              {
                title: "",
                suggestedDate: "",
                guestOrResponsible: "",
                format: "",
                observation: "",
              },
            ],
    }));
  }

  function updateReference(
    index: number,
    key: keyof ExternalReference,
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
          className="mt-4 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + {buttonLabel}
        </button>
      </SectionCard>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <PageSidebar />

      <section className="min-h-screen p-6 lg:ml-80 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <a
                href="/admin"
                className="text-sm font-semibold text-slate-500 hover:text-slate-950"
              >
                ← Voltar para planejamentos
              </a>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Estratégia Editorial e Canais de Conteúdo
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Podcasts
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Descreva as características que o canal de podcast da estratégia
                deve ter, incluindo frequência, objetivos, linguagem, edição de
                áudio, identidade visual, temas, formatos e distribuição.
              </p>

              {savedMessage && (
                <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {savedMessage}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/apresentacao/demo"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver apresentação
              </a>

              <button
                type="button"
                onClick={saveData}
                className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Salvar módulo
              </button>
            </div>
          </div>

          <form className="space-y-6">
            <SectionCard
              title="Frequência"
              description="Defina a frequência por tipo de publicação do podcast. Use quantidade e período para deixar a orientação mais clara."
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
                          updateFrequencyItem(
                            index,
                            "format",
                            event.target.value
                          )
                        }
                        placeholder="Ex: Episódio principal"
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
                          updateFrequencyItem(
                            index,
                            "quantity",
                            event.target.value
                          )
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
                          updateFrequencyItem(
                            index,
                            "period",
                            event.target.value
                          )
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      >
                        <option value="por dia">por dia</option>
                        <option value="por semana">por semana</option>
                        <option value="por quinzena">por quinzena</option>
                        <option value="por mês">por mês</option>
                        <option value="por temporada">por temporada</option>
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
                        placeholder="Ex: Reaproveitar cortes nas redes sociais."
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
              description="Defina os objetivos específicos do podcast: autoridade, relacionamento, educação da audiência, geração de demanda, retenção, assinantes ou reproduções."
              listKey="objectives"
              placeholder="Ex: Fortalecer autoridade, aprofundar temas, criar relacionamento, gerar confiança..."
              buttonLabel="Novo objetivo"
            />

            <TextListSection
              title="Estruturas de linguagem e edição de áudio"
              description="Descreva a estrutura de linguagem adequada para que o conteúdo do podcast cumpra seu papel na estratégia. Defina abertura, trilha, blocos, encerramento e edição."
              listKey="languageStructures"
              placeholder="Ex: Abertura com tema do episódio, introdução curta, conversa guiada, blocos temáticos, resumo final e chamada para ação."
              buttonLabel="Nova estrutura de linguagem"
            />

            <SectionCard
              title="Formato do podcast"
              description="Defina como o podcast será estruturado em termos de formato, duração, quadros, convidados e estilo de condução."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Formato principal
                  </label>

                  <textarea
                    rows={6}
                    value={data.mainFormat}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        mainFormat: event.target.value,
                      }))
                    }
                    placeholder="Ex: Entrevistas, episódios solo, mesa redonda, comentários, estudos de caso, aulas ou conversas guiadas."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Duração e ritmo
                  </label>

                  <textarea
                    rows={6}
                    value={data.durationAndRhythm}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        durationAndRhythm: event.target.value,
                      }))
                    }
                    placeholder="Ex: Episódios de 20 a 40 minutos, cortes para redes sociais, ritmo leve, educativo ou conversacional."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Quadros ou séries
                  </label>

                  <textarea
                    rows={6}
                    value={data.seriesOrSegments}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        seriesOrSegments: event.target.value,
                      }))
                    }
                    placeholder="Ex: Perguntas da audiência, histórias de clientes, bastidores, entrevistas, tendências, erros comuns..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Convidados ou participantes
                  </label>

                  <textarea
                    rows={6}
                    value={data.guestsAndParticipants}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        guestsAndParticipants: event.target.value,
                      }))
                    }
                    placeholder="Liste tipos de convidados, parceiros, especialistas, clientes ou pessoas que podem participar dos episódios."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Identidade visual"
              description="Defina o layout do podcast, tanto na capa geral quanto na capa de cada episódio. Registre também referências de thumbnails, capas e elementos visuais."
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
                  placeholder="Explique a direção visual do podcast: capa, thumbnail dos episódios, fotos, cores, títulos, elementos gráficos e referências."
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
                        onChange={(event) =>
                          updateVisualReferenceImage(index, event)
                        }
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
              title="Conteúdos"
              description="Defina os assuntos, temas e datas dos episódios do podcast. Este campo pode funcionar como calendário editorial dos episódios."
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
                          Tema do episódio
                        </label>

                        <input
                          type="text"
                          value={content.title}
                          onChange={(event) =>
                            updateContent(index, "title", event.target.value)
                          }
                          placeholder="Ex: Como construir autoridade no digital"
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
                            updateContent(
                              index,
                              "suggestedDate",
                              event.target.value
                            )
                          }
                          placeholder="Ex: 15/06/2026"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Convidado ou responsável
                        </label>

                        <input
                          type="text"
                          value={content.guestOrResponsible}
                          onChange={(event) =>
                            updateContent(
                              index,
                              "guestOrResponsible",
                              event.target.value
                            )
                          }
                          placeholder="Ex: Especialista, cliente, parceiro ou episódio solo"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Formato
                        </label>

                        <input
                          type="text"
                          value={content.format}
                          onChange={(event) =>
                            updateContent(index, "format", event.target.value)
                          }
                          placeholder="Ex: Entrevista, solo, aula, conversa, análise..."
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
                          updateContent(
                            index,
                            "observation",
                            event.target.value
                          )
                        }
                        placeholder="Registre objetivo do episódio, pontos principais, chamada final, links citados e observações de produção."
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
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Novo conteúdo
              </button>
            </SectionCard>

            <SectionCard
              title="Distribuição do podcast"
              description="Registre como o podcast será distribuído e reaproveitado em outros canais."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Plataformas de publicação
                  </label>

                  <textarea
                    rows={6}
                    value={data.publishingPlatforms}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        publishingPlatforms: event.target.value,
                      }))
                    }
                    placeholder="Ex: Spotify, YouTube, Apple Podcasts, Deezer, site, blog ou agregadores."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Reaproveitamento de conteúdo
                  </label>

                  <textarea
                    rows={6}
                    value={data.repurposingStrategy}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        repurposingStrategy: event.target.value,
                      }))
                    }
                    placeholder="Ex: Cortes para Instagram, TikTok, YouTube Shorts, carrosséis, newsletter, blog e WhatsApp."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia do podcast."
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
                        placeholder="Ex: Podcast, episódio, capa, roteiro, referência sonora ou visual"
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

            <div className="sticky bottom-0 -mx-6 border-t border-slate-200 bg-slate-100/90 px-6 py-5 backdrop-blur lg:-mx-10 lg:px-10">
              <div className="mx-auto flex max-w-6xl flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <a
                  href="/admin"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Voltar para planejamentos
                </a>

                <a
                  href="/apresentacao/demo"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Ver apresentação
                </a>

                <button
                  type="button"
                  onClick={saveData}
                  className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Salvar módulo
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}