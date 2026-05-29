import { ModuleIcon } from "./ModuleIcon";

type KeywordItem = { keyword: string; volume: string; observation: string };
type KeywordsData = {
  sortBy: string;
  keywords: KeywordItem[];
  strategicObservation: string;
};

function isKeywordsData(v: unknown): v is KeywordsData {
  return typeof v === "object" && v !== null && "keywords" in v;
}

export default function PalavrasChavePresentation({ data }: { data: unknown }) {
  const d = isKeywordsData(data) ? data : null;
  const keywords = (d?.keywords ?? []).filter((k) => k.keyword?.trim());
  const strategicObservation = d?.strategicObservation?.trim() ?? "";

  return (
    <article className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950">
            <ModuleIcon slug="palavras-chave" size="lg" inverted />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              Fundamentos Estratégicos
            </p>
            <h2 className="mt-2 text-5xl font-light tracking-[-0.05em] text-slate-950">
              Palavras-chave
            </h2>
          </div>
        </div>
      </section>

      {/* Keywords table */}
      {keywords.length > 0 && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <h3 className="mb-6 text-3xl font-light tracking-[-0.04em] text-slate-950">
            Lista de palavras-chave
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-left font-semibold text-slate-500">
                    Palavra-chave
                  </th>
                  <th className="pb-3 text-left font-semibold text-slate-500">
                    Volume
                  </th>
                  <th className="pb-3 text-left font-semibold text-slate-500">
                    Observação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {keywords.map((kw, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-6 font-medium text-slate-950">
                      {kw.keyword}
                    </td>
                    <td className="py-3 pr-6 text-slate-500">{kw.volume || "—"}</td>
                    <td className="py-3 text-slate-600">{kw.observation || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Strategic observation */}
      {strategicObservation && (
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Observação estratégica
          </p>
          <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
            {strategicObservation}
          </p>
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
