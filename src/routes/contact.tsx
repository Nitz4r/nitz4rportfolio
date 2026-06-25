import { useState } from "react";
import { TerminalShell } from "@/components/TerminalShell";
import { GlitchHeading } from "@/components/GlitchHeading";
import { usePageMeta } from "@/lib/use-page-meta";

const CONTACTS = [
  {
    cmd: "connect discord",
    label: "Discord",
    value: "nitz4r",
    href: "https://discord.com/users/1055195058397249586",
    copy: "nitz4r",
  },
  {
    cmd: "roblox account",
    label: "Roblox",
    value: "nitz4r",
    href: "https://www.roblox.com/users/4610066555/profile",
    copy: "nitz4r",
  },
] as const;

export default function ContactPage() {
  usePageMeta({
    title: "Contact // Nitz4r",
    description: "Initiate connection — Discord, email, GitHub.",
  });

  const [copied, setCopied] = useState<string | null>(null);

  const copy = (v: string) => {
    navigator.clipboard?.writeText(v).then(() => {
      setCopied(v);
      setTimeout(() => setCopied(null), 1400);
    });
  };

  return (
    <TerminalShell path="/contact">
      <div className="mb-10 text-center">
        <div className="text-terminal-dim text-xs mb-2">$ ./connect.sh</div>
        <GlitchHeading as="h1" text="INITIATE CONNECTION" className="text-3xl sm:text-5xl mb-3" />
        <p className="text-terminal-dim text-sm max-w-md mx-auto">
          // select a channel below. all incoming signals are reviewed within 24h.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-3">
        {CONTACTS.map((c, i) => (
          <div
            key={c.cmd}
            className="term-panel rounded-sm p-5 fade-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 text-terminal-bright hover:term-glow"
            >
              <span className="text-base sm:text-lg">
                <span className="text-terminal mr-2 group-hover:animate-pulse">&gt;</span>
                {c.cmd}
              </span>
              <span className="text-terminal-dim text-xs uppercase tracking-wider">
                {c.label} ↗
              </span>
            </a>
            <div className="mt-2 pl-5 flex items-center gap-3 text-xs">
              <span className="text-terminal-dim">resolves to:</span>
              <span className="text-terminal">{c.value}</span>
              <button
                onClick={() => copy(c.copy)}
                className="ml-auto text-terminal-dim hover:text-terminal-bright transition-colors"
              >
                {copied === c.copy ? "[ copied ]" : "[ copy ]"}
              </button>
            </div>
          </div>
        ))}

        <div className="text-center text-xs text-terminal-dim pt-6">
          <span className="text-terminal">&gt;</span> awaiting input
          <span className="term-cursor" />
        </div>
      </div>
    </TerminalShell>
  );
}
