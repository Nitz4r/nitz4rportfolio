import { TerminalShell } from "@/components/TerminalShell";
import { GlitchHeading } from "@/components/GlitchHeading";
import { SKILLS } from "@/lib/portfolio-data";
import { usePageMeta } from "@/lib/use-page-meta";

export default function SkillsPage() {
  usePageMeta({
    title: "Skills // Nitz4r",
    description: "Loaded developer modules — Luau, networking, OOP architecture, UI, performance.",
  });

  return (
    <TerminalShell path="/skills">
      <div className="mb-8">
        <div className="text-terminal-dim text-xs mb-2">$ lsmod --user nitzer</div>
        <GlitchHeading as="h1" text="LOADED MODULES" className="text-3xl sm:text-5xl mb-3" />
        <p className="text-terminal-dim text-sm">
          // {SKILLS.length} modules loaded · 0 failures · uptime: years
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {SKILLS.map((s, i) => (
          <div
            key={s.name}
            className="term-panel rounded-sm p-4 flex items-start gap-4 fade-up hover:border-terminal transition-colors"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="text-terminal text-xs mt-1 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1">
              <div className="text-terminal-bright term-glow font-bold tracking-wide">
                MODULE: {s.name}
              </div>
              <div className="text-terminal-dim text-xs mt-1">{s.note}</div>
            </div>
            <div className="text-terminal text-xs">● LOADED</div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-xs text-terminal-dim">
        <span className="text-terminal">&gt;</span> end of module list
      </div>
    </TerminalShell>
  );
}
