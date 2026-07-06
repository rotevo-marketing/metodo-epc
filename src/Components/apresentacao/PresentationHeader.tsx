import { type ReactNode } from "react";
import { ModuleIcon } from "./ModuleIcon";

/**
 * Shared header for all presentation module pages.
 * Renders the strategic-area eyebrow + icon circle + module title row.
 * Visual reference: EspecialistaPresentation.tsx (approved pattern).
 * Optional children are rendered below the title row (e.g. intro description).
 */
export function PresentationHeader({
  area,
  title,
  slug,
  children,
}: {
  area: string;
  title: string;
  slug: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-8 py-10 lg:px-12 lg:py-12">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
        {area}
      </p>
      <div className="flex items-center gap-4">
        <div className="rotevo-card-icon shrink-0">
          <ModuleIcon slug={slug} size="card" />
        </div>
        <h2 className="text-[1.75rem] font-medium leading-tight tracking-[-0.03em] text-slate-950 sm:text-[2rem]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
