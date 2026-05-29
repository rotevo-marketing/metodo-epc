import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "strong", "em", "u", "s", "a",
  "ul", "ol", "li", "mark", "span", "br",
];

const ALLOWED_ATTR = ["href", "target", "rel", "style"];

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  }) as string;
}

export function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}
