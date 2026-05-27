"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { planningModules } from "@/data/modules";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";
import EspecialistaForm, {
  initialSpecialistData,
  SpecialistData,
} from "@/Components/modulos/EspecialistaForm";
import { supabase } from "@/lib/supabase";
import EmpresaForm, {
  CompanyData,
  initialCompanyData,
} from "@/Components/modulos/EmpresaForm";
import DnaConteudoForm, {
  ContentDnaData,
  initialContentDnaData,
} from "@/Components/modulos/DnaConteudoForm";
import TomDeVozForm, {
  initialToneVoiceData,
  ToneVoiceData,
} from "@/Components/modulos/TomDeVozForm";
import IdentidadeVisualForm, {
  initialVisualIdentityData,
  VisualIdentityData,
} from "@/Components/modulos/IdentidadeVisualForm";
import ObjetivosProjetoForm, {
  initialProjectObjectivesData,
  ProjectObjectivesData,
} from "@/Components/modulos/ObjetivosProjetoForm";
import ReferenciasConcorrentesForm, {
  initialReferencesCompetitorsData,
  ReferencesCompetitorsData,
} from "@/Components/modulos/ReferenciasConcorrentesForm";
import PesquisaConcorrenciaForm, {
  CompetitorResearchData,
  initialCompetitorResearchData,
} from "@/Components/modulos/PesquisaConcorrenciaForm";
import AnaliseSwotForm, {
  initialSwotData,
  SwotData,
} from "@/Components/modulos/AnaliseSwotForm";
import PalavrasChaveForm, {
  initialKeywordsData,
  KeywordsData,
} from "@/Components/modulos/PalavrasChaveForm";
import PersonasForm, {
  createEmptyPersona,
  initialPersonasData,
  PersonasData,
} from "@/Components/modulos/PersonasForm";

import JornadaCompraForm, {
  awarenessLevels,
  BuyingJourneyData,
  initialBuyingJourneyData,
  journeyStages,
} from "@/Components/modulos/JornadaCompraForm";

import CanaisDigitaisAtuaisForm, {
  CurrentChannelsData,
  initialChannels,
  initialCurrentChannelsData,
} from "@/Components/modulos/CanaisDigitaisAtuaisForm";

import FunilConteudoForm, {
  ContentFunnelData,
  funnelStages,
  initialContentFunnelData,
} from "@/Components/modulos/FunilConteudoForm";

import LinhasEditoriaisForm, {
  EditorialLinesData,
  initialEditorialLinesData,
} from "@/Components/modulos/LinhasEditoriaisForm";

import InstagramForm, {
  initialInstagramData,
  initialInstagramFrequencyItems,
  InstagramData,
  normalizeInstagramTextList,
} from "@/Components/modulos/InstagramForm";

type ClientRecord = {
  id: string;
  name: string;
  slug: string;
};

type GenericModuleData = {
  mainText?: string;
  notes?: string;
  references?: string;
};

type ProjectData = {
  coverImageUrl?: string | null;
  selectedModules?: string[];
  modules?: {
    title: string;
    slug: string;
    category: string;
    description: string;
  }[];
  moduleContent?: Record<string, unknown>;
};

type PlanningProject = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: "draft" | "in_progress" | "published" | "archived";
  created_at: string;
  updated_at: string;
  data: ProjectData | null;
  clients: ClientRecord | ClientRecord[] | null;
};

function getProjectClient(project: PlanningProject) {
  if (Array.isArray(project.clients)) {
    return project.clients[0] ?? null;
  }

  return project.clients ?? null;
}

function getStatusLabel(status: PlanningProject["status"]) {
  if (status === "draft") return "Rascunho";
  if (status === "in_progress") return "Em andamento";
  if (status === "published") return "Publicado";
  return "Arquivado";
}

function getStatusClass(status: PlanningProject["status"]) {
  if (status === "published") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "in_progress") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "archived") {
    return "bg-slate-200 text-slate-500";
  }

  return "bg-slate-100 text-slate-600";
}

function isSpecialistData(value: unknown): value is SpecialistData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "fields" in value || "photo" in value || "characteristics" in value;
}

