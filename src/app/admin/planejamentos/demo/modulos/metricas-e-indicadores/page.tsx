"use client";

import { useEffect, useState, type ReactNode } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-metricas-e-indicadores";

type Indicator = {
  name: string;
  type: string;
  channel: string;
  goal: string;
  frequency: string;
  tool: string;
  responsible: string;
  interpretation: string;
  decisionCriteria: string;
};

type JourneyMetric = {
  stage: string;
  metrics: string;
  purpose: string;
};

type ChannelMetric = {
  channel: string;
  metrics: string;
  tool: string;
};

type ToolItem = {
  name: string;
  purpose: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

type MetricsData = {
  indicators: Indicator[];
  mainIndicators: string;
  journeyMetrics: JourneyMetric[];
  channelMetrics: ChannelMetric[];
  tools: ToolItem[];
  analysisRoutine: string;
  decisionCriteria: string;
  reportingFormat: string;
  strategicObservations: string;
  references: ExternalReference[];
};

const indicatorTypes = [
  "Alcance",
  "Engajamento",
  "Tráfego",
  "Conversão",
  "Vendas",
  "Relacionamento",
  "Retenção",
  "Crescimento",
  "Financeiro",
];

const channels = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "LinkedIn",
  "WhatsApp",
  "Blog",
  "Pinterest",
  "Podcast",
  "Lives",
  "Site",
  "Tráfego pago",
  "E-mail",
  "Geral",
];

const frequencies = [
  "Diária",
  "Semanal",
  "Quinzenal",
  "Mensal",
  "Trimestral",
  "Por campanha",
  "Conforme demanda",
];

const emptyIndicator: Indicator = {
  name: "",
  type: "Alcance",
  channel: "Instagram",
  goal: "",
  frequency: "Semanal",
  tool: "",
  responsible: "",
  interpretation: "",
  decisionCriteria: "",
};

