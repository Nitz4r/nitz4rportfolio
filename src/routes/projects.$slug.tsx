import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import { TerminalShell } from "@/components/TerminalShell";
import { GlitchHeading } from "@/components/GlitchHeading";
import { MediaGallery } from "@/components/MediaGallery";
import { PROJECTS } from "@/lib/portfolio-data";
import { usePageMeta } from "@/lib/use-page-meta";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const p = PROJECTS.find((x) => x.slug === slug);

  usePageMeta({
    title: p ? `${p.name} // NITZER` : "Project // NITZER",
    description: p?.summary ?? "Project dossier.",
  });

  if (!p) {
    return (
      <TerminalShell path="/projects/?">
        <div className="term-panel p-6 rounded-sm">
          <div className="text-destructive text-xs mb-2">// ERR 0x404</div>
          <div className="text-terminal-bright term-glow text-2xl mb-2">FILE NOT FOUND</div>
          <Link to="/projects" className="text-terminal hover:text-terminal-bright">
            &gt; return to index
          </Link>
        </div>
      </TerminalShell>
    );
  }

  return (
    <TerminalShell path={`/projects/${p.slug}`}>
      <Link to="/projects" className="text-terminal-dim hover:text-terminal-bright text-sm inline-flex items-center gap-1 mb-6">
        &lt; back to /projects
      </Link>

      <div className="border-l-2 border-terminal pl-4 mb-8">
        <div className="text-terminal-dim text-xs mb-1">
          {p.code} · classification: {p.classification} ·{" "}
          <span className="text-terminal">● {p.status}</span>
        </div>
        <GlitchHeading as="h1" text={`[${p.name}]`} className="text-3xl sm:text-5xl" />
        <p className="text-terminal-dim text-sm mt-3 max-w-2xl">{p.summary}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Section title="description">
            <p className="text-sm text-terminal leading-relaxed">{p.description}</p>
          </Section>

          <Section title="features">
            <ul className="space-y-1.5 text-sm">
              {p.features.map((f) => (
                <li key={f}>
                  <span className="text-terminal mr-2">▸</span>
                  <span className="text-terminal-bright">{f}</span>
                </li>
              ))}
            </ul>
          </Section>

          {p.media.length > 0 && (
            <Section title="media">
              <MediaGallery items={p.media} />
            </Section>
          )}
        </div>

        <aside className="space-y-6">
          <Section title="technologies">
            <ul className="space-y-1 text-sm">
              {p.technologies.map((t) => (
                <li key={t} className="text-terminal-bright">
                  <span className="text-terminal-dim mr-2">$</span>
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="metadata">
            <dl className="text-xs space-y-1.5">
              <Row k="id" v={p.code} />
              <Row k="status" v={p.status} />
              <Row k="class" v={p.classification} />
              <Row k="author" v="nitzer" />
              <Row k="access" v="public" />
            </dl>
          </Section>
        </aside>
      </div>
    </TerminalShell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="term-panel rounded-sm p-5">
      <div className="text-terminal-dim text-xs uppercase tracking-widest mb-3">
        // {title}
      </div>
      {children}
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border/40 pb-1">
      <dt className="text-terminal-dim">{k}</dt>
      <dd className="text-terminal-bright text-right">{v}</dd>
    </div>
  );
}
