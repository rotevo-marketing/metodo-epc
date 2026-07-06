import { PresentationHeader } from "./PresentationHeader";
import { RichText } from "./RichText";

// ─── Types ────────────────────────────────────────────────────────────────────

type SpecialistCharacteristic = { title: string; description: string };

type SpecialistData = {
  fields: Record<string, string>;
  photo: string;
  characteristics: SpecialistCharacteristic[];
};

function isSpecialistData(v: unknown): v is SpecialistData {
  return typeof v === "object" && v !== null && "fields" in v;
}

const fieldLabels: [string, string][] = [
  ["quemEoQueFaz", "Quem é e o que faz"],
  ["especialidadesExpertise", "Especialidades e expertise"],
  ["trajetoriaProfissional", "Trajetória profissional"],
  ["historiaPessoal", "História pessoal"],
  ["marcosConquistas", "Marcos e conquistas"],
  ["bandeirasCausas", "Bandeiras e causas"],
  ["propositoDigital", "Propósito no digital"],
  ["autodefinicao", "Autodefinição"],
  ["comoGostariaDeSerVisto", "Como gostaria de ser visto"],
];

// ─── Local sub-components ─────────────────────────────────────────────────────
// Same pattern as ObjetivosPresentation — extractable to a shared file in the future.

function SpecialistSectionTitle({ title }: { title: string }) {
  return (
    <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-slate-800">
      {title}
    </p>
  );
}

function SpecialistPersonalityItem({
  c,
  index,
}: {
  c: SpecialistCharacteristic;
  index: number;
}) {
  if (!c.title?.trim() && !c.description?.trim()) return null;
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[0.15rem] shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-slate-500">
        {num}
      </span>
      <div className="min-w-0 flex-1">
        {c.title && (
          <p className="text-[0.9375rem] font-semibold leading-snug text-slate-950">
            {c.title}
          </p>
        )}
        {c.description?.trim() && (
          <RichText
            content={c.description}
            className="mt-2 text-sm leading-[1.8] text-slate-600"
          />
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function EspecialistaPresentation({ data }: { data: unknown }) {
  const d = isSpecialistData(data) ? data : null;
  const fields = d?.fields ?? {};
  const photo = d?.photo ?? "";
  const characteristics = (d?.characteristics ?? []).filter(
    (c) => c.title?.trim() || c.description?.trim()
  );
  const filledFields = fieldLabels.filter(([k]) => fields[k]?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">

      {/* ── Cabeçalho ───────────────────────────────────────── */}
      <PresentationHeader
        area="Essência do Projeto"
        title="Especialista"
        slug="dna-do-especialista"
      />

      {/* ── Foto standalone (apenas quando não há características) ── */}
      {photo && characteristics.length === 0 && (
        <section className="px-8 py-10 lg:px-12">
          <SpecialistSectionTitle title="Foto do especialista" />
          <img
            src={photo}
            alt="Especialista"
            className="max-h-96 w-auto rounded-2xl object-cover"
          />
        </section>
      )}

      {/* ── Sobre o especialista ─────────────────────────────── */}
      {filledFields.length > 0 && (
        <section className="px-8 py-10 lg:px-12">
          <h3 className="mb-8 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950 sm:text-[1.5rem]">
            Sobre o especialista
          </h3>
          <div className="divide-y divide-slate-100">
            {filledFields.map(([key, label], i) => (
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

      {/* ── Personalidade do especialista ────────────────────── */}
      {characteristics.length > 0 && (
        <section className="px-8 py-10 lg:px-12">
          <SpecialistSectionTitle title="Personalidade do especialista" />

          {photo && (
            <div className="mb-10 flex justify-start">
              <img
                src={photo}
                alt="Especialista"
                className="h-28 w-28 rounded-full border border-slate-200 object-cover sm:h-32 sm:w-32"
              />
            </div>
          )}

          <div className="grid gap-7 sm:grid-cols-2">
            {characteristics.slice(0, 4).map((c, i) => (
              <SpecialistPersonalityItem key={i} c={c} index={i} />
            ))}
          </div>

          {characteristics.length > 4 && (
            <div className="mt-7 grid gap-7 border-t border-slate-100 pt-7 sm:grid-cols-2">
              {characteristics.slice(4).map((c, i) => (
                <SpecialistPersonalityItem key={i} c={c} index={i + 4} />
              ))}
            </div>
          )}
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
