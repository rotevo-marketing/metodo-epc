"use client";

import { ChangeEvent } from "react";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import RichTextEditor from "@/Components/RichTextEditor";

export type BehaviorKey =
  | "redesSociais"
  | "blogs"
  | "anunciosMidiaTradicional"
  | "anunciosMidiaDigital"
  | "outros";

export type PersonaData = {
  id?: string;
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

export type PersonasData = {
  personas: PersonaData[];
};

const behaviorOptions: {
  key: BehaviorKey;
  label: string;
}[] = [
  {
    key: "redesSociais",
    label: "Redes sociais",
  },
  {
    key: "blogs",
    label: "Blogs",
  },
  {
    key: "anunciosMidiaTradicional",
    label: "Anúncios de mídia tradicional",
  },
  {
    key: "anunciosMidiaDigital",
    label: "Anúncios de mídia digital",
  },
  {
    key: "outros",
    label: "Outros",
  },
];

export function createEmptyPersona(): PersonaData {
  return {
    id: crypto.randomUUID(),
    photo: "",
    name: "",
    age: "",
    education: "",
    gender: "",
    role: "",
    companySize: "",
    behaviors: {
      redesSociais: false,
      blogs: false,
      anunciosMidiaTradicional: false,
      anunciosMidiaDigital: false,
      outros: false,
    },
    description: "",
    personalObjective: "",
    challenges: "",
    solutionHelp: "",
    professionalObjective: "",
    whatPrevents: "",
    informationSources: "",
    alternatives: "",
    expectedExperience: "",
    commonObjections: "",
    decisionFactors: "",
    desiredResult: "",
    buyingJourney: "",
    summaryObjective: "",
    summaryChallenge: "",
    summaryObjection: "",
    summaryJourney: "",
  };
}

export const initialPersonasData: PersonasData = {
  personas: [createEmptyPersona()],
};

export function getPersonasWithoutStableId(personas: PersonaData[]): PersonaData[] {
  return personas.filter((p) => !p.id?.trim());
}

export function createPersonasWithStableIds(personas: PersonaData[]): PersonaData[] {
  return personas.map((p) =>
    p.id?.trim() ? p : { ...p, id: crypto.randomUUID() }
  );
}

const questionFields: {
  key: keyof PersonaData;
  title: string;
  placeholder: string;
}[] = [
  {
    key: "description",
    title: "Descreva sua persona, seus hábitos e seu dia a dia",
    placeholder:
      "Descreva como essa persona vive, trabalha, decide, se informa, compra, se relaciona com o mercado e lida com os problemas que o projeto resolve.",
  },
  {
    key: "personalObjective",
    title: "Qual o objetivo pessoal desta pessoa que você poderia ajudá-la a realizar?",
    placeholder:
      "Explique o objetivo pessoal mais relevante dessa persona e como ele se conecta ao projeto.",
  },
  {
    key: "challenges",
    title: "Quais desafios impedem esta pessoa de atingir seus objetivos?",
    placeholder:
      "Liste dores, obstáculos, inseguranças, dúvidas, limitações e situações que dificultam o avanço dessa persona.",
  },
  {
    key: "solutionHelp",
    title: "Como nossa solução ajuda esta persona a superar os desafios listados?",
    placeholder:
      "Explique como o projeto, produto, serviço ou conteúdo pode ajudar essa persona a superar seus desafios.",
  },
  {
    key: "professionalObjective",
    title: "Qual é o objetivo profissional e o que mais impactante para alcançá-lo?",
    placeholder:
      "Descreva o objetivo profissional dessa persona e os fatores que podem ajudá-la a chegar lá.",
  },
  {
    key: "whatPrevents",
    title: "O que está impedindo ou acelerando este processo?",
    placeholder:
      "Liste fatores que dificultam ou aceleram a decisão, a mudança, a compra ou a evolução dessa persona.",
  },
  {
    key: "informationSources",
    title: "Para quem ela se dirige quando precisa de informação?",
    placeholder:
      "Informe quais pessoas, canais, especialistas, comunidades, buscadores ou referências essa persona consulta quando precisa decidir.",
  },
  {
    key: "alternatives",
    title: "O que poderia fazer esta solução se tornar desnecessária?",
    placeholder:
      "Explique quais alternativas, objeções, soluções concorrentes ou mudanças de contexto poderiam fazer essa persona não comprar.",
  },
  {
    key: "expectedExperience",
    title: "Qual o tipo de experiência a Persona espera ao pesquisar por mais informações?",
    placeholder:
      "Descreva como essa persona espera ser atendida, informada, conduzida, educada e convencida.",
  },
  {
    key: "commonObjections",
    title: "Quais as objeções mais comuns da Persona ao seu produto, serviço ou solução?",
    placeholder:
      "Liste medos, dúvidas, resistências, comparações, crenças limitantes e motivos que podem impedir a conversão.",
  },
  {
    key: "decisionFactors",
    title: "O que essa Persona mais valoriza em relação ao seu produto, serviço ou solução?",
    placeholder:
      "Descreva critérios de valor, prioridades, expectativas, aspectos desejados e elementos que influenciam a decisão.",
  },
  {
    key: "desiredResult",
    title: "O que a Persona está tentando alcançar que ela mais valoriza?",
    placeholder:
      "Explique o resultado final desejado por essa persona, incluindo ganhos emocionais, práticos, financeiros, profissionais ou pessoais.",
  },
  {
    key: "buyingJourney",
    title: "Qual a provável jornada de compra desta persona?",
    placeholder:
      "Descreva o caminho provável desde a descoberta do problema até a decisão de compra, incluindo dúvidas, conteúdos necessários e pontos de contato.",
  },
];

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
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>

      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      ) : null}

      <div className="mt-6">{children}</div>
    </section>
  );
}

