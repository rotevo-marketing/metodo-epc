"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type CompetitorAnalysisItem = {
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

export type CompetitorResearchData = {
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

export const initialCompetitorResearchData: CompetitorResearchData = {
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

type PesquisaConcorrenciaFormProps = {
  data: CompetitorResearchData;
  setData: Dispatch<SetStateAction<CompetitorResearchData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function PesquisaConcorrenciaForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: PesquisaConcorrenciaFormProps) {
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
    <div className="mt-6 space-y-6">
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
                          updateCompetitor(index, "name", event.target.value)
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
                          updateCompetitor(index, "website", event.target.value)
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

                        <RichTextEditor
                          value={competitor[field.key]}
                          onChange={(value) =>
                            updateCompetitor(index, field.key, value)
                          }
                          placeholder={field.placeholder}
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