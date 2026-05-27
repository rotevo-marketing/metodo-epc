"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type LeadCaptureCampaignMaterial = {
  title: string;
  type: string;
};

export type LeadCaptureCampaignReference = {
  title: string;
  link: string;
};

export type LeadCaptureCampaignData = {
  campaignType: string;
  campaignPhase: string;
  trafficObjective: string;
  audienceTemperature: string;
  recommendedChannels: string;
  budget: string;
  materials: LeadCaptureCampaignMaterial[];
  objective: string;
  audience: string;
  positioning: string;
  creativeDirection: string;
  strategicScenario: string;
  offerPromise: string;
  perceivedBenefit: string;
  mainCall: string;
  offerName: string;
  pageHeadline: string;
  pageArgument: string;
  formFields: string;
  pageCta: string;
  nextStepAfterSignup: string;
  qualificationCriteria: string;
  initialNurturingSequence: string;
  metrics: string;
  references: LeadCaptureCampaignReference[];
};

export const leadCaptureCampaignTypes = [
  "Captação direta",
  "Lista de espera",
  "Material rico",
  "Aula gratuita",
  "Webinário",
  "Diagnóstico",
  "Evento online",
  "Teste de oferta",
  "Outro",
];

export const leadCaptureCampaignPhases = [
  "Teste inicial",
  "Validação",
  "Escala",
  "Remarketing",
  "Lançamento",
  "Campanha contínua",
];

export const leadCaptureTrafficObjectives = [
  "Leads",
  "Conversões",
  "Tráfego qualificado",
  "Engajamento",
  "Visualização de vídeo",
  "Mensagens",
  "Reconhecimento",
];

export const leadCaptureAudienceTemperatures = [
  "Frio",
  "Morno",
  "Quente",
  "Remarketing",
  "Base própria",
  "Lookalike",
];

export const initialLeadCaptureCampaignData: LeadCaptureCampaignData = {
  campaignType: "Captação direta",
  campaignPhase: "Teste inicial",
  trafficObjective: "Leads",
  audienceTemperature: "Frio",
  recommendedChannels: "",
  budget: "",
  materials: [{ title: "", type: "" }],
  objective: "",
  audience: "",
  positioning: "",
  creativeDirection: "",
  strategicScenario: "",
  offerPromise: "",
  perceivedBenefit: "",
  mainCall: "",
  offerName: "",
  pageHeadline: "",
  pageArgument: "",
  formFields: "",
  pageCta: "",
  nextStepAfterSignup: "",
  qualificationCriteria: "",
  initialNurturingSequence: "",
  metrics: "",
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
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>

        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  rows = 5,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />
    </div>
  );
}

