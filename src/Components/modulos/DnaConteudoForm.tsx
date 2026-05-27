"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

export type ContentDnaData = {
  fields: Record<string, string>;
  secondaryIdeas: string[];
};

export const initialContentDnaData: ContentDnaData = {
  fields: {},
  secondaryIdeas: [""],
};

const contentDnaFields = [
  {
    key: "posicionamentoUnico",
    label: "Posicionamento único",
    helper: "É a forma como o seu cliente quer ser visto pelo mercado.",
    placeholder:
      "Ex: Ser reconhecida como referência em reestruturação interna para empresários em expansão, atuando diretamente na estrutura invisível que sustenta decisões, crescimento e resultados.",
  },
  {
    key: "propostaUnicaValor",
    label: "Proposta única de valor",
    helper: "É o valor mais peculiar do negócio que está emitindo o conteúdo.",
    placeholder:
      "Ex: Revelar e reorganizar a base interna que sustenta os resultados do empresário, integrando identidade de liderança, mentalidade financeira e padrões de decisão.",
  },
  {
    key: "maiorTransformacao",
    label: "Maior transformação que o conteúdo entrega",
    helper:
      "É a grande diferença do conteúdo, o que ele torna único e inigualável na mente dos consumidores.",
    placeholder:
      "Ex: O conteúdo conduz o empresário a reconhecer que o limite do seu crescimento não está na estratégia externa, mas na sua estrutura interna.",
  },
  {
    key: "bigIdea",
    label: "A Big Idea do conteúdo",
    helper:
      "É a ideia genial, a ideia master, que vai nortear todas as produções desse conteúdo.",
    placeholder:
      "Ex: Você não nasceu para construir um negócio e perder a si mesmo no processo.",
  },
];

function TextAreaCard({
  label,
  helper,
  placeholder,
  value,
  onChange,
  rows = 4,
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

type DnaConteudoFormProps = {
  data: ContentDnaData;
  setData: Dispatch<SetStateAction<ContentDnaData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function DnaConteudoForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: DnaConteudoFormProps) {
  function updateField(key: string, value: string) {
    setData((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value,
      },
    }));
  }

  function updateSecondaryIdea(index: number, value: string) {
    setData((current) => {
      const next = [...current.secondaryIdeas];
      next[index] = value;

      return {
        ...current,
        secondaryIdeas: next,
      };
    });
  }

  function addSecondaryIdea() {
    setData((current) => ({
      ...current,
      secondaryIdeas: [...current.secondaryIdeas, ""],
    }));
  }

  function removeSecondaryIdea(index: number) {
    setData((current) => ({
      ...current,
      secondaryIdeas:
        current.secondaryIdeas.length > 1
          ? current.secondaryIdeas.filter((_, itemIndex) => itemIndex !== index)
          : [""],
    }));
  }

  return (
    <div className="mt-6 space-y-6">
      {contentDnaFields.map((field) => (
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
        <label className="text-sm font-semibold text-slate-950">
          Ideias secundárias
        </label>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          São ideias derivadas da Big Idea e que podem contribuir para a
          diferenciação do conteúdo.
        </p>

        <div className="mt-5 space-y-3">
          {data.secondaryIdeas.map((idea, index) => (
            <div key={index} className="flex gap-3">
              <input
                value={idea}
                onChange={(event) =>
                  updateSecondaryIdea(index, event.target.value)
                }
                placeholder="Ideia"
                className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <button
                type="button"
                onClick={() => removeSecondaryIdea(index)}
                className="h-12 cursor-pointer rounded-full px-4 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addSecondaryIdea}
          className="mt-5 cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white hover:ring-slate-950"
        >
          + Nova ideia
        </button>
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
            className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Salvando..." : "Salvar módulo"}
          </button>
        </div>
      </div>
    </div>
  );
}