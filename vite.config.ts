import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// For GitHub Pages project sites served at username.github.io/<repo>/
// override the base path via env: VITE_BASE=/<repo>/ npm run build
// Default './' works on any static host (Netlify, Vercel, GH Pages root, etc.)
export default defineConfig({
  base: process.env.VITE_BASE ?? "./",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: "::",
    port: 8080,
  },
});
