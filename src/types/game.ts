export type GameAccent = "moss" | "emerald" | "gold" | "azure";

export type GameStage = "Released" | "Live" | "In Development" | "Alpha";

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
  media: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  mark?: {
    src: string;
    alt: string;
  };
}
