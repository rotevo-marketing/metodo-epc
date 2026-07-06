import { PresentationHeader } from "./PresentationHeader";
import { RichText } from "./RichText";

type CompanyData = { fields: Record<string, string> };

function isCompanyData(v: unknown): v is CompanyData {
  return typeof v === "object" && v !== null && "fields" in v;
}

const fieldLabels: [string, string][] = [
  ["quemEAEmpresa", "Quem é a empresa"],
  ["oQueFaz", "O que a empresa faz"],
  ["historia", "História da empresa"],
  ["posicionamento", "Posicionamento"],
  ["diferenciais", "Diferenciais competitivos"],
  ["publico", "Público principal"],
  ["problemasQueResolve", "Problemas que resolve"],
  ["transformacao", "Transformação entregue"],
  ["propostaDeValor", "Proposta de valor"],
  ["missao", "Missão"],
  ["visao", "Visão"],
  ["valores", "Valores"],
  ["autoridade", "Autoridade"],
  ["percepcaoDesejada", "Percepção desejada"],
];

const strategicKeys = [
  "missao",
  "visao",
  "valores",
  "posicionamento",
  "propostaDeValor",
  "percepcaoDesejada",
];

export default function EmpresaPresentation({ data }: { data: unknown }) {
  const d = isCompanyData(data) ? data : null;
  const fields = d?.fields ?? {};

  const primaryFields = fieldLabels.filter(
    ([k]) => !strategicKeys.includes(k) && fields[k]?.trim()
  );
  const stratFields = fieldLabels.filter(
    ([k]) => strategicKeys.includes(k) && fields[k]?.trim()
  );

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Essência do Projeto"
        title="Empresa"
        slug="dna-da-empresa"
      />

      {primaryFields.length > 0 && (
        <section className="px-8 py-10 lg:px-12">
          <h3 className="mb-8 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950 sm:text-[1.5rem]">
            Sobre a empresa
          </h3>
          <div className="divide-y divide-slate-100">
            {primaryFields.map(([key, label], i) => (
              <div key={key} className={i === 0 ? "pb-6" : "py-6"}>
                <p className="mb-3 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
                  {label}
                </p>
                <RichText
                  content={fields[key] ?? ""}
                  className="text-base leading-[1.75] text-slate-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {stratFields.length > 0 && (
        <section className="px-8 py-10 lg:px-12">
          <h3 className="mb-8 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950 sm:text-[1.5rem]">
            Fundamentos estratégicos
          </h3>
          <div className="divide-y divide-slate-100">
            {stratFields.map(([key, label], i) => (
              <div key={key} className={i === 0 ? "pb-6" : "py-6"}>
                <p className="mb-3 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
                  {label}
                </p>
                <RichText
                  content={fields[key] ?? ""}
                  className="text-base leading-[1.75] text-slate-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {!d && (
        <section className="p-8">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
