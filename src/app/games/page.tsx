import type { Metadata } from "next";

import { PageHero } from "@/components/sections/shared/PageHero";
import { GameCard } from "@/components/ui/GameCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { games } from "@/data/games";

export const metadata: Metadata = {
  title: "Games",
  description: "Explore current ForestlyGames projects and working titles.",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Games"
        title="Current Projects and Working Titles"
        description="A focused look at concepts in active production pipelines. Each project represents a distinct gameplay and visual direction."
      />
      <Section className="pt-2">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
