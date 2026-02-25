import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { archiveHighlights } from "@/data/games";

type AccentColor = "gold" | "emerald" | "azure" | "moss";

const accent = {
  gold: {
    border: "border-gold-300/22",
    pill: "bg-gold-300/12 border-gold-300/28 text-gold-300",
    tag: "text-gold-100/72",
    dot: "bg-gold-300/80",
    divider: "border-gold-300/14",
  },
  emerald: {
    border: "border-emerald-200/22",
    pill: "bg-emerald-300/12 border-emerald-200/28 text-emerald-200",
    tag: "text-emerald-200/72",
    dot: "bg-emerald-300/80",
    divider: "border-emerald-200/14",
  },
  azure: {
    border: "border-azure-300/22",
    pill: "bg-azure-300/12 border-azure-300/28 text-azure-300",
    tag: "text-azure-300/72",
    dot: "bg-azure-300/80",
    divider: "border-azure-300/14",
  },
  moss: {
    border: "border-emerald-200/18",
    pill: "bg-emerald-300/10 border-emerald-200/22 text-emerald-200",
    tag: "text-emerald-200/64",
    dot: "bg-emerald-300/70",
    divider: "border-emerald-200/12",
  },
} as const;

type GameSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  genres: readonly string[];
  stage: string;
  color: AccentColor;
  heroImage: string;
  gallery: string[];
  video?: { src: string; poster: string; label: string };
  audio?: { src: string; label: string }[];
  creatorCoverage?: { name: string; note: string; href: string }[];
};

