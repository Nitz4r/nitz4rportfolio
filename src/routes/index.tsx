import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TerminalShell } from "@/components/TerminalShell";
import { Typewriter } from "@/components/Typewriter";
import { GlitchHeading } from "@/components/GlitchHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NITZER // Roblox Gameplay Programmer" },
      { name: "description", content: "Combat, movement, multiplayer, OOP and UI systems for Roblox — by Nitzer." },
      { property: "og:title", content: "NITZER // Roblox Gameplay Programmer" },
      { property: "og:description", content: "Live developer workstation — portfolio of a Roblox gameplay programmer." },
    ],
  }),
  component: Index,
});

const BOOT = [
  "[ OK ] mounting /dev/portfolio",
  "[ OK ] loading kernel modules: combat, movement, netcode",
  "[ OK ] establishing secure session ...",
  "[ OK ] handshake complete — welcome, visitor.",
];

const SPECIALIZED = [
  "Combat Systems",
  "Movement Systems",
  "Multiplayer Architecture",
  "OOP Frameworks",
  "UI Systems",
];

const COMMANDS = [
  { cmd: "open projects", to: "/projects", note: "// classified project files" },
  { cmd: "open skills", to: "/skills", note: "// loaded developer modules" },
  { cmd: "open about", to: "/about", note: "// system profile" },
  { cmd: "open contact", to: "/contact", note: "// initiate connection" },
] as const;

function Index() {
  const [bootStep, setBootStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setBootStep((s) => (s < BOOT.length ? s + 1 : s));
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <TerminalShell path="/home">
      {/* Boot log */}
      <section className="text-xs sm:text-sm text-terminal-dim space-y-0.5 mb-10 font-mono">
        {BOOT.slice(0, bootStep).map((line, i) => (
          <div key={i} className="fade-up">
            <span className="text-terminal">{line.slice(0, 6)}</span>
            {line.slice(6)}
          </div>
        ))}
      </section>

      {/* Identity card */}
      <section className="text-center py-8 sm:py-14">
        <div className="text-xs text-terminal-dim mb-4 tracking-widest">
          ── identity verified ──
        </div>

        <GlitchHeading
          text="NITZER"
          className="text-6xl sm:text-8xl md:text-9xl mb-4 text-flicker"
        />

        <div className="text-terminal text-base sm:text-lg term-glow mb-1">
          <Typewriter text="Roblox Gameplay Programmer" speed={36} delay={900} cursor />
        </div>
        <div className="text-terminal-dim text-xs sm:text-sm mt-2">
          // 4+ years building gameplay systems
        </div>

        {/* Specialized in */}
        <div className="mt-12 inline-block text-left term-panel rounded-sm p-5 sm:p-6 min-w-[18rem]">
          <div className="text-terminal-dim text-xs mb-3">$ cat /etc/specializations</div>
          <div className="text-terminal-bright term-glow text-sm mb-2">Specialized in:</div>
          <ul className="space-y-1 text-sm">
            {SPECIALIZED.map((s, i) => (
              <li key={s} className="fade-up" style={{ animationDelay: `${1.4 + i * 0.12}s` }}>
                <span className="text-terminal mr-2">─</span>
                <span className="text-terminal-bright">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Command prompt */}
      <section className="mt-10 sm:mt-14 max-w-2xl mx-auto">
        <div className="text-terminal-dim text-xs mb-3 text-center">── available commands ──</div>
        <div className="term-panel rounded-sm p-5 sm:p-6 space-y-2">
          {COMMANDS.map((c, i) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex items-baseline justify-between gap-4 px-2 py-1.5 -mx-2 rounded-sm transition-all hover:bg-terminal/10 hover:term-glow fade-up"
              style={{ animationDelay: `${1.8 + i * 0.1}s` }}
            >
              <span className="text-terminal-bright">
                <span className="text-terminal mr-2 group-hover:animate-pulse">&gt;</span>
                {c.cmd}
              </span>
              <span className="text-terminal-dim text-xs hidden sm:inline group-hover:text-terminal">
                {c.note}
              </span>
            </Link>
          ))}
          <div className="pt-3 pl-2 text-terminal-dim text-sm">
            <span className="text-terminal mr-2">&gt;</span>
            <span className="term-cursor" />
          </div>
        </div>
      </section>
    </TerminalShell>
  );
}
