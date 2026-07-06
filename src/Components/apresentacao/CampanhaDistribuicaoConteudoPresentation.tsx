import { PresentationHeader } from "./PresentationHeader";
import {
  ExternalRefList,
  FieldBlock,
  SectionCard,
  EmptyState,
} from "./ChannelPresentationShared";

type DistributionMaterial = { title: string; link: string };
type ChannelPlan = { channel: string; contentType: string; channelRole: string };
type Ref = { title: string; link: string };

type ContentDistributionCampaignData = {
  campaignType: string;
  campaignPhase: string;
  mediaObjective: string;
  audienceTemperature: string;
  recommendedChannels: string;
  budget: string;
  materials: DistributionMaterial[];
  objective: string;
  audience: string;
  positioning: string;
  creativeDirection: string;
  strategicScenario: string;
  authorityContent: string;
  relationshipContent: string;
  indirectConversionContent: string;
  remarketingContent: string;
  channelPlans: ChannelPlan[];
  mainContent: string;
  possibleDerivations: string;
  distributionSequence: string;
  metrics: string;
  references: Ref[];
};

function isDistributionData(v: unknown): v is ContentDistributionCampaignData {
  return typeof v === "object" && v !== null && "mediaObjective" in v;
}

function Badge({ label }: { label: string }) {
  if (!label) return null;
  return (
    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
      {label}
    </span>
  );
}

export default function CampanhaDistribuicaoConteudoPresentation({ data }: { data: unknown }) {
  const d = isDistributionData(data) ? data : null;
  const filledMaterials = (d?.materials ?? []).filter((m) => m.title?.trim());
  const filledChannelPlans = (d?.channelPlans ?? []).filter((p) => p.channel?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Campanhas, Automações e Conversão"
        title="Campanha de Distribuição de Conteúdo"
        slug="campanha-distribuicao-de-conteudo"
      />

      {(d?.campaignType || d?.campaignPhase || d?.mediaObjective || d?.audienceTemperature) && (
        <SectionCard title="Configuração estratégica">
          <div className="flex flex-wrap gap-2">
            <Badge label={d?.campaignType ?? ""} />
            <Badge label={d?.campaignPhase ?? ""} />
            <Badge label={d?.mediaObjective ?? ""} />
            <Badge label={d?.audienceTemperature ?? ""} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FieldBlock label="Canais recomendados" value={d?.recommendedChannels ?? ""} />
            <FieldBlock label="Orçamento recomendado" value={d?.budget ?? ""} />
          </div>
        </SectionCard>
      )}

      {filledMaterials.length > 0 && (
        <SectionCard title="Materiais e conteúdos para distribuição">
          <div className="space-y-2">
            {filledMaterials.map((m, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                {m.link ? (
                  <a
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    {m.title || m.link}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-slate-950">{m.title}</span>
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

      {(d?.authorityContent || d?.relationshipContent || d?.indirectConversionContent || d?.remarketingContent) && (
        <SectionCard title="Conteúdos prioritários para distribuição">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Conteúdos de autoridade" value={d?.authorityContent ?? ""} />
            <FieldBlock label="Conteúdos de relacionamento" value={d?.relationshipContent ?? ""} />
            <FieldBlock label="Conteúdos de conversão indireta" value={d?.indirectConversionContent ?? ""} />
            <FieldBlock label="Conteúdos para remarketing" value={d?.remarketingContent ?? ""} />
          </div>
        </SectionCard>
      )}

      {filledChannelPlans.length > 0 && (
        <SectionCard title="Plano de distribuição por canal">
          <div className="space-y-2">
            {filledChannelPlans.map((plan, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-950">{plan.channel}</span>
                  {plan.contentType && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                      {plan.contentType}
                    </span>
                  )}
                  {plan.channelRole && (
                    <span className="text-xs text-slate-500">{plan.channelRole}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {(d?.mainContent || d?.possibleDerivations) && (
        <SectionCard title="Reaproveitamento de conteúdo">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldBlock label="Conteúdo principal" value={d?.mainContent ?? ""} />
            <FieldBlock label="Derivações possíveis" value={d?.possibleDerivations ?? ""} />
          </div>
        </SectionCard>
      )}

      {d?.distributionSequence && (
        <SectionCard title="Sequência de distribuição">
          <FieldBlock label="Sequência" value={d.distributionSequence} />
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
