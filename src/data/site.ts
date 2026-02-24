import type { StudioPillar } from "@/types/site";

export const siteConfig = {
  name: "ForestlyGames",
  description:
    "ForestlyGames is an independent studio building cinematic, systems-first game experiences.",
  ctaLabel: "Start a Conversation",
  ctaHref: "/contact",
} as const;

export const studioNarrative: string[] = [
  "ForestlyGames is focused on playable worlds where atmosphere and systems reinforce each other.",
  "Every release is built around tight gameplay loops, clear visual direction, and production discipline.",
  "This website is a studio showcase: a clear signal of quality bar, execution standards, and creative momentum.",
];

export const studioPillars: StudioPillar[] = [
  {
    title: "Gameplay-First Craft",
    description: "Core mechanics and player feel are designed before visual flair is layered in.",
  },
  {
    title: "Cinematic World Building",
    description: "Art direction, lighting, and motion work together to create a premium first impression.",
  },
  {
    title: "Disciplined Production",
    description: "Scope, iteration, and polish are managed intentionally to ship stable experiences.",
  },
];
