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

function Field({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:p-7">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#5f6f8a]">
        {label}
      </p>
      <RichText content={value} className="text-base leading-7 text-slate-800" />
    </div>
  );
}

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
      {/* Cabeçalho */}
      <PresentationHeader
        area="Essência do Projeto"
        title="Empresa"
        slug="dna-da-empresa"
      />

      {primaryFields.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Sobre a empresa
          </h3>
          <div className="space-y-4">
            {primaryFields.map(([key, label]) => (
              <Field key={key} label={label} value={fields[key] ?? ""} />
            ))}
          </div>
        </section>
      )}

      {stratFields.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Fundamentos estratégicos
          </h3>
          <div className="space-y-4">
            {stratFields.map(([key, label]) => (
              <Field key={key} label={label} value={fields[key] ?? ""} />
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
