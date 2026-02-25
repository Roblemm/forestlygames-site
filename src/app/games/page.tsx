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

const roEmpiresImages: MediaImage[] = [
  { src: "/games/roempires/thumbnail.png", alt: "RoEmpires thumbnail artwork." },
  { src: "/games/roempires/banner-1.png", alt: "RoEmpires banner art." },
  { src: "/games/roempires/banner-2.png", alt: "RoEmpires secondary banner art." },
  { src: "/games/roempires/screenshot-79.png", alt: "RoEmpires character shot." },
  { src: "/games/roempires/screenshot-90.png", alt: "RoEmpires scene screenshot." },
  { src: "/games/roempires/screenshot-76.png", alt: "RoEmpires gameplay screenshot." },
  { src: "/games/roempires/screenshot-77.png", alt: "RoEmpires battle scene." },
  { src: "/games/roempires/icon.png", alt: "RoEmpires icon." },
];

const roEmpiresClips: VideoClip[] = [
  { title: "Gameplay", src: "/games/roempires/gameplay.mp4" },
  { title: "Attacking", src: "/games/roempires/attacking.mp4" },
  { title: "Placement", src: "/games/roempires/placement.mp4" },
  { title: "UI Pass", src: "/games/roempires/ui.mp4" },
];

const roEmpiresTracks: AudioTrack[] = [{ title: "Audio", src: "/games/roempires/boost-sfx.mp3" }];

const encavedImages: MediaImage[] = [
  { src: "/games/encaved/hero.png", alt: "Encaved hero artwork." },
  { src: "/games/encaved/cave-entrance-3.png", alt: "Encaved cave entrance." },
  { src: "/games/encaved/cave-interior-mine.png", alt: "Encaved cave interior concept." },
  { src: "/games/encaved/mining-station-1.png", alt: "Encaved mining station." },
  { src: "/games/encaved/mining-station-house-2.png", alt: "Encaved station housing." },
  { src: "/games/encaved/minecart-room-straight.png", alt: "Encaved minecart route." },
  { src: "/games/encaved/ore-market.png", alt: "Encaved ore market scene." },
  { src: "/games/encaved/lobby-entrance-4.png", alt: "Encaved lobby entrance." },
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
  { src: "/games/boss-battles/thumbnail.png", alt: "Boss Battles key art." },
  { src: "/games/boss-battles/noob-throw-og.png", alt: "Boss Battles noob throw artwork." },
  { src: "/games/boss-battles/mirabel-hi.png", alt: "Boss Battles Mirabel art." },
  { src: "/games/boss-battles/fire-icon-mirabel.png", alt: "Boss Battles fire icon Mirabel art." },
  { src: "/games/boss-battles/glowing-eyes-mirabel.png", alt: "Boss Battles glowing eyes Mirabel art." },
  { src: "/games/boss-battles/dungeon-portal-screenshot.png", alt: "Boss Battles portal screenshot." },
  { src: "/games/boss-battles/missions-screenshot.png", alt: "Boss Battles mission screenshot." },
  { src: "/games/boss-battles/fnaf-hi.png", alt: "Boss Battles FNAF art." },
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
  { src: "/games/escape-bruno/mirabel-glow.png", alt: "Escape Bruno key art." },
  { src: "/games/escape-bruno/bruno.png", alt: "Escape Bruno character artwork." },
  { src: "/games/escape-bruno/mirabel-glow.png", alt: "Escape Bruno key art variation." },
  { src: "/games/escape-bruno/bruno.png", alt: "Escape Bruno character artwork variation." },
];

const creatorCoverage: CreatorSpot[] = [
  {
    name: "FGTeeV",
    note: "3.2M+ coverage views",
    href: "https://www.youtube.com/watch?v=gJBWB2fpCQ8",
    image: "/games/escape-bruno/mirabel-glow.png",
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
    image: "/games/escape-bruno/mirabel-glow.png",
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
    image: "/games/escape-bruno/mirabel-glow.png",
  },
  {
    name: "Brancoala Games",
    note: "1.3M+ coverage views",
    href: "https://www.youtube.com/watch?v=c8DUMxLkMFk",
    image: "/games/escape-bruno/bruno.png",
  },
];

