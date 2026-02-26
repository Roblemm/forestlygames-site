import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { archiveHighlights } from "@/data/games";

type MediaImage = {
  src: string;
  alt: string;
};

type VideoClip = {
  title: string;
  src: string;
};

type AudioTrack = {
  title: string;
  src: string;
};

type CreatorSpot = {
  name: string;
  note: string;
  href: string;
  image: string;
};

type AccentColor = "gold" | "emerald" | "azure" | "moss";

const accentMap: Record<
  AccentColor,
  {
    border: string;
    borderSubtle: string;
    text: string;
    textMuted: string;
    glow: string;
    pill: string;
    pillText: string;
    audioBorder: string;
    gradient: string;
    heroBg: string;
  }
> = {
  gold: {
    border: "border-gold-300/30",
    borderSubtle: "border-gold-300/14",
    text: "text-gold-100",
    textMuted: "text-gold-100/72",
    glow: "shadow-[0_0_120px_40px_rgba(222,186,120,0.07)]",
    pill: "bg-gold-300/12 border-gold-300/28",
    pillText: "text-gold-300",
    audioBorder: "border-gold-300/22",
    gradient: "from-gold-300/6 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-gold-400/8 via-bg-950/95 to-bg-950",
  },
  emerald: {
    border: "border-emerald-200/30",
    borderSubtle: "border-emerald-200/14",
    text: "text-emerald-100",
    textMuted: "text-emerald-200/72",
    glow: "shadow-[0_0_120px_40px_rgba(156,218,184,0.07)]",
    pill: "bg-emerald-300/12 border-emerald-200/28",
    pillText: "text-emerald-200",
    audioBorder: "border-emerald-200/22",
    gradient: "from-emerald-300/6 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-emerald-400/8 via-bg-950/95 to-bg-950",
  },
  azure: {
    border: "border-azure-300/30",
    borderSubtle: "border-azure-300/14",
    text: "text-azure-300",
    textMuted: "text-azure-300/72",
    glow: "shadow-[0_0_120px_40px_rgba(121,201,255,0.07)]",
    pill: "bg-azure-300/12 border-azure-300/28",
    pillText: "text-azure-300",
    audioBorder: "border-azure-300/22",
    gradient: "from-azure-300/6 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-azure-500/8 via-bg-950/95 to-bg-950",
  },
  moss: {
    border: "border-emerald-200/24",
    borderSubtle: "border-emerald-200/12",
    text: "text-emerald-100",
    textMuted: "text-emerald-200/64",
    glow: "shadow-[0_0_120px_40px_rgba(85,190,136,0.06)]",
    pill: "bg-emerald-300/10 border-emerald-200/22",
    pillText: "text-emerald-200",
    audioBorder: "border-emerald-200/18",
    gradient: "from-emerald-400/5 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-emerald-400/6 via-bg-950/95 to-bg-950",
  },
};

function GenrePills({ genres, accent }: { genres: string[]; accent: AccentColor }) {
  const a = accentMap[accent];
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre}
          className={`inline-block rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${a.pill} ${a.pillText}`}
        >
          {genre}
        </span>
      ))}
    </div>
  );
}