function GameSection({
  id,
  title,
  subtitle,
  description,
  genres,
  stage,
  color,
  heroImage,
  gallery,
  video,
  audio,
  creatorCoverage,
}: GameSectionProps) {
  const a = accent[color];
  return (
    <section id={id} className="py-10 sm:py-14">
      <Container className="max-w-[82rem]">
        {/* Hero: image + info side by side */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className={`relative aspect-[16/10] overflow-hidden rounded-xl border ${a.border} bg-bg-900/50`}>
            <Image src={heroImage} alt={`${title} key art`} fill sizes="(min-width:1024px) 56vw, 94vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-bg-950/50 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-[0.9] tracking-tight text-mist-50">
                {title}
              </h2>
              <span className={`rounded-full border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${a.pill}`}>
                {stage}
              </span>
            </div>
            <p className={`mt-2 text-sm font-semibold uppercase tracking-[0.16em] ${a.tag}`}>{subtitle}</p>
            <p className="mt-4 text-base leading-relaxed text-mist-200/80">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span key={genre} className={`inline-block rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${a.pill}`}>
                  {genre}
                </span>
              ))}
            </div>

            {creatorCoverage && creatorCoverage.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-mist-300/60">Creator Coverage</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {creatorCoverage.map((c) => (
                    <Link key={c.href} href={c.href} target="_blank" rel="noreferrer noopener" className="group text-sm">
                      <span className="text-mist-100/90 transition-colors group-hover:text-emerald-200">{c.name}</span>
                      <span className="ml-1.5 text-[0.6rem] uppercase tracking-wider text-mist-300/50">{c.note}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery row */}
        {gallery.length > 0 && (
          <div className={`mt-5 grid gap-2.5 ${gallery.length <= 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
            {gallery.map((src, i) => (
              <figure key={`${src}-${i}`} className={`group relative aspect-[4/3] overflow-hidden rounded-lg border bg-bg-900/40 ${a.border}`}>
                <Image src={src} alt={`${title} screenshot ${i + 1}`} fill sizes="(min-width:1024px) 22vw, 46vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </figure>
            ))}
          </div>
        )}

        {/* Video + Audio row */}
        {(video || (audio && audio.length > 0)) && (
          <div className={`mt-5 grid gap-4 ${video && audio && audio.length > 0 ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
            {video && (
              <div className={`overflow-hidden rounded-lg border bg-bg-900/40 ${a.border}`}>
                <div className="relative aspect-video">
                  <video className="h-full w-full object-cover" controls preload="metadata" playsInline poster={video.poster} src={video.src} />
                </div>
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-mist-200/70">{video.label}</p>
                </div>
              </div>
            )}
            {audio && audio.length > 0 && (
              <div className="space-y-3">
                {audio.map((track) => (
                  <div key={track.src} className={`rounded-lg border bg-bg-900/40 p-3 ${a.border}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <svg className={`h-3.5 w-3.5 ${a.tag}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                      <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${a.tag}`}>{track.label}</p>
                    </div>
                    <audio className="w-full" controls preload="none" src={track.src} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

const gamesData: GameSectionProps[] = [
  {
    id: "roempires",
    title: "RoEmpires",
    subtitle: "Real-Time Strategy Builder",
    description: "A real-time strategy kingdom builder where players create villages, build armies, and launch attacks across singleplayer and multiplayer modes.",
    genres: ["Strategy", "Building", "Action"],
    stage: "Alpha",
    color: "gold",
    heroImage: "/games/roempires/thumbnail.png",
    gallery: [
      "/games/roempires/screenshot-79.png",
      "/games/roempires/screenshot-90.png",
      "/games/roempires/screenshot-76.png",
      "/games/roempires/screenshot-77.png",
    ],
    video: { src: "/games/roempires/trailer.mp4", poster: "/games/roempires/thumbnail.png", label: "Main Trailer" },
    audio: [{ src: "/games/roempires/boost-sfx.mp3", label: "Boost SFX" }],
  },
  {
    id: "encaved",
    title: "Encaved",
    subtitle: "Horror Survival Adventure",
    description: "A horror adventure where players enter dangerous cave systems to mine resources, navigate minecart routes, and survive encounters with spiritual entities.",
    genres: ["Horror", "Adventure", "Survival"],
    stage: "In Development",
    color: "emerald",
    heroImage: "/games/encaved/hero.png",
    gallery: [
      "/games/encaved/cave-interior-mine.png",
      "/games/encaved/mining-station-1.png",
      "/games/encaved/ore-market.png",
      "/games/encaved/lobby-entrance-4.png",
    ],
    video: { src: "/games/encaved/prototype-clip-1.mp4", poster: "/games/encaved/hero.png", label: "Prototype Gameplay" },
    audio: [
      { src: "/games/encaved/theme-encaved.mp3", label: "Encaved Theme" },
      { src: "/games/encaved/theme-rushed.mp3", label: "Rushed" },
    ],
  },
  {
    id: "boss-battles",
    title: "Boss Battles",
    subtitle: "Dungeon Combat Co-op",
    description: "A classic dungeon fighting game focused on sword upgrades, class builds, co-op boss fights, and reward progression.",
    genres: ["Simulator", "Fighting", "Action"],
    stage: "Released",
    color: "azure",
    heroImage: "/games/boss-battles/thumbnail.png",
    gallery: [
      "/games/boss-battles/lobby-shot.png",
      "/games/boss-battles/portal-teleport.png",
      "/games/boss-battles/chests-inventory.png",
      "/games/boss-battles/fnaf-dungeon.png",
    ],
    video: { src: "/games/boss-battles/gameplay-clip-1.mp4", poster: "/games/boss-battles/thumbnail.png", label: "Gameplay Clip" },
    audio: [
      { src: "/games/boss-battles/music-noob-dungeon.mp3", label: "Noob Dungeon" },
      { src: "/games/boss-battles/music-desert-dungeon.mp3", label: "Desert Dungeon" },
    ],
  },
  {
    id: "escape-bruno",
    title: "Escape Bruno",
    subtitle: "Obstacle Horror Run",
    description: "An obstacle survival experience inspired by Disney's Encanto, where players outrun Bruno through trap-heavy maps with strong creator coverage.",
    genres: ["Obby", "Horror", "Story"],
    stage: "Live",
    color: "gold",
    heroImage: "/games/escape-bruno/encanto-shot-4.png",
    gallery: [
      "/games/escape-bruno/encanto-shot-3.png",
      "/games/escape-bruno/encanto-shot-5.png",
      "/games/escape-bruno/encanto-shot-6.png",
      "/games/escape-bruno/encanto-shot-7.png",
    ],
    creatorCoverage: [
      { name: "FGTeeV", note: "3.2M+ views", href: "https://www.youtube.com/watch?v=gJBWB2fpCQ8" },
      { name: "LankyBox", note: "2.1M+ views", href: "https://www.youtube.com/watch?v=AocMjuPPjFE" },
      { name: "DenisDaily", note: "9M+ subs", href: "https://www.youtube.com/watch?v=XxteSlNAd2s" },
      { name: "GravyCatMan", note: "4M+ subs", href: "https://www.youtube.com/watch?v=M2YAK8UDoaA" },
    ],
  },
  {
    id: "evil-pets",
    title: "Evil Pets",
    subtitle: "Pet-Powered Tycoon",
    description: "A pet tycoon game where players use pets to produce money and spend it to improve and build their own base.",
    genres: ["Tycoon", "Strategy", "Action"],
    stage: "Live",
    color: "moss",
    heroImage: "/games/evil-pets/thumbnail.png",
    gallery: [
      "/games/evil-pets/hq-main.png",
      "/games/evil-pets/hq-12.png",
      "/games/evil-pets/screenshot-33.png",
    ],
    video: { src: "/games/evil-pets/fence-teaser.mp4", poster: "/games/evil-pets/thumbnail.png", label: "Teaser" },
    audio: [{ src: "/games/evil-pets/intro-perfect.mp3", label: "Intro Track" }],
  },
  {
    id: "panda-tycoon",
    title: "Panda Tycoon",
    subtitle: "Themed Tycoon Roleplay",
    description: "A game where players grow and manage red panda factories while exploring simulation and roleplay systems.",
    genres: ["Tycoon", "Roleplay"],
    stage: "Live",
    color: "gold",
    heroImage: "/games/turning-red-tycoon/shot-1.png",
    gallery: [
      "/games/turning-red-tycoon/shot-2.png",
      "/games/turning-red-tycoon/shot-3.png",
      "/games/turning-red-tycoon/shot-5.png",
      "/games/turning-red-tycoon/roblox-shot-1.png",
    ],
  },
  {
    id: "raise-a-brainrot",
    title: "Raise a Brainrot",
    subtitle: "Meme Tycoon Challenge",
    description: "A tycoon game where players build and expand operations using casual progression loops and meme-driven content.",
    genres: ["Tycoon", "Casual"],
    stage: "Live",
    color: "azure",
    heroImage: "/games/raise-a-brainrot/thumbnail.png",
    gallery: [
      "/games/raise-a-brainrot/thumbnail-2.png",
      "/games/raise-a-brainrot/image-1.webp",
      "/games/raise-a-brainrot/shop-ui.png",
    ],
    video: { src: "/games/raise-a-brainrot/clip-1.mp4", poster: "/games/raise-a-brainrot/thumbnail.png", label: "Gameplay Clip" },
  },
];

export const metadata: Metadata = {
  title: "Games",
  description: "ForestlyGames portfolio — real screenshots, gameplay, and audio from every title.",
};

export default function GamesPage() {
  return (
    <>
      {/* Page Header */}
      <Section className="pb-4 pt-10 sm:pb-6 sm:pt-14">
        <Container className="max-w-[82rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/85">ForestlyGames</p>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,8vw,5.4rem)] leading-[0.88] tracking-tight text-mist-50">
            Games
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist-200/80 sm:text-lg">
            Every game we&apos;ve built, from early prototypes to live titles. Real screenshots, real gameplay, real audio.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2">
            {gamesData.map((game) => (
              <a
                key={game.id}
                href={`#${game.id}`}
                className={`rounded-full border px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-all duration-200 hover:scale-[1.03] ${accent[game.color].pill}`}
              >
                {game.title}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {/* Game Sections */}
      {gamesData.map((game, index) => (
        <div key={game.id}>
          {index > 0 && (
            <Container className="max-w-[82rem]">
              <div className={`h-px border-t ${accent[game.color].divider}`} />
            </Container>
          )}
          <GameSection {...game} />
        </div>
      ))}

      {/* Divider before archive */}
      <Container className="max-w-[82rem]">
        <div className="h-px border-t border-emerald-200/12" />
      </Container>

      {/* Legacy Archive */}
      <Section className="pb-16 pt-10 sm:pb-20">
        <Container className="max-w-[82rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">Legacy Archive</p>
          <p className="mt-2 text-sm text-mist-300/60">Older titles from our earlier catalog.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archiveHighlights.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-lg border border-emerald-200/16 bg-bg-900/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 94vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ objectPosition: item.image.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg-950/50 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <p className="font-display text-xl text-mist-50">{item.title}</p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.14em] text-mist-300/70">{item.note}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