const initialData: MetricsData = {
  indicators: [{ ...emptyIndicator }],
  mainIndicators:
    "Leads gerados, custo por lead, taxa de conversão, vendas, faturamento, alcance, engajamento, tráfego do site, crescimento da audiência e taxa de resposta no WhatsApp.",
  journeyMetrics: [
    {
      stage: "Descoberta e alcance",
      metrics:
        "Alcance, impressões, visualizações, novos seguidores, visitas ao perfil, tráfego orgânico e reconhecimento da marca.",
      purpose:
        "Entender se o conteúdo está chegando em novas pessoas e ampliando a presença digital do projeto.",
    },
    {
      stage: "Relacionamento e engajamento",
      metrics:
        "Curtidas, comentários, salvamentos, compartilhamentos, respostas, mensagens, tempo de retenção e interações qualificadas.",
      purpose:
        "Avaliar se o conteúdo está gerando conexão, interesse e profundidade no relacionamento com o público.",
    },
    {
      stage: "Captação e nutrição",
      metrics:
        "Leads captados, custo por lead, taxa de conversão da página, downloads, cadastros, abertura de e-mail, cliques e respostas.",
      purpose:
        "Medir a capacidade da estratégia de transformar atenção em base de contatos e oportunidades qualificadas.",
    },
    {
      stage: "Conversão e vendas",
      metrics:
        "Vendas, faturamento, reuniões agendadas, taxa de fechamento, custo por venda, ROAS, ticket médio e receita por campanha.",
      purpose:
        "Avaliar se a estratégia está gerando resultado comercial e quais campanhas precisam de otimização.",
    },
  ],
  channelMetrics: [
    {
      channel: "Instagram, TikTok e redes sociais",
      metrics:
        "Alcance, retenção, salvamentos, compartilhamentos, comentários, mensagens, crescimento de seguidores e cliques no perfil.",
      tool: "Meta Business Suite, Instagram Insights, TikTok Analytics ou ferramenta nativa do canal.",
    },
    {
      channel: "Site, blog e SEO",
      metrics:
        "Sessões, usuários, páginas mais acessadas, tempo na página, origem do tráfego, palavras-chave, cliques e impressões.",
      tool: "Google Analytics, Google Search Console e painel do site.",
    },
    {
      channel: "Tráfego pago",
      metrics:
        "CPM, CPC, CTR, CPL, CPA, ROAS, frequência, conversões, custo por compra, leads qualificados e orçamento consumido.",
      tool: "Meta Ads, Google Ads, TikTok Ads, YouTube Ads ou gerenciador utilizado.",
    },
    {
      channel: "WhatsApp, e-mail e relacionamento",
      metrics:
        "Taxa de resposta, tempo de resposta, cliques, abertura, respostas qualificadas, agendamentos, reuniões e conversões originadas.",
      tool: "WhatsApp Business, CRM, RD Station, plataforma de e-mail ou planilha de acompanhamento.",
    },
  ],
  tools: [
    {
      name: "Google Analytics",
      purpose: "Acompanhar tráfego, origem dos acessos, páginas e comportamento no site.",
    },
    {
      name: "Google Search Console",
      purpose: "Acompanhar desempenho orgânico, palavras-chave, cliques e impressões.",
    },
    {
      name: "Meta Business Suite",
      purpose: "Acompanhar desempenho de Instagram, Facebook, anúncios e interações.",
    },
    {
      name: "Notion, CRM ou dashboard",
      purpose: "Organizar indicadores, histórico, análises e decisões tomadas a partir dos dados.",
    },
  ],
  analysisRoutine:
    "Reunião semanal para verificar campanhas, revisão mensal de conteúdo, análise trimestral de crescimento, atualização do dashboard toda sexta-feira e definição de próximos testes com base nos dados.",
  decisionCriteria:
    "Se o custo por lead estiver alto, revisar público e criativo. Se o engajamento cair, testar novos formatos. Se o tráfego do site crescer sem conversão, revisar página e CTA. Se o conteúdo gerar muitos salvamentos, transformar em série. Se uma campanha vender bem, aumentar orçamento de forma gradual.",
  reportingFormat:
    "Os dados devem ser organizados em um relatório simples, com principais indicadores, leitura estratégica, decisões tomadas, próximos testes e pontos de atenção.",
  strategicObservations:
    "As métricas devem orientar decisões, não apenas registrar números. O foco é entender quais canais geram atenção, quais conteúdos criam relacionamento, quais campanhas captam leads e quais ações produzem vendas.",
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
                  const isActive = module.slug === "metricas-e-indicadores";

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

export default function MetricasEIndicadoresPage() {
  const [data, setData] = useState<MetricsData>(initialData);
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
        indicators:
          Array.isArray(parsed.indicators) && parsed.indicators.length
            ? parsed.indicators.map((indicator: Partial<Indicator>) => ({
                name: indicator.name || "",
                type: indicator.type || "Alcance",
                channel: indicator.channel || "Instagram",
                goal: indicator.goal || "",
                frequency: indicator.frequency || "Semanal",
                tool: indicator.tool || "",
                responsible: indicator.responsible || "",
                interpretation: indicator.interpretation || "",
                decisionCriteria: indicator.decisionCriteria || "",
              }))
            : [{ ...emptyIndicator }],
        mainIndicators: parsed.mainIndicators || initialData.mainIndicators,
        journeyMetrics:
          Array.isArray(parsed.journeyMetrics) && parsed.journeyMetrics.length
            ? parsed.journeyMetrics.map((item: Partial<JourneyMetric>) => ({
                stage: item.stage || "",
                metrics: item.metrics || "",
                purpose: item.purpose || "",
              }))
            : initialData.journeyMetrics,
        channelMetrics:
          Array.isArray(parsed.channelMetrics) && parsed.channelMetrics.length
            ? parsed.channelMetrics.map((item: Partial<ChannelMetric>) => ({
                channel: item.channel || "",
                metrics: item.metrics || "",
                tool: item.tool || "",
              }))
            : initialData.channelMetrics,
        tools:
          Array.isArray(parsed.tools) && parsed.tools.length
            ? parsed.tools.map((tool: Partial<ToolItem>) => ({
                name: tool.name || "",
                purpose: tool.purpose || "",
              }))
            : initialData.tools,
        analysisRoutine: parsed.analysisRoutine || initialData.analysisRoutine,
        decisionCriteria: parsed.decisionCriteria || initialData.decisionCriteria,
        reportingFormat: parsed.reportingFormat || initialData.reportingFormat,
        strategicObservations:
          parsed.strategicObservations || initialData.strategicObservations,
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

  function updateIndicator(
    index: number,
    key: keyof Indicator,
    value: string
  ) {
    setData((current) => {
      const nextIndicators = [...current.indicators];

      nextIndicators[index] = {
        ...nextIndicators[index],
        [key]: value,
      };

      return {
        ...current,
        indicators: nextIndicators,
      };
    });
  }

  function addIndicator() {
    setData((current) => ({
      ...current,
      indicators: [...current.indicators, { ...emptyIndicator }],
    }));
  }

  function removeIndicator(index: number) {
    setData((current) => ({
      ...current,
      indicators:
        current.indicators.length > 1
          ? current.indicators.filter((_, itemIndex) => itemIndex !== index)
          : [{ ...emptyIndicator }],
    }));
  }

  function updateJourneyMetric(
    index: number,
    key: keyof JourneyMetric,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.journeyMetrics];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        journeyMetrics: nextItems,
      };
    });
  }

  function addJourneyMetric() {
    setData((current) => ({
      ...current,
      journeyMetrics: [
        ...current.journeyMetrics,
        { stage: "", metrics: "", purpose: "" },
      ],
    }));
  }

  function removeJourneyMetric(index: number) {
    setData((current) => ({
      ...current,
      journeyMetrics:
        current.journeyMetrics.length > 1
          ? current.journeyMetrics.filter((_, itemIndex) => itemIndex !== index)
          : [{ stage: "", metrics: "", purpose: "" }],
    }));
  }

  function updateChannelMetric(
    index: number,
    key: keyof ChannelMetric,
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.channelMetrics];

      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };

      return {
        ...current,
        channelMetrics: nextItems,
      };
    });
  }

  function addChannelMetric() {
    setData((current) => ({
      ...current,
      channelMetrics: [
        ...current.channelMetrics,
        { channel: "", metrics: "", tool: "" },
      ],
    }));
  }

  function removeChannelMetric(index: number) {
    setData((current) => ({
      ...current,
      channelMetrics:
        current.channelMetrics.length > 1
          ? current.channelMetrics.filter((_, itemIndex) => itemIndex !== index)
          : [{ channel: "", metrics: "", tool: "" }],
    }));
  }

  function updateTool(index: number, key: keyof ToolItem, value: string) {
    setData((current) => {
      const nextTools = [...current.tools];

      nextTools[index] = {
        ...nextTools[index],
        [key]: value,
      };

      return {
        ...current,
        tools: nextTools,
      };
    });
  }

  function addTool() {
    setData((current) => ({
      ...current,
      tools: [...current.tools, { name: "", purpose: "" }],
    }));
  }

  function removeTool(index: number) {
    setData((current) => ({
      ...current,
      tools:
        current.tools.length > 1
          ? current.tools.filter((_, itemIndex) => itemIndex !== index)
          : [{ name: "", purpose: "" }],
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
                Métricas e Indicadores
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Defina os indicadores que serão acompanhados, as metas de
                desempenho, ferramentas de análise, frequência de revisão e
                critérios para tomada de decisão.
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
              title="Indicadores principais"
              description="Liste os indicadores mais importantes que devem guiar a análise geral do planejamento."
            >
              <TextAreaField
                value={data.mainIndicators}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    mainIndicators: value,
                  }))
                }
                placeholder="Ex: Leads gerados, custo por lead, taxa de conversão, vendas, faturamento..."
                rows={6}
              />
            </SectionCard>

            <SectionCard
              title="Indicadores individuais"
              description="Cadastre cada indicador que será acompanhado, com canal, meta, ferramenta, frequência e critério de decisão."
            >
              <div className="space-y-5">
                {data.indicators.map((indicator, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Indicador {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-slate-950">
                          Configuração do indicador
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeIndicator(index)}
                        className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                      >
                        Excluir indicador
                      </button>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
                      <div>
                        <FieldLabel>Nome do indicador</FieldLabel>
                        <InputField
                          value={indicator.name}
                          onChange={(value) =>
                            updateIndicator(index, "name", value)
                          }
                          placeholder="Ex: Leads gerados, taxa de conversão, alcance, vendas..."
                        />
                      </div>

                      <div>
                        <FieldLabel>Tipo de indicador</FieldLabel>
                        <SelectField
                          value={indicator.type}
                          onChange={(value) =>
                            updateIndicator(index, "type", value)
                          }
                          options={indicatorTypes}
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <FieldLabel>Canal relacionado</FieldLabel>
                        <SelectField
                          value={indicator.channel}
                          onChange={(value) =>
                            updateIndicator(index, "channel", value)
                          }
                          options={channels}
                        />
                      </div>

                      <div>
                        <FieldLabel>Meta esperada</FieldLabel>
                        <InputField
                          value={indicator.goal}
                          onChange={(value) =>
                            updateIndicator(index, "goal", value)
                          }
                          placeholder="Ex: 300 leads por mês, 5% de conversão, 20 vendas..."
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <FieldLabel>Frequência de análise</FieldLabel>
                        <SelectField
                          value={indicator.frequency}
                          onChange={(value) =>
                            updateIndicator(index, "frequency", value)
                          }
                          options={frequencies}
                        />
                      </div>

                      <div>
                        <FieldLabel>Ferramenta de análise</FieldLabel>
                        <InputField
                          value={indicator.tool}
                          onChange={(value) =>
                            updateIndicator(index, "tool", value)
                          }
                          placeholder="Ex: Meta Ads, Google Analytics, Search Console..."
                        />
                      </div>

                      <div>
                        <FieldLabel>Responsável</FieldLabel>
                        <InputField
                          value={indicator.responsible}
                          onChange={(value) =>
                            updateIndicator(index, "responsible", value)
                          }
                          placeholder="Ex: Estrategista, gestor de tráfego, social media..."
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <FieldLabel>Como interpretar este indicador</FieldLabel>
                        <TextAreaField
                          value={indicator.interpretation}
                          onChange={(value) =>
                            updateIndicator(index, "interpretation", value)
                          }
                          placeholder="Explique o que esse indicador mostra sobre a estratégia e como ele deve ser interpretado."
                          rows={5}
                        />
                      </div>

                      <div>
                        <FieldLabel>Decisão a partir do indicador</FieldLabel>
                        <TextAreaField
                          value={indicator.decisionCriteria}
                          onChange={(value) =>
                            updateIndicator(index, "decisionCriteria", value)
                          }
                          placeholder="Ex: Se cair, revisar criativo. Se subir, escalar campanha. Se estagnar, testar novo formato."
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addIndicator}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white"
              >
                + Novo indicador
              </button>
            </SectionCard>

            <SectionCard
              title="Métricas por etapa da jornada"
              description="Organize os indicadores de acordo com cada etapa da jornada: descoberta, relacionamento, captação, nutrição, conversão e retenção."
            >
              <div className="space-y-4">
                {data.journeyMetrics.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                      <div>
                        <FieldLabel>Etapa da jornada</FieldLabel>
                        <InputField
                          value={item.stage}
                          onChange={(value) =>
                            updateJourneyMetric(index, "stage", value)
                          }
                          placeholder="Ex: Descoberta, relacionamento, captação..."
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeJourneyMetric(index)}
                          className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <FieldLabel>Métricas da etapa</FieldLabel>
                        <TextAreaField
                          value={item.metrics}
                          onChange={(value) =>
                            updateJourneyMetric(index, "metrics", value)
                          }
                          placeholder="Liste as métricas que devem ser acompanhadas nesta etapa."
                          rows={5}
                        />
                      </div>

                      <div>
                        <FieldLabel>Função dessas métricas</FieldLabel>
                        <TextAreaField
                          value={item.purpose}
                          onChange={(value) =>
                            updateJourneyMetric(index, "purpose", value)
                          }
                          placeholder="Explique para que essas métricas servem dentro da análise."
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addJourneyMetric}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white"
              >
                + Nova etapa
              </button>
            </SectionCard>

            <SectionCard
              title="Métricas por canal"
              description="Defina quais métricas devem ser acompanhadas em cada canal principal da estratégia."
            >
              <div className="space-y-4">
                {data.channelMetrics.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                      <div>
                        <FieldLabel>Canal</FieldLabel>
                        <InputField
                          value={item.channel}
                          onChange={(value) =>
                            updateChannelMetric(index, "channel", value)
                          }
                          placeholder="Ex: Instagram, site, tráfego pago, WhatsApp..."
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeChannelMetric(index)}
                          className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <FieldLabel>Métricas acompanhadas</FieldLabel>
                        <TextAreaField
                          value={item.metrics}
                          onChange={(value) =>
                            updateChannelMetric(index, "metrics", value)
                          }
                          placeholder="Liste as métricas desse canal."
                          rows={5}
                        />
                      </div>

                      <div>
                        <FieldLabel>Ferramenta ou fonte de dados</FieldLabel>
                        <TextAreaField
                          value={item.tool}
                          onChange={(value) =>
                            updateChannelMetric(index, "tool", value)
                          }
                          placeholder="Ex: Google Analytics, Meta Business Suite, CRM..."
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addChannelMetric}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white"
              >
                + Novo canal
              </button>
            </SectionCard>

            <SectionCard
              title="Ferramentas de acompanhamento"
              description="Liste as ferramentas que serão usadas para acompanhar dados, relatórios e desempenho."
            >
              <div className="space-y-4">
                {data.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_2fr_auto]"
                  >
                    <div>
                      <FieldLabel>Ferramenta</FieldLabel>
                      <InputField
                        value={tool.name}
                        onChange={(value) => updateTool(index, "name", value)}
                        placeholder="Ex: Google Analytics"
                      />
                    </div>

                    <div>
                      <FieldLabel>Função da ferramenta</FieldLabel>
                      <InputField
                        value={tool.purpose}
                        onChange={(value) =>
                          updateTool(index, "purpose", value)
                        }
                        placeholder="Explique para que essa ferramenta será usada."
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeTool(index)}
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
                onClick={addTool}
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white"
              >
                + Nova ferramenta
              </button>
            </SectionCard>

            <SectionCard
              title="Rotina de análise"
              description="Defina como os dados serão acompanhados, revisados e transformados em decisões estratégicas."
            >
              <TextAreaField
                value={data.analysisRoutine}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    analysisRoutine: value,
                  }))
                }
                placeholder="Ex: Reunião semanal para verificar campanhas, revisão mensal de conteúdo..."
                rows={7}
              />
            </SectionCard>

            <SectionCard
              title="Critérios de decisão"
              description="Defina como os indicadores devem orientar ajustes no planejamento."
            >
              <TextAreaField
                value={data.decisionCriteria}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    decisionCriteria: value,
                  }))
                }
                placeholder="Ex: Se o custo por lead estiver alto, revisar público e criativo..."
                rows={7}
              />
            </SectionCard>

            <SectionCard
              title="Formato de relatório"
              description="Defina como os resultados serão apresentados para equipe, cliente ou responsáveis."
            >
              <TextAreaField
                value={data.reportingFormat}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    reportingFormat: value,
                  }))
                }
                placeholder="Ex: Relatório mensal com indicadores, leitura estratégica, decisões tomadas e próximos testes."
                rows={6}
              />
            </SectionCard>

            <SectionCard
              title="Observações estratégicas"
              description="Registre orientações gerais sobre como os dados devem ser interpretados."
            >
              <TextAreaField
                value={data.strategicObservations}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    strategicObservations: value,
                  }))
                }
                placeholder="Explique como as métricas devem orientar decisões estratégicas."
                rows={6}
              />
            </SectionCard>

            <SectionCard
              title="Anexos e referências externas"
              description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a acessar dashboards, relatórios, planilhas e documentos de análise."
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
                        placeholder="Ex: Dashboard, relatório, planilha, Analytics, CRM..."
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