function isGenericModuleData(value: unknown): value is GenericModuleData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "mainText" in value || "notes" in value || "references" in value;
}

export default function ModuloPlanejamentoPage() {
  const router = useRouter();
  const params = useParams();

  const clientSlug =
    typeof params.clientSlug === "string" ? params.clientSlug : "";

  const moduleSlug =
    typeof params.moduleSlug === "string" ? params.moduleSlug : "";

  const [project, setProject] = useState<PlanningProject | null>(null);
  const [specialistData, setSpecialistData] = useState<SpecialistData>(
    initialSpecialistData
  );
  const [companyData, setCompanyData] = useState<CompanyData>(
  initialCompanyData
);
const [contentDnaData, setContentDnaData] = useState<ContentDnaData>(
  initialContentDnaData
);
const [toneVoiceData, setToneVoiceData] =
  useState<ToneVoiceData>(initialToneVoiceData);
  const [genericData, setGenericData] = useState<GenericModuleData>({
    mainText: "",
    notes: "",
    references: "",
  });
  const [visualIdentityData, setVisualIdentityData] =
  useState<VisualIdentityData>(initialVisualIdentityData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [projectObjectivesData, setProjectObjectivesData] =
  useState<ProjectObjectivesData>(initialProjectObjectivesData);
  const [referencesCompetitorsData, setReferencesCompetitorsData] =
  useState<ReferencesCompetitorsData>(initialReferencesCompetitorsData);
  const [competitorResearchData, setCompetitorResearchData] =
  useState<CompetitorResearchData>(initialCompetitorResearchData);
  const [swotData, setSwotData] = useState<SwotData>(initialSwotData);
  const [keywordsData, setKeywordsData] =
  useState<KeywordsData>(initialKeywordsData);
  const [personasData, setPersonasData] =
  useState<PersonasData>(initialPersonasData);
  const [buyingJourneyData, setBuyingJourneyData] =
  useState<BuyingJourneyData>(initialBuyingJourneyData);
  const [currentChannelsData, setCurrentChannelsData] =
  useState<CurrentChannelsData>(initialCurrentChannelsData);
  const [contentFunnelData, setContentFunnelData] =
  useState<ContentFunnelData>(initialContentFunnelData);
  const [editorialLinesData, setEditorialLinesData] =
  useState<EditorialLinesData>(initialEditorialLinesData);
  const [instagramData, setInstagramData] =
  useState<InstagramData>(initialInstagramData);
  

  const module = useMemo(() => {
    return planningModules.find((item) => item.slug === moduleSlug) ?? null;
  }, [moduleSlug]);

  const client = project ? getProjectClient(project) : null;

  const selectedModules = useMemo(() => {
    return project?.data?.selectedModules ?? [];
  }, [project]);

  const isModuleSelected = selectedModules.includes(moduleSlug);
  const isSpecialistModule = moduleSlug === "dna-do-especialista";
  const isCompanyModule = moduleSlug === "dna-da-empresa";
  const isContentDnaModule = moduleSlug === "dna-de-conteudo";
  const isToneVoiceModule = moduleSlug === "tom-de-voz";
  const isVisualIdentityModule = moduleSlug === "identidade-visual";
  const isProjectObjectivesModule = moduleSlug === "objetivos-do-projeto";
  const isReferencesCompetitorsModule =
  moduleSlug === "referencias-e-concorrentes";
  const isCompetitorResearchModule = moduleSlug === "pesquisa-de-concorrencia";
  const isSwotModule = moduleSlug === "analise-swot";
  const isKeywordsModule = moduleSlug === "palavras-chave";
  const isPersonasModule = moduleSlug === "personas";
  const isBuyingJourneyModule = moduleSlug === "jornada-de-compra";
  const isCurrentChannelsModule = moduleSlug === "canais-digitais-atuais";
  const isContentFunnelModule = moduleSlug === "funil-de-conteudo";
  const isEditorialLinesModule = moduleSlug === "linhas-editoriais";
  const isInstagramModule = moduleSlug === "instagram";

  const relatedModules = useMemo(() => {
    return planningModules.filter(
      (item) =>
        item.presentation &&
        item.category === module?.category &&
        selectedModules.includes(item.slug)
    );
  }, [module?.category, selectedModules]);

  useEffect(() => {
    async function loadModuleData() {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        window.localStorage.removeItem("metodo-epc-strategist-auth");
        router.push("/estrategista/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (profileError || profile?.role !== "strategist") {
        await supabase.auth.signOut();
        window.localStorage.removeItem("metodo-epc-strategist-auth");
        router.push("/estrategista/login");
        return;
      }

      const { data, error } = await supabase
        .from("planning_projects")
        .select(
          `
          id,
          title,
          slug,
          description,
          status,
          created_at,
          updated_at,
          data,
          clients!inner (
            id,
            name,
            slug
          )
        `
        )
        .eq("clients.slug", clientSlug)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (error) {
        setErrorMessage(
          error.message || "Não foi possível carregar este planejamento."
        );
        setIsLoading(false);
        return;
      }

      const foundProject = (data?.[0] ?? null) as unknown as PlanningProject | null;

      if (!foundProject) {
        setErrorMessage("Planejamento não encontrado para este cliente.");
        setIsLoading(false);
        return;
      }

      const savedContent =
        foundProject.data?.moduleContent?.[moduleSlug] ?? null;

      setProject(foundProject);

      if (isSpecialistModule && isSpecialistData(savedContent)) {
        setSpecialistData({
          fields: savedContent.fields || {},
          photo: savedContent.photo || "",
          characteristics: savedContent.characteristics?.length
            ? savedContent.characteristics
            : initialSpecialistData.characteristics,
        });
      }

      if (isCompanyModule && isCompanyData(savedContent)) {
  setCompanyData({
    fields: savedContent.fields || {},
  });
}

if (isContentDnaModule && isContentDnaData(savedContent)) {
  setContentDnaData({
    fields: savedContent.fields || {},
    secondaryIdeas: savedContent.secondaryIdeas?.length
      ? savedContent.secondaryIdeas
      : initialContentDnaData.secondaryIdeas,
  });
}

if (isToneVoiceModule && isToneVoiceData(savedContent)) {
  setToneVoiceData({
    characteristics: savedContent.characteristics?.length
      ? savedContent.characteristics
      : initialToneVoiceData.characteristics,
    toneChoices: savedContent.toneChoices || {},
    vocabulary: savedContent.vocabulary || {},
    emotions: Array.isArray(savedContent.emotions)
      ? savedContent.emotions
      : [],
    observations: savedContent.observations || "",
    references: savedContent.references?.length
      ? savedContent.references
      : initialToneVoiceData.references,
  });
}

if (isVisualIdentityModule && isVisualIdentityData(savedContent)) {
  setVisualIdentityData({
    fields: savedContent.fields || {},
    colors:
      Array.isArray(savedContent.colors) && savedContent.colors.length
        ? savedContent.colors
        : initialVisualIdentityData.colors,
    visualReferences: savedContent.visualReferences?.length
      ? savedContent.visualReferences
      : initialVisualIdentityData.visualReferences,
    externalReferences: savedContent.externalReferences?.length
      ? savedContent.externalReferences
      : initialVisualIdentityData.externalReferences,
  });
}

if (isProjectObjectivesModule && isProjectObjectivesData(savedContent)) {
  setProjectObjectivesData({
    mainObjective:
      savedContent.mainObjective || initialProjectObjectivesData.mainObjective,
    secondaryObjectives: Array.isArray(savedContent.secondaryObjectives)
      ? savedContent.secondaryObjectives
      : initialProjectObjectivesData.secondaryObjectives,
    priorities: Array.isArray(savedContent.priorities)
      ? savedContent.priorities
      : initialProjectObjectivesData.priorities,
    successIndicators: Array.isArray(savedContent.successIndicators)
      ? savedContent.successIndicators
      : initialProjectObjectivesData.successIndicators,
    expectedResults: Array.isArray(savedContent.expectedResults)
      ? savedContent.expectedResults
      : initialProjectObjectivesData.expectedResults,
    phases: Array.isArray(savedContent.phases)
      ? savedContent.phases
      : initialProjectObjectivesData.phases,
    strategicObservation: savedContent.strategicObservation || "",
  });
}

if (
  isReferencesCompetitorsModule &&
  isReferencesCompetitorsData(savedContent)
) {
  setReferencesCompetitorsData({
    items:
      Array.isArray(savedContent.items) && savedContent.items.length
        ? savedContent.items
        : initialReferencesCompetitorsData.items,
  });
}

if (
  isCompetitorResearchModule &&
  isCompetitorResearchData(savedContent)
) {
  setCompetitorResearchData({
    competitors:
      Array.isArray(savedContent.competitors) &&
      savedContent.competitors.length
        ? savedContent.competitors.map((competitor) => ({
            image: competitor.image || "",
            name: competitor.name || "",
            website: competitor.website || "",
            positioning: competitor.positioning || "",
            targetAudience: competitor.targetAudience || "",
            productAndDelivery: competitor.productAndDelivery || "",
            channelsAndVisibility: competitor.channelsAndVisibility || "",
            contentAndCommunication: competitor.contentAndCommunication || "",
            funnelAndConversion: competitor.funnelAndConversion || "",
            strengths: competitor.strengths || "",
            opportunities: competitor.opportunities || "",
          }))
        : initialCompetitorResearchData.competitors,
  });
}

function isCompetitorResearchData(
  value: unknown
): value is CompetitorResearchData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "competitors" in value;
}

if (isSwotModule && isSwotData(savedContent)) {
  setSwotData({
    fields: savedContent.fields || {},
    synthesis: savedContent.synthesis || "",
  });
}

if (isKeywordsModule && isKeywordsData(savedContent)) {
  setKeywordsData({
    sortBy: savedContent.sortBy || "adicao",
    keywords:
      Array.isArray(savedContent.keywords) && savedContent.keywords.length
        ? savedContent.keywords.map((item) => ({
            keyword: item.keyword || "",
            volume: item.volume || "",
            observation: item.observation || "",
          }))
        : initialKeywordsData.keywords,
    strategicObservation: savedContent.strategicObservation || "",
  });
}

if (isPersonasModule && isPersonasData(savedContent)) {
  setPersonasData({
    personas:
      Array.isArray(savedContent.personas) && savedContent.personas.length
        ? savedContent.personas.map((persona) => ({
            ...createEmptyPersona(),
            ...persona,
            behaviors: {
              ...createEmptyPersona().behaviors,
              ...(persona.behaviors || {}),
            },
          }))
        : initialPersonasData.personas,
  });
}

if (isBuyingJourneyModule && isBuyingJourneyData(savedContent)) {
  setBuyingJourneyData({
    overview: savedContent.overview || "",
    stages:
      Array.isArray(savedContent.stages) && savedContent.stages.length
        ? journeyStages.map((_, index) => ({
            awarenessLevel:
              savedContent.stages[index]?.awarenessLevel || awarenessLevels[0],
            thoughts: savedContent.stages[index]?.thoughts || "",
            pains: savedContent.stages[index]?.pains || "",
            recommendedContent:
              savedContent.stages[index]?.recommendedContent || "",
            recommendedChannels:
              savedContent.stages[index]?.recommendedChannels || "",
            desiredNextStep:
              savedContent.stages[index]?.desiredNextStep || "",
            conversionPoint:
              savedContent.stages[index]?.conversionPoint || "",
          }))
        : initialBuyingJourneyData.stages,
    turningPoints: {
      discoveryToPain: savedContent.turningPoints?.discoveryToPain || "",
      painToSolution: savedContent.turningPoints?.painToSolution || "",
      solutionToComparison:
        savedContent.turningPoints?.solutionToComparison || "",
      comparisonToDecision:
        savedContent.turningPoints?.comparisonToDecision || "",
    },
    objections: {
      beginning: savedContent.objections?.beginning || "",
      middle: savedContent.objections?.middle || "",
      end: savedContent.objections?.end || "",
    },
    advancementTriggers: savedContent.advancementTriggers || "",
    essentialContent: {
      awareness: savedContent.essentialContent?.awareness || "",
      decision: savedContent.essentialContent?.decision || "",
    },
    funnelCampaignsAutomation: savedContent.funnelCampaignsAutomation || "",
    references:
      Array.isArray(savedContent.references) && savedContent.references.length
        ? savedContent.references.map((reference) => ({
            title: reference.title || "",
            link: reference.link || "",
          }))
        : initialBuyingJourneyData.references,
  });
}

if (isCurrentChannelsModule && isCurrentChannelsData(savedContent)) {
  setCurrentChannelsData({
    channels:
      Array.isArray(savedContent.channels) && savedContent.channels.length
        ? savedContent.channels.map((channel) => ({
            nome: channel.nome || "",
            descricao: channel.descricao || "",
            link: channel.link || "",
          }))
        : initialChannels,
    observation: savedContent.observation || "",
    references:
      Array.isArray(savedContent.references) && savedContent.references.length
        ? savedContent.references.map((reference) => ({
            title: reference.title || "",
            link: reference.link || "",
          }))
        : initialCurrentChannelsData.references,
  });
}

if (isContentFunnelModule && isContentFunnelData(savedContent)) {
  setContentFunnelData({
    stages:
      Array.isArray(savedContent.stages) && savedContent.stages.length
        ? funnelStages.map((_, index) => ({
            strategy: savedContent.stages[index]?.strategy || "",
            objective: savedContent.stages[index]?.objective || "",
            nextStep: savedContent.stages[index]?.nextStep || "",
            themes: savedContent.stages[index]?.themes || "",
            recommendedFormat:
              savedContent.stages[index]?.recommendedFormat || "Reels",
            ctas: savedContent.stages[index]?.ctas || "",
          }))
        : initialContentFunnelData.stages,
    overview: savedContent.overview || "",
    distribution: {
      attraction: savedContent.distribution?.attraction || "",
      connection: savedContent.distribution?.connection || "",
      bonding: savedContent.distribution?.bonding || "",
      sales: savedContent.distribution?.sales || "",
    },
    metrics: {
      attraction: savedContent.metrics?.attraction || "",
      connection: savedContent.metrics?.connection || "",
      bonding: savedContent.metrics?.bonding || "",
      sales: savedContent.metrics?.sales || "",
    },
    references:
      Array.isArray(savedContent.references) && savedContent.references.length
        ? savedContent.references.map((reference) => ({
            title: reference.title || "",
            link: reference.link || "",
          }))
        : initialContentFunnelData.references,
  });
}

if (isEditorialLinesModule && isEditorialLinesData(savedContent)) {
  setEditorialLinesData({
    lines:
      Array.isArray(savedContent.lines) && savedContent.lines.length
        ? savedContent.lines.map((line) => ({
            title: line.title || "",
            objective: line.objective || "",
            description: line.description || "",
            targetAudience: line.targetAudience || "",
            contentPillars: line.contentPillars || "",
            formats: line.formats || "",
            frequency: line.frequency || "",
            examples: line.examples || "",
            notes: line.notes || "",
          }))
        : initialEditorialLinesData.lines,
    generalGuidelines: savedContent.generalGuidelines || "",
    references:
      Array.isArray(savedContent.references) && savedContent.references.length
        ? savedContent.references.map((reference) => ({
            title: reference.title || "",
            link: reference.link || "",
          }))
        : initialEditorialLinesData.references,
  });
}

if (isInstagramModule && isInstagramData(savedContent)) {
  setInstagramData({
    frequencyItems:
      Array.isArray(savedContent.frequencyItems) &&
      savedContent.frequencyItems.length
        ? savedContent.frequencyItems.map((item) => ({
            format: item.format || "",
            quantity: item.quantity || "",
            period: item.period || "por semana",
            observation: item.observation || "",
          }))
        : initialInstagramFrequencyItems,
    objectives: normalizeInstagramTextList(savedContent.objectives),
    stories: normalizeInstagramTextList(savedContent.stories),
    hashtags: normalizeInstagramTextList(savedContent.hashtags),
    reels: normalizeInstagramTextList(savedContent.reels),
    languageStructures: normalizeInstagramTextList(
      savedContent.languageStructures
    ),
    contents: normalizeInstagramTextList(savedContent.contents),
    visualStrategy: savedContent.visualStrategy || "",
    visualReferences:
      Array.isArray(savedContent.visualReferences) &&
      savedContent.visualReferences.length
        ? savedContent.visualReferences.map((reference) => ({
            image: reference.image || "",
          }))
        : initialInstagramData.visualReferences,
    bioEnabled:
      typeof savedContent.bioEnabled === "boolean"
        ? savedContent.bioEnabled
        : true,
    bioPhoto: savedContent.bioPhoto || "",
    profileHandle: savedContent.profileHandle || "",
    profileName: savedContent.profileName || "",
    bioText: savedContent.bioText || "",
    bioLink: savedContent.bioLink || "",
    highlights: savedContent.highlights || "",
    references:
      Array.isArray(savedContent.references) && savedContent.references.length
        ? savedContent.references.map((reference) => ({
            title: reference.title || "",
            link: reference.link || "",
          }))
        : initialInstagramData.references,
  });
}

function isContentFunnelData(value: unknown): value is ContentFunnelData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    "stages" in value ||
    "overview" in value ||
    "distribution" in value ||
    "metrics" in value ||
    "references" in value
  );
}

function isEditorialLinesData(value: unknown): value is EditorialLinesData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "lines" in value || "generalGuidelines" in value || "references" in value;
}

function isInstagramData(value: unknown): value is InstagramData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    "frequencyItems" in value ||
    "objectives" in value ||
    "stories" in value ||
    "hashtags" in value ||
    "reels" in value ||
    "languageStructures" in value ||
    "contents" in value ||
    "visualStrategy" in value ||
    "visualReferences" in value ||
    "bioEnabled" in value ||
    "bioPhoto" in value ||
    "profileHandle" in value ||
    "profileName" in value ||
    "bioText" in value ||
    "bioLink" in value ||
    "highlights" in value ||
    "references" in value
  );
}

