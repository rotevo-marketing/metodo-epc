import { sanitizeHtml, isHtmlContent } from "@/lib/renderHtml";

const htmlStyles =
  "[&_a]:text-slate-900 [&_a]:underline [&_em]:italic [&_li]:my-1 [&_mark]:bg-slate-100 [&_mark]:px-0.5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_s]:line-through [&_strong]:font-semibold [&_u]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5";

export function RichText({
  content,
  className = "text-sm leading-7 text-slate-700",
}: {
  content: string;
  className?: string;
}) {
  if (!content?.trim()) return null;

  if (isHtmlContent(content)) {
    return (
      <div
        className={`${className} ${htmlStyles}`}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
    );
  }

  return (
    <p className={`whitespace-pre-wrap ${className}`}>{content}</p>
  );
}
