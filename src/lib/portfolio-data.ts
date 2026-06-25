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
    slug: "combat-framework",
    code: "PRJ-001",
    name: "COMBAT FRAMEWORK",
    status: "COMPLETE",
    classification: "core-system",
    summary: "Hit-reg, stamina, weapon archetype, and combo engine for action games.",
    description:
      "A modular combat system built around an OOP weapon archetype. Server-authoritative hit detection with client-side prediction, parry/stagger windows, stamina + posture economy, and a data-driven combo graph that designers extend without touching code.",
    features: [
      "server-authoritative hit-reg with lag compensation",
      "weapon archetype with composable modifiers",
      "stamina & posture economy",
      "combo graph driven by data modules",
      "hit-stop, screen shake, and procedural recoil",
    ],
    technologies: ["Luau", "Roblox raycasting", "RemoteEvents", "OOP", "Janitor"],
    media: [
      { type: "video", label: "combo system demo" },
      { type: "image", label: "weapon archetype diagram" },
      { type: "image", label: "stagger feedback" },
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
  { name: "TOOLING", note: "VSCode, Rojo, Wally, GitHub Actions, Vide (ui), Zap (Networking)" },
] as const;