type CampanhaCaptacaoLeadFormProps = {
  data: LeadCaptureCampaignData;
  setData: Dispatch<SetStateAction<LeadCaptureCampaignData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function CampanhaCaptacaoLeadForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: CampanhaCaptacaoLeadFormProps) {
  function updateField(key: keyof LeadCaptureCampaignData, value: string) {
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateMaterial(
    index: number,
    key: keyof LeadCaptureCampaignMaterial,
    value: string
  ) {
    setData((current) => {
      const nextMaterials = [...current.materials];

      nextMaterials[index] = {
        ...nextMaterials[index],
        [key]: value,
      };

      return {
        ...current,
        materials: nextMaterials,
      };
    });
  }

  function addMaterial() {
    setData((current) => ({
      ...current,
      materials: [...current.materials, { title: "", type: "" }],
    }));
  }

  function removeMaterial(index: number) {
    setData((current) => ({
      ...current,
      materials:
        current.materials.length > 1
          ? current.materials.filter(
              (_, materialIndex) => materialIndex !== index
            )
          : [{ title: "", type: "" }],
    }));
  }

  function updateReference(
    index: number,
    key: keyof LeadCaptureCampaignReference,
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

  return (
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Configuração estratégica da campanha"
        description="Defina o tipo de campanha, fase, objetivo de mídia e temperatura do público. Essas informações ajudam a orientar canais, criativos e verba."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Tipo de campanha
            </label>

            <select
              value={data.campaignType}
              onChange={(event) => updateField("campaignType", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {leadCaptureCampaignTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Fase da campanha
            </label>

            <select
              value={data.campaignPhase}
              onChange={(event) =>
                updateField("campaignPhase", event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {leadCaptureCampaignPhases.map((phase) => (
                <option key={phase} value={phase}>
                  {phase}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Objetivo de mídia
            </label>

            <select
              value={data.trafficObjective}
              onChange={(event) =>
                updateField("trafficObjective", event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {leadCaptureTrafficObjectives.map((objective) => (
                <option key={objective} value={objective}>
                  {objective}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Temperatura do público
            </label>

            <select
              value={data.audienceTemperature}
              onChange={(event) =>
                updateField("audienceTemperature", event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {leadCaptureAudienceTemperatures.map((temperature) => (
                <option key={temperature} value={temperature}>
                  {temperature}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Canais recomendados"
            value={data.recommendedChannels}
            placeholder="Ex: Meta Ads para captação inicial, Google para intenção ativa, YouTube para aquecimento, LinkedIn apenas se houver B2B."
            onChange={(value) => updateField("recommendedChannels", value)}
          />

          <TextAreaField
            label="Orçamento recomendado"
            value={data.budget}
            placeholder="Ex: R$ 50 por dia durante 15 dias, verba mensal de R$ 2.000 ou verba inicial de teste por conjunto de anúncios."
            onChange={(value) => updateField("budget", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Materiais possíveis"
        description="Liste os materiais educativos, iscas ou ativos que podem ser usados para captar leads."
      >
        <div className="space-y-4">
          {data.materials.map((material, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_220px_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Material
                </label>

                <input
                  type="text"
                  value={material.title}
                  onChange={(event) =>
                    updateMaterial(index, "title", event.target.value)
                  }
                  placeholder="Ex: E-book, checklist, aula gratuita, planilha, diagnóstico, guia ou webinário"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Tipo
                </label>

                <input
                  type="text"
                  value={material.type}
                  onChange={(event) =>
                    updateMaterial(index, "type", event.target.value)
                  }
                  placeholder="Ex: PDF, vídeo, formulário"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
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
          onClick={addMaterial}
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + Novo material
        </button>
      </SectionCard>

      <SectionCard
        title="Estratégia da campanha"
        description="Descreva objetivo, público, posicionamento, direção dos criativos e cenário estratégico."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Objetivo da campanha"
            value={data.objective}
            rows={6}
            placeholder="Ex: Captar leads qualificados, gerar lista para lançamento, aumentar base de contatos ou atrair interessados para uma oferta específica."
            onChange={(value) => updateField("objective", value)}
          />

          <TextAreaField
            label="Público"
            value={data.audience}
            rows={6}
            placeholder="Ex: Interesses, localização, idade, profissão, comportamento, públicos personalizados, lista de clientes ou visitantes do site."
            onChange={(value) => updateField("audience", value)}
          />

          <TextAreaField
            label="Posicionamento"
            value={data.positioning}
            rows={6}
            placeholder="Ex: Como a oferta será apresentada, qual ângulo será usado e como ela será percebida pelo público."
            onChange={(value) => updateField("positioning", value)}
          />

          <TextAreaField
            label="Direção dos criativos"
            value={data.creativeDirection}
            rows={6}
            placeholder="Ex: Criativos com dor, promessa, prova, demonstração, bastidor, antes e depois, depoimento ou comparação."
            onChange={(value) => updateField("creativeDirection", value)}
          />
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Cenário estratégico"
            value={data.strategicScenario}
            rows={7}
            placeholder="Ex: O que será testado, quais públicos serão priorizados, quais hipóteses serão avaliadas e quais decisões poderão ser tomadas após a campanha."
            onChange={(value) => updateField("strategicScenario", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Oferta principal da campanha"
        description="Defina a promessa, o benefício percebido, a chamada principal e o nome da oferta ou isca."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Promessa da oferta"
            value={data.offerPromise}
            placeholder="Ex: Aprenda como organizar sua estratégia de conteúdo em 7 dias."
            onChange={(value) => updateField("offerPromise", value)}
          />

          <TextAreaField
            label="Benefício percebido"
            value={data.perceivedBenefit}
            placeholder="Ex: Clareza, economia de tempo, diagnóstico, plano de ação, organização, segurança para decidir."
            onChange={(value) => updateField("perceivedBenefit", value)}
          />

          <TextAreaField
            label="Chamada principal"
            value={data.mainCall}
            placeholder="Ex: Baixe o guia gratuito, faça seu diagnóstico, entre na lista ou receba o material."
            onChange={(value) => updateField("mainCall", value)}
          />

          <TextAreaField
            label="Nome da oferta"
            value={data.offerName}
            placeholder="Ex: Checklist da Estratégia, Mapa do Conteúdo, Aula gratuita ou Diagnóstico Express."
            onChange={(value) => updateField("offerName", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Página de captura"
        description="Organize os elementos necessários para a landing page ou página de captura da campanha."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Headline da página"
            value={data.pageHeadline}
            placeholder="Escreva ou descreva a chamada principal da página de captura."
            onChange={(value) => updateField("pageHeadline", value)}
          />

          <TextAreaField
            label="Argumento da página"
            value={data.pageArgument}
            placeholder="Liste os principais argumentos, benefícios, dores, provas ou motivos para cadastro."
            onChange={(value) => updateField("pageArgument", value)}
          />

          <TextAreaField
            label="Campos do formulário"
            value={data.formFields}
            placeholder="Ex: Nome, e-mail, WhatsApp, empresa, cargo, faturamento ou principal desafio."
            onChange={(value) => updateField("formFields", value)}
          />

          <TextAreaField
            label="CTA da página"
            value={data.pageCta}
            placeholder="Ex: Quero receber o material, fazer diagnóstico, acessar aula ou entrar na lista."
            onChange={(value) => updateField("pageCta", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Pós-cadastro e qualificação do lead"
        description="Defina o que acontece depois que a pessoa se cadastra e como identificar se o lead é qualificado."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Próxima ação após cadastro"
            value={data.nextStepAfterSignup}
            placeholder="Ex: Página de obrigado, envio por e-mail, redirecionamento para WhatsApp, convite para reunião ou entrada em fluxo de nutrição."
            onChange={(value) => updateField("nextStepAfterSignup", value)}
          />

          <TextAreaField
            label="Critérios de qualificação"
            value={data.qualificationCriteria}
            placeholder="Ex: Cargo, interesse, dor declarada, orçamento, urgência, perfil de cliente ideal ou resposta no formulário."
            onChange={(value) => updateField("qualificationCriteria", value)}
          />
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Sequência de nutrição inicial"
            value={data.initialNurturingSequence}
            rows={7}
            placeholder="Descreva as primeiras mensagens ou e-mails após a conversão: entrega do material, conteúdo complementar, prova social, convite e chamada para ação."
            onChange={(value) => updateField("initialNurturingSequence", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Métricas da campanha"
        description="Defina os indicadores que devem ser acompanhados para avaliar o desempenho da campanha."
      >
        <textarea
          rows={7}
          value={data.metrics}
          onChange={(event) => updateField("metrics", event.target.value)}
          placeholder="Ex: Custo por lead, taxa de conversão da página, CTR, CPM, CPC, taxa de abertura, taxa de resposta, leads qualificados e vendas geradas."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a campanha de captação de leads."
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
                  placeholder="Ex: Landing page, anúncio, material, formulário, campanha ou referência"
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
        >
          + Nova referência
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