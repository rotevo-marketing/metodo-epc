"use client";

import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type DistributionMaterial = {
  title: string;
  link: string;
};

export type DistributionChannelPlan = {
  channel: string;
  contentType: string;
  channelRole: string;
};

export type ContentDistributionCampaignData = {
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
  channelPlans: DistributionChannelPlan[];
  mainContent: string;
  possibleDerivations: string;
  distributionSequence: string;
  metrics: string;
  references: { title: string; link: string }[];
};

export const distributionCampaignTypes = [
  "Distribuição de conteúdo",
  "Aquecimento de audiência",
  "Impulsionamento de posts",
  "Visualizações de vídeo",
  "Engajamento",
  "Alcance qualificado",
  "Remarketing de conteúdo",
  "Distribuição de autoridade",
  "Outro",
];

export const distributionCampaignPhases = [
  "Teste inicial",
  "Validação",
  "Escala",
  "Remarketing",
  "Campanha contínua",
  "Pré-lançamento",
  "Aquecimento",
];

export const mediaObjectives = [
  "Alcance",
  "Engajamento",
  "Visualizações de vídeo",
  "Tráfego",
  "Reconhecimento",
  "Remarketing",
  "Crescimento de público",
];

export const distributionAudienceTemperatures = [
  "Frio",
  "Morno",
  "Quente",
  "Remarketing",
  "Engajados",
  "Seguidores",
  "Visitantes do site",
  "Base própria",
];

