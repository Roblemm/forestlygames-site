import type { Metadata } from "next";

import { PageHero } from "@/components/sections/shared/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { studioNarrative, studioPillars } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Studio direction, philosophy, and quality standards at ForestlyGames.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ForestlyGames"
        title="A studio built around craft, clarity, and game-native execution."
        description="ForestlyGames approaches every project with a balance of creative ambition and production discipline."
      />

      <Section className="pt-2">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-3xl border border-emerald-200/15 bg-bg-900/70 p-7 sm:p-8">
            <SectionHeading title="Studio Narrative" description="What drives the work and how quality decisions are made." />
            <div className="mt-6 space-y-4 text-sm leading-7 text-mist-200/90 sm:text-base">
              {studioNarrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="space-y-4">
            {studioPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-emerald-200/15 bg-bg-900/70 p-5">
                <Badge className="bg-gold-400/15 text-gold-100">Focus Area</Badge>
                <h2 className="mt-3 font-display text-2xl text-mist-50">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-6 text-mist-200/85">{pillar.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
