export type LinkIcon =
  | "github"
  | "roblox"
  | "youtube"
  | "website"
  | "documentation"
  | "download"
  | "external";

export type MediaItem =
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "youtube"; url: string; title?: string; caption?: string }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | {
      type: "code";
      title: string;
      source: "gist" | "pastebin" | "raw";
      url: string;
      language?: string;
      caption?: string;
    }
  | {
      type: "link";
      title: string;
      url: string;
      icon?: LinkIcon;
      description?: string;
    }
  | { type: "placeholder"; kind: "image" | "video"; label: string };

export interface Project {
  slug: string;
  code: string;
  name: string;
  status: "COMPLETE" | "ACTIVE" | "ARCHIVED" | "PROTOTYPE";
  classification: string;
  summary: string;
  description: string;
  features: string[];
  technologies: string[];
  media: MediaItem[];
}

export const PROJECTS: Project[] = [
  {
    slug: "combat-system",
    code: "PRJ-001",
    name: "Combat System",
    status: "COMPLETE",
    classification: "core-system",
    summary:
      "Hit-reg, weapon archetype, combo system, block/parry, state management system and weapon abilities.",
    description:
      "A modular combat framework designed for extensibility and long-term maintainability. Built around an OOP weapon architecture with client-side hit detection, server-side validation, and a data-driven ability system that enables new weapons, skills, and mechanics to be added with minimal code changes.",
    features: [
      "Modular weapon archetypes with composable abilities",
      "Client-side hit detection with server-side validation",
      "State management for combat flow",
      "Parry, block, combo, and stun mechanics",
      "Data-driven weapon configuration",
      "Shared framework for players and NPCs",
      "Cooldown and resource management",
      "Status effects and temporary modifiers",
    ],
    technologies: ["Luau", "OOP", "Zap Networker", "Trove", "Vide", "Matter ECS"],
    media: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=OtBNEGcjqEw",
        title: "Combo System Demo",
        caption: "A demonstration of the combo system in action.",
      },
    ],
  },
];

export const SKILLS = [
  { name: "LUAU", note: "strict typing, metatables, OOP" },
  { name: "NETWORKING", note: "prediction, reconciliation, serialization" },
  { name: "OOP ARCHITECTURE", note: "class systems, DI, lifecycle, mixins" },
  { name: "UI DEVELOPMENT", note: "declarative runtimes, scalable UI architecture." },
  { name: "PERFORMANCE OPTIMIZATION", note: "profiling, batching, allocation control" },
  {
    name: "TOOLING",
    note: "VSCode, Rojo, Wally, GitHub Actions, Matter ECS, Vide (ui), Zap (Networking)",
  },
] as const;
