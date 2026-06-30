"use client";

import { useEffect, useState, type ReactNode } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-orientacoes-adicionais";

type PendingItem = {
  title: string;
  description: string;
  responsible: string;
  status: string;
};

type NextStepItem = {
  title: string;
  description: string;
  priority: string;
};

type TeamRecommendation = {
  area: string;
  recommendation: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type AdditionalGuidelinesData = {
  executionGuidelines: string;
  attentionPoints: string;
  pendingItems: PendingItem[];
  nextSteps: NextStepItem[];
  teamRecommendations: TeamRecommendation[];
  finalObservations: string;
  references: ExternalReference[];
};

const pendingStatuses = [
  "Pendente",
  "Em andamento",
  "Aguardando cliente",
  "Aguardando equipe",
  "Concluído",
];

const priorities = ["Alta", "Média", "Baixa"];

const emptyPendingItem: PendingItem = {
  title: "",
  description: "",
  responsible: "",
  status: "Pendente",
};

const emptyNextStep: NextStepItem = {
  title: "",
  description: "",
  priority: "Alta",
};

const emptyTeamRecommendation: TeamRecommendation = {
  area: "",
  recommendation: "",
};

const initialData: AdditionalGuidelinesData = {
  executionGuidelines:
    "Use este campo para registrar orientações gerais que devem ser consideradas durante a execução do planejamento, como cuidados de linguagem, prioridades, alinhamentos, limites de escopo, ritmo de aprovação e pontos importantes para a equipe.",
  attentionPoints:
    "Liste aqui riscos, pontos sensíveis, materiais faltantes, acessos pendentes, aprovações necessárias, dependências externas ou qualquer situação que possa impactar a execução do planejamento.",
  pendingItems: [
    {
      title: "",
      description: "",
      responsible: "",
      status: "Pendente",
    },
  ],
  nextSteps: [
    {
      title: "",
      description: "",
      priority: "Alta",
    },
  ],
  teamRecommendations: [
    {
      area: "Social media",
      recommendation:
        "Manter consistência com o tom de voz, linhas editoriais, frequência definida e direcionamento estratégico aprovado.",
    },
    {
      area: "Design",
      recommendation:
        "Seguir identidade visual, referências aprovadas, padrões de criativos e orientações específicas de cada canal.",
    },
    {
      area: "Tráfego pago",
      recommendation:
        "Validar oferta, público, criativos, orçamento, página de destino e métricas antes de ativar campanhas.",
    },
    {
      area: "Atendimento e comercial",
      recommendation:
        "Manter alinhamento com a promessa da campanha, responder com agilidade e registrar dúvidas ou objeções recorrentes.",
    },
  ],
  finalObservations:
    "O planejamento deve ser usado como guia estratégico. Ajustes podem ser feitos ao longo da execução com base em dados, aprovações, mudanças de prioridade e aprendizados gerados pelas campanhas e conteúdos.",
  references: [{ title: "", link: "" }],
};

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
                  const isActive = module.slug === "orientacoes-adicionais";

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

export default function OrientacoesAdicionaisPage() {
  const [data, setData] = useState<AdditionalGuidelinesData>(initialData);
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
        executionGuidelines:
          parsed.executionGuidelines || initialData.executionGuidelines,
        attentionPoints: parsed.attentionPoints || initialData.attentionPoints,
        pendingItems:
          Array.isArray(parsed.pendingItems) && parsed.pendingItems.length
            ? parsed.pendingItems.map((item: Partial<PendingItem>) => ({
                title: item.title || "",
                description: item.description || "",
                responsible: item.responsible || "",
                status: item.status || "Pendente",
              }))
            : [{ ...emptyPendingItem }],
        nextSteps:
          Array.isArray(parsed.nextSteps) && parsed.nextSteps.length
            ? parsed.nextSteps.map((item: Partial<NextStepItem>) => ({
                title: item.title || "",
                description: item.description || "",
                priority: item.priority || "Alta",
              }))
            : [{ ...emptyNextStep }],
        teamRecommendations:
          Array.isArray(parsed.teamRecommendations) &&
          parsed.teamRecommendations.length
            ? parsed.teamRecommendations.map(
                (item: Partial<TeamRecommendation>) => ({
                  area: item.area || "",
                  recommendation: item.recommendation || "",
                })
              )
            : initialData.teamRecommendations,
        finalObservations:
          parsed.finalObservations || initialData.finalObservations,
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

  function updatePendingItem(
    index: number,
    key: keyof PendingItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.pendingItems];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        pendingItems: nextItems,
      };
    });
  }

  function addPendingItem() {
    setData((current) => ({
      ...current,
      pendingItems: [...current.pendingItems, { ...emptyPendingItem }],
    }));
  }

  function removePendingItem(index: number) {
    setData((current) => ({
      ...current,
      pendingItems:
        current.pendingItems.length > 1
          ? current.pendingItems.filter((_, itemIndex) => itemIndex !== index)
          : [{ ...emptyPendingItem }],
    }));
  }

  function updateNextStep(
    index: number,
    key: keyof NextStepItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.nextSteps];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        nextSteps: nextItems,
      };
    });
  }

  function addNextStep() {
    setData((current) => ({
      ...current,
      nextSteps: [...current.nextSteps, { ...emptyNextStep }],
    }));
  }

  function removeNextStep(index: number) {
    setData((current) => ({
      ...current,
      nextSteps:
        current.nextSteps.length > 1
          ? current.nextSteps.filter((_, itemIndex) => itemIndex !== index)
          : [{ ...emptyNextStep }],
    }));
  }

  function updateTeamRecommendation(
    index: number,
    key: keyof TeamRecommendation,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.teamRecommendations];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        teamRecommendations: nextItems,
      };
    });
  }

  function addTeamRecommendation() {
    setData((current) => ({
      ...current,
      teamRecommendations: [
        ...current.teamRecommendations,
        { ...emptyTeamRecommendation },
      ],
    }));
  }

  function removeTeamRecommendation(index: number) {
    setData((current) => ({
      ...current,
      teamRecommendations:
        current.teamRecommendations.length > 1
          ? current.teamRecommendations.filter(
              (_, itemIndex) => itemIndex !== index
            )
          : [{ ...emptyTeamRecommendation }],
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
                Orientações Adicionais
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Registre orientações finais, pontos de atenção, pendências,
                próximos passos e recomendações para a equipe executar o
                planejamento com mais clareza.
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
              title="Orientações gerais da execução"
              description="Use este campo para registrar cuidados, alinhamentos e recomendações finais que devem ser considerados na execução do planejamento."
            >
              <TextAreaField
                value={data.executionGuidelines}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    executionGuidelines: value,
                  }))
                }
                placeholder="Ex: Cuidados com linguagem, prioridades da execução, limites de escopo, alinhamentos com cliente, padrão de aprovação e recomendações importantes."
                rows={8}
              />
            </SectionCard>

            <SectionCard
              title="Pontos de atenção"
              description="Liste riscos, cuidados, materiais faltantes, acessos pendentes, aprovações necessárias ou dependências que podem impactar a execução."
            >
              <TextAreaField
                value={data.attentionPoints}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    attentionPoints: value,
                  }))
                }
                placeholder="Ex: Envio de fotos, aprovação da identidade visual, liberação de acessos, orçamento pendente, dependência de terceiros, validação de calendário..."
                rows={8}
              />
            </SectionCard>

            <SectionCard
              title="Pendências"
              description="Liste o que ainda precisa ser enviado, aprovado, configurado ou decidido para que a execução avance."
            >
              <div className="space-y-4">
                {data.pendingItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_220px_220px_auto]">
                      <div>
                        <FieldLabel>Pendência</FieldLabel>
                        <InputField
                          value={item.title}
                          onChange={(value) =>
                            updatePendingItem(index, "title", value)
                          }
                          placeholder="Ex: Enviar fotos, liberar acesso, aprovar identidade visual..."
                        />
                      </div>

                      <div>
                        <FieldLabel>Responsável</FieldLabel>
                        <InputField
                          value={item.responsible}
                          onChange={(value) =>
                            updatePendingItem(index, "responsible", value)
                          }
                          placeholder="Ex: Cliente, equipe, designer..."
                        />
                      </div>

                      <div>
                        <FieldLabel>Status</FieldLabel>
                        <SelectField
                          value={item.status}
                          onChange={(value) =>
                            updatePendingItem(index, "status", value)
                          }
                          options={pendingStatuses}
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removePendingItem(index)}
                          className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <FieldLabel>Descrição da pendência</FieldLabel>
                      <TextAreaField
                        value={item.description}
                        onChange={(value) =>
                          updatePendingItem(index, "description", value)
                        }
                        placeholder="Explique o que está pendente, por que isso importa e qual impacto pode ter na execução."
                        rows={5}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addPendingItem}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
              >
                + Nova pendência
              </button>
            </SectionCard>

            <SectionCard
              title="Próximos passos"
              description="Registre as próximas ações que devem acontecer depois da entrega ou aprovação do planejamento."
            >
              <div className="space-y-4">
                {data.nextSteps.map((step, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
                      <div>
                        <FieldLabel>Próximo passo</FieldLabel>
                        <InputField
                          value={step.title}
                          onChange={(value) =>
                            updateNextStep(index, "title", value)
                          }
                          placeholder="Ex: Criar calendário no Notion, configurar campanha, revisar métricas..."
                        />
                      </div>

                      <div>
                        <FieldLabel>Prioridade</FieldLabel>
                        <SelectField
                          value={step.priority}
                          onChange={(value) =>
                            updateNextStep(index, "priority", value)
                          }
                          options={priorities}
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeNextStep(index)}
                          className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <FieldLabel>Descrição do próximo passo</FieldLabel>
                      <TextAreaField
                        value={step.description}
                        onChange={(value) =>
                          updateNextStep(index, "description", value)
                        }
                        placeholder="Explique o que precisa ser feito, por quem e qual resultado esperado."
                        rows={5}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addNextStep}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
              >
                + Novo próximo passo
              </button>
            </SectionCard>

            <SectionCard
              title="Recomendações para a equipe"
              description="Registre orientações específicas para social media, design, tráfego, atendimento, comercial, redator ou outras áreas envolvidas."
            >
              <div className="space-y-4">
                {data.teamRecommendations.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"
                  >
                    <div>
                      <FieldLabel>Área ou responsável</FieldLabel>
                      <InputField
                        value={item.area}
                        onChange={(value) =>
                          updateTeamRecommendation(index, "area", value)
                        }
                        placeholder="Ex: Social media, design, tráfego pago..."
                      />
                    </div>

                    <div>
                      <FieldLabel>Recomendação</FieldLabel>
                      <InputField
                        value={item.recommendation}
                        onChange={(value) =>
                          updateTeamRecommendation(
                            index,
                            "recommendation",
                            value
                          )
                        }
                        placeholder="Explique a recomendação para essa área."
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeTeamRecommendation(index)}
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
                onClick={addTeamRecommendation}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
              >
                + Nova recomendação
              </button>
            </SectionCard>

            <SectionCard
              title="Observações finais"
              description="Registre orientações de fechamento, contexto adicional ou lembretes importantes para a continuidade do projeto."
            >
              <TextAreaField
                value={data.finalObservations}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    finalObservations: value,
                  }))
                }
                placeholder="Ex: O planejamento deve ser usado como guia estratégico. Ajustes podem ser feitos com base em dados, aprovações e mudanças de prioridade."
                rows={7}
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Adicione links complementares, documentos, prints, referências, pastas, exemplos ou materiais de apoio."
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
                        placeholder="Ex: Documento, pasta, print, referência visual ou material de apoio"
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
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
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