"use client";

import { ChangeEvent, useState, ReactNode } from "react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";
import type { InstagramData } from "@/types/instagram";
import {
  createEmptyInstagramFrequencyItem,
  createEmptyInstagramObjective,
  createEmptyInstagramStoryFormat,
  createEmptyInstagramContentFormat,
  createEmptyInstagramLanguageStructure,
  createEmptyInstagramHashtagCategory,
  createEmptyInstagramImageReference,
  createEmptyInstagramExternalReference,
  createEmptyInstagramProfileLink,
  createEmptyInstagramHighlight,
} from "@/lib/normalizeInstagramData";
import { uploadPlanningMedia } from "@/lib/uploadPlanningMedia";

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Direção estratégica", id: "instagram-strategic-direction" },
  { label: "Perfil", id: "instagram-profile" },
  { label: "Frequência e objetivos", id: "instagram-frequency-objectives" },
  { label: "Conteúdo", id: "instagram-content" },
  { label: "Linguagem", id: "instagram-language" },
  { label: "Direção visual", id: "instagram-visual" },
  { label: "Referências", id: "instagram-references" },
];

// ─── FormSection ──────────────────────────────────────────────────────────────

function FormSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-slate-100 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
      <div className="space-y-10">{children}</div>
    </section>
  );
}

// ─── SubSection ───────────────────────────────────────────────────────────────

function SubSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

type InstagramFormProps = {
  data: InstagramData;
  setData: Dispatch<SetStateAction<InstagramData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
  planningProjectId: string;
};

