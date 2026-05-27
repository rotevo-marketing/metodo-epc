"use client";

import { type ReactNode } from "react";
import Link from "next/link";

export type Indicator = {
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

export type JourneyMetric = {
  stage: string;
  metrics: string;
  purpose: string;
};

export type ChannelMetric = {
  channel: string;
  metrics: string;
  tool: string;
};

export type ToolItem = {
  name: string;
  purpose: string;
};

export type MetricsData = {
  indicators: Indicator[];
  mainIndicators: string;
  journeyMetrics: JourneyMetric[];
  channelMetrics: ChannelMetric[];
  tools: ToolItem[];
  analysisRoutine: string;
  decisionCriteria: string;
  reportingFormat: string;
  strategicObservations: string;
  references: { title: string; link: string }[];
};

type StringFieldKey =
  | "mainIndicators"
  | "analysisRoutine"
  | "decisionCriteria"
  | "reportingFormat"
  | "strategicObservations";

export const indicatorTypes = [
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

export const indicatorChannels = [
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

export const analysisFrequencies = [
  "Diária",
  "Semanal",
  "Quinzenal",
  "Mensal",
  "Trimestral",
  "Por campanha",
  "Conforme demanda",
];

export const emptyIndicator: Indicator = {
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

export const initialMetricsData: MetricsData = {
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
      purpose:
        "Organizar indicadores, histórico, análises e decisões tomadas a partir dos dados.",
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
    <section className="mt-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
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
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

interface MetricasIndicadoresFormProps {
  data: MetricsData;
  setData: React.Dispatch<React.SetStateAction<MetricsData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
}

export default function MetricasIndicadoresForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: MetricasIndicadoresFormProps) {
  function updateField(key: StringFieldKey, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function updateIndicator(index: number, key: keyof Indicator, value: string) {
    setData((current) => {
      const next = [...current.indicators];
      next[index] = { ...next[index], [key]: value };
      return { ...current, indicators: next };
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
          ? current.indicators.filter((_, i) => i !== index)
          : [{ ...emptyIndicator }],
    }));
  }

  function updateJourneyMetric(index: number, key: keyof JourneyMetric, value: string) {
    setData((current) => {
      const next = [...current.journeyMetrics];
      next[index] = { ...next[index], [key]: value };
      return { ...current, journeyMetrics: next };
    });
  }

  function addJourneyMetric() {
    setData((current) => ({
      ...current,
      journeyMetrics: [...current.journeyMetrics, { stage: "", metrics: "", purpose: "" }],
    }));
  }

  function removeJourneyMetric(index: number) {
    setData((current) => ({
      ...current,
      journeyMetrics:
        current.journeyMetrics.length > 1
          ? current.journeyMetrics.filter((_, i) => i !== index)
          : [{ stage: "", metrics: "", purpose: "" }],
    }));
  }

  function updateChannelMetric(index: number, key: keyof ChannelMetric, value: string) {
    setData((current) => {
      const next = [...current.channelMetrics];
      next[index] = { ...next[index], [key]: value };
      return { ...current, channelMetrics: next };
    });
  }

  function addChannelMetric() {
    setData((current) => ({
      ...current,
      channelMetrics: [...current.channelMetrics, { channel: "", metrics: "", tool: "" }],
    }));
  }

  function removeChannelMetric(index: number) {
    setData((current) => ({
      ...current,
      channelMetrics:
        current.channelMetrics.length > 1
          ? current.channelMetrics.filter((_, i) => i !== index)
          : [{ channel: "", metrics: "", tool: "" }],
    }));
  }

  function updateTool(index: number, key: keyof ToolItem, value: string) {
    setData((current) => {
      const next = [...current.tools];
      next[index] = { ...next[index], [key]: value };
      return { ...current, tools: next };
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
          ? current.tools.filter((_, i) => i !== index)
          : [{ name: "", purpose: "" }],
    }));
  }

  function updateReference(index: number, key: "title" | "link", value: string) {
    setData((current) => {
      const next = [...current.references];
      next[index] = { ...next[index], [key]: value };
      return { ...current, references: next };
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
          ? current.references.filter((_, i) => i !== index)
          : [{ title: "", link: "" }],
    }));
  }

  return (
    <div>
      <SectionCard
        title="Indicadores principais"
        description="Liste os indicadores mais importantes que devem guiar a análise geral do planejamento."
      >
        <TextAreaField
          value={data.mainIndicators}
          onChange={(value) => updateField("mainIndicators", value)}
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
                  disabled={isDisabled}
                  className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Excluir indicador
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
                <div>
                  <FieldLabel>Nome do indicador</FieldLabel>
                  <InputField
                    value={indicator.name}
                    onChange={(value) => updateIndicator(index, "name", value)}
                    placeholder="Ex: Leads gerados, taxa de conversão, alcance, vendas..."
                  />
                </div>
                <div>
                  <FieldLabel>Tipo de indicador</FieldLabel>
                  <SelectField
                    value={indicator.type}
                    onChange={(value) => updateIndicator(index, "type", value)}
                    options={indicatorTypes}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Canal relacionado</FieldLabel>
                  <SelectField
                    value={indicator.channel}
                    onChange={(value) => updateIndicator(index, "channel", value)}
                    options={indicatorChannels}
                  />
                </div>
                <div>
                  <FieldLabel>Meta esperada</FieldLabel>
                  <InputField
                    value={indicator.goal}
                    onChange={(value) => updateIndicator(index, "goal", value)}
                    placeholder="Ex: 300 leads por mês, 5% de conversão, 20 vendas..."
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <FieldLabel>Frequência de análise</FieldLabel>
                  <SelectField
                    value={indicator.frequency}
                    onChange={(value) => updateIndicator(index, "frequency", value)}
                    options={analysisFrequencies}
                  />
                </div>
                <div>
                  <FieldLabel>Ferramenta de análise</FieldLabel>
                  <InputField
                    value={indicator.tool}
                    onChange={(value) => updateIndicator(index, "tool", value)}
                    placeholder="Ex: Meta Ads, Google Analytics, Search Console..."
                  />
                </div>
                <div>
                  <FieldLabel>Responsável</FieldLabel>
                  <InputField
                    value={indicator.responsible}
                    onChange={(value) => updateIndicator(index, "responsible", value)}
                    placeholder="Ex: Estrategista, gestor de tráfego, social media..."
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Como interpretar este indicador</FieldLabel>
                  <TextAreaField
                    value={indicator.interpretation}
                    onChange={(value) => updateIndicator(index, "interpretation", value)}
                    placeholder="Explique o que esse indicador mostra sobre a estratégia e como ele deve ser interpretado."
                    rows={5}
                  />
                </div>
                <div>
                  <FieldLabel>Decisão a partir do indicador</FieldLabel>
                  <TextAreaField
                    value={indicator.decisionCriteria}
                    onChange={(value) => updateIndicator(index, "decisionCriteria", value)}
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
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                    onChange={(value) => updateJourneyMetric(index, "stage", value)}
                    placeholder="Ex: Descoberta, relacionamento, captação..."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeJourneyMetric(index)}
                    disabled={isDisabled}
                    className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
                    onChange={(value) => updateJourneyMetric(index, "metrics", value)}
                    placeholder="Liste as métricas que devem ser acompanhadas nesta etapa."
                    rows={5}
                  />
                </div>
                <div>
                  <FieldLabel>Função dessas métricas</FieldLabel>
                  <TextAreaField
                    value={item.purpose}
                    onChange={(value) => updateJourneyMetric(index, "purpose", value)}
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
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                    onChange={(value) => updateChannelMetric(index, "channel", value)}
                    placeholder="Ex: Instagram, site, tráfego pago, WhatsApp..."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeChannelMetric(index)}
                    disabled={isDisabled}
                    className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
                    onChange={(value) => updateChannelMetric(index, "metrics", value)}
                    placeholder="Liste as métricas desse canal."
                    rows={5}
                  />
                </div>
                <div>
                  <FieldLabel>Ferramenta ou fonte de dados</FieldLabel>
                  <TextAreaField
                    value={item.tool}
                    onChange={(value) => updateChannelMetric(index, "tool", value)}
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
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                  onChange={(value) => updateTool(index, "purpose", value)}
                  placeholder="Explique para que essa ferramenta será usada."
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeTool(index)}
                  disabled={isDisabled}
                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
          onChange={(value) => updateField("analysisRoutine", value)}
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
          onChange={(value) => updateField("decisionCriteria", value)}
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
          onChange={(value) => updateField("reportingFormat", value)}
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
          onChange={(value) => updateField("strategicObservations", value)}
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
                  onChange={(value) => updateReference(index, "title", value)}
                  placeholder="Ex: Dashboard, relatório, planilha, Analytics, CRM..."
                />
              </div>
              <div>
                <FieldLabel>Link</FieldLabel>
                <input
                  type="url"
                  value={reference.link}
                  onChange={(e) => updateReference(index, "link", e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  disabled={isDisabled}
                  className="cursor-pointer rounded-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
          disabled={isDisabled}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Nova referência
        </button>
      </SectionCard>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/admin/planejamentos/${clientSlug}`}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Voltar para módulos
        </Link>

        <div className="flex gap-3">
          <Link
            href={presentationHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Ver apresentação
          </Link>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}
