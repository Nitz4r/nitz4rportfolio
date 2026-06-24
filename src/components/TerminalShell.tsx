import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { cmd: "home", to: "/" },
  { cmd: "projects", to: "/projects" },
  { cmd: "skills", to: "/skills" },
  { cmd: "about", to: "/about" },
  { cmd: "contact", to: "/contact" },
] as const;

function Clock() {
  const [now, setNow] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      setNow(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now}</span>;
}

export function TerminalShell({ children, path }: { children: ReactNode; path: string }) {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex flex-col">
      {/* top bar */}
      <header className="border-b border-border/60 px-4 sm:px-6 py-2 text-[11px] sm:text-xs flex items-center justify-between gap-4 text-terminal-dim">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-terminal animate-pulse" />
          <span className="text-terminal term-glow">NITZER@dev-station</span>
          <span className="hidden sm:inline">::</span>
          <span className="hidden sm:inline">{path}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">session: 0x7F3A</span>
          <Clock />
        </div>
      </header>

      {/* nav */}
      <nav className="border-b border-border/60 px-4 sm:px-6 py-2 flex flex-wrap gap-x-5 gap-y-1 text-xs sm:text-sm">
        {NAV.map((n) => {
          const active =
            n.to === "/" ? currentPath === "/" : currentPath.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`group inline-flex items-center gap-1 transition-colors ${
                active
                  ? "text-terminal-bright term-glow"
                  : "text-terminal-dim hover:text-terminal-bright hover:term-glow"
              }`}
            >
              <span className="opacity-60 group-hover:opacity-100">{">"}</span>
              <span>open {n.cmd}</span>
              {active && <span className="ml-1 text-terminal animate-pulse">_</span>}
            </Link>
          );
        })}
      </nav>

      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-10 max-w-6xl w-full mx-auto">
        {children}
      </main>

      <footer className="border-t border-border/60 px-4 sm:px-6 py-2 text-[11px] text-terminal-dim flex items-center justify-between">
        <span>// nitzer.dev — roblox gameplay programmer</span>
        <span className="hidden sm:inline">build 2026.06.24 · ttyS0 · 115200 baud</span>
        <span className="text-terminal">●  ONLINE</span>
      </footer>
    </div>
  );
}
