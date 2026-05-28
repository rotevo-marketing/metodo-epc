"use client";

import { useEffect, useState, type ReactNode } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-fluxo-de-automacao";

type AutomationTag = {
  name: string;
  description: string;
};

type ChannelPriority = {
  flow: string;
  dominantChannel: string;
  supportChannel: string;
};

type FlowCadence = {
  flow: string;
  cadence: string;
};

type AutomationStep = {
  moment: string;
  channel: string;
  type: string;
  title: string;
  purpose: string;
  condition: string;
  cta: string;
};

type AutomationFlow = {
  code: string;
  name: string;
  objective: string;
  dominantChannel: string;
  supportChannel: string;
  cadence: string;
  entryTrigger: string;
  advanceTrigger: string;
  exitCondition: string;
  strategicNotes: string;
  steps: AutomationStep[];
};

type PlatformItem = {
  category: string;
  tool: string;
  purpose: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type AutomationSystemData = {
  strategicVision: string;
  centralPrinciple: string;
  systemFunction: string;
  successCondition: string;
  failureRisk: string;
  architecture: string;
  architectureCharacteristics: string;
  entryTriggers: string;
  advanceTriggers: string;
  reentryTriggers: string;
  exitTriggers: string;
  tags: AutomationTag[];
  channelPriorities: ChannelPriority[];
  cadences: FlowCadence[];
  flows: AutomationFlow[];
  transmissionIntegration: string;
  mainKpi: string;
  secondaryKpis: string;
  platforms: PlatformItem[];
  references: ExternalReference[];
};

type StringFieldKey =
  | "strategicVision"
  | "centralPrinciple"
  | "systemFunction"
  | "successCondition"
  | "failureRisk"
  | "architecture"
  | "architectureCharacteristics"
  | "entryTriggers"
  | "advanceTriggers"
  | "reentryTriggers"
  | "exitTriggers"
  | "transmissionIntegration"
  | "mainKpi"
  | "secondaryKpis";

const stepTypes = [
  "Mensagem",
  "Espera",
  "Condição",
  "Ação",
  "Tag",
  "Notificação",
  "Saída",
];

const stepChannels = [
  "E-mail",
  "WhatsApp",
  "SMS",
  "CRM",
  "Canal de transmissão",
  "Página",
  "Equipe comercial",
  "Remarketing",
];

const initialTags: AutomationTag[] = [
  {
    name: "consciência inicial",
    description: "Lead entrou na base, mas ainda não abriu e-mails.",
  },
  {
    name: "engajado",
    description: "Lead abre e-mails e clica regularmente.",
  },
  {
    name: "pronto para DPG",
    description: "Lead com alto engajamento, mas ainda não entrou no DPG.",
  },
  {
    name: "DPG ativo",
    description: "Lead está dentro do DPG.",
  },
  {
    name: "pré-Mapeamento",
    description:
      "Lead demonstra sinais de maturidade para avançar para o Mapeamento.",
  },
  {
    name: "lead frio",
    description: "Lead sem interação por 14 dias ou mais.",
  },
];

const initialChannelPriorities: ChannelPriority[] = [
  {
    flow: "F1 - Entrada",
    dominantChannel: "E-mail",
    supportChannel: "",
  },
  {
    flow: "F2 - Maturação",
    dominantChannel: "E-mail",
    supportChannel: "Canal de transmissão",
  },
  {
    flow: "F3 - Ativação",
    dominantChannel: "E-mail",
    supportChannel: "WhatsApp",
  },
  {
    flow: "F4 - Pré-Mapeamento",
    dominantChannel: "WhatsApp",
    supportChannel: "E-mail",
  },
  {
    flow: "F5 - Reativação",
    dominantChannel: "E-mail",
    supportChannel: "Canal de transmissão",
  },
];

const initialCadences: FlowCadence[] = [
  {
    flow: "F1 - Entrada",
    cadence: "D0, D1, D2, D3, D5, D7",
  },
  {
    flow: "F2 - Maturação",
    cadence: "2 a 3 e-mails por semana",
  },
  {
    flow: "F3 - Ativação",
    cadence: "1 dia sim, 1 dia não",
  },
  {
    flow: "F4 - Pré-Mapeamento",
    cadence: "Sequência de 2 a 3 dias seguidos",
  },
  {
    flow: "F5 - Reativação",
    cadence: "1 a cada 2 ou 3 dias",
  },
];

const emptyStep: AutomationStep = {
  moment: "",
  channel: "E-mail",
  type: "Mensagem",
  title: "",
  purpose: "",
  condition: "",
  cta: "",
};

const initialFlows: AutomationFlow[] = [
  {
    code: "",
    name: "",
    objective: "",
    dominantChannel: "",
    supportChannel: "",
    cadence: "",
    entryTrigger: "",
    advanceTrigger: "",
    exitCondition: "",
    strategicNotes: "",
    steps: [{ ...emptyStep }],
  },
];

const initialPlatforms: PlatformItem[] = [
  {
    category: "E-mail e automação",
    tool: "Builderall",
    purpose: "Configurar os fluxos F1 a F5.",
  },
  {
    category: "WhatsApp",
    tool: "WhatsApp Business",
    purpose: "Operação manual estruturada por roteiro.",
  },
  {
    category: "Canal de transmissão",
    tool: "Instagram",
    purpose: "Reforçar e-mails-chave e manter a linha de raciocínio ativa.",
  },
];

const initialData: AutomationSystemData = {
  strategicVision:
    "Os fluxos não são apenas uma sequência de e-mails. Eles funcionam como um sistema que sustenta raciocínio, reforça percepção e conduz o lead até uma decisão mais clara.",
  centralPrinciple:
    "O lead não age porque não sustenta o que entendeu. Sem reforço estruturado, a percepção gerada pelo conteúdo se dispersa rapidamente.",
  systemFunction:
    "Sustentar raciocínio ao longo do tempo, reforçar padrões até ficarem inegáveis e aumentar a tensão de decisão progressivamente, sem pressão artificial.",
  successCondition:
    "Quando bem executado, o sistema gera previsibilidade e faz o lead avançar no funil de forma estruturada, sem depender apenas de intervenção manual.",
  failureRisk:
    "Quando mal executado, o conteúdo é ignorado. O lead abre, não conecta, não sustenta a percepção e para de abrir.",
  architecture:
    "F1 Entrada -> F2 Maturação -> F3 Ativação -> F4 Pré-Mapeamento -> F5 Reativação",
  architectureCharacteristics:
    "Sistema não linear, baseado em comportamento, com reentrada contínua e orientado à decisão.",
  entryTriggers:
    "Lead preenche a página de entrada, entra no DPG, baixa material de clareza ou acessa uma isca estratégica.",
  advanceTriggers:
    "3 ou mais e-mails abertos, 2 ou mais cliques em CTAs, resposta direta, clique no DPG, engajamento ativo nos últimos 7 dias ou alta interação contínua.",
  reentryTriggers:
    "Lead não abre 5 e-mails consecutivos ou fica inativo por 7 a 14 dias sem nenhuma interação.",
  exitTriggers:
    "Lead entra no DPG, agenda o Mapeamento, entra em processo comercial ativo ou conclui a sequência.",
  tags: initialTags,
  channelPriorities: initialChannelPriorities,
  cadences: initialCadences,
  flows: initialFlows,
  transmissionIntegration:
    "Para cada e-mail-chave do fluxo, criar um reforço no Canal de Transmissão do Instagram, mantendo o lead dentro da linha de raciocínio e reduzindo dispersão entre e-mails.",
  mainKpi: "% de leads que entram no DPG.",
  secondaryKpis:
    "Taxa de abertura por fluxo, taxa de clique por e-mail, percentual de leads do DPG que avançam para o Mapeamento, respostas no WhatsApp, avanço entre fluxos e taxa de reativação.",
  platforms: initialPlatforms,
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
                  const isActive = module.slug === "fluxo-de-automacao";

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

export default function FluxoDeAutomacaoPage() {
  const [data, setData] = useState<AutomationSystemData>(initialData);
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
        strategicVision: parsed.strategicVision || initialData.strategicVision,
        centralPrinciple:
          parsed.centralPrinciple || initialData.centralPrinciple,
        systemFunction: parsed.systemFunction || initialData.systemFunction,
        successCondition:
          parsed.successCondition || initialData.successCondition,
        failureRisk: parsed.failureRisk || initialData.failureRisk,
        architecture: parsed.architecture || initialData.architecture,
        architectureCharacteristics:
          parsed.architectureCharacteristics ||
          initialData.architectureCharacteristics,
        entryTriggers: parsed.entryTriggers || initialData.entryTriggers,
        advanceTriggers: parsed.advanceTriggers || initialData.advanceTriggers,
        reentryTriggers: parsed.reentryTriggers || initialData.reentryTriggers,
        exitTriggers: parsed.exitTriggers || initialData.exitTriggers,
        tags:
          Array.isArray(parsed.tags) && parsed.tags.length
            ? parsed.tags.map((tag: Partial<AutomationTag>) => ({
                name: tag.name || "",
                description: tag.description || "",
              }))
            : initialTags,
        channelPriorities:
          Array.isArray(parsed.channelPriorities) &&
          parsed.channelPriorities.length
            ? parsed.channelPriorities.map(
                (item: Partial<ChannelPriority>) => ({
                  flow: item.flow || "",
                  dominantChannel: item.dominantChannel || "",
                  supportChannel: item.supportChannel || "",
                })
              )
            : initialChannelPriorities,
        cadences:
          Array.isArray(parsed.cadences) && parsed.cadences.length
            ? parsed.cadences.map((item: Partial<FlowCadence>) => ({
                flow: item.flow || "",
                cadence: item.cadence || "",
              }))
            : initialCadences,
        flows:
          Array.isArray(parsed.flows) && parsed.flows.length
            ? parsed.flows.map((flow: Partial<AutomationFlow>) => ({
                code: flow.code || "",
                name: flow.name || "",
                objective: flow.objective || "",
                dominantChannel: flow.dominantChannel || "",
                supportChannel: flow.supportChannel || "",
                cadence: flow.cadence || "",
                entryTrigger: flow.entryTrigger || "",
                advanceTrigger: flow.advanceTrigger || "",
                exitCondition: flow.exitCondition || "",
                strategicNotes: flow.strategicNotes || "",
                steps:
                  Array.isArray(flow.steps) && flow.steps.length
                    ? flow.steps.map((step: Partial<AutomationStep>) => ({
                        moment: step.moment || "",
                        channel: step.channel || "E-mail",
                        type: step.type || "Mensagem",
                        title: step.title || "",
                        purpose: step.purpose || "",
                        condition: step.condition || "",
                        cta: step.cta || "",
                      }))
                    : [{ ...emptyStep }],
              }))
            : initialFlows,
        transmissionIntegration:
          parsed.transmissionIntegration ||
          initialData.transmissionIntegration,
        mainKpi: parsed.mainKpi || initialData.mainKpi,
        secondaryKpis: parsed.secondaryKpis || initialData.secondaryKpis,
        platforms:
          Array.isArray(parsed.platforms) && parsed.platforms.length
            ? parsed.platforms.map((platform: Partial<PlatformItem>) => ({
                category: platform.category || "",
                tool: platform.tool || "",
                purpose: platform.purpose || "",
              }))
            : initialPlatforms,
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

  function updateField(key: StringFieldKey, value: string) {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateTag(index: number, key: keyof AutomationTag, value: string) {
    setData((current) => {
      const nextTags = [...current.tags];

      nextTags[index] = {
        ...nextTags[index],
        [key]: value,
      };

      return {
        ...current,
        tags: nextTags,
      };
    });
  }

  function addTag() {
    setData((current) => ({
      ...current,
      tags: [...current.tags, { name: "", description: "" }],
    }));
  }

  function removeTag(index: number) {
    setData((current) => ({
      ...current,
      tags:
        current.tags.length > 1
          ? current.tags.filter((_, itemIndex) => itemIndex !== index)
          : [{ name: "", description: "" }],
    }));
  }

  function updateChannelPriority(
    index: number,
    key: keyof ChannelPriority,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.channelPriorities];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        channelPriorities: nextItems,
      };
    });
  }

  function addChannelPriority() {
    setData((current) => ({
      ...current,
      channelPriorities: [
        ...current.channelPriorities,
        { flow: "", dominantChannel: "", supportChannel: "" },
      ],
    }));
  }

  function removeChannelPriority(index: number) {
    setData((current) => ({
      ...current,
      channelPriorities:
        current.channelPriorities.length > 1
          ? current.channelPriorities.filter(
              (_, itemIndex) => itemIndex !== index
            )
          : [{ flow: "", dominantChannel: "", supportChannel: "" }],
    }));
  }

  function updateCadence(index: number, key: keyof FlowCadence, value: string) {
    setData((current) => {
      const nextItems = [...current.cadences];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        cadences: nextItems,
      };
    });
  }

  function addCadence() {
    setData((current) => ({
      ...current,
      cadences: [...current.cadences, { flow: "", cadence: "" }],
    }));
  }

  function removeCadence(index: number) {
    setData((current) => ({
      ...current,
      cadences:
        current.cadences.length > 1
          ? current.cadences.filter((_, itemIndex) => itemIndex !== index)
          : [{ flow: "", cadence: "" }],
    }));
  }

  function updateFlow(index: number, key: keyof AutomationFlow, value: string) {
    setData((current) => {
      const nextFlows = [...current.flows];

      nextFlows[index] = {
        ...nextFlows[index],
        [key]: value,
      };

      return {
        ...current,
        flows: nextFlows,
      };
    });
  }

  function addFlow() {
    setData((current) => ({
      ...current,
      flows: [
        ...current.flows,
        {
          code: "",
          name: "",
          objective: "",
          dominantChannel: "",
          supportChannel: "",
          cadence: "",
          entryTrigger: "",
          advanceTrigger: "",
          exitCondition: "",
          strategicNotes: "",
          steps: [{ ...emptyStep }],
        },
      ],
    }));
  }

  function removeFlow(index: number) {
    setData((current) => ({
      ...current,
      flows:
        current.flows.length > 1
          ? current.flows.filter((_, itemIndex) => itemIndex !== index)
          : initialFlows,
    }));
  }

  function updateStep(
    flowIndex: number,
    stepIndex: number,
    key: keyof AutomationStep,
    value: string
  ) {
    setData((current) => {
      const nextFlows = [...current.flows];
      const nextSteps = [...nextFlows[flowIndex].steps];

      nextSteps[stepIndex] = {
        ...nextSteps[stepIndex],
        [key]: value,
      };

      nextFlows[flowIndex] = {
        ...nextFlows[flowIndex],
        steps: nextSteps,
      };

      return {
        ...current,
        flows: nextFlows,
      };
    });
  }

  function addStep(flowIndex: number) {
    setData((current) => {
      const nextFlows = [...current.flows];

      nextFlows[flowIndex] = {
        ...nextFlows[flowIndex],
        steps: [...nextFlows[flowIndex].steps, { ...emptyStep }],
      };

      return {
        ...current,
        flows: nextFlows,
      };
    });
  }

  function removeStep(flowIndex: number, stepIndex: number) {
    setData((current) => {
      const nextFlows = [...current.flows];
      const currentSteps = nextFlows[flowIndex].steps;

      nextFlows[flowIndex] = {
        ...nextFlows[flowIndex],
        steps:
          currentSteps.length > 1
            ? currentSteps.filter((_, itemIndex) => itemIndex !== stepIndex)
            : [{ ...emptyStep }],
      };

      return {
        ...current,
        flows: nextFlows,
      };
    });
  }

  function updatePlatform(
    index: number,
    key: keyof PlatformItem,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.platforms];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        platforms: nextItems,
      };
    });
  }

  function addPlatform() {
    setData((current) => ({
      ...current,
      platforms: [...current.platforms, { category: "", tool: "", purpose: "" }],
    }));
  }

  function removePlatform(index: number) {
    setData((current) => ({
      ...current,
      platforms:
        current.platforms.length > 1
          ? current.platforms.filter((_, itemIndex) => itemIndex !== index)
          : [{ category: "", tool: "", purpose: "" }],
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
          ? current.references.filter((_, itemIndex) => itemIndex !== index)
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
                Campanhas, Automações e Conversão
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                Fluxos de Automação
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Estruture o sistema de automação do projeto com visão
                estratégica, arquitetura dos fluxos, scoring, tags, cadência,
                canais, mensagens, KPIs e plataformas.
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
              title="Visão estratégica do sistema"
              description="Explique a lógica central dos fluxos e por que o sistema existe dentro da jornada do lead."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Visão estratégica</FieldLabel>
                  <TextAreaField
                    value={data.strategicVision}
                    onChange={(value) => updateField("strategicVision", value)}
                    placeholder="Explique o que os fluxos representam estrategicamente."
                  />
                </div>

                <div>
                  <FieldLabel>Princípio central</FieldLabel>
                  <TextAreaField
                    value={data.centralPrinciple}
                    onChange={(value) => updateField("centralPrinciple", value)}
                    placeholder="Explique a tese que sustenta o sistema de automação."
                  />
                </div>

                <div>
                  <FieldLabel>Função do sistema</FieldLabel>
                  <TextAreaField
                    value={data.systemFunction}
                    onChange={(value) => updateField("systemFunction", value)}
                    placeholder="Liste o papel dos fluxos na maturação, sustentação e decisão do lead."
                  />
                </div>

                <div>
                  <FieldLabel>Se bem executado</FieldLabel>
                  <TextAreaField
                    value={data.successCondition}
                    onChange={(value) => updateField("successCondition", value)}
                    placeholder="Descreva o resultado esperado quando o sistema funciona bem."
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>Risco se mal executado</FieldLabel>
                  <TextAreaField
                    value={data.failureRisk}
                    onChange={(value) => updateField("failureRisk", value)}
                    placeholder="Descreva o que acontece quando o fluxo é mal executado."
                    rows={5}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Arquitetura do sistema"
              description="Descreva como os fluxos se conectam e quais características orientam a movimentação do lead."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Estrutura operacional</FieldLabel>
                  <TextAreaField
                    value={data.architecture}
                    onChange={(value) => updateField("architecture", value)}
                    placeholder="Ex: F1 Entrada -> F2 Maturação -> F3 Ativação..."
                    rows={5}
                  />
                </div>

                <div>
                  <FieldLabel>Características da arquitetura</FieldLabel>
                  <TextAreaField
                    value={data.architectureCharacteristics}
                    onChange={(value) =>
                      updateField("architectureCharacteristics", value)
                    }
                    placeholder="Ex: Não linear, baseada em comportamento, com reentrada contínua..."
                    rows={5}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Scoring, gatilhos e movimentação"
              description="Defina os critérios que fazem o lead entrar, avançar, reentrar ou sair dos fluxos."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Gatilhos de entrada</FieldLabel>
                  <TextAreaField
                    value={data.entryTriggers}
                    onChange={(value) => updateField("entryTriggers", value)}
                    placeholder="Ex: Preencheu página de entrada, baixou material..."
                    rows={6}
                  />
                </div>

                <div>
                  <FieldLabel>Gatilhos de avanço</FieldLabel>
                  <TextAreaField
                    value={data.advanceTriggers}
                    onChange={(value) => updateField("advanceTriggers", value)}
                    placeholder="Ex: 3 aberturas, 2 cliques, interação direta..."
                    rows={6}
                  />
                </div>

                <div>
                  <FieldLabel>Gatilhos de reentrada</FieldLabel>
                  <TextAreaField
                    value={data.reentryTriggers}
                    onChange={(value) => updateField("reentryTriggers", value)}
                    placeholder="Ex: Inatividade, não abertura, abandono..."
                    rows={6}
                  />
                </div>

                <div>
                  <FieldLabel>Gatilhos de saída</FieldLabel>
                  <TextAreaField
                    value={data.exitTriggers}
                    onChange={(value) => updateField("exitTriggers", value)}
                    placeholder="Ex: Entrou no DPG, agendou, comprou, entrou no comercial..."
                    rows={6}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Tags e segmentação"
              description="Liste as tags que identificam o estágio do lead e permitem personalizar a comunicação."
            >
              <div className="space-y-4">
                {data.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"
                  >
                    <div>
                      <FieldLabel>Tag</FieldLabel>
                      <InputField
                        value={tag.name}
                        onChange={(value) => updateTag(index, "name", value)}
                        placeholder="Ex: engajado"
                      />
                    </div>

                    <div>
                      <FieldLabel>Descrição</FieldLabel>
                      <InputField
                        value={tag.description}
                        onChange={(value) =>
                          updateTag(index, "description", value)
                        }
                        placeholder="Explique quando essa tag deve ser aplicada."
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
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
                onClick={addTag}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Nova tag
              </button>
            </SectionCard>

            <SectionCard
              title="Prioridade de canal por estágio"
              description="Defina o canal dominante e o canal de suporte de cada fluxo."
            >
              <div className="space-y-4">
                {data.channelPriorities.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_1fr_auto]"
                  >
                    <div>
                      <FieldLabel>Fluxo</FieldLabel>
                      <InputField
                        value={item.flow}
                        onChange={(value) =>
                          updateChannelPriority(index, "flow", value)
                        }
                        placeholder="Ex: F1 - Entrada"
                      />
                    </div>

                    <div>
                      <FieldLabel>Canal dominante</FieldLabel>
                      <InputField
                        value={item.dominantChannel}
                        onChange={(value) =>
                          updateChannelPriority(index, "dominantChannel", value)
                        }
                        placeholder="Ex: E-mail"
                      />
                    </div>

                    <div>
                      <FieldLabel>Canal de suporte</FieldLabel>
                      <InputField
                        value={item.supportChannel}
                        onChange={(value) =>
                          updateChannelPriority(index, "supportChannel", value)
                        }
                        placeholder="Ex: WhatsApp"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeChannelPriority(index)}
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
                onClick={addChannelPriority}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Novo canal por estágio
              </button>
            </SectionCard>

            <SectionCard
              title="Cadência dos fluxos"
              description="Defina a frequência ou sequência de envio de cada fluxo."
            >
              <div className="space-y-4">
                {data.cadences.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"
                  >
                    <div>
                      <FieldLabel>Fluxo</FieldLabel>
                      <InputField
                        value={item.flow}
                        onChange={(value) => updateCadence(index, "flow", value)}
                        placeholder="Ex: F1 - Entrada"
                      />
                    </div>

                    <div>
                      <FieldLabel>Cadência</FieldLabel>
                      <InputField
                        value={item.cadence}
                        onChange={(value) =>
                          updateCadence(index, "cadence", value)
                        }
                        placeholder="Ex: D0, D1, D2, D3, D5, D7"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeCadence(index)}
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
                onClick={addCadence}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Nova cadência
              </button>
            </SectionCard>

            <SectionCard
              title="Estrutura dos fluxos"
              description="Cadastre cada fluxo do sistema e suas etapas internas. Essas etapas serão usadas para gerar o mapa visual e a sequência de mensagens na apresentação."
            >
              <div className="space-y-6">
                {data.flows.map((flow, flowIndex) => (
                  <div
                    key={flowIndex}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Fluxo {String(flowIndex + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-slate-950">
                          Configuração do fluxo
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFlow(flowIndex)}
                        className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                      >
                        Excluir fluxo
                      </button>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-[120px_1fr]">
                      <div>
                        <FieldLabel>Código</FieldLabel>
                        <InputField
                          value={flow.code}
                          onChange={(value) =>
                            updateFlow(flowIndex, "code", value)
                          }
                          placeholder="Ex: F1"
                        />
                      </div>

                      <div>
                        <FieldLabel>Nome do fluxo</FieldLabel>
                        <InputField
                          value={flow.name}
                          onChange={(value) =>
                            updateFlow(flowIndex, "name", value)
                          }
                          placeholder="Ex: Entrada"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <FieldLabel>Objetivo</FieldLabel>
                      <TextAreaField
                        value={flow.objective}
                        onChange={(value) =>
                          updateFlow(flowIndex, "objective", value)
                        }
                        placeholder="Explique o objetivo estratégico deste fluxo."
                        rows={5}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <FieldLabel>Canal dominante</FieldLabel>
                        <InputField
                          value={flow.dominantChannel}
                          onChange={(value) =>
                            updateFlow(flowIndex, "dominantChannel", value)
                          }
                          placeholder="Ex: E-mail"
                        />
                      </div>

                      <div>
                        <FieldLabel>Canal de suporte</FieldLabel>
                        <InputField
                          value={flow.supportChannel}
                          onChange={(value) =>
                            updateFlow(flowIndex, "supportChannel", value)
                          }
                          placeholder="Ex: WhatsApp"
                        />
                      </div>

                      <div>
                        <FieldLabel>Cadência</FieldLabel>
                        <InputField
                          value={flow.cadence}
                          onChange={(value) =>
                            updateFlow(flowIndex, "cadence", value)
                          }
                          placeholder="Ex: D0, D1, D2"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <FieldLabel>Gatilho de entrada</FieldLabel>
                        <TextAreaField
                          value={flow.entryTrigger}
                          onChange={(value) =>
                            updateFlow(flowIndex, "entryTrigger", value)
                          }
                          placeholder="Quando o lead entra neste fluxo?"
                          rows={5}
                        />
                      </div>

                      <div>
                        <FieldLabel>Gatilho de avanço</FieldLabel>
                        <TextAreaField
                          value={flow.advanceTrigger}
                          onChange={(value) =>
                            updateFlow(flowIndex, "advanceTrigger", value)
                          }
                          placeholder="Quando o lead avança?"
                          rows={5}
                        />
                      </div>

                      <div>
                        <FieldLabel>Condição de saída</FieldLabel>
                        <TextAreaField
                          value={flow.exitCondition}
                          onChange={(value) =>
                            updateFlow(flowIndex, "exitCondition", value)
                          }
                          placeholder="Quando o lead sai deste fluxo?"
                          rows={5}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <FieldLabel>Observações estratégicas do fluxo</FieldLabel>
                      <TextAreaField
                        value={flow.strategicNotes}
                        onChange={(value) =>
                          updateFlow(flowIndex, "strategicNotes", value)
                        }
                        placeholder="Explique cuidados, lógica, micro-loops, CTAs e papel deste fluxo no sistema."
                        rows={5}
                      />
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-semibold text-slate-700">
                        Etapas, e-mails e mensagens do fluxo
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Cada etapa abaixo aparecerá na apresentação como parte do mapa visual e também como sequência detalhada de mensagens.
                      </p>

                      <div className="mt-4 space-y-4">
                        {flow.steps.map((step, stepIndex) => (
                          <div
                            key={stepIndex}
                            className="rounded-2xl border border-slate-200 bg-white p-4"
                          >
                            <div className="grid gap-4 md:grid-cols-[120px_180px_180px_1fr_auto]">
                              <div>
                                <FieldLabel>Momento</FieldLabel>
                                <InputField
                                  value={step.moment}
                                  onChange={(value) =>
                                    updateStep(
                                      flowIndex,
                                      stepIndex,
                                      "moment",
                                      value
                                    )
                                  }
                                  placeholder="Ex: D0"
                                />
                              </div>

                              <div>
                                <FieldLabel>Canal</FieldLabel>
                                <SelectField
                                  value={step.channel}
                                  onChange={(value) =>
                                    updateStep(
                                      flowIndex,
                                      stepIndex,
                                      "channel",
                                      value
                                    )
                                  }
                                  options={stepChannels}
                                />
                              </div>

                              <div>
                                <FieldLabel>Tipo</FieldLabel>
                                <SelectField
                                  value={step.type}
                                  onChange={(value) =>
                                    updateStep(
                                      flowIndex,
                                      stepIndex,
                                      "type",
                                      value
                                    )
                                  }
                                  options={stepTypes}
                                />
                              </div>

                              <div>
                                <FieldLabel>Título da etapa</FieldLabel>
                                <InputField
                                  value={step.title}
                                  onChange={(value) =>
                                    updateStep(
                                      flowIndex,
                                      stepIndex,
                                      "title",
                                      value
                                    )
                                  }
                                  placeholder="Ex: Você não entrou aqui por acaso"
                                />
                              </div>

                              <div className="flex items-end">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeStep(flowIndex, stepIndex)
                                  }
                                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                                >
                                  Excluir
                                </button>
                              </div>
                            </div>

                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                              <div>
                                <FieldLabel>Função da etapa</FieldLabel>
                                <TextAreaField
                                  value={step.purpose}
                                  onChange={(value) =>
                                    updateStep(
                                      flowIndex,
                                      stepIndex,
                                      "purpose",
                                      value
                                    )
                                  }
                                  placeholder="Explique a função estratégica desta etapa."
                                  rows={4}
                                />
                              </div>

                              <div>
                                <FieldLabel>Condição</FieldLabel>
                                <TextAreaField
                                  value={step.condition}
                                  onChange={(value) =>
                                    updateStep(
                                      flowIndex,
                                      stepIndex,
                                      "condition",
                                      value
                                    )
                                  }
                                  placeholder="Ex: Se abriu, se clicou, se não respondeu, se entrou no grupo..."
                                  rows={4}
                                />
                              </div>

                              <div>
                                <FieldLabel>CTA ou próximo passo</FieldLabel>
                                <TextAreaField
                                  value={step.cta}
                                  onChange={(value) =>
                                    updateStep(
                                      flowIndex,
                                      stepIndex,
                                      "cta",
                                      value
                                    )
                                  }
                                  placeholder="Ex: Entrar no DPG, responder, agendar..."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => addStep(flowIndex)}
                        className="mt-4 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
                      >
                        + Nova etapa
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addFlow}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Novo fluxo
              </button>
            </SectionCard>

            <SectionCard
              title="Integração com canal de transmissão"
              description="Explique como os e-mails-chave serão reforçados por outro canal."
            >
              <TextAreaField
                value={data.transmissionIntegration}
                onChange={(value) =>
                  updateField("transmissionIntegration", value)
                }
                placeholder="Ex: Para cada e-mail-chave, criar reforço no canal de transmissão..."
                rows={7}
              />
            </SectionCard>

            <SectionCard
              title="KPIs do sistema"
              description="Defina a métrica central e os indicadores secundários do sistema de automação."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>KPI principal</FieldLabel>
                  <TextAreaField
                    value={data.mainKpi}
                    onChange={(value) => updateField("mainKpi", value)}
                    placeholder="Ex: Percentual de leads que entram no DPG."
                    rows={5}
                  />
                </div>

                <div>
                  <FieldLabel>KPIs secundários</FieldLabel>
                  <TextAreaField
                    value={data.secondaryKpis}
                    onChange={(value) => updateField("secondaryKpis", value)}
                    placeholder="Ex: Abertura, clique, avanço, agendamento, vendas..."
                    rows={5}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Plataformas recomendadas"
              description="Liste as ferramentas necessárias para operar os fluxos."
            >
              <div className="space-y-4">
                {data.platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_2fr_auto]"
                  >
                    <div>
                      <FieldLabel>Categoria</FieldLabel>
                      <InputField
                        value={platform.category}
                        onChange={(value) =>
                          updatePlatform(index, "category", value)
                        }
                        placeholder="Ex: E-mail e automação"
                      />
                    </div>

                    <div>
                      <FieldLabel>Ferramenta</FieldLabel>
                      <InputField
                        value={platform.tool}
                        onChange={(value) =>
                          updatePlatform(index, "tool", value)
                        }
                        placeholder="Ex: Builderall"
                      />
                    </div>

                    <div>
                      <FieldLabel>Função</FieldLabel>
                      <InputField
                        value={platform.purpose}
                        onChange={(value) =>
                          updatePlatform(index, "purpose", value)
                        }
                        placeholder="Explique para que essa ferramenta será usada."
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removePlatform(index)}
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
                onClick={addPlatform}
                className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
              >
                + Nova plataforma
              </button>
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Adicione links de fluxos, ferramentas, exemplos, documentos, mapas ou referências de automação."
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
                        placeholder="Ex: Fluxo, ferramenta, automação, mapa ou documento"
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