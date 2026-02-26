import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { games, archiveHighlights } from "@/data/games";

export const metadata: Metadata = {
  title: "Games",
  description: "Explore every game built by ForestlyGames — from early prototypes to live titles.",
};

export default function GamesPage() {
  const featuredGames = games.filter((g) => g.featured);
  const otherGames = games.filter((g) => !g.featured);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-6 pt-16 sm:pb-10 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(95,202,148,0.14),transparent_70%)]"
        />
        <Container className="max-w-6xl text-center">
          <h1 className="font-display text-[clamp(3rem,10vw,6.4rem)] leading-[0.88] tracking-tight text-mist-50">
            OUR GAMES
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist-200/70 sm:text-lg">
            Every title we&apos;ve built — from early prototypes to live experiences.
          </p>
        </Container>
      </section>

      {/* ── Featured Game Cards Grid ── */}
      <section className="pb-10 pt-2 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGames.map((game, i) => (
              <a
                key={game.slug}
                href={`#${game.slug}`}
                className="group block"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl border border-emerald-200/18 transition-all duration-300 group-hover:border-emerald-200/36 group-hover:shadow-[0_0_32px_rgba(95,202,148,0.08)]">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={game.media.src}
                      alt={game.media.alt}
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 94vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ objectPosition: game.media.objectPosition ?? "center center" }}
                    />
                  </div>
                </div>
                <h3 className="mt-3.5 font-display text-xl text-mist-50 transition-colors duration-200 group-hover:text-emerald-200">
                  {game.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-mist-200/65">
                  {game.shortDescription ?? game.description}
                </p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Divider ── */}
      <Container className="max-w-6xl">
        <div className="h-px bg-emerald-200/10" />
      </Container>

      {/* ── Spotlight Sections ── */}
      {featuredGames.map((game, index) => (
        <section
          key={game.slug}
          id={game.slug}
          className="py-14 sm:py-20"
        >
          <Container className="max-w-6xl">
            <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl border border-emerald-200/14 lg:[direction:ltr]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={game.media.src}
                    alt={game.media.alt}
                    fill
                    sizes="(min-width:1024px) 48vw, 94vw"
                    className="object-cover"
                    style={{ objectPosition: game.media.objectPosition ?? "center center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-950/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Info */}
              <div className="lg:[direction:ltr]">
                <div className="flex items-center gap-3">
                  <span className="inline-block rounded-full border border-emerald-200/24 bg-emerald-300/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    {game.stage}
                  </span>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-mist-300/50">
                    {game.genre}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.92] tracking-tight text-mist-50">
                  {game.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-emerald-200/60">{game.subtitle}</p>

                <p className="mt-5 text-base leading-relaxed text-mist-200/75">
                  {game.description}
                </p>

                {game.mark && (
                  <div className="mt-6 flex items-center gap-3">
                    <div className="overflow-hidden rounded-lg border border-emerald-200/14 bg-bg-900/60 p-1">
                      <Image
                        src={game.mark.src}
                        alt={game.mark.alt}
                        width={40}
                        height={40}
                        className="h-9 w-9 object-cover"
                      />
                    </div>
                    <span className="text-xs text-mist-300/50">by ForestlyGames</span>
                  </div>
                )}

                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-400/90 px-5 py-2.5 text-sm font-semibold text-bg-950 transition-all duration-200 hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(95,202,148,0.3)]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play on Roblox
                  </span>
                </div>
              </div>
            </div>
          </Container>

          {/* Section divider */}
          {index < featuredGames.length - 1 && (
            <Container className="mt-14 max-w-6xl sm:mt-20">
              <div className="h-px bg-emerald-200/8" />
            </Container>
          )}
        </section>
      ))}

      {/* ── More Games ── */}
      {otherGames.length > 0 && (
        <>
          <Container className="max-w-6xl">
            <div className="h-px bg-emerald-200/10" />
          </Container>
          <section className="py-14 sm:py-20">
            <Container className="max-w-6xl">
              <h2 className="text-center font-display text-[clamp(1.6rem,4vw,2.6rem)] tracking-tight text-mist-50">
                More Games
              </h2>
              <p className="mx-auto mt-2 max-w-md text-center text-sm text-mist-300/55">
                Additional titles from our catalog.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {otherGames.map((game) => (
                  <div key={game.slug} className="group">
                    <div className="relative overflow-hidden rounded-xl border border-emerald-200/14 transition-all duration-300 group-hover:border-emerald-200/30">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={game.media.src}
                          alt={game.media.alt}
                          fill
                          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 94vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          style={{ objectPosition: game.media.objectPosition ?? "center center" }}
                        />
                      </div>
                    </div>
                    <h3 className="mt-3 font-display text-lg text-mist-50">{game.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist-200/60">{game.description}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </>
      )}

      {/* ── Legacy Archive ── */}
      <Container className="max-w-6xl">
        <div className="h-px bg-emerald-200/10" />
      </Container>
      <section className="pb-20 pt-14 sm:pb-28 sm:pt-20">
        <Container className="max-w-6xl">
          <h2 className="text-center font-display text-[clamp(1.6rem,4vw,2.6rem)] tracking-tight text-mist-50">
            Legacy Archive
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-mist-300/55">
            Older titles from our earlier catalog.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {archiveHighlights.map((item) => (
              <div key={item.title} className="group">
                <div className="relative overflow-hidden rounded-xl border border-emerald-200/12 transition-all duration-300 group-hover:border-emerald-200/26">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 94vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ objectPosition: item.image.objectPosition }}
                    />
                  </div>
                </div>
                <h3 className="mt-3 font-display text-lg text-mist-50">{item.title}</h3>
                <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-mist-300/50">{item.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
