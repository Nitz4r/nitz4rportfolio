import { TerminalShell } from "@/components/TerminalShell";
import { GlitchHeading } from "@/components/GlitchHeading";
import { usePageMeta } from "@/lib/use-page-meta";

const PROFILE = [
  ["Role", "Roblox Gameplay Programmer"], 
  ["Languages", "Luau (--!strict), CPP (hobby)"],
  ["Workflow", "Rojo · Wally · Git · GitHub"],
  ["Timezone", "GMT +3"],
] as const;

const BIO = [
  "I build the systems players actually feel — the hit that lands clean, the dash that buffers right, the netcode that doesn't betray a good play.",
  "My work focuses on the layer between engine and design: combat archetypes, movement controllers, replication, and the OOP scaffolding that lets a small team ship a large game without the codebase rotting.",
  "I care about strict typing, observable systems, and writing code that another programmer can read at 2am and not curse my name.",
];

export default function AboutPage() {
  usePageMeta({
    title: "About // NITZER",
    description: "Developer profile — Nitzer, a Roblox gameplay programmer focused on combat, movement, and multiplayer systems.",
  });

  return (
    <TerminalShell path="/about">
      <div className="mb-8">
        <div className="text-terminal-dim text-xs mb-2">$ whoami --verbose</div>
        <GlitchHeading as="h1" text="DEVELOPER PROFILE" className="text-3xl sm:text-5xl mb-3" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 term-panel rounded-sm p-6">
          <div className="text-terminal-dim text-xs uppercase tracking-widest mb-4">
            // bio.txt
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-terminal">
            {BIO.map((p, i) => (
              <p key={i} className="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-border/60">
            <div className="text-terminal-dim text-xs uppercase tracking-widest mb-3">
              // philosophy
            </div>
            <blockquote className="text-terminal-bright term-glow text-base italic">
              "ship systems, not features. tools, not snippets."
            </blockquote>
          </div>
        </section>

        <aside className="term-panel rounded-sm p-6 h-fit">
          <div className="text-terminal-dim text-xs uppercase tracking-widest mb-4">
            // sysinfo
          </div>
          <pre className="text-[10px] text-terminal leading-tight mb-4 select-none">
{`     ____
    |    |
    |  ● |   NITZER
    |____|   dev-station v4
    /||||\\
   //|||| \\`}
          </pre>
          <dl className="space-y-2 text-xs">
            {PROFILE.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5rem_1fr] gap-2 border-b border-border/40 pb-1.5">
                <dt className="text-terminal-dim uppercase tracking-wider">{k}</dt>
                <dd className="text-terminal-bright">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </TerminalShell>
  );
}
