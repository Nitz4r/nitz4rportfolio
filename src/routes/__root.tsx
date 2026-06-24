import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-mono">
      <div className="max-w-lg w-full term-panel p-6 rounded-sm">
        <div className="text-terminal-dim text-xs mb-3">// segmentation fault</div>
        <div className="text-terminal-bright term-glow text-3xl font-bold mb-2">ERR 0x404</div>
        <p className="text-terminal-dim text-sm mb-5">
          requested path not found in filesystem. the file may have been moved or classified.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-terminal hover:text-terminal-bright transition-colors"
        >
          <span>&gt;</span> return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-mono">
      <div className="max-w-lg w-full term-panel p-6 rounded-sm">
        <div className="text-destructive text-xs mb-3">// runtime exception</div>
        <div className="text-terminal-bright term-glow text-2xl font-bold mb-2">SYSTEM FAULT</div>
        <p className="text-terminal-dim text-sm mb-5">
          an unexpected error interrupted the session. you may retry or return home.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="text-terminal hover:text-terminal-bright transition-colors"
          >
            &gt; retry
          </button>
          <a href="/" className="text-terminal-dim hover:text-terminal-bright transition-colors">
            &gt; home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NITZER // Roblox Gameplay Programmer" },
      { name: "description", content: "Portfolio of Nitzer — Roblox gameplay programmer specializing in combat, movement, multiplayer architecture, OOP frameworks, and UI systems." },
      { name: "author", content: "Nitzer" },
      { property: "og:title", content: "NITZER // Roblox Gameplay Programmer" },
      { property: "og:description", content: "Portfolio of Nitzer — Roblox gameplay programmer specializing in combat, movement, multiplayer architecture, OOP frameworks, and UI systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "NITZER // Roblox Gameplay Programmer" },
      { name: "twitter:description", content: "Portfolio of Nitzer — Roblox gameplay programmer specializing in combat, movement, multiplayer architecture, OOP frameworks, and UI systems." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/36d63941-c2ea-43eb-9720-98f39fd94a29/id-preview-6b5a3410--797b471b-70e8-43c7-b5f1-13a352a86a1d.lovable.app-1782335151309.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/36d63941-c2ea-43eb-9720-98f39fd94a29/id-preview-6b5a3410--797b471b-70e8-43c7-b5f1-13a352a86a1d.lovable.app-1782335151309.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground crt-flicker">
        {children}
        {/* CRT effects */}
        <div className="crt-overlay" aria-hidden />
        <div className="crt-vignette" aria-hidden />
        <div className="scan-line" aria-hidden />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
