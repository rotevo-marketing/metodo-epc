import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  ModuleHeader,
  EmptyState,
} from "./ChannelPresentationShared";

type Material = { title: string; type: string };
type Ref = { title: string; link: string };

type LeadCaptureCampaignData = {
  campaignType: string;
  campaignPhase: string;
  trafficObjective: string;
  audienceTemperature: string;
  recommendedChannels: string;
  budget: string;
  materials: Material[];
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
  references: Ref[];
};

function isLeadCaptureData(v: unknown): v is LeadCaptureCampaignData {
  return typeof v === "object" && v !== null && "campaignType" in v;
}

function Badge({ label }: { label: string }) {
  if (!label) return null;
  return (
    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
      {label}
    </span>
  );
}

export default function CampanhaCaptacaoLeadPresentation({ data }: { data: unknown }) {
  const d = isLeadCaptureData(data) ? data : null;
  const filledMaterials = (d?.materials ?? []).filter((m) => m.title?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <ModuleHeader
        slug="campanha-captacao-de-lead"
        group="Campanhas, Automações e Conversão"
        title="Campanha de Captação de Lead"
        description="Estratégia de mídia paga para captação de leads: tipo, fase, oferta, página de captura, qualificação e métricas."
      />

      {(d?.campaignType || d?.campaignPhase || d?.trafficObjective || d?.audienceTemperature) && (
        <SectionCard title="Configuração estratégica">
          <div className="flex flex-wrap gap-2">
            <Badge label={d?.campaignType ?? ""} />
            <Badge label={d?.campaignPhase ?? ""} />
            <Badge label={d?.trafficObjective ?? ""} />
            <Badge label={d?.audienceTemperature ?? ""} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FieldBlock label="Canais recomendados" value={d?.recommendedChannels ?? ""} />
            <FieldBlock label="Orçamento recomendado" value={d?.budget ?? ""} />
          </div>
        </SectionCard>
      )}

      {filledMaterials.length > 0 && (
        <SectionCard title="Materiais possíveis">
          <div className="space-y-2">
            {filledMaterials.map((m, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                <span className="text-sm font-medium text-slate-950">{m.title}</span>
                {m.type && (
                  <span className="text-xs text-slate-400">{m.type}</span>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {(d?.objective || d?.audience || d?.positioning || d?.creativeDirection || d?.strategicScenario) && (
        <SectionCard title="Estratégia da campanha">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Objetivo" value={d?.objective ?? ""} />
            <FieldBlock label="Público" value={d?.audience ?? ""} />
            <FieldBlock label="Posicionamento" value={d?.positioning ?? ""} />
            <FieldBlock label="Direção dos criativos" value={d?.creativeDirection ?? ""} />
          </div>
          {d?.strategicScenario && (
            <div className="mt-4">
              <FieldBlock label="Cenário estratégico" value={d.strategicScenario} />
            </div>
          )}
        </SectionCard>
      )}

      {(d?.offerPromise || d?.perceivedBenefit || d?.mainCall || d?.offerName) && (
        <SectionCard title="Oferta principal">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Promessa da oferta" value={d?.offerPromise ?? ""} />
            <FieldBlock label="Benefício percebido" value={d?.perceivedBenefit ?? ""} />
            <FieldBlock label="Chamada principal" value={d?.mainCall ?? ""} />
            <FieldBlock label="Nome da oferta" value={d?.offerName ?? ""} />
          </div>
        </SectionCard>
      )}

      {(d?.pageHeadline || d?.pageArgument || d?.formFields || d?.pageCta) && (
        <SectionCard title="Página de captura">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Headline da página" value={d?.pageHeadline ?? ""} />
            <FieldBlock label="Argumento da página" value={d?.pageArgument ?? ""} />
            <FieldBlock label="Campos do formulário" value={d?.formFields ?? ""} />
            <FieldBlock label="CTA da página" value={d?.pageCta ?? ""} />
          </div>
        </SectionCard>
      )}

      {(d?.nextStepAfterSignup || d?.qualificationCriteria || d?.initialNurturingSequence) && (
        <SectionCard title="Pós-cadastro e qualificação">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Próxima ação após cadastro" value={d?.nextStepAfterSignup ?? ""} />
            <FieldBlock label="Critérios de qualificação" value={d?.qualificationCriteria ?? ""} />
          </div>
          {d?.initialNurturingSequence && (
            <div className="mt-4">
              <FieldBlock label="Sequência de nutrição inicial" value={d.initialNurturingSequence} />
            </div>
          )}
        </SectionCard>
      )}

      {d?.metrics && (
        <SectionCard title="Métricas da campanha">
          <FieldBlock label="Indicadores" value={d.metrics} />
        </SectionCard>
      )}

      {d?.references?.some((r) => r.title?.trim() || r.link?.trim()) && (
        <SectionCard title="Referências externas">
          <ExternalRefList refs={d.references} />
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
