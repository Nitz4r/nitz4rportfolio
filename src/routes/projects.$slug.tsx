import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { TerminalShell } from "@/components/TerminalShell";
import { GlitchHeading } from "@/components/GlitchHeading";
import type { Project } from "@/lib/portfolio-data";
import { PROJECTS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} // NITZER` : "Project // NITZER";
    const desc = p?.summary ?? "Project dossier.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <TerminalShell path="/projects/?">
      <div className="term-panel p-6 rounded-sm">
        <div className="text-destructive text-xs mb-2">// ERR 0x404</div>
        <div className="text-terminal-bright term-glow text-2xl mb-2">FILE NOT FOUND</div>
        <Link to="/projects" className="text-terminal hover:text-terminal-bright">
          &gt; return to index
        </Link>
      </div>
    </TerminalShell>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData() as { project: Project };

  return (
    <TerminalShell path={`/projects/${p.slug}`}>
      <Link to="/projects" className="text-terminal-dim hover:text-terminal-bright text-sm inline-flex items-center gap-1 mb-6">
        &lt; back to /projects
      </Link>

      {/* Header */}
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

          <Section title="media">
            <div className="grid sm:grid-cols-2 gap-3">
              {p.media.map((m, i) => (
                <div
                  key={i}
                  className="aspect-video term-border rounded-sm flex flex-col items-center justify-center text-terminal-dim text-xs relative overflow-hidden"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, color-mix(in oklab, var(--terminal) 4%, transparent) 0 6px, transparent 6px 12px)",
                  }}
                >
                  <div className="text-terminal text-2xl mb-1">
                    {m.type === "video" ? "▶" : "▦"}
                  </div>
                  <div className="uppercase tracking-wider">{m.type}</div>
                  <div className="text-terminal mt-1">{m.label}</div>
                  <div className="absolute bottom-1 right-2 text-[10px]">
                    NO-SIGNAL · stub
                  </div>
                </div>
              ))}
            </div>
          </Section>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
