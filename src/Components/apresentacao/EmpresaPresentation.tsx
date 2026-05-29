import { ModuleIcon } from "./ModuleIcon";

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

function Field({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <h4 className="mb-2 text-base font-semibold tracking-tight text-slate-950 md:text-lg">
        {label}
      </h4>
      <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">{value}</p>
    </div>
  );
}

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
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="dna-da-empresa" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Essência do Projeto
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Empresa
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          A identidade profunda da empresa: o que é, o que entrega, para quem
          serve, como se posiciona e qual transformação promove.
        </p>
      </section>

      {/* Primary fields */}
      {primaryFields.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Sobre a empresa
          </h3>
          <div className="space-y-8">
            {primaryFields.map(([key, label]) => (
              <Field key={key} label={label} value={fields[key] ?? ""} />
            ))}
          </div>
        </section>
      )}

      {/* Strategic fields */}
      {stratFields.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Fundamentos estratégicos
          </h3>
          <div className="space-y-8">
            {stratFields.map(([key, label]) => (
              <Field key={key} label={label} value={fields[key] ?? ""} />
            ))}
          </div>
        </section>
      )}

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
