import { ModuleIcon } from "./ModuleIcon";

type ContentDnaData = {
  fields: Record<string, string>;
  secondaryIdeas: string[];
};

function isContentDnaData(v: unknown): v is ContentDnaData {
  return typeof v === "object" && v !== null && "fields" in v;
}

const fieldLabels: [string, string, string][] = [
  [
    "posicionamentoUnico",
    "Posicionamento único",
    "É a forma como o seu cliente quer ser visto pelo mercado.",
  ],
  [
    "propostaUnicaValor",
    "Proposta única de valor",
    "É o valor mais peculiar do negócio que está emitindo o conteúdo.",
  ],
  [
    "maiorTransformacao",
    "Maior transformação que o conteúdo entrega",
    "É a grande diferença do conteúdo, o que ele torna único e inigualável na mente dos consumidores.",
  ],
  [
    "bigIdea",
    "A Big Idea do conteúdo",
    "É a ideia genial, a ideia master, que vai nortear todas as produções desse conteúdo.",
  ],
];

export default function DnaConteudoPresentation({ data }: { data: unknown }) {
  const d = isContentDnaData(data) ? data : null;
  const fields = d?.fields ?? {};
  const secondaryIdeas = (d?.secondaryIdeas ?? []).filter((s) => s?.trim());

  const bigIdea = fields["bigIdea"]?.trim();
  const otherFields = fieldLabels.filter(
    ([k]) => k !== "bigIdea" && fields[k]?.trim()
  );

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="dna-de-conteudo" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Essência do Projeto
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              DNA de Conteúdo
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          O núcleo que orienta toda a produção de conteúdo: posicionamento,
          proposta de valor, transformação entregue e a Big Idea que norteia
          a comunicação.
        </p>
      </section>

      {/* Fundamentos do DNA */}
      {otherFields.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-xl font-semibold tracking-tight text-slate-950 md:text-2xl">
            Fundamentos do DNA
          </h3>

          <div className="space-y-10">
            {otherFields.map(([key, label, helper]) => (
              <div key={key}>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6f7f99]">
                  {label}
                </p>
                {helper && (
                  <p className="mb-3 text-sm text-slate-500">{helper}</p>
                )}
                <p className="whitespace-pre-wrap text-base leading-8 text-slate-700 md:text-lg">
                  {fields[key]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Big Idea — after Fundamentos, before Ideias secundárias */}
      {bigIdea && (
        <section className="rounded-[2rem] border border-[#c79e40]/20 bg-[#c79e40]/10 p-8 shadow-sm lg:p-12">
          <p className="mb-6 text-base font-semibold uppercase tracking-[0.26em] text-[#6f7f99]">
            Big Idea do Conteúdo
          </p>
          <p className="text-lg leading-relaxed text-slate-900 md:text-xl">
            {bigIdea}
          </p>
        </section>
      )}

      {/* Ideias secundárias */}
      {secondaryIdeas.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-xl font-semibold tracking-tight text-slate-950 md:text-2xl">
            Ideias secundárias
          </h3>
          <ul className="space-y-3">
            {secondaryIdeas.map((idea, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base leading-7 text-slate-700"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c79e40]/50" />
                {idea}
              </li>
            ))}
          </ul>
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
