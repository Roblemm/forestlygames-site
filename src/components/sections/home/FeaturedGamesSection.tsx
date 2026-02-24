import { GamesShowcaseScene } from "@/components/motion/scenes/GamesShowcaseScene";
import { featuredGames } from "@/data/games";

export function FeaturedGamesSection() {
  return (
    <section id="featured-games" className="relative bg-bg-900">
      <GamesShowcaseScene>
        <div className="mx-auto max-w-[90rem] px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
          <div data-games-heading className="max-w-5xl">
            <p className="font-semibold uppercase tracking-[0.22em] text-emerald-200/90">Featured Games</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.2rem,6.8vw,5.2rem)] leading-[0.92] tracking-[-0.01em] text-mist-50">
              Proof Through Playable Concepts
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-mist-100/82 sm:text-xl">
              Scroll through active projects and concepts. Presentation and motion are designed to reflect gameplay
              ambition and production clarity.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div data-games-media-shell className="relative min-w-0">
              <div
                data-games-media
                className="relative aspect-[16/10] w-full overflow-hidden border border-mist-50/18 bg-[linear-gradient(125deg,#0f2c20_4%,#07110d_40%,#1a150a_96%)]"
              >
                <div
                  aria-hidden
                  data-games-media-layer="far"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(141,234,185,0.26),transparent_46%),radial-gradient(circle_at_84%_74%,rgba(214,170,96,0.22),transparent_40%)]"
                />
                <div
                  aria-hidden
                  data-games-media-layer="near"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,10,0.02)_0%,rgba(7,13,10,0.72)_100%)]"
                />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                  <p className="font-display text-[clamp(1.35rem,3vw,2.5rem)] uppercase tracking-[0.16em] text-mist-50/92">
                    Project Slate
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-emerald-200/90">Current Experiments</p>
                </div>
              </div>
            </div>

            <div className="min-w-0 space-y-4 sm:space-y-5 lg:ml-auto lg:w-full lg:max-w-[34rem]">
              {featuredGames.map((game, index) => (
                <article
                  key={game.slug}
                  data-games-item
                  data-games-depth={index % 3}
                  className="w-full border border-emerald-200/20 bg-bg-950/55 p-5 backdrop-blur-[1px] sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl leading-tight text-mist-50 sm:text-3xl">{game.title}</h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-100/95">{game.stage}</p>
                  </div>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-emerald-200/84">{game.subtitle}</p>
                  <p className="mt-4 text-base leading-7 text-mist-100/82">{game.description}</p>
                  <p className="mt-4 text-sm text-mist-200/78">
                    {game.genre} | {game.platformFocus}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div data-games-footer className="mt-8 border-t border-emerald-200/18 pt-5">
            <p className="max-w-4xl text-sm uppercase tracking-[0.16em] text-mist-200/76">
              Motion-led discovery with clear readability, paced transitions, and scene-level choreography.
            </p>
          </div>
        </div>
      </GamesShowcaseScene>
    </section>
  );
}
