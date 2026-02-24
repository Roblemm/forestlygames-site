import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    slug: "project-cedar",
    title: "Project Cedar",
    subtitle: "Working title",
    description:
      "A tactical exploration concept that blends environmental puzzles with systemic combat encounters.",
    stage: "Prototype",
    genre: "Action Adventure",
    platformFocus: "PC and console target",
    accent: "moss",
    featured: true,
  },
  {
    slug: "project-emberwild",
    title: "Project Emberwild",
    subtitle: "Working title",
    description:
      "A cooperative survival concept centered on dynamic weather, progression loops, and high-stakes objectives.",
    stage: "In Development",
    genre: "Co-op Survival",
    platformFocus: "PC focus",
    accent: "emerald",
    featured: true,
  },
  {
    slug: "project-echo-vale",
    title: "Project Echo Vale",
    subtitle: "Working title",
    description:
      "A narrative systems prototype that pairs cinematic storytelling with branching mission states.",
    stage: "Vertical Slice",
    genre: "Narrative Action",
    platformFocus: "Cross-platform planning",
    accent: "gold",
    featured: true,
  },
];

export const featuredGames: Game[] = games.filter((game) => game.featured);
