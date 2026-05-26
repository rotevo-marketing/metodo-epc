"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { moduleCategories, planningModules } from "@/data/modules";
import ResumoEstrategico from "@/components/apresentacao/ResumoEstrategico";
import { MetodoFooter, MetodoLogo } from "@/Components/MetodoBrand";

type Section = {
  title: string;
  slug: string;
  category: string;
  description: string;
};

type ContentBlock = {
  title: string;
  content: string;
};

type SpecialistCharacteristic = {
  title: string;
  description: string;
};

type SpecialistPresentationData = {
  fields: Record<string, string>;
  photo: string;
  characteristics: SpecialistCharacteristic[];
};

type ToneCharacteristic = {
  title: string;
  description: string;
};

type ToneReference = {
  image: string;
  title: string;
  link: string;
};

type ToneVoicePresentationData = {
  characteristics: ToneCharacteristic[];
  toneChoices: Record<string, string>;
  vocabulary: Record<string, string>;
  emotions: string[];
  observations: string;
  references: ToneReference[];
};

type VisualColor = {
  name: string;
  color: string;
  code: string;
};

type VisualReferencePresentation = {
  image: string;
};

type VisualExternalReference = {
  image: string;
  title: string;
  link: string;
};

type VisualIdentityPresentationData = {
  fields: Record<string, string>;
  colors: VisualColor[];
  visualReferences: VisualReferencePresentation[];
  externalReferences: VisualExternalReference[];
};

type ProjectSimpleItem = {
  title: string;
  description: string;
};

type ProjectPhaseItem = {
  title: string;
  period: string;
  description: string;
};

type ProjectObjectivesPresentationData = {
  mainObjective: ProjectSimpleItem;
  secondaryObjectives: ProjectSimpleItem[];
  priorities: ProjectSimpleItem[];
  successIndicators: ProjectSimpleItem[];
  expectedResults: ProjectSimpleItem[];
  phases: ProjectPhaseItem[];
  strategicObservation: string;
};

type ReferenceChannelKey =
  | "site"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "linkedin"
  | "whatsapp"
  | "blog"
  | "pinterest"
  | "podcast";

type ReferenceChannel = {
  key: ReferenceChannelKey;
  label: string;
  icon: string;
};

type ReferenceAnalysis = {
  title: string;
  description: string;
};

type ReferenceCompetitorPresentationItem = {
  image: string;
  title: string;
  channels: Record<ReferenceChannelKey, string>;
  analyses: ReferenceAnalysis[];
};

type ReferencesCompetitorsPresentationData = {
  items: ReferenceCompetitorPresentationItem[];
};

type CompetitorResearchPresentationItem = {
  image: string;
  name: string;
  website: string;
  positioning: string;
  targetAudience: string;
  productAndDelivery: string;
  channelsAndVisibility: string;
  contentAndCommunication: string;
  funnelAndConversion: string;
  strengths: string;
  opportunities: string;
};

type CompetitorResearchPresentationData = {
  competitors: CompetitorResearchPresentationItem[];
};

type SwotPresentationData = {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  synthesis: string;
};

type KeywordPresentationItem = {
  keyword: string;
  volume: string;
  observation: string;
};

type KeywordsPresentationData = {
  sortBy: "adicao" | "palavra" | "volume";
  keywords: KeywordPresentationItem[];
  strategicObservation: string;
};

type PersonaBehaviorKey =
  | "redesSociais"
  | "blogs"
  | "anunciosMidiaTradicional"
  | "anunciosMidiaDigital"
  | "outros";

type PersonaPresentationData = {
  photo: string;
  name: string;
  age: string;
  education: string;
  gender: string;
  role: string;
  companySize: string;
  behaviors: Record<PersonaBehaviorKey, boolean>;
  description: string;
  personalObjective: string;
  challenges: string;
  solutionHelp: string;
  professionalObjective: string;
  whatPrevents: string;
  informationSources: string;
  alternatives: string;
  expectedExperience: string;
  commonObjections: string;
  decisionFactors: string;
  desiredResult: string;
  buyingJourney: string;
  summaryObjective: string;
  summaryChallenge: string;
  summaryObjection: string;
  summaryJourney: string;
};

type PersonasPresentationData = {
  personas: PersonaPresentationData[];
};

type PurchaseJourneyStage = {
  title: string;
  awarenessLevel: string;
  description: string;
  thoughts: string;
  pains: string;
  contents: string;
  channels: string;
  nextStep: string;
  conversionPoint: string;
};

type PurchaseJourneyReference = {
  title: string;
  link: string;
};

type PurchaseJourneyPresentationData = {
  overview: string;
  stages: PurchaseJourneyStage[];
  decisionPoints: string;
  objections: string;
  advanceTriggers: string;
  necessaryContents: string;
  decisionContent: string;
  journeyExplanation: string;
  references: PurchaseJourneyReference[];
};

type CurrentDigitalChannel = {
  name: string;
  description: string;
  link: string;
};

type CurrentDigitalChannelsPresentationData = {
  channels: CurrentDigitalChannel[];
  observation: string;
};

type ContentFunnelStage = {
  title: string;
  subtitle: string;
  strategy: string;
  objective: string;
  nextStep: string;
  themes: string;
  format: string;
  ctas: string;
};

type ContentFunnelReference = {
  title: string;
  link: string;
};

type ContentFunnelPresentationData = {
  overview: string;
  stages: ContentFunnelStage[];
  distribution: {
    attraction: string;
    connection: string;
    bonding: string;
    sales: string;
  };
  metrics: {
    attraction: string;
    connection: string;
    bonding: string;
    sales: string;
  };
  references: ContentFunnelReference[];
};

type EditorialTopicPresentationItem = {
  title: string;
  description: string;
};

type EditorialLinePresentationItem = {
  title: string;
  function: string;
  journeyCompatibility: string;
  systemRole: string;
  structuralLimit: string;
  topics: EditorialTopicPresentationItem[];
};

type EditorialLinesPresentationData = {
  lines: EditorialLinePresentationItem[];
  observation: string;
};

type SocialChannelReference = {
  title: string;
  link: string;
};

type SocialChannelVisualReference = {
  image: string;
};

type InstagramFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type InstagramPresentationData = {
  frequency: string;
  frequencyItems: InstagramFrequencyItem[];
  objectives: string[];
  stories: string[];
  hashtags: string[];
  reels: string[];
  languageStructures: string[];
  contents: string[];
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  bioEnabled: boolean;
  bioPhoto: string;
  profileHandle: string;
  profileName: string;
  bioText: string;
  bioLink: string;
  highlights: string;
  references: SocialChannelReference[];
};

type TikTokFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type TikTokPresentationData = {
  frequencyItems: TikTokFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  contents: string[];
  mainFormats: string;
  contentSeries: string;
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  openingHooks: string;
  retentionResources: string;
  references: SocialChannelReference[];
};

type YouTubeFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type YouTubePresentationData = {
  frequencyItems: YouTubeFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  editingStyle: string;
  visualReferences: SocialChannelVisualReference[];
  seoStrategies: string[];
  contents: string[];
  channelPhoto: string;
  channelCover: string;
  channelName: string;
  channelCategory: string;
  channelDescription: string;
  suggestedPlaylists: string;
  references: SocialChannelReference[];
};

type FacebookFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type FacebookPresentationData = {
  frequencyItems: FacebookFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  contents: string[];
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  pagePhoto: string;
  pageCover: string;
  pageName: string;
  pageCategory: string;
  pageDescription: string;
  siteLink: string;
  contactLink: string;
  serviceRegion: string;
  otherLinks: string;
  references: SocialChannelReference[];
};

type LinkedInFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type LinkedInPresentationData = {
  frequencyItems: LinkedInFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  contents: string[];
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  profilePhoto: string;
  profileCover: string;
  profileName: string;
  headline: string;
  authorityThemes: string;
  aboutProfile: string;
  references: SocialChannelReference[];
};

type WhatsAppFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type WhatsAppPresentationData = {
  frequencyItems: WhatsAppFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  contents: string[];
  firstContactFlow: string;
  nurtureFlow: string;
  salesFlow: string;
  postSaleFlow: string;
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  mainNumber: string;
  directLink: string;
  initialMessage: string;
  serviceNotes: string;
  references: SocialChannelReference[];
};

type BlogFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type BlogContentPresentationItem = {
  title: string;
  suggestedDate: string;
  observation: string;
};

type BlogPresentationData = {
  frequencyItems: BlogFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  priorityKeywords: string;
  blogCategories: string;
  seoGuidelines: string;
  contents: BlogContentPresentationItem[];
  references: SocialChannelReference[];
};

type PinterestFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type PinterestPresentationData = {
  frequencyItems: PinterestFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  contents: string[];
  mainBoards: string;
  priorityVisualThemes: string;
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  pinKeywords: string;
  destinationLinks: string;
  descriptionGuidelines: string;
  references: SocialChannelReference[];
};

type PodcastFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type PodcastContentPresentationItem = {
  title: string;
  suggestedDate: string;
  guestOrResponsible: string;
  format: string;
  observation: string;
};

type PodcastPresentationData = {
  frequencyItems: PodcastFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  mainFormat: string;
  durationAndRhythm: string;
  seriesOrSegments: string;
  guestsAndParticipants: string;
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  contents: PodcastContentPresentationItem[];
  publishingPlatforms: string;
  repurposingStrategy: string;
  references: SocialChannelReference[];
};

type LivesFrequencyItem = {
  format: string;
  quantity: string;
  period: string;
  observation: string;
};

type LivesNetworkFrequencyItem = {
  channel: string;
  frequency: string;
};

type LivesContentPresentationItem = {
  title: string;
  suggestedDate: string;
  channel: string;
  objective: string;
  observation: string;
};

type LivesPresentationData = {
  frequencyItems: LivesFrequencyItem[];
  networkFrequencies: LivesNetworkFrequencyItem[];
  objectives: string[];
  languageStructures: string[];
  openingScript: string;
  centralContent: string;
  publicInteraction: string;
  closingAndCall: string;
  visualStrategy: string;
  visualReferences: SocialChannelVisualReference[];
  contents: LivesContentPresentationItem[];
  beforeAndAfterPromotion: string;
  repurposingStrategy: string;
  references: SocialChannelReference[];
};

type EducationalMaterialPresentationItem = {
  title: string;
  type: string;
  content: string;
  objective: string;
  distribution: string;
  fileName: string;
  fileData: string;
  materialLink: string;
};

type EducationalMaterialsPresentationData = {
  materials: EducationalMaterialPresentationItem[];
  strategy: string;
  references: SocialChannelReference[];
};

type SiteStrategyReference = {
  title: string;
  url: string;
};

type SiteStrategyIntegration = {
  name: string;
};

type SiteStrategySimpleItem = {
  value: string;
};

type SiteStrategyPresentationData = {
  visualIdentity: string;
  references: SiteStrategyReference[];
  integrations: SiteStrategyIntegration[];
  essentialPages: SiteStrategySimpleItem[];
  importantFeatures: SiteStrategySimpleItem[];
  strategicNotes: string;
  externalReferences: SocialChannelReference[];
};

type SiteMapPagePresentationItem = {
  title: string;
  type: string;
  objective: string;
  description: string;
  requiredSections: string;
  mainCta: string;
  priority: string;
};

type SiteMapPresentationData = {
  pages: SiteMapPagePresentationItem[];
  strategicNotes: string;
  references: SocialChannelReference[];
};

type LeadCaptureCampaignMaterial = {
  title: string;
  type: string;
};

type LeadCaptureCampaignPresentationData = {
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
  references: SocialChannelReference[];
};

type SalesCampaignDestinationPresentationItem = {
  title: string;
  link: string;
};

type SalesConversionCampaignPresentationData = {
  campaignType: string;
  campaignPhase: string;
  salesObjective: string;
  audienceTemperature: string;
  recommendedChannels: string;
  budget: string;
  objective: string;
  offerProduct: string;
  offerPrice: string;
  offerPromise: string;
  offerBenefits: string;
  mainCall: string;
  audienceCold: string;
  audienceWarm: string;
  audienceHot: string;
  positioning: string;
  creativeDirection: string;
  strategicScenario: string;
  destinations: SalesCampaignDestinationPresentationItem[];
  mainObjections: string;
  strategicResponses: string;
  salesPageDestination: string;
  mainCta: string;
  proofElements: string;
  urgencyAndScarcity: string;
  remarketingStructure: string;
  metrics: string;
  references: SocialChannelReference[];
};

type ContentDistributionMaterialPresentationItem = {
  title: string;
  link: string;
};

type ContentDistributionChannelPlanPresentationItem = {
  channel: string;
  contentType: string;
  channelRole: string;
};

type ContentDistributionCampaignPresentationData = {
  campaignType: string;
  campaignPhase: string;
  mediaObjective: string;
  audienceTemperature: string;
  recommendedChannels: string;
  budget: string;
  materials: ContentDistributionMaterialPresentationItem[];
  objective: string;
  audience: string;
  positioning: string;
  creativeDirection: string;
  strategicScenario: string;
  authorityContent: string;
  relationshipContent: string;
  indirectConversionContent: string;
  remarketingContent: string;
  channelPlans: ContentDistributionChannelPlanPresentationItem[];
  mainContent: string;
  possibleDerivations: string;
  distributionSequence: string;
  metrics: string;
  references: SocialChannelReference[];
};

type AutomationSystemTagPresentation = {
  name: string;
  description: string;
};

type AutomationSystemChannelPriorityPresentation = {
  flow: string;
  dominantChannel: string;
  supportChannel: string;
};

type AutomationSystemCadencePresentation = {
  flow: string;
  cadence: string;
};

type AutomationSystemStepPresentation = {
  moment: string;
  channel: string;
  type: string;
  title: string;
  purpose: string;
  condition: string;
  cta: string;
};

type AutomationSystemFlowPresentation = {
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
  steps: AutomationSystemStepPresentation[];
};

type AutomationSystemPlatformPresentation = {
  category: string;
  tool: string;
  purpose: string;
};

type AutomationSystemReferencePresentation = {
  title: string;
  link: string;
};

type AutomationSystemPresentationData = {
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
  tags: AutomationSystemTagPresentation[];
  channelPriorities: AutomationSystemChannelPriorityPresentation[];
  cadences: AutomationSystemCadencePresentation[];
  flows: AutomationSystemFlowPresentation[];
  transmissionIntegration: string;
  mainKpi: string;
  secondaryKpis: string;
  platforms: AutomationSystemPlatformPresentation[];
  references: AutomationSystemReferencePresentation[];
};

type TimelineSprintPresentation = {
  title: string;
  startDate: string;
  endDate: string;
  period: string;
  deliverables: string;
};

type TimelineEventPresentation = {
  title: string;
  description: string;
  date: string;
  phase: string;
  priority: string;
  status: string;
  responsible: string;
  dependency: string;
  sprints: TimelineSprintPresentation[];
};

type TimelineReferencePresentation = {
  title: string;
  link: string;
};

type TimelinePresentationData = {
  events: TimelineEventPresentation[];
  macroVision: string;
  firstMilestone: string;
  secondMilestone: string;
  thirdMilestone: string;
  risks: string;
  references: TimelineReferencePresentation[];
};

type ContentCalendarApprovalStepPresentation = {
  title: string;
  description: string;
};

type ContentCalendarDriveFolderPresentation = {
  title: string;
  description: string;
  link: string;
};

type ContentCalendarReferencePresentation = {
  title: string;
  link: string;
};

type ContentCalendarPresentationData = {
  calendarTitle: string;
  platform: string;
  calendarLink: string;
  calendarFunction: string;
  usageGuidelines: string;
  responsiblePeople: string;
  updateFrequency: string;
  updateRoutine: string;
  notionStructure: string;
  approvalFlowDescription: string;
  approvalSteps: ContentCalendarApprovalStepPresentation[];
  approvalRules: string;
  driveMainFolderTitle: string;
  driveMainFolderLink: string;
  driveFolderStructure: string;
  driveFolders: ContentCalendarDriveFolderPresentation[];
  strategicObservations: string;
  references: ContentCalendarReferencePresentation[];
};

type MetricsIndicatorPresentation = {
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

type MetricsJourneyPresentation = {
  stage: string;
  metrics: string;
  purpose: string;
};

type MetricsChannelPresentation = {
  channel: string;
  metrics: string;
  tool: string;
};

type MetricsToolPresentation = {
  name: string;
  purpose: string;
};

type MetricsReferencePresentation = {
  title: string;
  link: string;
};

type MetricsPresentationData = {
  indicators: MetricsIndicatorPresentation[];
  mainIndicators: string;
  journeyMetrics: MetricsJourneyPresentation[];
  channelMetrics: MetricsChannelPresentation[];
  tools: MetricsToolPresentation[];
  analysisRoutine: string;
  decisionCriteria: string;
  reportingFormat: string;
  strategicObservations: string;
  references: MetricsReferencePresentation[];
};

type AdditionalPendingItemPresentation = {
  title: string;
  description: string;
  responsible: string;
  status: string;
};

type AdditionalNextStepPresentation = {
  title: string;
  description: string;
  priority: string;
};

type AdditionalTeamRecommendationPresentation = {
  area: string;
  recommendation: string;
};

type AdditionalReferencePresentation = {
  title: string;
  link: string;
};

type AdditionalGuidelinesPresentationData = {
  executionGuidelines: string;
  attentionPoints: string;
  pendingItems: AdditionalPendingItemPresentation[];
  nextSteps: AdditionalNextStepPresentation[];
  teamRecommendations: AdditionalTeamRecommendationPresentation[];
  finalObservations: string;
  references: AdditionalReferencePresentation[];
};

const clientName = "Cliente Demo";

const coverImageUrl =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2200&auto=format&fit=crop";

const introSection: Section = {
  title: "Comece por aqui",
  slug: "resumo-estrategico",
  category: "Apresentação",
  description:
    "Entenda como navegar pelo planejamento, o que você vai encontrar em cada área e como usar este ambiente para orientar decisões estratégicas.",
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function displayTitle(section: Section) {
  const titleMap: Record<string, string> = {
    "dna-do-especialista": "Especialista",
    "dna-da-empresa": "Empresa",
  };

  return titleMap[section.slug] || section.title;
}

function getIconPath(slug: string) {
  if (slug === "resumo-estrategico") return "/icons/38-orientacoes.svg";

  if (slug.includes("dna-do-especialista")) return "/icons/01-especialista.svg";
  if (slug.includes("dna-da-empresa")) return "/icons/02-empresa.svg";
  if (slug.includes("dna-de-conteudo")) return "/icons/03-dna-conteudo.svg";
  if (slug.includes("tom-de-voz")) return "/icons/06-tom-de-voz.svg";
  if (slug.includes("identidade-visual")) return "/icons/07-identidade-visual.svg";
  if (slug.includes("objetivos")) return "/icons/08-objetivos.svg";

  if (slug.includes("referencias-e-concorrentes")) {
    return "/icons/09-referencias-e-concorrentes.svg";
  }

  if (slug.includes("pesquisa-de-concorrencia")) {
    return "/icons/10-pesquisa-de-concorrencia.svg";
  }

  if (slug.includes("analise-swot")) return "/icons/11-analise-swot.svg";
  if (slug.includes("palavras-chave")) return "/icons/12-palavras-chave.svg";
  if (slug.includes("personas")) return "/icons/13-personas.svg";
  if (slug.includes("jornada-de-compra")) return "/icons/14-jornada-de-compra.svg";
  if (slug.includes("canais-digitais-atuais")) return "/icons/15-canais-digitais.svg";
  if (slug.includes("funil")) return "/icons/16-funil-de-conteudo.svg";
  if (slug.includes("linhas-editoriais")) return "/icons/17-linhas-editoriais.svg";

  if (slug.includes("instagram")) return "/icons/18-instagram.svg";
  if (slug.includes("tiktok")) return "/icons/19-tik-tok.svg";
  if (slug.includes("youtube")) return "/icons/20-youtube.svg";
  if (slug.includes("facebook")) return "/icons/21-facebook.svg";
  if (slug.includes("linkedin")) return "/icons/22-linkedin.svg";
  if (slug.includes("whatsapp")) return "/icons/23-whatsaap.svg";
  if (slug.includes("blog")) return "/icons/24-blog.svg";
  if (slug.includes("pinterest")) return "/icons/25-pinterest.svg";
  if (slug.includes("podcasts")) return "/icons/26-podcast.svg";
  if (slug.includes("lives")) return "/icons/27-lives.svg";

  if (slug.includes("materiais-educacionais")) {
    return "/icons/28-materiais-educacionais.svg";
  }

  if (slug.includes("estrategia-do-site")) return "/icons/29-estrategia-do-site.svg";
  if (slug.includes("mapa-do-site")) return "/icons/30-mapa-do-site.svg";

  if (slug.includes("captacao-de-lead")) return "/icons/31-campanha-leads.svg";
  if (slug.includes("conversao-de-vendas")) return "/icons/32-campanha-vendas.svg";

  if (slug.includes("distribuicao-de-conteudo")) {
    return "/icons/33-campanha-conteudo.svg";
  }

  if (slug.includes("fluxo-de-automacao")) return "/icons/34-fluxo-de-automacao.svg";
  if (slug.includes("linha-do-tempo")) return "/icons/35-linha-do-tempo.svg";

  if (slug.includes("calendario-de-conteudo")) {
    return "/icons/36-calendario-de-conteudo.svg";
  }

  if (slug.includes("metricas-e-indicadores")) {
    return "/icons/37-metricas-e-indicadores.svg";
  }

  if (slug.includes("orientacoes")) return "/icons/38-orientacoes.svg";

  return "/icons/38-orientacoes.svg";
}

function getPresentationBlocks(slug: string): ContentBlock[] {
  const blocksBySlug: Record<string, ContentBlock[]> = {
    "dna-da-empresa": [
      {
        title: "Sobre a empresa",
        content:
          "Aqui entra a apresentação da empresa, explicando o que ela faz, para quem atua, qual problema resolve e qual papel ocupa no mercado.",
      },
      {
        title: "Diferenciais competitivos",
        content:
          "Aqui entram os pontos que tornam a empresa diferente, mais forte ou mais relevante em relação às alternativas disponíveis no mercado.",
      },
      {
        title: "Proposta de valor",
        content:
          "Aqui entra a principal promessa de valor da empresa, deixando claro por que o cliente deveria escolher esta solução.",
      },
      {
        title: "Percepção desejada",
        content:
          "Aqui entra como a empresa deseja ser percebida pelo público, pelo mercado e pelos potenciais clientes.",
      },
    ],

    "dna-de-conteudo": [
      {
        title: "Posicionamento único",
        content:
          "Aqui entra a forma como o projeto deseja ser percebido no mercado e qual espaço deve ocupar na mente do público.",
      },
      {
        title: "Proposta única de valor",
        content:
          "Aqui entra o valor mais forte, específico e diferenciador que o conteúdo precisa comunicar.",
      },
      {
        title: "Maior transformação que o conteúdo entrega",
        content:
          "Aqui entra a principal mudança que o conteúdo deve provocar na percepção, consciência ou decisão do público.",
      },
      {
        title: "A Big Idea do conteúdo",
        content:
          "Aqui entra a ideia central que deve nortear toda a comunicação e sustentar a estratégia editorial.",
      },
      {
        title: "Ideias secundárias",
        content:
          "Aqui entram as ideias derivadas da Big Idea, que ajudam a sustentar pautas, narrativas e ângulos de conteúdo.",
      },
    ],

    "tom-de-voz": [
      {
        title: "Como a voz do especialista deve ser percebida",
        content:
          "Aqui entra a percepção que a linguagem precisa gerar no público, como autoridade, proximidade, profundidade, clareza ou provocação.",
      },
      {
        title: "Termos e expressões",
        content:
          "Aqui entram palavras, expressões e construções que devem fazer parte da comunicação do especialista.",
      },
      {
        title: "Elementos importantes",
        content:
          "Aqui entram elementos narrativos, frases, ideias, temas ou estruturas que precisam aparecer com frequência na comunicação.",
      },
      {
        title: "Emoções predominantes",
        content:
          "Aqui entram as emoções que a comunicação deve despertar, como confiança, segurança, identificação, desejo, urgência ou consciência.",
      },
      {
        title: "Observações sobre o tom de voz e narrativa",
        content:
          "Aqui entram observações complementares sobre a forma de escrever, falar, se posicionar e construir a narrativa do especialista.",
      },
    ],

    "identidade-visual": [
      {
        title: "Direção visual",
        content:
          "Aqui entra a orientação estética do projeto, incluindo estilo visual, atmosfera, referências e percepção desejada.",
      },
      {
        title: "Cores, fontes e elementos",
        content:
          "Aqui entram as diretrizes de cores, fontes, símbolos, grafismos e elementos visuais que devem compor a identidade.",
      },
      {
        title: "Aplicação visual",
        content:
          "Aqui entra como a identidade visual deve ser aplicada em redes sociais, site, materiais, campanhas e demais pontos de contato.",
      },
    ],

    "objetivos-do-projeto": [
      {
        title: "Objetivo principal",
        content:
          "Aqui entra o principal objetivo do projeto e o resultado mais importante que ele precisa alcançar.",
      },
      {
        title: "Objetivos secundários",
        content:
          "Aqui entram os objetivos complementares que ajudam a sustentar a evolução do projeto.",
      },
      {
        title: "Critérios de sucesso",
        content:
          "Aqui entram os sinais que indicam que a estratégia está caminhando na direção certa.",
      },
    ],
  };

  return (
    blocksBySlug[slug] || [
      {
        title: "Visão geral",
        content:
          "Aqui será apresentado o conteúdo preenchido nesta seção do planejamento, organizado em formato de leitura para facilitar a compreensão do cliente.",
      },
      {
        title: "Direcionamento estratégico",
        content:
          "Este bloco deve explicar os pontos mais importantes da seção, traduzindo as respostas do planejamento em orientação clara para tomada de decisão.",
      },
      {
        title: "Aplicação prática",
        content:
          "Aqui entra como as informações desta seção devem ser usadas na comunicação, no conteúdo, nos canais, nas campanhas ou na execução do projeto.",
      },
    ]
  );
}

function IconImage({
  slug,
  large = false,
  inverted = false,
  hoverInvert = false,
}: {
  slug: string;
  large?: boolean;
  inverted?: boolean;
  hoverInvert?: boolean;
}) {
  return (
    <img
      src={getIconPath(slug)}
      alt=""
      className={cx(
        "object-contain transition",
        large ? "h-10 w-10" : "h-5 w-5",
        inverted && "brightness-0 invert",
        hoverInvert && "group-hover:brightness-0 group-hover:invert"
      )}
    />
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5" fill="none">
      <path
        d="M14 32h34M36 20l12 12-12 12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-4 w-4" fill="none">
      <path
        d="M28 16H16v32h12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 22l10 10-10 10M44 32H26"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionTitle({
  section,
  customDescription,
}: {
  section: Section;
  customDescription?: string;
}) {
  return (
    <header className="border-b border-slate-200 pb-10">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
          <IconImage slug={section.slug} large inverted />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            {section.category}
          </p>

          <h2 className="mt-2 max-w-4xl text-5xl font-light tracking-[-0.04em] text-slate-950">
            {displayTitle(section)}
          </h2>
        </div>
      </div>

      <p className="mt-6 max-w-[980px] text-lg leading-9 text-slate-600">
        {customDescription || section.description}
      </p>
    </header>
  );
}

function TextBlock({ block }: { block: ContentBlock }) {
  return (
    <article className="border-b border-slate-200 py-10 last:border-b-0">
      <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
        {block.title}
      </h3>

      <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
        {block.content}
      </p>
    </article>
  );
}

function SpecialistPresentation({ section }: { section: Section }) {
  const [specialistData, setSpecialistData] =
    useState<SpecialistPresentationData>({
      fields: {},
      photo: "",
      characteristics: [],
    });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-especialista"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      const characteristics = Array.isArray(parsed.characteristics)
        ? parsed.characteristics.filter(
            (item: { title?: string; description?: string }) =>
              item.title?.trim() || item.description?.trim()
          )
        : [];

      setSpecialistData({
        fields: parsed.fields || {},
        photo: parsed.photo || "",
        characteristics,
      });
    } catch {
      setSpecialistData({
        fields: {},
        photo: "",
        characteristics: [],
      });
    }
  }, []);

  const specialistBlocks: ContentBlock[] = [
    {
      title: "Quem é e o que faz",
      content:
        specialistData.fields.quemEoQueFaz ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "Especialidades e expertise",
      content:
        specialistData.fields.especialidadesExpertise ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "Trajetória profissional",
      content:
        specialistData.fields.trajetoriaProfissional ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "História pessoal",
      content:
        specialistData.fields.historiaPessoal ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "Marcos e conquistas",
      content:
        specialistData.fields.marcosConquistas ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "Bandeiras e causas",
      content:
        specialistData.fields.bandeirasCausas ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "Propósito no digital",
      content:
        specialistData.fields.propositoDigital ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "Autodefinição",
      content:
        specialistData.fields.autodefinicao ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
    {
      title: "Como gostaria de ser visto",
      content:
        specialistData.fields.comoGostariaDeSerVisto ||
        "Conteúdo ainda não preenchido no painel do especialista.",
    },
  ];

  const personalityItems = specialistData.characteristics.filter(
    (item) => item.title?.trim() || item.description?.trim()
  );

  const leftPersonalityItems = personalityItems.filter(
    (_, index) => index % 2 === 0
  );

  const rightPersonalityItems = personalityItems.filter(
    (_, index) => index % 2 !== 0
  );

  function PersonalityTrait({
  characteristic,
  index,
}: {
  characteristic: SpecialistCharacteristic;
  index: number;
}) {
  return (
    <div className="group relative rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/5">
      <div className="mb-5 flex items-center gap-3">
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
    {String(index + 1).padStart(2, "0")}
  </span>

  <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
    {characteristic.title || "Característica"}
  </h4>
</div>

      {characteristic.description && (
        <p className="mt-4 text-base leading-8 text-slate-600">
          {characteristic.description}
        </p>
      )}
    </div>
  );
}

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a base humana e profissional do projeto. O objetivo é deixar claro quem é o especialista, o que sustenta sua autoridade e quais elementos devem ser valorizados na comunicação."
      />

      <div className="mt-2">
        {specialistBlocks.map((block) => (
          <TextBlock key={block.title} block={block} />
        ))}
      </div>

               <article className="border-t border-slate-200 pt-14">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Mapa de personalidade pública
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Personalidade do especialista
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esses traços orientam a forma como o especialista deve ser percebido,
            lembrado e reconhecido pelo público.
          </p>
        </div>

        {personalityItems.length || specialistData.photo ? (
          <div className="mt-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)] lg:items-center">
              <div className="space-y-5">
                {leftPersonalityItems.map((characteristic, index) => (
                  <PersonalityTrait
                    key={`${characteristic.title}-left-${index}`}
                    characteristic={characteristic}
                    index={index * 2}
                  />
                ))}
              </div>

              <div className="mx-auto flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-center text-sm font-medium text-white shadow-lg shadow-slate-950/10 ring-8 ring-slate-50">
                {specialistData.photo ? (
                  <img
                    src={specialistData.photo}
                    alt="Foto do especialista"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="px-8">Foto do especialista</span>
                )}
              </div>

              <div className="space-y-5">
                {rightPersonalityItems.map((characteristic, index) => (
                  <PersonalityTrait
                    key={`${characteristic.title}-right-${index}`}
                    characteristic={characteristic}
                    index={index * 2 + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-[1.5rem] bg-slate-50 p-8 ring-1 ring-slate-200">
            <p className="text-sm leading-7 text-slate-500">
              A personalidade do especialista ainda não foi preenchida no painel.
            </p>
          </div>
        )}
      </article>   
    </section>
  );
}


function CompanyPresentation({ section }: { section: Section }) {
  const [companyData, setCompanyData] = useState<Record<string, string>>({});

  useEffect(() => {
    const possibleKeys = [
      "metodo-epc-demo-dna-empresa",
      "metodo-epc-demo-empresa",
    ];

    for (const key of possibleKeys) {
      const savedData = window.localStorage.getItem(key);

      if (!savedData) {
        continue;
      }

      try {
        const parsed = JSON.parse(savedData);

        setCompanyData(parsed.fields || parsed || {});
        return;
      } catch {
        setCompanyData({});
      }
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

  function getFieldValue(possibleFieldKeys: string[]) {
    for (const key of possibleFieldKeys) {
      const value = companyData[key];

      if (value?.trim()) {
        return value;
      }
    }

    return demoText;
  }

  const companyBlocks: ContentBlock[] = [
    {
      title: "Quem é a empresa",
      content: getFieldValue([
        "quemEAEmpresa",
        "quemEmpresa",
        "quem_e_a_empresa",
        "quem é a empresa",
      ]),
    },
    {
      title: "O que a empresa faz",
      content: getFieldValue([
        "oQueAEmpresaFaz",
        "oQueFaz",
        "o_que_a_empresa_faz",
        "o que a empresa faz",
      ]),
    },
    {
      title: "História da empresa",
      content: getFieldValue([
        "historiaDaEmpresa",
        "historia",
        "história da empresa",
        "historia_da_empresa",
      ]),
    },
    {
      title: "Posicionamento",
      content: getFieldValue([
        "posicionamento",
        "posicionamentoDaEmpresa",
      ]),
    },
    {
      title: "Diferenciais competitivos",
      content: getFieldValue([
        "diferenciaisCompetitivos",
        "diferenciais",
        "diferenciais_competitivos",
      ]),
    },
    {
      title: "Público principal",
      content: getFieldValue([
        "publicoPrincipal",
        "publico",
        "público principal",
        "publico_principal",
      ]),
    },
    {
      title: "Problemas que resolve",
      content: getFieldValue([
        "problemasQueResolve",
        "problemas",
        "problemas_que_resolve",
      ]),
    },
    {
      title: "Transformação entregue",
      content: getFieldValue([
        "transformacaoEntregue",
        "transformação entregue",
        "transformacao_entregue",
      ]),
    },
    {
      title: "Proposta de valor",
      content: getFieldValue([
        "propostaDeValor",
        "propostaValor",
        "proposta_de_valor",
      ]),
    },
    {
      title: "Missão",
      content: getFieldValue(["missao", "missão"]),
    },
    {
      title: "Visão",
      content: getFieldValue(["visao", "visão"]),
    },
    {
      title: "Valores",
      content: getFieldValue(["valores"]),
    },
    {
      title: "Autoridade e provas",
      content: getFieldValue([
        "autoridadeEProvas",
        "autoridadeProvas",
        "autoridade_e_provas",
      ]),
    },
    {
      title: "Percepção desejada",
      content: getFieldValue([
        "percepcaoDesejada",
        "percepção desejada",
        "percepcao_desejada",
      ]),
    },
  ];

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a base estratégica da empresa: quem ela é, o que faz, como se posiciona, quais diferenciais sustentam sua autoridade e como deseja ser percebida pelo mercado."
      />

      <div className="mt-2">
        {companyBlocks.map((block) => (
          <TextBlock key={block.title} block={block} />
        ))}
      </div>
    </section>
  );
}

function ContentDnaPresentation({ section }: { section: Section }) {
  const [contentDnaData, setContentDnaData] = useState<{
    fields: Record<string, string>;
    secondaryIdeas: string[];
  }>({
    fields: {},
    secondaryIdeas: [],
  });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-dna-conteudo"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setContentDnaData({
        fields: parsed.fields || {},
        secondaryIdeas: Array.isArray(parsed.secondaryIdeas)
          ? parsed.secondaryIdeas.filter((idea: string) => idea?.trim())
          : [],
      });
    } catch {
      setContentDnaData({
        fields: {},
        secondaryIdeas: [],
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

  function getFieldValue(fieldKey: string) {
    const value = contentDnaData.fields[fieldKey];

    if (value?.trim()) {
      return value;
    }

    return demoText;
  }

  const contentBlocks: ContentBlock[] = [
    {
      title: "Posicionamento único",
      content: getFieldValue("posicionamentoUnico"),
    },
    {
      title: "Proposta única de valor",
      content: getFieldValue("propostaUnicaValor"),
    },
    {
      title: "Maior transformação que o conteúdo entrega",
      content: getFieldValue("maiorTransformacao"),
    },
    {
      title: "A Big Idea do conteúdo",
      content: getFieldValue("bigIdea"),
    },
  ];

  const demoIdeas = [
    "Crescimento sem estrutura interna é instável.",
    "Clareza precede qualquer decisão consistente.",
    "Decisão desalinhada gera resultado desalinhado.",
  ];

  const ideasToShow = contentDnaData.secondaryIdeas.length
    ? contentDnaData.secondaryIdeas
    : demoIdeas;

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a essência estratégica do conteúdo: o posicionamento que ele precisa sustentar, a proposta de valor que deve comunicar, a transformação que precisa entregar e a grande ideia que orienta a narrativa."
      />

      <div className="mt-2">
        {contentBlocks.map((block) => (
          <TextBlock key={block.title} block={block} />
        ))}
      </div>

      <article className="border-t border-slate-200 pt-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Ideias secundárias
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Ideias derivadas da Big Idea que ajudam a sustentar pautas,
            narrativas, ângulos de conteúdo e argumentos recorrentes da
            comunicação.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {ideasToShow.map((idea, index) => (
            <div
              key={`${idea}-${index}`}
              className="flex gap-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-base leading-8 text-slate-700">{idea}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ToneVoicePresentation({ section }: { section: Section }) {
  const [toneData, setToneData] = useState<ToneVoicePresentationData>({
    characteristics: [],
    toneChoices: {},
    vocabulary: {},
    emotions: [],
    observations: "",
    references: [],
  });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-tom-de-voz"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setToneData({
        characteristics: Array.isArray(parsed.characteristics)
          ? parsed.characteristics.filter(
              (item: ToneCharacteristic) =>
                item.title?.trim() || item.description?.trim()
            )
          : [],
        toneChoices: parsed.toneChoices || {},
        vocabulary: parsed.vocabulary || {},
        emotions: Array.isArray(parsed.emotions)
          ? parsed.emotions.filter((item: string) => item?.trim())
          : [],
        observations: parsed.observations || "",
        references: Array.isArray(parsed.references)
          ? parsed.references.filter(
              (item: ToneReference) =>
                item.image?.trim() || item.title?.trim() || item.link?.trim()
            )
          : [],
      });
    } catch {
      setToneData({
        characteristics: [],
        toneChoices: {},
        vocabulary: {},
        emotions: [],
        observations: "",
        references: [],
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const demoCharacteristics: ToneCharacteristic[] = [
    {
      title: "Clareza",
      description:
        "A comunicação deve ser objetiva, compreensível e fácil de acompanhar, mesmo quando tratar de temas mais profundos.",
    },
    {
      title: "Autoridade",
      description:
        "O tom precisa transmitir segurança, domínio e critério, sem parecer distante ou excessivamente técnico.",
    },
    {
      title: "Proximidade",
      description:
        "A marca deve conversar com o público de forma humana, acessível e conectada com sua realidade.",
    },
    {
      title: "Direção",
      description:
        "A comunicação precisa conduzir o público para uma percepção mais clara sobre o problema, a solução e o próximo passo.",
    },
  ];

  const characteristicsToShow = toneData.characteristics.length
    ? toneData.characteristics
    : demoCharacteristics;

  const selectedToneChoices = Object.values(toneData.toneChoices).filter(
    (value) => value?.trim()
  );

  const demoToneChoices = [
    "Acolhedor",
    "Sério",
    "Técnico",
    "Inspirador",
    "Educativo",
    "Racional",
  ];

  const toneChoicesToShow = selectedToneChoices.length
    ? selectedToneChoices
    : demoToneChoices;

  const emotionsToShow = toneData.emotions.length
    ? toneData.emotions
    : ["Confiança", "Determinação", "Tranquilidade", "Envolvimento"];

  function getVocabularyValue(key: string) {
    const value = toneData.vocabulary[key];

    if (value?.trim()) {
      return value;
    }

    return demoText;
  }

  const vocabularyBlocks: ContentBlock[] = [
    {
      title: "Termos autorais",
      content: getVocabularyValue("termosAutorais"),
    },
    {
      title: "Termos técnicos necessários",
      content: getVocabularyValue("termosTecnicosNecessarios"),
    },
    {
      title: "Termos que se repetem",
      content: getVocabularyValue("termosQueSeRepetem"),
    },
    {
      title: "Termos proibidos",
      content: getVocabularyValue("termosProibidos"),
    },
    {
      title: "Metáforas e analogias",
      content: getVocabularyValue("metaforasEAnalogias"),
    },
    {
      title: "Elementos da narrativa",
      content: getVocabularyValue("elementosDaNarrativa"),
    },
  ];

  const referencesToShow = toneData.references.length
    ? toneData.references
    : [
        {
          image: "",
          title: "Referência de linguagem",
          link: "https://exemplo.com",
        },
        {
          image: "",
          title: "Canal de inspiração",
          link: "https://exemplo.com",
        },
      ];

  function ToneTag({ label }: { label: string }) {
    return (
      <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">
        {label}
      </span>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção define como a marca deve falar, escrever e se posicionar. O tom de voz orienta conteúdos, legendas, vídeos, páginas, campanhas, e-mails e interações com o público."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Direção de linguagem
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Características do tom de voz
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Estes traços funcionam como referência para manter consistência na
            forma como a marca se expressa em todos os pontos de contato.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {characteristicsToShow.map((characteristic, index) => (
            <div
              key={`${characteristic.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
    {String(index + 1).padStart(2, "0")}
  </span>

  <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
    {characteristic.title || "Característica"}
  </h4>
</div>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {characteristic.description || demoText}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Tom de voz do discurso
          </h3>

          
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {toneChoicesToShow.map((choice, index) => (
            <ToneTag key={`${choice}-${index}`} label={choice} />
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
  <div className="max-w-[980px]">
    <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
      Vocabulário e estrutura
    </h3>

    <p className="mt-5 text-lg leading-9 text-slate-600">
      Estes elementos orientam as palavras, expressões, metáforas e
      recursos narrativos que sustentam a comunicação.
    </p>
  </div>

  <div className="mt-9 grid gap-5 md:grid-cols-2">
    {vocabularyBlocks.map((block, index) => (
      <div
        key={block.title}
        className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
            {block.title}
          </h4>
        </div>

        <p className="text-base leading-8 text-slate-600">
          {block.content}
        </p>
      </div>
    ))}
  </div>
</article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Emoção predominante
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Estas emoções devem orientar a sensação que a comunicação provoca no
            público.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {emotionsToShow.map((emotion, index) => (
            <ToneTag key={`${emotion}-${index}`} label={emotion} />
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
          Observações sobre o tom de voz
        </h3>

        <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
          {toneData.observations?.trim() || demoText}
        </p>
      </article>

      <article className="pt-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Referências externas
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Perfis, canais, marcas, vídeos ou materiais usados como referência
            para visualizar melhor a direção de linguagem.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {referencesToShow.map((reference, index) => (
            <div
              key={`${reference.title}-${index}`}
              className="flex items-center gap-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-medium text-white">
                {reference.image ? (
                  <img
                    src={reference.image}
                    alt={reference.title || "Referência externa"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Ref."
                )}
              </div>

              <div className="min-w-0">
                <p className="text-lg font-medium tracking-[-0.025em] text-slate-950">
                  {reference.title || "Referência externa"}
                </p>

                {reference.link && (
                  <a
                    href={reference.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-slate-500 underline underline-offset-4 transition hover:text-slate-950"
                  >
                    Acessar referência
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function VisualIdentityPresentation({ section }: { section: Section }) {
  const [visualData, setVisualData] = useState<VisualIdentityPresentationData>({
    fields: {},
    colors: [],
    visualReferences: [],
    externalReferences: [],
  });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-identidade-visual"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setVisualData({
        fields: parsed.fields || {},
        colors: Array.isArray(parsed.colors)
          ? parsed.colors.filter(
              (item: VisualColor) =>
                item.name?.trim() || item.color?.trim() || item.code?.trim()
            )
          : [],
        visualReferences: Array.isArray(parsed.visualReferences)
          ? parsed.visualReferences.filter(
              (item: VisualReferencePresentation) => item.image?.trim()
            )
          : [],
        externalReferences: Array.isArray(parsed.externalReferences)
          ? parsed.externalReferences.filter(
              (item: VisualExternalReference) =>
                item.image?.trim() || item.title?.trim() || item.link?.trim()
            )
          : [],
      });
    } catch {
      setVisualData({
        fields: {},
        colors: [],
        visualReferences: [],
        externalReferences: [],
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const demoColors: VisualColor[] = [
  {
    name: "Preto estratégico",
    color: "#020617",
    code: "#020617",
  },
  {
    name: "Branco editorial",
    color: "#FFFFFF",
    code: "#FFFFFF",
  },
  {
    name: "Dourado discreto",
    color: "#C8A45D",
    code: "#C8A45D",
  },
];

  const colorsToShow = visualData.colors.length
    ? visualData.colors
    : demoColors;

  const visualReferencesToShow = visualData.visualReferences.length
    ? visualData.visualReferences
    : [
        { image: "" },
        { image: "" },
        { image: "" },
      ];

  const externalReferencesToShow = visualData.externalReferences.length
    ? visualData.externalReferences
    : [
        {
          image: "",
          title: "Moodboard de referência",
          link: "https://exemplo.com",
        },
        {
          image: "",
          title: "Perfil visual de inspiração",
          link: "https://exemplo.com",
        },
      ];

  function getFieldValue(key: string) {
    const value = visualData.fields[key];

    if (value?.trim()) {
      return value;
    }

    return demoText;
  }

  const visualBlocks: ContentBlock[] = [
    {
      title: "Fontes e tipografia",
      content: getFieldValue("fontesETipografia"),
    },
    {
      title: "Elementos visuais",
      content: getFieldValue("elementosVisuais"),
    },
    {
      title: "O que evitar",
      content: getFieldValue("oQueEvitar"),
    },
  ];

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção reúne a direção estética do projeto: estilo visual, paleta, tipografia, referências de imagem e elementos que devem orientar a comunicação visual."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Direção estética
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Direção visual
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            {getFieldValue("direcaoVisual")}
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Paleta de cores
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cores principais que orientam a percepção visual do projeto e ajudam
            a manter consistência nos materiais, conteúdos e pontos de contato.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {colorsToShow.map((colorItem, index) => (
            <div
              key={`${colorItem.color}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div
                  className="h-20 w-20 shrink-0 rounded-full shadow-inner ring-1 ring-slate-200"
                  style={{ backgroundColor: colorItem.color || "#000000" }}
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Cor {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-2 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {colorItem.name || "Cor da identidade"}
                  </h4>

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {colorItem.code || colorItem.color}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Diretrizes visuais
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Orientações práticas para manter a identidade coerente em conteúdos,
            materiais, páginas, campanhas e demais pontos de contato.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {visualBlocks.map((block, index) => (
            <div
              key={block.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                  {block.title}
                </h4>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {block.content}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Referências visuais
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Imagens que ajudam a traduzir a estética, atmosfera e sensação visual
            desejada para o projeto.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {visualReferencesToShow.map((reference, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm"
            >
              <div className="aspect-[4/3] bg-slate-100">
                {reference.image ? (
                  <img
                    src={reference.image}
                    alt={`Referência visual ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-medium text-slate-400">
                    Referência visual
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                  Imagem {String(index + 1).padStart(2, "0")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="pt-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Referências externas
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Moodboards, marcas, perfis, sites, vídeos ou páginas usados como
            referência para visualizar melhor a direção estética do projeto.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {externalReferencesToShow.map((reference, index) => (
            <div
              key={`${reference.title}-${index}`}
              className="flex items-center gap-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-medium text-white">
                {reference.image ? (
                  <img
                    src={reference.image}
                    alt={reference.title || "Referência externa"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Ref."
                )}
              </div>

              <div className="min-w-0">
                <p className="text-lg font-medium tracking-[-0.025em] text-slate-950">
                  {reference.title || "Referência externa"}
                </p>

                {reference.link && (
                  <a
                    href={reference.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-slate-500 underline underline-offset-4 transition hover:text-slate-950"
                  >
                    Acessar referência
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ProjectObjectivesPresentation({ section }: { section: Section }) {
  const [objectivesData, setObjectivesData] =
    useState<ProjectObjectivesPresentationData>({
      mainObjective: {
        title: "",
        description: "",
      },
      secondaryObjectives: [],
      priorities: [],
      successIndicators: [],
      expectedResults: [],
      phases: [],
      strategicObservation: "",
    });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-objetivos-do-projeto"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setObjectivesData({
        mainObjective: parsed.mainObjective || {
          title: "",
          description: "",
        },
        secondaryObjectives: Array.isArray(parsed.secondaryObjectives)
          ? parsed.secondaryObjectives.filter(
              (item: ProjectSimpleItem) =>
                item.title?.trim() || item.description?.trim()
            )
          : [],
        priorities: Array.isArray(parsed.priorities)
          ? parsed.priorities.filter(
              (item: ProjectSimpleItem) =>
                item.title?.trim() || item.description?.trim()
            )
          : [],
        successIndicators: Array.isArray(parsed.successIndicators)
          ? parsed.successIndicators.filter(
              (item: ProjectSimpleItem) =>
                item.title?.trim() || item.description?.trim()
            )
          : [],
        expectedResults: Array.isArray(parsed.expectedResults)
          ? parsed.expectedResults.filter(
              (item: ProjectSimpleItem) =>
                item.title?.trim() || item.description?.trim()
            )
          : [],
        phases: Array.isArray(parsed.phases)
          ? parsed.phases.filter(
              (item: ProjectPhaseItem) =>
                item.title?.trim() ||
                item.period?.trim() ||
                item.description?.trim()
            )
          : [],
        strategicObservation: parsed.strategicObservation || "",
      });
    } catch {
      setObjectivesData({
        mainObjective: {
          title: "",
          description: "",
        },
        secondaryObjectives: [],
        priorities: [],
        successIndicators: [],
        expectedResults: [],
        phases: [],
        strategicObservation: "",
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const mainObjectiveToShow =
    objectivesData.mainObjective.title?.trim() ||
    objectivesData.mainObjective.description?.trim()
      ? objectivesData.mainObjective
      : {
          title: "Construir direção estratégica para o crescimento",
          description:
            "Definir com clareza o caminho que o projeto deve seguir, orientando decisões de posicionamento, conteúdo, comunicação e execução.",
        };

  const secondaryObjectivesToShow = objectivesData.secondaryObjectives.length
    ? objectivesData.secondaryObjectives
    : [
        {
          title: "Fortalecer autoridade",
          description:
            "Aumentar a percepção de valor do projeto por meio de uma comunicação mais clara, consistente e estratégica.",
        },
        {
          title: "Organizar canais",
          description:
            "Criar uma estrutura mais objetiva para os canais digitais, facilitando produção, distribuição e acompanhamento.",
        },
        {
          title: "Gerar demanda qualificada",
          description:
            "Conduzir o público certo para etapas mais claras de interesse, relacionamento e conversão.",
        },
      ];

  const prioritiesToShow = objectivesData.priorities.length
    ? objectivesData.priorities
    : [
        {
          title: "Clareza",
          description: "Decidir com base em direção estratégica.",
        },
        {
          title: "Autoridade",
          description: "Reforçar percepção de valor e confiança.",
        },
        {
          title: "Conversão",
          description: "Transformar atenção em oportunidades reais.",
        },
      ];

  const indicatorsToShow = objectivesData.successIndicators.length
    ? objectivesData.successIndicators
    : [
        {
          title: "Leads qualificados",
          description:
            "Acompanhar o aumento de contatos com perfil alinhado ao projeto.",
        },
        {
          title: "Engajamento estratégico",
          description:
            "Observar interações que indiquem compreensão, interesse e avanço na jornada.",
        },
        {
          title: "Oportunidades geradas",
          description:
            "Medir reuniões, conversas, propostas ou vendas originadas pelos canais.",
        },
      ];

  const expectedResultsToShow = objectivesData.expectedResults.length
    ? objectivesData.expectedResults
    : [
        {
          title: "Mais clareza de posicionamento",
          description:
            "O projeto passa a comunicar com mais precisão quem é, para quem existe e por que importa.",
        },
        {
          title: "Comunicação mais consistente",
          description:
            "Os conteúdos ganham unidade, intenção e coerência entre canais.",
        },
        {
          title: "Crescimento com critério",
          description:
            "As decisões passam a ser orientadas por prioridades, indicadores e direção estratégica.",
        },
      ];

  const phasesToShow = objectivesData.phases.length
    ? objectivesData.phases
    : [
        {
          title: "Estruturação",
          period: "Fase 01",
          description:
            "Organizar a base estratégica, alinhar prioridades e definir a direção inicial do projeto.",
        },
        {
          title: "Implementação",
          period: "Fase 02",
          description:
            "Transformar a estratégia em canais, conteúdos, campanhas e rotinas de execução.",
        },
        {
          title: "Acompanhamento",
          period: "Fase 03",
          description:
            "Monitorar indicadores, ajustar decisões e evoluir a execução com base nos resultados.",
        },
      ];

  const observationToShow =
    objectivesData.strategicObservation?.trim() ||
    "Os objetivos devem funcionar como critérios de decisão. Eles orientam o que priorizar, o que evitar, como medir avanço e quais movimentos devem conduzir o crescimento do projeto.";

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção organiza a direção que o projeto precisa seguir. Os objetivos orientam prioridades, indicadores, resultados esperados e fases de evolução."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white lg:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/45">
            Objetivo principal
          </p>

          <h3 className="mt-5 max-w-4xl text-4xl font-light tracking-[-0.045em] text-white">
            {mainObjectiveToShow.title || "Objetivo principal"}
          </h3>

          <p className="mt-6 max-w-[980px] text-lg font-light leading-9 text-white/75">
            {mainObjectiveToShow.description || demoText}
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Objetivos secundários
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Objetivos complementares que sustentam a direção central do projeto
            e ajudam a transformar estratégia em execução.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {secondaryObjectivesToShow.map((objective, index) => (
            <div
              key={`${objective.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                  {objective.title || "Objetivo"}
                </h4>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {objective.description || demoText}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Prioridades estratégicas
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Prioridades que devem conduzir escolhas, decisões e esforços durante
            a execução do projeto.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {prioritiesToShow.map((priority, index) => (
            <div
              key={`${priority.title}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                Prioridade {String(index + 1).padStart(2, "0")}
              </p>

              <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
                {priority.title || "Prioridade"}
              </h4>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {priority.description || demoText}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Indicadores de sucesso
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Sinais, métricas ou evidências que mostram se o projeto está
            evoluindo na direção certa.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {indicatorsToShow.map((indicator, index) => (
            <div
              key={`${indicator.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19V5" />
                    <path d="M4 19H20" />
                    <path d="M8 15L11 12L14 14L19 8" />
                    <path d="M19 8V12" />
                    <path d="M19 8H15" />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Indicador {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-2 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {indicator.title || "Indicador"}
                  </h4>
                </div>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {indicator.description || demoText}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Resultados esperados
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Resultados que o projeto deve gerar quando a execução estiver
            alinhada aos objetivos definidos.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {expectedResultsToShow.map((result, index) => (
            <div
              key={`${result.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h4 className="mt-5 text-2xl font-light tracking-[-0.035em] text-slate-950">
                {result.title || "Resultado"}
              </h4>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {result.description || demoText}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <h3 className="text-3xl font-light tracking-[-0.035em] text-slate-950">
            Prazos e fases
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Etapas que organizam a evolução do projeto e ajudam a visualizar a
            execução ao longo do tempo.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {phasesToShow.map((phase, index) => (
            <div
              key={`${phase.title}-${index}`}
              className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 md:grid-cols-[140px_minmax(0,1fr)]"
            >
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                  {phase.period || `Fase ${String(index + 1).padStart(2, "0")}`}
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                  {phase.title || "Fase do projeto"}
                </h4>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  {phase.description || demoText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="pt-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Observação estratégica
          </p>

          <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
            {observationToShow}
          </p>
        </div>
      </article>
    </section>
  );
}

function ReferencesCompetitorsPresentation({ section }: { section: Section }) {
  const referenceChannels: ReferenceChannel[] = [
    {
      key: "site",
      label: "Site",
      icon: "/icons/29-estrategia-do-site.svg",
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: "/icons/18-instagram.svg",
    },
    {
      key: "tiktok",
      label: "TikTok",
      icon: "/icons/19-tik-tok.svg",
    },
    {
      key: "youtube",
      label: "YouTube",
      icon: "/icons/20-youtube.svg",
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: "/icons/21-facebook.svg",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: "/icons/22-linkedin.svg",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: "/icons/23-whatsaap.svg",
    },
    {
      key: "blog",
      label: "Blog",
      icon: "/icons/24-blog.svg",
    },
    {
      key: "pinterest",
      label: "Pinterest",
      icon: "/icons/25-pinterest.svg",
    },
    {
      key: "podcast",
      label: "Podcast",
      icon: "/icons/26-podcast.svg",
    },
  ];

  function createEmptyReferenceChannels(): Record<ReferenceChannelKey, string> {
    return {
      site: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      facebook: "",
      linkedin: "",
      whatsapp: "",
      blog: "",
      pinterest: "",
      podcast: "",
    };
  }

  function normalizeReferenceItem(
    item: Partial<ReferenceCompetitorPresentationItem> & {
      link?: string;
      analysisTitle?: string;
      analysisDescription?: string;
    }
  ): ReferenceCompetitorPresentationItem {
    const channels = {
      ...createEmptyReferenceChannels(),
      ...(item.channels || {}),
    };

    if (item.link && !channels.site) {
      channels.site = item.link;
    }

    const analyses =
      Array.isArray(item.analyses) && item.analyses.length
        ? item.analyses.map((analysis) => ({
            title: analysis.title || "",
            description: analysis.description || "",
          }))
        : [
            {
              title: item.analysisTitle || "",
              description: item.analysisDescription || "",
            },
          ];

    return {
      image: item.image || "",
      title: item.title || "",
      channels,
      analyses,
    };
  }

  const [referencesData, setReferencesData] =
    useState<ReferencesCompetitorsPresentationData>({
      items: [],
    });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-referencias-e-concorrentes"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setReferencesData({
        items: Array.isArray(parsed.items)
          ? parsed.items
              .map(
                (
                  item: Partial<ReferenceCompetitorPresentationItem> & {
                    link?: string;
                    analysisTitle?: string;
                    analysisDescription?: string;
                  }
                ) => normalizeReferenceItem(item)
              )
              .filter(
                (item: ReferenceCompetitorPresentationItem) =>
                  item.image?.trim() ||
                  item.title?.trim() ||
                  Object.values(item.channels).some((value) => value?.trim()) ||
                  item.analyses.some(
                    (analysis) =>
                      analysis.title?.trim() || analysis.description?.trim()
                  )
              )
          : [],
      });
    } catch {
      setReferencesData({
        items: [],
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const demoItems: ReferenceCompetitorPresentationItem[] = [
    {
      image: "",
      title: "Referência de posicionamento",
      channels: {
        ...createEmptyReferenceChannels(),
        site: "https://exemplo.com",
        instagram: "https://instagram.com",
      },
      analyses: [
        {
          title: "Clareza de posicionamento",
          description:
            "Esta referência se destaca pela forma objetiva como comunica sua proposta de valor, seus diferenciais e a percepção que deseja ocupar no mercado.",
        },
        {
          title: "Consistência visual",
          description:
            "A presença visual mantém unidade entre canais, reforçando reconhecimento e percepção de autoridade.",
        },
      ],
    },
    {
      image: "",
      title: "Concorrente direto",
      channels: {
        ...createEmptyReferenceChannels(),
        site: "https://exemplo.com",
        youtube: "https://youtube.com",
      },
      analyses: [
        {
          title: "Oportunidade estratégica",
          description:
            "A análise indica oportunidades para diferenciar a comunicação, aprofundar a narrativa e ocupar um espaço mais claro na percepção do público.",
        },
      ],
    },
  ];

  const itemsToShow = referencesData.items.length
    ? referencesData.items
    : demoItems;

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção reúne referências, concorrentes e inspirações estratégicas que ajudam a entender o mercado, comparar posicionamentos e construir uma direção mais original para o projeto."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Leitura de mercado
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Referências analisadas
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As referências e concorrentes abaixo ajudam a identificar padrões,
            diferenciais, oportunidades e pontos de atenção para o posicionamento
            do projeto.
          </p>
        </div>
      </article>

      <div className="mt-10 grid gap-6">
        {itemsToShow.map((item, index) => {
          const activeChannels = referenceChannels.filter((channel) =>
            item.channels[channel.key]?.trim()
          );

          const analysesToShow = item.analyses.length
            ? item.analyses.filter(
                (analysis) =>
                  analysis.title?.trim() || analysis.description?.trim()
              )
            : [
                {
                  title: "Ponto de análise",
                  description: demoText,
                },
              ];

          return (
            <article
              key={`${item.title}-${index}`}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
                <div className="flex flex-col items-center justify-center border-b border-slate-200 bg-slate-50 p-8 text-center lg:border-b-0 lg:border-r">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-medium text-white shadow-sm ring-8 ring-white">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || "Referência ou concorrente"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "Ref."
                    )}
                  </div>

                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Referência {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-3 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {item.title || "Referência ou concorrente"}
                  </h4>

                  {activeChannels.length > 0 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {activeChannels.map((channel) => (
                        <a
                          key={channel.key}
                          href={item.channels[channel.key]}
                          target="_blank"
                          rel="noreferrer"
                          title={channel.label}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-950"
                        >
                          <img
                            src={channel.icon}
                            alt={channel.label}
                            className="h-4 w-4 object-contain"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-8 lg:p-10">
                  <div className="space-y-6">
                    {analysesToShow.map((analysis, analysisIndex) => (
                      <div
                        key={`${analysis.title}-${analysisIndex}`}
                        className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                            {String(analysisIndex + 1).padStart(2, "0")}
                          </span>

                          <h5 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                            {analysis.title || "Ponto de análise"}
                          </h5>
                        </div>

                        <p className="text-base leading-8 text-slate-600">
                          {analysis.description || demoText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CompetitorResearchPresentation({ section }: { section: Section }) {
  const [researchData, setResearchData] =
    useState<CompetitorResearchPresentationData>({
      competitors: [],
    });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-pesquisa-de-concorrencia"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setResearchData({
        competitors: Array.isArray(parsed.competitors)
          ? parsed.competitors
              .map((competitor: Partial<CompetitorResearchPresentationItem>) => ({
                image: competitor.image || "",
                name: competitor.name || "",
                website: competitor.website || "",
                positioning: competitor.positioning || "",
                targetAudience: competitor.targetAudience || "",
                productAndDelivery: competitor.productAndDelivery || "",
                channelsAndVisibility: competitor.channelsAndVisibility || "",
                contentAndCommunication:
                  competitor.contentAndCommunication || "",
                funnelAndConversion: competitor.funnelAndConversion || "",
                strengths: competitor.strengths || "",
                opportunities: competitor.opportunities || "",
              }))
              .filter(
                (competitor: CompetitorResearchPresentationItem) =>
                  competitor.image?.trim() ||
                  competitor.name?.trim() ||
                  competitor.website?.trim() ||
                  competitor.positioning?.trim() ||
                  competitor.targetAudience?.trim() ||
                  competitor.productAndDelivery?.trim() ||
                  competitor.channelsAndVisibility?.trim() ||
                  competitor.contentAndCommunication?.trim() ||
                  competitor.funnelAndConversion?.trim() ||
                  competitor.strengths?.trim() ||
                  competitor.opportunities?.trim()
              )
          : [],
      });
    } catch {
      setResearchData({
        competitors: [],
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const demoCompetitors: CompetitorResearchPresentationItem[] = [
    {
      image: "",
      name: "Concorrente analisado",
      website: "https://exemplo.com",
      positioning:
        "Este concorrente se posiciona a partir de uma promessa clara, com foco em autoridade, transformação e percepção de valor.",
      targetAudience:
        "Atende um público que busca solução especializada, orientação prática e maior segurança para tomar decisões.",
      productAndDelivery:
        "Trabalha com uma entrega estruturada, combinando serviços, conteúdos e pontos de contato que reforçam sua proposta.",
      channelsAndVisibility:
        "Possui presença em canais digitais relevantes, com maior visibilidade em redes sociais e canais de autoridade.",
      contentAndCommunication:
        "A comunicação apresenta temas recorrentes, linguagem objetiva e uma tentativa de educar o público antes da conversão.",
      funnelAndConversion:
        "Utiliza conteúdos de atração, pontos de captura e chamadas para ação para conduzir o público até uma conversa ou oferta.",
      strengths:
        "Os principais pontos fortes estão na clareza visual, consistência de presença e percepção de especialidade.",
      opportunities:
        "O projeto pode ocupar lacunas de profundidade, diferenciação narrativa, posicionamento mais autoral e experiência mais estratégica.",
    },
  ];

  const competitorsToShow = researchData.competitors.length
    ? researchData.competitors
    : demoCompetitors;

  const analysisBlocks = [
    {
      key: "positioning",
      title: "Posicionamento e proposta de valor",
    },
    {
      key: "targetAudience",
      title: "Público-alvo",
    },
    {
      key: "productAndDelivery",
      title: "Produto e modelo de entrega",
    },
    {
      key: "channelsAndVisibility",
      title: "Canais e visibilidade",
    },
    {
      key: "contentAndCommunication",
      title: "Conteúdo e comunicação",
    },
    {
      key: "funnelAndConversion",
      title: "Funil de captação e conversão",
    },
    {
      key: "strengths",
      title: "Pontos fortes",
    },
    {
      key: "opportunities",
      title: "Lacunas que o projeto ocupa",
    },
  ] as const;

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção analisa concorrentes diretos e indiretos para entender posicionamento, proposta de valor, canais, comunicação, conversão, pontos fortes e lacunas que o projeto pode ocupar."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Leitura competitiva
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Análise de concorrência
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A análise abaixo organiza os principais pontos observados nos
            concorrentes, destacando como eles se posicionam, se comunicam,
            captam atenção e quais espaços estratégicos ainda podem ser ocupados.
          </p>
        </div>
      </article>

      <div className="mt-10 grid gap-8">
        {competitorsToShow.map((competitor, competitorIndex) => (
          <article
            key={`${competitor.name}-${competitorIndex}`}
            className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-200 bg-slate-50 p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-medium text-white shadow-sm ring-8 ring-white">
                    {competitor.image ? (
                      <img
                        src={competitor.image}
                        alt={competitor.name || "Concorrente analisado"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "Conc."
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                      Concorrente {String(competitorIndex + 1).padStart(2, "0")}
                    </p>

                    <h4 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                      {competitor.name || "Concorrente analisado"}
                    </h4>

                    {competitor.website && (
                      <a
                        href={competitor.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex text-sm font-semibold text-slate-500 underline underline-offset-4 transition hover:text-slate-950"
                      >
                        Acessar site ou link principal
                      </a>
                    )}
                  </div>
                </div>

                <div className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
                  Análise competitiva
                </div>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-2">
              {analysisBlocks.map((block, blockIndex) => {
                const content = competitor[block.key]?.trim() || demoText;
                const isHighlight =
                  block.key === "strengths" || block.key === "opportunities";

                return (
                  <div
                    key={block.key}
                    className={`border-b border-slate-200 p-7 lg:p-8 ${
                      blockIndex % 2 === 0 ? "lg:border-r" : ""
                    } ${isHighlight ? "bg-slate-50" : "bg-white"}`}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                        {String(blockIndex + 1).padStart(2, "0")}
                      </span>

                      <h5 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                        {block.title}
                      </h5>
                    </div>

                    <p className="text-base leading-8 text-slate-600">
                      {content}
                    </p>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SwotPresentation({ section }: { section: Section }) {
  const [swotData, setSwotData] = useState<SwotPresentationData>({
    strengths: "",
    weaknesses: "",
    opportunities: "",
    threats: "",
    synthesis: "",
  });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-analise-swot"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const fields = parsed.fields || parsed;

      setSwotData({
        strengths:
          fields.strengths ||
          fields.forces ||
          fields.forcas ||
          fields.forças ||
          "",
        weaknesses:
          fields.weaknesses ||
          fields.fraquezas ||
          fields.weakness ||
          "",
        opportunities:
          fields.opportunities ||
          fields.oportunidades ||
          fields.opportunity ||
          "",
        threats:
          fields.threats ||
          fields.ameacas ||
          fields.ameaças ||
          "",
        synthesis:
          fields.synthesis ||
          fields.sintese ||
          fields.síntese ||
          fields.sinteseEstrategica ||
          fields.sínteseEstrategica ||
          "",
      });
    } catch {
      setSwotData({
        strengths: "",
        weaknesses: "",
        opportunities: "",
        threats: "",
        synthesis: "",
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const swotBlocks = [
  {
    title: "Forças",
    label: "Ambiente interno",
    description: "Diferenciais, ativos e recursos que favorecem o projeto.",
    content: swotData.strengths?.trim() || demoText,
  },
  {
    title: "Fraquezas",
    label: "Ambiente interno",
    description: "Limitações e pontos de melhoria que impactam a execução.",
    content: swotData.weaknesses?.trim() || demoText,
  },
  {
    title: "Oportunidades",
    label: "Ambiente externo",
    description: "Tendências e espaços estratégicos para crescimento.",
    content: swotData.opportunities?.trim() || demoText,
  },
  {
    title: "Ameaças",
    label: "Ambiente externo",
    description: "Fatores externos que podem gerar risco ou pressão.",
    content: swotData.threats?.trim() || demoText,
  },
];

  const synthesisToShow =
    swotData.synthesis?.trim() ||
    "A análise SWOT deve orientar as decisões estratégicas do projeto, ajudando a transformar forças em vantagem, fraquezas em pontos de melhoria, oportunidades em movimentos práticos e ameaças em pontos de atenção.";

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção organiza forças, fraquezas, oportunidades e ameaças para entender o cenário estratégico do projeto e orientar decisões de posicionamento, conteúdo, canais e execução."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Matriz estratégica
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Leitura SWOT do projeto
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A matriz SWOT ajuda a visualizar o que fortalece o projeto, o que
            precisa ser ajustado, quais oportunidades podem ser aproveitadas e
            quais ameaças precisam ser consideradas.
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {swotBlocks.map((block, index) => (
            <div
              key={block.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    {block.label}
                  </p>

                  <h4 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                    {block.title}
                  </h4>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-sm leading-7 text-slate-500">
                {block.description}
              </p>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-base leading-8 text-slate-600">
                  {block.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="pt-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Síntese estratégica da SWOT
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direcionamento prático
          </h3>

          <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
            {synthesisToShow}
          </p>
        </div>
      </article>
    </section>
  );
}

function KeywordsPresentation({ section }: { section: Section }) {
  const [keywordsData, setKeywordsData] = useState<KeywordsPresentationData>({
    sortBy: "adicao",
    keywords: [],
    strategicObservation: "",
  });

  const [selectedKeyword, setSelectedKeyword] =
    useState<KeywordPresentationItem | null>(null);

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-palavras-chave"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setKeywordsData({
        sortBy: parsed.sortBy || "adicao",
        keywords: Array.isArray(parsed.keywords)
          ? parsed.keywords
              .map((item: Partial<KeywordPresentationItem>) => ({
                keyword: item.keyword || "",
                volume: item.volume || "",
                observation: item.observation || "",
              }))
              .filter(
                (item: KeywordPresentationItem) =>
                  item.keyword?.trim() ||
                  item.volume?.trim() ||
                  item.observation?.trim()
              )
          : [],
        strategicObservation: parsed.strategicObservation || "",
      });
    } catch {
      setKeywordsData({
        sortBy: "adicao",
        keywords: [],
        strategicObservation: "",
      });
    }
  }, []);

  const demoKeywords: KeywordPresentationItem[] = [
    {
      keyword: "planejamento estratégico",
      volume: "1.000",
      observation:
        "Termo central para orientar conteúdos de autoridade, páginas institucionais e materiais educativos.",
    },
    {
      keyword: "estratégia de conteúdo",
      volume: "700",
      observation:
        "Pode orientar conteúdos de topo e meio de funil voltados para educação do público.",
    },
    {
      keyword: "posicionamento digital",
      volume: "500",
      observation:
        "Termo relevante para reforçar diferenciação, clareza de mercado e percepção de valor.",
    },
    {
      keyword: "marketing de conteúdo",
      volume: "900",
      observation:
        "Pode conectar a estratégia editorial com demandas mais amplas de aquisição e autoridade.",
    },
  ];

  const keywordsToShow = keywordsData.keywords.length
    ? keywordsData.keywords
    : demoKeywords;

  const strategicObservationToShow =
    keywordsData.strategicObservation?.trim() ||
    "As palavras-chave devem orientar a criação de conteúdos, páginas, campanhas e decisões de SEO. O objetivo é conectar intenção de busca, autoridade e oportunidades estratégicas para o crescimento do projeto.";

  return (
    <section className="relative rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção reúne os termos mais relevantes para orientar SEO, conteúdos, páginas, campanhas e oportunidades de posicionamento."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Mapa de termos estratégicos
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Palavras-chave prioritárias
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Clique em uma palavra-chave para visualizar volume de buscas e
            observações estratégicas.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {keywordsToShow.map((item, index) => (
            <button
              key={`${item.keyword}-${index}`}
              type="button"
              onClick={() => setSelectedKeyword(item)}
              className="cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-950 hover:bg-white hover:shadow-sm"
            >
              {item.keyword || "Palavra-chave"}
            </button>
          ))}
        </div>
      </article>

      <article className="pt-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Observações estratégicas
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direcionamento de SEO e conteúdo
          </h3>

          <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
            {strategicObservationToShow}
          </p>
        </div>
      </article>

      {selectedKeyword && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 py-20 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[1.5rem] bg-white p-7 shadow-2xl ring-1 ring-slate-200">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                  Detalhes da palavra-chave
                </p>

                <h3 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                  {selectedKeyword.keyword || "Palavra-chave"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedKeyword(null)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-950 hover:text-white"
                aria-label="Fechar detalhes da palavra-chave"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Palavra-chave
                </p>

                <p className="mt-2 text-base font-medium text-slate-950">
                  {selectedKeyword.keyword || "Não informado"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Volume de buscas
                </p>

                <p className="mt-2 text-base font-medium text-slate-950">
                  {selectedKeyword.volume || "Não informado"}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.25rem] bg-slate-50 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                Observação
              </p>

              <p className="mt-3 text-base leading-8 text-slate-600">
                {selectedKeyword.observation ||
                  "Nenhuma observação estratégica foi registrada para esta palavra-chave."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PersonasPresentation({ section }: { section: Section }) {
  const [personasData, setPersonasData] = useState<PersonasPresentationData>({
    personas: [],
  });

  const [selectedPersona, setSelectedPersona] =
    useState<PersonaPresentationData | null>(null);

  const [activePersonaTab, setActivePersonaTab] = useState<
    "perfil" | "comportamento" | "dores" | "compra" | "resumo"
  >("perfil");

  function createEmptyBehaviors(): Record<PersonaBehaviorKey, boolean> {
    return {
      redesSociais: false,
      blogs: false,
      anunciosMidiaTradicional: false,
      anunciosMidiaDigital: false,
      outros: false,
    };
  }

  function normalizePersona(
    persona: Partial<PersonaPresentationData>
  ): PersonaPresentationData {
    return {
      photo: persona.photo || "",
      name: persona.name || "",
      age: persona.age || "",
      education: persona.education || "",
      gender: persona.gender || "",
      role: persona.role || "",
      companySize: persona.companySize || "",
      behaviors: {
        ...createEmptyBehaviors(),
        ...(persona.behaviors || {}),
      },
      description: persona.description || "",
      personalObjective: persona.personalObjective || "",
      challenges: persona.challenges || "",
      solutionHelp: persona.solutionHelp || "",
      professionalObjective: persona.professionalObjective || "",
      whatPrevents: persona.whatPrevents || "",
      informationSources: persona.informationSources || "",
      alternatives: persona.alternatives || "",
      expectedExperience: persona.expectedExperience || "",
      commonObjections: persona.commonObjections || "",
      decisionFactors: persona.decisionFactors || "",
      desiredResult: persona.desiredResult || "",
      buyingJourney: persona.buyingJourney || "",
      summaryObjective: persona.summaryObjective || "",
      summaryChallenge: persona.summaryChallenge || "",
      summaryObjection: persona.summaryObjection || "",
      summaryJourney: persona.summaryJourney || "",
    };
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-personas");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      setPersonasData({
        personas: Array.isArray(parsed.personas)
          ? parsed.personas
              .map((persona: Partial<PersonaPresentationData>) =>
                normalizePersona(persona)
              )
              .filter(
                (persona: PersonaPresentationData) =>
                  persona.photo?.trim() ||
                  persona.name?.trim() ||
                  persona.age?.trim() ||
                  persona.role?.trim() ||
                  persona.description?.trim() ||
                  persona.summaryObjective?.trim() ||
                  persona.summaryChallenge?.trim() ||
                  persona.summaryObjection?.trim() ||
                  persona.summaryJourney?.trim()
              )
          : [],
      });
    } catch {
      setPersonasData({
        personas: [],
      });
    }
  }, []);

  const demoPersonas: PersonaPresentationData[] = [
    {
      photo: "",
      name: "Empresário em crescimento",
      age: "32 anos",
      education: "Ensino superior",
      gender: "Masculino",
      role: "Empresário / Sócio-fundador / CEO",
      companySize: "Pequena empresa em expansão",
      behaviors: {
        redesSociais: true,
        blogs: true,
        anunciosMidiaTradicional: false,
        anunciosMidiaDigital: true,
        outros: false,
      },
      description:
        "Está em um bom momento. O negócio cresce, os clientes chegam e o faturamento sobe, mas ele ainda acredita que mais estratégia, ferramentas e execução vão sustentar o próximo salto.",
      personalObjective:
        "Deseja crescer com mais segurança, previsibilidade e clareza sobre os próximos passos.",
      challenges:
        "Sente dificuldade para organizar processos, priorizar decisões e transformar crescimento em estrutura.",
      solutionHelp:
        "O projeto ajuda a transformar visão em direção prática, com conteúdo, posicionamento e estratégia mais claros.",
      professionalObjective:
        "Quer consolidar autoridade, fortalecer a empresa e crescer sem depender apenas da operação diária.",
      whatPrevents:
        "Falta de tempo, excesso de demandas, dúvidas sobre prioridade e dificuldade de enxergar a estrutura invisível do negócio.",
      informationSources:
        "Consulta redes sociais, especialistas, vídeos, comunidades, conteúdos educativos e referências de mercado.",
      alternatives:
        "Pode buscar mentorias, consultorias, ferramentas prontas ou tentar resolver internamente sem estratégia estruturada.",
      expectedExperience:
        "Espera clareza, condução objetiva, linguagem direta e sensação de que está sendo compreendido.",
      commonObjections:
        "Medo de investir em algo genérico, receio de não conseguir executar e dúvida sobre retorno prático.",
      decisionFactors:
        "Valoriza clareza, profundidade, autoridade, segurança e aplicabilidade.",
      desiredResult:
        "Quer crescer com estrutura, tomar melhores decisões e sentir que o negócio está mais preparado.",
      buyingJourney:
        "Percebe o problema, busca referências, compara caminhos, avalia autoridade e decide quando entende valor e segurança.",
      summaryObjective:
        "Crescer com mais estrutura, clareza e previsibilidade.",
      summaryChallenge:
        "Transformar crescimento em organização real sem perder velocidade.",
      summaryObjection:
        "Receio de investir em algo que não gere aplicação prática.",
      summaryJourney:
        "Descobre o problema, busca autoridade, compara soluções e decide quando percebe clareza.",
    },
  ];

  const personasToShow = personasData.personas.length
    ? personasData.personas
    : demoPersonas;

  const behaviorLabels: Record<PersonaBehaviorKey, string> = {
    redesSociais: "Redes sociais",
    blogs: "Blogs",
    anunciosMidiaTradicional: "Anúncios de mídia tradicional",
    anunciosMidiaDigital: "Anúncios de mídia digital",
    outros: "Outros",
  };

  function getActiveBehaviors(persona: PersonaPresentationData) {
    return Object.entries(persona.behaviors)
      .filter(([, value]) => value)
      .map(([key]) => behaviorLabels[key as PersonaBehaviorKey]);
  }

  function openPersonaDetails(persona: PersonaPresentationData) {
    setSelectedPersona(persona);
    setActivePersonaTab("perfil");
  }

  function closePersonaDetails() {
    setSelectedPersona(null);
    setActivePersonaTab("perfil");
  }

  function DetailBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 text-base leading-8 text-slate-600">
          {content || "Não informado."}
        </p>
      </div>
    );
  }

  return (
    <section className="relative rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta os principais perfis de público do projeto, reunindo contexto, objetivos, dores, objeções e jornada provável de compra."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Mapa de público
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Personas estratégicas
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada persona representa um perfil de público que deve orientar a
            comunicação, os conteúdos, as ofertas, a jornada e os pontos de
            conversão do projeto.
          </p>
        </div>
      </article>

      <div className="mt-10 grid gap-6">
        {personasToShow.map((persona, index) => {
          const summaryText =
            persona.summaryObjective ||
            persona.description ||
            "Resumo estratégico da persona ainda não informado.";

          return (
            <article
              key={`${persona.name}-${index}`}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
                <div className="flex flex-col items-center justify-center border-b border-slate-200 bg-slate-50 p-8 text-center lg:border-b-0 lg:border-r">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-medium text-white shadow-sm ring-8 ring-white">
                    {persona.photo ? (
                      <img
                        src={persona.photo}
                        alt={persona.name || "Persona"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "Persona"
                    )}
                  </div>

                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Persona {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-3 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {persona.name || "Persona"}
                  </h4>

                  <p className="mt-3 text-sm font-medium text-slate-500">
                    {[persona.age, persona.role].filter(Boolean).join(" • ") ||
                      "Perfil não informado"}
                  </p>

                  <button
                    type="button"
                    onClick={() => openPersonaDetails(persona)}
                    className="mt-6 cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Ver detalhes
                  </button>
                </div>

                <div className="p-8 lg:p-10">
                  <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
                    Resumo executivo
                  </p>

                  <h5 className="mt-4 text-3xl font-light tracking-[-0.04em] text-slate-950">
                    {persona.summaryChallenge ||
                      persona.summaryObjective ||
                      "Perfil estratégico da persona"}
                  </h5>

                  <p className="mt-5 text-base leading-8 text-slate-600">
                    {summaryText}
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.25rem] bg-slate-50 p-5">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                        Objetivo
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {persona.summaryObjective ||
                          persona.personalObjective ||
                          "Não informado."}
                      </p>
                    </div>

                    <div className="rounded-[1.25rem] bg-slate-50 p-5">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                        Desafio
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {persona.summaryChallenge ||
                          persona.challenges ||
                          "Não informado."}
                      </p>
                    </div>

                    <div className="rounded-[1.25rem] bg-slate-50 p-5">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                        Objeção
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {persona.summaryObjection ||
                          persona.commonObjections ||
                          "Não informado."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedPersona && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 py-10 backdrop-blur-sm">
          <div className="w-full max-w-5xl rounded-[1.75rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-medium text-white">
                  {selectedPersona.photo ? (
                    <img
                      src={selectedPersona.photo}
                      alt={selectedPersona.name || "Persona"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Persona"
                  )}
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Detalhes da persona
                  </p>

                  <h3 className="mt-2 text-3xl font-light tracking-[-0.04em] text-slate-950">
                    {selectedPersona.name || "Persona"}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {[selectedPersona.age, selectedPersona.role]
                      .filter(Boolean)
                      .join(" • ") || "Perfil não informado"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closePersonaDetails}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-950 hover:text-white"
                aria-label="Fechar detalhes da persona"
              >
                ×
              </button>
            </div>

            <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-5">
              {[
                { key: "perfil", label: "Perfil" },
                { key: "comportamento", label: "Comportamento" },
                { key: "dores", label: "Dores e objetivos" },
                { key: "compra", label: "Compra" },
                { key: "resumo", label: "Resumo" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setActivePersonaTab(
                      tab.key as
                        | "perfil"
                        | "comportamento"
                        | "dores"
                        | "compra"
                        | "resumo"
                    )
                  }
                  className={`cursor-pointer rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activePersonaTab === tab.key
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activePersonaTab === "perfil" && (
              <div className="grid gap-5 md:grid-cols-2">
                <DetailBlock title="Nome" content={selectedPersona.name} />
                <DetailBlock title="Idade" content={selectedPersona.age} />
                <DetailBlock
                  title="Escolaridade"
                  content={selectedPersona.education}
                />
                <DetailBlock title="Sexo" content={selectedPersona.gender} />
                <DetailBlock
                  title="Cargo ou ocupação"
                  content={selectedPersona.role}
                />
                <DetailBlock
                  title="Tamanho da empresa"
                  content={selectedPersona.companySize}
                />
              </div>
            )}

            {activePersonaTab === "comportamento" && (
              <div className="grid gap-5">
                <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Canais e meios usados
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {getActiveBehaviors(selectedPersona).length ? (
                      getActiveBehaviors(selectedPersona).map((behavior) => (
                        <span
                          key={behavior}
                          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                        >
                          {behavior}
                        </span>
                      ))
                    ) : (
                      <p className="text-base leading-8 text-slate-600">
                        Nenhum comportamento informado.
                      </p>
                    )}
                  </div>
                </div>

                <DetailBlock
                  title="Descrição da persona"
                  content={selectedPersona.description}
                />
                <DetailBlock
                  title="Fontes de informação"
                  content={selectedPersona.informationSources}
                />
              </div>
            )}

            {activePersonaTab === "dores" && (
              <div className="grid gap-5 md:grid-cols-2">
                <DetailBlock
                  title="Objetivo pessoal"
                  content={selectedPersona.personalObjective}
                />
                <DetailBlock
                  title="Objetivo profissional"
                  content={selectedPersona.professionalObjective}
                />
                <DetailBlock
                  title="Desafios"
                  content={selectedPersona.challenges}
                />
                <DetailBlock
                  title="Como a solução ajuda"
                  content={selectedPersona.solutionHelp}
                />
                <DetailBlock
                  title="O que impede ou acelera"
                  content={selectedPersona.whatPrevents}
                />
                <DetailBlock
                  title="Resultado mais valorizado"
                  content={selectedPersona.desiredResult}
                />
              </div>
            )}

            {activePersonaTab === "compra" && (
              <div className="grid gap-5 md:grid-cols-2">
                <DetailBlock
                  title="Alternativas"
                  content={selectedPersona.alternatives}
                />
                <DetailBlock
                  title="Experiência esperada"
                  content={selectedPersona.expectedExperience}
                />
                <DetailBlock
                  title="Objeções comuns"
                  content={selectedPersona.commonObjections}
                />
                <DetailBlock
                  title="Critérios de decisão"
                  content={selectedPersona.decisionFactors}
                />
                <DetailBlock
                  title="Jornada de compra"
                  content={selectedPersona.buyingJourney}
                />
              </div>
            )}

            {activePersonaTab === "resumo" && (
              <div className="grid gap-5 md:grid-cols-2">
                <DetailBlock
                  title="Objetivo principal resumido"
                  content={selectedPersona.summaryObjective}
                />
                <DetailBlock
                  title="Desafio principal resumido"
                  content={selectedPersona.summaryChallenge}
                />
                <DetailBlock
                  title="Objeção principal resumida"
                  content={selectedPersona.summaryObjection}
                />
                <DetailBlock
                  title="Jornada provável resumida"
                  content={selectedPersona.summaryJourney}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function PurchaseJourneyPresentation({ section }: { section: Section }) {
  const [journeyData, setJourneyData] =
    useState<PurchaseJourneyPresentationData>({
      overview: "",
      stages: [],
      decisionPoints: "",
      objections: "",
      advanceTriggers: "",
      necessaryContents: "",
      decisionContent: "",
      journeyExplanation: "",
      references: [],
    });

  const [selectedStage, setSelectedStage] =
    useState<PurchaseJourneyStage | null>(null);

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStage(stage: Record<string, unknown>): PurchaseJourneyStage {
    return {
      title: getString(stage, ["title", "name", "titulo", "nome", "fase"]),
      awarenessLevel: getString(stage, [
        "awarenessLevel",
        "nivelConsciencia",
        "nívelConsciencia",
        "nivelDeConsciencia",
        "consciousnessLevel",
      ]),
      description: getString(stage, [
        "description",
        "descricao",
        "descrição",
        "summary",
        "resumo",
        "stageDescription",
      ]),
      thoughts: getString(stage, [
        "thoughts",
        "thinking",
        "pensamentos",
        "pensaSente",
        "oQuePensa",
        "oQueAPessoaPensa",
      ]),
      pains: getString(stage, [
        "pains",
        "painPoints",
        "dores",
        "duvidas",
        "dúvidas",
        "desejos",
        "doresDuvidasDesejos",
      ]),
      contents: getString(stage, [
        "contents",
        "content",
        "conteudos",
        "conteúdos",
        "conteudosNecessarios",
        "conteudosNecessários",
      ]),
      channels: getString(stage, [
        "channels",
        "canais",
        "recommendedChannels",
        "canaisRecomendados",
      ]),
      nextStep: getString(stage, [
        "nextStep",
        "proximoPasso",
        "próximoPasso",
        "proximoPassoDesejado",
        "próximoPassoDesejado",
      ]),
      conversionPoint: getString(stage, [
        "conversionPoint",
        "pontoConversao",
        "pontoDeConversao",
        "pontoDeConversão",
        "conversao",
      ]),
    };
  }

  function normalizeReference(
    reference: Record<string, unknown>
  ): PurchaseJourneyReference {
    return {
      title: getString(reference, ["title", "titulo", "nome"]),
      link: getString(reference, ["link", "url"]),
    };
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-jornada-de-compra"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      const rawStages =
        parsed.stages ||
        parsed.phases ||
        parsed.etapas ||
        source.stages ||
        source.phases ||
        source.etapas ||
        [];

      const rawReferences =
        parsed.references ||
        parsed.referencias ||
        parsed.externalReferences ||
        source.references ||
        source.referencias ||
        [];

      setJourneyData({
        overview: getString(source, [
          "overview",
          "visaoGeral",
          "visãoGeral",
          "intro",
          "introducao",
          "introdução",
          "mapaDaJornada",
        ]),
        stages: Array.isArray(rawStages)
          ? rawStages
              .map((stage: Record<string, unknown>) => normalizeStage(stage))
              .filter(
                (stage: PurchaseJourneyStage) =>
                  stage.title?.trim() ||
                  stage.description?.trim() ||
                  stage.thoughts?.trim() ||
                  stage.pains?.trim() ||
                  stage.contents?.trim() ||
                  stage.channels?.trim() ||
                  stage.nextStep?.trim() ||
                  stage.conversionPoint?.trim()
              )
          : [],
        decisionPoints: getString(source, [
          "decisionPoints",
          "pontosDeDecisao",
          "pontosDeDecisão",
          "pontosDecisao",
          "pontosDecisão",
        ]),
        objections: getString(source, [
          "objections",
          "objecoes",
          "objeções",
          "objectionsByStage",
          "objecoesPorEtapa",
          "objeçõesPorEtapa",
        ]),
        advanceTriggers: getString(source, [
          "advanceTriggers",
          "gatilhosDeAvanco",
          "gatilhosDeAvanço",
          "gatilhos",
        ]),
        necessaryContents: getString(source, [
          "necessaryContents",
          "conteudosNecessarios",
          "conteúdosNecessários",
          "conteudosParaCompra",
          "conteudosConducao",
        ]),
        decisionContent: getString(source, [
          "decisionContent",
          "conteudoDeDecisao",
          "conteúdoDeDecisão",
          "conteudoDecisao",
        ]),
        journeyExplanation: getString(source, [
          "journeyExplanation",
          "explicacaoDaJornada",
          "explicaçãoDaJornada",
          "sintese",
          "síntese",
          "resumo",
        ]),
        references: Array.isArray(rawReferences)
          ? rawReferences
              .map((reference: Record<string, unknown>) =>
                normalizeReference(reference)
              )
              .filter(
                (reference: PurchaseJourneyReference) =>
                  reference.title?.trim() || reference.link?.trim()
              )
          : [],
      });
    } catch {
      setJourneyData({
        overview: "",
        stages: [],
        decisionPoints: "",
        objections: "",
        advanceTriggers: "",
        necessaryContents: "",
        decisionContent: "",
        journeyExplanation: "",
        references: [],
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const demoStages: PurchaseJourneyStage[] = [
    {
      title: "Descoberta do problema",
      awarenessLevel: "Inconsciente",
      description:
        "A pessoa começa a perceber sinais de que algo precisa mudar, mas ainda não entende completamente o problema.",
      thoughts:
        "Sente que existe algo travando o crescimento, mas ainda não sabe nomear a causa com clareza.",
      pains:
        "Dúvidas, incômodo recorrente, falta de clareza e percepção de que os resultados poderiam ser melhores.",
      contents:
        "Conteúdos educativos, diagnósticos, posts de conscientização, vídeos curtos e materiais que nomeiam o problema.",
      channels:
        "Instagram, YouTube, blog, pesquisa no Google, anúncios e conteúdos compartilháveis.",
      nextStep:
        "Fazer a pessoa reconhecer que existe um problema real que precisa ser observado.",
      conversionPoint:
        "Conteúdo educativo, checklist, diagnóstico, post salvo ou primeiro contato com a marca.",
    },
    {
      title: "Consciência da dor",
      awarenessLevel: "Consciente",
      description:
        "A pessoa entende melhor a dor e começa a buscar explicações para o que está acontecendo.",
      thoughts:
        "Percebe que o problema afeta crescimento, decisões, posicionamento ou resultados.",
      pains:
        "Insegurança, comparação, sensação de atraso, medo de perder oportunidades e falta de direção.",
      contents:
        "Conteúdos de aprofundamento, carrosséis explicativos, estudos de caso e materiais que conectam sintomas e causas.",
      channels:
        "Redes sociais, blog, YouTube, newsletter, lives e materiais ricos.",
      nextStep:
        "Mostrar que existe uma solução possível e que o problema pode ser tratado com método.",
      conversionPoint:
        "Material gratuito, aula, formulário, diagnóstico ou conversa inicial.",
    },
    {
      title: "Busca por solução",
      awarenessLevel: "Solução consciente",
      description:
        "A pessoa começa a procurar caminhos, métodos, profissionais ou serviços que possam resolver o problema.",
      thoughts:
        "Quer entender quais alternativas existem e qual caminho faz mais sentido para sua realidade.",
      pains:
        "Medo de escolher errado, excesso de opções, dúvida sobre preço, confiança e aplicabilidade.",
      contents:
        "Comparativos, bastidores do método, provas, estudos de caso, explicações sobre processo e diferenciais.",
      channels:
        "Site, páginas de venda, vídeos, redes sociais, apresentação comercial e WhatsApp.",
      nextStep:
        "Conduzir a pessoa para uma avaliação mais concreta da solução.",
      conversionPoint:
        "Página de serviço, formulário, reunião, briefing ou conversa comercial.",
    },
    {
      title: "Comparação de alternativas",
      awarenessLevel: "Produto consciente",
      description:
        "A pessoa compara opções, avalia diferenciais, preço, autoridade, confiança e adequação.",
      thoughts:
        "Quer ter segurança de que a escolha será melhor que outras opções disponíveis.",
      pains:
        "Objeções, dúvidas sobre retorno, comparação com concorrentes e medo de investir errado.",
      contents:
        "Provas, diferenciais, depoimentos, cases, comparativos, perguntas frequentes e clareza de proposta.",
      channels:
        "Site, apresentação comercial, WhatsApp, reuniões, propostas e materiais de apoio.",
      nextStep:
        "Reduzir insegurança e mostrar por que a solução é a escolha mais adequada.",
      conversionPoint:
        "Proposta, reunião, orçamento, call estratégica ou página de conversão.",
    },
    {
      title: "Decisão de compra",
      awarenessLevel: "Mais consciente",
      description:
        "A pessoa já reconhece o problema, entende a solução e precisa de segurança para decidir.",
      thoughts:
        "Precisa justificar a decisão, sentir confiança e enxergar valor prático na contratação.",
      pains:
        "Medo de não ter retorno, dúvida sobre execução, prazo, investimento e prioridade.",
      contents:
        "Garantias, clareza de entrega, proposta objetiva, próximos passos e reforço de valor.",
      channels:
        "Reunião comercial, proposta, WhatsApp, e-mail e página de contratação.",
      nextStep:
        "Conduzir para a decisão com clareza, segurança e próximos passos simples.",
      conversionPoint:
        "Contrato, pagamento, aceite de proposta ou confirmação da contratação.",
    },
    {
      title: "Pós-compra e fidelização",
      awarenessLevel: "Cliente",
      description:
        "Depois da compra, a experiência precisa confirmar a decisão e abrir espaço para continuidade.",
      thoughts:
        "Quer perceber evolução, clareza, organização e resultado prático desde os primeiros contatos.",
      pains:
        "Ansiedade por resultado, dúvidas sobre próximos passos e medo de não conseguir executar.",
      contents:
        "Onboarding, acompanhamento, relatórios, materiais de suporte, próximos passos e reforço de evolução.",
      channels:
        "E-mail, WhatsApp, reuniões, área do cliente, relatórios e conteúdos de suporte.",
      nextStep:
        "Gerar confiança, continuidade, recompra, indicação e fortalecimento do relacionamento.",
      conversionPoint:
        "Renovação, upsell, indicação, depoimento ou continuidade do projeto.",
    },
  ];

  const stagesToShow = journeyData.stages.length
    ? journeyData.stages
    : demoStages;

  const overviewToShow =
    journeyData.overview?.trim() ||
    "A jornada de compra organiza as etapas pelas quais o público passa até reconhecer o problema, entender a solução, comparar alternativas, decidir pela compra e manter relacionamento com o projeto.";

  const finalBlocks = [
    {
      title: "Pontos de decisão da jornada",
      content:
        journeyData.decisionPoints ||
        "Os principais pontos de decisão aparecem quando a pessoa reconhece o problema, entende o valor da solução, compara alternativas e precisa justificar a escolha.",
    },
    {
      title: "Objeções por etapa",
      content:
        journeyData.objections ||
        "As objeções podem surgir em diferentes momentos da jornada, principalmente quando há dúvida sobre valor, prioridade, confiança, investimento ou capacidade de execução.",
    },
    {
      title: "Gatilhos de avanço",
      content:
        journeyData.advanceTriggers ||
        "Os gatilhos de avanço ajudam a conduzir a pessoa para a próxima etapa, criando clareza, urgência, confiança e percepção de valor.",
    },
    {
      title: "Conteúdos necessários",
      content:
        journeyData.necessaryContents ||
        "Conteúdos educativos, comparativos, provas, diferenciais, estudos de caso e materiais de decisão ajudam a conduzir a jornada.",
    },
    {
      title: "Conteúdo de decisão",
      content:
        journeyData.decisionContent ||
        "Na etapa de decisão, os conteúdos precisam reduzir risco, reforçar valor, explicar a entrega e tornar o próximo passo claro.",
    },
    {
      title: "Síntese da jornada",
      content:
        journeyData.journeyExplanation ||
        "A jornada deve orientar conteúdos, canais, mensagens e pontos de conversão, garantindo que cada etapa conduza a pessoa com clareza até a decisão.",
    },
  ];

  function DetailBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 text-base leading-8 text-slate-600">
          {content || "Não informado."}
        </p>
      </div>
    );
  }

  return (
    <section className="relative rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção organiza a jornada de compra do público, mostrando como a pessoa evolui da descoberta do problema até a decisão, a conversão e a fidelização."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Linha do tempo estratégica
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Etapas da jornada
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            {overviewToShow}
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="relative space-y-6">
          <div className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-slate-200 md:block" />

          {stagesToShow.map((stage, index) => (
            <div
              key={`${stage.title}-${index}`}
              className="relative grid gap-5 md:grid-cols-[72px_minmax(0,1fr)]"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                      {stage.awarenessLevel || "Nível não informado"}
                    </p>

                    <h4 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                      {stage.title || "Etapa da jornada"}
                    </h4>

                    <p className="mt-5 max-w-[880px] text-base leading-8 text-slate-600">
                      {stage.description || demoText}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStage(stage)}
                    className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="pt-12">
        <div className="grid gap-5 md:grid-cols-2">
          {finalBlocks.map((block, index) => (
            <div
              key={block.title}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                  {block.title}
                </h4>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {block.content}
              </p>
            </div>
          ))}
        </div>

        {journeyData.references.length > 0 && (
          <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {journeyData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {selectedStage && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 py-10 backdrop-blur-sm">
          <div className="w-full max-w-5xl rounded-[1.75rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 lg:p-8">
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                  Detalhes da etapa
                </p>

                <h3 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                  {selectedStage.title || "Etapa da jornada"}
                </h3>

                <p className="mt-3 text-sm font-medium text-slate-500">
                  {selectedStage.awarenessLevel || "Nível não informado"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStage(null)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-950 hover:text-white"
                aria-label="Fechar detalhes da etapa"
              >
                ×
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <DetailBlock
                title="Descrição da etapa"
                content={selectedStage.description}
              />

              <DetailBlock
                title="O que a pessoa pensa ou sente"
                content={selectedStage.thoughts}
              />

              <DetailBlock
                title="Dores, dúvidas e desejos"
                content={selectedStage.pains}
              />

              <DetailBlock
                title="Conteúdos necessários"
                content={selectedStage.contents}
              />

              <DetailBlock
                title="Canais recomendados"
                content={selectedStage.channels}
              />

              <DetailBlock
                title="Próximo passo desejado"
                content={selectedStage.nextStep}
              />

              <DetailBlock
                title="Ponto de conversão"
                content={selectedStage.conversionPoint}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CurrentDigitalChannelsPresentation({ section }: { section: Section }) {
  const [channelsData, setChannelsData] =
    useState<CurrentDigitalChannelsPresentationData>({
      channels: [],
      observation: "",
    });

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-canais-digitais-atuais"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      const rawChannels =
        parsed.channels ||
        parsed.canais ||
        parsed.items ||
        source.channels ||
        source.canais ||
        source.items ||
        [];

      setChannelsData({
        channels: Array.isArray(rawChannels)
          ? rawChannels
              .map((channel: Record<string, unknown>) => ({
                name:
                  typeof channel.name === "string"
                    ? channel.name
                    : typeof channel.title === "string"
                    ? channel.title
                    : typeof channel.nome === "string"
                    ? channel.nome
                    : "",
                description:
                  typeof channel.description === "string"
                    ? channel.description
                    : typeof channel.descricao === "string"
                    ? channel.descricao
                    : typeof channel.descrição === "string"
                    ? channel.descrição
                    : "",
                link:
                  typeof channel.link === "string"
                    ? channel.link
                    : typeof channel.url === "string"
                    ? channel.url
                    : "",
              }))
              .filter(
                (channel: CurrentDigitalChannel) =>
                  channel.name?.trim() ||
                  channel.description?.trim() ||
                  channel.link?.trim()
              )
          : [],
        observation:
          typeof source.observation === "string"
            ? source.observation
            : typeof source.observacao === "string"
            ? source.observacao
            : typeof source.observação === "string"
            ? source.observação
            : typeof source.strategicObservation === "string"
            ? source.strategicObservation
            : "",
      });
    } catch {
      setChannelsData({
        channels: [],
        observation: "",
      });
    }
  }, []);

  const demoChannels: CurrentDigitalChannel[] = [
    {
      name: "Facebook",
      description: "Canal atual de presença, relacionamento e distribuição.",
      link: "",
    },
    {
      name: "Instagram",
      description: "Canal de visibilidade, conteúdo e relacionamento.",
      link: "",
    },
    {
      name: "YouTube",
      description: "Canal de vídeos, profundidade e construção de autoridade.",
      link: "",
    },
    {
      name: "Blog",
      description: "Canal de conteúdo, SEO e presença orgânica.",
      link: "",
    },
    {
      name: "Lista de cadastro",
      description: "Base de relacionamento, nutrição e conversão.",
      link: "",
    },
    {
      name: "Site",
      description: "Canal institucional, comercial e estratégico.",
      link: "",
    },
  ];

  const channelsToShow = channelsData.channels.length
    ? channelsData.channels
    : demoChannels;

  const observationToShow =
    channelsData.observation?.trim() ||
    "Os canais digitais atuais mostram a presença já existente do projeto e ajudam a entender onde há base construída, oportunidades de melhoria e pontos que podem ser fortalecidos na estratégia.";

  function getChannelIcon(channelName: string) {
  const normalizedName = channelName.toLowerCase();

  if (normalizedName.includes("facebook")) {
    return "/icons/21-facebook.svg";
  }

  if (normalizedName.includes("instagram")) {
    return "/icons/18-instagram.svg";
  }

  if (normalizedName.includes("tik")) {
    return "/icons/19-tik-tok.svg";
  }

  if (normalizedName.includes("youtube")) {
    return "/icons/20-youtube.svg";
  }

  if (normalizedName.includes("linkedin")) {
    return "/icons/22-linkedin.svg";
  }

  if (normalizedName.includes("whats")) {
    return "/icons/23-whatsaap.svg";
  }

  if (normalizedName.includes("blog")) {
    return "/icons/24-blog.svg";
  }

  if (normalizedName.includes("pinterest")) {
    return "/icons/25-pinterest.svg";
  }

  if (normalizedName.includes("podcast")) {
    return "/icons/26-podcast.svg";
  }

  if (
    normalizedName.includes("lista") ||
    normalizedName.includes("cadastro") ||
    normalizedName.includes("lead")
  ) {
    return "/icons/39-lista-de-cadastro.svg";
  }

  if (normalizedName.includes("site")) {
    return "/icons/29-estrategia-do-site.svg";
  }

  return "/icons/15-canais-digitais.svg";
}

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta os canais digitais já existentes no projeto e ajuda a visualizar a base atual de presença, relacionamento e distribuição."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Presença digital atual
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Canais cadastrados
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os canais abaixo representam os pontos de presença digital que já
            fazem parte da estrutura atual do projeto.
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-x-10 gap-y-9 md:grid-cols-2 xl:grid-cols-3">
          {channelsToShow.map((channel, index) => (
            <div
              key={`${channel.name}-${index}`}
              className="group flex items-start gap-5 rounded-[1.5rem] border border-transparent p-4 transition hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950 shadow-sm transition group-hover:-translate-y-0.5">
                <img
                  src={getChannelIcon(channel.name)}
                  alt=""
                  className="h-6 w-6 object-contain invert"
                />
              </div>

              <div className="min-w-0">
                <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                  {channel.name || "Canal digital"}
                </h4>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {channel.description ||
                    "Descrição do canal ainda não informada."}
                </p>

                {channel.link && (
                  <a
                    href={channel.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-slate-500 underline underline-offset-4 transition hover:text-slate-950"
                  >
                    Acessar canal
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="pt-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Observações sobre a presença digital atual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Leitura inicial dos canais
          </h3>

          <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
            {observationToShow}
          </p>
        </div>
      </article>
    </section>
  );
}

function ContentFunnelPresentation({ section }: { section: Section }) {
  const [funnelData, setFunnelData] = useState<ContentFunnelPresentationData>({
    overview: "",
    stages: [],
    distribution: {
      attraction: "",
      connection: "",
      bonding: "",
      sales: "",
    },
    metrics: {
      attraction: "",
      connection: "",
      bonding: "",
      sales: "",
    },
    references: [],
  });

  const [selectedFunnelStage, setSelectedFunnelStage] =
    useState<ContentFunnelStage | null>(null);

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeFunnelStage(
    stage: Record<string, unknown>
  ): ContentFunnelStage {
    return {
      title: getString(stage, ["title", "titulo", "nome", "name"]),
      subtitle: getString(stage, [
        "subtitle",
        "subtitulo",
        "subtítulo",
        "level",
        "nivel",
      ]),
      strategy: getString(stage, [
        "strategy",
        "estrategia",
        "estratégia",
        "contentStrategy",
        "estrategiaConteudo",
        "estratégiaConteudo",
      ]),
      objective: getString(stage, [
        "objective",
        "objetivo",
        "stageObjective",
        "objetivoEtapa",
      ]),
      nextStep: getString(stage, [
        "nextStep",
        "proximoPasso",
        "próximoPasso",
        "proximoPassoDesejado",
        "próximoPassoDesejado",
      ]),
      themes: getString(stage, [
        "themes",
        "temas",
        "examples",
        "exemplos",
        "exemplosDeTemas",
      ]),
      format: getString(stage, [
        "format",
        "formato",
        "recommendedFormat",
        "formatoRecomendado",
      ]),
      ctas: getString(stage, [
        "ctas",
        "callsToAction",
        "chamadas",
        "chamadasParaAcao",
        "chamadasParaAção",
      ]),
    };
  }

  function normalizeReference(
    reference: Record<string, unknown>
  ): ContentFunnelReference {
    return {
      title: getString(reference, ["title", "titulo", "nome"]),
      link: getString(reference, ["link", "url"]),
    };
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-funil-de-conteudo"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      const rawStages =
        parsed.stages ||
        parsed.etapas ||
        parsed.funnelStages ||
        source.stages ||
        source.etapas ||
        source.funnelStages ||
        [];

      const rawReferences =
        parsed.references ||
        parsed.referencias ||
        parsed.externalReferences ||
        source.references ||
        source.referencias ||
        [];

      const rawDistribution =
        parsed.distribution ||
        parsed.distribuicao ||
        parsed.distribuição ||
        source.distribution ||
        source.distribuicao ||
        source.distribuição ||
        {};

      const rawMetrics =
        parsed.metrics ||
        parsed.metricas ||
        parsed.métricas ||
        source.metrics ||
        source.metricas ||
        source.métricas ||
        {};

      setFunnelData({
        overview: getString(source, [
          "overview",
          "visaoGeral",
          "visãoGeral",
          "explicacao",
          "explicação",
          "visaoGeralDoFunil",
          "visãoGeralDoFunil",
        ]),
        stages: Array.isArray(rawStages)
          ? rawStages
              .map((stage: Record<string, unknown>) =>
                normalizeFunnelStage(stage)
              )
              .filter(
                (stage: ContentFunnelStage) =>
                  stage.title?.trim() ||
                  stage.strategy?.trim() ||
                  stage.objective?.trim() ||
                  stage.nextStep?.trim() ||
                  stage.themes?.trim() ||
                  stage.format?.trim() ||
                  stage.ctas?.trim()
              )
          : [],
        distribution: {
          attraction: getString(rawDistribution, [
            "attraction",
            "atracao",
            "atração",
          ]),
          connection: getString(rawDistribution, [
            "connection",
            "conexao",
            "conexão",
          ]),
          bonding: getString(rawDistribution, [
            "bonding",
            "vinculacao",
            "vinculação",
          ]),
          sales: getString(rawDistribution, ["sales", "venda", "vendas"]),
        },
        metrics: {
          attraction: getString(rawMetrics, [
            "attraction",
            "atracao",
            "atração",
          ]),
          connection: getString(rawMetrics, [
            "connection",
            "conexao",
            "conexão",
          ]),
          bonding: getString(rawMetrics, [
            "bonding",
            "vinculacao",
            "vinculação",
          ]),
          sales: getString(rawMetrics, ["sales", "venda", "vendas"]),
        },
        references: Array.isArray(rawReferences)
          ? rawReferences
              .map((reference: Record<string, unknown>) =>
                normalizeReference(reference)
              )
              .filter(
                (reference: ContentFunnelReference) =>
                  reference.title?.trim() || reference.link?.trim()
              )
          : [],
      });
    } catch {
      setFunnelData({
        overview: "",
        stages: [],
        distribution: {
          attraction: "",
          connection: "",
          bonding: "",
          sales: "",
        },
        metrics: {
          attraction: "",
          connection: "",
          bonding: "",
          sales: "",
        },
        references: [],
      });
    }
  }, []);

  const demoText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const demoStages: ContentFunnelStage[] = [
    {
      title: "Conteúdos de atração",
      subtitle: "Topo do funil",
      strategy:
        "Conteúdos criados para atrair novas pessoas, gerar alcance, despertar interesse inicial e fazer o público conhecer o especialista, a empresa ou o projeto.",
      objective:
        "Ampliar visibilidade, gerar reconhecimento e atrair pessoas que ainda estão no início da jornada.",
      nextStep:
        "Fazer a pessoa consumir mais conteúdos e avançar para uma relação de maior conexão.",
      themes:
        "Dicas rápidas, tendências, mitos, erros comuns, curiosidades, bastidores e temas de descoberta.",
      format: "Reels",
      ctas:
        "Salve este conteúdo, compartilhe com alguém, acompanhe o perfil e veja outros conteúdos relacionados.",
    },
    {
      title: "Conteúdos de conexão",
      subtitle: "Meio do funil",
      strategy:
        "Conteúdos que aproximam o público da marca, geram identificação, nutrem confiança e criam vínculo emocional com o especialista ou empresa.",
      objective:
        "Criar proximidade, identificação e confiança com o público.",
      nextStep:
        "Fazer a pessoa reconhecer valor na visão, na história e na forma de atuação do projeto.",
      themes:
        "Histórias, bastidores, posicionamentos, crenças, valores, vulnerabilidades, causas e experiências pessoais.",
      format: "Reels",
      ctas:
        "Comente se você se identificou, envie para alguém que precisa ver isso ou acompanhe os próximos conteúdos.",
    },
    {
      title: "Conteúdos de vinculação",
      subtitle: "Meio para fundo do funil",
      strategy:
        "Conteúdos que levam o público a avançar na relação, demonstrar interesse, entrar em uma lista, baixar um material, responder uma enquete ou iniciar contato.",
      objective:
        "Transformar atenção e confiança em sinal claro de interesse.",
      nextStep:
        "Levar a pessoa para um canal de relacionamento, cadastro, conversa ou material estratégico.",
      themes:
        "Materiais gratuitos, diagnósticos, checklists, aulas, formulários, grupos, newsletters e conversas iniciais.",
      format: "Reels",
      ctas:
        "Baixe o material, responda à pergunta, entre na lista, envie uma mensagem ou acesse o link.",
    },
    {
      title: "Conteúdos de venda",
      subtitle: "Fundo do funil",
      strategy:
        "Conteúdos que conduzem o público para a decisão de compra, quebram objeções, apresentam provas, reforçam valor e direcionam para uma oferta.",
      objective:
        "Converter interesse em decisão, contato comercial ou compra.",
      nextStep:
        "Fazer a pessoa solicitar proposta, agendar uma conversa, comprar ou avançar para a decisão.",
      themes:
        "Depoimentos, estudos de caso, antes e depois, provas sociais, comparativos, bastidores da entrega, oferta, bônus, garantia e chamada para ação.",
      format: "Reels",
      ctas:
        "Agende uma conversa, solicite uma proposta, clique no link, envie uma mensagem ou garanta sua vaga.",
    },
  ];

  const stagesToShow = funnelData.stages.length
    ? funnelData.stages
    : demoStages;

  const overviewToShow =
    funnelData.overview?.trim() ||
    "O funil de conteúdo organiza os conteúdos por etapa da jornada, conectando atração, conexão, vinculação e venda para conduzir o público de forma mais clara até a decisão.";

  const distributionBlocks = [
    {
      title: "Atração",
      value: funnelData.distribution.attraction || "40%",
    },
    {
      title: "Conexão",
      value: funnelData.distribution.connection || "30%",
    },
    {
      title: "Vinculação",
      value: funnelData.distribution.bonding || "20%",
    },
    {
      title: "Venda",
      value: funnelData.distribution.sales || "10%",
    },
  ];

  const metricBlocks = [
    {
      title: "Atração",
      content:
        funnelData.metrics.attraction ||
        "Alcance, impressões, visualizações, visitas ao perfil e novos seguidores.",
    },
    {
      title: "Conexão",
      content:
        funnelData.metrics.connection ||
        "Comentários, respostas, compartilhamentos, salvamentos, retenção e mensagens.",
    },
    {
      title: "Vinculação",
      content:
        funnelData.metrics.bonding ||
        "Cliques, cadastros, downloads, respostas, entradas em listas, leads gerados e conversas iniciadas.",
    },
    {
      title: "Venda",
      content:
        funnelData.metrics.sales ||
        "Reuniões, propostas, conversões, vendas, custo por compra, taxa de fechamento e receita.",
    },
  ];

  function DetailBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 text-base leading-8 text-slate-600">
          {content || "Não informado."}
        </p>
      </div>
    );
  }

  return (
    <section className="relative rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção organiza os conteúdos por etapa do funil, conectando atração, conexão, vinculação e venda em uma sequência estratégica."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estrutura de conteúdo
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Funil por etapas
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            {overviewToShow}
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {stagesToShow.map((stage, index) => (
            <div
              key={`${stage.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    {stage.subtitle || `Etapa ${String(index + 1).padStart(2, "0")}`}
                  </p>

                  <h4 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                    {stage.title || "Etapa do funil"}
                  </h4>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {stage.objective || stage.strategy || demoText}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.25rem] bg-slate-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    Formato
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {stage.format || "Não informado."}
                  </p>
                </div>

                <div className="rounded-[1.25rem] bg-slate-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    Próximo passo
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {stage.nextStep || "Não informado."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFunnelStage(stage)}
                className="mt-6 cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Distribuição entre etapas
            </p>

            <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
              Proporção recomendada
            </h3>

            <div className="mt-8 grid gap-4">
              {distributionBlocks.map((block) => (
                <div
                  key={block.title}
                  className="flex items-center justify-between gap-4 rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200"
                >
                  <span className="text-base font-medium text-slate-700">
                    {block.title}
                  </span>

                  <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                    {block.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Métricas do funil de conteúdo
            </p>

            <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
              O que acompanhar
            </h3>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {metricBlocks.map((block) => (
                <div
                  key={block.title}
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {block.title}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {block.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {funnelData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {funnelData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}

      {selectedFunnelStage && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 py-10 backdrop-blur-sm">
          <div className="w-full max-w-5xl rounded-[1.75rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 lg:p-8">
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                  Detalhes da etapa
                </p>

                <h3 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                  {selectedFunnelStage.title || "Etapa do funil"}
                </h3>

                <p className="mt-3 text-sm font-medium text-slate-500">
                  {selectedFunnelStage.subtitle || "Funil de conteúdo"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFunnelStage(null)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-950 hover:text-white"
                aria-label="Fechar detalhes da etapa"
              >
                ×
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <DetailBlock
                title="Estratégia de conteúdo"
                content={selectedFunnelStage.strategy}
              />

              <DetailBlock
                title="Objetivo da etapa"
                content={selectedFunnelStage.objective}
              />

              <DetailBlock
                title="Próximo passo desejado"
                content={selectedFunnelStage.nextStep}
              />

              <DetailBlock
                title="Exemplos de temas"
                content={selectedFunnelStage.themes}
              />

              <DetailBlock
                title="Formato recomendado"
                content={selectedFunnelStage.format}
              />

              <DetailBlock
                title="Chamadas para ação"
                content={selectedFunnelStage.ctas}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function EditorialLinesPresentation({ section }: { section: Section }) {
  const [editorialData, setEditorialData] =
    useState<EditorialLinesPresentationData>({
      lines: [],
      observation: "",
    });

  const [selectedEditorialLine, setSelectedEditorialLine] =
    useState<EditorialLinePresentationItem | null>(null);

  const [activeEditorialTab, setActiveEditorialTab] = useState<
    "estrutura" | "jornada" | "sistema" | "assuntos"
  >("estrutura");

  function normalizeTopic(
    topic: Partial<EditorialTopicPresentationItem>
  ): EditorialTopicPresentationItem {
    return {
      title: topic.title || "",
      description: topic.description || "",
    };
  }

  function normalizeLine(
    line: Partial<EditorialLinePresentationItem> & {
      description?: string;
      descricao?: string;
      função?: string;
      funcao?: string;
      compatibility?: string;
      role?: string;
      limit?: string;
      topics?: Partial<EditorialTopicPresentationItem>[];
    }
  ): EditorialLinePresentationItem {
    return {
      title: line.title || "",
      function:
        line.function ||
        line.função ||
        line.funcao ||
        line.description ||
        line.descricao ||
        "",
      journeyCompatibility:
        line.journeyCompatibility || line.compatibility || "",
      systemRole: line.systemRole || line.role || "",
      structuralLimit: line.structuralLimit || line.limit || "",
      topics:
        Array.isArray(line.topics) && line.topics.length
          ? line.topics
              .map((topic) => normalizeTopic(topic))
              .filter(
                (topic) => topic.title?.trim() || topic.description?.trim()
              )
          : [],
    };
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-linhas-editoriais"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      const rawLines =
        parsed.lines ||
        parsed.linhas ||
        parsed.items ||
        source.lines ||
        source.linhas ||
        source.items ||
        [];

      setEditorialData({
        lines: Array.isArray(rawLines)
          ? rawLines
              .map((line) => normalizeLine(line))
              .filter(
                (line) =>
                  line.title?.trim() ||
                  line.function?.trim() ||
                  line.journeyCompatibility?.trim() ||
                  line.systemRole?.trim() ||
                  line.structuralLimit?.trim() ||
                  line.topics.length > 0
              )
          : [],
        observation:
          typeof source.observation === "string"
            ? source.observation
            : typeof source.observacao === "string"
            ? source.observacao
            : typeof source.observação === "string"
            ? source.observação
            : typeof source.strategicObservation === "string"
            ? source.strategicObservation
            : "",
      });
    } catch {
      setEditorialData({
        lines: [],
        observation: "",
      });
    }
  }, []);

  const demoLines: EditorialLinePresentationItem[] = [
    {
      title: "Deslocamento de percepção",
      function:
        "Romper a leitura superficial e redirecionar o público do problema aparente para a causa real que sustenta o padrão.",
      journeyCompatibility:
        "Funciona como linha de entrada para pessoas que ainda estão tentando entender por que continuam repetindo os mesmos resultados.",
      systemRole:
        "Ativa a primeira ruptura de percepção, cria consciência do problema e prepara o público para uma leitura mais profunda.",
      structuralLimit:
        "Não deve vender diretamente, sugerir solução completa ou tentar resolver o problema inteiro sozinha.",
      topics: [
        {
          title: "Você não está errando, está repetindo",
          description:
            "A diferença entre erro isolado e padrão ativo. Quando o que parece erro pontual é repetição estrutural. Por que a repetição continua mesmo depois de tentativas reais de mudança.",
        },
        {
          title: "O ciclo invisível de decisão",
          description:
            "O ciclo que a pessoa não enxerga, mas que define seus resultados. Como o mesmo ciclo aparece em momentos diferentes e por que ele se reinicia.",
        },
        {
          title: "Você muda a forma, mas não a estrutura",
          description:
            "Quando a mudança é apenas estética e o padrão continua ativo por baixo. O custo de mudar sem reorganizar a estrutura.",
        },
      ],
    },
    {
      title: "Autoridade e clareza",
      function:
        "Sustentar autoridade, organizar pensamento e mostrar domínio sobre o problema, o contexto e o caminho estratégico.",
      journeyCompatibility:
        "Aparece quando o público já reconhece parte da dor e precisa confiar na leitura, no método e na condução.",
      systemRole:
        "Constrói confiança, reforça critério e posiciona o projeto como referência capaz de orientar decisões.",
      structuralLimit:
        "Não deve virar conteúdo excessivamente técnico, distante ou sem conexão com a realidade do público.",
      topics: [
        {
          title: "O que a maioria não está enxergando",
          description:
            "Explicar a camada invisível do problema, trazer critérios de leitura e mostrar onde o público costuma se confundir.",
        },
        {
          title: "Como tomar decisões com mais estrutura",
          description:
            "Mostrar como critérios, contexto e direção reduzem tentativa, dispersão e decisões baseadas apenas em urgência.",
        },
      ],
    },
    {
      title: "Prova e transformação",
      function:
        "Demonstrar que a estratégia gera movimento real, reduz insegurança e ajuda o público a visualizar possibilidades concretas.",
      journeyCompatibility:
        "Funciona em etapas de comparação, decisão e reforço de confiança antes da conversão.",
      systemRole:
        "Reduz risco percebido, fortalece confiança e transforma promessa em evidência.",
      structuralLimit:
        "Não deve depender apenas de resultado final, números ou depoimentos soltos sem interpretação estratégica.",
      topics: [
        {
          title: "O que muda quando existe estrutura",
          description:
            "Mostrar antes e depois, mudanças de clareza, decisões mais conscientes e evolução no modo como o público enxerga o problema.",
        },
        {
          title: "Resultados que não aparecem só no número",
          description:
            "Evidenciar ganhos de percepção, direção, consistência, posicionamento e tomada de decisão.",
        },
      ],
    },
  ];

  const linesToShow = editorialData.lines.length
    ? editorialData.lines
    : demoLines;

  const observationToShow =
    editorialData.observation?.trim() ||
    "As linhas editoriais devem orientar a produção de conteúdo com consistência, profundidade e função estratégica. Cada linha precisa cumprir um papel claro dentro da jornada, evitando conteúdos soltos, repetitivos ou sem direção.";

  function openEditorialLineDetails(line: EditorialLinePresentationItem) {
    setSelectedEditorialLine(line);
    setActiveEditorialTab("estrutura");
  }

  function closeEditorialLineDetails() {
    setSelectedEditorialLine(null);
    setActiveEditorialTab("estrutura");
  }

  function DetailBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line text-base leading-8 text-slate-600">
          {content || "Não informado."}
        </p>
      </div>
    );
  }

  return (
    <section className="relative rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção organiza os pilares editoriais do projeto, incluindo função estratégica, relação com a jornada, papel no sistema, limites e assuntos derivados de cada linha."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Sistema editorial
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Linhas editoriais principais
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada linha editorial funciona como um eixo estratégico de conteúdo.
            Ela define o que será abordado, qual função cumpre na jornada e
            quais assuntos podem nascer dela.
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {linesToShow.map((line, index) => (
            <div
              key={`${line.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Linha editorial {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                    {line.title || "Linha editorial"}
                  </h4>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="line-clamp-4 text-base leading-8 text-slate-600">
                {line.function ||
                  "Função estratégica da linha editorial ainda não informada."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {line.topics.length > 0 && (
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">
                    {line.topics.length} assunto
                    {line.topics.length > 1 ? "s" : ""}
                  </span>
                )}

                {line.journeyCompatibility && (
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">
                    Jornada
                  </span>
                )}

                {line.systemRole && (
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">
                    Sistema
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => openEditorialLineDetails(line)}
                className="mt-6 cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>
      </article>

      <article className="pt-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Observações sobre a estratégia editorial
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Orientações de uso
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {observationToShow}
          </p>
        </div>
      </article>

      {selectedEditorialLine && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 py-10 backdrop-blur-sm">
          <div className="w-full max-w-5xl rounded-[1.75rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                  Detalhes da linha editorial
                </p>

                <h3 className="mt-3 text-3xl font-light tracking-[-0.04em] text-slate-950">
                  {selectedEditorialLine.title || "Linha editorial"}
                </h3>

                <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                  {selectedEditorialLine.function ||
                    "Função estratégica da linha ainda não informada."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditorialLineDetails}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-950 hover:text-white"
                aria-label="Fechar detalhes da linha editorial"
              >
                ×
              </button>
            </div>

            <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-5">
              {[
                { key: "estrutura", label: "Estrutura" },
                { key: "jornada", label: "Jornada" },
                { key: "sistema", label: "Sistema" },
                { key: "assuntos", label: "Assuntos" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setActiveEditorialTab(
                      tab.key as
                        | "estrutura"
                        | "jornada"
                        | "sistema"
                        | "assuntos"
                    )
                  }
                  className={`cursor-pointer rounded-full px-5 py-3 text-sm font-semibold transition ${
                    activeEditorialTab === tab.key
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeEditorialTab === "estrutura" && (
              <div className="grid gap-5 md:grid-cols-2">
                <DetailBlock
                  title="Função da linha"
                  content={selectedEditorialLine.function}
                />

                <DetailBlock
                  title="Limite estrutural"
                  content={selectedEditorialLine.structuralLimit}
                />
              </div>
            )}

            {activeEditorialTab === "jornada" && (
              <div className="grid gap-5">
                <DetailBlock
                  title="Compatibilidade com jornada"
                  content={selectedEditorialLine.journeyCompatibility}
                />
              </div>
            )}

            {activeEditorialTab === "sistema" && (
              <div className="grid gap-5">
                <DetailBlock
                  title="Papel no sistema"
                  content={selectedEditorialLine.systemRole}
                />
              </div>
            )}

            {activeEditorialTab === "assuntos" && (
              <div className="grid gap-5">
                {selectedEditorialLine.topics.length > 0 ? (
                  selectedEditorialLine.topics.map((topic, index) => (
                    <div
                      key={`${topic.title}-${index}`}
                      className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                          {topic.title || "Assunto"}
                        </h4>
                      </div>

                      <p className="whitespace-pre-line text-base leading-8 text-slate-600">
                        {topic.description ||
                          "Descrição do assunto ainda não informada."}
                      </p>
                    </div>
                  ))
                ) : (
                  <DetailBlock
                    title="Assuntos"
                    content="Nenhum assunto foi cadastrado para esta linha editorial."
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function InstagramPresentation({ section }: { section: Section }) {
  const [instagramData, setInstagramData] = useState<InstagramPresentationData>({
    frequency: "",
    frequencyItems: [],
    objectives: [],
    stories: [],
    hashtags: [],
    reels: [],
    languageStructures: [],
    contents: [],
    visualStrategy: "",
    visualReferences: [],
    bioEnabled: true,
    bioPhoto: "",
    profileHandle: "",
    profileName: "",
    bioText: "",
    bioLink: "",
    highlights: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): InstagramFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-instagram");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setInstagramData({
        frequency: getString(source, [
          "frequency",
          "frequencia",
          "frequência",
        ]),
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        stories: normalizeStringList(source.stories || source.story),
        hashtags: normalizeStringList(source.hashtags),
        reels: normalizeStringList(source.reels),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        contents: normalizeStringList(
          source.contents || source.conteudos || source.conteúdos
        ),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        bioEnabled:
          typeof source.bioEnabled === "boolean" ? source.bioEnabled : true,
        bioPhoto: getString(source, [
          "bioPhoto",
          "photo",
          "foto",
          "profilePhoto",
          "profileImage",
        ]),
        profileHandle: getString(source, [
          "profileHandle",
          "arroba",
          "handle",
          "username",
          "usuario",
          "usuário",
        ]),
        profileName: getString(source, [
          "profileName",
          "nomePerfil",
          "nomeDoPerfil",
          "name",
          "nome",
        ]),
        bioText: getString(source, [
          "bioText",
          "bio",
          "textoBio",
          "textoDaBio",
        ]),
        bioLink: getString(source, [
          "bioLink",
          "linkBio",
          "linkDaBio",
          "profileLink",
        ]),
        highlights: getString(source, [
          "highlights",
          "destaques",
          "destaquesSugeridos",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setInstagramData({
        frequency: "",
        frequencyItems: [],
        objectives: [],
        stories: [],
        hashtags: [],
        reels: [],
        languageStructures: [],
        contents: [],
        visualStrategy: "",
        visualReferences: [],
        bioEnabled: true,
        bioPhoto: "",
        profileHandle: "",
        profileName: "",
        bioText: "",
        bioLink: "",
        highlights: "",
        references: [],
      });
    }
  }, []);

  const demoList = [
    "Conteúdo de autoridade",
    "Bastidores estratégicos",
    "Prova social",
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const demoFrequencyItems: InstagramFrequencyItem[] = [
    {
      format: "Reels",
      quantity: "3",
      period: "por semana",
      observation: "Priorizar conteúdos de autoridade e descoberta.",
    },
    {
      format: "Stories",
      quantity: "diário",
      period: "por dia",
      observation: "Usar para bastidores, relacionamento e prova social.",
    },
    {
      format: "Carrossel",
      quantity: "2",
      period: "por semana",
      observation: "Aprofundar temas educativos e estratégicos.",
    },
    {
      format: "Card único",
      quantity: "1",
      period: "por semana",
      observation: "Usar para frases, conceitos e posicionamentos fortes.",
    },
    {
      format: "Canal de transmissão",
      quantity: "2",
      period: "por semana",
      observation: "Enviar avisos, bastidores e conteúdos de proximidade.",
    },
  ];

  const dataToShow = {
    frequency:
      instagramData.frequency ||
      "Publicações semanais combinando feed, reels, stories e conteúdos de relacionamento.",
    frequencyItems: instagramData.frequencyItems.length
      ? instagramData.frequencyItems
      : demoFrequencyItems,
    objectives: instagramData.objectives.length
      ? instagramData.objectives
      : [
          "Aumentar autoridade percebida",
          "Gerar conexão com o público",
          "Fortalecer reconhecimento da marca",
        ],
    stories: instagramData.stories.length
      ? instagramData.stories
      : ["Bastidores", "Rotina", "Perguntas", "Enquetes", "Provas sociais"],
    hashtags: instagramData.hashtags.length
      ? instagramData.hashtags
      : ["#estrategia", "#conteudo", "#posicionamento"],
    reels: instagramData.reels.length
      ? instagramData.reels
      : ["Dicas rápidas", "Mitos e verdades", "Bastidores", "Tutoriais"],
    languageStructures: instagramData.languageStructures.length
      ? instagramData.languageStructures
      : ["Gancho forte", "Explicação simples", "Exemplo prático", "Chamada final"],
    contents: instagramData.contents.length
      ? instagramData.contents
      : demoList,
    visualStrategy:
      instagramData.visualStrategy ||
      "A identidade visual do Instagram deve sustentar clareza, reconhecimento e consistência entre feed, stories, reels e destaques.",
    visualReferences: instagramData.visualReferences.length
      ? instagramData.visualReferences
      : demoVisualReferences,
    bioPhoto: instagramData.bioPhoto,
    profileHandle: instagramData.profileHandle || "@nomedoperfil",
    profileName: instagramData.profileName || "Nome do perfil",
    bioText:
      instagramData.bioText ||
      "Bio estratégica do Instagram, com clareza sobre quem é a marca, o que entrega, para quem entrega e qual próximo passo o público deve tomar.",
    bioLink: instagramData.bioLink || "https://...",
    highlights:
      instagramData.highlights ||
      "Sobre, Serviços, Depoimentos, Conteúdos, Contato",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do Instagram, incluindo bio, frequência, objetivos, formatos, linguagem, conteúdos e identidade visual."
      />

      <article className="border-b border-slate-200 py-12">
  <div className="max-w-[980px]">
    <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
      Perfil e posicionamento
    </p>

    <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
      Bio do Instagram
    </h3>

    <p className="mt-5 text-lg leading-9 text-slate-600">
      A bio funciona como a primeira síntese estratégica do perfil. Ela
      precisa deixar claro quem é a marca, o que entrega, para quem
      entrega e qual ação o público deve tomar.
    </p>
  </div>

  <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
    <div className="grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-medium text-white shadow-sm ring-8 ring-white">
          {dataToShow.bioPhoto ? (
            <img
              src={dataToShow.bioPhoto}
              alt={dataToShow.profileName}
              className="h-full w-full object-cover"
            />
          ) : (
            "Foto"
          )}
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          Foto do perfil
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">
          {dataToShow.profileHandle}
        </p>

        <h4 className="mt-2 text-3xl font-light tracking-[-0.04em] text-slate-950">
          {dataToShow.profileName}
        </h4>

        <div className="mt-7">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            Conteúdo da bio
          </p>

          <p className="mt-4 whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.bioText}
          </p>
        </div>

        <div className="mt-7 rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
            Link da bio
          </p>

          <p className="mt-3 break-words text-base leading-8 text-slate-600">
            {dataToShow.bioLink}
          </p>
        </div>

        <div className="mt-5 rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
            Destaques sugeridos
          </p>

          <p className="mt-3 text-base leading-8 text-slate-600">
            {dataToShow.highlights}
          </p>
        </div>
      </div>
    </div>
  </div>
</article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />
          <ListCard title="Stories" items={dataToShow.stories} />
          <ListCard title="Hashtags" items={dataToShow.hashtags} />
          <ListCard title="Reels" items={dataToShow.reels} />
          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />
          <ListCard title="Conteúdos" items={dataToShow.contents} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do Instagram
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-[4/5] items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {instagramData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {instagramData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function TikTokPresentation({ section }: { section: Section }) {
  const [tiktokData, setTikTokData] = useState<TikTokPresentationData>({
    frequencyItems: [],
    objectives: [],
    languageStructures: [],
    contents: [],
    mainFormats: "",
    contentSeries: "",
    visualStrategy: "",
    visualReferences: [],
    openingHooks: "",
    retentionResources: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): TikTokFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-tiktok");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setTikTokData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        contents: normalizeStringList(
          source.contents || source.conteudos || source.conteúdos
        ),
        mainFormats: getString(source, [
          "mainFormats",
          "formatosPrincipais",
          "formatos",
        ]),
        contentSeries: getString(source, [
          "contentSeries",
          "seriesDeConteudo",
          "sériesDeConteúdo",
          "series",
          "séries",
        ]),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        openingHooks: getString(source, [
          "openingHooks",
          "ganchosDeAbertura",
          "ganchos",
        ]),
        retentionResources: getString(source, [
          "retentionResources",
          "recursosDeRetencao",
          "recursosDeRetenção",
          "retencao",
          "retenção",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setTikTokData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        contents: [],
        mainFormats: "",
        contentSeries: "",
        visualStrategy: "",
        visualReferences: [],
        openingHooks: "",
        retentionResources: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: TikTokFrequencyItem[] = [
    {
      format: "Vídeos curtos",
      quantity: "5",
      period: "por semana",
      observation: "Priorizar vídeos de descoberta, autoridade e educação.",
    },
    {
      format: "Séries de conteúdo",
      quantity: "2",
      period: "por semana",
      observation: "Criar quadros recorrentes para aumentar reconhecimento.",
    },
    {
      format: "Reaproveitamento de conteúdo",
      quantity: "3",
      period: "por semana",
      observation: "Adaptar temas do Instagram, YouTube e conteúdos longos.",
    },
    {
      format: "Lives",
      quantity: "1",
      period: "por mês",
      observation: "Usar para relacionamento, autoridade e aprofundamento.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const dataToShow = {
    frequencyItems: tiktokData.frequencyItems.length
      ? tiktokData.frequencyItems
      : demoFrequencyItems,
    objectives: tiktokData.objectives.length
      ? tiktokData.objectives
      : [
          "Aumentar alcance e descoberta",
          "Fortalecer autoridade",
          "Gerar conexão com novos públicos",
        ],
    languageStructures: tiktokData.languageStructures.length
      ? tiktokData.languageStructures
      : [
          "Gancho nos primeiros segundos",
          "Contexto rápido",
          "Desenvolvimento objetivo",
          "Exemplo prático",
          "Chamada final",
        ],
    contents: tiktokData.contents.length
      ? tiktokData.contents
      : [
          "Dicas rápidas",
          "Mitos e verdades",
          "Bastidores",
          "Antes e depois",
          "Respostas a dúvidas",
        ],
    mainFormats:
      tiktokData.mainFormats ||
      "Vídeos curtos, dicas rápidas, bastidores, reacts, storytelling, perguntas e respostas, cortes e tendências adaptadas.",
    contentSeries:
      tiktokData.contentSeries ||
      "Séries de mitos, erros comuns, passo a passo, análise de casos, rotina, desafios e bastidores.",
    visualStrategy:
      tiktokData.visualStrategy ||
      "A identidade visual do TikTok deve priorizar clareza, ritmo, legenda na tela, bom enquadramento, cortes dinâmicos e estética coerente com a marca.",
    visualReferences: tiktokData.visualReferences.length
      ? tiktokData.visualReferences
      : demoVisualReferences,
    openingHooks:
      tiktokData.openingHooks ||
      "Você está cometendo esse erro. Pare de fazer isso. Ninguém te conta isso sobre. O que ninguém percebe é.",
    retentionResources:
      tiktokData.retentionResources ||
      "Cortes rápidos, legenda dinâmica, mudança de enquadramento, exemplos práticos, listas, suspense e ritmo visual.",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function TextBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do TikTok, incluindo frequência, objetivos, linguagem, formatos, retenção, conteúdos e identidade visual."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para os formatos do
            TikTok, incluindo vídeos curtos, séries, reaproveitamentos e lives.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />

          <ListCard title="Conteúdos" items={dataToShow.contents} />

          <TextBlock title="Formatos principais" content={dataToShow.mainFormats} />

          <TextBlock title="Séries de conteúdo" content={dataToShow.contentSeries} />

          <TextBlock title="Ganchos de abertura" content={dataToShow.openingHooks} />

          <TextBlock
            title="Recursos de retenção"
            content={dataToShow.retentionResources}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do TikTok
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-[9/16] items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {tiktokData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {tiktokData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function YouTubePresentation({ section }: { section: Section }) {
  const [youtubeData, setYouTubeData] = useState<YouTubePresentationData>({
    frequencyItems: [],
    objectives: [],
    languageStructures: [],
    editingStyle: "",
    visualReferences: [],
    seoStrategies: [],
    contents: [],
    channelPhoto: "",
    channelCover: "",
    channelName: "",
    channelCategory: "",
    channelDescription: "",
    suggestedPlaylists: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): YouTubeFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-youtube");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setYouTubeData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        editingStyle: getString(source, [
          "editingStyle",
          "estiloEdicao",
          "estiloDeEdicao",
          "estiloDeEdição",
          "estrategiaEdicao",
          "estratégiaEdição",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        seoStrategies: normalizeStringList(
          source.seoStrategies ||
            source.estrategiasSeo ||
            source.estratégiasSeo ||
            source.seo
        ),
        contents: normalizeStringList(
          source.contents || source.conteudos || source.conteúdos
        ),
        channelPhoto: getString(source, [
          "channelPhoto",
          "fotoCanal",
          "fotoDoCanal",
          "photo",
          "foto",
        ]),
        channelCover: getString(source, [
          "channelCover",
          "capaCanal",
          "capaDoCanal",
          "cover",
          "capa",
        ]),
        channelName: getString(source, [
          "channelName",
          "nomeCanal",
          "nomeDoCanal",
          "name",
          "nome",
        ]),
        channelCategory: getString(source, [
          "channelCategory",
          "categoriaCanal",
          "categoriaDoCanal",
          "category",
          "categoria",
        ]),
        channelDescription: getString(source, [
          "channelDescription",
          "descricaoCanal",
          "descriçãoCanal",
          "descricaoDoCanal",
          "descriçãoDoCanal",
          "description",
          "descricao",
          "descrição",
        ]),
        suggestedPlaylists: getString(source, [
          "suggestedPlaylists",
          "playlistsSugeridas",
          "playlists",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setYouTubeData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        editingStyle: "",
        visualReferences: [],
        seoStrategies: [],
        contents: [],
        channelPhoto: "",
        channelCover: "",
        channelName: "",
        channelCategory: "",
        channelDescription: "",
        suggestedPlaylists: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: YouTubeFrequencyItem[] = [
    {
      format: "Vídeo principal",
      quantity: "1",
      period: "por semana",
      observation: "Conteúdo mais aprofundado, educativo e estratégico.",
    },
    {
      format: "Shorts",
      quantity: "4",
      period: "por semana",
      observation: "Cortes rápidos para alcance, descoberta e reforço de autoridade.",
    },
    {
      format: "Live",
      quantity: "1",
      period: "por mês",
      observation: "Usar para relacionamento, aprofundamento e interação.",
    },
    {
      format: "Cortes",
      quantity: "3",
      period: "por semana",
      observation: "Reaproveitar trechos fortes dos vídeos principais.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const dataToShow = {
    frequencyItems: youtubeData.frequencyItems.length
      ? youtubeData.frequencyItems
      : demoFrequencyItems,
    objectives: youtubeData.objectives.length
      ? youtubeData.objectives
      : [
          "Aumentar autoridade",
          "Educar o público",
          "Gerar tráfego qualificado",
          "Captar leads",
        ],
    languageStructures: youtubeData.languageStructures.length
      ? youtubeData.languageStructures
      : [
          "Abertura com promessa clara",
          "Contextualização",
          "Desenvolvimento",
          "Exemplo prático",
          "Chamada final",
        ],
    editingStyle:
      youtubeData.editingStyle ||
      "Edição clara, ritmo objetivo, cortes limpos, trilhas discretas, legendas quando necessário, thumbnails consistentes e enquadramento profissional.",
    visualReferences: youtubeData.visualReferences.length
      ? youtubeData.visualReferences
      : demoVisualReferences,
    seoStrategies: youtubeData.seoStrategies.length
      ? youtubeData.seoStrategies
      : [
          "Palavras-chave do canal",
          "Títulos otimizados",
          "Playlists estratégicas",
          "Tags principais",
          "Temas buscáveis",
        ],
    contents: youtubeData.contents.length
      ? youtubeData.contents
      : [
          "Vídeos educativos",
          "Aulas completas",
          "Estudos de caso",
          "Entrevistas",
          "Tutoriais",
        ],
    channelPhoto: youtubeData.channelPhoto,
    channelCover: youtubeData.channelCover,
    channelName: youtubeData.channelName || "Nome do canal",
    channelCategory: youtubeData.channelCategory || "Categoria do canal",
    channelDescription:
      youtubeData.channelDescription ||
      "Descrição estratégica do canal, explicando quem é a marca, o que o público encontra ali, quais temas serão abordados e qual transformação ou valor o canal entrega.",
    suggestedPlaylists:
      youtubeData.suggestedPlaylists ||
      "Comece por aqui, Aulas, Estudos de caso, Entrevistas, Conteúdos estratégicos",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function TextBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do YouTube, incluindo apresentação do canal, frequência, objetivos, linguagem, edição, SEO e conteúdos."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Canal e posicionamento
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Configuração do canal
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A página do canal precisa apresentar uma primeira impressão clara,
            profissional e alinhada ao posicionamento da marca.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
          <div className="flex aspect-[16/5] items-center justify-center bg-slate-200 text-sm font-medium text-slate-500">
            {dataToShow.channelCover ? (
              <img
                src={dataToShow.channelCover}
                alt="Capa do canal"
                className="h-full w-full object-cover"
              />
            ) : (
              "Capa do canal"
            )}
          </div>

          <div className="p-8">
            <div className="grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start">
              <div className="flex flex-col items-center text-center">
                <div className="-mt-20 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-medium text-white shadow-sm ring-8 ring-white">
                  {dataToShow.channelPhoto ? (
                    <img
                      src={dataToShow.channelPhoto}
                      alt={dataToShow.channelName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Foto"
                  )}
                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Foto do canal
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {dataToShow.channelCategory}
                </p>

                <h4 className="mt-2 text-3xl font-light tracking-[-0.04em] text-slate-950">
                  {dataToShow.channelName}
                </h4>

                <div className="mt-7">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Descrição do canal
                  </p>

                  <p className="mt-4 whitespace-pre-line text-lg leading-9 text-slate-600">
                    {dataToShow.channelDescription}
                  </p>
                </div>

                <div className="mt-7 rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Playlists sugeridas
                  </p>

                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {dataToShow.suggestedPlaylists}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para vídeos principais,
            shorts, lives, cortes e demais formatos do canal.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />

          <ListCard title="Estratégia de SEO" items={dataToShow.seoStrategies} />

          <ListCard title="Conteúdos" items={dataToShow.contents} />

          <TextBlock title="Estilo de edição" content={dataToShow.editingStyle} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Referências visuais
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual dos vídeos
          </h3>

          <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
            As referências ajudam a orientar enquadramento, thumbnails, edição,
            identidade visual, ritmo e aparência geral dos vídeos.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {youtubeData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {youtubeData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function FacebookPresentation({ section }: { section: Section }) {
  const [facebookData, setFacebookData] = useState<FacebookPresentationData>({
    frequencyItems: [],
    objectives: [],
    languageStructures: [],
    contents: [],
    visualStrategy: "",
    visualReferences: [],
    pagePhoto: "",
    pageCover: "",
    pageName: "",
    pageCategory: "",
    pageDescription: "",
    siteLink: "",
    contactLink: "",
    serviceRegion: "",
    otherLinks: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): FacebookFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-facebook");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setFacebookData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        contents: normalizeStringList(
          source.contents || source.conteudos || source.conteúdos
        ),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        pagePhoto: getString(source, [
          "pagePhoto",
          "fotoPagina",
          "fotoDaPagina",
          "fotoPágina",
          "fotoDaPágina",
          "photo",
          "foto",
        ]),
        pageCover: getString(source, [
          "pageCover",
          "capaPagina",
          "capaDaPagina",
          "capaPágina",
          "capaDaPágina",
          "cover",
          "capa",
        ]),
        pageName: getString(source, [
          "pageName",
          "nomePagina",
          "nomeDaPagina",
          "nomePágina",
          "nomeDaPágina",
          "name",
          "nome",
        ]),
        pageCategory: getString(source, [
          "pageCategory",
          "categoriaPagina",
          "categoriaDaPagina",
          "categoriaPágina",
          "categoriaDaPágina",
          "category",
          "categoria",
        ]),
        pageDescription: getString(source, [
          "pageDescription",
          "descricaoPagina",
          "descriçãoPagina",
          "descricaoDaPagina",
          "descriçãoDaPágina",
          "description",
          "descricao",
          "descrição",
        ]),
        siteLink: getString(source, ["siteLink", "site", "website"]),
        contactLink: getString(source, [
          "contactLink",
          "linkContato",
          "linkDeContato",
          "whatsapp",
          "contato",
        ]),
        serviceRegion: getString(source, [
          "serviceRegion",
          "regiaoAtendimento",
          "regiãoAtendimento",
          "endereco",
          "endereço",
        ]),
        otherLinks: getString(source, [
          "otherLinks",
          "outrosLinks",
          "links",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setFacebookData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        contents: [],
        visualStrategy: "",
        visualReferences: [],
        pagePhoto: "",
        pageCover: "",
        pageName: "",
        pageCategory: "",
        pageDescription: "",
        siteLink: "",
        contactLink: "",
        serviceRegion: "",
        otherLinks: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: FacebookFrequencyItem[] = [
    {
      format: "Post institucional",
      quantity: "3",
      period: "por semana",
      observation: "Reforçar presença, autoridade e relacionamento.",
    },
    {
      format: "Vídeo curto",
      quantity: "2",
      period: "por semana",
      observation: "Usar para alcance, prova social e educação rápida.",
    },
    {
      format: "Link estratégico",
      quantity: "1",
      period: "por semana",
      observation: "Direcionar para site, blog, formulário ou material de apoio.",
    },
    {
      format: "Live",
      quantity: "1",
      period: "por mês",
      observation: "Usar para relacionamento, autoridade e interação.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const dataToShow = {
    frequencyItems: facebookData.frequencyItems.length
      ? facebookData.frequencyItems
      : demoFrequencyItems,
    objectives: facebookData.objectives.length
      ? facebookData.objectives
      : [
          "Fortalecer autoridade",
          "Gerar tráfego para o site",
          "Captar leads",
          "Divulgar conteúdos e eventos",
        ],
    languageStructures: facebookData.languageStructures.length
      ? facebookData.languageStructures
      : [
          "Texto direto",
          "Legenda educativa",
          "Chamada para link",
          "Perguntas para engajamento",
        ],
    contents: facebookData.contents.length
      ? facebookData.contents
      : [
          "Post institucional",
          "Vídeo curto",
          "Link para blog",
          "Chamada para evento",
          "Prova social",
        ],
    visualStrategy:
      facebookData.visualStrategy ||
      "A identidade visual do Facebook deve manter consistência entre capa, posts, vídeos, chamadas e materiais de apoio, reforçando clareza e reconhecimento da marca.",
    visualReferences: facebookData.visualReferences.length
      ? facebookData.visualReferences
      : demoVisualReferences,
    pagePhoto: facebookData.pagePhoto,
    pageCover: facebookData.pageCover,
    pageName: facebookData.pageName || "Nome da página",
    pageCategory: facebookData.pageCategory || "Categoria da página",
    pageDescription:
      facebookData.pageDescription ||
      "Descrição estratégica da página, explicando quem é a marca, o que entrega, para quem entrega e quais canais de contato ou próximos passos devem ser priorizados.",
    siteLink: facebookData.siteLink || "https://...",
    contactLink: facebookData.contactLink || "https://...",
    serviceRegion:
      facebookData.serviceRegion || "Atendimento online, cidade ou região",
    otherLinks:
      facebookData.otherLinks || "WhatsApp, catálogo, landing page ou formulário",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do Facebook, incluindo configuração da página, frequência, objetivos, linguagem, conteúdos e identidade visual."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Página e posicionamento
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Configuração da página
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A página do Facebook precisa apresentar uma primeira impressão
            clara, organizada e alinhada à presença digital da marca.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
          <div className="flex aspect-[16/5] items-center justify-center bg-slate-200 text-sm font-medium text-slate-500">
            {dataToShow.pageCover ? (
              <img
                src={dataToShow.pageCover}
                alt="Capa da página"
                className="h-full w-full object-cover"
              />
            ) : (
              "Capa da página"
            )}
          </div>

          <div className="p-8">
            <div className="grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start">
              <div className="flex flex-col items-center text-center">
                <div className="-mt-20 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-medium text-white shadow-sm ring-8 ring-white">
                  {dataToShow.pagePhoto ? (
                    <img
                      src={dataToShow.pagePhoto}
                      alt={dataToShow.pageName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Foto"
                  )}
                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Foto da página
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {dataToShow.pageCategory}
                </p>

                <h4 className="mt-2 text-3xl font-light tracking-[-0.04em] text-slate-950">
                  {dataToShow.pageName}
                </h4>

                <div className="mt-7">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Descrição da página
                  </p>

                  <p className="mt-4 whitespace-pre-line text-lg leading-9 text-slate-600">
                    {dataToShow.pageDescription}
                  </p>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <InfoBlock title="Site" content={dataToShow.siteLink} />

                  <InfoBlock
                    title="Link de contato"
                    content={dataToShow.contactLink}
                  />

                  <InfoBlock
                    title="Região de atendimento"
                    content={dataToShow.serviceRegion}
                  />

                  <InfoBlock
                    title="Outros links"
                    content={dataToShow.otherLinks}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para posts, vídeos,
            lives, links estratégicos e demais publicações da página.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />

          <ListCard title="Conteúdos" items={dataToShow.contents} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do Facebook
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {facebookData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {facebookData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function LinkedInPresentation({ section }: { section: Section }) {
  const [linkedinData, setLinkedInData] = useState<LinkedInPresentationData>({
    frequencyItems: [],
    objectives: [],
    languageStructures: [],
    contents: [],
    visualStrategy: "",
    visualReferences: [],
    profilePhoto: "",
    profileCover: "",
    profileName: "",
    headline: "",
    authorityThemes: "",
    aboutProfile: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): LinkedInFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-linkedin");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setLinkedInData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        contents: normalizeStringList(
          source.contents || source.conteudos || source.conteúdos
        ),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        profilePhoto: getString(source, [
          "profilePhoto",
          "fotoPerfil",
          "fotoDoPerfil",
          "photo",
          "foto",
        ]),
        profileCover: getString(source, [
          "profileCover",
          "capaPerfil",
          "capaDoPerfil",
          "cover",
          "capa",
        ]),
        profileName: getString(source, [
          "profileName",
          "nomePerfil",
          "nomeDoPerfil",
          "name",
          "nome",
        ]),
        headline: getString(source, [
          "headline",
          "headlineSugerida",
          "tituloProfissional",
        ]),
        authorityThemes: getString(source, [
          "authorityThemes",
          "temasDeAutoridade",
          "temasAutoridade",
          "autoridade",
        ]),
        aboutProfile: getString(source, [
          "aboutProfile",
          "sobrePerfil",
          "sobreDoPerfil",
          "about",
          "sobre",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setLinkedInData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        contents: [],
        visualStrategy: "",
        visualReferences: [],
        profilePhoto: "",
        profileCover: "",
        profileName: "",
        headline: "",
        authorityThemes: "",
        aboutProfile: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: LinkedInFrequencyItem[] = [
    {
      format: "Post de autoridade",
      quantity: "3",
      period: "por semana",
      observation: "Reforçar posicionamento, visão profissional e domínio estratégico.",
    },
    {
      format: "Artigo",
      quantity: "1",
      period: "por mês",
      observation: "Aprofundar temas relevantes e fortalecer autoridade.",
    },
    {
      format: "Carrossel",
      quantity: "1",
      period: "por semana",
      observation: "Transformar conceitos em conteúdos educativos e compartilháveis.",
    },
    {
      format: "Interação estratégica",
      quantity: "diária",
      period: "por dia",
      observation: "Comentar, responder e interagir com pessoas e temas relevantes.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const dataToShow = {
    frequencyItems: linkedinData.frequencyItems.length
      ? linkedinData.frequencyItems
      : demoFrequencyItems,
    objectives: linkedinData.objectives.length
      ? linkedinData.objectives
      : [
          "Fortalecer autoridade profissional",
          "Atrair oportunidades",
          "Gerar relacionamento B2B",
          "Consolidar posicionamento",
        ],
    languageStructures: linkedinData.languageStructures.length
      ? linkedinData.languageStructures
      : [
          "Reflexão profissional",
          "Storytelling de experiência",
          "Análise de mercado",
          "Opinião estratégica",
        ],
    contents: linkedinData.contents.length
      ? linkedinData.contents
      : [
          "Bastidores profissionais",
          "Aprendizados",
          "Cases",
          "Análises",
          "Artigos",
          "Provocações estratégicas",
        ],
    visualStrategy:
      linkedinData.visualStrategy ||
      "A identidade visual do LinkedIn deve transmitir profissionalismo, clareza, autoridade e consistência entre capa, posts, carrosséis, vídeos e materiais de apoio.",
    visualReferences: linkedinData.visualReferences.length
      ? linkedinData.visualReferences
      : demoVisualReferences,
    profilePhoto: linkedinData.profilePhoto,
    profileCover: linkedinData.profileCover,
    profileName: linkedinData.profileName || "Nome do perfil ou página",
    headline:
      linkedinData.headline ||
      "Headline estratégica do LinkedIn, com clareza sobre especialidade, autoridade e proposta de valor.",
    authorityThemes:
      linkedinData.authorityThemes ||
      "Estratégia, gestão, inovação, vendas, marketing, liderança e posicionamento.",
    aboutProfile:
      linkedinData.aboutProfile ||
      "Texto estratégico para a seção Sobre do LinkedIn, explicando quem é o profissional ou marca, o que entrega, para quem entrega, quais problemas resolve e quais temas sustentam sua autoridade.",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do LinkedIn, incluindo posicionamento profissional, frequência, objetivos, linguagem, conteúdos e identidade visual."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Perfil e posicionamento
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Perfil profissional no LinkedIn
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O perfil precisa comunicar autoridade, clareza profissional,
            proposta de valor e temas de domínio estratégico.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
          <div className="flex aspect-[16/5] items-center justify-center bg-slate-200 text-sm font-medium text-slate-500">
            {dataToShow.profileCover ? (
              <img
                src={dataToShow.profileCover}
                alt="Capa do LinkedIn"
                className="h-full w-full object-cover"
              />
            ) : (
              "Capa do LinkedIn"
            )}
          </div>

          <div className="p-8">
            <div className="grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start">
              <div className="flex flex-col items-center text-center">
                <div className="-mt-20 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-medium text-white shadow-sm ring-8 ring-white">
                  {dataToShow.profilePhoto ? (
                    <img
                      src={dataToShow.profilePhoto}
                      alt={dataToShow.profileName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Foto"
                  )}
                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Foto do perfil
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {dataToShow.headline}
                </p>

                <h4 className="mt-2 text-3xl font-light tracking-[-0.04em] text-slate-950">
                  {dataToShow.profileName}
                </h4>

                <div className="mt-7 grid gap-4">
                  <InfoBlock
                    title="Temas de autoridade"
                    content={dataToShow.authorityThemes}
                  />

                  <InfoBlock
                    title="Sobre do perfil"
                    content={dataToShow.aboutProfile}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para posts, artigos,
            carrosséis e interações estratégicas no LinkedIn.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />

          <ListCard title="Conteúdos" items={dataToShow.contents} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do LinkedIn
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {linkedinData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {linkedinData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function WhatsAppPresentation({ section }: { section: Section }) {
  const [whatsappData, setWhatsAppData] = useState<WhatsAppPresentationData>({
    frequencyItems: [],
    objectives: [],
    languageStructures: [],
    contents: [],
    firstContactFlow: "",
    nurtureFlow: "",
    salesFlow: "",
    postSaleFlow: "",
    visualStrategy: "",
    visualReferences: [],
    mainNumber: "",
    directLink: "",
    initialMessage: "",
    serviceNotes: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): WhatsAppFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-whatsapp");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setWhatsAppData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        contents: normalizeStringList(
          source.contents || source.conteudos || source.conteúdos
        ),
        firstContactFlow: getString(source, [
          "firstContactFlow",
          "primeiroAtendimento",
          "atendimentoInicial",
        ]),
        nurtureFlow: getString(source, [
          "nurtureFlow",
          "nutricao",
          "nutrição",
          "relacionamento",
        ]),
        salesFlow: getString(source, [
          "salesFlow",
          "conversaoVendas",
          "conversãoVendas",
          "vendas",
        ]),
        postSaleFlow: getString(source, [
          "postSaleFlow",
          "posVenda",
          "pósVenda",
          "acompanhamento",
        ]),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        mainNumber: getString(source, [
          "mainNumber",
          "numeroPrincipal",
          "númeroPrincipal",
          "telefone",
          "whatsapp",
        ]),
        directLink: getString(source, [
          "directLink",
          "linkDireto",
          "linkWhatsapp",
          "linkWhatsApp",
          "url",
        ]),
        initialMessage: getString(source, [
          "initialMessage",
          "mensagemInicial",
          "mensagemSugerida",
        ]),
        serviceNotes: getString(source, [
          "serviceNotes",
          "observacoesAtendimento",
          "observaçõesAtendimento",
          "notasAtendimento",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setWhatsAppData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        contents: [],
        firstContactFlow: "",
        nurtureFlow: "",
        salesFlow: "",
        postSaleFlow: "",
        visualStrategy: "",
        visualReferences: [],
        mainNumber: "",
        directLink: "",
        initialMessage: "",
        serviceNotes: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: WhatsAppFrequencyItem[] = [
    {
      format: "Mensagem de relacionamento",
      quantity: "2",
      period: "por semana",
      observation: "Manter presença, proximidade e vínculo com a base.",
    },
    {
      format: "Conteúdo estratégico",
      quantity: "1",
      period: "por semana",
      observation: "Enviar materiais educativos, convites ou conteúdos de valor.",
    },
    {
      format: "Lista de transmissão",
      quantity: "1",
      period: "por semana",
      observation: "Usar para distribuição organizada sem excesso de mensagens.",
    },
    {
      format: "Acompanhamento comercial",
      quantity: "conforme demanda",
      period: "por dia",
      observation: "Responder leads, recuperar oportunidades e conduzir conversas.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const dataToShow = {
    frequencyItems: whatsappData.frequencyItems.length
      ? whatsappData.frequencyItems
      : demoFrequencyItems,
    objectives: whatsappData.objectives.length
      ? whatsappData.objectives
      : [
          "Nutrir leads",
          "Responder dúvidas",
          "Conduzir para venda",
          "Enviar conteúdos estratégicos",
          "Manter relacionamento",
        ],
    languageStructures: whatsappData.languageStructures.length
      ? whatsappData.languageStructures
      : [
          "Saudação inicial",
          "Pergunta de diagnóstico",
          "Resposta objetiva",
          "Próxima ação",
          "Chamada para conversa",
        ],
    contents: whatsappData.contents.length
      ? whatsappData.contents
      : [
          "Mensagem de boas-vindas",
          "Conteúdo educativo",
          "Convite",
          "Lembrete",
          "Oferta",
          "Acompanhamento",
          "Pós-venda",
        ],
    firstContactFlow:
      whatsappData.firstContactFlow ||
      "A primeira resposta deve acolher a pessoa, identificar a demanda principal e conduzir para a próxima ação com clareza.",
    nurtureFlow:
      whatsappData.nurtureFlow ||
      "O relacionamento deve manter contato com valor, enviar conteúdos úteis e preparar a pessoa para uma decisão sem excesso de pressão.",
    salesFlow:
      whatsappData.salesFlow ||
      "A conversão deve apresentar a oferta com clareza, responder objeções, indicar próximos passos e facilitar o fechamento.",
    postSaleFlow:
      whatsappData.postSaleFlow ||
      "O pós-venda deve acompanhar o cliente, enviar orientações, pedir feedback e manter o relacionamento ativo.",
    visualStrategy:
      whatsappData.visualStrategy ||
      "A identidade visual do WhatsApp deve manter consistência nos cards, PDFs, convites, imagens, capas e materiais enviados ao cliente.",
    visualReferences: whatsappData.visualReferences.length
      ? whatsappData.visualReferences
      : demoVisualReferences,
    mainNumber: whatsappData.mainNumber || "+55 11 99999-9999",
    directLink: whatsappData.directLink || "https://wa.me/...",
    initialMessage:
      whatsappData.initialMessage ||
      "Olá, quero saber mais sobre como funciona.",
    serviceNotes:
      whatsappData.serviceNotes ||
      "Definir horários de atendimento, responsáveis, tempo ideal de resposta, etiquetas, etapas do funil e cuidados na condução das conversas.",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  function TextBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do WhatsApp, incluindo atendimento, relacionamento, nutrição, conversão, fluxos de conversa e materiais de apoio."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Canal de atendimento e relacionamento
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Configurações do WhatsApp
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O WhatsApp funciona como ponto de contato direto para atendimento,
            nutrição, relacionamento, conversão e acompanhamento de
            oportunidades.
          </p>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <InfoBlock title="Número principal" content={dataToShow.mainNumber} />

            <InfoBlock title="Link direto" content={dataToShow.directLink} />

            <InfoBlock
              title="Mensagem inicial sugerida"
              content={dataToShow.initialMessage}
            />

            <InfoBlock
              title="Observações de atendimento"
              content={dataToShow.serviceNotes}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por tipo de envio
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para mensagens, listas de
            transmissão, conteúdos, lembretes e acompanhamentos comerciais.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Tipo de envio
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />

          <ListCard title="Conteúdos" items={dataToShow.contents} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Fluxos de conversa
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Jornada de atendimento no WhatsApp
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os fluxos ajudam a organizar a condução das conversas, desde o
            primeiro contato até o acompanhamento posterior à compra.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <TextBlock
            title="Primeiro atendimento"
            content={dataToShow.firstContactFlow}
          />

          <TextBlock
            title="Nutrição e relacionamento"
            content={dataToShow.nurtureFlow}
          />

          <TextBlock title="Conversão de vendas" content={dataToShow.salesFlow} />

          <TextBlock
            title="Pós-venda e acompanhamento"
            content={dataToShow.postSaleFlow}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do WhatsApp
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {whatsappData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {whatsappData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function BlogPresentation({ section }: { section: Section }) {
  const [blogData, setBlogData] = useState<BlogPresentationData>({
    frequencyItems: [],
    objectives: [],
    languageStructures: [],
    visualStrategy: "",
    visualReferences: [],
    priorityKeywords: "",
    blogCategories: "",
    seoGuidelines: "",
    contents: [],
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): BlogFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeContentItems(value: unknown): BlogContentPresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            suggestedDate: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "tema", "name", "nome"]),
          suggestedDate: getString(record, [
            "suggestedDate",
            "dataSugerida",
            "date",
            "data",
          ]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "description",
            "descricao",
            "descrição",
          ]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.suggestedDate.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-blog");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setBlogData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        priorityKeywords: getString(source, [
          "priorityKeywords",
          "palavrasChavePrioritarias",
          "palavrasChavePrioritárias",
          "keywords",
        ]),
        blogCategories: getString(source, [
          "blogCategories",
          "categoriasBlog",
          "categoriasDoBlog",
          "categories",
          "categorias",
        ]),
        seoGuidelines: getString(source, [
          "seoGuidelines",
          "orientacoesSeo",
          "orientaçõesSeo",
          "seo",
        ]),
        contents: normalizeContentItems(
          source.contents || source.conteudos || source.conteúdos
        ),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setBlogData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        visualStrategy: "",
        visualReferences: [],
        priorityKeywords: "",
        blogCategories: "",
        seoGuidelines: "",
        contents: [],
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: BlogFrequencyItem[] = [
    {
      format: "Artigo SEO",
      quantity: "1",
      period: "por semana",
      observation: "Priorizar palavras-chave com intenção de busca.",
    },
    {
      format: "Artigo de autoridade",
      quantity: "2",
      period: "por mês",
      observation: "Aprofundar temas estratégicos e fortalecer posicionamento.",
    },
    {
      format: "Atualização de artigo",
      quantity: "1",
      period: "por mês",
      observation: "Revisar conteúdos antigos para melhorar performance orgânica.",
    },
    {
      format: "Conteúdo pilar",
      quantity: "1",
      period: "por mês",
      observation: "Criar páginas ou artigos centrais para sustentar clusters de conteúdo.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const demoContents: BlogContentPresentationItem[] = [
    {
      title: "Como construir uma estratégia de conteúdo eficiente",
      suggestedDate: "15/06/2026",
      observation:
        "Artigo educativo com foco em autoridade, palavra-chave estratégica e chamada para uma próxima ação.",
    },
    {
      title: "Principais erros que impedem o crescimento orgânico",
      suggestedDate: "22/06/2026",
      observation:
        "Conteúdo de dor e conscientização, conectando problema, diagnóstico e solução estratégica.",
    },
    {
      title: "Guia prático para organizar temas, SEO e calendário editorial",
      suggestedDate: "29/06/2026",
      observation:
        "Conteúdo pilar para orientar o público e apoiar links internos dentro do blog.",
    },
  ];

  const dataToShow = {
    frequencyItems: blogData.frequencyItems.length
      ? blogData.frequencyItems
      : demoFrequencyItems,
    objectives: blogData.objectives.length
      ? blogData.objectives
      : [
          "Aumentar tráfego orgânico",
          "Educar o público",
          "Fortalecer autoridade",
          "Gerar leads",
          "Apoiar vendas",
        ],
    languageStructures: blogData.languageStructures.length
      ? blogData.languageStructures
      : [
          "Introdução com problema",
          "Desenvolvimento educativo",
          "Exemplos práticos",
          "Conclusão com chamada para ação",
        ],
    visualStrategy:
      blogData.visualStrategy ||
      "A direção visual do blog deve priorizar leitura confortável, hierarquia clara, imagens consistentes, categorias organizadas, chamadas visíveis e boa experiência na página inicial e nos artigos.",
    visualReferences: blogData.visualReferences.length
      ? blogData.visualReferences
      : demoVisualReferences,
    priorityKeywords:
      blogData.priorityKeywords ||
      "Palavras-chave principais, termos de cauda longa, dúvidas frequentes, temas de intenção informacional e oportunidades de ranqueamento.",
    blogCategories:
      blogData.blogCategories ||
      "Estratégia, conteúdo, marketing, autoridade, vendas, SEO e crescimento.",
    seoGuidelines:
      blogData.seoGuidelines ||
      "Usar títulos claros, subtítulos objetivos, links internos, CTA contextual, meta descrição, palavra-chave principal, variações semânticas e estrutura pensada para intenção de busca.",
    contents: blogData.contents.length ? blogData.contents : demoContents,
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do blog, incluindo frequência, objetivos, linguagem, SEO, temas, calendário editorial e identidade visual."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para artigos de SEO,
            conteúdos de autoridade, atualizações e conteúdos pilar.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do blog
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            SEO e organização editorial
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Estratégia de SEO do blog
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A estratégia de SEO orienta quais temas serão priorizados, como os
            artigos serão estruturados e como o blog pode gerar tráfego
            qualificado.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Palavras-chave prioritárias"
            content={dataToShow.priorityKeywords}
          />

          <InfoBlock
            title="Categorias do blog"
            content={dataToShow.blogCategories}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Orientações de SEO"
              content={dataToShow.seoGuidelines}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Calendário editorial
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Conteúdos do blog
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os conteúdos organizam temas, datas sugeridas, objetivos editoriais,
            palavras-chave e chamadas principais para cada artigo.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {dataToShow.contents.map((content, index) => (
            <div
              key={`${content.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                    Conteúdo {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {content.title || "Tema do conteúdo"}
                  </h4>
                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  {content.suggestedDate || "Data sugerida"}
                </div>
              </div>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                {content.observation ||
                  "Objetivo do artigo, palavra-chave, abordagem e CTA sugerido."}
              </p>
            </div>
          ))}
        </div>
      </article>

      {blogData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {blogData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function PinterestPresentation({ section }: { section: Section }) {
  const [pinterestData, setPinterestData] =
    useState<PinterestPresentationData>({
      frequencyItems: [],
      objectives: [],
      languageStructures: [],
      contents: [],
      mainBoards: "",
      priorityVisualThemes: "",
      visualStrategy: "",
      visualReferences: [],
      pinKeywords: "",
      destinationLinks: "",
      descriptionGuidelines: "",
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): PinterestFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-pinterest");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setPinterestData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        contents: normalizeStringList(
          source.contents || source.conteudos || source.conteúdos
        ),
        mainBoards: getString(source, [
          "mainBoards",
          "pastasPrincipais",
          "boards",
          "pastas",
        ]),
        priorityVisualThemes: getString(source, [
          "priorityVisualThemes",
          "temasVisuaisPrioritarios",
          "temasVisuaisPrioritários",
          "temasVisuais",
        ]),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        pinKeywords: getString(source, [
          "pinKeywords",
          "palavrasChavePins",
          "palavrasChaveDosPins",
          "keywords",
        ]),
        destinationLinks: getString(source, [
          "destinationLinks",
          "linksDestino",
          "linksDeDestino",
          "links",
        ]),
        descriptionGuidelines: getString(source, [
          "descriptionGuidelines",
          "diretrizesDescricao",
          "diretrizesDeDescricao",
          "diretrizesDeDescrição",
          "descricoes",
          "descrições",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setPinterestData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        contents: [],
        mainBoards: "",
        priorityVisualThemes: "",
        visualStrategy: "",
        visualReferences: [],
        pinKeywords: "",
        destinationLinks: "",
        descriptionGuidelines: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: PinterestFrequencyItem[] = [
    {
      format: "Pins estáticos",
      quantity: "5",
      period: "por semana",
      observation: "Usar para descoberta, inspiração e tráfego recorrente.",
    },
    {
      format: "Pins verticais",
      quantity: "3",
      period: "por semana",
      observation: "Priorizar imagens verticais com títulos claros e boa leitura.",
    },
    {
      format: "Pins de portfólio",
      quantity: "2",
      period: "por semana",
      observation: "Organizar referências visuais, projetos, produtos ou resultados.",
    },
    {
      format: "Atualização de pastas",
      quantity: "1",
      period: "por mês",
      observation: "Revisar organização, temas e links de destino.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const dataToShow = {
    frequencyItems: pinterestData.frequencyItems.length
      ? pinterestData.frequencyItems
      : demoFrequencyItems,
    objectives: pinterestData.objectives.length
      ? pinterestData.objectives
      : [
          "Gerar descoberta visual",
          "Direcionar tráfego para o site",
          "Organizar portfólio",
          "Fortalecer autoridade visual",
          "Apoiar SEO visual",
        ],
    languageStructures: pinterestData.languageStructures.length
      ? pinterestData.languageStructures
      : [
          "Título objetivo",
          "Descrição com palavra-chave",
          "Chamada para salvar",
          "Chamada para acessar o site",
        ],
    contents: pinterestData.contents.length
      ? pinterestData.contents
      : [
          "Inspirações visuais",
          "Antes e depois",
          "Portfólio",
          "Guias",
          "Ideias por categoria",
          "Tendências",
          "Tutoriais",
        ],
    mainBoards:
      pinterestData.mainBoards ||
      "Inspirações, portfólio, projetos, tendências, guias, antes e depois, referências por tema e conteúdos educativos.",
    priorityVisualThemes:
      pinterestData.priorityVisualThemes ||
      "Estilo visual, categorias de conteúdo, temas de interesse, referências de estética, tipos de imagem e organização por intenção.",
    visualStrategy:
      pinterestData.visualStrategy ||
      "A direção visual do Pinterest deve priorizar pins verticais, composição clara, textos legíveis, estética consistente, referências organizadas e imagens que despertem salvamento e clique.",
    visualReferences: pinterestData.visualReferences.length
      ? pinterestData.visualReferences
      : demoVisualReferences,
    pinKeywords:
      pinterestData.pinKeywords ||
      "Termos importantes para títulos, descrições, organização dos pins, pastas, temas visuais e intenção de busca.",
    destinationLinks:
      pinterestData.destinationLinks ||
      "Site, blog, portfólio, páginas de produto, posts estratégicos, landing pages ou conteúdos de apoio.",
    descriptionGuidelines:
      pinterestData.descriptionGuidelines ||
      "Criar descrições com clareza, palavra-chave, contexto visual, benefício, destino do clique e chamada para salvar ou acessar.",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do Pinterest, incluindo frequência, descoberta visual, pastas, SEO visual, pins, referências e links de destino."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para pins estáticos, pins
            verticais, publicações de portfólio e atualização das pastas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />

          <ListCard title="Conteúdos" items={dataToShow.contents} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Organização visual
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Pastas e organização do perfil
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As pastas ajudam a organizar o perfil por temas, categorias,
            referências e intenções de busca visual.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Pastas principais" content={dataToShow.mainBoards} />

          <InfoBlock
            title="Temas visuais prioritários"
            content={dataToShow.priorityVisualThemes}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do Pinterest
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-[2/3] items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Pin {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            SEO visual e descoberta
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Estratégia de descoberta dos pins
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O Pinterest funciona como mecanismo de descoberta visual. Por isso,
            os pins precisam combinar estética, palavra-chave, clareza e destino
            estratégico.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Palavras-chave dos pins"
            content={dataToShow.pinKeywords}
          />

          <InfoBlock
            title="Links de destino"
            content={dataToShow.destinationLinks}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Diretrizes de descrição"
              content={dataToShow.descriptionGuidelines}
            />
          </div>
        </div>
      </article>

      {pinterestData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pinterestData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function PodcastPresentation({ section }: { section: Section }) {
  const [podcastData, setPodcastData] = useState<PodcastPresentationData>({
    frequencyItems: [],
    objectives: [],
    languageStructures: [],
    mainFormat: "",
    durationAndRhythm: "",
    seriesOrSegments: "",
    guestsAndParticipants: "",
    visualStrategy: "",
    visualReferences: [],
    contents: [],
    publishingPlatforms: "",
    repurposingStrategy: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): PodcastFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeContentItems(
    value: unknown
  ): PodcastContentPresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            suggestedDate: "",
            guestOrResponsible: "",
            format: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "tema", "name", "nome"]),
          suggestedDate: getString(record, [
            "suggestedDate",
            "dataSugerida",
            "date",
            "data",
          ]),
          guestOrResponsible: getString(record, [
            "guestOrResponsible",
            "convidadoOuResponsavel",
            "convidadoOuResponsável",
            "convidado",
            "responsavel",
            "responsável",
          ]),
          format: getString(record, ["format", "formato", "tipo"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "description",
            "descricao",
            "descrição",
          ]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.suggestedDate.trim() ||
          item.guestOrResponsible.trim() ||
          item.format.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-podcast");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setPodcastData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        mainFormat: getString(source, [
          "mainFormat",
          "formatoPrincipal",
          "formato",
        ]),
        durationAndRhythm: getString(source, [
          "durationAndRhythm",
          "duracaoERitmo",
          "duraçãoERitmo",
          "ritmo",
        ]),
        seriesOrSegments: getString(source, [
          "seriesOrSegments",
          "quadrosOuSeries",
          "quadrosOuSéries",
          "series",
          "séries",
          "quadros",
        ]),
        guestsAndParticipants: getString(source, [
          "guestsAndParticipants",
          "convidadosEParticipantes",
          "convidados",
          "participantes",
        ]),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        contents: normalizeContentItems(
          source.contents || source.conteudos || source.conteúdos
        ),
        publishingPlatforms: getString(source, [
          "publishingPlatforms",
          "plataformasDePublicacao",
          "plataformasDePublicação",
          "plataformas",
        ]),
        repurposingStrategy: getString(source, [
          "repurposingStrategy",
          "reaproveitamentoDeConteudo",
          "reaproveitamentoDeConteúdo",
          "reaproveitamento",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setPodcastData({
        frequencyItems: [],
        objectives: [],
        languageStructures: [],
        mainFormat: "",
        durationAndRhythm: "",
        seriesOrSegments: "",
        guestsAndParticipants: "",
        visualStrategy: "",
        visualReferences: [],
        contents: [],
        publishingPlatforms: "",
        repurposingStrategy: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: PodcastFrequencyItem[] = [
    {
      format: "Episódio principal",
      quantity: "1",
      period: "por semana",
      observation: "Conteúdo central para aprofundar temas e fortalecer autoridade.",
    },
    {
      format: "Corte para redes sociais",
      quantity: "3",
      period: "por semana",
      observation: "Reaproveitar trechos fortes em Instagram, TikTok, YouTube Shorts e LinkedIn.",
    },
    {
      format: "Temporada temática",
      quantity: "1",
      period: "por mês",
      observation: "Organizar episódios em blocos estratégicos por assunto.",
    },
    {
      format: "Entrevista com convidado",
      quantity: "2",
      period: "por mês",
      observation: "Trazer especialistas, clientes, parceiros ou referências do mercado.",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const demoContents: PodcastContentPresentationItem[] = [
    {
      title: "Como construir autoridade no digital",
      suggestedDate: "15/06/2026",
      guestOrResponsible: "Especialista ou episódio solo",
      format: "Episódio principal",
      observation:
        "Episódio educativo para abrir uma conversa estratégica sobre autoridade, posicionamento e confiança.",
    },
    {
      title: "Erros que impedem uma marca de ser lembrada",
      suggestedDate: "22/06/2026",
      guestOrResponsible: "Convidado estratégico",
      format: "Entrevista",
      observation:
        "Conversa com foco em percepção, diferenciação, conteúdo e presença digital.",
    },
    {
      title: "Como transformar um episódio em vários conteúdos",
      suggestedDate: "29/06/2026",
      guestOrResponsible: "Equipe interna",
      format: "Aula ou conversa guiada",
      observation:
        "Conteúdo para mostrar reaproveitamento, cortes, posts, carrosséis, newsletters e blog.",
    },
  ];

  const dataToShow = {
    frequencyItems: podcastData.frequencyItems.length
      ? podcastData.frequencyItems
      : demoFrequencyItems,
    objectives: podcastData.objectives.length
      ? podcastData.objectives
      : [
          "Fortalecer autoridade",
          "Aprofundar temas",
          "Criar relacionamento",
          "Gerar confiança",
          "Nutrir audiência",
        ],
    languageStructures: podcastData.languageStructures.length
      ? podcastData.languageStructures
      : [
          "Abertura com tema do episódio",
          "Introdução curta",
          "Conversa guiada",
          "Blocos temáticos",
          "Resumo final",
          "Chamada para ação",
        ],
    mainFormat:
      podcastData.mainFormat ||
      "Entrevistas, episódios solo, mesa redonda, comentários, estudos de caso, aulas ou conversas guiadas.",
    durationAndRhythm:
      podcastData.durationAndRhythm ||
      "Episódios de 20 a 40 minutos, com ritmo leve, educativo, conversacional e possibilidade de cortes para redes sociais.",
    seriesOrSegments:
      podcastData.seriesOrSegments ||
      "Perguntas da audiência, histórias de clientes, bastidores, entrevistas, tendências, erros comuns e análises estratégicas.",
    guestsAndParticipants:
      podcastData.guestsAndParticipants ||
      "Especialistas, parceiros, clientes, referências do mercado, membros da equipe ou pessoas com autoridade sobre o tema.",
    visualStrategy:
      podcastData.visualStrategy ||
      "A identidade visual do podcast deve manter consistência entre capa geral, capas de episódios, thumbnails, cortes, títulos, elementos gráficos e referências visuais.",
    visualReferences: podcastData.visualReferences.length
      ? podcastData.visualReferences
      : demoVisualReferences,
    contents: podcastData.contents.length ? podcastData.contents : demoContents,
    publishingPlatforms:
      podcastData.publishingPlatforms ||
      "Spotify, YouTube, Apple Podcasts, Deezer, site, blog e agregadores.",
    repurposingStrategy:
      podcastData.repurposingStrategy ||
      "Cortes para Instagram, TikTok, YouTube Shorts, carrosséis, newsletter, blog, LinkedIn e WhatsApp.",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do podcast, incluindo frequência, objetivos, linguagem, edição, formato, identidade visual, calendário de episódios e distribuição."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para episódios principais,
            cortes, temporadas, entrevistas e demais publicações derivadas do
            podcast.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem e edição"
            items={dataToShow.languageStructures}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Formato do podcast
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Estrutura editorial e sonora
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O formato define como o podcast será conduzido, qual ritmo terá,
            quais quadros podem existir e quem pode participar dos episódios.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Formato principal" content={dataToShow.mainFormat} />

          <InfoBlock
            title="Duração e ritmo"
            content={dataToShow.durationAndRhythm}
          />

          <InfoBlock
            title="Quadros ou séries"
            content={dataToShow.seriesOrSegments}
          />

          <InfoBlock
            title="Convidados ou participantes"
            content={dataToShow.guestsAndParticipants}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual do podcast
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Calendário editorial
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Conteúdos do podcast
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os conteúdos organizam temas, datas sugeridas, convidados, formatos
            e observações de produção para cada episódio.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {dataToShow.contents.map((content, index) => (
            <div
              key={`${content.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                    Episódio {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {content.title || "Tema do episódio"}
                  </h4>
                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  {content.suggestedDate || "Data sugerida"}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoBlock
                  title="Convidado ou responsável"
                  content={
                    content.guestOrResponsible ||
                    "Convidado, responsável ou episódio solo"
                  }
                />

                <InfoBlock
                  title="Formato"
                  content={content.format || "Formato do episódio"}
                />
              </div>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                {content.observation ||
                  "Objetivo do episódio, pontos principais, chamada final, links citados e observações de produção."}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Distribuição
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Distribuição e reaproveitamento
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O podcast pode ser distribuído em plataformas de áudio, vídeo, site,
            blog e também reaproveitado como cortes e conteúdos para outros
            canais.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Plataformas de publicação"
            content={dataToShow.publishingPlatforms}
          />

          <InfoBlock
            title="Reaproveitamento de conteúdo"
            content={dataToShow.repurposingStrategy}
          />
        </div>
      </article>

      {podcastData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {podcastData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function LivesPresentation({ section }: { section: Section }) {
  const [livesData, setLivesData] = useState<LivesPresentationData>({
    frequencyItems: [],
    networkFrequencies: [],
    objectives: [],
    languageStructures: [],
    openingScript: "",
    centralContent: "",
    publicInteraction: "",
    closingAndCall: "",
    visualStrategy: "",
    visualReferences: [],
    contents: [],
    beforeAndAfterPromotion: "",
    repurposingStrategy: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeStringList(value: unknown) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return (
            getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]) || ""
          );
        }

        return "";
      })
      .filter((item) => item.trim());
  }

  function normalizeFrequencyItems(value: unknown): LivesFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            format: "",
            quantity: "",
            period: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          format: getString(record, ["format", "formato", "name", "nome"]),
          quantity: getString(record, ["quantity", "quantidade", "amount"]),
          period: getString(record, ["period", "periodo", "período"]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "note",
            "nota",
          ]),
        };
      })
      .filter(
        (item) =>
          item.format.trim() ||
          item.quantity.trim() ||
          item.period.trim() ||
          item.observation.trim()
      );
  }

  function normalizeNetworkFrequencies(
    value: unknown
  ): LivesNetworkFrequencyItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            channel: "",
            frequency: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          channel: getString(record, ["channel", "canal", "rede", "name", "nome"]),
          frequency: getString(record, [
            "frequency",
            "frequencia",
            "frequência",
            "period",
            "periodo",
            "período",
          ]),
        };
      })
      .filter((item) => item.channel.trim() || item.frequency.trim());
  }

  function normalizeContentItems(value: unknown): LivesContentPresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            suggestedDate: "",
            channel: "",
            objective: "",
            observation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "tema", "name", "nome"]),
          suggestedDate: getString(record, [
            "suggestedDate",
            "dataSugerida",
            "date",
            "data",
          ]),
          channel: getString(record, ["channel", "canal", "rede"]),
          objective: getString(record, [
            "objective",
            "objetivo",
            "goal",
            "meta",
          ]),
          observation: getString(record, [
            "observation",
            "observacao",
            "observação",
            "description",
            "descricao",
            "descrição",
          ]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.suggestedDate.trim() ||
          item.channel.trim() ||
          item.objective.trim() ||
          item.observation.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeVisualReferences(
    value: unknown
  ): SocialChannelVisualReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            image: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            image: getString(record, ["image", "imagem", "photo", "foto", "url"]),
          };
        }

        return {
          image: "",
        };
      })
      .filter((item) => item.image.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem("metodo-epc-demo-lives");

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setLivesData({
        frequencyItems: normalizeFrequencyItems(
          source.frequencyItems ||
            source.frequencias ||
            source.frequências ||
            source.frequencyFormats
        ),
        networkFrequencies: normalizeNetworkFrequencies(
          source.networkFrequencies ||
            source.frequenciasPorRede ||
            source.frequênciasPorRede ||
            source.redes
        ),
        objectives: normalizeStringList(
          source.objectives || source.objetivos || source.goals
        ),
        languageStructures: normalizeStringList(
          source.languageStructures ||
            source.estruturasDeLinguagem ||
            source.estruturas ||
            source.linguagem
        ),
        openingScript: getString(source, [
          "openingScript",
          "abertura",
          "scriptAbertura",
        ]),
        centralContent: getString(source, [
          "centralContent",
          "conteudoCentral",
          "conteúdoCentral",
          "conteudo",
          "conteúdo",
        ]),
        publicInteraction: getString(source, [
          "publicInteraction",
          "interacaoComPublico",
          "interaçãoComPúblico",
          "interacao",
          "interação",
        ]),
        closingAndCall: getString(source, [
          "closingAndCall",
          "encerramentoEChamada",
          "chamadaFinal",
          "encerramento",
        ]),
        visualStrategy: getString(source, [
          "visualStrategy",
          "estrategiaVisual",
          "estratégiaVisual",
          "identidadeVisual",
        ]),
        visualReferences: normalizeVisualReferences(
          source.visualReferences ||
            source.referenciasVisuais ||
            source.referênciasVisuais ||
            source.images ||
            source.imagens
        ),
        contents: normalizeContentItems(
          source.contents || source.conteudos || source.conteúdos
        ),
        beforeAndAfterPromotion: getString(source, [
          "beforeAndAfterPromotion",
          "divulgacaoAntesDaLive",
          "divulgaçãoAntesDaLive",
          "divulgacao",
          "divulgação",
        ]),
        repurposingStrategy: getString(source, [
          "repurposingStrategy",
          "reaproveitamentoDepoisDaLive",
          "reaproveitamento",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setLivesData({
        frequencyItems: [],
        networkFrequencies: [],
        objectives: [],
        languageStructures: [],
        openingScript: "",
        centralContent: "",
        publicInteraction: "",
        closingAndCall: "",
        visualStrategy: "",
        visualReferences: [],
        contents: [],
        beforeAndAfterPromotion: "",
        repurposingStrategy: "",
        references: [],
      });
    }
  }, []);

  const demoFrequencyItems: LivesFrequencyItem[] = [
    {
      format: "Live principal",
      quantity: "1",
      period: "por semana",
      observation: "Conteúdo central para relacionamento, autoridade e presença.",
    },
    {
      format: "Live de lançamento",
      quantity: "1",
      period: "por lançamento",
      observation: "Usar para apresentar oferta, tirar dúvidas e direcionar para conversão.",
    },
    {
      format: "Live de relacionamento",
      quantity: "2",
      period: "por mês",
      observation: "Aproximar a audiência, responder dúvidas e manter presença.",
    },
    {
      format: "Aula ao vivo",
      quantity: "1",
      period: "por mês",
      observation: "Aprofundar um tema e aumentar percepção de autoridade.",
    },
  ];

  const demoNetworkFrequencies: LivesNetworkFrequencyItem[] = [
    {
      channel: "Instagram",
      frequency: "1 live por semana",
    },
    {
      channel: "YouTube",
      frequency: "1 live mensal",
    },
  ];

  const demoVisualReferences = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];

  const demoContents: LivesContentPresentationItem[] = [
    {
      title: "Como organizar uma estratégia de conteúdo",
      suggestedDate: "15/06/2026",
      channel: "Instagram",
      objective: "Educar audiência",
      observation:
        "Live educativa para organizar conceitos, gerar clareza e direcionar para o próximo conteúdo ou contato.",
    },
    {
      title: "Perguntas e respostas sobre a oferta",
      suggestedDate: "22/06/2026",
      channel: "YouTube",
      objective: "Tirar dúvidas e converter",
      observation:
        "Live de conversão para responder objeções, explicar detalhes e conduzir para uma decisão.",
    },
    {
      title: "Bastidores do método e próximos passos",
      suggestedDate: "29/06/2026",
      channel: "Instagram",
      objective: "Relacionamento e confiança",
      observation:
        "Live de aproximação para mostrar bastidores, explicar processo e fortalecer vínculo com a audiência.",
    },
  ];

  const dataToShow = {
    frequencyItems: livesData.frequencyItems.length
      ? livesData.frequencyItems
      : demoFrequencyItems,
    networkFrequencies: livesData.networkFrequencies.length
      ? livesData.networkFrequencies
      : demoNetworkFrequencies,
    objectives: livesData.objectives.length
      ? livesData.objectives
      : [
          "Gerar autoridade",
          "Vender uma oferta",
          "Tirar dúvidas",
          "Aquecer audiência",
          "Lançar produto",
          "Criar relacionamento",
        ],
    languageStructures: livesData.languageStructures.length
      ? livesData.languageStructures
      : [
          "Abertura com promessa",
          "Apresentação do tema",
          "Interação com público",
          "Conteúdo central",
          "Oferta ou chamada final",
        ],
    openingScript:
      livesData.openingScript ||
      "Iniciar a live com acolhimento, promessa clara, apresentação do tema e orientação para quem está chegando.",
    centralContent:
      livesData.centralContent ||
      "Estruturar o conteúdo principal em blocos simples, com exemplos, explicações e conexão direta com a necessidade da audiência.",
    publicInteraction:
      livesData.publicInteraction ||
      "Usar perguntas, comentários, enquetes, leitura de dúvidas e chamadas para participação durante a transmissão.",
    closingAndCall:
      livesData.closingAndCall ||
      "Encerrar recapitulando os pontos principais, reforçando a próxima ação e direcionando para link, WhatsApp, página ou próximo conteúdo.",
    visualStrategy:
      livesData.visualStrategy ||
      "A direção visual das lives deve manter consistência entre capas, thumbnails, cenários, chamadas, elementos gráficos, enquadramento e iluminação.",
    visualReferences: livesData.visualReferences.length
      ? livesData.visualReferences
      : demoVisualReferences,
    contents: livesData.contents.length ? livesData.contents : demoContents,
    beforeAndAfterPromotion:
      livesData.beforeAndAfterPromotion ||
      "Divulgar antes da live com stories, post no feed, lista de transmissão, e-mail, anúncio, contagem regressiva ou convite no WhatsApp.",
    repurposingStrategy:
      livesData.repurposingStrategy ||
      "Reaproveitar depois da live em cortes para Reels, TikTok, Shorts, carrossel, blog, e-mail, WhatsApp ou materiais educacionais.",
  };

  function ListCard({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica das lives, incluindo frequência, redes, objetivos, roteiro, condução, identidade visual, calendário e reaproveitamento."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Frequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por formato
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A frequência organiza o ritmo recomendado para lives principais,
            lives de lançamento, aulas ao vivo e momentos de relacionamento com
            a audiência.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.frequencyItems.map((item, index) => (
            <div
              key={`${item.format}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Formato
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h4 className="text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.format || "Formato"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.quantity || "Quantidade"} {item.period || ""}
              </p>

              {item.observation && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.observation}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Redes de transmissão
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Frequência por rede
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada rede pode cumprir uma função diferente na estratégia. Por isso,
            a frequência pode ser definida por canal.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {dataToShow.networkFrequencies.map((item, index) => (
            <div
              key={`${item.channel}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                Canal
              </p>

              <h4 className="mt-3 text-2xl font-light tracking-[-0.035em] text-slate-950">
                {item.channel || "Canal"}
              </h4>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.frequency || "Frequência não informada"}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <ListCard title="Objetivos" items={dataToShow.objectives} />

          <ListCard
            title="Estruturas de linguagem"
            items={dataToShow.languageStructures}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Roteiro e condução
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Estrutura da live
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O roteiro ajuda a conduzir a transmissão com clareza, mantendo
            atenção, interação e direcionamento para a próxima ação.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Abertura" content={dataToShow.openingScript} />

          <InfoBlock
            title="Conteúdo central"
            content={dataToShow.centralContent}
          />

          <InfoBlock
            title="Interação com o público"
            content={dataToShow.publicInteraction}
          />

          <InfoBlock
            title="Encerramento e chamada final"
            content={dataToShow.closingAndCall}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Identidade visual
          </p>

          <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-slate-950">
            Direção visual das lives
          </h3>

          <p className="mt-5 max-w-[980px] whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualStrategy}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {dataToShow.visualReferences.map((reference, index) => (
              <div
                key={`${reference.image}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm font-medium text-slate-400">
                  {reference.image ? (
                    <img
                      src={reference.image}
                      alt={`Referência visual ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Referência visual"
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Imagem {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Calendário de lives
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Conteúdos das lives
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os conteúdos organizam temas, datas sugeridas, canais, objetivos e
            observações de produção para cada live.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {dataToShow.contents.map((content, index) => (
            <div
              key={`${content.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                    Live {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {content.title || "Tema da live"}
                  </h4>
                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  {content.suggestedDate || "Data sugerida"}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoBlock title="Canal" content={content.channel || "Canal"} />

                <InfoBlock
                  title="Objetivo da live"
                  content={content.objective || "Objetivo da live"}
                />
              </div>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                {content.observation ||
                  "Pauta, roteiro resumido, chamada final, oferta relacionada, links e observações de produção."}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Distribuição
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Divulgação e reaproveitamento
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A live pode ser divulgada antes da transmissão e reaproveitada
            depois em cortes, posts, carrosséis, blog, e-mail, WhatsApp ou
            materiais educativos.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Divulgação antes da live"
            content={dataToShow.beforeAndAfterPromotion}
          />

          <InfoBlock
            title="Reaproveitamento depois da live"
            content={dataToShow.repurposingStrategy}
          />
        </div>
      </article>

      {livesData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {livesData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function EducationalMaterialsPresentation({ section }: { section: Section }) {
  const [materialsData, setMaterialsData] =
    useState<EducationalMaterialsPresentationData>({
      materials: [],
      strategy: "",
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeMaterials(
    value: unknown
  ): EducationalMaterialPresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            type: "",
            content: "",
            objective: "",
            distribution: "",
            fileName: "",
            fileData: "",
            materialLink: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          type: getString(record, ["type", "tipo", "category", "categoria"]),
          content: getString(record, [
            "content",
            "conteudo",
            "conteúdo",
            "description",
            "descricao",
            "descrição",
          ]),
          objective: getString(record, [
            "objective",
            "objetivo",
            "goal",
            "meta",
          ]),
          distribution: getString(record, [
            "distribution",
            "distribuicao",
            "distribuição",
            "comoSeraDistribuido",
            "comoSeráDistribuido",
            "comoSeráDistribuído",
          ]),
          fileName: getString(record, [
            "fileName",
            "nomeArquivo",
            "arquivo",
          ]),
          fileData: getString(record, ["fileData", "arquivoData", "file"]),
          materialLink: getString(record, [
            "materialLink",
            "linkMaterial",
            "linkDoMaterial",
            "link",
            "url",
          ]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.type.trim() ||
          item.content.trim() ||
          item.objective.trim() ||
          item.distribution.trim() ||
          item.fileName.trim() ||
          item.fileData.trim() ||
          item.materialLink.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-materiais-educacionais"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setMaterialsData({
        materials: normalizeMaterials(
          source.materials ||
            source.materiais ||
            source.educationalMaterials ||
            source.materiaisEducacionais
        ),
        strategy: getString(source, [
          "strategy",
          "estrategia",
          "estratégia",
          "materialsStrategy",
          "estrategiaDosMateriais",
          "estratégiaDosMateriais",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setMaterialsData({
        materials: [],
        strategy: "",
        references: [],
      });
    }
  }, []);

  const demoMaterials: EducationalMaterialPresentationItem[] = [
    {
      title: "Guia prático de implementação",
      type: "E-book",
      content:
        "Material educativo para orientar o público com passos claros, exemplos práticos e direcionamento estratégico.",
      objective:
        "Educar o público, gerar percepção de autoridade e preparar a pessoa para avançar na jornada.",
      distribution:
        "Landing page, Instagram, WhatsApp, e-mail, blog e campanhas de captação.",
      fileName: "",
      fileData: "",
      materialLink: "https://...",
    },
    {
      title: "Checklist de diagnóstico",
      type: "Checklist",
      content:
        "Material simples para ajudar o público a identificar lacunas, prioridades e pontos de melhoria.",
      objective:
        "Captar leads qualificados, gerar consciência do problema e abrir espaço para uma próxima conversa.",
      distribution:
        "Stories, link da bio, anúncios, WhatsApp, página de captura e sequência de nutrição.",
      fileName: "",
      fileData: "",
      materialLink: "https://...",
    },
    {
      title: "Planilha de organização estratégica",
      type: "Planilha",
      content:
        "Recurso prático para organizar informações, acompanhar decisões e transformar estratégia em execução.",
      objective:
        "Entregar valor tangível, aumentar confiança e aproximar o público da metodologia do projeto.",
      distribution:
        "E-mail, área de membros, WhatsApp, aula gratuita, webinário ou campanha de relacionamento.",
      fileName: "",
      fileData: "",
      materialLink: "https://...",
    },
  ];

  const dataToShow = {
    materials: materialsData.materials.length
      ? materialsData.materials
      : demoMaterials,
    strategy:
      materialsData.strategy ||
      "Os materiais educacionais devem funcionar como ativos estratégicos para educar o público, captar leads, nutrir oportunidades, reforçar autoridade e apoiar campanhas, canais e ofertas do projeto.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta os materiais educacionais que podem apoiar captação, nutrição, autoridade, relacionamento e conversão dentro da estratégia."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Ativos educativos
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Materiais estratégicos
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os materiais educacionais funcionam como recursos de apoio para
            educar o público, gerar valor, captar leads, nutrir oportunidades e
            conduzir a audiência para a próxima etapa da jornada.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {dataToShow.materials.map((material, index) => (
            <div
              key={`${material.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                    Material {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {material.title || "Título do material"}
                  </h4>
                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  {material.type || "Tipo do material"}
                </div>
              </div>

              <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600">
                {material.content ||
                  "Conteúdo do material, temas abordados, promessa, estrutura e uso dentro da estratégia."}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoBlock
                  title="Objetivo do material"
                  content={
                    material.objective ||
                    "Objetivo estratégico do material dentro da jornada."
                  }
                />

                <InfoBlock
                  title="Como será distribuído"
                  content={
                    material.distribution ||
                    "Canais, campanhas e pontos de contato onde o material será distribuído."
                  }
                />
              </div>

              {(material.materialLink || material.fileName) && (
                <div className="mt-6 rounded-[1.25rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Arquivo ou link do material
                  </p>

                  {material.fileName && (
                    <p className="mt-3 text-base leading-8 text-slate-600">
                      {material.fileName}
                    </p>
                  )}

                  {material.materialLink && (
                    <a
                      href={material.materialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block break-words text-base leading-8 text-slate-600 underline underline-offset-4 hover:text-slate-950"
                    >
                      {material.materialLink}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estratégia
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Papel dos materiais na jornada
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esta orientação mostra como os materiais se conectam às etapas da
            jornada, às campanhas, aos canais e às ofertas do projeto.
          </p>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.strategy}
          </p>
        </div>
      </article>

      {materialsData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {materialsData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function SiteStrategyPresentation({ section }: { section: Section }) {
  const [siteData, setSiteData] = useState<SiteStrategyPresentationData>({
    visualIdentity: "",
    references: [],
    integrations: [],
    essentialPages: [],
    importantFeatures: [],
    strategicNotes: "",
    externalReferences: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeReferences(value: unknown): SiteStrategyReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            url: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          url: getString(record, ["url", "link"]),
        };
      })
      .filter((item) => item.title.trim() || item.url.trim());
  }

  function normalizeIntegrations(value: unknown): SiteStrategyIntegration[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            name: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            name: getString(record, ["name", "nome", "title", "titulo", "value"]),
          };
        }

        return {
          name: "",
        };
      })
      .filter((item) => item.name.trim());
  }

  function normalizeSimpleItems(value: unknown): SiteStrategySimpleItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            value: item,
          };
        }

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          return {
            value: getString(record, [
              "value",
              "title",
              "titulo",
              "name",
              "nome",
              "text",
              "texto",
              "description",
              "descricao",
              "descrição",
            ]),
          };
        }

        return {
          value: "",
        };
      })
      .filter((item) => item.value.trim());
  }

  function normalizeExternalReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-estrategia-do-site"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setSiteData({
        visualIdentity: getString(source, [
          "visualIdentity",
          "identidadeVisual",
          "visual",
        ]),
        references: normalizeReferences(
          source.references || source.referencias || source.referências
        ),
        integrations: normalizeIntegrations(
          source.integrations ||
            source.integracoes ||
            source.integrações ||
            source.plugins
        ),
        essentialPages: normalizeSimpleItems(
          source.essentialPages ||
            source.paginasEssenciais ||
            source.páginasEssenciais ||
            source.pages ||
            source.paginas ||
            source.páginas
        ),
        importantFeatures: normalizeSimpleItems(
          source.importantFeatures ||
            source.funcionalidadesImportantes ||
            source.features ||
            source.funcionalidades
        ),
        strategicNotes: getString(source, [
          "strategicNotes",
          "observacoesEstrategicas",
          "observaçõesEstratégicas",
          "notes",
          "observacoes",
          "observações",
        ]),
        externalReferences: normalizeExternalReferences(
          source.externalReferences ||
            source.referenciasExternas ||
            source.referênciasExternas
        ),
      });
    } catch {
      setSiteData({
        visualIdentity: "",
        references: [],
        integrations: [],
        essentialPages: [],
        importantFeatures: [],
        strategicNotes: "",
        externalReferences: [],
      });
    }
  }, []);

  const demoReferences: SiteStrategyReference[] = [
    {
      title: "Site institucional de referência",
      url: "https://...",
    },
    {
      title: "Landing page de conversão",
      url: "https://...",
    },
    {
      title: "Página com boa experiência visual",
      url: "https://...",
    },
  ];

  const demoIntegrations: SiteStrategyIntegration[] = [
    {
      name: "Formulário de contato",
    },
    {
      name: "WhatsApp",
    },
    {
      name: "Pixel",
    },
    {
      name: "Google Analytics",
    },
    {
      name: "CRM",
    },
  ];

  const demoEssentialPages: SiteStrategySimpleItem[] = [
    {
      value: "Home",
    },
    {
      value: "Sobre",
    },
    {
      value: "Serviços",
    },
    {
      value: "Blog",
    },
    {
      value: "Contato",
    },
    {
      value: "Página de captura",
    },
    {
      value: "Página de vendas",
    },
  ];

  const demoImportantFeatures: SiteStrategySimpleItem[] = [
    {
      value: "Botão fixo de WhatsApp",
    },
    {
      value: "Formulário de captação",
    },
    {
      value: "Prova social",
    },
    {
      value: "FAQ",
    },
    {
      value: "Depoimentos",
    },
    {
      value: "Captura de leads",
    },
  ];

  const dataToShow = {
    visualIdentity:
      siteData.visualIdentity ||
      "O site deve refletir a identidade visual do projeto, respeitando cores, tipografia, estilo de imagens, elementos gráficos, hierarquia visual e a sensação desejada para a marca.",
    references: siteData.references.length ? siteData.references : demoReferences,
    integrations: siteData.integrations.length
      ? siteData.integrations
      : demoIntegrations,
    essentialPages: siteData.essentialPages.length
      ? siteData.essentialPages
      : demoEssentialPages,
    importantFeatures: siteData.importantFeatures.length
      ? siteData.importantFeatures
      : demoImportantFeatures,
    strategicNotes:
      siteData.strategicNotes ||
      "O site deve funcionar como base estratégica do projeto, organizando posicionamento, conteúdo, experiência do usuário, conversão, SEO, prova social e caminhos claros para contato ou compra.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  function ItemList({
    title,
    items,
  }: {
    title: string;
    items: SiteStrategySimpleItem[];
  }) {
    return (
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {title}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item.value}-${index}`}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item.value}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a direção estratégica do site, incluindo identidade visual, referências, integrações, páginas essenciais, funcionalidades e orientações gerais."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Direção visual
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Identidade visual do site
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O site precisa traduzir visualmente a marca, mantendo coerência com
            a identidade do projeto, com boa experiência de navegação e clareza
            na comunicação.
          </p>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.visualIdentity}
          </p>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Referências
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Sites e páginas de referência
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As referências ajudam a orientar aparência, estrutura, navegação,
            experiência e decisões visuais para o desenvolvimento ou
            remodelação do site.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {dataToShow.references.map((reference, index) => (
            <a
              key={`${reference.title}-${index}`}
              href={reference.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-950">
                {reference.title || "Referência"}
              </p>

              <p className="mt-2 break-words text-sm text-slate-500">
                {reference.url || "URL não informada"}
              </p>
            </a>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estrutura do site
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Páginas e funcionalidades essenciais
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esta estrutura mostra quais páginas, recursos e blocos são
            indispensáveis para que o site cumpra sua função estratégica,
            comercial e institucional.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <ItemList title="Páginas essenciais" items={dataToShow.essentialPages} />

          <ItemList
            title="Funcionalidades importantes"
            items={dataToShow.importantFeatures}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Integrações
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Ferramentas, integrações e plugins
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As integrações conectam o site aos processos de atendimento,
            captação, automação, análise, vendas e acompanhamento da estratégia.
          </p>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {dataToShow.integrations.map((integration, index) => (
              <span
                key={`${integration.name}-${index}`}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {integration.name}
              </span>
            ))}
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estratégia
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Observações estratégicas do site
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esta orientação consolida prioridades sobre estrutura, conversão,
            conteúdo, SEO, experiência do usuário e papel comercial do site.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock
            title="Direcionamento estratégico"
            content={dataToShow.strategicNotes}
          />
        </div>
      </article>

      {siteData.externalReferences.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {siteData.externalReferences.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function SiteMapPresentation({ section }: { section: Section }) {
  const [siteMapData, setSiteMapData] = useState<SiteMapPresentationData>({
    pages: [],
    strategicNotes: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizePages(value: unknown): SiteMapPagePresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            type: "",
            objective: "",
            description: "",
            requiredSections: "",
            mainCta: "",
            priority: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          type: getString(record, ["type", "tipo", "category", "categoria"]),
          objective: getString(record, [
            "objective",
            "objetivo",
            "goal",
            "meta",
          ]),
          description: getString(record, [
            "description",
            "descricao",
            "descrição",
            "content",
            "conteudo",
            "conteúdo",
          ]),
          requiredSections: getString(record, [
            "requiredSections",
            "secoesObrigatorias",
            "seçõesObrigatórias",
            "sections",
            "secoes",
            "seções",
          ]),
          mainCta: getString(record, [
            "mainCta",
            "ctaPrincipal",
            "cta",
            "callToAction",
          ]),
          priority: getString(record, [
            "priority",
            "prioridade",
            "importance",
            "importancia",
            "importância",
          ]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.type.trim() ||
          item.objective.trim() ||
          item.description.trim() ||
          item.requiredSections.trim() ||
          item.mainCta.trim() ||
          item.priority.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-mapa-do-site"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setSiteMapData({
        pages: normalizePages(
          source.pages ||
            source.paginas ||
            source.páginas ||
            source.sitePages ||
            source.mapa
        ),
        strategicNotes: getString(source, [
          "strategicNotes",
          "observacoesEstrategicas",
          "observaçõesEstratégicas",
          "notes",
          "observacoes",
          "observações",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setSiteMapData({
        pages: [],
        strategicNotes: "",
        references: [],
      });
    }
  }, []);

  const demoPages: SiteMapPagePresentationItem[] = [
    {
      title: "Início",
      type: "Institucional",
      objective: "Apresentar a marca, gerar clareza imediata e conduzir o visitante para a principal ação do site.",
      description:
        "Página principal do site, responsável por comunicar posicionamento, proposta de valor, principais soluções, diferenciais e caminhos de navegação.",
      requiredSections:
        "Hero, promessa principal, benefícios, serviços, prova social, chamada para contato, links para páginas estratégicas e CTA final.",
      mainCta: "Entrar em contato ou falar no WhatsApp.",
      priority: "Alta",
    },
    {
      title: "Sobre",
      type: "Institucional",
      objective: "Construir confiança, apresentar história, autoridade, método e diferenciais do projeto.",
      description:
        "Página para explicar quem está por trás da marca, sua trajetória, visão, valores, especialidade e autoridade no mercado.",
      requiredSections:
        "História, posicionamento, diferenciais, método, fotos, credenciais, depoimentos e chamada para conhecer os serviços.",
      mainCta: "Conhecer serviços ou entrar em contato.",
      priority: "Alta",
    },
    {
      title: "Serviços",
      type: "Comercial",
      objective: "Apresentar as ofertas, explicar benefícios, orientar a decisão e gerar contato qualificado.",
      description:
        "Página comercial para detalhar soluções, formatos de atendimento, benefícios, processo e resultados esperados.",
      requiredSections:
        "Lista de serviços, explicação de cada oferta, benefícios, processo, dúvidas frequentes, prova social e CTA.",
      mainCta: "Solicitar orçamento ou agendar diagnóstico.",
      priority: "Alta",
    },
    {
      title: "Blog",
      type: "Conteúdo",
      objective: "Educar o público, fortalecer SEO, construir autoridade e atrair tráfego orgânico.",
      description:
        "Área de conteúdos estratégicos, artigos educativos, guias e materiais que apoiam a descoberta, nutrição e conversão.",
      requiredSections:
        "Categorias, artigos recentes, busca, conteúdos em destaque, links internos e chamadas para materiais ou contato.",
      mainCta: "Ler conteúdos, baixar material ou entrar em contato.",
      priority: "Média",
    },
    {
      title: "Contato",
      type: "Conversão",
      objective: "Facilitar o contato do visitante com a empresa e reduzir atrito para conversão.",
      description:
        "Página com canais de contato, formulário, WhatsApp, localização, redes sociais e orientações para iniciar atendimento.",
      requiredSections:
        "Formulário, botão de WhatsApp, e-mail, redes sociais, localização, horários e mensagem de orientação.",
      mainCta: "Enviar mensagem ou chamar no WhatsApp.",
      priority: "Alta",
    },
  ];

  const dataToShow = {
    pages: siteMapData.pages.length ? siteMapData.pages : demoPages,
    strategicNotes:
      siteMapData.strategicNotes ||
      "A estrutura do site deve facilitar a navegação, apresentar a proposta de valor com clareza, conduzir o visitante por uma jornada lógica e priorizar páginas com maior impacto comercial, institucional e estratégico.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a estrutura recomendada para o site, incluindo páginas, objetivos, seções obrigatórias, chamadas principais, prioridades e observações de navegação."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estrutura
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Páginas do site
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O mapa do site organiza as páginas necessárias, define a função de
            cada uma e orienta quais seções, mensagens e chamadas devem
            conduzir a navegação do visitante.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {dataToShow.pages.map((page, index) => (
            <div
              key={`${page.title}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                    Página {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {page.title || "Título da página"}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                    {page.type || "Tipo"}
                  </span>

                  <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">
                    {page.priority || "Prioridade"}
                  </span>
                </div>
              </div>

              <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600">
                {page.description ||
                  "Descrição da página, função estratégica, mensagem principal e ação esperada do visitante."}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoBlock
                  title="Objetivo da página"
                  content={
                    page.objective ||
                    "Objetivo estratégico da página dentro da jornada."
                  }
                />

                <InfoBlock
                  title="CTA principal"
                  content={page.mainCta || "Chamada principal da página."}
                />

                <div className="md:col-span-2">
                  <InfoBlock
                    title="Seções obrigatórias"
                    content={
                      page.requiredSections ||
                      "Seções, blocos e elementos que precisam aparecer na página."
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Navegação e prioridade
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Observações sobre a estrutura do site
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esta orientação consolida decisões sobre menu, hierarquia,
            experiência do usuário, páginas obrigatórias, páginas futuras e
            prioridades de desenvolvimento.
          </p>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.strategicNotes}
          </p>
        </div>
      </article>

      {siteMapData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {siteMapData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function LeadCaptureCampaignPresentation({ section }: { section: Section }) {
  const [campaignData, setCampaignData] =
    useState<LeadCaptureCampaignPresentationData>({
      campaignType: "",
      campaignPhase: "",
      trafficObjective: "",
      audienceTemperature: "",
      recommendedChannels: "",
      budget: "",
      materials: [],
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
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeMaterials(value: unknown): LeadCaptureCampaignMaterial[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            type: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          type: getString(record, ["type", "tipo", "format", "formato"]),
        };
      })
      .filter((item) => item.title.trim() || item.type.trim());
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-campanha-captacao-de-lead"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setCampaignData({
        campaignType: getString(source, [
          "campaignType",
          "tipoCampanha",
          "tipoDaCampanha",
        ]),
        campaignPhase: getString(source, [
          "campaignPhase",
          "faseCampanha",
          "faseDaCampanha",
        ]),
        trafficObjective: getString(source, [
          "trafficObjective",
          "objetivoDeMidia",
          "objetivoDeMídia",
          "objetivoTrafego",
          "objetivoTráfego",
        ]),
        audienceTemperature: getString(source, [
          "audienceTemperature",
          "temperaturaDoPublico",
          "temperaturaDoPúblico",
        ]),
        recommendedChannels: getString(source, [
          "recommendedChannels",
          "canaisRecomendados",
          "recommendation",
          "recomendacao",
          "recomendação",
        ]),
        budget: getString(source, ["budget", "orcamento", "orçamento", "verba"]),
        materials: normalizeMaterials(
          source.materials || source.materiais || source.possiveisMateriais
        ),
        objective: getString(source, ["objective", "objetivo"]),
        audience: getString(source, ["audience", "publico", "público"]),
        positioning: getString(source, [
          "positioning",
          "posicionamento",
        ]),
        creativeDirection: getString(source, [
          "creativeDirection",
          "direcaoDosCriativos",
          "direçãoDosCriativos",
          "criativos",
        ]),
        strategicScenario: getString(source, [
          "strategicScenario",
          "cenarioEstrategico",
          "cenárioEstratégico",
        ]),
        offerPromise: getString(source, [
          "offerPromise",
          "promessaDaOferta",
          "promessa",
        ]),
        perceivedBenefit: getString(source, [
          "perceivedBenefit",
          "beneficioPercebido",
          "benefícioPercebido",
        ]),
        mainCall: getString(source, [
          "mainCall",
          "chamadaPrincipal",
          "call",
          "chamada",
        ]),
        offerName: getString(source, [
          "offerName",
          "nomeDaOferta",
          "nomeOferta",
        ]),
        pageHeadline: getString(source, [
          "pageHeadline",
          "headlineDaPagina",
          "headlineDaPágina",
          "headline",
        ]),
        pageArgument: getString(source, [
          "pageArgument",
          "argumentoDaPagina",
          "argumentoDaPágina",
          "argumento",
        ]),
        formFields: getString(source, [
          "formFields",
          "camposDoFormulario",
          "camposDoFormulário",
          "formulario",
          "formulário",
        ]),
        pageCta: getString(source, [
          "pageCta",
          "ctaDaPagina",
          "ctaDaPágina",
          "cta",
        ]),
        nextStepAfterSignup: getString(source, [
          "nextStepAfterSignup",
          "proximaAcaoAposCadastro",
          "próximaAçãoApósCadastro",
          "posCadastro",
          "pósCadastro",
        ]),
        qualificationCriteria: getString(source, [
          "qualificationCriteria",
          "criteriosDeQualificacao",
          "critériosDeQualificação",
          "qualificacao",
          "qualificação",
        ]),
        initialNurturingSequence: getString(source, [
          "initialNurturingSequence",
          "sequenciaDeNutricaoInicial",
          "sequênciaDeNutriçãoInicial",
          "nutricao",
          "nutrição",
        ]),
        metrics: getString(source, [
          "metrics",
          "metricas",
          "métricas",
          "indicadores",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setCampaignData({
        campaignType: "",
        campaignPhase: "",
        trafficObjective: "",
        audienceTemperature: "",
        recommendedChannels: "",
        budget: "",
        materials: [],
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
        references: [],
      });
    }
  }, []);

  const demoMaterials: LeadCaptureCampaignMaterial[] = [
    {
      title: "Checklist da Estratégia",
      type: "PDF",
    },
    {
      title: "Aula gratuita de diagnóstico",
      type: "Vídeo",
    },
    {
      title: "Mapa de Conteúdo",
      type: "Planilha",
    },
  ];

  const dataToShow = {
    campaignType: campaignData.campaignType || "Captação direta",
    campaignPhase: campaignData.campaignPhase || "Teste inicial",
    trafficObjective: campaignData.trafficObjective || "Leads",
    audienceTemperature: campaignData.audienceTemperature || "Frio",
    recommendedChannels:
      campaignData.recommendedChannels ||
      "Meta Ads para captação inicial, Google para intenção ativa, YouTube para aquecimento e LinkedIn apenas quando houver contexto B2B.",
    budget:
      campaignData.budget ||
      "Verba inicial de teste, com acompanhamento de custo por lead, taxa de conversão e qualidade dos contatos gerados.",
    materials: campaignData.materials.length
      ? campaignData.materials
      : demoMaterials,
    objective:
      campaignData.objective ||
      "Captar leads qualificados, gerar lista para lançamento, aumentar base de contatos ou atrair interessados para uma oferta específica.",
    audience:
      campaignData.audience ||
      "Públicos frios segmentados por interesse, públicos mornos de engajamento, visitantes do site, listas próprias e bases de remarketing.",
    positioning:
      campaignData.positioning ||
      "A campanha deve apresentar a oferta como uma solução simples, clara e de valor imediato para o público certo.",
    creativeDirection:
      campaignData.creativeDirection ||
      "Criativos com dor, promessa, prova, demonstração, bastidor, antes e depois, depoimento, comparação ou chamada direta para baixar o material.",
    strategicScenario:
      campaignData.strategicScenario ||
      "Testar diferentes públicos, ângulos criativos, promessas e formatos para identificar quais combinações geram leads qualificados com melhor custo e maior intenção.",
    offerPromise:
      campaignData.offerPromise ||
      "Aprenda como organizar sua estratégia com mais clareza, menos tentativa e mais direção.",
    perceivedBenefit:
      campaignData.perceivedBenefit ||
      "Clareza, diagnóstico, economia de tempo, plano de ação, organização e segurança para decidir.",
    mainCall:
      campaignData.mainCall ||
      "Baixe o material gratuito, faça seu diagnóstico, entre na lista ou receba o conteúdo.",
    offerName:
      campaignData.offerName ||
      "Checklist da Estratégia, Mapa do Conteúdo, Aula gratuita ou Diagnóstico Express.",
    pageHeadline:
      campaignData.pageHeadline ||
      "Uma chamada clara, específica e orientada ao benefício principal da oferta.",
    pageArgument:
      campaignData.pageArgument ||
      "Argumentos que expliquem o valor do material, a dor que ele resolve, os ganhos esperados e o motivo para se cadastrar agora.",
    formFields:
      campaignData.formFields ||
      "Nome, e-mail, WhatsApp, empresa, cargo, faturamento ou principal desafio.",
    pageCta:
      campaignData.pageCta ||
      "Quero receber o material, fazer diagnóstico, acessar aula ou entrar na lista.",
    nextStepAfterSignup:
      campaignData.nextStepAfterSignup ||
      "Página de obrigado, entrega por e-mail, redirecionamento para WhatsApp, convite para reunião ou entrada em fluxo de nutrição.",
    qualificationCriteria:
      campaignData.qualificationCriteria ||
      "Cargo, interesse, dor declarada, orçamento, urgência, perfil de cliente ideal ou resposta no formulário.",
    initialNurturingSequence:
      campaignData.initialNurturingSequence ||
      "Entrega do material, conteúdo complementar, prova social, convite para próxima ação e chamada para conversa.",
    metrics:
      campaignData.metrics ||
      "Custo por lead, taxa de conversão da página, CTR, CPM, CPC, taxa de abertura, taxa de resposta, leads qualificados e vendas geradas.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a estratégia da campanha de captação de lead, incluindo canais, públicos, oferta, criativos, página de captura, qualificação, nutrição e métricas."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Configuração da campanha
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Direção de mídia e captação
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A configuração inicial orienta o tipo de campanha, a fase do projeto,
            o objetivo de mídia, a temperatura do público, os canais
            recomendados e a verba sugerida.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Tipo
            </p>
            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.campaignType}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Fase
            </p>
            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.campaignPhase}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Objetivo
            </p>
            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.trafficObjective}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Público
            </p>
            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.audienceTemperature}
            </h4>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Canais recomendados"
            content={dataToShow.recommendedChannels}
          />

          <InfoBlock
            title="Orçamento recomendado"
            content={dataToShow.budget}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Materiais de captação
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Iscas e ativos possíveis
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os materiais de captação funcionam como porta de entrada para gerar
            leads, educar o público e iniciar uma sequência de relacionamento.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {dataToShow.materials.map((material, index) => (
            <div
              key={`${material.title}-${index}`}
              className="rounded-full bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700"
            >
              {material.title || "Material"}{" "}
              {material.type ? `(${material.type})` : ""}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estratégia
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Público, posicionamento e criativos
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esta parte define quem a campanha precisa alcançar, como a oferta
            será percebida, quais criativos serão testados e quais hipóteses
            estratégicas serão avaliadas.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Objetivo da campanha" content={dataToShow.objective} />

          <InfoBlock title="Público" content={dataToShow.audience} />

          <InfoBlock title="Posicionamento" content={dataToShow.positioning} />

          <InfoBlock
            title="Direção dos criativos"
            content={dataToShow.creativeDirection}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Cenário estratégico"
              content={dataToShow.strategicScenario}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Oferta
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Oferta principal da campanha
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A oferta precisa deixar claro o que a pessoa recebe, qual benefício
            percebe, por que vale se cadastrar e qual ação deve realizar.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Promessa da oferta"
            content={dataToShow.offerPromise}
          />

          <InfoBlock
            title="Benefício percebido"
            content={dataToShow.perceivedBenefit}
          />

          <InfoBlock title="Chamada principal" content={dataToShow.mainCall} />

          <InfoBlock title="Nome da oferta" content={dataToShow.offerName} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Página de captura
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Estrutura da landing page
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A página de captura precisa explicar a oferta, reduzir atrito,
            reforçar o benefício e conduzir o visitante para o cadastro.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Headline da página"
            content={dataToShow.pageHeadline}
          />

          <InfoBlock
            title="Argumento da página"
            content={dataToShow.pageArgument}
          />

          <InfoBlock
            title="Campos do formulário"
            content={dataToShow.formFields}
          />

          <InfoBlock title="CTA da página" content={dataToShow.pageCta} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Pós-cadastro
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Qualificação e nutrição do lead
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Depois da conversão, a estratégia precisa entregar o material,
            qualificar o contato e iniciar o relacionamento até a próxima ação.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Próxima ação após cadastro"
            content={dataToShow.nextStepAfterSignup}
          />

          <InfoBlock
            title="Critérios de qualificação"
            content={dataToShow.qualificationCriteria}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Sequência de nutrição inicial"
              content={dataToShow.initialNurturingSequence}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Métricas
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Indicadores de acompanhamento
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As métricas ajudam a avaliar custo, qualidade do lead, performance
            da página, engajamento dos criativos e impacto comercial da
            campanha.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock title="Métricas da campanha" content={dataToShow.metrics} />
        </div>
      </article>

      {campaignData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {campaignData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function SalesConversionCampaignPresentation({ section }: { section: Section }) {
  const [campaignData, setCampaignData] =
    useState<SalesConversionCampaignPresentationData>({
      campaignType: "",
      campaignPhase: "",
      salesObjective: "",
      audienceTemperature: "",
      recommendedChannels: "",
      budget: "",
      objective: "",
      offerProduct: "",
      offerPrice: "",
      offerPromise: "",
      offerBenefits: "",
      mainCall: "",
      audienceCold: "",
      audienceWarm: "",
      audienceHot: "",
      positioning: "",
      creativeDirection: "",
      strategicScenario: "",
      destinations: [],
      mainObjections: "",
      strategicResponses: "",
      salesPageDestination: "",
      mainCta: "",
      proofElements: "",
      urgencyAndScarcity: "",
      remarketingStructure: "",
      metrics: "",
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeDestinations(
    value: unknown
  ): SalesCampaignDestinationPresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, [
            "title",
            "titulo",
            "name",
            "nome",
            "destination",
            "destino",
          ]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-campanha-conversao-de-vendas"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setCampaignData({
        campaignType: getString(source, [
          "campaignType",
          "tipoCampanha",
          "tipoDaCampanha",
        ]),
        campaignPhase: getString(source, [
          "campaignPhase",
          "faseCampanha",
          "faseDaCampanha",
        ]),
        salesObjective: getString(source, [
          "salesObjective",
          "objetivoComercial",
          "objetivoDeVendas",
          "objetivo",
        ]),
        audienceTemperature: getString(source, [
          "audienceTemperature",
          "temperaturaDaAudiencia",
          "temperaturaDaAudiência",
          "temperaturaDoPublico",
          "temperaturaDoPúblico",
        ]),
        recommendedChannels: getString(source, [
          "recommendedChannels",
          "canaisRecomendados",
          "recommendation",
          "recomendacao",
          "recomendação",
        ]),
        budget: getString(source, ["budget", "orcamento", "orçamento", "verba"]),
        objective: getString(source, ["objective", "objetivoDaCampanha"]),
        offerProduct: getString(source, [
          "offerProduct",
          "produtoServicoSolucao",
          "produtoServiçoSolução",
          "produto",
          "servico",
          "serviço",
          "solucao",
          "solução",
        ]),
        offerPrice: getString(source, [
          "offerPrice",
          "valorOuFaixaDePreco",
          "valorOuFaixaDePreço",
          "preco",
          "preço",
        ]),
        offerPromise: getString(source, [
          "offerPromise",
          "promessaPrincipal",
          "promessaDaOferta",
          "promessa",
        ]),
        offerBenefits: getString(source, [
          "offerBenefits",
          "beneficiosDaOferta",
          "benefíciosDaOferta",
          "beneficios",
          "benefícios",
        ]),
        mainCall: getString(source, [
          "mainCall",
          "chamadaPrincipal",
          "chamadaPrincipalDaCampanha",
          "call",
          "chamada",
        ]),
        audienceCold: getString(source, [
          "audienceCold",
          "publicoFrio",
          "públicoFrio",
        ]),
        audienceWarm: getString(source, [
          "audienceWarm",
          "publicoMorno",
          "públicoMorno",
        ]),
        audienceHot: getString(source, [
          "audienceHot",
          "publicoQuente",
          "públicoQuente",
        ]),
        positioning: getString(source, [
          "positioning",
          "posicionamento",
        ]),
        creativeDirection: getString(source, [
          "creativeDirection",
          "direcaoDosCriativos",
          "direçãoDosCriativos",
          "criativos",
        ]),
        strategicScenario: getString(source, [
          "strategicScenario",
          "cenarioEstrategico",
          "cenárioEstratégico",
        ]),
        destinations: normalizeDestinations(
          source.destinations ||
            source.destinos ||
            source.materiais ||
            source.possiveisMateriais
        ),
        mainObjections: getString(source, [
          "mainObjections",
          "objecoesPrincipais",
          "objeçõesPrincipais",
          "objecoes",
          "objeções",
        ]),
        strategicResponses: getString(source, [
          "strategicResponses",
          "respostasEstrategicas",
          "respostasEstratégicas",
          "respostas",
        ]),
        salesPageDestination: getString(source, [
          "salesPageDestination",
          "destinoPrincipal",
          "paginaCheckoutAtendimento",
          "páginaCheckoutAtendimento",
        ]),
        mainCta: getString(source, [
          "mainCta",
          "ctaPrincipal",
          "cta",
        ]),
        proofElements: getString(source, [
          "proofElements",
          "elementosDeProva",
          "provas",
          "prova",
        ]),
        urgencyAndScarcity: getString(source, [
          "urgencyAndScarcity",
          "urgenciaEEscassez",
          "urgênciaEEscassez",
          "urgencia",
          "urgência",
          "escassez",
        ]),
        remarketingStructure: getString(source, [
          "remarketingStructure",
          "estruturaDeRemarketing",
          "remarketing",
        ]),
        metrics: getString(source, [
          "metrics",
          "metricas",
          "métricas",
          "indicadores",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setCampaignData({
        campaignType: "",
        campaignPhase: "",
        salesObjective: "",
        audienceTemperature: "",
        recommendedChannels: "",
        budget: "",
        objective: "",
        offerProduct: "",
        offerPrice: "",
        offerPromise: "",
        offerBenefits: "",
        mainCall: "",
        audienceCold: "",
        audienceWarm: "",
        audienceHot: "",
        positioning: "",
        creativeDirection: "",
        strategicScenario: "",
        destinations: [],
        mainObjections: "",
        strategicResponses: "",
        salesPageDestination: "",
        mainCta: "",
        proofElements: "",
        urgencyAndScarcity: "",
        remarketingStructure: "",
        metrics: "",
        references: [],
      });
    }
  }, []);

  const demoDestinations: SalesCampaignDestinationPresentationItem[] = [
    {
      title: "Página de vendas",
      link: "https://...",
    },
    {
      title: "WhatsApp comercial",
      link: "https://...",
    },
    {
      title: "Checkout ou agenda",
      link: "https://...",
    },
  ];

  const dataToShow = {
    campaignType: campaignData.campaignType || "Venda direta",
    campaignPhase: campaignData.campaignPhase || "Teste inicial",
    salesObjective: campaignData.salesObjective || "Conversões",
    audienceTemperature: campaignData.audienceTemperature || "Morno",
    recommendedChannels:
      campaignData.recommendedChannels ||
      "Meta Ads para remarketing, Google Pesquisa para intenção ativa, YouTube para prova e autoridade, LinkedIn para vendas B2B e campanhas de WhatsApp para recuperação de interessados.",
    budget:
      campaignData.budget ||
      "Verba inicial de teste com acompanhamento de CPA, custo por reunião, custo por compra, ROAS e qualidade das oportunidades geradas.",
    objective:
      campaignData.objective ||
      "Gerar vendas diretas, agendar reuniões comerciais, recuperar leads quentes, vender uma oferta específica ou conduzir interessados para o WhatsApp.",
    offerProduct:
      campaignData.offerProduct ||
      "Produto, serviço, mentoria, consultoria, diagnóstico, assinatura, curso ou solução comercial principal.",
    offerPrice:
      campaignData.offerPrice ||
      "Valor fixo, faixa de preço, assinatura mensal, condição especial ou proposta sob consulta.",
    offerPromise:
      campaignData.offerPromise ||
      "Ajudar o cliente a alcançar determinado resultado em um contexto específico, com clareza sobre transformação, prazo ou método.",
    offerBenefits:
      campaignData.offerBenefits ||
      "Benefícios, transformações, entregáveis, motivos para comprar e ganhos esperados com a oferta.",
    mainCall:
      campaignData.mainCall ||
      "Comprar agora, agendar diagnóstico, falar com consultor, entrar no WhatsApp, garantir vaga ou solicitar proposta.",
    audienceCold:
      campaignData.audienceCold ||
      "Públicos semelhantes, interesses, busca ativa, segmentações por dor, comportamento ou perfil.",
    audienceWarm:
      campaignData.audienceWarm ||
      "Engajados nas redes, visualizadores de vídeo, visitantes do site, pessoas que consumiram conteúdo ou abriram e-mails.",
    audienceHot:
      campaignData.audienceHot ||
      "Leads, lista de WhatsApp, visitantes da página de vendas, pessoas que iniciaram checkout ou solicitaram contato.",
    positioning:
      campaignData.positioning ||
      "A oferta deve ser percebida como uma solução clara, confiável e necessária para quem já reconhece o problema ou está próximo da decisão.",
    creativeDirection:
      campaignData.creativeDirection ||
      "Depoimentos, prova social, estudo de caso, vídeo de oferta, antes e depois, demonstração, chamada direta, urgência ou quebra de objeções.",
    strategicScenario:
      campaignData.strategicScenario ||
      "Testar remarketing para leads aquecidos, alinhar promessa com página de vendas, apresentar prova forte e deixar o próximo passo muito claro.",
    destinations: campaignData.destinations.length
      ? campaignData.destinations
      : demoDestinations,
    mainObjections:
      campaignData.mainObjections ||
      "Está caro, não tenho tempo, não sei se funciona, preciso pensar, já tentei antes ou não é prioridade agora.",
    strategicResponses:
      campaignData.strategicResponses ||
      "Argumentos, provas, comparações, garantias, explicações e conteúdos que ajudem a superar objeções e reduzir insegurança antes da compra.",
    salesPageDestination:
      campaignData.salesPageDestination ||
      "Página de vendas, WhatsApp, checkout, agenda, formulário de aplicação ou conversa comercial.",
    mainCta:
      campaignData.mainCta ||
      "Comprar agora, agendar diagnóstico, falar com consultor, entrar no WhatsApp, garantir vaga ou solicitar proposta.",
    proofElements:
      campaignData.proofElements ||
      "Depoimentos, cases, números, prints, antes e depois, logos de clientes, certificações, demonstrações ou bastidores.",
    urgencyAndScarcity:
      campaignData.urgencyAndScarcity ||
      "Vagas limitadas, bônus por tempo, turma fechando, condição especial, prazo de inscrição ou agenda limitada.",
    remarketingStructure:
      campaignData.remarketingStructure ||
      "Impactar visitantes da página de vendas, pessoas que clicaram no WhatsApp, leads que abriram e-mails, visualizadores de vídeo e pessoas que adicionaram ao carrinho, usando provas, objeções, urgência e chamadas diretas.",
    metrics:
      campaignData.metrics ||
      "Custo por compra, custo por reunião, ROAS, taxa de conversão, faturamento, boletos gerados, leads qualificados, cliques no WhatsApp, CPA e receita por campanha.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a estratégia da campanha de conversão de vendas, incluindo oferta, públicos, criativos, destinos, objeções, página de venda, remarketing e métricas."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Configuração da campanha
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Direção de mídia e conversão
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A configuração inicial define o tipo de campanha, fase, objetivo
            comercial, temperatura da audiência, canais recomendados e verba
            sugerida.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Tipo
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.campaignType}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Fase
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.campaignPhase}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Objetivo
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.salesObjective}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Audiência
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.audienceTemperature}
            </h4>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Canais recomendados"
            content={dataToShow.recommendedChannels}
          />

          <InfoBlock
            title="Orçamento recomendado"
            content={dataToShow.budget}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Oferta
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Oferta principal da campanha
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A oferta precisa deixar claro o que está sendo vendido, qual
            transformação promete, quais benefícios entrega e qual ação o público
            deve tomar.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Produto, serviço ou solução"
            content={dataToShow.offerProduct}
          />

          <InfoBlock
            title="Valor ou faixa de preço"
            content={dataToShow.offerPrice}
          />

          <InfoBlock
            title="Promessa principal"
            content={dataToShow.offerPromise}
          />

          <InfoBlock
            title="Benefícios da oferta"
            content={dataToShow.offerBenefits}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Chamada principal da campanha"
              content={dataToShow.mainCall}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Públicos
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Público e temperatura da audiência
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A comunicação da campanha deve mudar conforme o nível de consciência
            e proximidade do público com a decisão de compra.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <InfoBlock title="Público frio" content={dataToShow.audienceCold} />

          <InfoBlock title="Público morno" content={dataToShow.audienceWarm} />

          <InfoBlock title="Público quente" content={dataToShow.audienceHot} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estratégia
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Posicionamento e criativos de venda
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esta etapa define o objetivo da campanha, o ângulo de venda, a
            direção dos criativos e o cenário estratégico para conversão.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Objetivo da campanha" content={dataToShow.objective} />

          <InfoBlock title="Posicionamento" content={dataToShow.positioning} />

          <InfoBlock
            title="Direção dos criativos"
            content={dataToShow.creativeDirection}
          />

          <InfoBlock
            title="Cenário estratégico"
            content={dataToShow.strategicScenario}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Destinos
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Materiais e destinos possíveis
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A campanha pode direcionar o público para página de vendas,
            WhatsApp, checkout, agenda, formulário, vídeo de vendas ou conversa
            comercial.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {dataToShow.destinations.map((destination, index) => (
            <a
              key={`${destination.title}-${index}`}
              href={destination.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-950">
                {destination.title || "Destino"}
              </p>

              <p className="mt-2 break-words text-sm text-slate-500">
                {destination.link || "Link não informado"}
              </p>
            </a>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Objeções
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Objeções e argumentos de venda
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As campanhas de venda precisam antecipar dúvidas, inseguranças e
            barreiras que impedem a conversão.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Objeções principais"
            content={dataToShow.mainObjections}
          />

          <InfoBlock
            title="Respostas estratégicas"
            content={dataToShow.strategicResponses}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Conversão
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Página, checkout ou atendimento
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O destino da campanha precisa reduzir atrito, aumentar confiança,
            apresentar provas e deixar a próxima ação evidente.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Destino principal"
            content={dataToShow.salesPageDestination}
          />

          <InfoBlock title="CTA principal" content={dataToShow.mainCta} />

          <InfoBlock
            title="Elementos de prova"
            content={dataToShow.proofElements}
          />

          <InfoBlock
            title="Urgência ou escassez"
            content={dataToShow.urgencyAndScarcity}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Remarketing
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Estrutura de remarketing
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O remarketing recupera pessoas que já demonstraram interesse, mas
            ainda não compraram, usando provas, objeções, urgência e chamadas
            mais diretas.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock
            title="Estratégia de remarketing"
            content={dataToShow.remarketingStructure}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Métricas
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Indicadores de venda
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os indicadores mostram se a campanha está gerando conversão,
            oportunidades, receita, retorno sobre investimento e vendas
            qualificadas.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock title="Métricas da campanha" content={dataToShow.metrics} />
        </div>
      </article>

      {campaignData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {campaignData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function ContentDistributionCampaignPresentation({
  section,
}: {
  section: Section;
}) {
  const [campaignData, setCampaignData] =
    useState<ContentDistributionCampaignPresentationData>({
      campaignType: "",
      campaignPhase: "",
      mediaObjective: "",
      audienceTemperature: "",
      recommendedChannels: "",
      budget: "",
      materials: [],
      objective: "",
      audience: "",
      positioning: "",
      creativeDirection: "",
      strategicScenario: "",
      authorityContent: "",
      relationshipContent: "",
      indirectConversionContent: "",
      remarketingContent: "",
      channelPlans: [],
      mainContent: "",
      possibleDerivations: "",
      distributionSequence: "",
      metrics: "",
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeMaterials(
    value: unknown
  ): ContentDistributionMaterialPresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, [
            "title",
            "titulo",
            "name",
            "nome",
            "material",
            "content",
            "conteudo",
            "conteúdo",
          ]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  function normalizeChannelPlans(
    value: unknown
  ): ContentDistributionChannelPlanPresentationItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            channel: "",
            contentType: "",
            channelRole: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          channel: getString(record, [
            "channel",
            "canal",
            "name",
            "nome",
          ]),
          contentType: getString(record, [
            "contentType",
            "tipoDeConteudo",
            "tipoDeConteúdo",
            "type",
            "tipo",
          ]),
          channelRole: getString(record, [
            "channelRole",
            "papelDoCanal",
            "role",
            "papel",
          ]),
        };
      })
      .filter(
        (item) =>
          item.channel.trim() ||
          item.contentType.trim() ||
          item.channelRole.trim()
      );
  }

  function normalizeReferences(value: unknown): SocialChannelReference[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-campanha-distribuicao-de-conteudo"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setCampaignData({
        campaignType: getString(source, [
          "campaignType",
          "tipoCampanha",
          "tipoDaCampanha",
        ]),
        campaignPhase: getString(source, [
          "campaignPhase",
          "faseCampanha",
          "faseDaCampanha",
        ]),
        mediaObjective: getString(source, [
          "mediaObjective",
          "objetivoDeMidia",
          "objetivoDeMídia",
          "objetivo",
        ]),
        audienceTemperature: getString(source, [
          "audienceTemperature",
          "temperaturaDoPublico",
          "temperaturaDoPúblico",
        ]),
        recommendedChannels: getString(source, [
          "recommendedChannels",
          "canaisRecomendados",
          "recomendacao",
          "recomendação",
        ]),
        budget: getString(source, [
          "budget",
          "orcamento",
          "orçamento",
          "verba",
        ]),
        materials: normalizeMaterials(
          source.materials ||
            source.materiais ||
            source.conteudos ||
            source.conteúdos
        ),
        objective: getString(source, [
          "objective",
          "objetivo",
          "objetivoDaCampanha",
        ]),
        audience: getString(source, ["audience", "publico", "público"]),
        positioning: getString(source, ["positioning", "posicionamento"]),
        creativeDirection: getString(source, [
          "creativeDirection",
          "direcaoDosCriativos",
          "direçãoDosCriativos",
          "criativos",
        ]),
        strategicScenario: getString(source, [
          "strategicScenario",
          "cenarioEstrategico",
          "cenárioEstratégico",
        ]),
        authorityContent: getString(source, [
          "authorityContent",
          "conteudosDeAutoridade",
          "conteúdosDeAutoridade",
          "autoridade",
        ]),
        relationshipContent: getString(source, [
          "relationshipContent",
          "conteudosDeRelacionamento",
          "conteúdosDeRelacionamento",
          "relacionamento",
        ]),
        indirectConversionContent: getString(source, [
          "indirectConversionContent",
          "conteudosDeConversaoIndireta",
          "conteúdosDeConversãoIndireta",
          "conversaoIndireta",
          "conversãoIndireta",
        ]),
        remarketingContent: getString(source, [
          "remarketingContent",
          "conteudosParaRemarketing",
          "conteúdosParaRemarketing",
          "remarketing",
        ]),
        channelPlans: normalizeChannelPlans(
          source.channelPlans ||
            source.planoDeDistribuicaoPorCanal ||
            source.planoDeDistribuiçãoPorCanal ||
            source.canais
        ),
        mainContent: getString(source, [
          "mainContent",
          "conteudoPrincipal",
          "conteúdoPrincipal",
        ]),
        possibleDerivations: getString(source, [
          "possibleDerivations",
          "derivacoesPossiveis",
          "derivaçõesPossíveis",
          "derivacoes",
          "derivações",
        ]),
        distributionSequence: getString(source, [
          "distributionSequence",
          "sequenciaDeDistribuicao",
          "sequênciaDeDistribuição",
          "sequencia",
          "sequência",
        ]),
        metrics: getString(source, [
          "metrics",
          "metricas",
          "métricas",
          "indicadores",
        ]),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setCampaignData({
        campaignType: "",
        campaignPhase: "",
        mediaObjective: "",
        audienceTemperature: "",
        recommendedChannels: "",
        budget: "",
        materials: [],
        objective: "",
        audience: "",
        positioning: "",
        creativeDirection: "",
        strategicScenario: "",
        authorityContent: "",
        relationshipContent: "",
        indirectConversionContent: "",
        remarketingContent: "",
        channelPlans: [],
        mainContent: "",
        possibleDerivations: "",
        distributionSequence: "",
        metrics: "",
        references: [],
      });
    }
  }, []);

  const demoMaterials: ContentDistributionMaterialPresentationItem[] = [
    {
      title: "Reels educativo",
      link: "https://...",
    },
    {
      title: "Carrossel de autoridade",
      link: "https://...",
    },
    {
      title: "Artigo do blog",
      link: "https://...",
    },
  ];

  const demoChannelPlans: ContentDistributionChannelPlanPresentationItem[] = [
    {
      channel: "Instagram",
      contentType: "Reels e carrosséis",
      channelRole: "Alcance, relacionamento e autoridade",
    },
    {
      channel: "TikTok",
      contentType: "Vídeos curtos",
      channelRole: "Descoberta e expansão de audiência",
    },
    {
      channel: "YouTube",
      contentType: "Vídeos e Shorts",
      channelRole: "Autoridade, retenção e profundidade",
    },
  ];

  const dataToShow = {
    campaignType: campaignData.campaignType || "Distribuição de conteúdo",
    campaignPhase: campaignData.campaignPhase || "Teste inicial",
    mediaObjective: campaignData.mediaObjective || "Alcance",
    audienceTemperature: campaignData.audienceTemperature || "Frio",
    recommendedChannels:
      campaignData.recommendedChannels ||
      "Instagram e TikTok para alcance e engajamento, YouTube para autoridade, LinkedIn para B2B e Google Display para remarketing.",
    budget:
      campaignData.budget ||
      "Verba inicial de teste para impulsionar os melhores conteúdos, avaliar custo por resultado e identificar quais formatos geram mais atenção qualificada.",
    materials: campaignData.materials.length
      ? campaignData.materials
      : demoMaterials,
    objective:
      campaignData.objective ||
      "Ampliar alcance, aumentar visualizações, gerar tráfego para conteúdo, fortalecer autoridade, aquecer audiência e reaproveitar conteúdos estratégicos.",
    audience:
      campaignData.audience ||
      "Público frio, engajados do Instagram, visitantes do site, lista de leads, seguidores, públicos semelhantes e interesses específicos.",
    positioning:
      campaignData.positioning ||
      "O conteúdo deve ser apresentado como uma peça de valor, autoridade ou conexão, reforçando a percepção da marca antes da oferta direta.",
    creativeDirection:
      campaignData.creativeDirection ||
      "Cortes de vídeos, carrosséis, posts educativos, imagens com frases fortes, trechos de lives, prints, chamadas de blog e bastidores.",
    strategicScenario:
      campaignData.strategicScenario ||
      "Impulsionar conteúdos com bom desempenho orgânico, aquecer audiência antes de campanhas de venda, distribuir prova social e reforçar autoridade em temas estratégicos.",
    authorityContent:
      campaignData.authorityContent ||
      "Conteúdos educativos, provas de conhecimento, análises, bastidores técnicos, vídeos explicativos e posts de opinião.",
    relationshipContent:
      campaignData.relationshipContent ||
      "Bastidores, histórias, posts pessoais, rotina, crenças, valores, trajetória e conteúdos de conexão.",
    indirectConversionContent:
      campaignData.indirectConversionContent ||
      "Provas sociais, estudos de caso, antes e depois, resultados, objeções quebradas e posts que preparam para uma oferta.",
    remarketingContent:
      campaignData.remarketingContent ||
      "Conteúdos para pessoas que engajaram, visitaram página, assistiram vídeo, baixaram material ou já conhecem a marca.",
    channelPlans: campaignData.channelPlans.length
      ? campaignData.channelPlans
      : demoChannelPlans,
    mainContent:
      campaignData.mainContent ||
      "Live, vídeo longo, artigo, podcast, aula, estudo de caso ou conteúdo de lançamento.",
    possibleDerivations:
      campaignData.possibleDerivations ||
      "Cortes, carrosséis, posts curtos, stories, e-mail, artigo, WhatsApp, Shorts, Reels, TikTok e materiais educativos.",
    distributionSequence:
      campaignData.distributionSequence ||
      "Publicar conteúdo principal, depois corte curto, depois carrossel com resumo, depois stories com bastidores, depois WhatsApp com link e depois remarketing para engajados.",
    metrics:
      campaignData.metrics ||
      "Alcance, impressões, visualizações, retenção, cliques, custo por clique, engajamento, salvamentos, compartilhamentos, comentários, visitas ao site e crescimento da audiência.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a estratégia da campanha de distribuição de conteúdo, incluindo objetivo de mídia, canais, públicos, conteúdos prioritários, reaproveitamento, sequência e métricas."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Configuração da campanha
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Direção de mídia e distribuição
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A configuração inicial define o tipo de campanha, fase, objetivo de
            mídia, temperatura do público, canais recomendados e verba sugerida.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Tipo
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.campaignType}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Fase
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.campaignPhase}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Objetivo
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.mediaObjective}
            </h4>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Público
            </p>

            <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
              {dataToShow.audienceTemperature}
            </h4>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Canais recomendados"
            content={dataToShow.recommendedChannels}
          />

          <InfoBlock
            title="Orçamento recomendado"
            content={dataToShow.budget}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Materiais
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Conteúdos para distribuição
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esses são os conteúdos, links ou materiais que podem ser
            impulsionados, distribuídos ou usados como ponto de entrada para
            aquecer a audiência.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {dataToShow.materials.map((material, index) => (
            <a
              key={`${material.title}-${index}`}
              href={material.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-950">
                {material.title || "Material"}
              </p>

              <p className="mt-2 break-words text-sm text-slate-500">
                {material.link || "Link não informado"}
              </p>
            </a>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Estratégia
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Público, posicionamento e criativos
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A distribuição de conteúdo precisa ter clareza sobre quem será
            alcançado, qual percepção será construída e quais formatos serão
            testados.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Objetivo da campanha" content={dataToShow.objective} />

          <InfoBlock title="Público" content={dataToShow.audience} />

          <InfoBlock title="Posicionamento" content={dataToShow.positioning} />

          <InfoBlock
            title="Direção dos criativos"
            content={dataToShow.creativeDirection}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Cenário estratégico"
              content={dataToShow.strategicScenario}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Conteúdos prioritários
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Conteúdos por função estratégica
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada conteúdo pode cumprir uma função diferente na campanha:
            autoridade, relacionamento, conversão indireta ou remarketing.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Conteúdos de autoridade"
            content={dataToShow.authorityContent}
          />

          <InfoBlock
            title="Conteúdos de relacionamento"
            content={dataToShow.relationshipContent}
          />

          <InfoBlock
            title="Conteúdos de conversão indireta"
            content={dataToShow.indirectConversionContent}
          />

          <InfoBlock
            title="Conteúdos para remarketing"
            content={dataToShow.remarketingContent}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Canais
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Plano de distribuição por canal
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O plano por canal mostra onde o conteúdo será distribuído, qual
            formato será usado e qual papel cada canal cumpre na estratégia.
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {dataToShow.channelPlans.map((plan, index) => (
            <div
              key={`${plan.channel}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                Canal {String(index + 1).padStart(2, "0")}
              </p>

              <h4 className="mt-4 text-2xl font-light tracking-[-0.035em] text-slate-950">
                {plan.channel || "Canal"}
              </h4>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoBlock
                  title="Tipo de conteúdo"
                  content={plan.contentType || "Tipo de conteúdo"}
                />

                <InfoBlock
                  title="Papel do canal"
                  content={plan.channelRole || "Papel do canal"}
                />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Reaproveitamento
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Reaproveitamento de conteúdo
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Um conteúdo principal pode gerar vários formatos derivados,
            aumentando a vida útil da produção e a consistência da distribuição.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Conteúdo principal"
            content={dataToShow.mainContent}
          />

          <InfoBlock
            title="Derivações possíveis"
            content={dataToShow.possibleDerivations}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Sequência
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Sequência de distribuição
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A sequência evita publicações soltas e cria continuidade entre
            conteúdo principal, cortes, stories, e-mails, WhatsApp e
            remarketing.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock
            title="Ordem de distribuição"
            content={dataToShow.distributionSequence}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Métricas
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Indicadores de distribuição
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As métricas ajudam a avaliar alcance, retenção, cliques,
            engajamento, crescimento de audiência e qualidade da distribuição.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock title="Métricas da campanha" content={dataToShow.metrics} />
        </div>
      </article>

      {campaignData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {campaignData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function AutomationSystemPresentation({ section }: { section: Section }) {
  const [automationData, setAutomationData] =
    useState<AutomationSystemPresentationData>({
      strategicVision: "",
      centralPrinciple: "",
      systemFunction: "",
      successCondition: "",
      failureRisk: "",
      architecture: "",
      architectureCharacteristics: "",
      entryTriggers: "",
      advanceTriggers: "",
      reentryTriggers: "",
      exitTriggers: "",
      tags: [],
      channelPriorities: [],
      cadences: [],
      flows: [],
      transmissionIntegration: "",
      mainKpi: "",
      secondaryKpis: "",
      platforms: [],
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeTags(value: unknown): AutomationSystemTagPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            name: "",
            description: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          name: getString(record, ["name", "nome", "tag"]),
          description: getString(record, [
            "description",
            "descricao",
            "descrição",
          ]),
        };
      })
      .filter((item) => item.name.trim() || item.description.trim());
  }

  function normalizeChannelPriorities(
    value: unknown
  ): AutomationSystemChannelPriorityPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            flow: "",
            dominantChannel: "",
            supportChannel: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          flow: getString(record, ["flow", "fluxo"]),
          dominantChannel: getString(record, [
            "dominantChannel",
            "canalDominante",
          ]),
          supportChannel: getString(record, [
            "supportChannel",
            "canalDeSuporte",
          ]),
        };
      })
      .filter(
        (item) =>
          item.flow.trim() ||
          item.dominantChannel.trim() ||
          item.supportChannel.trim()
      );
  }

  function normalizeCadences(
    value: unknown
  ): AutomationSystemCadencePresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            flow: "",
            cadence: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          flow: getString(record, ["flow", "fluxo"]),
          cadence: getString(record, ["cadence", "cadencia", "cadência"]),
        };
      })
      .filter((item) => item.flow.trim() || item.cadence.trim());
  }

  function normalizeSteps(
    value: unknown
  ): AutomationSystemStepPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            moment: "",
            channel: "",
            type: "",
            title: "",
            purpose: "",
            condition: "",
            cta: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          moment: getString(record, ["moment", "momento", "day", "dia"]),
          channel: getString(record, ["channel", "canal"]),
          type: getString(record, ["type", "tipo"]),
          title: getString(record, [
            "title",
            "titulo",
            "título",
            "name",
            "nome",
          ]),
          purpose: getString(record, [
            "purpose",
            "funcao",
            "função",
            "objetivo",
          ]),
          condition: getString(record, [
            "condition",
            "condicao",
            "condição",
          ]),
          cta: getString(record, [
            "cta",
            "call",
            "chamada",
            "proximoPasso",
            "próximoPasso",
          ]),
        };
      })
      .filter(
        (item) =>
          item.moment.trim() ||
          item.channel.trim() ||
          item.type.trim() ||
          item.title.trim() ||
          item.purpose.trim() ||
          item.condition.trim() ||
          item.cta.trim()
      );
  }

  function normalizeFlows(value: unknown): AutomationSystemFlowPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
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
            steps: [],
          };
        }

        const record = item as Record<string, unknown>;

        return {
          code: getString(record, ["code", "codigo", "código"]),
          name: getString(record, ["name", "nome", "title", "titulo", "título"]),
          objective: getString(record, ["objective", "objetivo"]),
          dominantChannel: getString(record, [
            "dominantChannel",
            "canalDominante",
          ]),
          supportChannel: getString(record, [
            "supportChannel",
            "canalDeSuporte",
          ]),
          cadence: getString(record, ["cadence", "cadencia", "cadência"]),
          entryTrigger: getString(record, [
            "entryTrigger",
            "gatilhoDeEntrada",
          ]),
          advanceTrigger: getString(record, [
            "advanceTrigger",
            "gatilhoDeAvanco",
            "gatilhoDeAvanço",
          ]),
          exitCondition: getString(record, [
            "exitCondition",
            "condicaoDeSaida",
            "condiçãoDeSaída",
          ]),
          strategicNotes: getString(record, [
            "strategicNotes",
            "observacoesEstrategicas",
            "observaçõesEstratégicas",
          ]),
          steps: normalizeSteps(record.steps || record.etapas),
        };
      })
      .filter(
        (item) =>
          item.code.trim() ||
          item.name.trim() ||
          item.objective.trim() ||
          item.steps.length > 0
      );
  }

  function normalizePlatforms(
    value: unknown
  ): AutomationSystemPlatformPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            category: "",
            tool: "",
            purpose: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          category: getString(record, ["category", "categoria"]),
          tool: getString(record, ["tool", "ferramenta"]),
          purpose: getString(record, ["purpose", "funcao", "função"]),
        };
      })
      .filter(
        (item) => item.category.trim() || item.tool.trim() || item.purpose.trim()
      );
  }

  function normalizeReferences(
    value: unknown
  ): AutomationSystemReferencePresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, [
            "title",
            "titulo",
            "título",
            "name",
            "nome",
          ]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-fluxo-de-automacao"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setAutomationData({
        strategicVision: getString(source, [
          "strategicVision",
          "visaoEstrategica",
          "visãoEstratégica",
        ]),
        centralPrinciple: getString(source, [
          "centralPrinciple",
          "principioCentral",
          "princípioCentral",
        ]),
        systemFunction: getString(source, [
          "systemFunction",
          "funcaoDoSistema",
          "funçãoDoSistema",
        ]),
        successCondition: getString(source, [
          "successCondition",
          "seBemExecutado",
        ]),
        failureRisk: getString(source, ["failureRisk", "riscoSeMalExecutado"]),
        architecture: getString(source, [
          "architecture",
          "arquitetura",
          "estruturaOperacional",
        ]),
        architectureCharacteristics: getString(source, [
          "architectureCharacteristics",
          "caracteristicasDaArquitetura",
          "característicasDaArquitetura",
        ]),
        entryTriggers: getString(source, [
          "entryTriggers",
          "gatilhosDeEntrada",
        ]),
        advanceTriggers: getString(source, [
          "advanceTriggers",
          "gatilhosDeAvanco",
          "gatilhosDeAvanço",
        ]),
        reentryTriggers: getString(source, [
          "reentryTriggers",
          "gatilhosDeReentrada",
        ]),
        exitTriggers: getString(source, [
          "exitTriggers",
          "gatilhosDeSaida",
          "gatilhosDeSaída",
        ]),
        tags: normalizeTags(source.tags),
        channelPriorities: normalizeChannelPriorities(
          source.channelPriorities || source.prioridadeDeCanalPorEstagio
        ),
        cadences: normalizeCadences(source.cadences || source.cadencias),
        flows: normalizeFlows(source.flows || source.fluxos),
        transmissionIntegration: getString(source, [
          "transmissionIntegration",
          "integracaoComCanalDeTransmissao",
          "integraçãoComCanalDeTransmissão",
        ]),
        mainKpi: getString(source, ["mainKpi", "kpiPrincipal"]),
        secondaryKpis: getString(source, [
          "secondaryKpis",
          "kpisSecundarios",
          "kpisSecundários",
        ]),
        platforms: normalizePlatforms(source.platforms || source.plataformas),
        references: normalizeReferences(
          source.references ||
            source.referencias ||
            source.referências ||
            source.externalReferences
        ),
      });
    } catch {
      setAutomationData({
        strategicVision: "",
        centralPrinciple: "",
        systemFunction: "",
        successCondition: "",
        failureRisk: "",
        architecture: "",
        architectureCharacteristics: "",
        entryTriggers: "",
        advanceTriggers: "",
        reentryTriggers: "",
        exitTriggers: "",
        tags: [],
        channelPriorities: [],
        cadences: [],
        flows: [],
        transmissionIntegration: "",
        mainKpi: "",
        secondaryKpis: "",
        platforms: [],
        references: [],
      });
    }
  }, []);

  const demoFlows: AutomationSystemFlowPresentation[] = [
    {
      code: "Fluxo 01",
      name: "Nome do fluxo",
      objective:
        "Descreva o objetivo estratégico deste fluxo dentro da jornada do lead.",
      dominantChannel: "Canal principal",
      supportChannel: "Canal de suporte",
      cadence: "Cadência de envio",
      entryTrigger: "Informe o gatilho que faz o lead entrar neste fluxo.",
      advanceTrigger: "Informe o critério que faz o lead avançar.",
      exitCondition: "Informe a condição de saída do fluxo.",
      strategicNotes:
        "Use este campo para explicar a lógica estratégica e os cuidados deste fluxo.",
      steps: [
        {
          moment: "D0",
          channel: "E-mail",
          type: "Mensagem",
          title: "Título da primeira mensagem",
          purpose: "Explique a função estratégica desta mensagem.",
          condition: "Condição para envio desta etapa.",
          cta: "Próximo passo desejado.",
        },
        {
          moment: "D1",
          channel: "WhatsApp",
          type: "Mensagem",
          title: "Título da segunda mensagem",
          purpose: "Explique a função estratégica desta mensagem.",
          condition: "Condição para envio desta etapa.",
          cta: "Próximo passo desejado.",
        },
      ],
    },
  ];

  const dataToShow = {
    strategicVision:
      automationData.strategicVision ||
      "Os fluxos funcionam como um sistema que sustenta raciocínio, reforça percepção e conduz o lead até uma decisão mais clara.",
    centralPrinciple:
      automationData.centralPrinciple ||
      "O lead precisa de uma sequência estruturada para não perder a percepção construída no conteúdo.",
    systemFunction:
      automationData.systemFunction ||
      "Sustentar relacionamento, qualificar intenção, reforçar consciência e conduzir o lead para o próximo passo.",
    successCondition:
      automationData.successCondition ||
      "Quando bem executado, o sistema aumenta previsibilidade, reduz dispersão e organiza a jornada de decisão.",
    failureRisk:
      automationData.failureRisk ||
      "Quando mal executado, o lead recebe mensagens soltas, não entende a sequência e perde conexão com a proposta.",
    architecture:
      automationData.architecture ||
      "Fluxo 01 -> Fluxo 02 -> Fluxo 03 -> Fluxo 04",
    architectureCharacteristics:
      automationData.architectureCharacteristics ||
      "Sistema baseado em comportamento, estágio de consciência, resposta, clique, abertura, avanço e reentrada.",
    entryTriggers:
      automationData.entryTriggers ||
      "Cadastro, formulário, clique, entrada no WhatsApp, download de material, compra, inscrição ou interação estratégica.",
    advanceTriggers:
      automationData.advanceTriggers ||
      "Abertura, clique, resposta, preenchimento de formulário, engajamento, agendamento ou sinal de intenção.",
    reentryTriggers:
      automationData.reentryTriggers ||
      "Inatividade, ausência de resposta, abandono de etapa ou queda de engajamento.",
    exitTriggers:
      automationData.exitTriggers ||
      "Compra, agendamento, resposta qualificada, entrada em atendimento, conclusão da sequência ou remoção do fluxo.",
    tags: automationData.tags.length
      ? automationData.tags
      : [
          {
            name: "lead novo",
            description: "Pessoa que acabou de entrar na base.",
          },
          {
            name: "lead engajado",
            description: "Pessoa que abriu, clicou ou respondeu.",
          },
          {
            name: "lead frio",
            description: "Pessoa sem interação recente.",
          },
        ],
    channelPriorities: automationData.channelPriorities.length
      ? automationData.channelPriorities
      : [
          {
            flow: "Fluxo 01",
            dominantChannel: "E-mail",
            supportChannel: "WhatsApp",
          },
          {
            flow: "Fluxo 02",
            dominantChannel: "WhatsApp",
            supportChannel: "E-mail",
          },
        ],
    cadences: automationData.cadences.length
      ? automationData.cadences
      : [
          {
            flow: "Fluxo 01",
            cadence: "D0, D1, D3, D5",
          },
          {
            flow: "Fluxo 02",
            cadence: "1 mensagem a cada 2 dias",
          },
        ],
    flows: automationData.flows.length ? automationData.flows : demoFlows,
    transmissionIntegration:
      automationData.transmissionIntegration ||
      "Use canais de apoio para reforçar mensagens importantes e manter o lead dentro da linha de raciocínio.",
    mainKpi:
      automationData.mainKpi ||
      "Percentual de leads que avançam para o próximo passo estratégico.",
    secondaryKpis:
      automationData.secondaryKpis ||
      "Taxa de abertura, taxa de clique, respostas no WhatsApp, agendamentos, vendas, descadastros, tempo médio até conversão e avanço entre etapas.",
    platforms: automationData.platforms.length
      ? automationData.platforms
      : [
          {
            category: "Automação",
            tool: "Ferramenta de automação",
            purpose: "Executar os fluxos e registrar comportamento.",
          },
          {
            category: "Atendimento",
            tool: "WhatsApp ou CRM",
            purpose: "Acompanhar respostas e conduzir oportunidades.",
          },
        ],
  };

  function getStepStyle(type: string) {
    const normalizedType = type.toLowerCase();

    if (normalizedType.includes("condição") || normalizedType.includes("condicao")) {
      return {
        badge: "bg-violet-100 text-violet-700",
        border: "border-violet-200",
      };
    }

    if (normalizedType.includes("espera")) {
      return {
        badge: "bg-amber-100 text-amber-700",
        border: "border-amber-200",
      };
    }

    if (normalizedType.includes("ação") || normalizedType.includes("acao")) {
      return {
        badge: "bg-emerald-100 text-emerald-700",
        border: "border-emerald-200",
      };
    }

    if (normalizedType.includes("saída") || normalizedType.includes("saida")) {
      return {
        badge: "bg-slate-950 text-white",
        border: "border-slate-300",
      };
    }

    return {
      badge: "bg-sky-100 text-sky-700",
      border: "border-sky-200",
    };
  }

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  function FlowMap({ flow }: { flow: AutomationSystemFlowPresentation }) {
    return (
      <div className="mt-8 overflow-x-auto rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <div className="flex min-w-max items-stretch gap-4">
          {flow.steps.map((step, index) => {
            const style = getStepStyle(step.type || "Mensagem");

            return (
              <div
                key={`${flow.code}-${step.title}-${index}`}
                className="flex items-center gap-4"
              >
                <div
                  className={`w-[300px] rounded-[1.5rem] border bg-white p-5 shadow-sm ${style.border}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                    >
                      {step.type || "Mensagem"}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      {step.moment || `Etapa ${index + 1}`}
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    {step.channel || "Canal"}
                  </p>

                  <h5 className="mt-3 text-lg font-semibold leading-7 text-slate-950">
                    {step.title || "Etapa do fluxo"}
                  </h5>

                  <p className="mt-4 line-clamp-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {step.purpose || "Função estratégica da etapa."}
                  </p>

                  {step.cta && (
                    <p className="mt-4 rounded-2xl bg-slate-100 p-3 text-xs font-semibold leading-6 text-slate-600">
                      CTA: {step.cta}
                    </p>
                  )}
                </div>

                {index < flow.steps.length - 1 && (
                  <div className="flex items-center">
                    <div className="h-px w-10 bg-slate-300" />
                    <div className="h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function FlowSequence({
    flow,
  }: {
    flow: AutomationSystemFlowPresentation;
  }) {
    return (
      <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Sequência detalhada
            </p>

            <h5 className="mt-3 text-2xl font-light tracking-[-0.035em] text-slate-950">
              E-mails, mensagens e ações do fluxo
            </h5>
          </div>

          <p className="text-sm font-semibold text-slate-400">
            {flow.steps.length} etapas
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-slate-200">
          <div className="grid grid-cols-[110px_140px_140px_1.4fr_1.4fr_1.2fr_1.2fr] bg-slate-950 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            <div className="p-4">Momento</div>
            <div className="p-4">Canal</div>
            <div className="p-4">Tipo</div>
            <div className="p-4">Mensagem</div>
            <div className="p-4">Função</div>
            <div className="p-4">Condição</div>
            <div className="p-4">CTA</div>
          </div>

          <div className="divide-y divide-slate-200">
            {flow.steps.map((step, index) => (
              <div
                key={`${flow.code}-sequence-${index}`}
                className="grid grid-cols-[110px_140px_140px_1.4fr_1.4fr_1.2fr_1.2fr] bg-white text-sm text-slate-600"
              >
                <div className="p-4 font-semibold text-slate-950">
                  {step.moment || `Etapa ${index + 1}`}
                </div>

                <div className="p-4">{step.channel || "Não informado"}</div>

                <div className="p-4">{step.type || "Mensagem"}</div>

                <div className="p-4 font-semibold text-slate-950">
                  {step.title || "Mensagem não informada"}
                </div>

                <div className="whitespace-pre-line p-4 leading-7">
                  {step.purpose || "Função não informada."}
                </div>

                <div className="whitespace-pre-line p-4 leading-7">
                  {step.condition || "Condição não informada."}
                </div>

                <div className="whitespace-pre-line p-4 leading-7">
                  {step.cta || "CTA não informado."}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta o sistema de automação do projeto, incluindo visão estratégica, arquitetura dos fluxos, gatilhos, tags, canais, cadência, KPIs, plataformas, mapas visuais e sequência detalhada de mensagens."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Visão estratégica
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Sistema de automação
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O sistema organiza a jornada do lead, sustenta a percepção gerada
            pelo conteúdo e conduz o público para decisões progressivas.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Visão estratégica"
            content={dataToShow.strategicVision}
          />

          <InfoBlock
            title="Princípio central"
            content={dataToShow.centralPrinciple}
          />

          <InfoBlock
            title="Função do sistema"
            content={dataToShow.systemFunction}
          />

          <InfoBlock
            title="Se bem executado"
            content={dataToShow.successCondition}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Risco se mal executado"
              content={dataToShow.failureRisk}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Arquitetura
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Arquitetura dos fluxos
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A arquitetura mostra como os fluxos se conectam e como o lead se
            movimenta de acordo com comportamento, engajamento e estágio de
            decisão.
          </p>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
            Estrutura operacional
          </p>

          <h4 className="mt-5 text-3xl font-light tracking-[-0.045em] text-slate-950">
            {dataToShow.architecture}
          </h4>

          <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
            {dataToShow.architectureCharacteristics}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Gatilhos de entrada"
            content={dataToShow.entryTriggers}
          />

          <InfoBlock
            title="Gatilhos de avanço"
            content={dataToShow.advanceTriggers}
          />

          <InfoBlock
            title="Gatilhos de reentrada"
            content={dataToShow.reentryTriggers}
          />

          <InfoBlock
            title="Gatilhos de saída"
            content={dataToShow.exitTriggers}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Segmentação
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Tags, canais e cadência
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As tags identificam estágio e comportamento. Os canais e a cadência
            definem como cada fluxo será executado.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Tags
            </p>

            <div className="mt-6 space-y-3">
              {dataToShow.tags.map((tag, index) => (
                <div
                  key={`${tag.name}-${index}`}
                  className="rounded-2xl bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-950">{tag.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {tag.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
                Canais por fluxo
              </p>

              <div className="mt-6 space-y-3">
                {dataToShow.channelPriorities.map((item, index) => (
                  <div
                    key={`${item.flow}-${index}`}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <p className="font-semibold text-slate-950">{item.flow}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Dominante: {item.dominantChannel || "Não informado"}
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
                      Suporte: {item.supportChannel || "Não informado"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
                Cadência
              </p>

              <div className="mt-6 space-y-3">
                {dataToShow.cadences.map((item, index) => (
                  <div
                    key={`${item.flow}-${index}`}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <p className="font-semibold text-slate-950">{item.flow}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.cadence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Fluxos detalhados
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Mapa visual e sequência de mensagens
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada fluxo apresenta primeiro a lógica visual da automação e, em
            seguida, a sequência detalhada de e-mails, mensagens, condições,
            ações e CTAs.
          </p>
        </div>

        <div className="mt-10 space-y-12">
          {dataToShow.flows.map((flow, index) => (
            <div
              key={`${flow.code}-${flow.name}-${index}`}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                {flow.code || `Fluxo ${index + 1}`}
              </p>

              <h4 className="mt-4 text-3xl font-light tracking-[-0.045em] text-slate-950">
                {flow.name || "Fluxo sem nome"}
              </h4>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                {flow.objective || "Objetivo do fluxo não informado."}
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                <InfoBlock
                  title="Canal dominante"
                  content={flow.dominantChannel || "Não informado"}
                />

                <InfoBlock
                  title="Canal de suporte"
                  content={flow.supportChannel || "Não informado"}
                />

                <InfoBlock
                  title="Cadência"
                  content={flow.cadence || "Não informado"}
                />
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <InfoBlock
                  title="Gatilho de entrada"
                  content={flow.entryTrigger || "Não informado"}
                />

                <InfoBlock
                  title="Gatilho de avanço"
                  content={flow.advanceTrigger || "Não informado"}
                />

                <InfoBlock
                  title="Condição de saída"
                  content={flow.exitCondition || "Não informado"}
                />
              </div>

              {flow.strategicNotes && (
                <div className="mt-5">
                  <InfoBlock
                    title="Observações estratégicas"
                    content={flow.strategicNotes}
                  />
                </div>
              )}

              {flow.steps.length > 0 && (
                <>
                  <FlowMap flow={flow} />
                  <FlowSequence flow={flow} />
                </>
              )}
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Suporte e mensuração
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Integrações, KPIs e plataformas
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Esta parte mostra como o sistema será reforçado por canais de apoio,
            quais indicadores serão acompanhados e quais ferramentas sustentam a
            operação.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Canal de transmissão"
            content={dataToShow.transmissionIntegration}
          />

          <InfoBlock title="KPI principal" content={dataToShow.mainKpi} />

          <div className="md:col-span-2">
            <InfoBlock
              title="KPIs secundários"
              content={dataToShow.secondaryKpis}
            />
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Plataformas recomendadas
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {dataToShow.platforms.map((platform, index) => (
              <div
                key={`${platform.tool}-${index}`}
                className="rounded-2xl bg-slate-50 p-5"
              >
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  {platform.category || "Categoria"}
                </p>

                <h4 className="mt-3 text-xl font-semibold text-slate-950">
                  {platform.tool || "Ferramenta"}
                </h4>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {platform.purpose || "Função não informada."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>

      {automationData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {automationData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function TimelinePresentation({ section }: { section: Section }) {
  const [timelineData, setTimelineData] = useState<TimelinePresentationData>({
    events: [],
    macroVision: "",
    firstMilestone: "",
    secondMilestone: "",
    thirdMilestone: "",
    risks: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function formatDate(value: string) {
    if (!value) {
      return "";
    }

    const [year, month, day] = value.split("-");

    if (!year || !month || !day) {
      return value;
    }

    return `${day}/${month}/${year}`;
  }

  function formatShortDate(value: string) {
    if (!value) {
      return "";
    }

    const [year, month, day] = value.split("-");

    if (!year || !month || !day) {
      return value;
    }

    const monthNames: Record<string, string> = {
      "01": "jan",
      "02": "fev",
      "03": "mar",
      "04": "abr",
      "05": "mai",
      "06": "jun",
      "07": "jul",
      "08": "ago",
      "09": "set",
      "10": "out",
      "11": "nov",
      "12": "dez",
    };

    return `${Number(day)}/${monthNames[month] || month} ${year}`;
  }

  function normalizeSprints(value: unknown): TimelineSprintPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            startDate: "",
            endDate: "",
            period: "",
            deliverables: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          startDate: getString(record, [
            "startDate",
            "dataInicio",
            "dataDeInicio",
            "início",
            "inicio",
          ]),
          endDate: getString(record, [
            "endDate",
            "dataFinal",
            "dataFim",
            "fim",
          ]),
          period: getString(record, ["period", "periodo", "período"]),
          deliverables: getString(record, [
            "deliverables",
            "entregas",
            "description",
            "descricao",
            "descrição",
          ]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.startDate.trim() ||
          item.endDate.trim() ||
          item.period.trim() ||
          item.deliverables.trim()
      );
  }

  function normalizeEvents(value: unknown): TimelineEventPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            description: "",
            date: "",
            phase: "",
            priority: "",
            status: "",
            responsible: "",
            dependency: "",
            sprints: [],
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          description: getString(record, [
            "description",
            "descricao",
            "descrição",
          ]),
          date: getString(record, ["date", "data", "dataMarco"]),
          phase: getString(record, ["phase", "fase", "faseDoProjeto"]),
          priority: getString(record, ["priority", "prioridade"]),
          status: getString(record, ["status"]),
          responsible: getString(record, ["responsible", "responsavel", "responsável"]),
          dependency: getString(record, ["dependency", "dependencia", "dependência"]),
          sprints: normalizeSprints(record.sprints),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.description.trim() ||
          item.date.trim() ||
          item.sprints.length > 0
      );
  }

  function normalizeReferences(value: unknown): TimelineReferencePresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-linha-do-tempo"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setTimelineData({
        events: normalizeEvents(source.events || source.eventos),
        macroVision: getString(source, [
          "macroVision",
          "visaoMacro",
          "visãoMacro",
        ]),
        firstMilestone: getString(source, [
          "firstMilestone",
          "primeiroMarco",
        ]),
        secondMilestone: getString(source, [
          "secondMilestone",
          "segundoMarco",
        ]),
        thirdMilestone: getString(source, [
          "thirdMilestone",
          "terceiroMarco",
        ]),
        risks: getString(source, ["risks", "riscos", "pontosDeAtencao"]),
        references: normalizeReferences(
          source.references || source.referencias || source.referências
        ),
      });
    } catch {
      setTimelineData({
        events: [],
        macroVision: "",
        firstMilestone: "",
        secondMilestone: "",
        thirdMilestone: "",
        risks: "",
        references: [],
      });
    }
  }, []);

  const demoEvents: TimelineEventPresentation[] = [
    {
      title: "Implementação principal",
      description:
        "Descreva aqui a implementação estratégica, sua função dentro do projeto e o resultado esperado.",
      date: "",
      phase: "Implementação",
      priority: "Alta",
      status: "Não iniciado",
      responsible: "Responsável pelo projeto",
      dependency: "Dependências necessárias para iniciar esta etapa.",
      sprints: [
        {
          title: "Sprint 1",
          startDate: "",
          endDate: "",
          period: "Semana 1",
          deliverables:
            "Liste as entregas principais deste sprint, como configuração, produção, validação ou publicação.",
        },
        {
          title: "Sprint 2",
          startDate: "",
          endDate: "",
          period: "Semana 2",
          deliverables:
            "Liste as entregas de continuidade, ajustes, revisões e validações finais.",
        },
      ],
    },
  ];

  const dataToShow = {
    events: timelineData.events.length ? timelineData.events : demoEvents,
    macroVision:
      timelineData.macroVision ||
      "A linha do tempo organiza a sequência de implementação do projeto, indicando prioridades, entregas, responsáveis, dependências e prazos.",
    firstMilestone:
      timelineData.firstMilestone || "Primeiro marco não informado",
    secondMilestone:
      timelineData.secondMilestone || "Segundo marco não informado",
    thirdMilestone:
      timelineData.thirdMilestone || "Terceiro marco não informado",
    risks:
      timelineData.risks ||
      "Liste os principais riscos que podem atrasar a execução, como falta de materiais, aprovações pendentes, dependência de terceiros ou mudanças de escopo.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  function TimelineSprintCard({
    sprint,
  }: {
    sprint: TimelineSprintPresentation;
  }) {
    const periodLabel =
  sprint.startDate && sprint.endDate
    ? `${formatDate(sprint.startDate)} até ${formatDate(sprint.endDate)}`
    : sprint.startDate
      ? `Início em ${formatDate(sprint.startDate)}`
      : sprint.endDate
        ? `Final em ${formatDate(sprint.endDate)}`
        : "Data não informada";

    return (
      <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
        <div>
  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
    {sprint.title || "Sprint"}
  </p>

  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
    Período
  </p>

  <p className="mt-2 text-sm font-semibold text-slate-950">
    {periodLabel}
  </p>
</div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Entregas
          </p>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
            {sprint.deliverables || "Entregas não informadas."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a linha do tempo de implementação do projeto, com marcos, fases, prioridades, responsáveis, dependências e sprints com data de início e data final."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Visão macro
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Execução do planejamento
          </h3>

          <p className="mt-5 whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.macroVision}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <InfoBlock title="Marco 1" content={dataToShow.firstMilestone} />
          <InfoBlock title="Marco 2" content={dataToShow.secondMilestone} />
          <InfoBlock title="Marco 3" content={dataToShow.thirdMilestone} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Cronograma
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Linha do tempo das implementações
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada implementação abaixo apresenta o marco principal, a fase do
            projeto, o responsável e os sprints com data de início, data final e
            entregas previstas.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-6 top-0 h-full w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-14">
            {dataToShow.events.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${event.title}-${index}`}
                  className="relative grid gap-8 md:grid-cols-2 md:items-start"
                >
                  <div
                    className={`absolute left-6 top-0 z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-center text-xs font-semibold leading-5 text-slate-950 shadow-sm md:left-1/2 ${
                      event.date ? "" : "text-slate-400"
                    }`}
                  >
                    {event.date ? formatShortDate(event.date) : "Data"}
                  </div>

                  <div className={isLeft ? "md:pr-16" : "md:col-start-2 md:pl-16"}>
                    <div className="ml-16 rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm md:ml-0">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          
                          <h4 className="mt-3 text-2xl font-light tracking-[-0.035em] text-slate-950">
                            {event.title || "Implementação sem título"}
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-2">
  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
    {event.priority || "Prioridade"}
  </span>
</div>
                      </div>

                      <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                        {event.description || "Descrição não informada."}
                      </p>

                      {event.dependency && (
  <div className="mt-4">
    <InfoBlock
      title="Dependência"
      content={event.dependency}
    />
  </div>
)}

                      
                      {event.sprints.length > 0 && (
                        <div className="mt-7">
                          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                            Sprints
                          </p>

                          <div className="mt-4 space-y-4">
                            {event.sprints.map((sprint, sprintIndex) => (
                              <TimelineSprintCard
                                key={`${event.title}-${sprint.title}-${sprintIndex}`}
                                sprint={sprint}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={isLeft ? "hidden md:block" : "hidden md:block md:col-start-1 md:row-start-1"} />
                </div>
              );
            })}
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Riscos
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Pontos de atenção
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Estes pontos devem ser acompanhados para reduzir atrasos, retrabalho
            e impactos na execução do planejamento.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock title="Riscos e cuidados" content={dataToShow.risks} />
        </div>
      </article>

      {timelineData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {timelineData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function ContentCalendarPresentation({ section }: { section: Section }) {
  const [calendarData, setCalendarData] =
    useState<ContentCalendarPresentationData>({
      calendarTitle: "",
      platform: "",
      calendarLink: "",
      calendarFunction: "",
      usageGuidelines: "",
      responsiblePeople: "",
      updateFrequency: "",
      updateRoutine: "",
      notionStructure: "",
      approvalFlowDescription: "",
      approvalSteps: [],
      approvalRules: "",
      driveMainFolderTitle: "",
      driveMainFolderLink: "",
      driveFolderStructure: "",
      driveFolders: [],
      strategicObservations: "",
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeApprovalSteps(
    value: unknown
  ): ContentCalendarApprovalStepPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            description: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          description: getString(record, [
            "description",
            "descricao",
            "descrição",
          ]),
        };
      })
      .filter((item) => item.title.trim() || item.description.trim());
  }

  function normalizeDriveFolders(
    value: unknown
  ): ContentCalendarDriveFolderPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            description: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          description: getString(record, [
            "description",
            "descricao",
            "descrição",
          ]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() || item.description.trim() || item.link.trim()
      );
  }

  function normalizeReferences(
    value: unknown
  ): ContentCalendarReferencePresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-calendario-de-conteudo"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setCalendarData({
        calendarTitle: getString(source, [
          "calendarTitle",
          "tituloCalendario",
          "títuloCalendario",
        ]),
        platform: getString(source, ["platform", "plataforma"]),
        calendarLink: getString(source, [
          "calendarLink",
          "linkCalendario",
          "linkDoCalendario",
        ]),
        calendarFunction: getString(source, [
          "calendarFunction",
          "funcaoCalendario",
          "funçãoCalendario",
        ]),
        usageGuidelines: getString(source, [
          "usageGuidelines",
          "orientacoesDeUso",
          "orientaçõesDeUso",
          "comoUsar",
        ]),
        responsiblePeople: getString(source, [
          "responsiblePeople",
          "responsaveis",
          "responsáveis",
        ]),
        updateFrequency: getString(source, [
          "updateFrequency",
          "frequenciaAtualizacao",
          "frequênciaAtualização",
        ]),
        updateRoutine: getString(source, [
          "updateRoutine",
          "rotinaAtualizacao",
          "rotinaAtualização",
        ]),
        notionStructure: getString(source, [
          "notionStructure",
          "estruturaNotion",
          "estruturaDoNotion",
        ]),
        approvalFlowDescription: getString(source, [
          "approvalFlowDescription",
          "descricaoFluxoAprovacao",
          "descriçãoFluxoAprovação",
        ]),
        approvalSteps: normalizeApprovalSteps(
          source.approvalSteps || source.etapasDeAprovacao
        ),
        approvalRules: getString(source, [
          "approvalRules",
          "regrasDeAprovacao",
          "regrasDeAprovação",
        ]),
        driveMainFolderTitle: getString(source, [
          "driveMainFolderTitle",
          "nomePastaPrincipal",
          "pastaPrincipalDrive",
        ]),
        driveMainFolderLink: getString(source, [
          "driveMainFolderLink",
          "linkPastaPrincipal",
          "linkDrive",
        ]),
        driveFolderStructure: getString(source, [
          "driveFolderStructure",
          "estruturaDrive",
          "estruturaDaPasta",
        ]),
        driveFolders: normalizeDriveFolders(
          source.driveFolders || source.pastasDrive || source.subpastas
        ),
        strategicObservations: getString(source, [
          "strategicObservations",
          "observacoesEstrategicas",
          "observaçõesEstratégicas",
        ]),
        references: normalizeReferences(
          source.references || source.referencias || source.referências
        ),
      });
    } catch {
      setCalendarData({
        calendarTitle: "",
        platform: "",
        calendarLink: "",
        calendarFunction: "",
        usageGuidelines: "",
        responsiblePeople: "",
        updateFrequency: "",
        updateRoutine: "",
        notionStructure: "",
        approvalFlowDescription: "",
        approvalSteps: [],
        approvalRules: "",
        driveMainFolderTitle: "",
        driveMainFolderLink: "",
        driveFolderStructure: "",
        driveFolders: [],
        strategicObservations: "",
        references: [],
      });
    }
  }, []);

  const dataToShow = {
    calendarTitle:
      calendarData.calendarTitle || "Calendário editorial e operacional",
    platform: calendarData.platform || "Notion",
    calendarLink: calendarData.calendarLink,
    calendarFunction:
      calendarData.calendarFunction ||
      "O calendário será usado para organizar a produção editorial, acompanhar o andamento dos conteúdos, registrar responsáveis, centralizar prazos e facilitar a aprovação antes da publicação.",
    usageGuidelines:
      calendarData.usageGuidelines ||
      "Atualizar o calendário conforme o ritmo de produção, manter status sempre visível, registrar responsáveis, anexar links dos criativos, sinalizar conteúdos pendentes de aprovação e marcar conteúdos publicados com seus respectivos links.",
    responsiblePeople:
      calendarData.responsiblePeople ||
      "Responsáveis pela produção, revisão, aprovação, agendamento e acompanhamento dos conteúdos.",
    updateFrequency: calendarData.updateFrequency || "Semanal",
    updateRoutine:
      calendarData.updateRoutine ||
      "Revisar status das publicações, atualizar responsáveis, conferir conteúdos em aprovação, registrar ajustes solicitados e fechar o calendário do próximo período com antecedência.",
    notionStructure:
      calendarData.notionStructure ||
      "Colunas recomendadas: data, canal, formato, linha editorial, tema, legenda, status, responsável, link do criativo, link do conteúdo publicado, campanha relacionada, prioridade e observações.",
    approvalFlowDescription:
      calendarData.approvalFlowDescription ||
      "Os conteúdos devem passar por produção, revisão, ajustes, aprovação, agendamento e publicação. Cada etapa deve ficar registrada para evitar retrabalho e perda de prazo.",
    approvalSteps: calendarData.approvalSteps.length
      ? calendarData.approvalSteps
      : [
          {
            title: "Produção",
            description:
              "Conteúdo entra em produção com base no planejamento, linha editorial, formato, canal e data prevista.",
          },
          {
            title: "Revisão",
            description:
              "Conteúdo é revisado para conferir clareza, tom de voz, estratégia, legenda, criativo e adequação ao canal.",
          },
          {
            title: "Aprovação",
            description:
              "Cliente ou responsável valida o conteúdo dentro do prazo combinado para seguir para agendamento.",
          },
          {
            title: "Publicado",
            description:
              "Conteúdo publicado é marcado no calendário, com link da publicação e observações de acompanhamento.",
          },
        ],
    approvalRules:
      calendarData.approvalRules ||
      "Definir prazo mínimo para aprovação, responsáveis por validar cada tipo de conteúdo, forma de solicitar ajustes, limite de alterações e regra para conteúdos urgentes.",
    driveMainFolderTitle:
      calendarData.driveMainFolderTitle || "Pasta principal do cliente",
    driveMainFolderLink: calendarData.driveMainFolderLink,
    driveFolderStructure:
      calendarData.driveFolderStructure ||
      "A pasta do cliente no Drive deve centralizar todos os arquivos operacionais do projeto, organizados por identidade visual, conteúdos gravados, materiais ricos, criativos para anúncios, documentos do projeto e reuniões.",
    driveFolders: calendarData.driveFolders.length
      ? calendarData.driveFolders
      : [
          {
            title: "01 - Identidade Visual",
            description: "Logo, paleta de cores, fontes e arquivos visuais da marca.",
            link: "",
          },
          {
            title: "02 - Conteúdo Gravado",
            description:
              "Vídeos, reels, conteúdos para YouTube, stories e materiais gravados.",
            link: "",
          },
          {
            title: "03 - Materiais Ricos",
            description:
              "E-books, apresentações, PDFs, planilhas e materiais de apoio.",
            link: "",
          },
          {
            title: "04 - Criativos para Anúncios",
            description:
              "Criativos de Meta Ads, YouTube Ads, campanhas e variações para tráfego pago.",
            link: "",
          },
          {
            title: "05 - Documentos do Projeto",
            description:
              "Contrato, notas fiscais, relatórios, documentos estratégicos e arquivos administrativos.",
            link: "",
          },
          {
            title: "06 - Reuniões",
            description:
              "Gravações, atas, alinhamentos, materiais de reunião e decisões importantes.",
            link: "",
          },
        ],
    strategicObservations:
      calendarData.strategicObservations ||
      "O planejamento estratégico fica no site. O Notion deve ser usado como ferramenta operacional para calendário, produção, status e aprovação. O Drive deve guardar arquivos, criativos, gravações, documentos e materiais de referência.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta a organização operacional do calendário de conteúdo, incluindo calendário no Notion, rotina de atualização, fluxo de aprovação e estrutura de pastas no Drive."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Calendário operacional
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            {dataToShow.calendarTitle}
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O calendário será utilizado como ferramenta de execução, acompanhamento
            e aprovação dos conteúdos. O planejamento estratégico permanece no site,
            enquanto o Notion organiza a produção do dia a dia.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <InfoBlock title="Plataforma" content={dataToShow.platform} />

          <InfoBlock
            title="Frequência de atualização"
            content={dataToShow.updateFrequency}
          />

          <InfoBlock
            title="Responsáveis"
            content={dataToShow.responsiblePeople}
          />
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
  <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
    Acesso principal
  </p>

  <h4 className="mt-3 text-2xl font-light tracking-[-0.035em] text-slate-950">
    Calendário no Notion
  </h4>

  <p className="mt-3 text-base leading-8 text-slate-600">
    Acesse o calendário operacional para acompanhar produção, revisão,
    aprovação, agendamento e publicação dos conteúdos.
  </p>

  <div className="mt-5 flex flex-wrap gap-3">
    {dataToShow.calendarLink ? (
      <a
        href={dataToShow.calendarLink}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Abrir calendário no Notion
      </a>
    ) : (
      <span className="rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500">
        Link do calendário não informado
      </span>
    )}

    {dataToShow.driveMainFolderLink && (
      <a
        href={dataToShow.driveMainFolderLink}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        Abrir pasta do cliente
      </a>
    )}
  </div>
</div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Função e rotina
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Como o calendário será usado
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O calendário organiza a produção, reduz ruídos operacionais e
            centraliza o acompanhamento dos conteúdos em andamento, aprovados,
            agendados e publicados.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Função do calendário"
            content={dataToShow.calendarFunction}
          />

          <InfoBlock
            title="Como usar"
            content={dataToShow.usageGuidelines}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Rotina de atualização"
              content={dataToShow.updateRoutine}
            />
          </div>
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Notion
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Estrutura recomendada do calendário
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A estrutura do Notion deve facilitar produção, revisão, aprovação,
            agendamento e acompanhamento dos conteúdos.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock
            title="Colunas e visualizações recomendadas"
            content={dataToShow.notionStructure}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Aprovação
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Fluxo de aprovação dos conteúdos
          </h3>

          <p className="mt-5 whitespace-pre-line text-lg leading-9 text-slate-600">
            {dataToShow.approvalFlowDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dataToShow.approvalSteps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h4 className="mt-5 text-xl font-semibold text-slate-950">
                {step.title || "Etapa"}
              </h4>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {step.description || "Descrição da etapa não informada."}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <InfoBlock title="Regras de aprovação" content={dataToShow.approvalRules} />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Drive
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Organização da pasta do cliente
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            O Drive centraliza os arquivos operacionais do projeto, enquanto o
            Notion organiza o calendário e o site mantém o planejamento
            estratégico.
          </p>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
            Pasta principal
          </p>

          <h4 className="mt-4 text-3xl font-light tracking-[-0.045em] text-slate-950">
            {dataToShow.driveMainFolderTitle}
          </h4>

          <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
            {dataToShow.driveFolderStructure}
          </p>

          {dataToShow.driveMainFolderLink && (
            <a
              href={dataToShow.driveMainFolderLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Abrir pasta do cliente
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dataToShow.driveFolders.map((folder, index) => (
            <div
              key={`${folder.title}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                Pasta {String(index + 1).padStart(2, "0")}
              </p>

              <h4 className="mt-4 text-xl font-semibold text-slate-950">
                {folder.title || "Pasta"}
              </h4>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {folder.description || "Descrição não informada."}
              </p>

              <div className="mt-5">
  {folder.link ? (
    <a
      href={folder.link}
      target="_blank"
      rel="noreferrer"
      className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
    >
      Abrir pasta
    </a>
  ) : (
    <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400">
      Link não informado
    </span>
  )}
</div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Observações
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Cuidados operacionais
          </h3>
        </div>

        <div className="mt-10">
          <InfoBlock
            title="Observações estratégicas"
            content={dataToShow.strategicObservations}
          />
        </div>
      </article>

      {calendarData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {calendarData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function MetricsPresentation({ section }: { section: Section }) {
  const [metricsData, setMetricsData] = useState<MetricsPresentationData>({
    indicators: [],
    mainIndicators: "",
    journeyMetrics: [],
    channelMetrics: [],
    tools: [],
    analysisRoutine: "",
    decisionCriteria: "",
    reportingFormat: "",
    strategicObservations: "",
    references: [],
  });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizeIndicators(
    value: unknown
  ): MetricsIndicatorPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            name: "",
            type: "",
            channel: "",
            goal: "",
            frequency: "",
            tool: "",
            responsible: "",
            interpretation: "",
            decisionCriteria: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          name: getString(record, ["name", "nome", "indicator", "indicador"]),
          type: getString(record, ["type", "tipo"]),
          channel: getString(record, ["channel", "canal"]),
          goal: getString(record, ["goal", "meta", "metaEsperada"]),
          frequency: getString(record, [
            "frequency",
            "frequencia",
            "frequência",
          ]),
          tool: getString(record, ["tool", "ferramenta"]),
          responsible: getString(record, [
            "responsible",
            "responsavel",
            "responsável",
          ]),
          interpretation: getString(record, [
            "interpretation",
            "interpretacao",
            "interpretação",
          ]),
          decisionCriteria: getString(record, [
            "decisionCriteria",
            "criterioDecisao",
            "critérioDecisão",
            "decisao",
            "decisão",
          ]),
        };
      })
      .filter(
        (item) =>
          item.name.trim() ||
          item.type.trim() ||
          item.channel.trim() ||
          item.goal.trim() ||
          item.frequency.trim() ||
          item.tool.trim() ||
          item.responsible.trim() ||
          item.interpretation.trim() ||
          item.decisionCriteria.trim()
      );
  }

  function normalizeJourneyMetrics(
    value: unknown
  ): MetricsJourneyPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            stage: "",
            metrics: "",
            purpose: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          stage: getString(record, ["stage", "etapa", "fase"]),
          metrics: getString(record, ["metrics", "metricas", "métricas"]),
          purpose: getString(record, [
            "purpose",
            "funcao",
            "função",
            "objetivo",
          ]),
        };
      })
      .filter(
        (item) =>
          item.stage.trim() || item.metrics.trim() || item.purpose.trim()
      );
  }

  function normalizeChannelMetrics(
    value: unknown
  ): MetricsChannelPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            channel: "",
            metrics: "",
            tool: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          channel: getString(record, ["channel", "canal"]),
          metrics: getString(record, ["metrics", "metricas", "métricas"]),
          tool: getString(record, ["tool", "ferramenta", "fonte"]),
        };
      })
      .filter(
        (item) =>
          item.channel.trim() || item.metrics.trim() || item.tool.trim()
      );
  }

  function normalizeTools(value: unknown): MetricsToolPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            name: "",
            purpose: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          name: getString(record, ["name", "nome", "tool", "ferramenta"]),
          purpose: getString(record, [
            "purpose",
            "funcao",
            "função",
            "objetivo",
          ]),
        };
      })
      .filter((item) => item.name.trim() || item.purpose.trim());
  }

  function normalizeReferences(value: unknown): MetricsReferencePresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-metricas-e-indicadores"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setMetricsData({
        indicators: normalizeIndicators(source.indicators || source.indicadores),
        mainIndicators: getString(source, [
          "mainIndicators",
          "indicadoresPrincipais",
        ]),
        journeyMetrics: normalizeJourneyMetrics(
          source.journeyMetrics || source.metricasPorJornada
        ),
        channelMetrics: normalizeChannelMetrics(
          source.channelMetrics || source.metricasPorCanal
        ),
        tools: normalizeTools(source.tools || source.ferramentas),
        analysisRoutine: getString(source, [
          "analysisRoutine",
          "rotinaAnalise",
          "rotinaDeAnalise",
          "rotinaDeAnálise",
        ]),
        decisionCriteria: getString(source, [
          "decisionCriteria",
          "criteriosDecisao",
          "critériosDecisão",
          "criteriosDeDecisao",
          "critériosDeDecisão",
        ]),
        reportingFormat: getString(source, [
          "reportingFormat",
          "formatoRelatorio",
          "formatoDeRelatorio",
          "formatoDeRelatório",
        ]),
        strategicObservations: getString(source, [
          "strategicObservations",
          "observacoesEstrategicas",
          "observaçõesEstratégicas",
        ]),
        references: normalizeReferences(
          source.references || source.referencias || source.referências
        ),
      });
    } catch {
      setMetricsData({
        indicators: [],
        mainIndicators: "",
        journeyMetrics: [],
        channelMetrics: [],
        tools: [],
        analysisRoutine: "",
        decisionCriteria: "",
        reportingFormat: "",
        strategicObservations: "",
        references: [],
      });
    }
  }, []);

  const dataToShow = {
    indicators: metricsData.indicators.length
      ? metricsData.indicators
      : [
          {
            name: "Leads gerados",
            type: "Conversão",
            channel: "Geral",
            goal: "Meta não informada",
            frequency: "Semanal",
            tool: "Ferramenta não informada",
            responsible: "Responsável não informado",
            interpretation:
              "Este indicador mostra a capacidade da estratégia de transformar atenção em contatos qualificados.",
            decisionCriteria:
              "Se o volume estiver baixo, revisar oferta, página, tráfego, criativo e canais de captação.",
          },
        ],
    mainIndicators:
      metricsData.mainIndicators ||
      "Leads gerados, custo por lead, taxa de conversão, vendas, faturamento, alcance, engajamento, tráfego do site, crescimento da audiência e taxa de resposta no WhatsApp.",
    journeyMetrics: metricsData.journeyMetrics.length
      ? metricsData.journeyMetrics
      : [
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
              "Curtidas, comentários, salvamentos, compartilhamentos, respostas, mensagens, retenção e interações qualificadas.",
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
    channelMetrics: metricsData.channelMetrics.length
      ? metricsData.channelMetrics
      : [
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
    tools: metricsData.tools.length
      ? metricsData.tools
      : [
          {
            name: "Google Analytics",
            purpose:
              "Acompanhar tráfego, origem dos acessos, páginas e comportamento no site.",
          },
          {
            name: "Google Search Console",
            purpose:
              "Acompanhar desempenho orgânico, palavras-chave, cliques e impressões.",
          },
          {
            name: "Meta Business Suite",
            purpose:
              "Acompanhar desempenho de Instagram, Facebook, anúncios e interações.",
          },
          {
            name: "Dashboard ou CRM",
            purpose:
              "Organizar indicadores, histórico, análises e decisões tomadas a partir dos dados.",
          },
        ],
    analysisRoutine:
      metricsData.analysisRoutine ||
      "Reunião semanal para verificar campanhas, revisão mensal de conteúdo, análise trimestral de crescimento, atualização do dashboard toda sexta-feira e definição de próximos testes com base nos dados.",
    decisionCriteria:
      metricsData.decisionCriteria ||
      "Se o custo por lead estiver alto, revisar público e criativo. Se o engajamento cair, testar novos formatos. Se o tráfego do site crescer sem conversão, revisar página e CTA. Se o conteúdo gerar muitos salvamentos, transformar em série.",
    reportingFormat:
      metricsData.reportingFormat ||
      "Os dados devem ser organizados em um relatório simples, com principais indicadores, leitura estratégica, decisões tomadas, próximos testes e pontos de atenção.",
    strategicObservations:
      metricsData.strategicObservations ||
      "As métricas devem orientar decisões, não apenas registrar números. O foco é entender quais canais geram atenção, quais conteúdos criam relacionamento, quais campanhas captam leads e quais ações produzem vendas.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção apresenta os indicadores que serão acompanhados, a rotina de análise, os critérios de decisão e as ferramentas usadas para medir o desempenho da estratégia."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Visão geral
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Indicadores principais do projeto
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os indicadores devem mostrar se a estratégia está gerando atenção,
            relacionamento, captação, conversão e crescimento real.
          </p>
        </div>

        <div className="mt-10">
          <InfoBlock
            title="Indicadores principais"
            content={dataToShow.mainIndicators}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Indicadores individuais
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            O que será acompanhado
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada indicador abaixo mostra a métrica, o canal, a meta, a frequência
            de análise, a ferramenta utilizada e a decisão esperada a partir do
            dado.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {dataToShow.indicators.map((indicator, index) => (
            <div
              key={`${indicator.name}-${index}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                    Indicador {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-3 text-2xl font-light tracking-[-0.035em] text-slate-950">
                    {indicator.name || "Indicador sem nome"}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                    {indicator.type || "Tipo"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {indicator.channel || "Canal"}
                  </span>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-4">
                <InfoBlock
                  title="Meta"
                  content={indicator.goal || "Meta não informada"}
                />

                <InfoBlock
                  title="Frequência"
                  content={indicator.frequency || "Não informada"}
                />

                <InfoBlock
                  title="Ferramenta"
                  content={indicator.tool || "Não informada"}
                />

                <InfoBlock
                  title="Responsável"
                  content={indicator.responsible || "Não informado"}
                />
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <InfoBlock
                  title="Como interpretar"
                  content={
                    indicator.interpretation ||
                    "Interpretação não informada."
                  }
                />

                <InfoBlock
                  title="Decisão a partir do indicador"
                  content={
                    indicator.decisionCriteria ||
                    "Critério de decisão não informado."
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Jornada
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Métricas por etapa da jornada
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            A leitura dos dados precisa considerar o estágio da jornada. Nem toda
            métrica mede venda. Algumas medem atenção, outras relacionamento,
            captação, nutrição ou conversão.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dataToShow.journeyMetrics.map((item, index) => (
            <div
              key={`${item.stage}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                Etapa {String(index + 1).padStart(2, "0")}
              </p>

              <h4 className="mt-4 text-xl font-semibold text-slate-950">
                {item.stage || "Etapa da jornada"}
              </h4>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Métricas
                </p>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {item.metrics || "Métricas não informadas."}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Função
                </p>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {item.purpose || "Função não informada."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Canais
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Métricas por canal
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Cada canal possui indicadores próprios. A análise deve respeitar o
            papel de cada canal dentro da estratégia.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dataToShow.channelMetrics.map((item, index) => (
            <div
              key={`${item.channel}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h4 className="text-xl font-semibold text-slate-950">
                {item.channel || "Canal"}
              </h4>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Métricas acompanhadas
                </p>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {item.metrics || "Métricas não informadas."}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                  Ferramenta ou fonte de dados
                </p>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {item.tool || "Ferramenta não informada."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Ferramentas
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Fontes de dados e acompanhamento
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As ferramentas abaixo serão usadas para acompanhar desempenho,
            consolidar dados e orientar as decisões estratégicas.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dataToShow.tools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                Ferramenta {String(index + 1).padStart(2, "0")}
              </p>

              <h4 className="mt-4 text-xl font-semibold text-slate-950">
                {tool.name || "Ferramenta"}
              </h4>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {tool.purpose || "Função não informada."}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Análise
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Rotina, decisão e relatório
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os dados precisam ser transformados em leitura estratégica, decisões
            práticas e próximos testes.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Rotina de análise"
            content={dataToShow.analysisRoutine}
          />

          <InfoBlock
            title="Critérios de decisão"
            content={dataToShow.decisionCriteria}
          />

          <div className="md:col-span-2">
            <InfoBlock
              title="Formato de relatório"
              content={dataToShow.reportingFormat}
            />
          </div>

          <div className="md:col-span-2">
            <InfoBlock
              title="Observações estratégicas"
              content={dataToShow.strategicObservations}
            />
          </div>
        </div>
      </article>

      {metricsData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {metricsData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function AdditionalGuidelinesPresentation({ section }: { section: Section }) {
  const [guidelinesData, setGuidelinesData] =
    useState<AdditionalGuidelinesPresentationData>({
      executionGuidelines: "",
      attentionPoints: "",
      pendingItems: [],
      nextSteps: [],
      teamRecommendations: [],
      finalObservations: "",
      references: [],
    });

  function getString(source: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
      const value = source[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    return "";
  }

  function normalizePendingItems(
    value: unknown
  ): AdditionalPendingItemPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            description: "",
            responsible: "",
            status: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          description: getString(record, [
            "description",
            "descricao",
            "descrição",
          ]),
          responsible: getString(record, [
            "responsible",
            "responsavel",
            "responsável",
          ]),
          status: getString(record, ["status"]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.description.trim() ||
          item.responsible.trim() ||
          item.status.trim()
      );
  }

  function normalizeNextSteps(
    value: unknown
  ): AdditionalNextStepPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            description: "",
            priority: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          description: getString(record, [
            "description",
            "descricao",
            "descrição",
          ]),
          priority: getString(record, ["priority", "prioridade"]),
        };
      })
      .filter(
        (item) =>
          item.title.trim() ||
          item.description.trim() ||
          item.priority.trim()
      );
  }

  function normalizeTeamRecommendations(
    value: unknown
  ): AdditionalTeamRecommendationPresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            area: "",
            recommendation: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          area: getString(record, ["area", "responsible", "responsavel", "responsável"]),
          recommendation: getString(record, [
            "recommendation",
            "recomendacao",
            "recomendação",
            "description",
            "descricao",
            "descrição",
          ]),
        };
      })
      .filter((item) => item.area.trim() || item.recommendation.trim());
  }

  function normalizeReferences(
    value: unknown
  ): AdditionalReferencePresentation[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .map((item) => {
        if (!item || typeof item !== "object") {
          return {
            title: "",
            link: "",
          };
        }

        const record = item as Record<string, unknown>;

        return {
          title: getString(record, ["title", "titulo", "título", "name", "nome"]),
          link: getString(record, ["link", "url"]),
        };
      })
      .filter((item) => item.title.trim() || item.link.trim());
  }

  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "metodo-epc-demo-orientacoes-adicionais"
    );

    if (!savedData) {
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      const source = parsed.fields || parsed;

      setGuidelinesData({
        executionGuidelines: getString(source, [
          "executionGuidelines",
          "orientacoesExecucao",
          "orientaçõesExecução",
          "orientacoesGerais",
          "orientaçõesGerais",
        ]),
        attentionPoints: getString(source, [
          "attentionPoints",
          "pontosDeAtencao",
          "pontosDeAtenção",
        ]),
        pendingItems: normalizePendingItems(
          source.pendingItems || source.pendencias || source.pendências
        ),
        nextSteps: normalizeNextSteps(
          source.nextSteps || source.proximosPassos || source.próximosPassos
        ),
        teamRecommendations: normalizeTeamRecommendations(
          source.teamRecommendations ||
            source.recomendacoesEquipe ||
            source.recomendaçõesEquipe
        ),
        finalObservations: getString(source, [
          "finalObservations",
          "observacoesFinais",
          "observaçõesFinais",
        ]),
        references: normalizeReferences(
          source.references || source.referencias || source.referências
        ),
      });
    } catch {
      setGuidelinesData({
        executionGuidelines: "",
        attentionPoints: "",
        pendingItems: [],
        nextSteps: [],
        teamRecommendations: [],
        finalObservations: "",
        references: [],
      });
    }
  }, []);

  const dataToShow = {
    executionGuidelines:
      guidelinesData.executionGuidelines ||
      "Use este campo para registrar orientações gerais que devem ser consideradas durante a execução do planejamento, como cuidados de linguagem, prioridades, alinhamentos, limites de escopo, ritmo de aprovação e pontos importantes para a equipe.",
    attentionPoints:
      guidelinesData.attentionPoints ||
      "Liste aqui riscos, pontos sensíveis, materiais faltantes, acessos pendentes, aprovações necessárias, dependências externas ou qualquer situação que possa impactar a execução do planejamento.",
    pendingItems: guidelinesData.pendingItems.length
      ? guidelinesData.pendingItems
      : [
          {
            title: "Pendência não informada",
            description:
              "Liste o que ainda precisa ser enviado, aprovado, configurado ou decidido para que a execução avance.",
            responsible: "Responsável não informado",
            status: "Pendente",
          },
        ],
    nextSteps: guidelinesData.nextSteps.length
      ? guidelinesData.nextSteps
      : [
          {
            title: "Próximo passo não informado",
            description:
              "Registre a próxima ação necessária após a entrega ou aprovação do planejamento.",
            priority: "Alta",
          },
        ],
    teamRecommendations: guidelinesData.teamRecommendations.length
      ? guidelinesData.teamRecommendations
      : [
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
      guidelinesData.finalObservations ||
      "O planejamento deve ser usado como guia estratégico. Ajustes podem ser feitos ao longo da execução com base em dados, aprovações, mudanças de prioridade e aprendizados gerados pelas campanhas e conteúdos.",
  };

  function InfoBlock({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    return (
      <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-slate-200">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          {title}
        </p>

        <p className="mt-3 whitespace-pre-line break-words text-base leading-8 text-slate-600">
          {content}
        </p>
      </div>
    );
  }

  function getPriorityStyle(priority: string) {
    const normalizedPriority = priority.toLowerCase();

    if (normalizedPriority.includes("alta")) {
      return "bg-slate-950 text-white";
    }

    if (normalizedPriority.includes("média") || normalizedPriority.includes("media")) {
      return "bg-slate-200 text-slate-700";
    }

    return "bg-slate-100 text-slate-500";
  }

  function getStatusStyle(status: string) {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus.includes("concluído") || normalizedStatus.includes("concluido")) {
      return "bg-emerald-100 text-emerald-700";
    }

    if (normalizedStatus.includes("andamento")) {
      return "bg-sky-100 text-sky-700";
    }

    if (normalizedStatus.includes("aguardando")) {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-slate-100 text-slate-600";
  }

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12 xl:p-14">
      <SectionTitle
        section={section}
        customDescription="Esta seção reúne orientações finais para a execução do planejamento, incluindo pontos de atenção, pendências, próximos passos, recomendações para a equipe e referências complementares."
      />

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Orientações finais
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Diretrizes para execução
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As orientações adicionais funcionam como um fechamento operacional do
            planejamento. Elas ajudam a equipe e o cliente a entenderem cuidados,
            pendências e prioridades antes de iniciar a execução.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <InfoBlock
            title="Orientações gerais"
            content={dataToShow.executionGuidelines}
          />

          <InfoBlock
            title="Pontos de atenção"
            content={dataToShow.attentionPoints}
          />
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Pendências
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            O que ainda precisa ser resolvido
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As pendências indicam o que precisa ser enviado, aprovado,
            configurado ou decidido para que a execução avance sem atraso.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dataToShow.pendingItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Pendência {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-4 text-xl font-semibold text-slate-950">
                    {item.title || "Pendência sem título"}
                  </h4>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status || "Pendente"}
                </span>
              </div>

              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                {item.description || "Descrição não informada."}
              </p>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Responsável
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-700">
                  {item.responsible || "Responsável não informado"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Próximos passos
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Ações após a entrega do planejamento
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            Os próximos passos mostram a sequência de ações que devem acontecer
            depois da entrega, aprovação ou revisão final do planejamento.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {dataToShow.nextSteps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                    Ação {String(index + 1).padStart(2, "0")}
                  </p>

                  <h4 className="mt-4 text-xl font-semibold text-slate-950">
                    {step.title || "Próximo passo sem título"}
                  </h4>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                    step.priority
                  )}`}
                >
                  {step.priority || "Prioridade"}
                </span>
              </div>

              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                {step.description || "Descrição não informada."}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Equipe
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Recomendações por área
          </h3>

          <p className="mt-5 text-lg leading-9 text-slate-600">
            As recomendações abaixo ajudam cada área envolvida a executar o
            planejamento com mais clareza, coerência e alinhamento estratégico.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dataToShow.teamRecommendations.map((item, index) => (
            <div
              key={`${item.area}-${index}`}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                Área {String(index + 1).padStart(2, "0")}
              </p>

              <h4 className="mt-4 text-xl font-semibold text-slate-950">
                {item.area || "Área não informada"}
              </h4>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {item.recommendation || "Recomendação não informada."}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="border-b border-slate-200 py-12">
        <div className="max-w-[980px]">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
            Fechamento
          </p>

          <h3 className="mt-4 text-4xl font-light tracking-[-0.045em] text-slate-950">
            Observações finais
          </h3>
        </div>

        <div className="mt-10">
          <InfoBlock
            title="Orientação de fechamento"
            content={dataToShow.finalObservations}
          />
        </div>
      </article>

      {guidelinesData.references.length > 0 && (
        <article className="pt-12">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Referências externas
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {guidelinesData.references.map((reference, index) => (
                <a
                  key={`${reference.title}-${index}`}
                  href={reference.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {reference.title || "Referência"}
                  </p>

                  <p className="mt-2 break-words text-sm text-slate-500">
                    {reference.link || "Link não informado"}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

function GenericPresentation({ section }: { section: Section }) {
  const blocks = getPresentationBlocks(section.slug);

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
      <SectionTitle section={section} />

      <div className="mt-2">
        {blocks.map((block) => (
          <TextBlock key={block.title} block={block} />
        ))}
      </div>
    </section>
  );
}

function RenderSection({ section }: { section: Section }) {
  if (section.slug === "resumo-estrategico") {
    return <ResumoEstrategico />;
  }

  if (section.slug === "dna-do-especialista") {
    return <SpecialistPresentation section={section} />;
  }

  if (section.slug === "dna-da-empresa") {
    return <CompanyPresentation section={section} />;
  }

  if (section.slug === "dna-de-conteudo") {
    return <ContentDnaPresentation section={section} />;
  }

  if (section.slug === "tom-de-voz") {
    return <ToneVoicePresentation section={section} />;
  }

  if (section.slug === "identidade-visual") {
    return <VisualIdentityPresentation section={section} />;
  }

  if (section.slug === "objetivos-do-projeto") {
    return <ProjectObjectivesPresentation section={section} />;
  }

  if (section.slug === "referencias-e-concorrentes") {
    return <ReferencesCompetitorsPresentation section={section} />;
  }

  if (section.slug === "pesquisa-de-concorrencia") {
    return <CompetitorResearchPresentation section={section} />;
  }

  if (section.slug === "analise-swot") {
  return <SwotPresentation section={section} />;
}

if (section.slug === "palavras-chave") {
  return <KeywordsPresentation section={section} />;
}

if (section.slug === "personas") {
  return <PersonasPresentation section={section} />;
}

if (section.slug === "jornada-de-compra") {
  return <PurchaseJourneyPresentation section={section} />;
}

if (section.slug === "canais-digitais-atuais") {
  return <CurrentDigitalChannelsPresentation section={section} />;
}

if (section.slug === "funil-de-conteudo") {
  return <ContentFunnelPresentation section={section} />;
}

if (section.slug === "linhas-editoriais") {
  return <EditorialLinesPresentation section={section} />;
}

if (section.slug === "instagram") {
  return <InstagramPresentation section={section} />;
}

if (section.slug === "tiktok") {
  return <TikTokPresentation section={section} />;
}

if (section.slug === "youtube") {
  return <YouTubePresentation section={section} />;
}

if (section.slug === "facebook") {
  return <FacebookPresentation section={section} />;
}

if (section.slug === "linkedin") {
  return <LinkedInPresentation section={section} />;
}

if (section.slug === "whatsapp") {
  return <WhatsAppPresentation section={section} />;
}

if (section.slug === "blog") {
  return <BlogPresentation section={section} />;
}

if (section.slug === "pinterest") {
  return <PinterestPresentation section={section} />;
}

if (section.slug === "podcasts") {
  return <PodcastPresentation section={section} />;
}

if (section.slug === "lives") {
  return <LivesPresentation section={section} />;
}

if (section.slug === "materiais-educacionais") {
  return <EducationalMaterialsPresentation section={section} />;
}

if (section.slug === "estrategia-do-site") {
  return <SiteStrategyPresentation section={section} />;
}

if (section.slug === "mapa-do-site") {
  return <SiteMapPresentation section={section} />;
}

if (section.slug === "campanha-captacao-de-lead") {
  return <LeadCaptureCampaignPresentation section={section} />;
}

if (section.slug === "campanha-conversao-de-vendas") {
  return <SalesConversionCampaignPresentation section={section} />;
}

if (section.slug === "campanha-distribuicao-de-conteudo") {
  return <ContentDistributionCampaignPresentation section={section} />;
}

if (
  section.slug === "fluxo-de-automacao" ||
  section.slug === "fluxos-de-automacao"
) {
  return <AutomationSystemPresentation section={section} />;
}

if (section.slug === "linha-do-tempo") {
  return <TimelinePresentation section={section} />;
}

if (section.slug === "calendario-de-conteudo") {
  return <ContentCalendarPresentation section={section} />;
}

if (section.slug === "metricas-e-indicadores") {
  return <MetricsPresentation section={section} />;
}

if (section.slug === "orientacoes-adicionais") {
  return <AdditionalGuidelinesPresentation section={section} />;
}

  return <GenericPresentation section={section} />;
}

function handlePresentationLogout() {
  window.localStorage.removeItem("metodo-epc-client-auth");
  window.localStorage.removeItem("metodo-epc-strategist-auth");
  window.location.href = "/";
}



function OverviewCards({
  sections,
  onSelectSection,
  isStrategist,
}: {
  sections: Section[];
  onSelectSection: (slug: string) => void;
  isStrategist: boolean;
}) {
  const groupedSections = [
    {
      category: "Apresentação",
      items: [introSection],
    },
    ...moduleCategories.map((category) => ({
      category,
      items: sections.filter((section) => section.category === category),
    })),
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="relative min-h-[520px] overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url(${coverImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10 flex min-h-[520px] flex-col justify-between px-6 py-8 lg:px-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
  <MetodoLogo
    href="/"
    size="sm"
    className="brightness-0 invert"
  />

  <div className="flex flex-wrap items-center justify-end gap-3">
    {isStrategist && (
      <Link
        href="/admin/planejamentos/demo"
        className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
      >
        Voltar para planejamentos
      </Link>
    )}

    <a
      href="#modulos"
      className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
    >
      Ver módulos
    </a>

    <button
      type="button"
      onClick={handlePresentationLogout}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
    >
      <ExitIcon />
      Sair
    </button>
  </div>
</div>

          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium uppercase tracking-[0.55em] text-white/70">
              Planejamento Estratégico
            </p>

            <h1 className="mt-6 text-5xl font-light tracking-[-0.06em] text-white lg:text-7xl">
              {clientName}
            </h1>
          </div>
        </div>
      </section>

      <section id="modulos" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
              Planejamento
            </p>

            <h1 className="mt-3 text-5xl font-light tracking-[-0.05em] text-slate-950">
              {clientName}
            </h1>

            <p className="mt-5 max-w-[980px] text-lg leading-9 text-slate-600">
              Selecione abaixo o módulo que deseja visualizar. Cada área abre a
              apresentação estratégica correspondente.
            </p>
          </div>
 
        </div>

        <div className="space-y-14 border-t border-slate-200 pt-10">
          {groupedSections.map((group) => {
            if (!group.items.length) {
              return null;
            }

            return (
              <section key={group.category}>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  {group.category}
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((section) => (
                    <button
                      key={section.slug}
                      type="button"
                      onClick={() => onSelectSection(section.slug)}
                      className="group min-h-[150px] cursor-pointer rounded-[1.5rem] bg-white p-6 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/5 hover:ring-slate-300"
                    >
                      <div className="flex gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200 transition group-hover:bg-slate-950">
                          <IconImage slug={section.slug} hoverInvert />
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                            {displayTitle(section)}
                          </h2>

                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <MetodoFooter description="Planejamento estratégico desenvolvido pelo Método EPC." />
    </main>
  );
}

function DetailedPresentation({
  sections,
  activeSlug,
  setActiveSlug,
  onBackToOverview,
  isStrategist,
}: {
  sections: Section[];
  activeSlug: string;
  setActiveSlug: (slug: string) => void;
  onBackToOverview: () => void;
  isStrategist: boolean;
}) {
  const activeSection =
    sections.find((section) => section.slug === activeSlug) || introSection;

  const groupedSections = [
    {
      category: "Apresentação",
      items: [introSection],
    },
    ...moduleCategories.map((category) => ({
      category,
      items: sections.filter((section) => section.category === category),
    })),
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="relative min-h-[580px] overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverImageUrl})`,
          }}
        />

        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

        <div className="absolute left-6 right-6 top-6 z-20 flex flex-wrap items-center justify-between gap-4">
  <MetodoLogo
    href="/"
    size="sm"
    className="brightness-0 invert"
  />

  <div className="flex flex-wrap items-center justify-end gap-3">
    <button
      type="button"
      onClick={onBackToOverview}
      className="inline-flex cursor-pointer items-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
    >
      Ver módulos
    </button>

    <button
      type="button"
      onClick={handlePresentationLogout}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
    >
      <ExitIcon />
      Sair
    </button>
  </div>
</div>

        <div className="relative z-10 flex min-h-[580px] items-center justify-center px-6 py-16 text-center">
          <div className="max-w-5xl">
            <p className="text-xs font-medium uppercase tracking-[0.55em] text-white/70 sm:text-sm">
              Planejamento Estratégico
            </p>

            <h1 className="mt-6 text-5xl font-light tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              {clientName}
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 lg:px-10 lg:py-10 xl:px-14">
  <div className="mx-auto grid max-w-[1520px] gap-8 lg:grid-cols-[315px_minmax(0,1fr)] xl:gap-10">
          <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
                Navegação
              </p>

              <h2 className="mt-3 text-2xl font-light tracking-[-0.03em] text-slate-950">
                {clientName}
              </h2>

              <div className="mt-5 flex gap-3 rounded-[1.25rem] bg-slate-50 p-4 text-slate-600 ring-1 ring-slate-200">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-sm ring-1 ring-slate-200">
                  <ArrowIcon />
                </div>

                <p className="text-sm leading-6">
                  Selecione uma seção para visualizar a apresentação estratégica.
                </p>
              </div>
            </div>

            <nav className="mt-7 max-h-[700px] space-y-6 overflow-y-auto pr-1">
              {groupedSections.map((group) => (
                <div key={group.category}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {group.category}
                  </p>

                  <div className="space-y-1.5">
                    {group.items.map((section) => {
                      const isActive = section.slug === activeSlug;

                      return (
                        <button
                          key={section.slug}
                          type="button"
                          onClick={() => setActiveSlug(section.slug)}
                          className={cx(
                            "grid w-full grid-cols-[30px_1fr] items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                            isActive
                              ? "bg-slate-950 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                          )}
                        >
                          <span
                            className={cx(
                              "flex h-7 w-7 items-center justify-center rounded-full",
                              isActive ? "bg-white/10" : "bg-slate-100"
                            )}
                          >
                            <IconImage slug={section.slug} inverted={isActive} />
                          </span>

                          <span className="font-medium">
                            {displayTitle(section)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          <section className="min-w-0">
            <RenderSection section={activeSection} />
          </section>
        </div>
      </section>
      <MetodoFooter description="Planejamento estratégico desenvolvido pelo Método EPC." />
    </main>
  );
}

export default function ApresentacaoDemoPage() {
  const sections = useMemo<Section[]>(() => {
    return planningModules.map((module) => ({
      title: module.title,
      slug: module.slug,
      category: module.category,
      description: module.description,
    }));
  }, []);

  const [viewMode, setViewMode] = useState<"overview" | "detail">("overview");
  const [activeSlug, setActiveSlug] = useState("resumo-estrategico");
  const [isStrategist, setIsStrategist] = useState(false);

useEffect(() => {
  const strategistAuth = window.localStorage.getItem(
    "metodo-epc-strategist-auth"
  );

  setIsStrategist(strategistAuth === "true");
}, []);

  function openSection(slug: string) {
    setActiveSlug(slug);
    setViewMode("detail");
  }

  if (viewMode === "overview") {
  return (
    <OverviewCards
      sections={sections}
      onSelectSection={openSection}
      isStrategist={isStrategist}
    />
  );
}

  return (
    <DetailedPresentation
  sections={sections}
  activeSlug={activeSlug}
  setActiveSlug={setActiveSlug}
  onBackToOverview={() => setViewMode("overview")}
  isStrategist={isStrategist}
/>
  );
}