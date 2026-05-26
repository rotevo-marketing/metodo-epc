"use client";

import { useEffect, useState, type ReactNode } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-linha-do-tempo";

type TimelineSprint = {
  title: string;
  startDate: string;
  endDate: string;
  period: string;
  deliverables: string;
};

type TimelineEvent = {
  title: string;
  description: string;
  date: string;
  phase: string;
  priority: string;
  status: string;
  responsible: string;
  dependency: string;
  sprints: TimelineSprint[];
};

type ExternalReference = {
  title: string;
  link: string;
};

type TimelineData = {
  events: TimelineEvent[];
  macroVision: string;
  firstMilestone: string;
  secondMilestone: string;
  thirdMilestone: string;
  risks: string;
  references: ExternalReference[];
};

const phases = [
  "Diagnóstico",
  "Planejamento",
  "Produção",
  "Implementação",
  "Validação",
  "Acompanhamento",
  "Otimização",
];

const priorities = ["Alta", "Média", "Baixa"];

const statuses = [
  "Não iniciado",
  "Em andamento",
  "Em validação",
  "Concluído",
  "Atrasado",
];

const emptySprint: TimelineSprint = {
  title: "",
  startDate: "",
  endDate: "",
  period: "",
  deliverables: "",
};

const emptyEvent: TimelineEvent = {
  title: "",
  description: "",
  date: "",
  phase: "Diagnóstico",
  priority: "Alta",
  status: "Não iniciado",
  responsible: "",
  dependency: "",
  sprints: [{ ...emptySprint }],
};

const initialData: TimelineData = {
  events: [
    {
      title: "",
      description: "",
      date: "",
      phase: "Implementação",
      priority: "Alta",
      status: "Não iniciado",
      responsible: "",
      dependency: "",
      sprints: [
        {
          title: "Sprint 1",
          startDate: "",
          endDate: "",
          period: "",
          deliverables: "",
        },
        {
          title: "Sprint 2",
          startDate: "",
          endDate: "",
          period: "",
          deliverables: "",
        },
      ],
    },
  ],
  macroVision: "",
  firstMilestone: "",
  secondMilestone: "",
  thirdMilestone: "",
  risks: "",
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
                  const isActive = module.slug === "linha-do-tempo";

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
  children: ReactNode;
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

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-600">
      {children}
    </label>
  );
}

function InputField({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    />
  );
}

