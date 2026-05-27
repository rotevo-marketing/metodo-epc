"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

export type CompanyData = {
  fields: Record<string, string>;
};

export const initialCompanyData: CompanyData = {
  fields: {},
};

const companyFields = [
  {
    key: "quemEAEmpresa",
    label: "Quem é a empresa",
    placeholder:
      "Descreva a empresa, o que ela representa, em qual mercado atua e qual papel ocupa para o público.",
  },
  {
    key: "oQueFaz",
    label: "O que a empresa faz",
    placeholder:
      "Explique os principais serviços, produtos, soluções ou entregas da empresa.",
  },
  {
    key: "historia",
    label: "História da empresa",
    placeholder:
      "Conte a origem, evolução, viradas de chave, marcos importantes e momentos relevantes da empresa.",
  },
  {
    key: "posicionamento",
    label: "Posicionamento",
    placeholder:
      "Descreva como a empresa deve ser percebida no mercado e qual lugar ela deve ocupar na mente do público.",
  },
  {
    key: "diferenciais",
    label: "Diferenciais competitivos",
    placeholder:
      "Liste os diferenciais que tornam a empresa mais forte, confiável, específica ou relevante do que outras opções.",
  },
  {
    key: "publico",
    label: "Público principal",
    placeholder:
      "Descreva quem a empresa atende, quais perfis são prioritários e quais públicos devem ser evitados ou filtrados.",
  },
  {
    key: "problemasQueResolve",
    label: "Problemas que resolve",
    placeholder:
      "Quais dores, dificuldades, riscos, travas ou desejos a empresa ajuda o público a resolver?",
  },
  {
    key: "transformacao",
    label: "Transformação entregue",
    placeholder:
      "Descreva a transformação que o cliente vive depois de comprar, contratar ou se relacionar com a empresa.",
  },
  {
    key: "propostaDeValor",
    label: "Proposta de valor",
    placeholder:
      "Explique a promessa central da empresa de forma clara, estratégica e orientada ao valor percebido pelo cliente.",
  },
  {
    key: "missao",
    label: "Missão",
    placeholder:
      "Descreva o propósito prático da empresa, o que ela faz, para quem faz e por que isso importa.",
  },
  {
    key: "visao",
    label: "Visão",
    placeholder:
      "Descreva onde a empresa deseja chegar e qual futuro ela quer construir no mercado.",
  },
  {
    key: "valores",
    label: "Valores",
    placeholder:
      "Liste os princípios, crenças e comportamentos que devem orientar a comunicação e a atuação da empresa.",
  },
  {
    key: "autoridade",
    label: "Autoridade e provas",
    placeholder:
      "Inclua dados, cases, resultados, números, reconhecimentos, experiências ou elementos que sustentam a autoridade da empresa.",
  },
  {
    key: "percepcaoDesejada",
    label: "Percepção desejada",
    placeholder:
      "Como a empresa quer ser lembrada, percebida e comparada pelo público certo?",
  },
];

function TextAreaCard({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <label className="text-sm font-semibold text-slate-950">{label}</label>

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

type EmpresaFormProps = {
  data: CompanyData;
  setData: Dispatch<SetStateAction<CompanyData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function EmpresaForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: EmpresaFormProps) {
  function updateField(key: string, value: string) {
    setData((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value,
      },
    }));
  }

  return (
    <div className="mt-6 space-y-6">
      {companyFields.map((field) => (
        <TextAreaCard
          key={field.key}
          label={field.label}
          placeholder={field.placeholder}
          value={data.fields[field.key] || ""}
          onChange={(value) => updateField(field.key, value)}
        />
      ))}

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