import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/sections/shared/PageHero";
import { GameCard } from "@/components/ui/GameCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { archiveHighlights, games } from "@/data/games";

export const metadata: Metadata = {
  title: "Games",
  description: "Explore live ForestlyGames Roblox titles including RoEmpires, Encaved, Boss Battles, and Escape Bruno.",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Games"
        title="Live Games and Active Projects"
        description="Explore ForestlyGames releases and in-development Roblox experiences across strategy, survival, dungeon combat, and obstacle horror."
      />
      <Section className="pt-2">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>

          <div className="mt-12 border-t border-emerald-200/18 pt-8 sm:mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/88">Archive Highlights</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-mist-200/78 sm:text-base">
              Additional game media extracted from the ForestlyGames folder archive.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {archiveHighlights.map((item) => (
                <article key={item.title} className="overflow-hidden border border-emerald-200/20 bg-bg-900/62">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1280px) 23vw, (min-width: 640px) 45vw, 94vw"
                      className="object-cover"
                      style={{ objectPosition: item.image.objectPosition }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,10,0.02)_0%,rgba(8,12,10,0.76)_100%)]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-xl text-mist-50">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mist-300">{item.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