function GameHeroBanner({
  image,
  title,
  accent,
  children,
}: {
  image: MediaImage;
  title: string;
  accent: AccentColor;
  children: React.ReactNode;
}) {
  const a = accentMap[accent];
  return (
    <div className={`game-section-hero relative overflow-hidden rounded-2xl ${a.border} ${a.glow}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width:1280px) 90vw, 100vw"
          className="object-cover opacity-30 blur-[2px]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg-950 via-bg-950/92 to-bg-950/60" />
        <div className={`absolute inset-0 bg-linear-to-t from-bg-950 via-bg-950/50 to-transparent`} />
      </div>
      <div className="relative z-10 flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.88] tracking-tight text-mist-50 drop-shadow-lg">
            {title}
          </h2>
          {children}
        </div>
        <div className="relative hidden h-48 w-72 shrink-0 overflow-hidden rounded-lg lg:block xl:h-56 xl:w-80">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="320px"
            className="object-cover"
          />
          <div className={`absolute inset-0 rounded-lg border ${a.borderSubtle}`} />
        </div>
      </div>
    </div>
  );
}

function MediaGrid({
  images,
  accent,
  columns = 3,
}: {
  images: MediaImage[];
  accent: AccentColor;
  columns?: 2 | 3 | 4;
}) {
  const a = accentMap[accent];
  const widthClass =
    columns === 2
      ? "w-[min(82vw,26rem)] sm:w-[24rem] lg:w-[26rem]"
      : columns === 4
        ? "w-[min(76vw,20rem)] sm:w-[18rem] lg:w-[19rem]"
        : "w-[min(80vw,22rem)] sm:w-[20.5rem] lg:w-[22rem]";

  return (
    <div className="themed-scrollbar overflow-x-auto pb-3">
      <div className="flex min-w-max gap-3 pr-3">
        {images.map((asset, index) => {
          const parts = asset.alt.split("|").map((part) => part.trim());
          const title = parts[0] || "Project media";
          const note = parts[1] || "Captured from the live project build.";

          return (
            <figure
              key={`${asset.src}-${index}`}
              className={`game-media-item group ${widthClass} shrink-0 overflow-hidden rounded-lg border bg-bg-900/60 ${a.borderSubtle}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={asset.src}
                  alt={title}
                  fill
                  sizes="(min-width:1280px) 24rem, (min-width:640px) 21rem, 80vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-t from-bg-950/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <figcaption className="px-3 py-2.5">
                <p className="font-display text-xl leading-none text-mist-50">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-mist-200/70">{note}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function VideoCard({
  clip,
  poster,
  accent,
}: {
  clip: VideoClip;
  poster: string;
  accent: AccentColor;
}) {
  const a = accentMap[accent];
  return (
    <article className={`game-media-item group overflow-hidden rounded-lg border bg-bg-900/50 ${a.borderSubtle}`}>
      <div className="relative aspect-video overflow-hidden">
        <video
          className="h-full w-full object-cover"
          controls
          preload="metadata"
          playsInline
          poster={poster}
          src={clip.src}
        />
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className={`h-1.5 w-1.5 rounded-full ${accent === "gold" ? "bg-gold-300/80" : accent === "azure" ? "bg-azure-300/80" : "bg-emerald-300/80"}`} />
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-mist-200/80">{clip.title}</p>
      </div>
    </article>
  );
}

function AudioCard({ track, accent }: { track: AudioTrack; accent: AccentColor }) {
  const a = accentMap[accent];
  return (
    <div className={`rounded-lg border bg-bg-900/50 p-3 ${a.audioBorder}`}>
      <div className="mb-2 flex items-center gap-2">
        <svg className={`h-3.5 w-3.5 ${a.pillText}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
        <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${a.textMuted}`}>
          {track.title}
        </p>
      </div>
      <audio className="w-full" controls preload="none" src={track.src} />
    </div>
  );
}

function SectionDivider({ accent }: { accent: AccentColor }) {
  const a = accentMap[accent];
  return (
    <div className="relative py-4">
      <div className={`h-px w-full ${a.border} border-t`} />
      <div className={`absolute left-1/2 top-1/2 h-8 w-32 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r ${a.gradient} blur-2xl`} />
    </div>
  );
}

const roEmpiresImages: MediaImage[] = [
  { src: "/games/roempires/thumbnail.png", alt: "RoEmpires Main Art | Hero key art from the alpha build." },
  { src: "/games/roempires/old-menu.png", alt: "Civilizations Old Menu | Build, train, and attack layout from an early pass." },
  { src: "/games/roempires/currency-shop.png", alt: "Old Currency Shop | Legacy economy panel before the latest refresh." },
  { src: "/games/roempires/currency-ui.png", alt: "Currency UI | Current top bar economy strip and pacing controls." },
  { src: "/games/roempires/screenshot-90.png", alt: "Battle Lane | Mid-match combat lane capture from live gameplay." },
  { src: "/games/roempires/screenshot-76.png", alt: "Village Build Pass | Settlement growth and placement snapshot." },
  { src: "/games/roempires/screenshot-77.png", alt: "War Camp Shot | Base defense area with troop staging." },
  { src: "/games/roempires/loading-screen.png", alt: "Loading Screen | Intro splash branding for the alpha client." },
];

const roEmpiresClips: VideoClip[] = [
  { title: "Gameplay", src: "/games/roempires/gameplay.mp4" },
  { title: "Attacking", src: "/games/roempires/attacking.mp4" },
  { title: "Placement", src: "/games/roempires/placement.mp4" },
  { title: "UI Pass", src: "/games/roempires/ui.mp4" },
];

const roEmpiresTracks: AudioTrack[] = [
  { title: "Main Theme", src: "/games/roempires/theme-main.mp3" },
  { title: "Village Theme", src: "/games/roempires/theme-village.mp3" },
  { title: "Defending Theme", src: "/games/roempires/theme-defending.mp3" },
  { title: "Attacking Theme", src: "/games/roempires/theme-attacking.mp3" },
  { title: "Codes Theme", src: "/games/roempires/theme-codes.mp3" },
  { title: "Teaser Theme", src: "/games/roempires/theme-teaser.mp3" },
];

const encavedImages: MediaImage[] = [
  { src: "/games/encaved/main-hero.png", alt: "Blue Lantern Tunnel | Main Encaved hero frame with glowing path." },
  { src: "/games/encaved/cave-entrance-3.png", alt: "Cave Entrance | Hazard signs and branch guidance before the deep mine." },
  { src: "/games/encaved/cave-interior-mine.png", alt: "Deep Mine Interior | Color-lit cavern zone used in progression beats." },
  { src: "/games/encaved/mining-station-1.png", alt: "Mining Station | Resource processing area with heavier machinery." },
  { src: "/games/encaved/mining-station-house-2.png", alt: "Station Housing | Settlement extension around the station core." },
  { src: "/games/encaved/minecart-room-straight.png", alt: "Minecart Route | Track corridor with directional lighting." },
  { src: "/games/encaved/ore-market.png", alt: "Ore Market | Trading zone for mined resources and upgrades." },
  { src: "/games/encaved/lobby-entrance-4.png", alt: "Lobby Entrance | Main entry transition into the cave network." },
];

const encavedPrototypeClips: VideoClip[] = [
  { title: "Prototype Clip 1", src: "/games/encaved/prototype-clip-1.mp4" },
  { title: "Prototype Clip 2", src: "/games/encaved/prototype-clip-2.mp4" },
  { title: "Swinging Lights Intro", src: "/games/encaved/swinging-lights-intro.mp4" },
];

const encavedTracks: AudioTrack[] = [
  { title: "Encaved Theme", src: "/games/encaved/theme-encaved.mp3" },
  { title: "Synth Melody", src: "/games/encaved/theme-synth-melody.mp3" },
  { title: "Rushed", src: "/games/encaved/theme-rushed.mp3" },
  { title: "Piano Demo", src: "/games/encaved/theme-piano-demo.mp3" },
];

const bossBattlesImages: MediaImage[] = [
  { src: "/games/boss-battles/thumbnail.png", alt: "Boss Battles Main Art | Dungeon combat hero image from live build." },
  { src: "/games/boss-battles/noob-throw-og.png", alt: "Teleport Thumbnail | Event key art with encounter spotlighting." },
  { src: "/games/boss-battles/fnaf-dungeon.png", alt: "FNAF Fights Dungeon | Event dungeon with unique color and effects." },
  { src: "/games/boss-battles/dungeon-portal-screenshot.png", alt: "Dungeon Portals | Multi-world gateway layout from gameplay." },
  { src: "/games/boss-battles/chests-inventory.png", alt: "Inventory + Chests | Loot and progression panel capture." },
  { src: "/games/boss-battles/missions-screenshot.png", alt: "Mission Board | Active objectives and route planning panel." },
  { src: "/games/boss-battles/lobby-shot.png", alt: "Lobby Shot | Session staging area before dungeon runs." },
  { src: "/games/boss-battles/fnaf-hi.png", alt: "FNAF Event Art | Character-focused event visual treatment." },
];

const bossBattlesClips: VideoClip[] = [
  { title: "Event Clip 1", src: "/games/boss-battles/gameplay-clip-1.mp4" },
  { title: "Event Clip 2", src: "/games/boss-battles/gameplay-clip-2.mp4" },
];

const bossBattlesTracks: AudioTrack[] = [
  { title: "Noob Dungeon", src: "/games/boss-battles/music-noob-dungeon.mp3" },
  { title: "Desert Dungeon", src: "/games/boss-battles/music-desert-dungeon.mp3" },
  { title: "Fire Lava Dungeon", src: "/games/boss-battles/music-fire-lava-dungeon.mp3" },
];

const escapeBrunoImages: MediaImage[] = [
  { src: "/games/escape-bruno/encanto-shot-1.png", alt: "Escape Bruno Hero | Main running sequence key frame." },
  { src: "/games/escape-bruno/encanto-shot-3.png", alt: "Obstacle Route | Mid-run obstacle lane capture." },
  { src: "/games/escape-bruno/encanto-shot-5.png", alt: "Encounter Peak | High tension pursuit frame." },
  { src: "/games/escape-bruno/characters-menu.png", alt: "Characters Menu | Character selection and menu pass." },
  { src: "/games/escape-bruno/chairs-scene.png", alt: "Chair Maze | Puzzle-like obstacle room transition." },
  { src: "/games/escape-bruno/bruno.png", alt: "Bruno Artwork | Character-facing promotional key art." },
];

const creatorCoverage: CreatorSpot[] = [
  {
    name: "FGTeeV",
    note: "3.2M+ coverage views",
    href: "https://www.youtube.com/watch?v=gJBWB2fpCQ8",
    image: "/games/escape-bruno/encanto-shot-2.png",
  },
  {
    name: "LankyBox",
    note: "2.1M+ coverage views",
    href: "https://www.youtube.com/watch?v=AocMjuPPjFE",
    image: "/games/escape-bruno/bruno.png",
  },
  {
    name: "DenisDaily",
    note: "9M+ subs reaction video",
    href: "https://www.youtube.com/watch?v=XxteSlNAd2s",
    image: "/games/escape-bruno/encanto-shot-6.png",
  },
  {
    name: "Cherry Pop Productions",
    note: "900K+ coverage views",
    href: "https://www.youtube.com/watch?v=W7gjiPei6s0",
    image: "/games/escape-bruno/bruno.png",
  },
  {
    name: "GravyCatMan",
    note: "4M+ subs reaction video",
    href: "https://www.youtube.com/watch?v=M2YAK8UDoaA",
    image: "/games/escape-bruno/encanto-shot-8.png",
  },
  {
    name: "Brancoala Games",
    note: "1.3M+ coverage views",
    href: "https://www.youtube.com/watch?v=c8DUMxLkMFk",
    image: "/games/escape-bruno/bruno.png",
  },
];

const evilPetsImages: MediaImage[] = [
  { src: "/games/evil-pets/thumbnail.png", alt: "Evil Pets Hero | Main release key art and color direction." },
  { src: "/games/evil-pets/screenshot-33.png", alt: "Main Hall | Wide central lane from core gameplay loop." },
  { src: "/games/evil-pets/hq-12.png", alt: "Market Floor | Upgrade and spend path in the hub area." },
  { src: "/games/evil-pets/hq-main.png", alt: "HQ Core | Main world composition and object placement." },
  { src: "/games/evil-pets/hq-13.png", alt: "Heart Chamber | Iconic heart room highlight shot." },
  { src: "/games/evil-pets/hq-11.png", alt: "Pet Stat Wall | Progress and stat-facing room layout." },
  { src: "/games/evil-pets/hq-14.png", alt: "Portal Interior | Transition corridor and lit pathways." },
  { src: "/games/evil-pets/shot-6.png", alt: "Capture Shot 6 | Gameplay environment pass." },
  { src: "/games/evil-pets/shot-7.png", alt: "Capture Shot 7 | Gameplay environment pass." },
  { src: "/games/evil-pets/shot-9.png", alt: "Capture Shot 9 | Gameplay environment pass." },
  { src: "/games/evil-pets/shot-1.png", alt: "Capture Shot 1 | Gameplay environment pass." },
  { src: "/games/evil-pets/screenshot-33.png", alt: "Hub Revisit | Additional angle from the main hall." },
];

const turningRedImages: MediaImage[] = [
  { src: "/games/turning-red-tycoon/shot-1.png", alt: "School Exterior | Main spawn-side intro view." },
  { src: "/games/turning-red-tycoon/shot-2.png", alt: "Temple Build | Lantern-focused temple progression zone." },
  { src: "/games/turning-red-tycoon/shot-3.png", alt: "School Classroom | Interior class-themed room." },
  { src: "/games/turning-red-tycoon/shot-4.png", alt: "Temple Interior | In-building route for tycoon flow." },
  { src: "/games/turning-red-tycoon/shot-5.png", alt: "Progress Pass | Mid-loop progression environment shot." },
  { src: "/games/turning-red-tycoon/shot-6.png", alt: "Wide Build View | Updated world pass in high resolution." },
  { src: "/games/turning-red-tycoon/shot-7.png", alt: "Wide Build View 2 | Follow-up pass from live map capture." },
  { src: "/games/turning-red-tycoon/roblox-shot-1.png", alt: "Roleplay Angle 1 | Roblox capture from release period." },
  { src: "/games/turning-red-tycoon/roblox-shot-2.png", alt: "Roleplay Angle 2 | Roblox capture from release period." },
  { src: "/games/turning-red-tycoon/roblox-shot-3.png", alt: "Roleplay Angle 3 | Roblox capture from release period." },
  { src: "/games/turning-red-tycoon/roblox-shot-4.png", alt: "Roleplay Angle 4 | Roblox capture from release period." },
];

const brainrotImages: MediaImage[] = [
  { src: "/games/raise-a-brainrot/thumbnail.png", alt: "Main Thumbnail | Core launch thumbnail for the game page." },
  { src: "/games/raise-a-brainrot/thumbnail-2.png", alt: "Tycoon Lane | Environment capture from active gameplay." },
  { src: "/games/raise-a-brainrot/thumbnail-3.png", alt: "Egg Board | Egg and rarity panel from the build." },
  { src: "/games/raise-a-brainrot/thumbnail-4.png", alt: "Promo Variant | Additional promotional visual pass." },
  { src: "/games/raise-a-brainrot/image-1.webp", alt: "Pet Progression | Clip frame focused on pet loops." },
  { src: "/games/raise-a-brainrot/image-2.webp", alt: "Pet Progression 2 | Alternate clip frame from the same loop." },
  { src: "/games/raise-a-brainrot/shop-ui.png", alt: "Shop UI | In-game shop and upgrade controls." },
];

const gameMeta = {
  roEmpires: {
    genres: ["Strategy", "Building", "Action"],
    description:
      "RoEmpires is a real time strategy kingdom builder game where players create villages and build armies to defend and attack enemies in both singleplayer and multiplayer modes.",
  },
  encaved: {
    genres: ["Horror", "Adventure", "Story", "Survival"],
    description:
      "Encaved is a horror adventure game where players enter dangerous cave systems to mine resources and survive encounters with spiritual entities.",
  },
  bossBattles: {
    genres: ["Simulator", "Fighting", "Action"],
    description:
      "Boss Battles is a classic dungeon-fighting game where players train and become stronger to defeat enemies and build their swords.",
  },
  escapeBruno: {
    genres: ["Obby", "Horror", "Story"],
    description:
      "Escape Bruno is a horror obstacle runner where players sprint through dangerous maps while dodging Bruno encounters and jumpscares.",
  },
  evilPets: {
    genres: ["Tycoon", "Strategy", "Action"],
    description:
      "Evil Pets is a pet tycoon game where players use pets to produce money and spend it to improve and build their own base.",
  },
  pandaTycoon: {
    genres: ["Tycoon", "Roleplay"],
    description:
      "Panda Tycoon is a game where players grow and manage red panda factories while exploring simulation and roleplay systems.",
  },
  raiseABrainrot: {
    genres: ["Tycoon", "Casual"],
    description: "Raise a Brainrot is a tycoon game where players build and expand operations using casual progression loops.",
  },
} as const;

export const metadata: Metadata = {
  title: "Games",
  description: "ForestlyGames game sections with real project media and creator coverage.",
};

export default function GamesPage() {
  const mainGames = [
    {
      href: "#roempires",
      title: "RoEmpires",
      stage: "[ALPHA]",
      image: roEmpiresImages[0],
      note: "Strategy kingdom builder with trailer, gameplay clips, and full audio deck.",
      accent: "gold" as const,
    },
    {
      href: "#encaved",
      title: "Encaved",
      stage: "In Development",
      image: encavedImages[0],
      note: "Horror mining world with prototype clips, ambience tracks, and environment roll.",
      accent: "emerald" as const,
    },
    {
      href: "#boss-battles",
      title: "Boss Battles",
      stage: "Released",
      image: bossBattlesImages[0],
      note: "Event-heavy dungeon combat with creator media, clips, and soundtrack pass.",
      accent: "azure" as const,
    },
    {
      href: "#escape-bruno",
      title: "Escape Bruno",
      stage: "Released",
      image: escapeBrunoImages[0],
      note: "Creator-focused horror run with gameplay roll and high-view YouTube coverage.",
      accent: "gold" as const,
    },
  ];

  return (
    <>
      {/* -- Page Header -- */}
      <Section className="pb-6 pt-10 sm:pb-8 sm:pt-14">
        <Container className="max-w-[96rem]">
          <div className="pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/85">
              ForestlyGames
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.86] tracking-tight text-mist-50">
              Games
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist-200/80 sm:text-lg">
              Every game we&apos;ve built, from early prototypes to live titles. Real screenshots, real gameplay, real audio.
            </p>
            <nav className="mt-8 flex flex-wrap gap-2">
              {[
                { href: "#roempires", label: "RoEmpires", accent: "gold" as const },
                { href: "#encaved", label: "Encaved", accent: "emerald" as const },
                { href: "#boss-battles", label: "Boss Battles", accent: "azure" as const },
                { href: "#escape-bruno", label: "Escape Bruno", accent: "gold" as const },
                { href: "#evil-pets", label: "Evil Pets", accent: "emerald" as const },
                { href: "#panda-tycoon", label: "Panda Tycoon", accent: "gold" as const },
                { href: "#raise-a-brainrot", label: "Raise a Brainrot", accent: "azure" as const },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-full border px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.15em] transition-all duration-200 hover:scale-[1.04] ${accentMap[item.accent].pill} ${accentMap[item.accent].pillText}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {mainGames.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group overflow-hidden rounded-xl border bg-bg-900/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-mist-100/30 ${accentMap[item.accent].borderSubtle}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width:1280px) 22vw, (min-width:640px) 45vw, 94vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="px-3.5 py-3.5">
                    <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${accentMap[item.accent].textMuted}`}>
                      {item.stage}
                    </p>
                    <p className="mt-1 font-display text-[1.55rem] leading-none text-mist-50">{item.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-mist-200/70">{item.note}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* -- RoEmpires -- */}
      <Section id="roempires" className="py-6 sm:py-10">
        <Container className="max-w-[96rem]">
          <GameHeroBanner image={roEmpiresImages[0]} title="RoEmpires" accent="gold">
            <GenrePills genres={gameMeta.roEmpires.genres} accent="gold" />
            <p className="text-sm leading-relaxed text-mist-200/80 sm:text-base">
              {gameMeta.roEmpires.description}
            </p>
          </GameHeroBanner>

          <div className="mt-6 space-y-6">
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg border border-gold-300/20 bg-bg-900/40">
                  <div className="relative aspect-video">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                      poster="/games/roempires/thumbnail.png"
                      src="/games/roempires/trailer.mp4"
                    />
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-gold-100/80">Main Trailer</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roEmpiresClips.map((clip, index) => (
                    <VideoCard
                      key={clip.src}
                      clip={clip}
                      poster={roEmpiresImages[Math.min(index + 2, roEmpiresImages.length - 1)].src}
                      accent="gold"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <MediaGrid images={roEmpiresImages.slice(0, 6)} accent="gold" columns={2} />
                <div className="grid gap-3 sm:grid-cols-2">
                  {roEmpiresTracks.slice(0, 4).map((track) => (
                    <AudioCard key={track.src} track={track} accent="gold" />
                  ))}
                </div>
              </div>
            </div>

            {roEmpiresImages.length > 6 && (
              <MediaGrid images={roEmpiresImages.slice(6)} accent="gold" columns={4} />
            )}
          </div>
        </Container>
      </Section>

      <SectionDivider accent="emerald" />

      {/* -- Encaved -- */}
      <Section id="encaved" className="py-6 sm:py-10">
        <Container className="max-w-[96rem]">
          <GameHeroBanner image={encavedImages[0]} title="Encaved" accent="emerald">
            <GenrePills genres={gameMeta.encaved.genres} accent="emerald" />
            <p className="text-sm leading-relaxed text-mist-200/80 sm:text-base">
              {gameMeta.encaved.description}
            </p>
          </GameHeroBanner>

          <div className="mt-6 space-y-6">
            <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-4">
                <figure className="game-media-item group relative aspect-16/10 overflow-hidden rounded-lg border border-emerald-200/18">
                  <Image
                    src={encavedImages[0].src}
                    alt={encavedImages[0].alt}
                    fill
                    sizes="(min-width:1280px) 42vw, 94vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </figure>
                <div className="grid gap-3 sm:grid-cols-2">
                  {encavedTracks.map((track) => (
                    <AudioCard key={track.src} track={track} accent="emerald" />
                  ))}
                </div>
              </div>

              <MediaGrid images={encavedImages.slice(1)} accent="emerald" columns={2} />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {encavedPrototypeClips.map((clip, index) => (
                <VideoCard
                  key={clip.src}
                  clip={clip}
                  poster={encavedImages[Math.min(index + 1, encavedImages.length - 1)].src}
                  accent="emerald"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider accent="azure" />

      {/* -- Boss Battles -- */}
      <Section id="boss-battles" className="py-6 sm:py-10">
        <Container className="max-w-[96rem]">
          <GameHeroBanner image={bossBattlesImages[0]} title="Boss Battles" accent="azure">
            <GenrePills genres={gameMeta.bossBattles.genres} accent="azure" />
            <p className="text-sm leading-relaxed text-mist-200/80 sm:text-base">
              {gameMeta.bossBattles.description}
            </p>
          </GameHeroBanner>

          <div className="mt-6 space-y-6">
            <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <figure className="game-media-item group relative aspect-video overflow-hidden rounded-lg border border-azure-300/16">
                  <Image
                    src={bossBattlesImages[0].src}
                    alt={bossBattlesImages[0].alt}
                    fill
                    sizes="(min-width:1280px) 48vw, 94vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </figure>
                <MediaGrid images={bossBattlesImages.slice(1, 7)} accent="azure" columns={3} />
                <figure className="game-media-item group relative aspect-16/7 overflow-hidden rounded-lg border border-azure-300/14">
                  <Image
                    src={bossBattlesImages[7].src}
                    alt={bossBattlesImages[7].alt}
                    fill
                    sizes="(min-width:1280px) 48vw, 94vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </figure>
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {bossBattlesClips.map((clip, index) => (
                    <VideoCard
                      key={clip.src}
                      clip={clip}
                      poster={bossBattlesImages[Math.min(index + 2, bossBattlesImages.length - 1)].src}
                      accent="azure"
                    />
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {bossBattlesTracks.map((track) => (
                    <AudioCard key={track.src} track={track} accent="azure" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider accent="gold" />

      {/* -- Escape Bruno -- */}
      <Section id="escape-bruno" className="py-6 sm:py-10">
        <Container className="max-w-[96rem]">
          <GameHeroBanner image={escapeBrunoImages[0]} title="Escape Bruno" accent="gold">
            <GenrePills genres={gameMeta.escapeBruno.genres} accent="gold" />
            <p className="text-sm leading-relaxed text-mist-200/80 sm:text-base">
              {gameMeta.escapeBruno.description}
            </p>
          </GameHeroBanner>

          <div className="mt-6 space-y-6">
            <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <figure className="game-media-item group relative aspect-video overflow-hidden rounded-lg border border-gold-300/16">
                <Image
                  src={escapeBrunoImages[0].src}
                  alt={escapeBrunoImages[0].alt}
                  fill
                  sizes="(min-width:1024px) 56vw, 94vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </figure>
              <MediaGrid images={escapeBrunoImages.slice(1)} accent="gold" columns={2} />
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-100/70">
                Creator Coverage
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {creatorCoverage.map((creator) => (
                  <Link
                    key={creator.href}
                    href={creator.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group block overflow-hidden rounded-lg border border-gold-300/18 bg-bg-900/40 transition-all duration-300 hover:border-gold-300/36 hover:shadow-[0_0_30px_8px_rgba(222,186,120,0.06)]"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={creator.image}
                        alt={`${creator.name} thumbnail`}
                        fill
                        sizes="400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-bg-950/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-3.5">
                      <p className="font-display text-xl leading-none text-mist-50">{creator.name}</p>
                      <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-300/80">
                        {creator.note}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider accent="emerald" />

      <Section className="pb-0 pt-6 sm:pt-8">
        <Container className="max-w-[96rem]">
          <div className="rounded-xl border border-mist-100/12 bg-bg-900/30 px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-300/66">More Games</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4.4vw,3rem)] leading-[0.92] tracking-tight text-mist-50">
              Live Titles Beyond The Main Four
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-mist-200/72 sm:text-base">
              These projects use their own layouts and media rolls instead of a single repeated card template.
            </p>
          </div>
        </Container>
      </Section>

      {/* -- Evil Pets -- */}
      <Section id="evil-pets" className="py-6 sm:py-10">
        <Container className="max-w-[96rem]">
          <GameHeroBanner image={evilPetsImages[0]} title="Evil Pets" accent="moss">
            <GenrePills genres={gameMeta.evilPets.genres} accent="moss" />
            <p className="text-sm leading-relaxed text-mist-200/80 sm:text-base">
              {gameMeta.evilPets.description}
            </p>
          </GameHeroBanner>

          <div className="mt-6 space-y-6">
            <div className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
              <div className="space-y-4">
                <VideoCard
                  clip={{ title: "Fence Teaser", src: "/games/evil-pets/fence-teaser.mp4" }}
                  poster="/games/evil-pets/thumbnail.png"
                  accent="moss"
                />
                <AudioCard
                  track={{ title: "Intro Track", src: "/games/evil-pets/intro-perfect.mp3" }}
                  accent="moss"
                />
              </div>

              <MediaGrid images={evilPetsImages} accent="moss" columns={3} />
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider accent="gold" />

      {/* -- Panda Tycoon -- */}
      <Section id="panda-tycoon" className="py-6 sm:py-10">
        <Container className="max-w-[96rem]">
          <GameHeroBanner image={turningRedImages[0]} title="Panda Tycoon" accent="gold">
            <GenrePills genres={gameMeta.pandaTycoon.genres} accent="gold" />
            <p className="text-sm leading-relaxed text-mist-200/80 sm:text-base">
              {gameMeta.pandaTycoon.description}
            </p>
          </GameHeroBanner>

          <div className="mt-6">
            <MediaGrid images={turningRedImages} accent="gold" columns={4} />
          </div>
        </Container>
      </Section>

      <SectionDivider accent="azure" />

      {/* -- Raise a Brainrot -- */}
      <Section id="raise-a-brainrot" className="py-6 sm:py-10">
        <Container className="max-w-[96rem]">
          <GameHeroBanner image={brainrotImages[0]} title="Raise a Brainrot" accent="azure">
            <GenrePills genres={gameMeta.raiseABrainrot.genres} accent="azure" />
            <p className="text-sm leading-relaxed text-mist-200/80 sm:text-base">
              {gameMeta.raiseABrainrot.description}
            </p>
          </GameHeroBanner>

          <div className="mt-6 space-y-6">
            <div className="grid gap-4 xl:grid-cols-2">
              <VideoCard
                clip={{ title: "Clip 1", src: "/games/raise-a-brainrot/clip-1.mp4" }}
                poster="/games/raise-a-brainrot/thumbnail.png"
                accent="azure"
              />
              <VideoCard
                clip={{ title: "Clip 2", src: "/games/raise-a-brainrot/clip-2.mp4" }}
                poster="/games/raise-a-brainrot/thumbnail-2.png"
                accent="azure"
              />
            </div>

            <MediaGrid images={brainrotImages} accent="azure" columns={4} />
          </div>
        </Container>
      </Section>

      <SectionDivider accent="emerald" />

      {/* -- Legacy Archive -- */}
      <Section className="pb-16 pt-6 sm:pb-20">
        <Container className="max-w-[96rem]">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">Legacy Archive</p>
              <p className="mt-2 text-sm text-mist-300/60">Older titles from our earlier catalog.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {archiveHighlights.map((item) => (
                <article
                  key={item.title}
                  className="game-media-item group overflow-hidden rounded-lg border border-emerald-200/16 bg-bg-900/40"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 94vw"
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
          </div>
        </Container>
      </Section>
    </>
  );
}