function TextAreaField({
  title,
  value,
  placeholder,
  onChange,
}: {
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <SectionCard title={title}>
      <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
    </SectionCard>
  );
}

type PersonasFormProps = {
  data: PersonasData;
  setData: Dispatch<SetStateAction<PersonasData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function PersonasForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: PersonasFormProps) {
  function updatePersona(
    personaIndex: number,
    key: keyof PersonaData,
    value: string
  ) {
    setData((current) => {
      const nextPersonas = [...current.personas];

      nextPersonas[personaIndex] = {
        ...nextPersonas[personaIndex],
        [key]: value,
      };

      return {
        ...current,
        personas: nextPersonas,
      };
    });
  }

  function updatePersonaBehavior(
    personaIndex: number,
    behaviorKey: BehaviorKey,
    checked: boolean
  ) {
    setData((current) => {
      const nextPersonas = [...current.personas];

      nextPersonas[personaIndex] = {
        ...nextPersonas[personaIndex],
        behaviors: {
          ...nextPersonas[personaIndex].behaviors,
          [behaviorKey]: checked,
        },
      };

      return {
        ...current,
        personas: nextPersonas,
      };
    });
  }

  function updatePersonaPhoto(
    personaIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updatePersona(personaIndex, "photo", String(reader.result || ""));
    };

    reader.readAsDataURL(file);
  }

  function removePersonaPhoto(personaIndex: number) {
    updatePersona(personaIndex, "photo", "");
  }

  function addPersona() {
    setData((current) => ({
      ...current,
      personas: [...current.personas, createEmptyPersona()],
    }));
  }

  function removePersona(personaIndex: number) {
    setData((current) => ({
      ...current,
      personas:
        current.personas.length > 1
          ? current.personas.filter((_, index) => index !== personaIndex)
          : [createEmptyPersona()],
    }));
  }

  return (
    <div className="mt-6 space-y-8">
      {data.personas.map((persona, personaIndex) => (
        <div key={personaIndex} className="space-y-6">
          <SectionCard
            title={`Persona ${String(personaIndex + 1).padStart(2, "0")}`}
            description="Cadastre uma persona com imagem, dados demográficos, comportamento, objetivos, desafios, objeções e resumo para apresentação."
          >
            <div className="mb-6 flex justify-end">
              <button
                type="button"
                onClick={() => removePersona(personaIndex)}
                className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Excluir persona
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
              <div>
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
                  {persona.photo ? (
                    <img
                      src={persona.photo}
                      alt="Foto da persona"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Foto"
                  )}
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <label className="cursor-pointer rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800">
                    Escolher foto
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) =>
                        updatePersonaPhoto(personaIndex, event)
                      }
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => removePersonaPhoto(personaIndex)}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                  >
                    Remover
                  </button>
                </div>

                <p className="mt-3 max-w-28 text-xs leading-5 text-slate-500">
                  Use uma foto, avatar ou imagem simbólica da persona.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Nome da persona
                    </label>

                    <input
                      type="text"
                      value={persona.name}
                      onChange={(event) =>
                        updatePersona(personaIndex, "name", event.target.value)
                      }
                      placeholder="Ex: Empresário em crescimento"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Idade
                    </label>

                    <input
                      type="text"
                      value={persona.age}
                      onChange={(event) =>
                        updatePersona(personaIndex, "age", event.target.value)
                      }
                      placeholder="Ex: 32 anos"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Escolaridade
                    </label>

                    <input
                      type="text"
                      value={persona.education}
                      onChange={(event) =>
                        updatePersona(
                          personaIndex,
                          "education",
                          event.target.value
                        )
                      }
                      placeholder="Ex: Ensino superior"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Sexo
                    </label>

                    <input
                      type="text"
                      value={persona.gender}
                      onChange={(event) =>
                        updatePersona(
                          personaIndex,
                          "gender",
                          event.target.value
                        )
                      }
                      placeholder="Ex: Feminino"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Cargo ou ocupação
                    </label>

                    <input
                      type="text"
                      value={persona.role}
                      onChange={(event) =>
                        updatePersona(personaIndex, "role", event.target.value)
                      }
                      placeholder="Ex: Empresária, profissional liberal, gestora..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                      Tamanho da empresa
                    </label>

                    <input
                      type="text"
                      value={persona.companySize}
                      onChange={(event) =>
                        updatePersona(
                          personaIndex,
                          "companySize",
                          event.target.value
                        )
                      }
                      placeholder="Ex: Pequena empresa, equipe de 5 pessoas..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Comportamento"
            description="Quais meios de comunicação são usados pela persona?"
          >
            <div className="grid gap-3 md:grid-cols-3">
              {behaviorOptions.map((option) => (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-400"
                >
                  <input
                    type="checkbox"
                    checked={persona.behaviors[option.key]}
                    onChange={(event) =>
                      updatePersonaBehavior(
                        personaIndex,
                        option.key,
                        event.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300"
                  />

                  {option.label}
                </label>
              ))}
            </div>
          </SectionCard>

          {questionFields.map((field) => (
            <TextAreaField
              key={field.key}
              title={field.title}
              value={String(persona[field.key] || "")}
              placeholder={field.placeholder}
              onChange={(value) => updatePersona(personaIndex, field.key, value)}
            />
          ))}

          <SectionCard
            title="Resumo para apresentação"
            description="Este resumo pode ser usado na apresentação pública para evitar excesso de informação e mostrar a persona de forma mais visual."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Objetivo principal resumido
                </label>

                <RichTextEditor
                  value={persona.summaryObjective}
                  onChange={(value) =>
                    updatePersona(personaIndex, "summaryObjective", value)
                  }
                  placeholder="Resumo do principal objetivo dessa persona."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Desafio principal resumido
                </label>

                <RichTextEditor
                  value={persona.summaryChallenge}
                  onChange={(value) =>
                    updatePersona(personaIndex, "summaryChallenge", value)
                  }
                  placeholder="Resumo do principal desafio dessa persona."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Objeção principal resumida
                </label>

                <RichTextEditor
                  value={persona.summaryObjection}
                  onChange={(value) =>
                    updatePersona(personaIndex, "summaryObjection", value)
                  }
                  placeholder="Resumo da principal objeção dessa persona."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">
                  Jornada provável resumida
                </label>

                <RichTextEditor
                  value={persona.summaryJourney}
                  onChange={(value) =>
                    updatePersona(personaIndex, "summaryJourney", value)
                  }
                  placeholder="Resumo da jornada de compra dessa persona."
                />
              </div>
            </div>
          </SectionCard>
        </div>
      ))}

      <button
        type="button"
        onClick={addPersona}
        className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        + Adicionar persona
      </button>

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