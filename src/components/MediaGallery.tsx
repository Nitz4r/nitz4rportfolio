import { useCallback, useEffect, useState } from "react";
import type { MediaItem } from "@/lib/portfolio-data";
import { CodeViewer } from "@/components/CodeViewer";
import {
  iconGlyph,
  inferLinkIcon,
  mediaLabel,
  safeHostname,
  youtubeEmbedUrl,
  youtubeThumb,
} from "@/lib/media-utils";

type Props = {
  items: MediaItem[];
};

export function MediaGallery({ items }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const safeActive = Math.min(active, items.length - 1);
  const current = items[safeActive];

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => (i + dir + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, go]);

  if (!items.length) return null;

  const caption = getCaption(current);
  const expandable = current.type === "image";

  return (
    <div className="space-y-3">
      <div className="relative term-border rounded-sm overflow-hidden bg-black">
        <div className="relative aspect-video w-full">
          <MediaFrame item={current} onOpen={() => expandable && setLightbox(true)} />

          {items.length > 1 && (
            <>
              <NavButton side="left" onClick={() => go(-1)} label="previous" />
              <NavButton side="right" onClick={() => go(1)} label="next" />
              <div className="absolute top-2 left-2 text-[10px] text-terminal-dim bg-black/60 px-1.5 py-0.5 rounded-sm">
                {safeActive + 1} / {items.length} · {mediaLabel(current)}
              </div>
            </>
          )}
        </div>

        {caption && (
          <div className="border-t border-border/60 px-3 py-1.5 text-[11px] text-terminal-dim">
            // {caption}
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`media ${i + 1}`}
              aria-current={i === safeActive}
              className={`shrink-0 w-20 h-14 term-border rounded-sm overflow-hidden relative transition-all ${
                i === safeActive
                  ? "border-terminal shadow-[0_0_10px_color-mix(in_oklab,var(--terminal)_35%,transparent)]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Thumbnail item={m} />
              <span className="absolute bottom-0 right-0 text-[8px] leading-none px-1 py-0.5 bg-black/70 text-terminal-dim tracking-wider">
                {mediaLabel(m)}
              </span>
            </button>
          ))}
        </div>
      )}

      {lightbox && current.type === "image" && (
        <Lightbox
          item={current}
          onClose={() => setLightbox(false)}
          onPrev={items.length > 1 ? () => go(-1) : undefined}
          onNext={items.length > 1 ? () => go(1) : undefined}
        />
      )}
    </div>
  );
}

function getCaption(item: MediaItem): string | undefined {
  if ("caption" in item && item.caption) return item.caption;
  if (item.type === "link" && item.description) return item.description;
  return undefined;
}

function MediaFrame({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  if (item.type === "image") {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="block w-full h-full group"
        aria-label={item.alt ?? "open image"}
      >
        <img
          src={item.src}
          alt={item.alt ?? ""}
          className="w-full h-full object-contain bg-black"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 text-[10px] text-terminal-dim bg-black/60 px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100">
          [ EXPAND ]
        </span>
      </button>
    );
  }

  if (item.type === "youtube") {
    const src = youtubeEmbedUrl(item.url);
    if (!src) return <LinkCard url={item.url} title={item.title ?? "YouTube video"} icon="youtube" />;
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={src}
        title={item.title ?? "YouTube video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (item.type === "video") {
    return (
      <video
        controls
        preload="metadata"
        poster={item.poster}
        src={item.src}
        className="absolute inset-0 w-full h-full bg-black object-contain"
      />
    );
  }

  if (item.type === "code") {
    return <CodeFrame item={item} />;
  }

  if (item.type === "link") {
    return (
      <LinkCard
        url={item.url}
        title={item.title}
        description={item.description}
        icon={inferLinkIcon(item.url, item.icon)}
      />
    );
  }

  return <Placeholder kind={item.kind} label={item.label} />;
}

function CodeFrame({ item }: { item: Extract<MediaItem, { type: "code" }> }) {
  return (
    <div className="absolute inset-0 p-2 bg-black">
      <CodeViewer
        code={item.code}
        sourceUrl={item.url}
        rawUrl={item.rawUrl}
        title={item.title}
        language={item.language}
        maxHeight="100%"
        className="h-full"
      />
    </div>
  );
}

function LinkCard({
  url,
  title,
  description,
  icon,
}: {
  url: string;
  title: string;
  description?: string;
  icon: ReturnType<typeof inferLinkIcon>;
}) {
  return (
    <ResourceCard
      title={title}
      platform={description}
      host={safeHostname(url)}
      url={url}
      glyph={iconGlyph(icon)}
      cta="Open Link"
    />
  );
}

function ResourceCard({
  title,
  platform,
  host,
  url,
  glyph,
  cta,
}: {
  title: string;
  platform?: string;
  host: string;
  url: string;
  glyph: string;
  cta: string;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 gap-3"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, color-mix(in oklab, var(--terminal) 5%, transparent) 0 6px, transparent 6px 12px)",
      }}
    >
      <div className="text-terminal text-3xl font-mono tracking-widest">{glyph}</div>
      <div className="text-terminal-bright text-base sm:text-lg font-medium max-w-md truncate">
        {title}
      </div>
      {platform && (
        <div className="text-terminal-dim text-[11px] uppercase tracking-widest">{platform}</div>
      )}
      <div className="text-terminal-dim text-xs">// {host}</div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 text-sm text-terminal-bright term-border px-3 py-1.5 rounded-sm bg-black/70 hover:border-terminal hover:shadow-[0_0_10px_color-mix(in_oklab,var(--terminal)_35%,transparent)] transition-all"
      >
        [ {cta} ↗ ]
      </a>
    </div>
  );
}

function Thumbnail({ item }: { item: MediaItem }) {
  if (item.type === "image") {
    return <img src={item.src} alt="" className="w-full h-full object-cover" loading="lazy" />;
  }
  if (item.type === "youtube") {
    const thumb = youtubeThumb(item.url);
    return (
      <div className="relative w-full h-full">
        {thumb && (
          <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
        )}
        <div className="absolute inset-0 flex items-center justify-center text-terminal-bright text-lg bg-black/30">
          ▶
        </div>
      </div>
    );
  }
  if (item.type === "video") {
    return (
      <div className="relative w-full h-full bg-black">
        {item.poster && (
          <img src={item.poster} alt="" className="w-full h-full object-cover opacity-70" />
        )}
        <div className="absolute inset-0 flex items-center justify-center text-terminal-bright text-lg">
          ▶
        </div>
      </div>
    );
  }
  if (item.type === "code") {
    return (
      <div className="w-full h-full flex items-center justify-center text-terminal font-mono text-sm bg-black/60">
        {"</>"}
      </div>
    );
  }
  if (item.type === "link") {
    return (
      <div className="w-full h-full flex items-center justify-center text-terminal font-mono text-xs bg-black/60">
        {iconGlyph(inferLinkIcon(item.url, item.icon))}
      </div>
    );
  }
  return (
    <div
      className="w-full h-full flex items-center justify-center text-terminal text-base"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, color-mix(in oklab, var(--terminal) 6%, transparent) 0 4px, transparent 4px 8px)",
      }}
    >
      {item.kind === "video" ? "▶" : "▦"}
    </div>
  );
}

function Placeholder({ kind, label }: { kind: "image" | "video"; label: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-terminal-dim text-xs"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, color-mix(in oklab, var(--terminal) 4%, transparent) 0 6px, transparent 6px 12px)",
      }}
    >
      <div className="text-terminal text-3xl mb-1">{kind === "video" ? "▶" : "▦"}</div>
      <div className="uppercase tracking-wider">{kind}</div>
      <div className="text-terminal mt-1">{label}</div>
      <div className="absolute bottom-1 right-2 text-[10px]">NO-SIGNAL · stub</div>
    </div>
  );
}

function NavButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-2" : "right-2"
      } z-10 h-9 w-9 flex items-center justify-center term-border rounded-sm bg-black/70 text-terminal hover:text-terminal-bright hover:border-terminal transition-colors`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: Extract<MediaItem, { type: "image" }>;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 fade-up"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="close"
        className="absolute top-4 right-4 text-terminal hover:text-terminal-bright text-sm term-border px-2 py-1 rounded-sm bg-black/70"
      >
        [ ESC ] close
      </button>

      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center term-border rounded-sm bg-black/70 text-terminal hover:text-terminal-bright text-2xl"
        >
          ‹
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="next"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center term-border rounded-sm bg-black/70 text-terminal hover:text-terminal-bright text-2xl"
        >
          ›
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[88vh] flex flex-col items-center gap-2"
      >
        <img
          src={item.src}
          alt={item.alt ?? ""}
          className="max-w-full max-h-[82vh] object-contain term-border rounded-sm"
        />
        {(item.caption || item.alt) && (
          <figcaption className="text-xs text-terminal-dim">
            // {item.caption ?? item.alt}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
