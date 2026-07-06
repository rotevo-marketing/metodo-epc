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

export default function DnaConteudoPresentation({ data }: { data: unknown }) {
  const d = isContentDnaData(data) ? data : null;
  const fields = d?.fields ?? {};
  const secondaryIdeas = (d?.secondaryIdeas ?? []).filter((s) => s?.trim());

  const bigIdea = fields["bigIdea"]?.trim();
  const otherFields = fieldLabels.filter(([k]) => fields[k]?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Essência do Projeto"
        title="DNA de Conteúdo"
        slug="dna-de-conteudo"
      />

      {otherFields.length > 0 && (
        <section className="px-8 py-10 lg:px-12">
          <h3 className="mb-8 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950 sm:text-[1.5rem]">
            Fundamentos do DNA
          </h3>
          <div className="divide-y divide-slate-100">
            {otherFields.map(([key, label], i) => (
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

      {bigIdea && (
        <section className="px-8 py-10 lg:px-12">
          <p className="mb-3 font-display text-[1.125rem] font-semibold text-slate-900 sm:text-[1.25rem]">
            Big Idea do Conteúdo
          </p>
          <RichText content={bigIdea} className="text-base leading-[1.75] text-slate-700" />
        </section>
      )}

      {secondaryIdeas.length > 0 && (
        <section className="px-8 py-10 lg:px-12">
          <h3 className="mb-8 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950 sm:text-[1.5rem]">
            Ideias secundárias
          </h3>
          <ul className="space-y-3">
            {secondaryIdeas.map((idea, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base leading-[1.75] text-slate-700"
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