export const initialContentDistributionCampaignData: ContentDistributionCampaignData =
  {
    campaignType: "Distribuição de conteúdo",
    campaignPhase: "Teste inicial",
    mediaObjective: "Alcance",
    audienceTemperature: "Frio",
    recommendedChannels: "",
    budget: "",
    materials: [{ title: "", link: "" }],
    objective: "",
    audience: "",
    positioning: "",
    creativeDirection: "",
    strategicScenario: "",
    authorityContent: "",
    relationshipContent: "",
    indirectConversionContent: "",
    remarketingContent: "",
    channelPlans: [{ channel: "", contentType: "", channelRole: "" }],
    mainContent: "",
    possibleDerivations: "",
    distributionSequence: "",
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
  rows: _rows,
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
      <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

type CampanhaDistribuicaoConteudoFormProps = {
  data: ContentDistributionCampaignData;
  setData: Dispatch<SetStateAction<ContentDistributionCampaignData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function CampanhaDistribuicaoConteudoForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: CampanhaDistribuicaoConteudoFormProps) {
  function updateField(
    key: keyof ContentDistributionCampaignData,
    value: string
  ) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function updateMaterial(
    index: number,
    key: keyof DistributionMaterial,
    value: string
  ) {
    setData((current) => {
      const next = [...current.materials];
      next[index] = { ...next[index], [key]: value };
      return { ...current, materials: next };
    });
  }

  function addMaterial() {
    setData((current) => ({
      ...current,
      materials: [...current.materials, { title: "", link: "" }],
    }));
  }

  function removeMaterial(index: number) {
    setData((current) => ({
      ...current,
      materials:
        current.materials.length > 1
          ? current.materials.filter((_, i) => i !== index)
          : [{ title: "", link: "" }],
    }));
  }

  function updateChannelPlan(
    index: number,
    key: keyof DistributionChannelPlan,
    value: string
  ) {
    setData((current) => {
      const next = [...current.channelPlans];
      next[index] = { ...next[index], [key]: value };
      return { ...current, channelPlans: next };
    });
  }

  function addChannelPlan() {
    setData((current) => ({
      ...current,
      channelPlans: [
        ...current.channelPlans,
        { channel: "", contentType: "", channelRole: "" },
      ],
    }));
  }

  function removeChannelPlan(index: number) {
    setData((current) => ({
      ...current,
      channelPlans:
        current.channelPlans.length > 1
          ? current.channelPlans.filter((_, i) => i !== index)
          : [{ channel: "", contentType: "", channelRole: "" }],
    }));
  }

  function updateReference(
    index: number,
    key: "title" | "link",
    value: string
  ) {
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
    <div className="mt-6 space-y-6">
      <SectionCard
        title="Configuração estratégica da campanha"
        description="Defina o tipo da campanha, fase, objetivo de mídia, temperatura do público, canais recomendados e orçamento."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Tipo de campanha
            </label>

            <select
              value={data.campaignType}
              onChange={(event) =>
                updateField("campaignType", event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {distributionCampaignTypes.map((type) => (
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
              {distributionCampaignPhases.map((phase) => (
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
              value={data.mediaObjective}
              onChange={(event) =>
                updateField("mediaObjective", event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              {mediaObjectives.map((objective) => (
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
              {distributionAudienceTemperatures.map((temperature) => (
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
            placeholder="Ex: Instagram e TikTok para alcance e engajamento, YouTube para autoridade, LinkedIn para B2B, Google Display para remarketing."
            onChange={(value) => updateField("recommendedChannels", value)}
          />

          <TextAreaField
            label="Orçamento recomendado"
            value={data.budget}
            placeholder="Ex: R$ 30 por dia durante 10 dias, verba mensal de R$ 1.500 ou impulsionamento pontual dos melhores conteúdos."
            onChange={(value) => updateField("budget", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Materiais e conteúdos para distribuição"
        description="Liste os conteúdos, links ou materiais que podem ser direcionados nos anúncios dessa etapa."
      >
        <div className="space-y-4">
          {data.materials.map((material, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Material ou conteúdo
                </label>

                <input
                  type="text"
                  value={material.title}
                  onChange={(event) =>
                    updateMaterial(index, "title", event.target.value)
                  }
                  placeholder="Ex: Post, Reels, vídeo, blog, live, podcast, carrossel, case ou página."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Link de destino
                </label>

                <input
                  type="url"
                  value={material.link}
                  onChange={(event) =>
                    updateMaterial(index, "link", event.target.value)
                  }
                  placeholder="https://..."
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
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo material
        </button>
      </SectionCard>

      <SectionCard
        title="Estratégia da campanha"
        description="Defina objetivo, público, posicionamento, criativos e cenário estratégico da distribuição de conteúdo."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Objetivo da campanha"
            value={data.objective}
            rows={6}
            placeholder="Ex: Ampliar alcance, aumentar visualizações, gerar tráfego para conteúdo, fortalecer autoridade, aquecer audiência ou reaproveitar conteúdos estratégicos."
            onChange={(value) => updateField("objective", value)}
          />

          <TextAreaField
            label="Público"
            value={data.audience}
            rows={6}
            placeholder="Ex: Público frio, engajados do Instagram, visitantes do site, lista de leads, seguidores, públicos semelhantes ou interesses específicos."
            onChange={(value) => updateField("audience", value)}
          />

          <TextAreaField
            label="Posicionamento"
            value={data.positioning}
            rows={6}
            placeholder="Ex: Como o conteúdo deve ser apresentado, qual ângulo será usado e como ele deve reforçar autoridade, clareza ou desejo."
            onChange={(value) => updateField("positioning", value)}
          />

          <TextAreaField
            label="Direção dos criativos"
            value={data.creativeDirection}
            rows={6}
            placeholder="Ex: Cortes de vídeos, carrosséis, posts educativos, imagens com frases fortes, trechos de lives, prints, chamadas de blog ou bastidores."
            onChange={(value) => updateField("creativeDirection", value)}
          />
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Cenário estratégico"
            value={data.strategicScenario}
            rows={7}
            placeholder="Ex: Impulsionar conteúdos com bom desempenho orgânico, aquecer audiência antes de uma campanha de venda, distribuir prova social ou reforçar autoridade em temas estratégicos."
            onChange={(value) => updateField("strategicScenario", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Conteúdos prioritários para distribuição"
        description="Defina quais conteúdos merecem maior investimento, quais devem ser testados e quais devem ser reaproveitados em outros formatos."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Conteúdos de autoridade"
            value={data.authorityContent}
            rows={6}
            placeholder="Ex: Conteúdos educativos, provas de conhecimento, análises, bastidores técnicos, vídeos explicativos ou posts de opinião."
            onChange={(value) => updateField("authorityContent", value)}
          />

          <TextAreaField
            label="Conteúdos de relacionamento"
            value={data.relationshipContent}
            rows={6}
            placeholder="Ex: Bastidores, histórias, posts pessoais, rotina, crenças, valores, trajetória e conteúdos de conexão."
            onChange={(value) => updateField("relationshipContent", value)}
          />

          <TextAreaField
            label="Conteúdos de conversão indireta"
            value={data.indirectConversionContent}
            rows={6}
            placeholder="Ex: Provas sociais, estudos de caso, antes e depois, resultados, objeções quebradas e posts que preparam para oferta."
            onChange={(value) =>
              updateField("indirectConversionContent", value)
            }
          />

          <TextAreaField
            label="Conteúdos para remarketing"
            value={data.remarketingContent}
            rows={6}
            placeholder="Ex: Conteúdos para pessoas que engajaram, visitaram página, assistiram vídeo, baixaram material ou já conhecem a marca."
            onChange={(value) => updateField("remarketingContent", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Plano de distribuição por canal"
        description="Organize onde cada conteúdo será distribuído e qual será o papel de cada canal na estratégia."
      >
        <div className="space-y-4">
          {data.channelPlans.map((plan, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Canal
                </label>

                <input
                  type="text"
                  value={plan.channel}
                  onChange={(event) =>
                    updateChannelPlan(index, "channel", event.target.value)
                  }
                  placeholder="Ex: Instagram"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Tipo de conteúdo
                </label>

                <input
                  type="text"
                  value={plan.contentType}
                  onChange={(event) =>
                    updateChannelPlan(index, "contentType", event.target.value)
                  }
                  placeholder="Ex: Reels, carrossel, vídeo, blog"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Papel do canal
                </label>

                <input
                  type="text"
                  value={plan.channelRole}
                  onChange={(event) =>
                    updateChannelPlan(index, "channelRole", event.target.value)
                  }
                  placeholder="Ex: Alcance, autoridade, tráfego"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeChannelPlan(index)}
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
          onClick={addChannelPlan}
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
        >
          + Novo canal
        </button>
      </SectionCard>

      <SectionCard
        title="Reaproveitamento de conteúdo"
        description="Defina como um conteúdo principal pode ser transformado em vários formatos para ampliar seu uso."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField
            label="Conteúdo principal"
            value={data.mainContent}
            rows={6}
            placeholder="Ex: Live, vídeo longo, artigo, podcast, aula, estudo de caso ou conteúdo de lançamento."
            onChange={(value) => updateField("mainContent", value)}
          />

          <TextAreaField
            label="Derivações possíveis"
            value={data.possibleDerivations}
            rows={6}
            placeholder="Ex: Cortes, carrosséis, posts curtos, stories, e-mail, artigo, WhatsApp, Shorts, Reels, TikTok ou material educativo."
            onChange={(value) => updateField("possibleDerivations", value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Sequência de distribuição"
        description="Organize a ordem em que os conteúdos serão distribuídos para gerar continuidade e não publicar tudo de forma desconectada."
      >
        <TextAreaField
          label=""
          value={data.distributionSequence}
          rows={8}
          placeholder="Ex: Publicar conteúdo principal, depois corte curto, depois carrossel com resumo, depois stories com bastidores, depois WhatsApp com link, depois remarketing para engajados."
          onChange={(value) => updateField("distributionSequence", value)}
        />
      </SectionCard>

      <SectionCard
        title="Métricas da campanha"
        description="Defina os indicadores que devem ser acompanhados para avaliar o desempenho da distribuição."
      >
        <TextAreaField
          label=""
          value={data.metrics}
          rows={8}
          placeholder="Ex: Alcance, impressões, visualizações, retenção, cliques, custo por clique, engajamento, salvamentos, compartilhamentos, comentários, visitas ao site e crescimento da audiência."
          onChange={(value) => updateField("metrics", value)}
        />
      </SectionCard>

      <SectionCard
        title="Anexos e referências externas"
        description="Referências externas são opcionais, mas ajudam quem está visualizando o planejamento a entender melhor a campanha de distribuição de conteúdo."
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
                  placeholder="Ex: Conteúdo, anúncio, post, vídeo, campanha, link ou referência"
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
          className="mt-5 cursor-pointer rounded-full border border-[#c79e40]/20 bg-[#c79e40]/10 px-5 py-3 text-sm font-semibold text-[#c79e40] transition-colors hover:bg-[#c79e40] hover:border-[#c79e40] hover:text-black"
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
