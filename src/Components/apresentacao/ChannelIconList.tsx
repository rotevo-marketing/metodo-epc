export type ChannelKey =
  | "site"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "linkedin"
  | "whatsapp"
  | "blog"
  | "pinterest"
  | "podcast";

export const channelLabels: { key: ChannelKey; label: string; icon: string }[] = [
  { key: "site",      label: "Site",      icon: "/icons/29-estrategia-do-site.svg" },
  { key: "instagram", label: "Instagram", icon: "/icons/18-instagram.svg" },
  { key: "tiktok",    label: "TikTok",    icon: "/icons/19-tik-tok.svg" },
  { key: "youtube",   label: "YouTube",   icon: "/icons/20-youtube.svg" },
  { key: "facebook",  label: "Facebook",  icon: "/icons/21-facebook.svg" },
  { key: "linkedin",  label: "LinkedIn",  icon: "/icons/22-linkedin.svg" },
  { key: "whatsapp",  label: "WhatsApp",  icon: "/icons/23-whatsaap.svg" },
  { key: "blog",      label: "Blog",      icon: "/icons/24-blog.svg" },
  { key: "pinterest", label: "Pinterest", icon: "/icons/25-pinterest.svg" },
  { key: "podcast",   label: "Podcast",   icon: "/icons/26-podcast.svg" },
];

export function isUrl(value: string): boolean {
  return /^(https?:\/\/|www\.|[a-z0-9-]+\.[a-z]{2,})/i.test(value.trim());
}

export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Renders recognized channels as circular icon-only link buttons.
 * Only channels with a valid URL are rendered.
 * Hover: black background, white icon. Normal: slate-100 background, dark icon.
 */
export function ChannelIconList({
  channels,
}: {
  channels: Record<string, string>;
}) {
  const filled = channelLabels.filter(
    (c) => channels[c.key]?.trim() && isUrl(channels[c.key])
  );

  if (filled.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {filled.map((ch) => (
        <a
          key={ch.key}
          href={normalizeUrl(channels[ch.key])}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ch.label}
          title={ch.label}
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200 transition-all hover:bg-slate-950 hover:ring-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
        >
          <div
            className="h-[18px] w-[18px] shrink-0 bg-slate-800 transition-colors group-hover:bg-white"
            style={{
              maskImage: `url(${ch.icon})`,
              WebkitMaskImage: `url(${ch.icon})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        </a>
      ))}
    </div>
  );
}