function TextAreaField({
  value,
  onChange,
  placeholder,
  rows = 6,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    />
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function LinhaDoTempoPage() {
  const [data, setData] = useState<TimelineData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        events:
          Array.isArray(parsed.events) && parsed.events.length
            ? parsed.events.map((event: Partial<TimelineEvent>) => ({
                title: event.title || "",
                description: event.description || "",
                date: event.date || "",
                phase: event.phase || "Diagnóstico",
                priority: event.priority || "Alta",
                status: event.status || "Não iniciado",
                responsible: event.responsible || "",
                dependency: event.dependency || "",
                sprints:
                  Array.isArray(event.sprints) && event.sprints.length
                    ? event.sprints.map((sprint: Partial<TimelineSprint>) => ({
                        title: sprint.title || "",
                        startDate: sprint.startDate || "",
                        endDate: sprint.endDate || "",
                        period: sprint.period || "",
                        deliverables: sprint.deliverables || "",
                      }))
                    : [{ ...emptySprint }],
              }))
            : initialData.events,
        macroVision: parsed.macroVision || "",
        firstMilestone: parsed.firstMilestone || "",
        secondMilestone: parsed.secondMilestone || "",
        thirdMilestone: parsed.thirdMilestone || "",
        risks: parsed.risks || "",
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

  function updateEvent(
    eventIndex: number,
    key: keyof TimelineEvent,
    value: string
  ) {
    setData((current) => {
      const nextEvents = [...current.events];

      nextEvents[eventIndex] = {
        ...nextEvents[eventIndex],
        [key]: value,
      };

      return {
        ...current,
        events: nextEvents,
      };
    });
  }

  function addEvent() {
    setData((current) => ({
      ...current,
      events: [...current.events, { ...emptyEvent, sprints: [{ ...emptySprint }] }],
    }));
  }

  function removeEvent(eventIndex: number) {
    setData((current) => ({
      ...current,
      events:
        current.events.length > 1
          ? current.events.filter((_, index) => index !== eventIndex)
          : [{ ...emptyEvent, sprints: [{ ...emptySprint }] }],
    }));
  }

  function updateSprint(
    eventIndex: number,
    sprintIndex: number,
    key: keyof TimelineSprint,
    value: string
  ) {
    setData((current) => {
      const nextEvents = [...current.events];
      const nextSprints = [...nextEvents[eventIndex].sprints];

      nextSprints[sprintIndex] = {
        ...nextSprints[sprintIndex],
        [key]: value,
      };

      nextEvents[eventIndex] = {
        ...nextEvents[eventIndex],
        sprints: nextSprints,
      };

      return {
        ...current,
        events: nextEvents,
      };
    });
  }

  function addSprint(eventIndex: number) {
    setData((current) => {
      const nextEvents = [...current.events];

      nextEvents[eventIndex] = {
        ...nextEvents[eventIndex],
        sprints: [
          ...nextEvents[eventIndex].sprints,
          {
            ...emptySprint,
            title: `Sprint ${nextEvents[eventIndex].sprints.length + 1}`,
          },
        ],
      };

      return {
        ...current,
        events: nextEvents,
      };
    });
  }

  function removeSprint(eventIndex: number, sprintIndex: number) {
    setData((current) => {
      const nextEvents = [...current.events];
      const currentSprints = nextEvents[eventIndex].sprints;

      nextEvents[eventIndex] = {
        ...nextEvents[eventIndex],
        sprints:
          currentSprints.length > 1
            ? currentSprints.filter((_, index) => index !== sprintIndex)
            : [{ ...emptySprint }],
      };

      return {
        ...current,
        events: nextEvents,
      };
    });
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
          ? current.references.filter((_, referenceIndex) => referenceIndex !== index)
          : [{ title: "", link: "" }],
    }));
  }

  if (!isMounted) {
    return null;
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
                Execução, Acompanhamento e Gestão
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Linha do Tempo
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Organize as implementações do projeto, fases, responsáveis,
                prazos, dependências, status e sprints com data de início e data final.
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
              title="Implementações da linha do tempo"
              description="Cada implementação representa uma entrega importante do projeto. Dentro dela, cadastre os sprints com data de início, data final e entregas."
            >
              <div className="space-y-6">
                {data.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Implementação {String(eventIndex + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-slate-950">
                          Configuração da implementação
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeEvent(eventIndex)}
                        className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                      >
                        Excluir implementação
                      </button>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
                      <div>
                        <FieldLabel>Título da implementação</FieldLabel>
                        <InputField
                          value={event.title}
                          onChange={(value) =>
                            updateEvent(eventIndex, "title", value)
                          }
                          placeholder="Ex: Estruturar canais digitais, desenvolver landing page, configurar automação..."
                        />
                      </div>

                      <div>
                        <FieldLabel>Data marco</FieldLabel>
                        <InputField
                          type="date"
                          value={event.date}
                          onChange={(value) =>
                            updateEvent(eventIndex, "date", value)
                          }
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <FieldLabel>Descrição da implementação</FieldLabel>
                      <TextAreaField
                        value={event.description}
                        onChange={(value) =>
                          updateEvent(eventIndex, "description", value)
                        }
                        placeholder="Explique o que será implementado, por que essa etapa é importante e qual resultado ela deve gerar."
                        rows={5}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-4">
                      <div>
                        <FieldLabel>Fase do projeto</FieldLabel>
                        <SelectField
                          value={event.phase}
                          onChange={(value) =>
                            updateEvent(eventIndex, "phase", value)
                          }
                          options={phases}
                        />
                      </div>

                      <div>
                        <FieldLabel>Prioridade</FieldLabel>
                        <SelectField
                          value={event.priority}
                          onChange={(value) =>
                            updateEvent(eventIndex, "priority", value)
                          }
                          options={priorities}
                        />
                      </div>

                      <div>
                        <FieldLabel>Status</FieldLabel>
                        <SelectField
                          value={event.status}
                          onChange={(value) =>
                            updateEvent(eventIndex, "status", value)
                          }
                          options={statuses}
                        />
                      </div>

                      <div>
                        <FieldLabel>Responsável</FieldLabel>
                        <InputField
                          value={event.responsible}
                          onChange={(value) =>
                            updateEvent(eventIndex, "responsible", value)
                          }
                          placeholder="Ex: Estrategista, designer, gestor de tráfego..."
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <FieldLabel>Dependência</FieldLabel>
                      <InputField
                        value={event.dependency}
                        onChange={(value) =>
                          updateEvent(eventIndex, "dependency", value)
                        }
                        placeholder="Ex: Depende da aprovação da identidade visual, envio de fotos, validação do cliente..."
                      />
                    </div>

                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h4 className="text-base font-semibold text-slate-950">
                            Sprints da implementação
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            Cadastre cada sprint com data de início, data final,
                            período e entregas.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => addSprint(eventIndex)}
                          className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white"
                        >
                          + Novo sprint
                        </button>
                      </div>

                      <div className="mt-5 space-y-4">
                        {event.sprints.map((sprint, sprintIndex) => (
                          <div
                            key={sprintIndex}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="grid gap-4 md:grid-cols-[1fr_180px_180px_1fr_auto]">
                              <div>
                                <FieldLabel>Título do sprint</FieldLabel>
                                <InputField
                                  value={sprint.title}
                                  onChange={(value) =>
                                    updateSprint(
                                      eventIndex,
                                      sprintIndex,
                                      "title",
                                      value
                                    )
                                  }
                                  placeholder="Ex: Sprint 1"
                                />
                              </div>

                              <div>
                                <FieldLabel>Data de início</FieldLabel>
                                <InputField
                                  type="date"
                                  value={sprint.startDate}
                                  onChange={(value) =>
                                    updateSprint(
                                      eventIndex,
                                      sprintIndex,
                                      "startDate",
                                      value
                                    )
                                  }
                                  placeholder=""
                                />
                              </div>

                              <div>
                                <FieldLabel>Data final</FieldLabel>
                                <InputField
                                  type="date"
                                  value={sprint.endDate}
                                  onChange={(value) =>
                                    updateSprint(
                                      eventIndex,
                                      sprintIndex,
                                      "endDate",
                                      value
                                    )
                                  }
                                  placeholder=""
                                />
                              </div>

                              <div>
                                <FieldLabel>Período</FieldLabel>
                                <InputField
                                  value={sprint.period}
                                  onChange={(value) =>
                                    updateSprint(
                                      eventIndex,
                                      sprintIndex,
                                      "period",
                                      value
                                    )
                                  }
                                  placeholder="Ex: Semana 1, Semana 2, 01 a 07 de junho..."
                                />
                              </div>

                              <div className="flex items-end">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeSprint(eventIndex, sprintIndex)
                                  }
                                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                                >
                                  Excluir
                                </button>
                              </div>
                            </div>

                            <div className="mt-4">
                              <FieldLabel>Entregas do sprint</FieldLabel>
                              <TextAreaField
                                value={sprint.deliverables}
                                onChange={(value) =>
                                  updateSprint(
                                    eventIndex,
                                    sprintIndex,
                                    "deliverables",
                                    value
                                  )
                                }
                                placeholder="Liste as entregas deste sprint. Ex: implementar bio, configurar link, organizar destaques, revisar textos, validar página..."
                                rows={6}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addEvent}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white"
              >
                + Nova implementação
              </button>
            </SectionCard>

            <SectionCard
              title="Visão macro da implementação"
              description="Use este campo para explicar a lógica geral de execução, prioridades, ordem das entregas e cuidados importantes."
            >
              <TextAreaField
                value={data.macroVision}
                onChange={(value) =>
                  setData((current) => ({ ...current, macroVision: value }))
                }
                placeholder="Ex: Primeiro concluir diagnóstico e essência do projeto, depois aprovar identidade visual, em seguida produzir conteúdo base, configurar campanhas e acompanhar métricas semanalmente."
                rows={7}
              />
            </SectionCard>

            <SectionCard
              title="Marcos principais"
              description="Registre os momentos mais importantes do projeto."
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <FieldLabel>Primeiro marco</FieldLabel>
                  <InputField
                    value={data.firstMilestone}
                    onChange={(value) =>
                      setData((current) => ({
                        ...current,
                        firstMilestone: value,
                      }))
                    }
                    placeholder="Ex: Planejamento aprovado"
                  />
                </div>

                <div>
                  <FieldLabel>Segundo marco</FieldLabel>
                  <InputField
                    value={data.secondMilestone}
                    onChange={(value) =>
                      setData((current) => ({
                        ...current,
                        secondMilestone: value,
                      }))
                    }
                    placeholder="Ex: Primeiros conteúdos publicados"
                  />
                </div>

                <div>
                  <FieldLabel>Terceiro marco</FieldLabel>
                  <InputField
                    value={data.thirdMilestone}
                    onChange={(value) =>
                      setData((current) => ({
                        ...current,
                        thirdMilestone: value,
                      }))
                    }
                    placeholder="Ex: Campanha no ar"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Riscos e pontos de atenção"
              description="Liste situações que podem atrasar ou impactar a execução do planejamento."
            >
              <TextAreaField
                value={data.risks}
                onChange={(value) =>
                  setData((current) => ({ ...current, risks: value }))
                }
                placeholder="Ex: Atraso no envio de materiais, falta de aprovação, dependência de terceiros, ausência de fotos, mudanças de escopo, demora na configuração de ferramentas ou falta de verba."
                rows={7}
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a linha do tempo."
            >
              <div className="space-y-4">
                {data.references.map((reference, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <FieldLabel>Título da referência</FieldLabel>
                      <InputField
                        value={reference.title}
                        onChange={(value) =>
                          updateReference(index, "title", value)
                        }
                        placeholder="Ex: Cronograma, planilha, briefing, calendário ou documento do projeto"
                      />
                    </div>

                    <div>
                      <FieldLabel>Link</FieldLabel>
                      <InputField
                        type="url"
                        value={reference.link}
                        onChange={(value) =>
                          updateReference(index, "link", value)
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeReference(index)}
                        className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
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
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white"
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