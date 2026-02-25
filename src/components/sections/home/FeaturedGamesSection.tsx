import { GamesShowcaseScene } from "@/components/motion/scenes/GamesShowcaseScene";
import { Badge } from "@/components/ui/Badge";
import { Fireflies } from "@/components/ui/Fireflies";
import { featuredGames } from "@/data/games";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import type { GameAccent } from "@/types/game";

const accentBorderMap: Record<GameAccent, string> = {
  moss: "border-emerald-200/22",
  emerald: "border-emerald-300/24",
  gold: "border-gold-300/24",
  azure: "border-azure-300/24",
};

const accentGlowMap: Record<GameAccent, string> = {
  moss: "from-emerald-400/8 via-transparent to-transparent",
  emerald: "from-emerald-300/10 via-transparent to-transparent",
  gold: "from-gold-300/10 via-transparent to-transparent",
  azure: "from-azure-300/10 via-transparent to-transparent",
};

const accentSubtitleMap: Record<GameAccent, string> = {
  moss: "text-emerald-200/80",
  emerald: "text-emerald-200/84",
  gold: "text-gold-100/84",
  azure: "text-azure-300/84",
};

const accentGenreMap: Record<GameAccent, string> = {
  moss: "text-emerald-200/66",
  emerald: "text-emerald-200/66",
  gold: "text-gold-100/66",
  azure: "text-azure-300/66",
};

const accentBadgeMap: Record<GameAccent, string> = {
  moss: "border-emerald-200/26 bg-emerald-300/10 text-emerald-200",
  emerald: "border-emerald-200/26 bg-emerald-300/10 text-emerald-200",
  gold: "border-gold-300/26 bg-gold-400/12 text-gold-100",
  azure: "border-azure-300/26 bg-azure-300/10 text-azure-300",
};

