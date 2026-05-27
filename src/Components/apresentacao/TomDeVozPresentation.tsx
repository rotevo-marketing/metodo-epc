import { ModuleIcon } from "./ModuleIcon";

type CharacteristicItem = { title: string; description: string };
type ReferenceItem = { image: string; title: string; link: string };

type ToneVoiceData = {
  characteristics: CharacteristicItem[];
  toneChoices: Record<string, string>;
  vocabulary: Record<string, string>;
  emotions: string[];
  observations: string;
  references: ReferenceItem[];
};

function isToneVoiceData(v: unknown): v is ToneVoiceData {
  return typeof v === "object" && v !== null && "toneChoices" in v;
}

const tonePairs = [
  { key: "acolhedorCritico", number: 1, left: "Acolhedor", right: "Crítico" },
  { key: "engracadoSerio", number: 2, left: "Engraçado", right: "Sério" },
  { key: "sarcasticoSolene", number: 3, left: "Sarcástico", right: "Solene" },
  { key: "formalCasual", number: 4, left: "Formal", right: "Casual" },
  { key: "respeitosoIrreverente", number: 5, left: "Respeitoso", right: "Irreverente" },
  { key: "filosoficoLogico", number: 6, left: "Filosófico", right: "Lógico" },
  { key: "tecnicoLeigo", number: 7, left: "Técnico", right: "Leigo" },
  { key: "inspiradorRepreensor", number: 8, left: "Inspirador", right: "Repreensor" },
  { key: "educativoNarrativo", number: 9, left: "Educativo", right: "Narrativo" },
  { key: "emocionalRacional", number: 10, left: "Emocional", right: "Racional" },
  { key: "suaveEnfatico", number: 11, left: "Suave", right: "Enfático" },
  { key: "amorosoContestador", number: 12, left: "Amoroso", right: "Contestador" },
  { key: "agressivoAmigavel", number: 13, left: "Agressivo", right: "Amigável" },
  { key: "rapidoLento", number: 14, left: "Rápido", right: "Lento" },
];

const vocabularyFields: [string, string][] = [
  ["termosAutorais", "Termos autorais"],
  ["termosTecnicosNecessarios", "Termos técnicos necessários"],
  ["termosQueSeRepetem", "Termos que se repetem"],
  ["termosProibidos", "Termos proibidos"],
  ["metaforasEAnalogias", "Metáforas e analogias"],
  ["elementosDaNarrativa", "Elementos da narrativa"],
];

function ToneBar({
  left,
  right,
  value,
}: {
  left: string;
  right: string;
  value: string | undefined;
}) {
  const isLeft = value === "left";
  const isRight = value === "right";
  const hasValue = isLeft || isRight;

  return (
    <div className="flex items-center gap-4">
      <span
        className={`w-28 text-right text-sm font-medium ${isLeft ? "text-slate-950" : "text-slate-400"}`}
      >
        {left}
      </span>

      <div className="flex flex-1 items-center justify-between gap-1">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const isSelected =
            (isLeft && i === 0) || (isRight && i === 6);
          return (
            <div
              key={i}
              className={`rounded-full transition ${
                i === 0 || i === 6
                  ? `h-4 w-4 ${isSelected ? "bg-slate-950" : "bg-slate-200"}`
                  : `h-2 w-2 ${hasValue ? "bg-slate-200" : "bg-slate-200"}`
              }`}
            />
          );
        })}
      </div>

      <span
        className={`w-28 text-sm font-medium ${isRight ? "text-slate-950" : "text-slate-400"}`}
      >
        {right}
      </span>
    </div>
  );
}

export default function TomDeVozPresentation({ data }: { data: unknown }) {
  const d = isToneVoiceData(data) ? data : null;
  const characteristics = (d?.characteristics ?? []).filter(
    (c) => c.title?.trim() || c.description?.trim()
  );
  const toneChoices = d?.toneChoices ?? {};
  const vocabulary = d?.vocabulary ?? {};
  const emotions = (d?.emotions ?? []).filter(Boolean);
  const observations = d?.observations?.trim() ?? "";
  const references = (d?.references ?? []).filter(
    (r) => r.title?.trim() || r.image?.trim()
  );

  const filledVocabulary = vocabularyFields.filter(([k]) => vocabulary[k]?.trim());
  const filledTones = tonePairs.filter((p) => toneChoices[p.key]);

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="tom-de-voz" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Essência do Projeto
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Tom de Voz
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          A personalidade sonora da marca: como ela fala, quais emoções transmite,
          que vocabulário usa e como se posiciona no espectro de cada característica.
        </p>
      </section>

      {/* Characteristics */}
      {characteristics.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Características do tom
          </h3>
          <div className="space-y-6">
            {characteristics.map((c, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
              >
                {c.title && (
                  <p className="mb-2 text-sm font-semibold text-slate-950">
                    {c.title}
                  </p>
                )}
                {c.description && (
                  <p className="text-sm leading-7 text-slate-600">{c.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tone choices */}
      {filledTones.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Posicionamento de tom
          </h3>
          <div className="space-y-5">
            {filledTones.map((pair) => (
              <div key={pair.key}>
                <div className="mb-1 flex justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                  <span>{pair.number}</span>
                </div>
                <ToneBar
                  left={pair.left}
                  right={pair.right}
                  value={toneChoices[pair.key]}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Emotions */}
      {emotions.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-6 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Emoções transmitidas
          </h3>
          <div className="flex flex-wrap gap-2">
            {emotions.map((e, i) => (
              <span
                key={i}
                className="rounded-full bg-slate-950 px-4 py-1.5 text-sm font-medium text-white"
              >
                {e}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Vocabulary */}
      {filledVocabulary.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Vocabulário da marca
          </h3>
          <div className="space-y-8">
            {filledVocabulary.map(([key, label]) => (
              <div key={key}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {label}
                </p>
                <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
                  {vocabulary[key]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Observations */}
      {observations && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-5 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Observações
          </h3>
          <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
            {observations}
          </p>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-8 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Referências de tom
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {references.map((ref, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200"
              >
                {ref.image && (
                  <img
                    src={ref.image}
                    alt={ref.title || "Referência"}
                    className="aspect-video w-full object-cover"
                  />
                )}
                {(ref.title || ref.link) && (
                  <div className="p-4">
                    {ref.title && (
                      <p className="text-sm font-semibold text-slate-950">
                        {ref.title}
                      </p>
                    )}
                    {ref.link && (
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block text-xs text-slate-500 hover:text-slate-950"
                      >
                        {ref.link}
                      </a>
                    )}
                  </div>
                )}
              </div>
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
