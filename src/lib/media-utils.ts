import type { LinkIcon, MediaItem } from "./portfolio-data";

export function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const parts = u.pathname.split("/").filter(Boolean);
      const i = parts.findIndex((p) => p === "embed" || p === "shorts" || p === "v");
      if (i >= 0 && parts[i + 1]) return parts[i + 1];
    }
    return null;
  } catch {
    return null;
  }
}

export function youtubeEmbedUrl(url: string): string | null {
  const id = parseYouTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : null;
}

export function youtubeThumb(url: string): string | null {
  const id = parseYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : null;
}

/** Returns an embeddable iframe URL for code sources, or null when not embeddable. */
export function codeEmbedUrl(item: Extract<MediaItem, { type: "code" }>): string | null {
  if (!item.url) return null;
  if (item.source === "gist") {
    try {
      const u = new URL(item.url);
      if (!u.hostname.includes("gist.github.com")) return null;
      const path = u.pathname.replace(/\/$/, "");
      return `https://gist.github.com${path}.pibb`;
    } catch {
      return null;
    }
  }
  if (item.source === "pastebin") {
    try {
      const u = new URL(item.url);
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://pastebin.com/embed_iframe/${id}` : null;
    } catch {
      return null;
    }
  }
  return null;
}

export function safeHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function inferLinkIcon(url: string, explicit?: LinkIcon): LinkIcon {
  if (explicit) return explicit;
  const host = safeHostname(url);
  if (host.includes("github")) return "github";
  if (host.includes("roblox")) return "roblox";
  if (host.includes("youtube") || host.includes("youtu.be")) return "youtube";
  if (host.includes("docs.") || host.includes("devforum") || host.includes("developer."))
    return "documentation";
  return "external";
}

/** ASCII glyph used to keep with the terminal aesthetic — no third-party icon libs. */
export function iconGlyph(icon: LinkIcon): string {
  switch (icon) {
    case "github":
      return "{ }";
    case "roblox":
      return "[R]";
    case "youtube":
      return "[▶]";
    case "documentation":
      return "[¶]";
    case "download":
      return "[↓]";
    case "website":
      return "[~]";
    case "external":
    default:
      return "[↗]";
  }
}

export function mediaLabel(item: MediaItem): string {
  switch (item.type) {
    case "image":
      return "IMG";
    case "youtube":
      return "YT";
    case "video":
      return "VID";
    case "code":
      return item.source.toUpperCase();
    case "link":
      return "LINK";
    case "placeholder":
      return item.kind.toUpperCase();
  }
}
