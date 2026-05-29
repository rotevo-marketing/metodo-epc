import { ModuleIcon } from "./ModuleIcon";

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

export default function PersonasPresentation({ data }: { data: unknown }) {
  const d = isPersonasData(data) ? data : null;
  const personas = (d?.personas ?? []).filter(
    (p) => p.name?.trim() || p.photo?.trim()
  );

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="personas" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Fundamentos Estratégicos
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Personas
            </h2>
          </div>
        </div>
      </section>

      {/* Personas */}
      {personas.map((persona, i) => {
        const activeBehaviors = behaviorLabels.filter(
          (b) => persona.behaviors?.[b.key]
        );
        const filledProfile = profileFields.filter(
          (f) => (persona[f.key] as string)?.trim()
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
          <section
            key={i}
            className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12"
          >
            {/* Persona header */}
            <div className="flex items-center gap-5">
              {persona.photo ? (
                <img
                  src={persona.photo}
                  alt={persona.name || "Persona"}
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-400 ring-1 ring-slate-200">
                  {(persona.name || "P").charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Persona {i + 1}
                </span>
                {persona.name && (
                  <h3 className="mt-1 text-2xl font-light tracking-[-0.03em] text-slate-950">
                    {persona.name}
                  </h3>
                )}
                {metaItems.length > 0 && (
                  <p className="mt-1 text-sm text-slate-500">
                    {metaItems.join(" · ")}
                  </p>
                )}
              </div>
            </div>

            {/* Behaviors */}
            {activeBehaviors.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
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
            {filledProfile.length > 0 && (
              <div className="mt-8 space-y-6">
                {filledProfile.map((f) => (
                  <div key={f.key}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {f.label}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {persona[f.key] as string}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Summary */}
            {filledSummary.length > 0 && (
              <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:grid-cols-2">
                {filledSummary.map((f) => (
                  <div key={f.key}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {f.label}
                    </p>
                    <p className="text-sm leading-6 text-slate-700">
                      {persona[f.key] as string}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {!d && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
