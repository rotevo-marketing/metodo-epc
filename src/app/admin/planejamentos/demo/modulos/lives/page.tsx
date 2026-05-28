"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-lives";

type FrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type NetworkFrequencyItem = {
  channel: string;
  frequency: string;
};

type TextListItem = {
  value: string;
};

type VisualReference = {
  image: string;
};

type LiveContentItem = {
  title: string;
  suggestedDate: string;
  channel: string;
  objective: string;
  observation: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type LivesData = {
  frequencyItems: FrequencyItem[];
  networkFrequencies: NetworkFrequencyItem[];
  objectives: TextListItem[];
  languageStructures: TextListItem[];
  openingScript: string;
  centralContent: string;
  publicInteraction: string;
  closingAndCall: string;
  visualStrategy: string;
  visualReferences: VisualReference[];
  contents: LiveContentItem[];
  beforeAndAfterPromotion: string;
  repurposingStrategy: string;
  references: ExternalReference[];
};

const initialFrequencyItems: FrequencyItem[] = [
  {
    format: "Live principal",
    quantity: "",
    period: "por semana",
    observation: "",
  },
  {
    format: "Live de lançamento",
    quantity: "",
    period: "por mês",
    observation: "",
  },
  {
    format: "Live de relacionamento",
    quantity: "",
    period: "por mês",
    observation: "",
  },
  {
    format: "Aula ao vivo",
    quantity: "",
    period: "por mês",
    observation: "",
  },
];

const initialData: LivesData = {
  frequencyItems: initialFrequencyItems,
  networkFrequencies: [{ channel: "", frequency: "" }],
  objectives: [{ value: "" }],
  languageStructures: [{ value: "" }],
  openingScript: "",
  centralContent: "",
  publicInteraction: "",
  closingAndCall: "",
  visualStrategy: "",
  visualReferences: [{ image: "" }, { image: "" }, { image: "" }],
  contents: [
    {
      title: "",
      suggestedDate: "",
      channel: "",
      objective: "",
      observation: "",
    },
  ],
  beforeAndAfterPromotion: "",
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
                  const isActive = module.slug === "lives";

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

export default function LivesPage() {
  const [data, setData] = useState<LivesData>(initialData);
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
        networkFrequencies:
          Array.isArray(parsed.networkFrequencies) &&
          parsed.networkFrequencies.length
            ? parsed.networkFrequencies.map(
                (item: Partial<NetworkFrequencyItem>) => ({
                  channel: item.channel || "",
                  frequency: item.frequency || "",
                })
              )
            : [{ channel: "", frequency: "" }],
        objectives: normalizeTextList(parsed.objectives),
        languageStructures: normalizeTextList(parsed.languageStructures),
        openingScript: parsed.openingScript || "",
        centralContent: parsed.centralContent || "",
        publicInteraction: parsed.publicInteraction || "",
        closingAndCall: parsed.closingAndCall || "",
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
            ? parsed.contents.map((content: Partial<LiveContentItem>) => ({
                title: content.title || "",
                suggestedDate: content.suggestedDate || "",
                channel: content.channel || "",
                objective: content.objective || "",
                observation: content.observation || "",
              }))
            : [
                {
                  title: "",
                  suggestedDate: "",
                  channel: "",
                  objective: "",
                  observation: "",
                },
              ],
        beforeAndAfterPromotion: parsed.beforeAndAfterPromotion || "",
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

  function updateNetworkFrequency(
    index: number,
    key: keyof NetworkFrequencyItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.networkFrequencies];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        networkFrequencies: nextItems,
      };
    });
  }

  function addNetworkFrequency() {
    setData((current) => ({
      ...current,
      networkFrequencies: [
        ...current.networkFrequencies,
        {
          channel: "",
          frequency: "",
        },
      ],
    }));
  }

  function removeNetworkFrequency(index: number) {
    setData((current) => ({
      ...current,
      networkFrequencies:
        current.networkFrequencies.length > 1
          ? current.networkFrequencies.filter(
              (_, itemIndex) => itemIndex !== index
            )
          : [{ channel: "", frequency: "" }],
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
    key: keyof LiveContentItem,
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
          channel: "",
          objective: "",
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
                channel: "",
                objective: "",
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
                Lives
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Descreva as características que as lives devem ter, em quais
                redes serão realizadas, qual será a frequência, quais objetivos
                cumprem e como serão conduzidas dentro da estratégia.
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
              description="Defina a frequência por tipo de live. Use quantidade e período para deixar a orientação mais clara."
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
                        placeholder="Ex: Live principal"
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
                        <option value="por lançamento">por lançamento</option>
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
                        placeholder="Ex: Usar para aquecimento, relacionamento ou venda."
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

            <SectionCard
              title="Frequência por rede"
              description="Defina em quais canais as lives serão realizadas e qual será a frequência específica em cada rede."
            >
              <div className="space-y-4">
                {data.networkFrequencies.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Canal
                      </label>

                      <input
                        type="text"
                        value={item.channel}
                        onChange={(event) =>
                          updateNetworkFrequency(
                            index,
                            "channel",
                            event.target.value
                          )
                        }
                        placeholder="Ex: Instagram, YouTube, TikTok, LinkedIn..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Frequência
                      </label>

                      <input
                        type="text"
                        value={item.frequency}
                        onChange={(event) =>
                          updateNetworkFrequency(
                            index,
                            "frequency",
                            event.target.value
                          )
                        }
                        placeholder="Ex: Semanal, quinzenal, mensal, toda terça..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeNetworkFrequency(index)}
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
                onClick={addNetworkFrequency}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Nova frequência por rede
              </button>
            </SectionCard>

            <TextListSection
              title="Objetivos"
              description="Defina os objetivos específicos das lives: autoridade, relacionamento, vendas, lançamento, comunidade, educação, engajamento ou nutrição da audiência."
              listKey="objectives"
              placeholder="Ex: Gerar autoridade, vender uma oferta, tirar dúvidas, aquecer audiência, lançar produto..."
              buttonLabel="Novo objetivo"
            />

            <TextListSection
              title="Estruturas de linguagem"
              description="Descreva a estrutura de linguagem adequada para conduzir as lives de forma clara, estratégica e envolvente."
              listKey="languageStructures"
              placeholder="Ex: Abertura com promessa, apresentação do tema, interação com público, conteúdo central, oferta ou chamada final."
              buttonLabel="Nova estrutura de linguagem"
            />

            <SectionCard
              title="Roteiro e condução da live"
              description="Organize como a live deve ser conduzida, quais blocos ela deve ter e como o público será direcionado para a próxima ação."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Abertura
                  </label>

                  <textarea
                    rows={6}
                    value={data.openingScript}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        openingScript: event.target.value,
                      }))
                    }
                    placeholder="Explique como iniciar a live, apresentar o tema, gerar interesse e orientar quem está chegando."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdo central
                  </label>

                  <textarea
                    rows={6}
                    value={data.centralContent}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        centralContent: event.target.value,
                      }))
                    }
                    placeholder="Descreva como o conteúdo principal será estruturado, dividido e entregue durante a live."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Interação com o público
                  </label>

                  <textarea
                    rows={6}
                    value={data.publicInteraction}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        publicInteraction: event.target.value,
                      }))
                    }
                    placeholder="Defina perguntas, enquetes, momentos de interação, leitura de comentários e participação da audiência."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Encerramento e chamada final
                  </label>

                  <textarea
                    rows={6}
                    value={data.closingAndCall}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        closingAndCall: event.target.value,
                      }))
                    }
                    placeholder="Explique como finalizar, recapitular, apresentar oferta, direcionar para link, WhatsApp, página ou próximo conteúdo."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Identidade visual"
              description="Defina o estilo visual das lives. Você pode carregar imagens de referência para exemplificar capas, chamadas, cenários, thumbnails e elementos visuais."
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
                  placeholder="Explique a direção visual das lives: capa, thumbnail, cenário, enquadramento, luz, identidade, chamadas e elementos gráficos."
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
              description="Defina os assuntos e datas em que as lives serão realizadas. Este campo pode funcionar como calendário de lives."
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
                          Tema da live
                        </label>

                        <input
                          type="text"
                          value={content.title}
                          onChange={(event) =>
                            updateContent(index, "title", event.target.value)
                          }
                          placeholder="Ex: Como organizar uma estratégia de conteúdo"
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
                          Canal
                        </label>

                        <input
                          type="text"
                          value={content.channel}
                          onChange={(event) =>
                            updateContent(index, "channel", event.target.value)
                          }
                          placeholder="Ex: Instagram, YouTube, TikTok, LinkedIn..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                          Objetivo da live
                        </label>

                        <input
                          type="text"
                          value={content.objective}
                          onChange={(event) =>
                            updateContent(
                              index,
                              "objective",
                              event.target.value
                            )
                          }
                          placeholder="Ex: Aquecer audiência, vender, educar, tirar dúvidas..."
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
                        placeholder="Registre pauta, roteiro resumido, chamada final, oferta relacionada, links e observações de produção."
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
              title="Distribuição e reaproveitamento"
              description="Registre como as lives serão divulgadas antes, durante e depois, além de como o conteúdo será reaproveitado em outros canais."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Divulgação antes da live
                  </label>

                  <textarea
                    rows={6}
                    value={data.beforeAndAfterPromotion}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        beforeAndAfterPromotion: event.target.value,
                      }))
                    }
                    placeholder="Ex: Stories, post no feed, lista de transmissão, e-mail, anúncio, contagem regressiva ou convite no WhatsApp."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Reaproveitamento depois da live
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
                    placeholder="Ex: Cortes para Reels, TikTok, Shorts, carrossel, blog, e-mail, WhatsApp ou materiais educacionais."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a estratégia de lives."
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
                        placeholder="Ex: Live, roteiro, referência visual, transmissão ou material de apoio"
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