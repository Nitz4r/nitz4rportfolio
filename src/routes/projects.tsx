import { createFileRoute, Link } from "@tanstack/react-router";
import { TerminalShell } from "@/components/TerminalShell";
import { GlitchHeading } from "@/components/GlitchHeading";
import { PROJECTS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects // NITZER" },
      { name: "description", content: "Classified project files — combat, movement, netcode, UI and OOP systems for Roblox." },
      { property: "og:title", content: "Projects // NITZER" },
      { property: "og:description", content: "Classified project dossiers from a Roblox gameplay programmer." },
    ],
  }),
  component: ProjectsPage,
});

const statusColor: Record<string, string> = {
  COMPLETE: "text-terminal-bright",
  ACTIVE: "text-terminal-amber",
  PROTOTYPE: "text-terminal-dim",
  ARCHIVED: "text-terminal-dim",
};

function ProjectsPage() {
  return (
    <TerminalShell path="/projects">
      <div className="mb-8">
        <div className="text-terminal-dim text-xs mb-2">$ ls /classified/projects</div>
        <GlitchHeading as="h1" text="PROJECT FILES" className="text-3xl sm:text-5xl mb-3" />
        <p className="text-terminal-dim text-sm max-w-2xl">
          // {PROJECTS.length} entries · classification: public-release · last sync: today
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group term-panel rounded-sm p-5 transition-all hover:border-terminal hover:shadow-[0_0_20px_color-mix(in_oklab,var(--terminal)_25%,transparent)] fade-up flex flex-col"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-baseline justify-between mb-3 text-[11px] text-terminal-dim">
              <span>{p.code}</span>
              <span className={statusColor[p.status]}>● {p.status}</span>
            </div>
            <div className="text-terminal-bright term-glow text-lg font-bold leading-tight mb-2">
              [{p.name}]
            </div>
            <div className="text-xs text-terminal-dim mb-3">
              classification: {p.classification}
            </div>
            <p className="text-sm text-terminal flex-1">{p.summary}</p>
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs text-terminal-dim">
                {p.technologies.slice(0, 3).join(" · ")}
              </span>
              <span className="text-terminal group-hover:text-terminal-bright group-hover:term-glow text-sm">
                [OPEN FILE] &gt;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </TerminalShell>
  );
}
