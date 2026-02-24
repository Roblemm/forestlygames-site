export type GameAccent = "moss" | "emerald" | "gold";

export type GameStage = "Prototype" | "In Development" | "Vertical Slice";

export interface Game {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  stage: GameStage;
  genre: string;
  platformFocus: string;
  accent: GameAccent;
  featured: boolean;
}
