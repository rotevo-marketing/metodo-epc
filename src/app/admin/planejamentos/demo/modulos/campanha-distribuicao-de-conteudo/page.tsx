"use client";

import { useEffect, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";

const STORAGE_KEY = "metodo-epc-demo-campanha-distribuicao-de-conteudo";

type DistributionMaterial = {
  title: string;
  link: string;
};

type DistributionChannelPlan = {
  channel: string;
  contentType: string;
  channelRole: string;
};

type ExternalReference = {
  title: string;
  link: string;
};

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
  channelPlans: DistributionChannelPlan[];
  mainContent: string;
  possibleDerivations: string;
  distributionSequence: string;
  metrics: string;
  references: ExternalReference[];
};

const campaignTypes = [
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

const campaignPhases = [
  "Teste inicial",
  "Validação",
  "Escala",
  "Remarketing",
  "Campanha contínua",
  "Pré-lançamento",
  "Aquecimento",
];

const mediaObjectives = [
  "Alcance",
  "Engajamento",
  "Visualizações de vídeo",
  "Tráfego",
  "Reconhecimento",
  "Remarketing",
  "Crescimento de público",
];

const audienceTemperatures = [
  "Frio",
  "Morno",
  "Quente",
  "Remarketing",
  "Engajados",
  "Seguidores",
  "Visitantes do site",
  "Base própria",
];

const initialData: ContentDistributionCampaignData = {
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
                  const isActive =
                    module.slug === "campanha-distribuicao-de-conteudo";

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
  children: React.ReactNode;
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

export default function CampanhaDistribuicaoDeConteudoPage() {
  const [data, setData] =
    useState<ContentDistributionCampaignData>(initialData);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setData({
        campaignType: parsed.campaignType || "Distribuição de conteúdo",
        campaignPhase: parsed.campaignPhase || "Teste inicial",
        mediaObjective: parsed.mediaObjective || "Alcance",
        audienceTemperature: parsed.audienceTemperature || "Frio",
        recommendedChannels: parsed.recommendedChannels || "",
        budget: parsed.budget || "",
        materials:
          Array.isArray(parsed.materials) && parsed.materials.length
            ? parsed.materials.map((material: Partial<DistributionMaterial>) => ({
                title: material.title || "",
                link: material.link || "",
              }))
            : [{ title: "", link: "" }],
        objective: parsed.objective || "",
        audience: parsed.audience || "",
        positioning: parsed.positioning || "",
        creativeDirection: parsed.creativeDirection || "",
        strategicScenario: parsed.strategicScenario || "",
        authorityContent: parsed.authorityContent || "",
        relationshipContent: parsed.relationshipContent || "",
        indirectConversionContent: parsed.indirectConversionContent || "",
        remarketingContent: parsed.remarketingContent || "",
        channelPlans:
          Array.isArray(parsed.channelPlans) && parsed.channelPlans.length
            ? parsed.channelPlans.map(
                (plan: Partial<DistributionChannelPlan>) => ({
                  channel: plan.channel || "",
                  contentType: plan.contentType || "",
                  channelRole: plan.channelRole || "",
                })
              )
            : [{ channel: "", contentType: "", channelRole: "" }],
        mainContent: parsed.mainContent || "",
        possibleDerivations: parsed.possibleDerivations || "",
        distributionSequence: parsed.distributionSequence || "",
        metrics: parsed.metrics || "",
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

  function updateMaterial(
    index: number,
    key: keyof DistributionMaterial,
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
      materials: [...current.materials, { title: "", link: "" }],
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
          : [{ title: "", link: "" }],
    }));
  }

  function updateChannelPlan(
    index: number,
    key: keyof DistributionChannelPlan,
    value: string
  ) {
    setData((current) => {
      const nextPlans = [...current.channelPlans];

      nextPlans[index] = {
        ...nextPlans[index],
        [key]: value,
      };

      return {
        ...current,
        channelPlans: nextPlans,
      };
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
          ? current.channelPlans.filter((_, planIndex) => planIndex !== index)
          : [{ channel: "", contentType: "", channelRole: "" }],
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
                Campanha de Distribuição de Conteúdo
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Planeje campanhas para distribuir conteúdos estratégicos,
                ampliar alcance, gerar tráfego, reforçar autoridade, aquecer
                públicos e reaproveitar conteúdos importantes.
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
                      setData((current) => ({
                        ...current,
                        campaignType: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {campaignTypes.map((type) => (
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
                      setData((current) => ({
                        ...current,
                        campaignPhase: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {campaignPhases.map((phase) => (
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
                      setData((current) => ({
                        ...current,
                        mediaObjective: event.target.value,
                      }))
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
                      setData((current) => ({
                        ...current,
                        audienceTemperature: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {audienceTemperatures.map((temperature) => (
                      <option key={temperature} value={temperature}>
                        {temperature}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Canais recomendados
                  </label>

                  <textarea
                    rows={5}
                    value={data.recommendedChannels}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        recommendedChannels: event.target.value,
                      }))
                    }
                    placeholder="Ex: Instagram e TikTok para alcance e engajamento, YouTube para autoridade, LinkedIn para B2B, Google Display para remarketing."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Orçamento recomendado
                  </label>

                  <textarea
                    rows={5}
                    value={data.budget}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        budget: event.target.value,
                      }))
                    }
                    placeholder="Ex: R$ 30 por dia durante 10 dias, verba mensal de R$ 1.500 ou impulsionamento pontual dos melhores conteúdos."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
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
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
              >
                + Novo material
              </button>
            </SectionCard>

            <SectionCard
              title="Estratégia da campanha"
              description="Defina objetivo, público, posicionamento, criativos e cenário estratégico da distribuição de conteúdo."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Objetivo da campanha
                  </label>

                  <textarea
                    rows={6}
                    value={data.objective}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        objective: event.target.value,
                      }))
                    }
                    placeholder="Ex: Ampliar alcance, aumentar visualizações, gerar tráfego para conteúdo, fortalecer autoridade, aquecer audiência ou reaproveitar conteúdos estratégicos."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Público
                  </label>

                  <textarea
                    rows={6}
                    value={data.audience}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        audience: event.target.value,
                      }))
                    }
                    placeholder="Ex: Público frio, engajados do Instagram, visitantes do site, lista de leads, seguidores, públicos semelhantes ou interesses específicos."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Posicionamento
                  </label>

                  <textarea
                    rows={6}
                    value={data.positioning}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        positioning: event.target.value,
                      }))
                    }
                    placeholder="Ex: Como o conteúdo deve ser apresentado, qual ângulo será usado e como ele deve reforçar autoridade, clareza ou desejo."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Direção dos criativos
                  </label>

                  <textarea
                    rows={6}
                    value={data.creativeDirection}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        creativeDirection: event.target.value,
                      }))
                    }
                    placeholder="Ex: Cortes de vídeos, carrosséis, posts educativos, imagens com frases fortes, trechos de lives, prints, chamadas de blog ou bastidores."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Cenário estratégico
                </label>

                <textarea
                  rows={7}
                  value={data.strategicScenario}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      strategicScenario: event.target.value,
                    }))
                  }
                  placeholder="Ex: Impulsionar conteúdos com bom desempenho orgânico, aquecer audiência antes de uma campanha de venda, distribuir prova social ou reforçar autoridade em temas estratégicos."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Conteúdos prioritários para distribuição"
              description="Defina quais conteúdos merecem maior investimento, quais devem ser testados e quais devem ser reaproveitados em outros formatos."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdos de autoridade
                  </label>

                  <textarea
                    rows={6}
                    value={data.authorityContent}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        authorityContent: event.target.value,
                      }))
                    }
                    placeholder="Ex: Conteúdos educativos, provas de conhecimento, análises, bastidores técnicos, vídeos explicativos ou posts de opinião."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdos de relacionamento
                  </label>

                  <textarea
                    rows={6}
                    value={data.relationshipContent}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        relationshipContent: event.target.value,
                      }))
                    }
                    placeholder="Ex: Bastidores, histórias, posts pessoais, rotina, crenças, valores, trajetória e conteúdos de conexão."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdos de conversão indireta
                  </label>

                  <textarea
                    rows={6}
                    value={data.indirectConversionContent}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        indirectConversionContent: event.target.value,
                      }))
                    }
                    placeholder="Ex: Provas sociais, estudos de caso, antes e depois, resultados, objeções quebradas e posts que preparam para oferta."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdos para remarketing
                  </label>

                  <textarea
                    rows={6}
                    value={data.remarketingContent}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        remarketingContent: event.target.value,
                      }))
                    }
                    placeholder="Ex: Conteúdos para pessoas que engajaram, visitaram página, assistiram vídeo, baixaram material ou já conhecem a marca."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
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
                          updateChannelPlan(
                            index,
                            "contentType",
                            event.target.value
                          )
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
                          updateChannelPlan(
                            index,
                            "channelRole",
                            event.target.value
                          )
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
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
              >
                + Novo canal
              </button>
            </SectionCard>

            <SectionCard
              title="Reaproveitamento de conteúdo"
              description="Defina como um conteúdo principal pode ser transformado em vários formatos para ampliar seu uso."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Conteúdo principal
                  </label>

                  <textarea
                    rows={6}
                    value={data.mainContent}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        mainContent: event.target.value,
                      }))
                    }
                    placeholder="Ex: Live, vídeo longo, artigo, podcast, aula, estudo de caso ou conteúdo de lançamento."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Derivações possíveis
                  </label>

                  <textarea
                    rows={6}
                    value={data.possibleDerivations}
                    onChange={(event) =>
                      setData((current) => ({
                        ...current,
                        possibleDerivations: event.target.value,
                      }))
                    }
                    placeholder="Ex: Cortes, carrosséis, posts curtos, stories, e-mail, artigo, WhatsApp, Shorts, Reels, TikTok ou material educativo."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Sequência de distribuição"
              description="Organize a ordem em que os conteúdos serão distribuídos para gerar continuidade e não publicar tudo de forma desconectada."
            >
              <textarea
                rows={8}
                value={data.distributionSequence}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    distributionSequence: event.target.value,
                  }))
                }
                placeholder="Ex: Publicar conteúdo principal, depois corte curto, depois carrossel com resumo, depois stories com bastidores, depois WhatsApp com link, depois remarketing para engajados."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </SectionCard>

            <SectionCard
              title="Métricas da campanha"
              description="Defina os indicadores que devem ser acompanhados para avaliar o desempenho da distribuição."
            >
              <textarea
                rows={8}
                value={data.metrics}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    metrics: event.target.value,
                  }))
                }
                placeholder="Ex: Alcance, impressões, visualizações, retenção, cliques, custo por clique, engajamento, salvamentos, compartilhamentos, comentários, visitas ao site e crescimento da audiência."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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
                className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
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