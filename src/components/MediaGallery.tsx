import { useCallback, useEffect, useState } from "react";
import type { MediaItem } from "@/lib/portfolio-data";

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

  const openable = current.type === "image";

  return (
    <div className="space-y-3">
      <div className="relative term-border rounded-sm overflow-hidden bg-black">
        <div className="relative aspect-video w-full">
          <MediaFrame
            item={current}
            onOpen={() => openable && setLightbox(true)}
          />

          {items.length > 1 && (
            <>
              <NavButton side="left" onClick={() => go(-1)} label="previous" />
              <NavButton side="right" onClick={() => go(1)} label="next" />
              <div className="absolute top-2 left-2 text-[10px] text-terminal-dim bg-black/60 px-1.5 py-0.5 rounded-sm">
                {safeActive + 1} / {items.length}
              </div>
            </>
          )}
        </div>

        {(current.type === "image" || current.type === "youtube") &&
          current.caption && (
            <div className="border-t border-border/60 px-3 py-1.5 text-[11px] text-terminal-dim">
              // {current.caption}
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
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${item.id}?rel=0&modestbranding=1`}
        title={item.title ?? "YouTube video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return <Placeholder kind={item.kind} label={item.label} />;
}

function Thumbnail({ item }: { item: MediaItem }) {
  if (item.type === "image") {
    return (
      <img
        src={item.src}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }
  if (item.type === "youtube") {
    return (
      <div className="relative w-full h-full">
        <img
          src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center text-terminal-bright text-lg bg-black/30">
          ▶
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center text-terminal text-base"
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