function isPersonasData(value: unknown): value is PersonasData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "personas" in value;
}

function isBuyingJourneyData(value: unknown): value is BuyingJourneyData {
  if (!value || typeof value !== "object") {
    return false;
  }
  
  return (
    "overview" in value ||
    "stages" in value ||
    "turningPoints" in value ||
    "objections" in value ||
    "advancementTriggers" in value ||
    "essentialContent" in value ||
    "funnelCampaignsAutomation" in value ||
    "references" in value
  );
}

function isCurrentChannelsData(value: unknown): value is CurrentChannelsData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "channels" in value || "observation" in value || "references" in value;
}

function isKeywordsData(value: unknown): value is KeywordsData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    "sortBy" in value ||
    "keywords" in value ||
    "strategicObservation" in value
  );
}

function isSwotData(value: unknown): value is SwotData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "fields" in value || "synthesis" in value;
}

function isReferencesCompetitorsData(
  value: unknown
): value is ReferencesCompetitorsData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "items" in value;
}

function isVisualIdentityData(value: unknown): value is VisualIdentityData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    "fields" in value ||
    "colors" in value ||
    "visualReferences" in value ||
    "externalReferences" in value
  );
}

      if (!isSpecialistModule && isGenericModuleData(savedContent)) {
        setGenericData({
          mainText: savedContent.mainText || "",
          notes: savedContent.notes || "",
          references: savedContent.references || "",
        });
      }

      function isCompanyData(value: unknown): value is CompanyData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "fields" in value;
}

