"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

export type SwotData = {
  fields: Record<string, string>;
  synthesis: string;
};

export const initialSwotData: SwotData = {
  fields: {},
  synthesis: "",
};

const camposSwot = [
  {
    key: "forcas",
    label: "Forças",
    description:
      "Ambiente interno. Pontos fortes e diferenciais competitivos. Habilidades, competências e recursos.",
    placeholder:
      "Liste as forças do projeto, como diferenciais, ativos, autoridade, recursos, reputação, experiência, equipe, método, resultados e vantagens competitivas.",
  },
  {
    key: "fraquezas",
    label: "Fraquezas",
    description:
      "Ambiente interno. Limitações ou desvantagens que podem impactar a performance do negócio. O que é preciso melhorar para se manter bem no mercado.",
    placeholder:
      "Liste fraquezas, limitações, pontos de melhoria, gargalos internos, falta de clareza, ausência de processos, baixa presença digital ou outros desafios internos.",
  },
  {
    key: "oportunidades",
    label: "Oportunidades",
    description:
      "Ambiente externo. Situações ou cenários que podem representar uma oportunidade de posicionamento ou crescimento do negócio.",
    placeholder:
      "Liste oportunidades do mercado, tendências, demandas, mudanças de comportamento, canais pouco explorados, temas emergentes e espaços estratégicos.",
  },
  {
    key: "ameacas",
    label: "Ameaças",
    description:
      "Ambiente externo. Situações ou cenários que podem gerar impacto negativo no negócio.",
    placeholder:
      "Liste ameaças externas, como concorrência, saturação de mercado, mudanças de algoritmo, objeções do público, crises, riscos de reputação ou barreiras comerciais.",
  },
];

type AnaliseSwotFormProps = {
  data: SwotData;
  setData: Dispatch<SetStateAction<SwotData>>;
  clientSlug: string;
  presentationHref: string;
  isSaving: boolean;
  isDisabled: boolean;
  onSave: () => void;
};

export default function AnaliseSwotForm({
  data,
  setData,
  clientSlug,
  presentationHref,
  isSaving,
  isDisabled,
  onSave,
}: AnaliseSwotFormProps) {
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
      {camposSwot.map((campo) => (
        <div
          key={campo.key}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <label className="block text-xl font-bold text-slate-950">
            {campo.label}
          </label>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {campo.description}
          </p>

          <textarea
            rows={6}
            value={data.fields[campo.key] || ""}
            onChange={(event) => updateField(campo.key, event.target.value)}
            placeholder={campo.placeholder}
            className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>
      ))}

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <label className="block text-sm font-semibold text-slate-700">
          Síntese estratégica da SWOT
        </label>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Use este campo para transformar a análise em direcionamentos práticos
          para o planejamento.
        </p>

        <textarea
          rows={6}
          value={data.synthesis}
          onChange={(event) =>
            setData((current) => ({
              ...current,
              synthesis: event.target.value,
            }))
          }
          placeholder="Registre as principais conclusões da análise SWOT e como elas devem orientar as decisões do projeto."
          className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />
      </div>

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