const gamesBackdropAssets = [
  {
    id: "encaved-hub",
    src: "/games/encaved/mining-station-1.png",
    className:
      "-left-24 top-12 h-48 w-[20rem] -rotate-[8deg] opacity-0 sm:-left-16 sm:top-14 sm:h-52 sm:w-[24rem] lg:-left-24 lg:h-64 lg:w-[30rem]",
    objectPosition: "center center",
    depth: 4,
  },
  {
    id: "encaved-entrance",
    src: "/games/encaved/cave-entrance-3.png",
    className:
      "left-[36%] top-[8%] hidden h-36 w-[13rem] -rotate-[4deg] opacity-0 sm:block md:h-44 md:w-[16rem] lg:h-52 lg:w-[19rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "encaved-cave",
    src: "/games/encaved/cave-interior.png",
    className:
      "left-[14%] top-[44%] hidden h-44 w-[20rem] rotate-[5deg] opacity-0 md:block lg:top-[46%] lg:h-52 lg:w-[24rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "encaved-wide",
    src: "/games/encaved/cave-wide.png",
    className:
      "right-[6%] top-[-16%] hidden h-44 w-[22rem] -rotate-[7deg] opacity-0 md:block lg:h-56 lg:w-[28rem]",
    objectPosition: "center center",
    depth: 4,
  },
  {
    id: "encaved-logo-mark",
    src: "/games/encaved/logo.png",
    className:
      "left-[3%] top-[30%] hidden h-20 w-20 rotate-[10deg] opacity-0 lg:block lg:h-24 lg:w-24",
    objectPosition: "center center",
    depth: 1,
  },
  {
    id: "encaved-house",
    src: "/games/encaved/mining-station-house-2.png",
    className:
      "right-[38%] top-[62%] hidden h-32 w-[16rem] rotate-[6deg] opacity-0 md:block lg:h-40 lg:w-[20rem]",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "encaved-track",
    src: "/games/encaved/minecart-straight.png",
    className:
      "left-[8%] top-[84%] hidden h-36 w-[15rem] -rotate-[11deg] opacity-0 md:block lg:h-44 lg:w-[19rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "boss-battles-main",
    src: "/games/boss-battles/thumbnail.png",
    className:
      "right-[-10rem] top-[-2rem] hidden h-56 w-[24rem] rotate-[7deg] opacity-0 sm:block lg:right-[-8rem] lg:h-72 lg:w-[32rem]",
    objectPosition: "center 44%",
    depth: 4,
  },
  {
    id: "boss-battles-mirabel",
    src: "/games/boss-battles/mirabel.png",
    className:
      "right-[28%] top-[-2rem] hidden h-24 w-24 rotate-[9deg] opacity-0 sm:block sm:h-28 sm:w-28 lg:right-[24%] lg:h-32 lg:w-32",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "boss-battles-side",
    src: "/games/boss-battles/noob-throw.png",
    className:
      "right-[8%] top-[48%] hidden h-36 w-36 -rotate-[9deg] opacity-0 md:block lg:top-[52%] lg:h-44 lg:w-44",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "boss-battles-portal",
    src: "/games/boss-battles/dungeon-portal-screenshot.png",
    className:
      "left-[58%] top-[58%] hidden h-36 w-[13rem] rotate-[12deg] opacity-0 md:block lg:h-44 lg:w-[16rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "boss-battles-thumb-2",
    src: "/games/boss-battles/thumbnail-2.png",
    className:
      "left-[74%] top-[34%] hidden h-24 w-[10rem] -rotate-[6deg] opacity-0 lg:block lg:h-28 lg:w-[12rem]",
    objectPosition: "center center",
    depth: 1,
  },
  {
    id: "roempires-76-top",
    src: "/games/roempires/screenshot-76.png",
    className:
      "right-[2%] top-[90%] hidden h-40 w-[17rem] rotate-[8deg] opacity-0 md:block lg:h-52 lg:w-[22rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "encaved-route-mid",
    src: "/games/encaved/cave-entrance-3.png",
    className:
      "left-[68%] top-[94%] hidden h-32 w-[15rem] -rotate-[10deg] opacity-0 lg:block lg:h-40 lg:w-[19rem]",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "roempires-character",
    src: "/games/roempires/screenshot-79.png",
    className:
      "-right-16 bottom-[-5.5rem] h-48 w-[15rem] -rotate-[12deg] opacity-0 sm:-right-12 sm:h-56 sm:w-[18rem] lg:-right-10 lg:h-64 lg:w-[20rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "roempires-secondary",
    src: "/games/roempires/screenshot-90.png",
    className:
      "left-[26%] bottom-[-8rem] hidden h-56 w-[18rem] rotate-[8deg] opacity-0 sm:block lg:left-[30%] lg:h-72 lg:w-[23rem]",
    objectPosition: "center center",
    depth: 4,
  },
  {
    id: "roempires-mark",
    src: "/games/roempires/king.png",
    className:
      "-left-9 bottom-[4%] h-28 w-28 rotate-[11deg] opacity-0 sm:-left-6 sm:h-36 sm:w-36 lg:bottom-[8%] lg:h-44 lg:w-44",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "roempires-crop",
    src: "/games/roempires/screenshot-79.png",
    className:
      "right-[32%] bottom-[8%] hidden h-28 w-[9rem] -rotate-[7deg] opacity-0 md:block lg:h-36 lg:w-[12rem]",
    objectPosition: "center center",
    depth: 1,
  },
  {
    id: "roempires-thumb-lower",
    src: "/games/roempires/thumbnail.png",
    className:
      "left-[8%] top-[112%] hidden h-52 w-[22rem] -rotate-[9deg] opacity-0 md:block lg:h-64 lg:w-[30rem]",
    objectPosition: "center center",
    depth: 4,
  },
  {
    id: "roempires-banner-lower",
    src: "/games/roempires/banner-1.png",
    className:
      "right-[42%] top-[118%] hidden h-28 w-[15rem] rotate-[8deg] opacity-0 lg:block lg:h-36 lg:w-[18rem]",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "encaved-lower-cave",
    src: "/games/encaved/cave-wide.png",
    className:
      "left-[54%] top-[126%] hidden h-44 w-[20rem] -rotate-[8deg] opacity-0 md:block lg:h-52 lg:w-[24rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "boss-lower-main",
    src: "/games/boss-battles/thumbnail.png",
    className:
      "right-[8%] top-[130%] hidden h-48 w-[22rem] rotate-[11deg] opacity-0 md:block lg:h-56 lg:w-[28rem]",
    objectPosition: "center 44%",
    depth: 3,
  },
  {
    id: "boss-missions-lower",
    src: "/games/boss-battles/missions-screenshot.png",
    className:
      "left-[2%] top-[132%] hidden h-40 w-[18rem] rotate-[7deg] opacity-0 md:block lg:h-52 lg:w-[24rem]",
    objectPosition: "center center",
    depth: 3,
  },
  {
    id: "roempires-77-lower",
    src: "/games/roempires/screenshot-77.png",
    className:
      "left-[42%] top-[146%] hidden h-32 w-[15rem] rotate-[9deg] opacity-0 lg:block lg:h-40 lg:w-[19rem]",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "boss-dungeon-lower",
    src: "/games/boss-battles/dungeon-portal-screenshot.png",
    className:
      "right-[24%] top-[146%] hidden h-36 w-[18rem] -rotate-[12deg] opacity-0 md:block lg:h-44 lg:w-[22rem]",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "roempires-90-lower",
    src: "/games/roempires/screenshot-90.png",
    className:
      "right-[-4%] top-[162%] hidden h-48 w-[20rem] -rotate-[9deg] opacity-0 lg:block lg:h-56 lg:w-[25rem]",
    objectPosition: "center center",
    depth: 4,
  },
  {
    id: "encaved-cart-lower",
    src: "/games/encaved/minecart-straight.png",
    className:
      "left-[22%] top-[166%] hidden h-32 w-[14rem] -rotate-[8deg] opacity-0 md:block lg:h-40 lg:w-[17rem]",
    objectPosition: "center center",
    depth: 2,
  },
  {
    id: "boss-thumb-lower-2",
    src: "/games/boss-battles/thumbnail-2.png",
    className:
      "left-[72%] top-[164%] hidden h-24 w-[11rem] rotate-[10deg] opacity-0 lg:block lg:h-32 lg:w-[14rem]",
    objectPosition: "center center",
    depth: 1,
  },
];

