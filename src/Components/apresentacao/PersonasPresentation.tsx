"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PresentationHeader } from "./PresentationHeader";
import { RichText } from "./RichText";

type BehaviorKey =
  | "redesSociais" | "blogs" | "anunciosMidiaTradicional"
  | "anunciosMidiaDigital" | "outros";

type PersonaData = {
  photo: string;
  name: string;
  age: string;
  education: string;
  gender: string;
  role: string;
  companySize: string;
  behaviors: Record<BehaviorKey, boolean>;
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

type PersonasData = { personas: PersonaData[] };

function isPersonasData(v: unknown): v is PersonasData {
  return typeof v === "object" && v !== null && "personas" in v;
}

const behaviorLabels: { key: BehaviorKey; label: string }[] = [
  { key: "redesSociais", label: "Redes sociais" },
  { key: "blogs", label: "Blogs" },
  { key: "anunciosMidiaTradicional", label: "Mídia tradicional" },
  { key: "anunciosMidiaDigital", label: "Mídia digital" },
  { key: "outros", label: "Outros" },
];

const profileFields: { key: keyof PersonaData; label: string }[] = [
  { key: "description", label: "Descrição" },
  { key: "personalObjective", label: "Objetivo pessoal" },
  { key: "challenges", label: "Desafios" },
  { key: "solutionHelp", label: "Como a solução ajuda" },
  { key: "professionalObjective", label: "Objetivo profissional" },
  { key: "whatPrevents", label: "O que impede" },
  { key: "informationSources", label: "Fontes de informação" },
  { key: "alternatives", label: "Alternativas que considera" },
  { key: "expectedExperience", label: "Experiência esperada" },
  { key: "commonObjections", label: "Objeções comuns" },
  { key: "decisionFactors", label: "Fatores de decisão" },
  { key: "desiredResult", label: "Resultado desejado" },
  { key: "buyingJourney", label: "Jornada de compra" },
];

const summaryFields: { key: keyof PersonaData; label: string }[] = [
  { key: "summaryObjective", label: "Objetivo" },
  { key: "summaryChallenge", label: "Desafio" },
  { key: "summaryObjection", label: "Objeção" },
  { key: "summaryJourney", label: "Jornada" },
];

function PersonaModal({
  persona,
  index,
  onClose,
}: {
  persona: PersonaData;
  index: number;
  onClose: () => void;
}) {
  const metaItems = [
    persona.age && `${persona.age} anos`,
    persona.gender,
    persona.education,
    persona.role,
    persona.companySize,
  ].filter(Boolean);

  const activeBehaviors = behaviorLabels.filter((b) => persona.behaviors?.[b.key]);
  const filledProfile = profileFields.filter(
    (f) => (persona[f.key] as string)?.trim()
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="persona-modal-name"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-5">
          {persona.photo ? (
            <img
              src={persona.photo}
              alt={persona.name || "Persona"}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-400 ring-1 ring-slate-200">
              {(persona.name || "P").charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Persona {index + 1}
            </span>
            <h3
              id="persona-modal-name"
              className="mt-0.5 truncate text-lg font-semibold tracking-tight text-slate-950"
            >
              {persona.name || "Persona"}
            </h3>
            {metaItems.length > 0 && (
              <p className="mt-0.5 text-xs text-slate-500">
                {metaItems.join(" · ")}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar análise da persona"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-950"
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {/* Behaviors */}
            {activeBehaviors.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Comportamento de consumo
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeBehaviors.map((b) => (
                    <span
                      key={b.key}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Profile fields */}
            {filledProfile.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {label}
                </p>
                <RichText
                  content={persona[key] as string}
                  className="text-sm leading-7 text-slate-700"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modal footer */}
        <div className="border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PersonasPresentation({ data }: { data: unknown }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const d = isPersonasData(data) ? data : null;
  const personas = (d?.personas ?? []).filter(
    (p) => p.name?.trim() || p.photo?.trim()
  );

  const selectedPersona =
    selectedIndex !== null ? (personas[selectedIndex] ?? null) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedIndex(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <>
      <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        {/* Cabeçalho */}
        <PresentationHeader
          area="Fundamentos Estratégicos"
          title="Personas"
          slug="personas"
        />

        {/* Persona cards */}
        {!d ? (
          <section className="p-8">
            <p className="text-slate-500">
              Este módulo ainda não foi preenchido no planejamento.
            </p>
          </section>
        ) : personas.length === 0 ? (
          <section className="p-8">
            <p className="text-slate-500">
              Nenhuma persona foi cadastrada neste módulo ainda.
            </p>
          </section>
        ) : (
          <section className="space-y-5 p-6 lg:p-8">
            {personas.map((persona, i) => {
              const activeBehaviors = behaviorLabels.filter(
                (b) => persona.behaviors?.[b.key]
              );
              const filledSummary = summaryFields.filter(
                (f) => (persona[f.key] as string)?.trim()
              );
              const metaItems = [
                persona.age && `${persona.age} anos`,
                persona.gender,
                persona.education,
                persona.role,
                persona.companySize,
              ].filter(Boolean);

              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl ring-1 ring-slate-200"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-100 bg-slate-50/60 p-5">
                    {persona.photo ? (
                      <img
                        src={persona.photo}
                        alt={persona.name || "Persona"}
                        className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full object-cover object-center ring-1 ring-slate-200"
                      />
                    ) : (
                      <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400 ring-1 ring-slate-200">
                        {(persona.name || "P").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Persona {i + 1}
                      </span>
                      {persona.name && (
                        <h3 className="mt-0.5 truncate text-lg font-semibold tracking-tight text-slate-950">
                          {persona.name}
                        </h3>
                      )}
                      {metaItems.length > 0 && (
                        <p className="mt-1 text-[0.875rem] leading-snug text-slate-500">
                          {metaItems.join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    {/* Comportamento de consumo */}
                    {activeBehaviors.length > 0 && (
                      <div className={filledSummary.length > 0 ? "mb-5" : ""}>
                        <p className="mb-3 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
                          Comportamento de consumo
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeBehaviors.map((b) => (
                            <span
                              key={b.key}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                            >
                              {b.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Objetivo / Desafio / Objeção / Jornada — editorial, sem caixa */}
                    {filledSummary.length > 0 && (
                      <div className={activeBehaviors.length > 0 ? "border-t border-slate-100" : ""}>
                        {/* Linha 1: Objetivo + Desafio */}
                        <div className="sm:grid sm:grid-cols-2">
                          {filledSummary.slice(0, 2).map((f, k) => (
                            <div
                              key={f.key}
                              className={
                                k === 0
                                  ? "pt-5 pb-5 sm:pr-5"
                                  : "border-t border-slate-100 pt-5 pb-5 sm:border-t-0 sm:border-l sm:border-slate-100 sm:pl-5"
                              }
                            >
                              <p className="mb-1.5 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
                                {f.label}
                              </p>
                              <RichText
                                content={persona[f.key] as string}
                                className="text-sm leading-[1.75] text-slate-700"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Linha 2: Objeção + Jornada */}
                        {filledSummary.slice(2).length > 0 && (
                          <div className="border-t border-slate-100 sm:grid sm:grid-cols-2">
                            {filledSummary.slice(2, 4).map((f, k) => (
                              <div
                                key={f.key}
                                className={
                                  k === 0
                                    ? "pt-5 pb-5 sm:pr-5"
                                    : "border-t border-slate-100 pt-5 pb-5 sm:border-t-0 sm:border-l sm:border-slate-100 sm:pl-5"
                                }
                              >
                                <p className="mb-1.5 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
                                  {f.label}
                                </p>
                                <RichText
                                  content={persona[f.key] as string}
                                  className="text-sm leading-[1.75] text-slate-700"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card footer */}
                  <div className="border-t border-slate-100 p-6">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(i)}
                      className="w-full cursor-pointer rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                    >
                      Ver análise completa →
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </article>

      {mounted && selectedPersona && selectedIndex !== null &&
        createPortal(
          <PersonaModal
            persona={selectedPersona}
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />,
          document.body
        )
      }
    </>
  );
}
