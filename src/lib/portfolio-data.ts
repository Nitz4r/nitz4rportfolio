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
  media: { type: "image" | "video"; label: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "combat-system",
    code: "PRJ-001",
    name: "Combat System",
    status: "COMPLETE",
    classification: "core-system",
    summary: "Hit-reg, weapon archetype, combo system, block/parry, state management system and weapon abilities.",
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
      { type: "video", label: "combo system" },
    ],
  },
  {
    slug: "movement-system",
    code: "PRJ-002",
    name: "MOVEMENT SYSTEM",
    status: "COMPLETE",
    classification: "core-system",
    summary: "Custom character controller: wall-run, dash, slide, ledge grab.",
    description:
      "Replacement controller for Roblox Humanoid with state machine, frame-accurate input buffering, coyote/jump-buffer windows, and predictive replication. Designed for fast-paced parkour and combat traversal.",
    features: [
      "FSM with 14 movement states",
      "input buffering and coyote time",
      "wall-run, ledge grab, slide, dash",
      "client prediction + server reconciliation",
      "tuned for sub-frame responsiveness",
    ],
    technologies: ["Luau", "ContextActionService", "Raycast", "PhysicsService"],
    media: [
      { type: "video", label: "parkour reel" },
      { type: "image", label: "state machine graph" },
    ],
  },
  {
    slug: "netcode",
    code: "PRJ-003",
    name: "MULTIPLAYER NETCODE",
    status: "ACTIVE",
    classification: "infrastructure",
    summary: "Replication layer with prediction, reconciliation, and snapshot interpolation.",
    description:
      "A lightweight networking core used across projects. Snapshot interpolation for remote players, client prediction for the local player, server reconciliation on mismatch, and a bandwidth budget enforced per remote.",
    features: [
      "snapshot interpolation @ 20 Hz",
      "client-side prediction + reconciliation",
      "remote bandwidth budgeting",
      "schema-typed RemoteEvents",
      "deterministic tick scheduler",
    ],
    technologies: ["Luau", "RemoteEvents", "UnreliableRemotes", "buffers"],
    media: [
      { type: "video", label: "lag compensation demo" },
      { type: "image", label: "tick pipeline" },
    ],
  },
  {
    slug: "oop-framework",
    code: "PRJ-004",
    name: "OOP FRAMEWORK",
    status: "COMPLETE",
    classification: "library",
    summary: "Strict-typed class system with mixins, lifecycle, and DI.",
    description:
      "An in-house OOP layer for Luau with strict typing, lifecycle hooks, mixin composition, and a small dependency-injection container. Every gameplay system in the portfolio is built on top of it.",
    features: [
      "strict-typed class + interface",
      "lifecycle: init / start / destroy",
      "mixin composition",
      "DI container with scoped lifetimes",
      "automatic cleanup via Janitor binding",
    ],
    technologies: ["Luau --!strict", "metatables", "Janitor"],
    media: [
      { type: "image", label: "class graph" },
      { type: "image", label: "DI container API" },
    ],
  },
  {
    slug: "ui-system",
    code: "PRJ-005",
    name: "UI SYSTEM",
    status: "ACTIVE",
    classification: "frontend",
    summary: "Declarative UI runtime with state binding and motion primitives.",
    description:
      "A declarative UI layer over Roblox instances. Components, scoped state, signal-driven updates, and a small motion library for tween/spring animations. Used for HUDs, menus, and in-world diegetic UI.",
    features: [
      "declarative component tree",
      "fine-grained signal updates",
      "spring + tween motion primitives",
      "responsive layout helpers",
      "diegetic 3D UI bindings",
    ],
    technologies: ["Luau", "Fusion-style", "TweenService", "Signals"],
    media: [
      { type: "video", label: "HUD reel" },
      { type: "image", label: "component tree" },
    ],
  },
  {
    slug: "ai-director",
    code: "PRJ-006",
    name: "AI DIRECTOR",
    status: "PROTOTYPE",
    classification: "experimental",
    summary: "Tension-aware encounter director for cooperative gameplay.",
    description:
      "Prototype encounter director that monitors player stress (health, ammo, pacing) and schedules enemy waves, item drops, and audio cues to keep a target tension curve. Inspired by L4D's AI director, adapted for Roblox.",
    features: [
      "stress estimator per player",
      "wave scheduler with intensity targets",
      "dynamic audio cue routing",
      "designer-tunable curves",
    ],
    technologies: ["Luau", "OOP framework", "behavior trees"],
    media: [
      { type: "image", label: "tension curve" },
      { type: "video", label: "wave pacing demo" },
    ],
  },
];

export const SKILLS = [
  { name: "LUAU", note: "strict typing, metatables, OOP" },
  { name: "NETWORKING", note: "prediction, reconciliation, serialization" },
  { name: "OOP ARCHITECTURE", note: "class systems, DI, lifecycle, mixins" },
  { name: "UI DEVELOPMENT", note: "declarative runtimes, scalable UI architecture." },
  { name: "PERFORMANCE OPTIMIZATION", note: "profiling, batching, allocation control" },
  { name: "TOOLING", note: "VSCode, Rojo, Wally, GitHub Actions, Matter ECS, Vide (ui), Zap (Networking)" },
] as const;
