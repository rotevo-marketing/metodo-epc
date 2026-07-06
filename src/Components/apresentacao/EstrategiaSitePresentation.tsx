import { PresentationHeader } from "./PresentationHeader";
import {
  SectionCard,
  EmptyState,
  FieldBlock,
} from "./ChannelPresentationShared";

type SiteReference = { title: string; url: string };
type ExternalReference = { title: string; link: string };

type SiteStrategyData = {
  visualIdentity: string;
  references: SiteReference[];
  integrations: { name: string }[];
  essentialPages: { value: string }[];
  importantFeatures: { value: string }[];
  strategicNotes: string;
  externalReferences: ExternalReference[];
};

function isSiteStrategyData(v: unknown): v is SiteStrategyData {
  return typeof v === "object" && v !== null && "essentialPages" in v;
}

export default function EstrategiaSitePresentation({ data }: { data: unknown }) {
  const d = isSiteStrategyData(data) ? data : null;
  const filledPages = (d?.essentialPages ?? []).filter((p) => p.value?.trim());
  const filledFeatures = (d?.importantFeatures ?? []).filter((f) => f.value?.trim());
  const filledIntegrations = (d?.integrations ?? []).filter((i) => i.name?.trim());
  const filledRefs = (d?.references ?? []).filter((r) => r.title?.trim() || r.url?.trim());
  const filledExtRefs = (d?.externalReferences ?? []).filter((r) => r.title?.trim() || r.link?.trim());

  return (
    <article className="divide-y divide-slate-100 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <PresentationHeader
        area="Estratégia Editorial e Distribuição de Conteúdo"
        title="Estratégia do Site"
        slug="estrategia-do-site"
      />

      {d?.visualIdentity && (
        <SectionCard title="Identidade visual">
          <FieldBlock label="Identidade visual" value={d.visualIdentity} />
        </SectionCard>
      )}

      {(filledPages.length > 0 || filledFeatures.length > 0) && (
        <SectionCard title="Estrutura do site">
          {filledPages.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Páginas essenciais
              </p>
              <ul className="space-y-1.5">
                {filledPages.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    {p.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {filledFeatures.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Funcionalidades importantes
              </p>
              <ul className="space-y-1.5">
                {filledFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    {f.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </SectionCard>
      )}

      {filledIntegrations.length > 0 && (
        <SectionCard title="Integrações">
          <div className="flex flex-wrap gap-2">
            {filledIntegrations.map((item, i) => (
              <span
                key={i}
                className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
              >
                {item.name}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      {d?.strategicNotes && (
        <SectionCard title="Observações estratégicas">
          <FieldBlock label="Observações" value={d.strategicNotes} />
        </SectionCard>
      )}

      {filledRefs.length > 0 && (
        <SectionCard title="Referências visuais do site">
          <ul className="space-y-2">
            {filledRefs.map((r, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    {r.title || r.url}
                  </a>
                ) : (
                  <span className="text-slate-700">{r.title}</span>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {filledExtRefs.length > 0 && (
        <SectionCard title="Referências externas">
          <ul className="space-y-2">
            {filledExtRefs.map((r, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                {r.link ? (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    {r.title || r.link}
                  </a>
                ) : (
                  <span className="text-slate-700">{r.title}</span>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {!d && <EmptyState />}
    </article>
  );
}