const evilPetsImages: MediaImage[] = [
  { src: "/games/evil-pets/thumbnail.png", alt: "Evil Pets key art." },
  { src: "/games/evil-pets/screenshot-33.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/hq-12.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/hq-main.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/hq-13.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/hq-11.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/hq-14.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/shot-6.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/shot-7.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/shot-9.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/shot-1.png", alt: "Evil Pets screenshot." },
  { src: "/games/evil-pets/screenshot-33.png", alt: "Evil Pets screenshot." },
];

const turningRedImages: MediaImage[] = [
  { src: "/games/turning-red-tycoon/shot-1.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/shot-2.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/shot-3.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/shot-4.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/shot-5.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/shot-6.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/shot-7.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/roblox-shot-1.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/roblox-shot-2.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/roblox-shot-3.png", alt: "Panda Tycoon screenshot." },
  { src: "/games/turning-red-tycoon/roblox-shot-4.png", alt: "Panda Tycoon screenshot." },
];

const brainrotImages: MediaImage[] = [
  { src: "/games/raise-a-brainrot/thumbnail.png", alt: "Raise a Brainrot screenshot." },
  { src: "/games/raise-a-brainrot/thumbnail-2.png", alt: "Raise a Brainrot screenshot." },
  { src: "/games/raise-a-brainrot/thumbnail-3.png", alt: "Raise a Brainrot screenshot." },
  { src: "/games/raise-a-brainrot/thumbnail-4.png", alt: "Raise a Brainrot screenshot." },
  { src: "/games/raise-a-brainrot/image-1.webp", alt: "Raise a Brainrot screenshot." },
  { src: "/games/raise-a-brainrot/image-2.webp", alt: "Raise a Brainrot screenshot." },
  { src: "/games/raise-a-brainrot/shop-ui.png", alt: "Raise a Brainrot screenshot." },
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
      "Escape Bruno is a game inspired by Disney's Encanto, where players run through obstacles to avoid Bruno and his jumpscares.",
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
  return (
    <>
      <Section className="pb-8 pt-10 sm:pb-10 sm:pt-14">
        <Container className="max-w-[90rem]">
          <div className="border-b border-emerald-200/20 pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/85">ForestlyGames</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,7.2vw,5.4rem)] leading-[0.9] text-mist-50">Games</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-mist-200/84 sm:text-lg">
              Live game sections, rebuilt to prioritize readable titles and dense media presentation with real project assets.
            </p>
            <nav className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] sm:text-sm">
              <a href="#roempires" className="border border-gold-300/30 px-3 py-1.5 text-gold-100">RoEmpires</a>
              <a href="#encaved" className="border border-emerald-200/30 px-3 py-1.5 text-emerald-100">Encaved</a>
              <a href="#boss-battles" className="border border-azure-300/30 px-3 py-1.5 text-azure-300">Boss Battles</a>
              <a href="#escape-bruno" className="border border-gold-300/30 px-3 py-1.5 text-gold-100">Escape Bruno</a>
              <a href="#evil-pets" className="border border-emerald-200/30 px-3 py-1.5 text-emerald-100">Evil Pets</a>
              <a href="#panda-tycoon" className="border border-gold-300/30 px-3 py-1.5 text-gold-100">Panda Tycoon</a>
              <a href="#raise-a-brainrot" className="border border-azure-300/30 px-3 py-1.5 text-azure-300">Raise a Brainrot</a>
            </nav>
          </div>
        </Container>
      </Section>

      <Section id="roempires" className="py-10 sm:py-14">
        <Container className="max-w-[90rem]">
          <article className="space-y-5 border-t border-gold-300/22 pt-8">
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.9] text-mist-50">RoEmpires</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-gold-100/84">
              {gameMeta.roEmpires.genres.join(" | ")}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-mist-200/84 sm:text-base">
              {gameMeta.roEmpires.description}
            </p>

            <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden border border-gold-300/24 bg-bg-950/40">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    poster="/games/roempires/thumbnail.png"
                    src="/games/roempires/trailer.mp4"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roEmpiresClips.map((clip, index) => (
                    <article key={clip.src} className="overflow-hidden border border-mist-50/14 bg-bg-950/40 p-2">
                      <div className="relative aspect-video overflow-hidden border border-mist-50/12">
                        <video
                          className="h-full w-full object-cover"
                          controls
                          preload="metadata"
                          playsInline
                          poster={roEmpiresImages[Math.min(index + 2, roEmpiresImages.length - 1)].src}
                          src={clip.src}
                        />
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.13em] text-mist-200/80">{clip.title}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {roEmpiresImages.slice(0, 6).map((asset, index) => (
                    <figure key={`${asset.src}-${index}`} className="relative aspect-[4/3] overflow-hidden border border-mist-50/12">
                      <Image src={asset.src} alt={asset.alt} fill sizes="420px" className="object-cover" />
                    </figure>
                  ))}
                </div>
                <div className="border border-gold-300/22 bg-bg-950/40 p-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.13em] text-gold-100/88">Audio</p>
                  <audio className="w-full" controls preload="none" src={roEmpiresTracks[0].src} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {roEmpiresImages.slice(6).map((asset, index) => (
                <figure key={`${asset.src}-${index}`} className="relative aspect-[5/4] overflow-hidden border border-mist-50/12">
                  <Image src={asset.src} alt={asset.alt} fill sizes="300px" className="object-cover" />
                </figure>
              ))}
            </div>
          </article>
        </Container>
      </Section>
      <Section id="encaved" className="py-10 sm:py-14">
        <Container className="max-w-[90rem]">
          <article className="space-y-5 border-t border-emerald-200/22 pt-8">
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.9] text-mist-50">Encaved</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/84">
              {gameMeta.encaved.genres.join(" | ")}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-mist-200/84 sm:text-base">
              {gameMeta.encaved.description}
            </p>

            <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-4">
                <figure className="relative aspect-[16/10] overflow-hidden border border-emerald-200/20">
                  <Image src={encavedImages[0].src} alt={encavedImages[0].alt} fill sizes="(min-width:1280px) 42vw, 94vw" className="object-cover" />
                </figure>
                <div className="grid gap-2 sm:grid-cols-2">
                  {encavedTracks.map((track) => (
                    <div key={track.src} className="border border-emerald-200/16 bg-bg-950/40 p-2">
                      <p className="mb-1 text-[0.66rem] uppercase tracking-[0.13em] text-mist-200/80">{track.title}</p>
                      <audio className="w-full" controls preload="none" src={track.src} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {encavedImages.slice(1).map((asset, index) => (
                  <figure key={`${asset.src}-${index}`} className="relative aspect-[4/3] overflow-hidden border border-mist-50/12">
                    <Image src={asset.src} alt={asset.alt} fill sizes="420px" className="object-cover" />
                  </figure>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {encavedPrototypeClips.map((clip, index) => (
                <article key={clip.src} className="overflow-hidden border border-mist-50/14 bg-bg-950/40 p-2">
                  <div className="relative aspect-video overflow-hidden border border-mist-50/12">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                      poster={encavedImages[Math.min(index + 1, encavedImages.length - 1)].src}
                      src={clip.src}
                    />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.13em] text-mist-200/80">{clip.title}</p>
                </article>
              ))}
            </div>
          </article>
        </Container>
      </Section>

      <Section id="boss-battles" className="py-10 sm:py-14">
        <Container className="max-w-[90rem]">
          <article className="space-y-5 border-t border-azure-300/22 pt-8">
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.9] text-mist-50">Boss Battles</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-azure-200/84">
              {gameMeta.bossBattles.genres.join(" | ")}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-mist-200/84 sm:text-base">
              {gameMeta.bossBattles.description}
            </p>

            <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="grid grid-cols-6 gap-2">
                <figure className="relative col-span-6 aspect-[16/9] overflow-hidden border border-mist-50/12 sm:col-span-4 sm:row-span-2 sm:aspect-auto">
                  <Image src={bossBattlesImages[0].src} alt={bossBattlesImages[0].alt} fill sizes="(min-width:1280px) 42vw, 94vw" className="object-cover" />
                </figure>
                <figure className="relative col-span-3 aspect-[4/3] overflow-hidden border border-mist-50/12 sm:col-span-2">
                  <Image src={bossBattlesImages[1].src} alt={bossBattlesImages[1].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative col-span-3 aspect-[4/3] overflow-hidden border border-mist-50/12 sm:col-span-2">
                  <Image src={bossBattlesImages[2].src} alt={bossBattlesImages[2].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative col-span-3 aspect-[4/3] overflow-hidden border border-mist-50/12 sm:col-span-2">
                  <Image src={bossBattlesImages[3].src} alt={bossBattlesImages[3].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative col-span-3 aspect-[4/3] overflow-hidden border border-mist-50/12 sm:col-span-2">
                  <Image src={bossBattlesImages[4].src} alt={bossBattlesImages[4].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative col-span-3 aspect-[4/3] overflow-hidden border border-mist-50/12 sm:col-span-2">
                  <Image src={bossBattlesImages[5].src} alt={bossBattlesImages[5].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative col-span-3 aspect-[4/3] overflow-hidden border border-mist-50/12 sm:col-span-2">
                  <Image src={bossBattlesImages[6].src} alt={bossBattlesImages[6].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative col-span-6 aspect-[16/7] overflow-hidden border border-mist-50/12 sm:col-span-6">
                  <Image src={bossBattlesImages[7].src} alt={bossBattlesImages[7].alt} fill sizes="(min-width:1280px) 42vw, 94vw" className="object-cover" />
                </figure>
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {bossBattlesClips.map((clip, index) => (
                    <article key={clip.src} className="overflow-hidden border border-mist-50/14 bg-bg-950/40 p-2">
                      <div className="relative aspect-video overflow-hidden border border-mist-50/12">
                        <video
                          className="h-full w-full object-cover"
                          controls
                          preload="metadata"
                          playsInline
                          poster={bossBattlesImages[Math.min(index + 2, bossBattlesImages.length - 1)].src}
                          src={clip.src}
                        />
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.13em] text-mist-200/80">{clip.title}</p>
                    </article>
                  ))}
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  {bossBattlesTracks.map((track) => (
                    <div key={track.src} className="border border-azure-300/18 bg-bg-950/40 p-2">
                      <p className="mb-1 text-[0.66rem] uppercase tracking-[0.13em] text-mist-200/80">{track.title}</p>
                      <audio className="w-full" controls preload="none" src={track.src} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      <Section id="escape-bruno" className="py-10 sm:py-14">
        <Container className="max-w-[90rem]">
          <article className="space-y-5 border-t border-gold-300/22 pt-8">
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.9] text-mist-50">Escape Bruno</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-gold-100/84">
              {gameMeta.escapeBruno.genres.join(" | ")}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-mist-200/84 sm:text-base">
              {gameMeta.escapeBruno.description}
            </p>

            <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <figure className="relative aspect-[16/9] overflow-hidden border border-mist-50/12">
                <Image
                  src={escapeBrunoImages[0].src}
                  alt={escapeBrunoImages[0].alt}
                  fill
                  sizes="(min-width:1024px) 56vw, 94vw"
                  className="object-cover"
                />
              </figure>
              <div className="grid grid-cols-2 gap-2">
                <figure className="relative aspect-[4/3] overflow-hidden border border-mist-50/12">
                  <Image src={escapeBrunoImages[1].src} alt={escapeBrunoImages[1].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative aspect-[4/3] overflow-hidden border border-mist-50/12">
                  <Image src={escapeBrunoImages[2].src} alt={escapeBrunoImages[2].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative aspect-[4/3] overflow-hidden border border-mist-50/12">
                  <Image src={escapeBrunoImages[3].src} alt={escapeBrunoImages[3].alt} fill sizes="280px" className="object-cover" />
                </figure>
                <figure className="relative aspect-[4/3] overflow-hidden border border-mist-50/12">
                  <Image src={escapeBrunoImages[1].src} alt={escapeBrunoImages[1].alt} fill sizes="280px" className="object-cover" />
                </figure>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {creatorCoverage.map((creator) => (
                <Link key={creator.href} href={creator.href} target="_blank" rel="noreferrer noopener" className="group block overflow-hidden border border-gold-300/22 bg-bg-950/34">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={creator.image} alt={`${creator.name} thumbnail`} fill sizes="400px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-3">
                    <p className="font-display text-2xl leading-none text-mist-50">{creator.name}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.13em] text-gold-100/82">{creator.note}</p>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        </Container>
      </Section>

      <Section id="evil-pets" className="py-10 sm:py-14">
        <Container className="max-w-[90rem]">
          <article className="space-y-5 border-t border-emerald-200/22 pt-8">
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.9] text-mist-50">Evil Pets</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/84">
              {gameMeta.evilPets.genres.join(" | ")}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-mist-200/84 sm:text-base">
              {gameMeta.evilPets.description}
            </p>

            <div className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
              <div className="space-y-4">
                <article className="overflow-hidden border border-mist-50/14 bg-bg-950/40 p-2">
                  <div className="relative aspect-video overflow-hidden border border-mist-50/12">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                      poster="/games/evil-pets/thumbnail.png"
                      src="/games/evil-pets/fence-teaser.mp4"
                    />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.13em] text-mist-200/80">Fence Teaser</p>
                </article>
                <div className="border border-emerald-200/18 bg-bg-950/40 p-2">
                  <p className="mb-1 text-[0.66rem] uppercase tracking-[0.13em] text-mist-200/80">Intro Track</p>
                  <audio className="w-full" controls preload="none" src="/games/evil-pets/intro-perfect.mp3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {evilPetsImages.map((asset, index) => (
                  <figure key={`${asset.src}-${index}`} className="relative aspect-[4/3] overflow-hidden border border-mist-50/12">
                    <Image src={asset.src} alt={asset.alt} fill sizes="280px" className="object-cover" />
                  </figure>
                ))}
              </div>
            </div>
          </article>
        </Container>
      </Section>
      <Section id="panda-tycoon" className="py-10 sm:py-14">
        <Container className="max-w-[90rem]">
          <article className="space-y-5 border-t border-gold-300/22 pt-8">
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.9] text-mist-50">Panda Tycoon</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-gold-100/84">
              {gameMeta.pandaTycoon.genres.join(" | ")}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-mist-200/84 sm:text-base">
              {gameMeta.pandaTycoon.description}
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {turningRedImages.map((asset, index) => (
                <figure key={`${asset.src}-${index}`} className="relative aspect-[16/10] overflow-hidden border border-mist-50/12">
                  <Image src={asset.src} alt={asset.alt} fill sizes="260px" className="object-cover" />
                </figure>
              ))}
            </div>
          </article>
        </Container>
      </Section>

      <Section id="raise-a-brainrot" className="py-10 sm:py-14">
        <Container className="max-w-[90rem]">
          <article className="space-y-5 border-t border-azure-300/22 pt-8">
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.9] text-mist-50">Raise a Brainrot</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-azure-200/84">
              {gameMeta.raiseABrainrot.genres.join(" | ")}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-mist-200/84 sm:text-base">
              {gameMeta.raiseABrainrot.description}
            </p>

            <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
              <article className="overflow-hidden border border-mist-50/14 bg-bg-950/40 p-2">
                <div className="relative aspect-video overflow-hidden border border-mist-50/12">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    poster="/games/raise-a-brainrot/thumbnail.png"
                    src="/games/raise-a-brainrot/clip-1.mp4"
                  />
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.13em] text-mist-200/80">Clip 1</p>
              </article>
              <article className="overflow-hidden border border-mist-50/14 bg-bg-950/40 p-2">
                <div className="relative aspect-video overflow-hidden border border-mist-50/12">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    poster="/games/raise-a-brainrot/thumbnail-2.png"
                    src="/games/raise-a-brainrot/clip-2.mp4"
                  />
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.13em] text-mist-200/80">Clip 2</p>
              </article>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {brainrotImages.map((asset, index) => (
                <figure key={`${asset.src}-${index}`} className="relative aspect-[16/10] overflow-hidden border border-mist-50/12">
                  <Image src={asset.src} alt={asset.alt} fill sizes="260px" className="object-cover" />
                </figure>
              ))}
            </div>
          </article>
        </Container>
      </Section>

      <Section className="pb-16 pt-10 sm:pb-20">
        <Container className="max-w-[90rem]">
          <div className="border-t border-emerald-200/18 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/86">Legacy Archive</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {archiveHighlights.map((item) => (
                <article key={item.title} className="overflow-hidden border border-emerald-200/20 bg-bg-900/50">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1280px) 23vw, (min-width: 640px) 45vw, 94vw"
                      className="object-cover"
                      style={{ objectPosition: item.image.objectPosition }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-display text-xl text-mist-50">{item.title}</p>
                    <p className="mt-1 text-[0.66rem] uppercase tracking-[0.13em] text-mist-300">{item.note}</p>
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

