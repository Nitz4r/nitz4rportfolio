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
      source: "gist" | "pastebin" | "raw" | "inline";
      /** Pretty source URL (e.g. a Gist page). */
      url?: string;
      /** Direct raw-text URL. Derived from `url` when omitted. */
      rawUrl?: string;
      /** Inline source code. Used when omitting url/rawUrl. */
      code?: string;
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
    status: "ACTIVE",
    classification: "showcase",
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
      "Networked VFX, SFX, and combat feedback",
      "Shared framework for players and NPCs",
      "Cooldown and resource management",
      "Status effects and temporary modifiers",
    ],
    technologies: ["Luau", "OOP", "Rojo", "Wally" ,"Vide", "Trove", "Matter ECS", "Zap Networker", ],
    media: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=OtBNEGcjqEw",
        title: "combat system",
        caption: "scythe weapon showcase",
      },
    ],
  },

  {
    slug: "movement-system",
    code: "PRJ-002",
    name: "Movement System",
    status: "PROTOTYPE",
    classification: "showcase",
    summary:
      "dash, climb, slide, custom shiftlock, directional movement, and a state management system for movement.",
    description:
      "A modular movement framework built around reusable movement actions and a shared character controller. The system provides responsive traversal mechanics, configurable movement behaviors, and consistent networking, making it easy to expand with new abilities while keeping implementation clean and maintainable.",
    features: [
      "Directional dash with configurable behavior",
      "Momentum-based sliding",
      "Climbing system with ledge grabbing",
      "Custom shift lock controller",
      "Directional movement and animation handling",
      "Per-material movement sound system",
      "Shared movement state management",
      "Extensible movement action framework",
    ],
    technologies: ["Luau", "OOP", "Rojo", "Wally" ,"Vide", "Trove", "Matter ECS", "Zap Networker", ],
    media: [
      {
        type: "youtube",
        url: "https://youtu.be/vT88CFLFayc",
        title: "movement system",
        caption: "movement system showcase",
      },
    ],
  },

  {
    slug: "ragdoll-system",
    code: "PRJ-003",
    name: "Ragdoll System",
    status: "COMPLETE",
    classification: "showcase",
    summary:
      "A physics-based ragdoll system with realistic joint constraints, collision handling, and dynamic responses to forces.",
    description:
      "A modular ragdoll framework designed for extensibility and long-term maintainability",
    features: [
      "Realistic joint constraints and collision handling",
      "Dynamic responses to external forces",
      "State management for ragdoll flow",
      "Data-driven ragdoll configuration",
      "Shared framework for players and NPCs",
    ],
    technologies: ["Luau", "OOP", "Rojo", "Wally", "Trove", ],
    media: [
      {
        type: "youtube",
        url: "https://youtu.be/XO2AMPquThA",
        title: "ragdoll system",
        caption: "ragdoll system showcase",
      },
    ],
  },

  {
    slug: "swimming-system",
    code: "PRJ-004",
    name: "Swimming System",
    status: "ARCHIVED",
    classification: "showcase",
    summary:
      "A physics-based swimming system with realistic buoyancy",
    description:
      "A custom swimming system built to integrate seamlessly with the character controller and movement framework. It replaces the default swimming behavior with configurable movement, animation, and state transitions, providing consistent traversal across water-based environments while remaining easy to extend.",
    features: [
      "Custom water detection and state transitions",
      "Directional swimming controls",
      "Surface and underwater movement",
      "Integrated movement state machine",
      "Buoyancy and configurable movement physics",
      "Smooth transitions between land and water",
      "Extensible water interaction framework",
    ],
    technologies: ["Luau", "OOP", "Rojo", "Wally", "Trove", "Zone Plus" ],
    media: [
      {
        type: "youtube",
        url: "https://youtu.be/aTTa5b_oZYU",
        title: "swimming system",
        caption: "swimming system showcase",
      },
    ],
  },

  {
    slug: "oop-script-sample",
    code: "PRJ-005",
    name: "OOP Script Sample",
    status: "COMPLETE",
    classification: "script sample",
    summary:
      "oop script sample.",
    description:
      "oop script sample.",
    features: [
      "strict typing",
    ],
    technologies: ["Luau", "OOP", "Trove", "Signal", ],
    media: [
      {
        type: "code",
        source: "gist",
        url: "https://gist.github.com/Nitz4r/3e3c03d4b343b0079ba2e8bacc707087",
        title: "oop implementation",
        language: "luau",
        caption: "",
      },
    ],
  },

  {
    slug: "save a brainrot",
    code: "PRJ-006",
    name: "save a brainrot",
    status: "COMPLETE",
    classification: "Published Game",
    summary:
      "7M+ visits",
    description:
      "Role: full game scripter",
    features: [
      "admin abuse",
       "data store",
      "offline earning",
      "plot system",
      "gamepass/developer product system",
    ],
    technologies: ["Luau", "OOP", "Trove", ],
    media: [
      {
        type: "link",
        url: "https://www.roblox.com/games/82617807484833/Save-a-Brainrot",
        title: "save a brainrot",
        icon: "roblox",
      },

      {
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-21fa7ca413a22b421961cbc0a4d8afea/768/432/Image/Webp/noFilter",
        alt: "save a brainrot",
        caption: "save a brainrot",
      },

    ],
  },

  {
    slug: "incremental piece",
    code: "PRJ-007",
    name: "incremental piece",
    status: "ACTIVE",
    classification: "Published Game",
    summary:
      "385K+ visits",
    description:
      "Role: live ops scripter",
    features: [
      "data store",
      "progression system",
      "pvp queue system",
      "offline earning",
      "gamepass/dev-product system",
    ],
    technologies: ["Luau", "OOP", "Trove", "Rojo", "Wally", ],
    media: [
      {
        type: "link",
        url: "https://www.roblox.com/games/96090419825540/Incremental-Piece",
        title: "incremental piece",
        icon: "roblox",
      },

      {
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-030deabe88ddeea92f77a82ff3928dda/768/432/Image/Webp/noFilter",
        alt: "incremental piece",
        caption: "incremental piece",
      },

      {
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-b79ac4fbe4cb86439bc5567a7549137f/768/432/Image/Webp/noFilter",
        alt: "incremental piece",
        caption: "incremental piece",
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
    note: "VSCode, Rojo, Wally, GitHub, Matter ECS, Vide (ui), Zap (Networking)",
  },
] as const;