export function FeaturedGamesSection() {
  return (
    <section id="featured-games" className="relative overflow-hidden bg-bg-900">
      <Fireflies count={16} lgExtra={16} palette="mixed" className="z-5" />
      <GamesShowcaseScene>
        <div aria-hidden data-games-float-field className="pointer-events-none absolute inset-x-0 -top-[44%] h-[188%]">
          {gamesBackdropAssets.map((asset) => (
            <div
              key={asset.id}
              data-games-float
              data-games-float-depth={asset.depth}
              className={cn("absolute overflow-hidden rounded-lg border border-mist-50/12 bg-bg-950/24", asset.className)}
            >
              <Image
                src={asset.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 26vw, 40vw"
                className="object-cover"
                style={{ objectPosition: asset.objectPosition }}
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,8,0.76)_0%,rgba(5,11,8,0.44)_34%,rgba(5,11,8,0.62)_70%,rgba(5,11,8,0.82)_100%)]"
        />

        <div className="relative z-10 mx-auto max-w-360 px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
          <div data-games-heading className="mx-auto max-w-3xl text-center">
            <p className="inline-block rounded-full border border-emerald-200/20 bg-emerald-300/6 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
              Featured Games
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-[0.92] tracking-[-0.01em] text-mist-50">
              Real ForestlyGames Titles
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-mist-100/78 sm:text-lg">
              A live portfolio spanning strategy, horror survival, dungeon combat, and viral obstacle experiences.
            </p>
          </div>

          <div data-games-media-shell className="relative mt-8 min-w-0">
            <div
              data-games-media
              className="relative h-40 w-full overflow-hidden rounded-xl border border-mist-50/16 bg-[linear-gradient(125deg,#0f2c20_4%,#07110d_40%,#1a150a_96%)] shadow-[0_8px_40px_-8px_rgba(85,190,136,0.1)] sm:h-48"
            >
              <Image
                src="/games/boss-battles/thumbnail.png"
                alt=""
                fill
                sizes="92vw"
                data-games-media-image
                className="object-cover object-[center_35%] opacity-[0.72]"
              />
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
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <p className="font-display text-lg uppercase tracking-[0.16em] text-mist-50/92 sm:text-xl">
                  Live Portfolio
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-emerald-200/90">Roblox Game Releases</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {featuredGames.map((game, index) => (
              <article
                key={game.slug}
                data-games-item
                data-games-depth={index % 3}
                className={cn(
                  "group relative w-full rounded-xl border bg-bg-950/60 p-5 backdrop-blur-[2px] transition-colors duration-300 hover:bg-bg-950/75 sm:p-6",
                  accentBorderMap[game.accent],
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    accentGlowMap[game.accent],
                  )}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-mist-50 sm:text-3xl">
                        {game.title}
                      </h3>
                      <p className={cn("mt-1.5 text-sm uppercase tracking-[0.16em]", accentSubtitleMap[game.accent])}>
                        {game.subtitle}
                      </p>
                    </div>
                    <Badge className={accentBadgeMap[game.accent]}>{game.stage}</Badge>
                  </div>
                  <p className="mt-4 text-base leading-7 text-mist-100/78">{game.description}</p>
                  <p className={cn("mt-4 text-sm", accentGenreMap[game.accent])}>
                    {game.genre}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div data-games-footer className="mt-8 border-t border-emerald-200/14 pt-5 text-center">
            <p className="mx-auto max-w-4xl text-sm uppercase tracking-[0.16em] text-mist-200/70">
              Escape Bruno featured by creators with{" "}
              <span className="font-semibold text-emerald-200">79M+ combined subscribers</span>
              {" "}— FGTeeV, LankyBox, DenisDaily, and GravyCatMan.
            </p>
          </div>
        </div>
      </GamesShowcaseScene>
    </section>
  );
}
