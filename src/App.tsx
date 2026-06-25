import { Routes, Route, Link } from "react-router-dom";
import IndexPage from "./routes/index";
import ProjectsPage from "./routes/projects";
import ProjectDetailPage from "./routes/projects.$slug";
import SkillsPage from "./routes/skills";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";

function NotFound() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
