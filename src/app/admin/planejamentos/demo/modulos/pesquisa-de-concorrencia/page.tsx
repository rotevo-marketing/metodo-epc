"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-pesquisa-de-concorrencia";

type CompetitorAnalysisItem = {
  image: string;
  name: string;
  website: string;
  positioning: string;
  targetAudience: string;
  productAndDelivery: string;
  channelsAndVisibility: string;
  contentAndCommunication: string;
  funnelAndConversion: string;
  strengths: string;
  opportunities: string;
};

type CompetitorResearchData = {
  competitors: CompetitorAnalysisItem[];
};

const initialCompetitor: CompetitorAnalysisItem = {
  image: "",
  name: "",
  website: "",
  positioning: "",
  targetAudience: "",
  productAndDelivery: "",
  channelsAndVisibility: "",
  contentAndCommunication: "",
  funnelAndConversion: "",
  strengths: "",
  opportunities: "",
};

const initialData: CompetitorResearchData = {
  competitors: [initialCompetitor],
};

const analysisFields = [
  {
    key: "positioning",
    title: "Posicionamento e proposta de valor",
    placeholder:
      "Descreva como esse concorrente se posiciona, qual promessa comunica, quais diferenciais apresenta e qual percepção tenta ocupar no mercado.",
  },
  {
    key: "targetAudience",
    title: "Público-alvo",
    placeholder:
      "Explique para quem esse concorrente fala, quais perfis atende, dores, desejos, nível de consciência e tipo de cliente que parece atrair.",
  },
  {
    key: "productAndDelivery",
    title: "Produto e modelo de entrega",
    placeholder:
      "Descreva quais produtos, serviços, ofertas, formatos, pacotes, métodos ou modelos de entrega esse concorrente utiliza.",
  },
  {
    key: "channelsAndVisibility",
    title: "Canais e visibilidade",
    placeholder:
      "Analise onde esse concorrente aparece, quais canais utiliza, onde tem mais força e como constrói visibilidade.",
  },
  {
    key: "contentAndCommunication",
    title: "Conteúdo e comunicação",
    placeholder:
      "Analise linguagem, temas, formatos de conteúdo, frequência, abordagem, tom de voz e forma de se comunicar com o público.",
  },
  {
    key: "funnelAndConversion",
    title: "Funil de captação e conversão",
    placeholder:
      "Descreva como esse concorrente capta atenção, gera leads, conduz relacionamento, apresenta ofertas e tenta converter o público.",
  },
  {
    key: "strengths",
    title: "Pontos fortes",
    placeholder:
      "Liste os pontos fortes percebidos, como autoridade, clareza, estética, oferta, conteúdo, presença digital, diferenciais ou maturidade comercial.",
  },
  {
    key: "opportunities",
    title: "Lacunas que o projeto ocupa",
    placeholder:
      "Explique quais espaços esse concorrente deixa em aberto e como o projeto pode ocupar essas lacunas com mais clareza, profundidade ou diferenciação.",
  },
] as const;

function PageSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-80 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block">
      <a href="/admin" className="block">
        <h1 className="text-2xl font-bold">Rotevo</h1>
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
                  const isActive = module.slug === "pesquisa-de-concorrencia";

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
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function PesquisaDeConcorrenciaPage() {
  const [data, setData] = useState<CompetitorResearchData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        competitors:
          Array.isArray(parsed.competitors) && parsed.competitors.length
            ? parsed.competitors.map(
                (competitor: Partial<CompetitorAnalysisItem>) => ({
                  image: competitor.image || "",
                  name: competitor.name || "",
                  website: competitor.website || "",
                  positioning: competitor.positioning || "",
                  targetAudience: competitor.targetAudience || "",
                  productAndDelivery: competitor.productAndDelivery || "",
                  channelsAndVisibility:
                    competitor.channelsAndVisibility || "",
                  contentAndCommunication:
                    competitor.contentAndCommunication || "",
                  funnelAndConversion: competitor.funnelAndConversion || "",
                  strengths: competitor.strengths || "",
                  opportunities: competitor.opportunities || "",
                })
              )
            : initialData.competitors,
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

  function updateCompetitor(
    index: number,
    key: keyof CompetitorAnalysisItem,
    value: string
  ) {
    setData((current) => {
      const nextCompetitors = [...current.competitors];

      nextCompetitors[index] = {
        ...nextCompetitors[index],
        [key]: value,
      };

      return {
        ...current,
        competitors: nextCompetitors,
      };
    });
  }

  function updateCompetitorImage(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateCompetitor(index, "image", String(reader.result || ""));
    };

    reader.readAsDataURL(file);
  }

  function removeCompetitorImage(index: number) {
    updateCompetitor(index, "image", "");
  }

  function addCompetitor() {
    setData((current) => ({
      ...current,
      competitors: [
        ...current.competitors,
        {
          ...initialCompetitor,
        },
      ],
    }));
  }

  function removeCompetitor(index: number) {
    setData((current) => ({
      ...current,
      competitors:
        current.competitors.length > 1
          ? current.competitors.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                ...initialCompetitor,
              },
            ],
    }));
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
                Fundamentos Estratégicos do Projeto
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Análise de Concorrência
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Analise concorrentes diretos e indiretos para entender
                posicionamento, proposta de valor, canais, comunicação,
                conversão, pontos fortes e lacunas que o projeto pode ocupar.
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
              title="Concorrentes analisados"
              description="Cadastre cada concorrente com imagem, nome, site e análise estratégica completa."
            >
              <div className="space-y-6">
                {data.competitors.map((competitor, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Concorrente {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-2 text-xl font-semibold text-slate-950">
                          {competitor.name || "Novo concorrente analisado"}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCompetitor(index)}
                        className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
                      <div>
                        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
                          {competitor.image ? (
                            <img
                              src={competitor.image}
                              alt="Imagem do concorrente"
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
                              onChange={(event) =>
                                updateCompetitorImage(index, event)
                              }
                              className="hidden"
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => removeCompetitorImage(index)}
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
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-600">
                              Nome do concorrente
                            </label>

                            <input
                              type="text"
                              value={competitor.name}
                              onChange={(event) =>
                                updateCompetitor(
                                  index,
                                  "name",
                                  event.target.value
                                )
                              }
                              placeholder="Ex: Nome da empresa, profissional, marca ou projeto"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-600">
                              Site ou link principal
                            </label>

                            <input
                              type="url"
                              value={competitor.website}
                              onChange={(event) =>
                                updateCompetitor(
                                  index,
                                  "website",
                                  event.target.value
                                )
                              }
                              placeholder="https://..."
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4">
                          {analysisFields.map((field) => (
                            <div
                              key={field.key}
                              className="rounded-2xl border border-slate-200 bg-white p-5"
                            >
                              <label className="mb-2 block text-sm font-semibold text-slate-700">
                                {field.title}
                              </label>

                              <textarea
                                rows={5}
                                value={competitor[field.key]}
                                onChange={(event) =>
                                  updateCompetitor(
                                    index,
                                    field.key,
                                    event.target.value
                                  )
                                }
                                placeholder={field.placeholder}
                                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addCompetitor}
                className="mt-6 cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                + Novo concorrente analisado
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