export default function InstagramForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
  planningProjectId,
}: InstagramFormProps) {
  // ─── Upload states ──────────────────────────────────────────────────────────

  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState(false);
  const [profilePhotoError, setProfilePhotoError] = useState("");
  const [uploadingRefIndex, setUploadingRefIndex] = useState<number | null>(null);
  const [refUploadErrors, setRefUploadErrors] = useState<Record<number, string>>({});
  const [uploadingHighlightId, setUploadingHighlightId] = useState<string | null>(null);
  const [highlightUploadErrors, setHighlightUploadErrors] = useState<Record<string, string>>({});

  // ─── Frequency handlers ─────────────────────────────────────────────────────

  function updateFrequencyItem(
    index: number,
    key: "format" | "quantity" | "period" | "notes",
    value: string
  ) {
    setData((current) => {
      const nextItems = [...current.publishing.frequencyItems];
      nextItems[index] = { ...nextItems[index], [key]: value };
      return {
        ...current,
        publishing: { ...current.publishing, frequencyItems: nextItems },
      };
    });
  }

  function addFrequencyItem() {
    setData((current) => ({
      ...current,
      publishing: {
        ...current.publishing,
        frequencyItems: [
          ...current.publishing.frequencyItems,
          { ...createEmptyInstagramFrequencyItem(), period: "por semana" },
        ],
      },
    }));
  }

  function removeFrequencyItem(index: number) {
    setData((current) => {
      const nextItems =
        current.publishing.frequencyItems.length > 1
          ? current.publishing.frequencyItems.filter((_, i) => i !== index)
          : [{ ...createEmptyInstagramFrequencyItem(), period: "por semana" }];
      return {
        ...current,
        publishing: { ...current.publishing, frequencyItems: nextItems },
      };
    });
  }

  // ─── Objectives handlers ─────────────────────────────────────────────────────

  function updateObjective(index: number, value: string) {
    setData((current) => {
      const nextItems = [...current.objectives];
      nextItems[index] = { ...nextItems[index], objective: value };
      return { ...current, objectives: nextItems };
    });
  }

  function addObjective() {
    setData((current) => ({
      ...current,
      objectives: [...current.objectives, createEmptyInstagramObjective()],
    }));
  }

  function removeObjective(index: number) {
    setData((current) => ({
      ...current,
      objectives:
        current.objectives.length > 1
          ? current.objectives.filter((_, i) => i !== index)
          : [createEmptyInstagramObjective()],
    }));
  }

  // ─── Stories handlers ────────────────────────────────────────────────────────

  function updateStory(index: number, value: string) {
    setData((current) => {
      const nextItems = [...current.contentArchitecture.stories];
      nextItems[index] = { ...nextItems[index], name: value };
      return {
        ...current,
        contentArchitecture: { ...current.contentArchitecture, stories: nextItems },
      };
    });
  }

  function addStory() {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        stories: [
          ...current.contentArchitecture.stories,
          createEmptyInstagramStoryFormat(),
        ],
      },
    }));
  }

  function removeStory(index: number) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        stories:
          current.contentArchitecture.stories.length > 1
            ? current.contentArchitecture.stories.filter((_, i) => i !== index)
            : [createEmptyInstagramStoryFormat()],
      },
    }));
  }

  // ─── Hashtags handlers ────────────────────────────────────────────────────────
  // All categories are flattened into a single list for display.
  // Setters traverse the nested structure using a cursor to find the correct
  // (catIndex, tagIndex) from the flat index.

  function updateHashtag(flatIndex: number, value: string) {
    setData((current) => {
      let cursor = 0;
      const nextHashtags = current.hashtags.map((cat) => ({
        ...cat,
        hashtags: cat.hashtags.map((h) => {
          const result = cursor === flatIndex ? value : h;
          cursor++;
          return result;
        }),
      }));
      return { ...current, hashtags: nextHashtags };
    });
  }

  function addHashtag() {
    setData((current) => {
      if (current.hashtags.length === 0) {
        return {
          ...current,
          hashtags: [{ ...createEmptyInstagramHashtagCategory(), hashtags: [""] }],
        };
      }
      const nextHashtags = [...current.hashtags];
      nextHashtags[0] = {
        ...nextHashtags[0],
        hashtags: [...nextHashtags[0].hashtags, ""],
      };
      return { ...current, hashtags: nextHashtags };
    });
  }

  function removeHashtag(flatIndex: number) {
    setData((current) => {
      let cursor = 0;
      const nextHashtags = current.hashtags
        .map((cat) => ({
          ...cat,
          hashtags: cat.hashtags.filter(() => {
            const keep = cursor !== flatIndex;
            cursor++;
            return keep;
          }),
        }))
        .filter((cat) => cat.hashtags.length > 0);

      if (nextHashtags.length === 0) {
        const base =
          current.hashtags.length > 0
            ? current.hashtags[0]
            : createEmptyInstagramHashtagCategory();
        return { ...current, hashtags: [{ ...base, hashtags: [""] }] };
      }
      return { ...current, hashtags: nextHashtags };
    });
  }

  const flatHashtags = data.hashtags.flatMap((cat) => cat.hashtags);

  // ─── Reels (formats) handlers ─────────────────────────────────────────────────

  function updateReel(index: number, value: string) {
    setData((current) => {
      const nextItems = [...current.contentArchitecture.formats];
      nextItems[index] = { ...nextItems[index], name: value };
      return {
        ...current,
        contentArchitecture: { ...current.contentArchitecture, formats: nextItems },
      };
    });
  }

  function addReel() {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        formats: [
          ...current.contentArchitecture.formats,
          createEmptyInstagramContentFormat(),
        ],
      },
    }));
  }

  function removeReel(index: number) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        formats:
          current.contentArchitecture.formats.length > 1
            ? current.contentArchitecture.formats.filter((_, i) => i !== index)
            : [createEmptyInstagramContentFormat()],
      },
    }));
  }

  // ─── Language structures handlers ─────────────────────────────────────────────

  function updateLanguageStructure(index: number, value: string) {
    setData((current) => {
      const nextItems = [...current.languageStructures];
      nextItems[index] = { ...nextItems[index], howItAppears: value };
      return { ...current, languageStructures: nextItems };
    });
  }

  function addLanguageStructure() {
    setData((current) => ({
      ...current,
      languageStructures: [
        ...current.languageStructures,
        createEmptyInstagramLanguageStructure(),
      ],
    }));
  }

  function removeLanguageStructure(index: number) {
    setData((current) => ({
      ...current,
      languageStructures:
        current.languageStructures.length > 1
          ? current.languageStructures.filter((_, i) => i !== index)
          : [createEmptyInstagramLanguageStructure()],
    }));
  }

  // ─── Contents handlers ────────────────────────────────────────────────────────

  function updateContent(index: number, value: string) {
    setData((current) => {
      const nextItems = [
        ...current.contentArchitecture.generalContentGuidelines,
      ];
      nextItems[index] = value;
      return {
        ...current,
        contentArchitecture: {
          ...current.contentArchitecture,
          generalContentGuidelines: nextItems,
        },
      };
    });
  }

  function addContent() {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        generalContentGuidelines: [
          ...current.contentArchitecture.generalContentGuidelines,
          "",
        ],
      },
    }));
  }

  function removeContent(index: number) {
    setData((current) => ({
      ...current,
      contentArchitecture: {
        ...current.contentArchitecture,
        generalContentGuidelines:
          current.contentArchitecture.generalContentGuidelines.length > 1
            ? current.contentArchitecture.generalContentGuidelines.filter(
                (_, i) => i !== index
              )
            : [""],
      },
    }));
  }

  // ─── Visual reference handlers ────────────────────────────────────────────────

  async function uploadVisualReference(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingRefIndex(index);
    setRefUploadErrors((current) => {
      const next = { ...current };
      delete next[index];
      return next;
    });

    try {
      const { url } = await uploadPlanningMedia({
        file,
        planningProjectId,
        category: "references",
      });

      setData((current) => {
        const nextRefs = [...current.visualDirection.references];
        nextRefs[index] = { ...nextRefs[index], url };
        return {
          ...current,
          visualDirection: { ...current.visualDirection, references: nextRefs },
        };
      });
    } catch (err) {
      setRefUploadErrors((current) => ({
        ...current,
        [index]: err instanceof Error ? err.message : "Erro ao enviar imagem.",
      }));
    } finally {
      setUploadingRefIndex(null);
      event.target.value = "";
    }
  }

  function removeVisualReference(index: number) {
    setData((current) => ({
      ...current,
      visualDirection: {
        ...current.visualDirection,
        references: current.visualDirection.references.filter(
          (_, i) => i !== index
        ),
      },
    }));
  }

  function addVisualReferenceSlot() {
    setData((current) => ({
      ...current,
      visualDirection: {
        ...current.visualDirection,
        references: [
          ...current.visualDirection.references,
          createEmptyInstagramImageReference(),
        ],
      },
    }));
  }

  // ─── Bio photo handlers ───────────────────────────────────────────────────────

  async function uploadBioPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingProfilePhoto(true);
    setProfilePhotoError("");

    try {
      const { url } = await uploadPlanningMedia({
        file,
        planningProjectId,
        category: "profile",
      });

      setData((current) => ({
        ...current,
        profile: { ...current.profile, photoUrl: url },
      }));
    } catch (err) {
      setProfilePhotoError(
        err instanceof Error ? err.message : "Erro ao enviar foto."
      );
    } finally {
      setUploadingProfilePhoto(false);
      event.target.value = "";
    }
  }

  function removeBioPhoto() {
    setData((current) => ({
      ...current,
      profile: { ...current.profile, photoUrl: "" },
    }));
  }

  // ─── External references handlers ─────────────────────────────────────────────

  function updateReference(index: number, key: "title" | "url", value: string) {
    setData((current) => {
      const nextRefs = [...current.externalReferences];
      nextRefs[index] = { ...nextRefs[index], [key]: value };
      return { ...current, externalReferences: nextRefs };
    });
  }

  function addReference() {
    setData((current) => ({
      ...current,
      externalReferences: [
        ...current.externalReferences,
        createEmptyInstagramExternalReference(),
      ],
    }));
  }

  function removeReference(index: number) {
    setData((current) => ({
      ...current,
      externalReferences:
        current.externalReferences.length > 1
          ? current.externalReferences.filter((_, i) => i !== index)
          : [createEmptyInstagramExternalReference()],
    }));
  }

  // ─── Strategic direction handler ─────────────────────────────────────────────

  function updateStrategicDirection(
    key: keyof InstagramData["strategicDirection"],
    value: string
  ) {
    setData((current) => ({
      ...current,
      strategicDirection: {
        ...current.strategicDirection,
        [key]: value,
      },
    }));
  }

  // ─── Link items handlers ──────────────────────────────────────────────────────

  function updateLinkItem(id: string, key: "title" | "url", value: string) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        linkItems: current.profile.linkItems.map((l) =>
          l.id === id ? { ...l, [key]: value } : l
        ),
      },
    }));
  }

  function addLinkItem() {
    setData((current) => {
      const newLink = {
        ...createEmptyInstagramProfileLink(),
        order: current.profile.linkItems.length,
      };
      return {
        ...current,
        profile: {
          ...current.profile,
          linkItems: [...current.profile.linkItems, newLink],
        },
      };
    });
  }

  function removeLinkItem(id: string) {
    setData((current) => {
      const reordered = current.profile.linkItems
        .filter((l) => l.id !== id)
        .map((l, i) => ({ ...l, order: i }));
      return {
        ...current,
        profile: { ...current.profile, linkItems: reordered },
      };
    });
  }

  function moveLinkItem(id: string, direction: "up" | "down") {
    setData((current) => {
      const sorted = [...current.profile.linkItems].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((l) => l.id === id);
      if (index === -1) return current;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return current;
      [sorted[index], sorted[targetIndex]] = [sorted[targetIndex], sorted[index]];
      const reordered = sorted.map((l, i) => ({ ...l, order: i }));
      return { ...current, profile: { ...current.profile, linkItems: reordered } };
    });
  }

  // ─── Highlights handlers ──────────────────────────────────────────────────────

  function updateHighlight(id: string, key: "title" | "purpose", value: string) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        highlights: current.profile.highlights.map((h) =>
          h.id === id ? { ...h, [key]: value } : h
        ),
      },
    }));
  }

  function addHighlight() {
    setData((current) => {
      const newHighlight = {
        ...createEmptyInstagramHighlight(),
        order: current.profile.highlights.length,
      };
      return {
        ...current,
        profile: {
          ...current.profile,
          highlights: [...current.profile.highlights, newHighlight],
        },
      };
    });
  }

  function removeHighlight(id: string) {
    setData((current) => {
      const reordered = current.profile.highlights
        .filter((h) => h.id !== id)
        .map((h, i) => ({ ...h, order: i }));
      return {
        ...current,
        profile: { ...current.profile, highlights: reordered },
      };
    });
    setHighlightUploadErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    if (uploadingHighlightId === id) {
      setUploadingHighlightId(null);
    }
  }

  function moveHighlight(id: string, direction: "up" | "down") {
    setData((current) => {
      const sorted = [...current.profile.highlights].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((h) => h.id === id);
      if (index === -1) return current;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return current;
      [sorted[index], sorted[targetIndex]] = [sorted[targetIndex], sorted[index]];
      const reordered = sorted.map((h, i) => ({ ...h, order: i }));
      return { ...current, profile: { ...current.profile, highlights: reordered } };
    });
  }

  async function uploadHighlightImage(
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingHighlightId(id);
    setHighlightUploadErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });

    try {
      const { url } = await uploadPlanningMedia({
        file,
        planningProjectId,
        category: "highlights",
      });

      setData((current) => ({
        ...current,
        profile: {
          ...current.profile,
          highlights: current.profile.highlights.map((h) =>
            h.id === id ? { ...h, imageUrl: url } : h
          ),
        },
      }));
    } catch (err) {
      setHighlightUploadErrors((current) => ({
        ...current,
        [id]: err instanceof Error ? err.message : "Erro ao enviar imagem.",
      }));
    } finally {
      setUploadingHighlightId(null);
      event.target.value = "";
    }
  }

  function removeHighlightImage(id: string) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        highlights: current.profile.highlights.map((h) =>
          h.id === id ? { ...h, imageUrl: "" } : h
        ),
      },
    }));
  }

  // ─── InlineList ───────────────────────────────────────────────────────────────

  function InlineList({
    items,
    onChangeItem,
    onAddItem,
    onRemoveItem,
    placeholder,
    buttonLabel,
  }: {
    items: string[];
    onChangeItem: (index: number, value: string) => void;
    onAddItem: () => void;
    onRemoveItem: (index: number) => void;
    placeholder: string;
    buttonLabel: string;
  }) {
    return (
      <div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={item}
                onChange={(event) => onChangeItem(index, event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onAddItem}
          className="mt-4 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + {buttonLabel}
        </button>
      </div>
    );
  }

  // Derived flat lists
  const objectiveItems = data.objectives.map((o) => o.objective);
  const storyItems = data.contentArchitecture.stories.map((s) => s.name);
  const reelItems = data.contentArchitecture.formats.map((f) => f.name);
  const languageItems = data.languageStructures.map((l) => l.howItAppears);
  const contentItems = data.contentArchitecture.generalContentGuidelines;

  // ─── JSX ─────────────────────────────────────────────────────────────────────

  return (
    <div className="mt-6">
      {/* ── Navegação interna ── */}
      <nav className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ── 0. Direção estratégica ── */}
      <FormSection
        id="instagram-strategic-direction"
        title="Direção estratégica"
        description="Defina o papel do Instagram, sua função no ecossistema e as prioridades que orientarão o canal."
      >
        <div className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Papel estratégico do Instagram
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Explique por que o Instagram existe dentro desta estratégia e qual função principal deverá cumprir.
            </p>
            <textarea
              value={data.strategicDirection.channelRole}
              onChange={(event) =>
                updateStrategicDirection("channelRole", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Estratégia geral do canal
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Descreva como o canal será utilizado para gerar descoberta, autoridade, relacionamento e conversão.
            </p>
            <RichTextEditor
              value={data.strategicDirection.generalStrategy}
              onChange={(value) =>
                updateStrategicDirection("generalStrategy", value)
              }
              placeholder="Descreva como o canal será utilizado para gerar descoberta, autoridade, relacionamento e conversão."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Públicos e personas prioritárias
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Identifique quais públicos e personas devem receber maior atenção no Instagram.
            </p>
            <textarea
              value={data.strategicDirection.priorityAudiences}
              onChange={(event) =>
                updateStrategicDirection("priorityAudiences", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Função no ecossistema digital
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Explique de quais canais o Instagram recebe audiência e para quais destinos deverá direcioná-la.
            </p>
            <textarea
              value={data.strategicDirection.ecosystemFunction}
              onChange={(event) =>
                updateStrategicDirection("ecosystemFunction", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Diferenciação do perfil
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Registre o que deverá fazer este perfil parecer diferente de concorrentes, agências ou perfis genéricos do nicho.
            </p>
            <textarea
              value={data.strategicDirection.profileDifferentiation}
              onChange={(event) =>
                updateStrategicDirection("profileDifferentiation", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Prioridades editoriais iniciais
            </label>
            <p className="mb-2 text-sm leading-5 text-slate-500">
              Defina os temas, conceitos e mensagens que devem receber prioridade no primeiro ciclo editorial.
            </p>
            <textarea
              value={data.strategicDirection.initialEditorialPriorities}
              onChange={(event) =>
                updateStrategicDirection("initialEditorialPriorities", event.target.value)
              }
              rows={4}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>
        </div>
      </FormSection>

      {/* ── 1. Perfil do Instagram ── */}
      <FormSection
        id="instagram-profile"
        title="Perfil do Instagram"
        description="Configure como o perfil será apresentado visualmente ao público."
      >
        {/* SubSection 1: Identificação */}
        <SubSection
          title="Identificação do perfil"
          description="Dados básicos de identificação do perfil no Instagram."
        >
          <div className="mb-4 flex justify-end">
            <label className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={data.profile.enabled}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    profile: { ...current.profile, enabled: event.target.checked },
                  }))
                }
                className="h-4 w-4 rounded border-slate-300"
              />
              Ativar bio
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
            <div>
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
                {data.profile.photoUrl ? (
                  <img
                    src={data.profile.photoUrl}
                    alt="Foto do perfil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Foto"
                )}
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <label className="cursor-pointer rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800">
                  {uploadingProfilePhoto ? "Enviando..." : "Escolher foto"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={uploadBioPhoto}
                    disabled={uploadingProfilePhoto}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={removeBioPhoto}
                  className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Remover
                </button>

                {profilePhotoError && (
                  <p className="text-xs text-red-500">{profilePhotoError}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Arroba do perfil
                </label>
                <input
                  type="text"
                  value={data.profile.handle}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      profile: { ...current.profile, handle: event.target.value },
                    }))
                  }
                  placeholder="Ex: @nomedoperfil"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Nome do perfil
                </label>
                <input
                  type="text"
                  value={data.profile.displayName}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      profile: { ...current.profile, displayName: event.target.value },
                    }))
                  }
                  placeholder="Ex: Nome do especialista ou da marca"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>
          </div>
        </SubSection>

        {/* SubSection 2: Biografia */}
        <SubSection
          title="Biografia"
          description="Texto da bio e link principal exibido no perfil."
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Conteúdo da bio
              </label>
              <RichTextEditor
                value={data.profile.bio}
                onChange={(value) =>
                  setData((current) => ({
                    ...current,
                    profile: { ...current.profile, bio: value },
                  }))
                }
                placeholder="Escreva uma sugestão de bio para o Instagram."
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Link principal
              </label>
              <input
                type="url"
                value={data.profile.mainLink}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    profile: { ...current.profile, mainLink: event.target.value },
                  }))
                }
                placeholder="https://..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>
        </SubSection>

        {/* SubSection 3: Links do perfil */}
        <SubSection
          title="Links do perfil"
          description="Lista de links adicionais que poderão ser exibidos em uma página de menu."
        >
          {data.profile.linkItems.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhum link adicional cadastrado.</p>
              <button
                type="button"
                onClick={addLinkItem}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar link
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.profile.linkItems
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((link, index, sorted) => (
                  <div
                    key={link.id}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        Título do link
                      </label>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(event) =>
                          updateLinkItem(link.id, "title", event.target.value)
                        }
                        placeholder="Ex: Site, Portfólio, WhatsApp..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-600">
                        URL
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(event) =>
                          updateLinkItem(link.id, "url", event.target.value)
                        }
                        placeholder="https://..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => moveLinkItem(link.id, "up")}
                        disabled={index === 0}
                        className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveLinkItem(link.id, "down")}
                        disabled={index === sorted.length - 1}
                        className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeLinkItem(link.id)}
                        className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              <button
                type="button"
                onClick={addLinkItem}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar link
              </button>
            </div>
          )}
        </SubSection>

        {/* SubSection 4: Destaques */}
        <SubSection
          title="Destaques"
          description="Destaques fixos exibidos no perfil do Instagram."
        >
          {data.profile.highlights.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Nenhum destaque cadastrado.</p>
              <button
                type="button"
                onClick={addHighlight}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar destaque
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.profile.highlights
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((highlight, index, sorted) => (
                  <div
                    key={highlight.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                          {highlight.imageUrl ? (
                            <img
                              src={highlight.imageUrl}
                              alt={highlight.title || "Destaque"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-slate-400">Sem imagem</span>
                          )}
                        </div>
                      </div>

                      <div className="grid flex-1 gap-3 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-600">
                            Nome do destaque
                          </label>
                          <input
                            type="text"
                            value={highlight.title}
                            onChange={(event) =>
                              updateHighlight(highlight.id, "title", event.target.value)
                            }
                            placeholder="Ex: Sobre, Serviços, Depoimentos..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-600">
                            Função
                          </label>
                          <input
                            type="text"
                            value={highlight.purpose}
                            onChange={(event) =>
                              updateHighlight(highlight.id, "purpose", event.target.value)
                            }
                            placeholder="Ex: Apresentar o especialista, mostrar serviços..."
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                          />
                        </div>
                      </div>

                      <div className="flex flex-shrink-0 flex-col items-end justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => moveHighlight(highlight.id, "up")}
                          disabled={index === 0}
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveHighlight(highlight.id, "down")}
                          disabled={index === sorted.length - 1}
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeHighlight(highlight.id)}
                          className="cursor-pointer rounded-full px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label
                        className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition ${
                          uploadingHighlightId === highlight.id
                            ? "bg-slate-200 text-slate-500"
                            : "bg-slate-950 text-white hover:bg-slate-800"
                        }`}
                      >
                        {uploadingHighlightId === highlight.id
                          ? "Enviando..."
                          : "Enviar imagem"}
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={(event) => uploadHighlightImage(highlight.id, event)}
                          disabled={uploadingHighlightId === highlight.id}
                          className="hidden"
                        />
                      </label>

                      {highlight.imageUrl && (
                        <button
                          type="button"
                          onClick={() => removeHighlightImage(highlight.id)}
                          className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                          Remover imagem
                        </button>
                      )}

                      {highlightUploadErrors[highlight.id] && (
                        <p className="text-xs text-red-500">
                          {highlightUploadErrors[highlight.id]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              <button
                type="button"
                onClick={addHighlight}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                + Adicionar destaque
              </button>
            </div>
          )}
        </SubSection>
      </FormSection>

      {/* ── 2. Frequência e objetivos ── */}
      <FormSection
        id="instagram-frequency-objectives"
        title="Frequência e objetivos"
        description="Defina a cadência de publicação e os resultados esperados para o canal."
      >
        <SubSection
          title="Frequência de publicações"
          description="Defina a frequência por formato de conteúdo. Use quantidade e período para deixar a orientação mais clara."
        >
          <div className="space-y-4">
            {data.publishing.frequencyItems.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_160px_180px_1fr_auto]"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Formato
                  </label>

                  <input
                    type="text"
                    value={item.format}
                    onChange={(event) =>
                      updateFrequencyItem(index, "format", event.target.value)
                    }
                    placeholder="Ex: Reels"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Quantidade
                  </label>

                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(event) =>
                      updateFrequencyItem(index, "quantity", event.target.value)
                    }
                    placeholder="Ex: 3"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Período
                  </label>

                  <select
                    value={item.period}
                    onChange={(event) =>
                      updateFrequencyItem(index, "period", event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    <option value="por dia">por dia</option>
                    <option value="por semana">por semana</option>
                    <option value="por mês">por mês</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">
                    Observação
                  </label>

                  <input
                    type="text"
                    value={item.notes}
                    onChange={(event) =>
                      updateFrequencyItem(index, "notes", event.target.value)
                    }
                    placeholder="Ex: Priorizar conteúdos de autoridade."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeFrequencyItem(index)}
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
            onClick={addFrequencyItem}
            className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
          >
            + Novo formato
          </button>
        </SubSection>

        <SubSection
          title="Objetivos"
          description="Defina os objetivos específicos do conteúdo para o Instagram."
        >
          <InlineList
            items={objectiveItems}
            onChangeItem={updateObjective}
            onAddItem={addObjective}
            onRemoveItem={removeObjective}
            placeholder="Ex: Aumentar autoridade, gerar leads, fortalecer comunidade..."
            buttonLabel="Novo objetivo"
          />
        </SubSection>
      </FormSection>

      {/* ── 3. Arquitetura de conteúdo ── */}
      <FormSection
        id="instagram-content"
        title="Arquitetura de conteúdo"
        description="Organize os formatos, temas e possibilidades editoriais do Instagram."
      >
        <SubSection
          title="Stories"
          description="Liste ideias, quadros, formatos e orientações para stories."
        >
          <InlineList
            items={storyItems}
            onChangeItem={updateStory}
            onAddItem={addStory}
            onRemoveItem={removeStory}
            placeholder="Ex: Bastidores, rotina, perguntas, enquetes, provas sociais..."
            buttonLabel="Novo story"
          />
        </SubSection>

        <SubSection
          title="Reels"
          description="Liste ideias, formatos, séries e abordagens para vídeos curtos."
        >
          <InlineList
            items={reelItems}
            onChangeItem={updateReel}
            onAddItem={addReel}
            onRemoveItem={removeReel}
            placeholder="Ex: Dicas rápidas, mitos e verdades, bastidores, tutoriais..."
            buttonLabel="Novo Reels"
          />
        </SubSection>

        <SubSection
          title="Conteúdos"
          description="Liste formatos, temas e ideias de conteúdos que podem ser usados no Instagram."
        >
          <InlineList
            items={contentItems}
            onChangeItem={updateContent}
            onAddItem={addContent}
            onRemoveItem={removeContent}
            placeholder="Ex: Carrosséis educativos, reels de autoridade, posts de prova social..."
            buttonLabel="Novo conteúdo"
          />
        </SubSection>

        <SubSection
          title="Hashtags"
          description="Registre hashtags importantes para descoberta, nicho, localização, autoridade e temas recorrentes."
        >
          <InlineList
            items={flatHashtags}
            onChangeItem={updateHashtag}
            onAddItem={addHashtag}
            onRemoveItem={removeHashtag}
            placeholder="Ex: #marketingdigital, #estrategiadeconteudo..."
            buttonLabel="Nova hashtag"
          />
        </SubSection>
      </FormSection>

      {/* ── 4. Estrutura de linguagem ── */}
      <FormSection
        id="instagram-language"
        title="Estrutura de linguagem"
        description="Registre como a comunicação deve aparecer nos conteúdos do canal."
      >
        <InlineList
          items={languageItems}
          onChangeItem={updateLanguageStructure}
          onAddItem={addLanguageStructure}
          onRemoveItem={removeLanguageStructure}
          placeholder="Ex: Gancho forte, explicação simples, exemplo prático, chamada final..."
          buttonLabel="Nova estrutura de linguagem"
        />
      </FormSection>

      {/* ── 5. Direção visual ── */}
      <FormSection
        id="instagram-visual"
        title="Direção visual"
        description="Defina a aparência, as referências e a sensação transmitida pelo perfil."
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Estratégia visual
          </label>

          <RichTextEditor
            value={data.visualDirection.generalStrategy}
            onChange={(value) =>
              setData((current) => ({
                ...current,
                visualDirection: {
                  ...current.visualDirection,
                  generalStrategy: value,
                },
              }))
            }
            placeholder="Explique a direção visual do Instagram: estilo dos posts, cores, fundos, fotos, vídeos, ritmo, estética e referências."
          />
        </div>

        {data.visualDirection.references.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {data.visualDirection.references.map((reference, index) => (
              <div
                key={reference.id}
                className="overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50"
              >
                <label className="flex aspect-[4/3] cursor-pointer items-center justify-center text-center text-sm font-semibold text-slate-500 transition hover:bg-slate-100">
                  {uploadingRefIndex === index ? (
                    <span>Enviando...</span>
                  ) : reference.url ? (
                    <img
                      src={reference.url}
                      alt={`Referência ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>
                      +<br />
                      Adicionar referência
                    </span>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => uploadVisualReference(index, event)}
                    disabled={uploadingRefIndex !== null}
                    className="hidden"
                  />
                </label>

                <div className="p-3">
                  {refUploadErrors[index] && (
                    <p className="mb-2 text-xs text-red-500">
                      {refUploadErrors[index]}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => removeVisualReference(index)}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={addVisualReferenceSlot}
            className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
          >
            + Adicionar referência
          </button>

          <p className="text-xs text-slate-500">
            Tamanho recomendado para imagem de feed: 1080x1350px.
          </p>
        </div>
      </FormSection>

      {/* ── 6. Referências externas ── */}
      <FormSection
        id="instagram-references"
        title="Referências externas"
        description="Centralize links e materiais que apoiam a estratégia do Instagram."
      >
        <div className="space-y-4">
          {data.externalReferences.map((reference, index) => (
            <div
              key={reference.id}
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
                  placeholder="Ex: Perfil, post, reels, campanha ou referência visual"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Link
                </label>

                <input
                  type="url"
                  value={reference.url}
                  onChange={(event) =>
                    updateReference(index, "url", event.target.value)
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
          className="mt-5 cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white"
        >
          + Nova referência
        </button>
      </FormSection>

      {/* ── Sticky save bar ── */}
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