function isContentDnaData(value: unknown): value is ContentDnaData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "fields" in value || "secondaryIdeas" in value;
}

function isToneVoiceData(value: unknown): value is ToneVoiceData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    "characteristics" in value ||
    "toneChoices" in value ||
    "vocabulary" in value ||
    "emotions" in value ||
    "observations" in value ||
    "references" in value
  );
}

function isProjectObjectivesData(
  value: unknown
): value is ProjectObjectivesData {
  if (!value || typeof value !== "object") {
    return false;
  }

  return (
    "mainObjective" in value ||
    "secondaryObjectives" in value ||
    "priorities" in value ||
    "successIndicators" in value ||
    "expectedResults" in value ||
    "phases" in value ||
    "strategicObservation" in value
  );
}

      setIsLoading(false);
    }

    if (clientSlug && moduleSlug) {
      loadModuleData();
    }
  }, [clientSlug, moduleSlug, router, isSpecialistModule]);

  async function saveModule(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!project) {
      return;
    }

    if (!isModuleSelected) {
      setErrorMessage(
        "Este módulo não está selecionado para este planejamento. Volte para a configuração e selecione o módulo antes de preencher."
      );
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const currentData = project.data ?? {};

    const contentToSave = isSpecialistModule
  ? specialistData
  : isCompanyModule
    ? companyData
    : isContentDnaModule
      ? contentDnaData
      : isToneVoiceModule
        ? toneVoiceData
        : isVisualIdentityModule
          ? visualIdentityData
          : isProjectObjectivesModule
            ? projectObjectivesData
            : isReferencesCompetitorsModule
              ? referencesCompetitorsData
              : isCompetitorResearchModule
                ? competitorResearchData
                : isSwotModule
                  ? swotData
                  : isKeywordsModule
                    ? keywordsData
                    : isPersonasModule
                      ? personasData
                      : isBuyingJourneyModule
                        ? buyingJourneyData
                        : isCurrentChannelsModule
                          ? currentChannelsData
                          : isContentFunnelModule
                            ? contentFunnelData
                            : isEditorialLinesModule
                              ? editorialLinesData
                              : isInstagramModule
                                ? instagramData
                                : {
                                    mainText:
                                      genericData.mainText?.trim() || "",
                                    notes: genericData.notes?.trim() || "",
                                    references:
                                      genericData.references?.trim() || "",
                                  };

    const nextData: ProjectData = {
      ...currentData,
      moduleContent: {
        ...(currentData.moduleContent ?? {}),
        [moduleSlug]: contentToSave,
      },
    };

    const { error } = await supabase
      .from("planning_projects")
      .update({
        data: nextData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", project.id);

    if (error) {
      setErrorMessage(error.message || "Não foi possível salvar este módulo.");
      setIsSaving(false);
      return;
    }

    setProject({
      ...project,
      data: nextData,
      updated_at: new Date().toISOString(),
    });

    setSuccessMessage("Módulo salvo com sucesso.");
    setIsSaving(false);

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 2800);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 lg:px-10">
        <MetodoLogo />

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/planejamentos/${clientSlug}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Voltar aos módulos
          </Link>

          {project ? (
            <Link
              href={`/apresentacao/${project.slug}`}
              className="rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Ver apresentação
            </Link>
          ) : null}
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-10">
        {isLoading ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
            <p className="text-slate-500">Carregando módulo...</p>
          </div>
        ) : null}

        {!isLoading && errorMessage && !project ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">
              Atenção
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em]">
              {errorMessage}
            </h1>

            <Link
              href="/admin"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Voltar ao painel
            </Link>
          </div>
        ) : null}

        {!isLoading && project ? (
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="self-start rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Planejamento
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]">
                {client?.name ?? "Cliente"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {project.title}
              </p>

              <span
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                  project.status
                )}`}
              >
                {getStatusLabel(project.status)}
              </span>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Categoria
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {module?.category ?? "Módulo"}
                </p>
              </div>

              {relatedModules.length > 0 ? (
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Módulos da categoria
                  </p>

                  <div className="mt-4 space-y-2">
                    {relatedModules.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/admin/planejamentos/${clientSlug}/modulos/${item.slug}`}
                        className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          item.slug === moduleSlug
                            ? "bg-slate-950 text-white"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>

            <div>
              <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Módulo estratégico
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">
                  {module?.title ?? "Módulo não encontrado"}
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  {module?.description ??
                    "Este módulo não foi encontrado na base de módulos do planejamento."}
                </p>

                {!isModuleSelected ? (
                  <div className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
                    Este módulo não está selecionado para este planejamento.
                    Para preencher, volte aos módulos e selecione este item.
                  </div>
                ) : null}

                {errorMessage && project ? (
                  <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                    {errorMessage}
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="mt-6 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
                    {successMessage}
                  </div>
                ) : null}
              </div>

              {isSpecialistModule ? (
  <EspecialistaForm
    data={specialistData}
    setData={setSpecialistData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : isCompanyModule ? (
  <EmpresaForm
    data={companyData}
    setData={setCompanyData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : isContentDnaModule ? (
  <DnaConteudoForm
    data={contentDnaData}
    setData={setContentDnaData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : isToneVoiceModule ? (
  <TomDeVozForm
    data={toneVoiceData}
    setData={setToneVoiceData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : isVisualIdentityModule ? (
  <IdentidadeVisualForm
    data={visualIdentityData}
    setData={setVisualIdentityData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : isProjectObjectivesModule ? (
  <ObjetivosProjetoForm
    data={projectObjectivesData}
    setData={setProjectObjectivesData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isReferencesCompetitorsModule ? (
  <ReferenciasConcorrentesForm
    data={referencesCompetitorsData}
    setData={setReferencesCompetitorsData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isCompetitorResearchModule ? (
  <PesquisaConcorrenciaForm
    data={competitorResearchData}
    setData={setCompetitorResearchData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isSwotModule ? (
  <AnaliseSwotForm
    data={swotData}
    setData={setSwotData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isKeywordsModule ? (
  <PalavrasChaveForm
    data={keywordsData}
    setData={setKeywordsData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isPersonasModule ? (
  <PersonasForm
    data={personasData}
    setData={setPersonasData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isBuyingJourneyModule ? (
  <JornadaCompraForm
    data={buyingJourneyData}
    setData={setBuyingJourneyData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isCurrentChannelsModule ? (
  <CanaisDigitaisAtuaisForm
    data={currentChannelsData}
    setData={setCurrentChannelsData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isContentFunnelModule ? (
  <FunilConteudoForm
    data={contentFunnelData}
    setData={setContentFunnelData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isEditorialLinesModule ? (
  <LinhasEditoriaisForm
    data={editorialLinesData}
    setData={setEditorialLinesData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />

  ) : isInstagramModule ? (
  <InstagramForm
    data={instagramData}
    setData={setInstagramData}
    clientSlug={clientSlug}
    presentationHref={`/apresentacao/${project.slug}`}
    isSaving={isSaving}
    isDisabled={!isModuleSelected}
    onSave={() => saveModule()}
  />
) : (
                <form
                  onSubmit={saveModule}
                  className="mt-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10"
                >
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Conteúdo principal do módulo
                    </label>

                    <textarea
                      rows={10}
                      value={genericData.mainText || ""}
                      onChange={(event) =>
                        setGenericData((current) => ({
                          ...current,
                          mainText: event.target.value,
                        }))
                      }
                      placeholder="Preencha aqui as informações estratégicas deste módulo."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Observações internas
                    </label>

                    <textarea
                      rows={5}
                      value={genericData.notes || ""}
                      onChange={(event) =>
                        setGenericData((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                      placeholder="Anote observações, decisões, pendências ou contexto para este cliente."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Referências e links
                    </label>

                    <textarea
                      rows={4}
                      value={genericData.references || ""}
                      onChange={(event) =>
                        setGenericData((current) => ({
                          ...current,
                          references: event.target.value,
                        }))
                      }
                      placeholder="Cole referências, links, exemplos ou materiais usados neste módulo."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400"
                    />
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      href={`/admin/planejamentos/${clientSlug}`}
                      className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
                    >
                      Voltar para módulos
                    </Link>

                    <button
                      type="submit"
                      disabled={isSaving || !isModuleSelected}
                      className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? "Salvando..." : "Salvar módulo"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : null}
      </section>

      <MetodoFooter />
    </main>
  );
}