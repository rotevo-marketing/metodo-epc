import { ModuleIcon } from "./ModuleIcon";
import { sanitizeHtml, isHtmlContent } from "@/lib/renderHtml";

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
  const isHtml = isHtmlContent(value);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:p-7">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#5f6f8a]">
        {label}
      </p>
      {isHtml ? (
        <div
          className="text-base leading-7 text-slate-800 [&_a]:text-[#c79e40] [&_a]:underline [&_em]:italic [&_li]:my-1 [&_mark]:bg-yellow-100 [&_mark]:px-0.5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_s]:line-through [&_strong]:font-semibold [&_u]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }}
        />
      ) : (
        <p className="whitespace-pre-wrap text-base leading-7 text-slate-800">
          {value}
        </p>
      )}
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
    <article className="space-y-4">
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
      </section>

      {primaryFields.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
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
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
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
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-500">
            Este módulo ainda não foi preenchido no planejamento.
          </p>
        </section>
      )}
    </article>
  );
}
