import { ModuleIcon } from "./ModuleIcon";
import { RichText } from "./RichText";

type SwotData = { fields: Record<string, string>; synthesis: string };

function isSwotData(v: unknown): v is SwotData {
  return typeof v === "object" && v !== null && "fields" in v;
}

const swotQuadrants = [
  {
    key: "forcas",
    label: "Forças",
    description: "Ambiente interno — pontos fortes e diferenciais competitivos",
    color: "bg-emerald-50 ring-emerald-200",
    labelColor: "text-emerald-700",
  },
  {
    key: "fraquezas",
    label: "Fraquezas",
    description: "Ambiente interno — limitações e pontos de melhoria",
    color: "bg-red-50 ring-red-200",
    labelColor: "text-red-700",
  },
  {
    key: "oportunidades",
    label: "Oportunidades",
    description: "Ambiente externo — cenários de crescimento e posicionamento",
    color: "bg-blue-50 ring-blue-200",
    labelColor: "text-blue-700",
  },
  {
    key: "ameacas",
    label: "Ameaças",
    description: "Ambiente externo — riscos e impactos negativos",
    color: "bg-slate-50 ring-slate-200",
    labelColor: "text-slate-600",
  },
] as const;

export default function AnaliseSwotPresentation({ data }: { data: unknown }) {
  const d = isSwotData(data) ? data : null;
  const fields = d?.fields ?? {};
  const synthesis = d?.synthesis?.trim() ?? "";
  const filledQuadrants = swotQuadrants.filter((q) => fields[q.key]?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      {/* Header */}
      <section className="p-8 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="analise-swot" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Fundamentos Estratégicos
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Análise SWOT
            </h2>
          </div>
        </div>
      </section>

      {/* SWOT grid */}
      {filledQuadrants.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Matriz SWOT
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {filledQuadrants.map((q) => (
              <div
                key={q.key}
                className={`rounded-2xl p-6 ring-1 ${q.color}`}
              >
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${q.labelColor}`}>
                  {q.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{q.description}</p>
                <RichText content={fields[q.key]} className="mt-4 text-sm leading-7 text-slate-700" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Synthesis */}
      {synthesis && (
        <section className="p-8 lg:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Síntese estratégica
          </p>
          <RichText content={synthesis} className="text-base leading-8 text-slate-700" />
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
