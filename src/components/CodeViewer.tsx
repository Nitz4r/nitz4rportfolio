import { useEffect, useRef, useState } from "react";
import { codeToHtml, bundledLanguages } from "shiki";

const LANG_ALIASES: Record<string, string> = {
  luau: "luau",
  lua: "lua",
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  js: "javascript",
  javascript: "javascript",
  jsx: "jsx",
  json: "json",
  sh: "bash",
  bash: "bash",
  shell: "bash",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  markdown: "markdown",
  css: "css",
  html: "html",
};

function normalizeLang(lang?: string): string {
  if (!lang) return "text";
  const key = lang.toLowerCase();
  const mapped = LANG_ALIASES[key] ?? key;
  if (mapped in bundledLanguages) return mapped;
  return "text";
}

/**
 * Convert a public source URL (e.g. GitHub Gist page) into a raw text URL.
 * Returns null when no transformation is known.
 */
function resolveRawUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("githubusercontent.com")) return url;
    if (u.hostname === "gist.github.com") {
      // gist.github.com/<user>/<id>  ->  gist.githubusercontent.com/<user>/<id>/raw
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        return `https://gist.githubusercontent.com/${parts[0]}/${parts[1]}/raw`;
      }
    }
    if (u.hostname === "github.com") {
      // github.com/<u>/<repo>/blob/<branch>/<path>  ->  raw.githubusercontent.com/<u>/<repo>/<branch>/<path>
      const parts = u.pathname.split("/").filter(Boolean);
      const blobIdx = parts.indexOf("blob");
      if (blobIdx > 0) {
        const before = parts.slice(0, blobIdx);
        const after = parts.slice(blobIdx + 1);
        return `https://raw.githubusercontent.com/${before.join("/")}/${after.join("/")}`;
      }
    }
    if (u.hostname === "pastebin.com" && !u.pathname.startsWith("/raw")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://pastebin.com/raw/${id}`;
    }
    return url;
  } catch {
    return null;
  }
}

export type CodeViewerProps = {
  /** Inline source. If omitted, `rawUrl` (or `sourceUrl`) is fetched. */
  code?: string;
  /** Direct raw text URL. */
  rawUrl?: string;
  /** Pretty source URL (e.g. gist page). Used to derive a raw URL when `rawUrl` is missing. */
  sourceUrl?: string;
  language?: string;
  title?: string;
  /** Show line numbers. Default true. */
  showLineNumbers?: boolean;
  /** Max viewer height; content scrolls inside. Default "100%". */
  maxHeight?: string;
  className?: string;
};

export function CodeViewer({
  code,
  rawUrl,
  sourceUrl,
  language,
  title,
  showLineNumbers = true,
  maxHeight = "100%",
  className = "",
}: CodeViewerProps) {
  const [source, setSource] = useState<string | null>(code ?? null);
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Fetch source if not inline.
  useEffect(() => {
    if (code != null) {
      setSource(code);
      return;
    }
    const url = rawUrl ?? (sourceUrl ? resolveRawUrl(sourceUrl) : null);
    if (!url) {
      setError("no source");
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setSource(null);
    setError(null);
    fetch(url, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => setSource(text))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.message ?? "failed to load");
      });
    return () => ctrl.abort();
  }, [code, rawUrl, sourceUrl]);

  // Highlight whenever source/lang changes.
  useEffect(() => {
    if (source == null) {
      setHtml("");
      return;
    }
    let cancelled = false;
    const lang = normalizeLang(language);
    codeToHtml(source, {
      lang,
      theme: "github-dark-default",
      transformers: [
        {
          pre(node) {
            // Strip shiki's inline bg so our terminal panel shows through.
            const style = (node.properties.style as string) ?? "";
            node.properties.style = style.replace(/background-color:[^;]+;?/g, "");
            const cls = (node.properties.class as string) ?? "";
            node.properties.class = `${cls} cv-pre`.trim();
          },
        },
      ],
    })
      .then((out) => {
        if (!cancelled) setHtml(out);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "highlight failed");
      });
    return () => {
      cancelled = true;
    };
  }, [source, language]);

  const copy = async () => {
    if (!source) return;
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  const lineCount = source ? source.split("\n").length : 0;
  const gutterWidth = `${Math.max(2, String(lineCount).length)}ch`;

  return (
    <div
      className={`term-border rounded-sm bg-black/80 flex flex-col font-mono text-[12.5px] overflow-hidden ${className}`}
      style={{ maxHeight }}
    >
      <header className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-border/60 bg-black/60 text-[11px]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-terminal-dim">$</span>
          <span className="text-terminal-bright truncate">
            {title ?? (language ? `snippet.${language}` : "snippet")}
          </span>
          {language && (
            <span className="text-terminal-dim uppercase tracking-widest">
              · {language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {(rawUrl || sourceUrl) && (
            <a
              href={sourceUrl ?? rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-dim hover:text-terminal-bright"
            >
              [ raw ↗ ]
            </a>
          )}
          <button
            type="button"
            onClick={copy}
            disabled={!source}
            className="text-terminal hover:text-terminal-bright disabled:opacity-40 transition-colors"
            aria-label="copy code"
          >
            {copied ? "[ copied ✓ ]" : "[ copy ]"}
          </button>
        </div>
      </header>

      <div className="relative flex-1 min-h-0 overflow-auto">
        {error && (
          <div className="p-4 text-destructive text-xs">// ERR: {error}</div>
        )}

        {!error && source == null && (
          <div className="p-4 text-terminal-dim text-xs animate-pulse">
            // fetching source...
          </div>
        )}

        {!error && source != null && (
          <div
            className={`cv-host py-3 pr-6 ${showLineNumbers ? "cv-with-gutter" : "pl-4"}`}
            style={
              showLineNumbers
                ? ({ ["--cv-gutter" as string]: gutterWidth } as React.CSSProperties)
                : undefined
            }
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
