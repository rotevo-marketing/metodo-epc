"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type SimpleItem = {
  title: string;
  description: string;
};

export type PhaseItem = {
  title: string;
  period: string;
  description: string;
};

export type ProjectObjectivesData = {
  mainObjective: SimpleItem;
  secondaryObjectives: SimpleItem[];
  priorities: SimpleItem[];
  successIndicators: SimpleItem[];
  expectedResults: SimpleItem[];
  phases: PhaseItem[];
  strategicObservation: string;
};

export const initialProjectObjectivesData: ProjectObjectivesData = {
  mainObjective: {
    title: "",
    description: "",
  },
  secondaryObjectives: [
    {
      title: "",
      description: "",
    },
  ],
  priorities: [
    {
      title: "",
      description: "",
    },
  ],
  successIndicators: [
    {
      title: "",
      description: "",
    },
  ],
  expectedResults: [
    {
      title: "",
      description: "",
    },
  ],
  phases: [
    {
      title: "",
      period: "",
      description: "",
    },
  ],
  strategicObservation: "",
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

function SimpleItemEditor({
  label,
  item,
  index,
  titlePlaceholder,
  descriptionPlaceholder,
  onChange,
  onRemove,
  canRemove = true,
}: {
  label: string;
  item: SimpleItem;
  index: number;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  onChange: (index: number, key: keyof SimpleItem, value: string) => void;
  onRemove: (index: number) => void;
  canRemove?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {label} {String(index + 1).padStart(2, "0")}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-slate-950">
            {item.title || "Novo item"}
          </h3>
        </div>

        {canRemove ? (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            Excluir
          </button>
        ) : null}
      </div>

      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Título
          </label>

          <input
            type="text"
            value={item.title}
            onChange={(event) =>
              onChange(index, "title", event.target.value)
            }
            placeholder={titlePlaceholder}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Descrição
          </label>

          <textarea
            rows={5}
            value={item.description}
            onChange={(event) =>
              onChange(index, "description", event.target.value)
            }
            placeholder={descriptionPlaceholder}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>
      </div>
    </div>
  );
}

type ObjetivosProjetoFormProps = {
  data: ProjectObjectivesData;
  setData: Dispatch<SetStateAction<ProjectObjectivesData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function ObjetivosProjetoForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: ObjetivosProjetoFormProps) {
  function updateMainObjective(
    index: number,
    key: keyof SimpleItem,
    value: string
  ) {
    setData((current) => ({
      ...current,
      mainObjective: {
        ...current.mainObjective,
        [key]: value,
      },
    }));
  }

  function updateSimpleList(
    listKey:
      | "secondaryObjectives"
      | "priorities"
      | "successIndicators"
      | "expectedResults",
    index: number,
    key: keyof SimpleItem,
    value: string
  ) {
    setData((current) => {
      const nextList = [...current[listKey]];

      nextList[index] = {
        ...nextList[index],
        [key]: value,
      };

      return {
        ...current,
        [listKey]: nextList,
      };
    });
  }

  function addSimpleListItem(
    listKey:
      | "secondaryObjectives"
      | "priorities"
      | "successIndicators"
      | "expectedResults"
  ) {
    setData((current) => ({
      ...current,
      [listKey]: [
        ...current[listKey],
        {
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeSimpleListItem(
    listKey:
      | "secondaryObjectives"
      | "priorities"
      | "successIndicators"
      | "expectedResults",
    index: number
  ) {
    setData((current) => ({
      ...current,
      [listKey]:
        current[listKey].length > 1
          ? current[listKey].filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                title: "",
                description: "",
              },
            ],
    }));
  }

  function updatePhase(index: number, key: keyof PhaseItem, value: string) {
    setData((current) => {
      const nextPhases = [...current.phases];

      nextPhases[index] = {
        ...nextPhases[index],
        [key]: value,
      };

      return {
        ...current,
        phases: nextPhases,
      };
    });
  }

  function addPhase() {
    setData((current) => ({
      ...current,
      phases: [
        ...current.phases,
        {
          title: "",
          period: "",
          description: "",
        },
      ],
    }));
  }

  function removePhase(index: number) {
    setData((current) => ({
      ...current,
      phases:
        current.phases.length > 1
          ? current.phases.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                title: "",
                period: "",
                description: "",
              },
            ],
    }));
  }

  return (
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Objetivo principal"
        description="Defina o objetivo central que deve orientar todo o planejamento."
      >
        <SimpleItemEditor
          label="Objetivo principal"
          item={data.mainObjective}
          index={0}
          titlePlaceholder="Ex: Aumentar autoridade, gerar demanda, organizar canais, captar leads..."
          descriptionPlaceholder="Explique o objetivo principal, por que ele é importante e como ele deve orientar o planejamento."
          onChange={updateMainObjective}
          onRemove={() => undefined}
          canRemove={false}
        />
      </SectionCard>

      <SectionCard
        title="Objetivos secundários"
        description="Liste objetivos complementares que ajudam a sustentar o objetivo principal."
      >
        <div className="space-y-5">
          {data.secondaryObjectives.map((item, index) => (
            <SimpleItemEditor
              key={index}
              label="Objetivo"
              item={item}
              index={index}
              titlePlaceholder="Ex: Melhorar posicionamento, fortalecer presença digital, educar público..."
              descriptionPlaceholder="Explique o objetivo secundário e sua função dentro do planejamento."
              onChange={(itemIndex, key, value) =>
                updateSimpleList("secondaryObjectives", itemIndex, key, value)
              }
              onRemove={(itemIndex) =>
                removeSimpleListItem("secondaryObjectives", itemIndex)
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSimpleListItem("secondaryObjectives")}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo objetivo
        </button>
      </SectionCard>

      <SectionCard
        title="Prioridades estratégicas"
        description="Registre quais prioridades devem conduzir as decisões do projeto."
      >
        <div className="space-y-5">
          {data.priorities.map((item, index) => (
            <SimpleItemEditor
              key={index}
              label="Prioridade"
              item={item}
              index={index}
              titlePlaceholder="Ex: Autoridade, clareza de posicionamento, captação, conversão..."
              descriptionPlaceholder="Explique por que essa prioridade é importante e como ela deve orientar as decisões."
              onChange={(itemIndex, key, value) =>
                updateSimpleList("priorities", itemIndex, key, value)
              }
              onRemove={(itemIndex) =>
                removeSimpleListItem("priorities", itemIndex)
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSimpleListItem("priorities")}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova prioridade
        </button>
      </SectionCard>

      <SectionCard
        title="Indicadores de sucesso"
        description="Defina quais sinais, métricas ou evidências vão mostrar que o projeto está evoluindo na direção certa."
      >
        <div className="space-y-5">
          {data.successIndicators.map((item, index) => (
            <SimpleItemEditor
              key={index}
              label="Indicador"
              item={item}
              index={index}
              titlePlaceholder="Ex: Leads qualificados, alcance, engajamento, reuniões, vendas..."
              descriptionPlaceholder="Explique o que será observado, medido ou acompanhado para avaliar esse indicador."
              onChange={(itemIndex, key, value) =>
                updateSimpleList("successIndicators", itemIndex, key, value)
              }
              onRemove={(itemIndex) =>
                removeSimpleListItem("successIndicators", itemIndex)
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSimpleListItem("successIndicators")}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo indicador
        </button>
      </SectionCard>

      <SectionCard
        title="Resultados esperados"
        description="Liste os principais resultados que o projeto deve gerar ao longo da execução."
      >
        <div className="space-y-5">
          {data.expectedResults.map((item, index) => (
            <SimpleItemEditor
              key={index}
              label="Resultado"
              item={item}
              index={index}
              titlePlaceholder="Ex: Maior clareza de posicionamento, aumento de demanda, crescimento de autoridade..."
              descriptionPlaceholder="Explique o resultado esperado e por que ele representa avanço para o projeto."
              onChange={(itemIndex, key, value) =>
                updateSimpleList("expectedResults", itemIndex, key, value)
              }
              onRemove={(itemIndex) =>
                removeSimpleListItem("expectedResults", itemIndex)
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSimpleListItem("expectedResults")}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo resultado
        </button>
      </SectionCard>

      <SectionCard
        title="Prazos e fases"
        description="Organize a evolução do projeto em fases, períodos ou etapas de implementação."
      >
        <div className="space-y-5">
          {data.phases.map((phase, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Fase {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    {phase.title || "Nova fase"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => removePhase(index)}
                  className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Excluir
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_220px]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Nome da fase
                  </label>

                  <input
                    type="text"
                    value={phase.title}
                    onChange={(event) =>
                      updatePhase(index, "title", event.target.value)
                    }
                    placeholder="Ex: Estruturação, posicionamento, distribuição, otimização..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Prazo ou período
                  </label>

                  <input
                    type="text"
                    value={phase.period}
                    onChange={(event) =>
                      updatePhase(index, "period", event.target.value)
                    }
                    placeholder="Ex: Semana 1, mês 1, 30 dias..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Descrição da fase
                </label>

                <textarea
                  rows={5}
                  value={phase.description}
                  onChange={(event) =>
                    updatePhase(index, "description", event.target.value)
                  }
                  placeholder="Explique o que acontece nesta fase e qual avanço ela deve gerar."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPhase}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Nova fase
        </button>
      </SectionCard>

      <SectionCard
        title="Observação estratégica"
        description="Registre uma orientação final sobre como os objetivos devem ser interpretados e usados durante a execução."
      >
        <textarea
          rows={6}
          value={data.strategicObservation}
          onChange={(event) =>
            setData((current) => ({
              ...current,
              strategicObservation: event.target.value,
            }))
          }
          placeholder="Ex: Os objetivos não devem ser tratados como tarefas isoladas, mas como critérios para tomada de decisão, priorização de conteúdo, construção de campanhas e avaliação de evolução."
          className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />
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