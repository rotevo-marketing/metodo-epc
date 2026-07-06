import { PresentationHeader } from "./PresentationHeader";
import { RichText } from "./RichText";

type ContentDnaData = {
  fields: Record<string, string>;
  secondaryIdeas: string[];
};

function isContentDnaData(v: unknown): v is ContentDnaData {
  return typeof v === "object" && v !== null && "fields" in v;
}

const fieldLabels: [string, string][] = [
  ["posicionamentoUnico", "Posicionamento único"],
  ["propostaUnicaValor", "Proposta única de valor"],
  ["maiorTransformacao", "Maior transformação que o conteúdo entrega"],
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

export default function DnaConteudoPresentation({ data }: { data: unknown }) {
  const d = isContentDnaData(data) ? data : null;
  const fields = d?.fields ?? {};
  const secondaryIdeas = (d?.secondaryIdeas ?? []).filter((s) => s?.trim());

  const bigIdea = fields["bigIdea"]?.trim();
  const otherFields = fieldLabels.filter(([k]) => fields[k]?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      {/* Cabeçalho */}
      <PresentationHeader
        area="Essência do Projeto"
        title="DNA de Conteúdo"
        slug="dna-de-conteudo"
      />

      {/* Fundamentos */}
      {otherFields.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Fundamentos do DNA
          </h3>
          <div className="space-y-4">
            {otherFields.map(([key, label]) => (
              <Field key={key} label={label} value={fields[key] ?? ""} />
            ))}
          </div>
        </section>
      )}

      {/* Big Idea */}
      {bigIdea && (
        <section className="p-8 lg:p-12">
          <Field label="Big Idea do Conteúdo" value={bigIdea} />
        </section>
      )}

      {/* Ideias secundárias */}
      {secondaryIdeas.length > 0 && (
        <section className="p-8 lg:p-12">
          <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            Ideias secundárias
          </h3>
          <ul className="space-y-3">
            {secondaryIdeas.map((idea, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base leading-7 text-slate-700"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                {idea}
              </li>
            ))}
          </ul>
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
