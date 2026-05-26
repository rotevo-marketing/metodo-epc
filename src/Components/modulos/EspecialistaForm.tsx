"use client";

import { ChangeEvent } from "react";
import Link from "next/link";

export type SpecialistCharacteristic = {
  title: string;
  description: string;
};

export type SpecialistData = {
  fields: Record<string, string>;
  photo: string;
  characteristics: SpecialistCharacteristic[];
};

export const initialSpecialistData: SpecialistData = {
  fields: {},
  photo: "",
  characteristics: [
    {
      title: "",
      description: "",
    },
  ],
};

const specialistFields = [
  {
    key: "quemEoQueFaz",
    label: "Quem é e o que faz",
    helper:
      "Apresente quem é o especialista, o que ele faz, para quem faz e qual transformação entrega.",
    placeholder:
      "Ex: Especialista em reestruturação interna para empresários em expansão, atuando na base invisível que sustenta decisões, crescimento e resultados.",
  },
  {
    key: "especialidadesExpertise",
    label: "Especialidades e expertise",
    helper:
      "Liste áreas de domínio, conhecimentos técnicos, diferenciais, métodos, formações e temas de autoridade.",
    placeholder:
      "Ex: liderança, mentalidade financeira, padrões de decisão, gestão emocional, posicionamento e crescimento empresarial.",
  },
  {
    key: "trajetoriaProfissional",
    label: "Trajetória profissional",
    helper:
      "Conte a trajetória profissional, experiências relevantes, cargos, projetos, decisões importantes e evolução de carreira.",
    placeholder:
      "Descreva os principais pontos da trajetória que ajudam a construir autoridade e confiança.",
  },
  {
    key: "historiaPessoal",
    label: "História pessoal",
    helper:
      "Registre elementos da história pessoal que ajudam a humanizar a narrativa e aproximar o especialista do público.",
    placeholder:
      "Conte experiências, viradas, desafios, aprendizados e elementos pessoais que fazem sentido para a comunicação.",
  },
  {
    key: "marcosConquistas",
    label: "Marcos e conquistas",
    helper:
      "Liste conquistas, resultados, certificações, cases, reconhecimentos, números ou momentos importantes da trajetória.",
    placeholder:
      "Ex: projetos realizados, clientes atendidos, formações, eventos, publicações, resultados alcançados ou reconhecimentos.",
  },
  {
    key: "bandeirasCausas",
    label: "Bandeiras e causas",
    helper:
      "Defina quais ideias, causas, posicionamentos ou pontos de vista o especialista defende publicamente.",
    placeholder:
      "Ex: crescimento com consciência, liderança mais madura, decisões alinhadas, negócios sustentáveis e saúde emocional do empreendedor.",
  },
  {
    key: "propositoDigital",
    label: "Propósito no digital",
    helper:
      "Explique por que o especialista deseja se posicionar no digital e qual papel sua presença online deve cumprir.",
    placeholder:
      "Ex: Educar empresários, reorganizar percepções, construir autoridade e atrair clientes mais conscientes do problema que precisam resolver.",
  },
  {
    key: "autodefinicao",
    label: "Autodefinição",
    helper:
      "Registre como o especialista define a si mesmo de forma simples, direta e estratégica.",
    placeholder:
      "Ex: Sou uma especialista que ajuda empresários em expansão a reorganizarem a estrutura interna que sustenta crescimento, decisões e resultados.",
  },
  {
    key: "comoGostariaDeSerVisto",
    label: "Como gostaria de ser visto",
    helper:
      "Descreva a percepção que o público deve ter ao entrar em contato com o especialista, seus conteúdos e sua presença digital.",
    placeholder:
      "Ex: Como uma referência estratégica, profunda, direta e confiável para empresários que querem crescer sem perder clareza, estrutura e controle.",
  },
];

function TextAreaCard({
  label,
  helper,
  placeholder,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  helper: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <label className="text-sm font-semibold text-slate-950">{label}</label>

      <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />
    </section>
  );
}

type EspecialistaFormProps = {
  data: SpecialistData;
  setData: React.Dispatch<React.SetStateAction<SpecialistData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function EspecialistaForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: EspecialistaFormProps) {
  function updateField(key: string, value: string) {
    setData((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value,
      },
    }));
  }

  function updatePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setData((current) => ({
        ...current,
        photo: String(reader.result || ""),
      }));
    };

    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setData((current) => ({
      ...current,
      photo: "",
    }));
  }

  function updateCharacteristic(
    index: number,
    key: keyof SpecialistCharacteristic,
    value: string
  ) {
    setData((current) => {
      const nextCharacteristics = [...current.characteristics];

      nextCharacteristics[index] = {
        ...nextCharacteristics[index],
        [key]: value,
      };

      return {
        ...current,
        characteristics: nextCharacteristics,
      };
    });
  }

  function addCharacteristic() {
    setData((current) => ({
      ...current,
      characteristics: [
        ...current.characteristics,
        {
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeCharacteristic(index: number) {
    setData((current) => ({
      ...current,
      characteristics:
        current.characteristics.length > 1
          ? current.characteristics.filter((_, itemIndex) => itemIndex !== index)
          : [
              {
                title: "",
                description: "",
              },
            ],
    }));
  }

  return (
    <div className="mt-6 space-y-6">
      {specialistFields.map((field) => (
        <TextAreaCard
          key={field.key}
          label={field.label}
          helper={field.helper}
          placeholder={field.placeholder}
          value={data.fields[field.key] || ""}
          onChange={(value) => updateField(field.key, value)}
        />
      ))}

      <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">
            Personalidade do especialista
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
            Adicione a foto e registre as principais características que ajudam
            a construir a personalidade pública do especialista.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start">
          <div className="flex flex-col items-start gap-3">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-semibold text-white">
              {data.photo ? (
                <img
                  src={data.photo}
                  alt="Foto do especialista"
                  className="h-full w-full object-cover"
                />
              ) : (
                "Foto"
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                Escolher foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={updatePhoto}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={removePhoto}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Remover
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {data.characteristics.map((characteristic, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-slate-700">
                    Característica {index + 1}
                  </label>

                  <button
                    type="button"
                    onClick={() => removeCharacteristic(index)}
                    className="rounded-full border border-red-100 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>

                <input
                  type="text"
                  value={characteristic.title}
                  onChange={(event) =>
                    updateCharacteristic(index, "title", event.target.value)
                  }
                  placeholder="Ex: Estratégico, direto, acolhedor, técnico..."
                  className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <textarea
                  rows={4}
                  value={characteristic.description}
                  onChange={(event) =>
                    updateCharacteristic(
                      index,
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Explique como essa característica aparece na comunicação, no posicionamento e na percepção pública."
                  className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addCharacteristic}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              + Adicionar característica
            </button>
          </div>
        </div>
      </section>

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
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}