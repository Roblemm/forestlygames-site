import type { Metadata } from "next";
import Image from "next/image";

import { AudioTrackPlayer } from "@/components/games/AudioTrackPlayer";
import { ImageLightbox } from "@/components/games/ImageLightbox";
import { ScrollingMediaReel } from "@/components/games/ScrollingMediaReel";
import { GamesHeroScene } from "@/components/motion/scenes/GamesHeroScene";
import { GamesPageScene } from "@/components/motion/scenes/GamesPageScene";
import { GamesScrollScene } from "@/components/motion/scenes/GamesScrollScene";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { archiveHighlights } from "@/data/games";
import type { MediaItem } from "@/components/games/ImageLightbox";

type MediaImage = MediaItem;

type VideoClip = {
  title: string;
  src: string;
};

type AudioTrack = {
  title: string;
  src: string;
  durationSeconds?: number;
  icon?: string;
};

type CreatorSpot = {
  name: string;
  note: string;
  href: string;
  videoId: string;
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
    pillHoverGlow: string;
    cardHoverGlow: string;
    audioBorder: string;
    gradient: string;
    heroBg: string;
    sectionBg: string;
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
    pillHoverGlow: "hover:shadow-[0_0_18px_-3px_rgba(222,186,120,0.35)]",
    cardHoverGlow: "hover:shadow-[0_8px_32px_-6px_rgba(222,186,120,0.2)]",
    audioBorder: "border-gold-300/22",
    gradient: "from-gold-300/6 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-gold-400/8 via-bg-950/95 to-bg-950",
    sectionBg:
      "bg-[radial-gradient(circle_at_15%_25%,rgba(222,186,120,0.09),transparent_45%),radial-gradient(circle_at_88%_72%,rgba(222,186,120,0.05),transparent_38%)]",
  },
  emerald: {
    border: "border-emerald-200/30",
    borderSubtle: "border-emerald-200/14",
    text: "text-emerald-100",
    textMuted: "text-emerald-200/72",
    glow: "shadow-[0_0_120px_40px_rgba(156,218,184,0.07)]",
    pill: "bg-emerald-300/12 border-emerald-200/28",
    pillText: "text-emerald-200",
    pillHoverGlow: "hover:shadow-[0_0_18px_-3px_rgba(95,202,148,0.35)]",
    cardHoverGlow: "hover:shadow-[0_8px_32px_-6px_rgba(95,202,148,0.18)]",
    audioBorder: "border-emerald-200/22",
    gradient: "from-emerald-300/6 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-emerald-400/8 via-bg-950/95 to-bg-950",
    sectionBg:
      "bg-[radial-gradient(circle_at_12%_22%,rgba(95,202,148,0.09),transparent_45%),radial-gradient(circle_at_90%_78%,rgba(95,202,148,0.05),transparent_38%)]",
  },
  azure: {
    border: "border-azure-300/30",
    borderSubtle: "border-azure-300/14",
    text: "text-azure-300",
    textMuted: "text-azure-300/72",
    glow: "shadow-[0_0_120px_40px_rgba(121,201,255,0.07)]",
    pill: "bg-azure-300/12 border-azure-300/28",
    pillText: "text-azure-300",
    pillHoverGlow: "hover:shadow-[0_0_18px_-3px_rgba(121,201,255,0.35)]",
    cardHoverGlow: "hover:shadow-[0_8px_32px_-6px_rgba(121,201,255,0.2)]",
    audioBorder: "border-azure-300/22",
    gradient: "from-azure-300/6 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-azure-500/8 via-bg-950/95 to-bg-950",
    sectionBg:
      "bg-[radial-gradient(circle_at_18%_28%,rgba(121,201,255,0.08),transparent_45%),radial-gradient(circle_at_82%_68%,rgba(121,201,255,0.05),transparent_38%)]",
  },
  moss: {
    border: "border-emerald-200/24",
    borderSubtle: "border-emerald-200/12",
    text: "text-emerald-100",
    textMuted: "text-emerald-200/64",
    glow: "shadow-[0_0_120px_40px_rgba(85,190,136,0.06)]",
    pill: "bg-emerald-300/10 border-emerald-200/22",
    pillText: "text-emerald-200",
    pillHoverGlow: "hover:shadow-[0_0_18px_-3px_rgba(85,190,136,0.35)]",
    cardHoverGlow: "hover:shadow-[0_8px_32px_-6px_rgba(85,190,136,0.16)]",
    audioBorder: "border-emerald-200/18",
    gradient: "from-emerald-400/5 via-transparent to-transparent",
    heroBg: "bg-linear-to-br from-emerald-400/6 via-bg-950/95 to-bg-950",
    sectionBg:
      "bg-[radial-gradient(circle_at_10%_20%,rgba(85,190,136,0.08),transparent_45%),radial-gradient(circle_at_92%_80%,rgba(85,190,136,0.04),transparent_38%)]",
  },
};

function GenrePills({ genres, accent }: { genres: readonly string[]; accent: AccentColor }) {
  const a = accentMap[accent];
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre}
          className={`inline-block rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition-all duration-200 hover:scale-[1.03] ${a.pill} ${a.pillText} ${a.pillHoverGlow}`}
        >
          {genre}
        </span>
      ))}
    </div>
  );
}

function VideoCard({
  clip,
  poster,
  accent,
}: {
  clip: VideoClip;
  poster?: string;
  accent: AccentColor;
}) {
  const a = accentMap[accent];
  return (
    <article className={`game-media-item games-frame group overflow-hidden border bg-bg-900/32 transition-all duration-300 hover:-translate-y-0.5 ${a.borderSubtle} ${a.cardHoverGlow}`}>
      <div className="relative aspect-video overflow-hidden">
        <video
          className="h-full w-full object-cover"
          controls
          preload="metadata"
          playsInline
          poster={poster}
          src={clip.src}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-bg-950/78 to-transparent px-3 py-2">
          <p className="text-[0.66rem] font-medium uppercase tracking-[0.14em] text-mist-100/88">{clip.title}</p>
        </div>
      </div>
    </article>
  );
}

function FeatureImage({
  image,
  accent,
  className,
  sizes = "(min-width:1280px) 60vw, 94vw",
}: {
  image: MediaImage;
  accent: AccentColor;
  className?: string;
  sizes?: string;
}) {
  const a = accentMap[accent];
  const parts = image.alt.split("|").map((part) => part.trim());
  const title = parts[0] || "Project frame";
  const note = parts[1] || "Key capture from production media.";

  return (
    <figure className={`game-media-item games-frame group relative cursor-pointer overflow-hidden border bg-bg-900/32 transition-all duration-300 hover:-translate-y-0.5 ${a.borderSubtle} ${a.cardHoverGlow} ${className ?? ""}`}>
      <Image
        src={image.src}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-950/80 via-bg-950/16 to-transparent" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
        <p className="font-display text-[1.1rem] leading-none text-mist-50">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-mist-100/76">{note}</p>
      </figcaption>
    </figure>
  );
}

function AudioDeck({
  tracks,
  accent,
  columns = 1,
  className = "",
}: {
  tracks: AudioTrack[];
  accent: AccentColor;
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  if (tracks.length === 0) {
    return null;
  }

  const a = accentMap[accent];
  const groupCount = Math.max(1, Math.min(columns, tracks.length));
  const groupedTracks = Array.from({ length: groupCount }, (_, groupIndex) =>
    tracks.filter((_, trackIndex) => trackIndex % groupCount === groupIndex),
  );

  const AudioThumb = ({ track }: { track: AudioTrack }) => {
    if (track.icon) {
      return (
        <div className={`relative h-10 w-10 shrink-0 overflow-hidden border ${a.borderSubtle}`}>
          <Image
            src={track.icon}
            alt={`${track.title} icon`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className={`grid h-10 w-10 shrink-0 place-items-center border ${a.borderSubtle}`}>
        <svg className={`h-3.5 w-3.5 ${a.pillText}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
    );
  };

  return (
    <div className={`grid gap-3 ${columns === 3 ? "xl:grid-cols-3" : columns === 2 ? "lg:grid-cols-2" : "grid-cols-1"} ${className}`}>
      {groupedTracks.map((group, groupIndex) => (
        <div key={`${accent}-deck-${groupIndex}`} className="space-y-2.5">
          {group.map((track) => (
            <div
              key={`${track.src}-${track.title}`}
              className={`games-frame border bg-bg-900/12 px-3 py-2.5 ${a.audioBorder}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <AudioThumb track={track} />
                <p className={`truncate text-[0.66rem] font-semibold uppercase tracking-[0.16em] ${a.textMuted}`}>{track.title}</p>
              </div>
              <AudioTrackPlayer src={track.src} accent={accent} label={track.title} durationSeconds={track.durationSeconds} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const dividerGlowMap: Record<AccentColor, string> = {
  gold: "shadow-[0_0_12px_0_rgba(222,186,120,0.25)]",
  emerald: "shadow-[0_0_12px_0_rgba(95,202,148,0.25)]",
  azure: "shadow-[0_0_12px_0_rgba(121,201,255,0.22)]",
  moss: "shadow-[0_0_12px_0_rgba(85,190,136,0.22)]",
};

function SectionDivider({ accent }: { accent: AccentColor }) {
  const a = accentMap[accent];
  return (
    <div className="relative py-8 sm:py-10">
      <div className={`h-px w-full border-t ${a.border} ${dividerGlowMap[accent]}`} />
      <div className={`absolute left-1/2 top-1/2 h-8 w-32 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r ${a.gradient} blur-2xl`} />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 animate-[shimmer_3s_ease-in-out_infinite]"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent, var(--emerald-300), var(--gold-300), transparent)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

// RoEmpires theme: purple-pink twilight + gold (key art). Both colors are primary.
const roEmpiresTheme = {
  sectionBg:
    "bg-[radial-gradient(circle_at_20%_30%,rgba(222,186,120,0.14),transparent_40%),radial-gradient(circle_at_75%_65%,rgba(200,140,80,0.1),transparent_38%)]",
  sectionBgSky:
    "bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(140,80,160,0.2),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_5%,rgba(200,100,180,0.16),transparent_45%),radial-gradient(ellipse_50%_40%_at_15%_80%,rgba(160,90,170,0.12),transparent_45%)]",
  panelGlow:
    "shadow-[0_0_80px_24px_rgba(222,186,120,0.08),0_0_40px_12px_rgba(200,140,80,0.06),0_0_60px_20px_rgba(180,100,160,0.06)]",
  heroGlow:
    "shadow-[0_0_60px_20px_rgba(222,186,120,0.1),0_0_30px_8px_rgba(200,140,80,0.08),0_0_50px_16px_rgba(160,90,170,0.08)]",
  titleGradient:
    "bg-[linear-gradient(135deg,#f5e6c8_0%,#e6c878_35%,#d4a84a_60%,#c49430_100%)] bg-clip-text text-transparent",
  meetGradient:
    "bg-[linear-gradient(135deg,#fcecd2_0%,#e6c68a_20%,#c99dd4_45%,#d4a0c8_70%,#e6c68a_100%)] bg-clip-text text-transparent",
};

// RoEmpires media: images (incl. GIFs—auto-play in gallery) and videos (autoplay muted in reel). Add more from Sharable (Images, Videos) / Old into public/games/roempires/.
const roEmpiresMedia: MediaItem[] = [
  { src: "/games/roempires/thumbnail.png", alt: "RoEmpires Hero | Main thumbnail key art." },
  { src: "/games/roempires/gameplay-village.jpg", alt: "Village Build | Settlement growth and placement." },
  { src: "/games/roempires/placement.mp4", alt: "Placement | Building placement and base layout.", kind: "video" },
  { src: "/games/roempires/town-hall.mp4", alt: "Town Hall Clip | Town hall animation snippet.", kind: "video" },
  { src: "/games/roempires/ui.mp4", alt: "UI Overview | Interface and economy panel.", kind: "video" },
  { src: "/games/roempires/currency-shop-clip.mp4", alt: "Currency Shop Clip | Economy/store panel motion capture.", kind: "video" },
  { src: "/games/roempires/currency-ui.gif", alt: "Currency UI | Animated economy UI capture from old build." },
  { src: "/games/roempires/attacking.mp4", alt: "Attacking Phase | Combat and attack gameplay.", kind: "video" },
  { src: "/games/roempires/gameplay-clip-extended-2.mp4", alt: "Villager Following System | Villagers dynamically follow and react during progression.", kind: "video" },
  { src: "/games/roempires/loading-menu-end.gif", alt: "Loading Menu | Closing phase of loading animation." },
  { src: "/games/roempires/main-menu.gif", alt: "Main Menu | Animated main menu pass from old build." },
  { src: "/games/roempires/civilizations-logo-animated.mp4", alt: "Civilizations Logo Animation | Animated brand reveal.", kind: "video" },
  { src: "/games/roempires/banner-1.png", alt: "Banner | Promotional banner art." },
  { src: "/games/roempires/logo.png", alt: "RoEmpires Logo | Game logo and branding." },
  { src: "/games/roempires/icon.png", alt: "Game Icon | Official RoEmpires icon artwork." },
];

const roEmpiresTracks: AudioTrack[] = [
  { title: "Main Theme", src: "/games/roempires/theme-main.mp3", durationSeconds: 10.67, icon: "/games/roempires/icon.png" },
  { title: "Village Theme", src: "/games/roempires/theme-village.mp3", durationSeconds: 22.59, icon: "/games/roempires/icon.png" },
  { title: "Defending Theme", src: "/games/roempires/theme-defending.mp3", durationSeconds: 15.0, icon: "/games/roempires/icon.png" },
  { title: "Attacking Theme", src: "/games/roempires/theme-attacking.mp3", durationSeconds: 19.2, icon: "/games/roempires/icon.png" },
  { title: "Codes Theme", src: "/games/roempires/theme-codes.mp3", durationSeconds: 7.74, icon: "/games/roempires/icon.png" },
  { title: "Teaser Theme", src: "/games/roempires/theme-teaser.mp3", durationSeconds: 71.35, icon: "/games/roempires/banner-1.png" },
];

const encavedImages: MediaImage[] = [
  { src: "/games/encaved/hero.png", alt: "Blue Lantern Tunnel | Main Encaved hero frame with glowing path." },
  { src: "/games/encaved/cave-entrance-3.png", alt: "Cave Entrance | Hazard signs and branch guidance before the deep mine." },
  { src: "/games/encaved/cave-interior-mine-mode.png", alt: "Deep Mine Interior | Color-lit cavern zone used in progression beats." },
  { src: "/games/encaved/mining-station-1.png", alt: "Mining Station | Resource processing area with heavier machinery." },
  { src: "/games/encaved/mining-station-2.png", alt: "Mining Station 2 | Additional station pass with resource routes." },
  { src: "/games/encaved/mining-station-3.png", alt: "Mining Station 3 | Deeper station environment pass." },
  { src: "/games/encaved/ore-market.png", alt: "Ore Market | Trading zone for mined resources and upgrades." },
  { src: "/games/encaved/minecart-room-straight.png", alt: "Minecart Route | Track corridor with directional lighting." },
  { src: "/games/encaved/minecart-room-uphill.png", alt: "Minecart Uphill | Elevated track section and route view." },
  { src: "/games/encaved/lobby-entrance-1.png", alt: "Lobby Entrance 1 | Primary approach to the cave network." },
  { src: "/games/encaved/lobby-entrance-2.png", alt: "Lobby Entrance 2 | Alternate entrance angle." },
  { src: "/games/encaved/lobby-entrance-3.png", alt: "Lobby Entrance 3 | Additional entrance capture." },
  { src: "/games/encaved/lobby-entrance-4.png", alt: "Lobby Entrance | Main entry transition into the cave network." },
  { src: "/games/encaved/mining-station-house-2.png", alt: "Station Housing | Settlement extension around the station core." },
  { src: "/games/encaved/cave-wide.png", alt: "Cave Wide | Broader cave layout and lighting pass." },
  { src: "/games/encaved/cave-entrance-1.png", alt: "Cave Entrance 1 | Additional cave entrance angle." },
  { src: "/games/encaved/cave-entrance-2.png", alt: "Cave Entrance 2 | Alternate cave entrance pass." },
  { src: "/games/encaved/mining-station-house.png", alt: "Station Housing 1 | Mining station house variant." },
  { src: "/games/encaved/mining-station-ig-1.png", alt: "Mining Station IG 1 | In-game station environment pass." },
  { src: "/games/encaved/mining-station-tunnel.png", alt: "Mining Station Tunnel | Tunnel connection near station." },
  { src: "/games/encaved/mining-tunnel-entrance.png", alt: "Mining Tunnel Entrance | Entrance capture for deeper routes." },
  { src: "/games/encaved/ores.png", alt: "Ores | Resource node and crystal signage capture." },
  { src: "/games/encaved/lore-image.png", alt: "Lore Image | Story/lore UI capture." },
  { src: "/games/encaved/upgrade-frame.png", alt: "Upgrade Frame | Upgrade UI frame capture." },
  { src: "/games/encaved/face-image.png", alt: "Face Image | Red tunnel encounter frame." },
  { src: "/games/encaved/glitched-eyes.png", alt: "Glitched Eyes | Horror visual effect frame." },
  { src: "/games/encaved/grip.png", alt: "Grip | Character/pose capture." },
  { src: "/games/encaved/emily.png", alt: "Emily | Character artwork frame." },
  { src: "/games/encaved/emily-head.png", alt: "Emily Head | Character close-up frame." },
  { src: "/games/encaved/john.png", alt: "John | Character artwork frame." },
  { src: "/games/encaved/lil-vera.png", alt: "Lil Vera | Character artwork variant." },
  { src: "/games/encaved/liora-moth.png", alt: "Liora Moth | Character concept frame." },
  { src: "/games/encaved/liora-moth-2.png", alt: "Liora Moth 2 | Character concept frame." },
  { src: "/games/encaved/skeleton-vera.png", alt: "Skeleton Vera | Character horror variant." },
  { src: "/games/encaved/vera-jumpscare.png", alt: "Vera Jumpscare | Character jumpscare frame." },
  { src: "/games/encaved/vera-stare.png", alt: "Vera Stare | Character stare frame." },
  { src: "/games/encaved/vera-roblox-model.png", alt: "Vera Roblox Model | Model render frame." },
  { src: "/games/encaved/thalorn-design.png", alt: "Thalorn Design | Character design frame." },
  { src: "/games/encaved/thalorn-design-old.png", alt: "Thalorn Design Old | Earlier design frame." },
  { src: "/games/encaved/thalorn-from-behind.png", alt: "Thalorn From Behind | Character turnaround frame." },
  { src: "/games/encaved/thalorn-roblox-model.png", alt: "Thalorn Roblox Model | Model render frame." },
  { src: "/games/encaved/thalorn-roblox-model-2.png", alt: "Thalorn Roblox Model 2 | Additional model render frame." },
  { src: "/games/encaved/thalorn-roblox-model-b1.png", alt: "Thalorn Roblox Model B1 | Model variant frame." },
  { src: "/games/encaved/thalorn-roblox-model-b2.png", alt: "Thalorn Roblox Model B2 | Model variant frame." },
  { src: "/games/encaved/swinging-lights-intr.mp4", alt: "Swinging Lights Intro | Supplemental intro clip.", kind: "video" },
  { src: "/games/encaved/website-vid-1.mp4", alt: "Website Video 1 | Supplemental dev clip.", kind: "video" },
  { src: "/games/encaved/website-vid-2.mp4", alt: "Website Video 2 | Supplemental dev clip.", kind: "video" },
];

const encavedTracks: AudioTrack[] = [
  { title: "Desire (Lobby Theme)", src: "/games/encaved/desire-encaved.mp3", durationSeconds: 149.33, icon: "/games/encaved/logo.png" },
  { title: "Extracted (Mining Phase)", src: "/games/encaved/extracted-mining-phase.mp3", durationSeconds: 181.72, icon: "/games/encaved/track-extracted.png" },
  { title: "Piano Demo", src: "/games/encaved/theme-piano-demo.mp3", durationSeconds: 31.65, icon: "/games/encaved/mining-station-house-2.png" },
  { title: "Loading Demo", src: "/games/encaved/lobby-demo-loading.mp3", durationSeconds: 50.53, icon: "/games/encaved/lobby-entrance-4.png" },
  { title: "Ambience Demo", src: "/games/encaved/minecart-ambience-test.mp3", durationSeconds: 26.71, icon: "/games/encaved/lobby-entrance-4.png" },
  { title: "Ambience Test", src: "/games/encaved/minecart-sound-test.mp3", durationSeconds: 28.84, icon: "/games/encaved/lobby-entrance-4.png" },
];

const bossBattlesImages: MediaImage[] = [
  { src: "/games/boss-battles/thumbnail.png", alt: "Boss Battles Main Art | Dungeon combat hero image from live build." },
  { src: "/games/boss-battles/noob-throw-og.png", alt: "Teleport Thumbnail | Event key art with encounter spotlighting." },
  { src: "/games/boss-battles/noob-throw.png", alt: "Noob Throw Variant | Alternate key art variant." },
  { src: "/games/boss-battles/fnaf-dungeon.png", alt: "FNAF Fights Dungeon | Event dungeon with unique color and effects." },
  { src: "/games/boss-battles/fnaf-dungeon-1.png", alt: "FNAF Dungeon 1 | Early dungeon layout pass." },
  { src: "/games/boss-battles/fnaf-dungeon-2.png", alt: "FNAF Dungeon 2 | Additional dungeon angle." },
  { src: "/games/boss-battles/fnaf-frights.png", alt: "FNAF Frights | Event promo frame." },
  { src: "/games/boss-battles/dungeon-portal-screenshot.png", alt: "Dungeon Portals | Multi-world gateway layout from gameplay." },
  { src: "/games/boss-battles/chests-inventory.png", alt: "Inventory + Chests | Loot and progression panel capture." },
  { src: "/games/boss-battles/missions-screenshot.png", alt: "Mission Board | Active objectives and route planning panel." },
  { src: "/games/boss-battles/lobby-shot.png", alt: "Lobby Shot | Session staging area before dungeon runs." },
  { src: "/games/boss-battles/anyaa.png", alt: "Anyaa Artwork | Character concept art." },
  { src: "/games/boss-battles/brunoo.png", alt: "Brunoo Artwork | Character concept art." },
  { src: "/games/boss-battles/mirabel-real.png", alt: "Mirabel Real | Character render variant." },
  { src: "/games/boss-battles/triple-offers.png", alt: "Triple Offers | In-game offers panel capture." },
  { src: "/games/boss-battles/defeat-entombed.png", alt: "Defeat Entombed | Dungeon completion stamp." },
  { src: "/games/boss-battles/defeat-nature.png", alt: "Defeat Nature | Dungeon completion stamp." },
  { src: "/games/boss-battles/defeat-winter.png", alt: "Defeat Winter | Dungeon completion stamp." },
  { src: "/games/boss-battles/boss-battle-vid.mp4", alt: "Boss Battle Vid | Gameplay clip from media folder.", kind: "video" },
  { src: "/games/boss-battles/summoning.mp4", alt: "Summoning | Gameplay clip from media folder.", kind: "video" },
  { src: "/games/boss-battles/fnaf-hi.png", alt: "FNAF Event Art | Character-focused event visual treatment." },
];

const bossBattlesTracks: AudioTrack[] = [
  { title: "Boss Battles", src: "/games/boss-battles/boss-battles.mp3", durationSeconds: 128.03, icon: "/games/boss-battles/noob-throw-og.png" },
  { title: "Sunflowers and Spiderwebs", src: "/games/boss-battles/sunflowers-and-spiderwebs.mp3", durationSeconds: 326.43, icon: "/games/boss-battles/fnaf-dungeon.png" },
  { title: "Warning--Strings Attached", src: "/games/boss-battles/warning-strings-attached.mp3", durationSeconds: 108.83, icon: "/games/boss-battles/dungeon-portal-screenshot.png" },
  { title: "Interwebbed", src: "/games/boss-battles/interwebbed.mp3", durationSeconds: 108.83, icon: "/games/boss-battles/mirabel-hi.png" },
  { title: "Entombed", src: "/games/boss-battles/entombed.mp3", durationSeconds: 108.83, icon: "/games/boss-battles/fire-icon-mirabel.png" },
  { title: "Incoming!", src: "/games/boss-battles/incoming.mp3", durationSeconds: 108.83, icon: "/games/boss-battles/portal-teleport.png" },
];

const evilPetsTracks: AudioTrack[] = [
  { title: "Intro Track", src: "/games/evil-pets/intro-perfect.mp3", durationSeconds: 130.93, icon: "/games/evil-pets/logo.png" },
];

const escapeBrunoHeaderImage: MediaImage = {
  src: "https://static.wixstatic.com/media/e4622a_6ab8435975154904a224919311260975~mv2.png/v1/fill/w_840,h_323,al_c,lg_1,q_85,enc_avif,quality_auto/e4622a_6ab8435975154904a224919311260975~mv2.png",
  alt: "Escape Bruno Running Head | Game header.",
};

const creatorCoverage: CreatorSpot[] = [
  { name: "FGTeeV", note: "3.2M+ views", href: "https://www.youtube.com/watch?v=gJBWB2fpCQ8", videoId: "gJBWB2fpCQ8" },
  { name: "LankyBox", note: "2.1M+ views", href: "https://www.youtube.com/watch?v=AocMjuPPjFE", videoId: "AocMjuPPjFE" },
  { name: "DenisDaily", note: "9M+ views", href: "https://www.youtube.com/watch?v=XxteSlNAd2s", videoId: "XxteSlNAd2s" },
  { name: "Cherry Pop Productions", note: "900K+ views", href: "https://www.youtube.com/watch?v=W7gjiPei6s0", videoId: "W7gjiPei6s0" },
  { name: "GravyCatMan", note: "4M+ views", href: "https://www.youtube.com/watch?v=M2YAK8UDoaA", videoId: "M2YAK8UDoaA" },
  { name: "Brancoala Games", note: "1.3M+ views", href: "https://www.youtube.com/watch?v=c8DUMxLkMFk", videoId: "c8DUMxLkMFk" },
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
  { src: "/games/evil-pets/fence-teaser.mp4", alt: "Fence Teaser | Short social teaser clip.", kind: "video" },
  { src: "/games/evil-pets/quick-draw.mp4", alt: "Quick Draw | Social gameplay clip.", kind: "video" },
  { src: "/games/evil-pets/clip-inshot.mp4", alt: "InShot Clip | Social edit gameplay clip.", kind: "video" },
  { src: "/games/evil-pets/clip-snaptik-1.mp4", alt: "SnapTik Clip 1 | Vertical social gameplay clip.", kind: "video" },
  { src: "/games/evil-pets/clip-snaptik-2.mp4", alt: "SnapTik Clip 2 | Vertical social gameplay clip.", kind: "video" },
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
  description: "ForestlyGames game sections with real project media and creator features.",
};

export default function GamesPage() {
  const mainGames = [
    {
      href: "#roempires",
      title: "RoEmpires",
      stage: "[ALPHA]",
      image: roEmpiresMedia[0],
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
      title: "Escape Bruno Running Head",
      stage: "Released",
      image: escapeBrunoHeaderImage,
      note: "Creator-focused horror run with high-view YouTube features.",
      accent: "gold" as const,
    },
  ];

  return (
    <GamesPageScene>
      {/* -- Page Header -- */}
      <Section className="pb-6 pt-10 sm:pb-8 sm:pt-14">
        <Container className="max-w-[96rem]">
          <GamesHeroScene>
            <div className="pb-8">
              <p
                data-games-hero-kicker
                className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/85"
              >
                ForestlyGames
              </p>
              <h1
                data-games-hero-title
                className="mt-4 font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.86] tracking-tight"
              >
                <span className="bg-[linear-gradient(135deg,var(--mist-50)_0%,var(--emerald-200)_35%,var(--gold-300)_65%,var(--azure-300)_100%)] bg-clip-text text-transparent">
                  Games
                </span>
              </h1>
              <p
                data-games-hero-copy
                className="mt-5 max-w-2xl text-base leading-relaxed text-mist-200/80 sm:text-lg"
              >
                Every game we&apos;ve built, from early prototypes to live titles. Real screenshots, real gameplay, real audio.
              </p>
              <nav data-games-hero-nav className="mt-8 flex flex-wrap gap-2">
                {[
                  { href: "#roempires", label: "RoEmpires", accent: "gold" as const },
                  { href: "#encaved", label: "Encaved", accent: "emerald" as const },
                  { href: "#boss-battles", label: "Boss Battles", accent: "azure" as const },
                  { href: "#escape-bruno", label: "Escape Bruno Running Head", accent: "gold" as const },
                  { href: "#evil-pets", label: "Evil Pets", accent: "emerald" as const },
                  { href: "#panda-tycoon", label: "Panda Tycoon", accent: "gold" as const },
                  { href: "#raise-a-brainrot", label: "Raise a Brainrot", accent: "azure" as const },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`rounded-full border px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.15em] transition-all duration-200 hover:scale-[1.04] ${accentMap[item.accent].pill} ${accentMap[item.accent].pillText} ${accentMap[item.accent].pillHoverGlow}`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div data-games-hero-cards className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {mainGames.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group relative border-l-2 px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg-900/24 ${accentMap[item.accent].borderSubtle} ${accentMap[item.accent].cardHoverGlow}`}
                  >
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentMap[item.accent].gradient}`}
                    />
                    <div className="relative">
                      <p className={`text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${accentMap[item.accent].textMuted}`}>
                        {item.stage}
                      </p>
                      <p className="mt-1 font-display text-[1.32rem] leading-none text-mist-50">{item.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-mist-200/70">{item.note}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </GamesHeroScene>
        </Container>
      </Section>

      <GamesScrollScene>
      {/* -- RoEmpires -- */}
      <Section id="roempires" className="relative overflow-hidden py-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 ${roEmpiresTheme.sectionBg}`} />
          <div className={`absolute inset-0 ${roEmpiresTheme.sectionBgSky}`} />
        </div>
        <Container className="relative z-10 max-w-[96rem]">
          <div className="mx-auto max-w-[76rem] space-y-8 lg:space-y-10">
            <div className={`games-cut-panel border border-gold-300/24 bg-bg-900/18 px-4 py-4 sm:px-5 sm:py-5 ${roEmpiresTheme.panelGlow}`}>
              <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
                <ImageLightbox image={roEmpiresMedia[0]}>
                <figure data-games-scroll-hero className={`games-frame relative aspect-[16/8] overflow-hidden border border-gold-300/30 cursor-pointer ${roEmpiresTheme.heroGlow}`}>
                  {roEmpiresMedia[0].kind === "video" ? (
                    <video
                      src={roEmpiresMedia[0].src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={roEmpiresMedia[0].src}
                      alt={roEmpiresMedia[0].alt}
                      fill
                      sizes="(min-width:1280px) 58vw, 94vw"
                      className="object-cover"
                    />
                  )}
                </figure>
              </ImageLightbox>
                <div className="space-y-3 lg:pt-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-100/72">[ALPHA] Live Build</p>
                  <h2 data-games-scroll-heading className={`font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[0.9] tracking-tight ${roEmpiresTheme.titleGradient}`}>
                    RoEmpires
                  </h2>
                  <GenrePills genres={gameMeta.roEmpires.genres} accent="gold" />
                  <p className="max-w-md text-sm leading-relaxed text-mist-200/82 sm:text-base">
                    {gameMeta.roEmpires.description}
                  </p>
                </div>
              </div>
            </div>

            <section className={`games-cut-panel border border-gold-300/20 bg-bg-900/14 p-3 sm:p-4 ${roEmpiresTheme.panelGlow}`}>
              <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-gold-100/76">
                Official Trailer
              </p>
              <article className={`games-frame overflow-hidden border border-gold-300/26 bg-bg-900/16 ${roEmpiresTheme.panelGlow}`}>
                <div className="relative aspect-video">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    src="/games/roempires/trailer.mp4"
                  />
                </div>
              </article>
            </section>

            <section className={`games-cut-panel border border-gold-300/20 bg-bg-900/14 p-3 ${roEmpiresTheme.panelGlow}`}>
              <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-gold-100/76">
                Scrolling Media Reel
              </p>
              <ScrollingMediaReel images={roEmpiresMedia.slice(1)} accent="gold" />
            </section>

            <div className="space-y-5">
              <h3 className="text-center font-display text-[clamp(2rem,5vw,3.6rem)] leading-[0.9] tracking-tight text-mist-50">
                MEET <span className={roEmpiresTheme.meetGradient}>ROEMPIRES</span>
              </h3>

              <div className="grid gap-5 xl:grid-cols-[0.34fr_0.8fr_0.34fr] xl:items-start">
                <div className="space-y-2.5">
                  {roEmpiresTracks.slice(0, 3).map((track) => (
                    <div key={track.src} className="games-frame border border-gold-300/18 bg-bg-900/12 px-3 py-2.5">
                      <div className="mb-2 flex items-center gap-2">
                        {track.icon ? (
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden border border-gold-300/20">
                            <Image src={track.icon} alt={`${track.title} icon`} fill sizes="36px" className="object-cover" />
                          </div>
                        ) : null}
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-gold-100/80">{track.title}</p>
                      </div>
                      <AudioTrackPlayer src={track.src} accent="gold" label={track.title} durationSeconds={track.durationSeconds} />
                    </div>
                  ))}
                </div>

                <article className="games-frame overflow-hidden border border-gold-300/20 bg-bg-900/16">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/ICKrc9I2npI"
                      title="RoEmpires development test video"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </article>

                <div className="space-y-2.5">
                  {roEmpiresTracks.slice(3).map((track) => (
                    <div key={track.src} className="games-frame border border-gold-300/18 bg-bg-900/12 px-3 py-2.5">
                      <div className="mb-2 flex items-center gap-2">
                        {track.icon ? (
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden border border-gold-300/20">
                            <Image src={track.icon} alt={`${track.title} icon`} fill sizes="36px" className="object-cover" />
                          </div>
                        ) : null}
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-gold-100/80">{track.title}</p>
                      </div>
                      <AudioTrackPlayer src={track.src} accent="gold" label={track.title} durationSeconds={track.durationSeconds} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <VideoCard
                  clip={{ title: "Gameplay Clip", src: "/games/roempires/gameplay.mp4" }}
                  accent="gold"
                />
                <VideoCard
                  clip={{ title: "Warrior Sneak", src: "/games/roempires/warrior-sneak.mp4" }}
                  poster="/games/roempires/warrior-sneak-poster.jpg"
                  accent="gold"
                />
              </div>
            </div>

          </div>
        </Container>
        <SectionDivider accent="emerald" />
      </Section>

      {/* -- Encaved -- */}
      <Section id="encaved" className="relative overflow-hidden py-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 ${accentMap.emerald.sectionBg}`} />
        </div>
        <Container className="relative z-10 max-w-[96rem]">
          <div className="mx-auto max-w-[76rem] space-y-8 lg:space-y-9">
            <div className={`games-cut-panel border border-emerald-200/20 bg-bg-900/16 px-4 py-4 sm:px-5 sm:py-5 ${accentMap.emerald.glow}`}>
              <div className="grid gap-5 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
                <div className="space-y-3 lg:pt-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/72">Prototype Build</p>
                  <h2 data-games-scroll-heading className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.9] tracking-tight text-mist-50">Encaved</h2>
                  <GenrePills genres={gameMeta.encaved.genres} accent="emerald" />
                  <p className="max-w-md text-sm leading-relaxed text-mist-200/82 sm:text-base">
                    {gameMeta.encaved.description}
                  </p>
                </div>
                <article data-games-scroll-hero className="games-frame min-w-0 overflow-hidden border border-emerald-200/22 bg-bg-900/18">
                  <div className="relative aspect-video">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                      poster="/games/encaved/encaved-header-poster.jpg"
                      src="/games/encaved/the-mines-behind-in-front-updated.mp4"
                    />
                  </div>
                </article>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.34fr_0.8fr_0.34fr] xl:items-stretch">
              <AudioDeck tracks={encavedTracks.slice(0, 3)} accent="emerald" columns={1} />

              <div className="h-full min-h-0">
                <ImageLightbox image={encavedImages[6]} triggerClassName="h-full block">
                  <FeatureImage image={encavedImages[6]} accent="emerald" className="h-full w-full" sizes="(min-width:1280px) 40vw, 94vw" />
                </ImageLightbox>
              </div>

              <AudioDeck tracks={encavedTracks.slice(3)} accent="emerald" columns={1} />
            </div>

            <section className="games-cut-panel border border-emerald-200/16 bg-bg-900/14 p-3">
              <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-emerald-200/76">
                Scrolling Media Reel
              </p>
              <ScrollingMediaReel images={encavedImages.slice(1)} accent="emerald" rows={2} />
            </section>
          </div>
        </Container>
        <SectionDivider accent="azure" />
      </Section>

      {/* -- Boss Battles -- */}
      <Section id="boss-battles" className="relative overflow-hidden py-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 ${accentMap.azure.sectionBg}`} />
        </div>
        <Container className="relative z-10 max-w-[96rem]">
          <div className="mx-auto max-w-[76rem] space-y-8 lg:space-y-9">
            <div className={`games-cut-panel border border-azure-300/20 bg-bg-900/16 px-4 py-4 sm:px-5 sm:py-5 ${accentMap.azure.glow}`}>
              <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
                <div className="space-y-3 lg:pt-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-azure-300/72">Released Experience</p>
                  <h2 data-games-scroll-heading className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.9] tracking-tight text-mist-50">Boss Battles</h2>
                  <GenrePills genres={gameMeta.bossBattles.genres} accent="azure" />
                  <p className="max-w-md text-sm leading-relaxed text-mist-200/82 sm:text-base">
                    {gameMeta.bossBattles.description}
                  </p>
                </div>
                <ImageLightbox image={bossBattlesImages[0]}>
                <figure data-games-scroll-hero className={`games-frame relative aspect-[16/9] overflow-hidden border border-azure-300/24 lg:mx-auto lg:w-[20rem] cursor-pointer ${accentMap.azure.glow}`}>
                  <Image
                    src={bossBattlesImages[0].src}
                    alt={bossBattlesImages[0].alt}
                    fill
                    sizes="(min-width:1024px) 20rem, 94vw"
                    className="object-cover"
                  />
                </figure>
              </ImageLightbox>
              </div>
            </div>

            <section className="games-cut-panel border border-azure-300/16 bg-bg-900/14 p-3">
              <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-azure-300/76">
                Scrolling Media Reel
              </p>
              <ScrollingMediaReel images={bossBattlesImages.slice(1)} accent="azure" />
            </section>

            <AudioDeck tracks={bossBattlesTracks} accent="azure" columns={2} />
          </div>
        </Container>
        <SectionDivider accent="gold" />
      </Section>

      {/* -- Escape Bruno -- */}
      <Section id="escape-bruno" className="relative overflow-hidden py-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 ${accentMap.gold.sectionBg}`} />
        </div>
        <Container className="relative z-10 max-w-[96rem]">
          <div className="mx-auto max-w-[76rem] space-y-8 lg:space-y-9">
            <div className={`games-cut-panel border border-gold-300/20 bg-bg-900/16 px-4 py-4 sm:px-5 sm:py-5 ${accentMap.gold.glow}`}>
              <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
                <div className="space-y-3 lg:pt-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-100/72">Released</p>
                  <h2 data-games-scroll-heading className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.9] tracking-tight text-mist-50">Escape Bruno Running Head</h2>
                  <GenrePills genres={gameMeta.escapeBruno.genres} accent="gold" />
                  <p className="max-w-md text-sm leading-relaxed text-mist-200/82 sm:text-base">
                    {gameMeta.escapeBruno.description}
                  </p>
                </div>
                <figure data-games-scroll-hero className={`games-frame overflow-hidden border border-gold-300/24 lg:mx-auto lg:max-w-xl ${accentMap.gold.glow}`}>
                  <Image
                    src={escapeBrunoHeaderImage.src}
                    alt={escapeBrunoHeaderImage.alt}
                    width={1680}
                    height={646}
                    sizes="(min-width:1024px) 36rem, 94vw"
                    className="h-auto w-full object-contain"
                  />
                </figure>
              </div>
            </div>

            <div className="games-cut-panel border border-gold-300/16 bg-bg-900/14 p-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-100/70">
                Views
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {creatorCoverage.map((creator) => (
                  <article
                    key={creator.videoId}
                    className="games-frame overflow-hidden border border-gold-300/18 bg-bg-900/24"
                  >
                    <div className="relative aspect-video">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${creator.videoId}`}
                        title={`${creator.name} — Escape Bruno Running Head`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-3.5">
                      <a
                        href={creator.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-display text-xl leading-none text-mist-50 hover:text-gold-200"
                      >
                        {creator.name}
                      </a>
                      <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-300/80">
                        {creator.note}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
        <SectionDivider accent="emerald" />
      </Section>

      <Section className="pb-0 pt-6 sm:pt-8">
        <Container className="max-w-[96rem]">
          <div className="games-cut-panel border border-mist-100/12 bg-bg-900/18 px-5 py-4 sm:px-6">
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
      <Section id="evil-pets" className="relative overflow-hidden py-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 ${accentMap.moss.sectionBg}`} />
        </div>
        <SectionDivider accent="gold" />
        <Container className="relative z-10 max-w-[96rem]">
          <div className="mx-auto max-w-[76rem] space-y-8 lg:space-y-9">
            <div className={`games-cut-panel border border-emerald-200/20 bg-bg-900/16 px-4 py-4 sm:px-5 sm:py-5 ${accentMap.moss.glow}`}>
              <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
                <div className="space-y-3 lg:pt-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/72">Active Development</p>
                  <h2 data-games-scroll-heading className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.9] tracking-tight text-mist-50">Evil Pets</h2>
                  <GenrePills genres={gameMeta.evilPets.genres} accent="moss" />
                  <p className="max-w-md text-sm leading-relaxed text-mist-200/82 sm:text-base">
                    {gameMeta.evilPets.description}
                  </p>
                </div>
                <ImageLightbox image={evilPetsImages[0]}>
                <figure data-games-scroll-hero className={`games-frame relative aspect-[16/9] overflow-hidden border border-emerald-200/24 lg:mx-auto lg:w-[20rem] cursor-pointer ${accentMap.moss.glow}`}>
                  <Image
                    src={evilPetsImages[0].src}
                    alt={evilPetsImages[0].alt}
                    fill
                    sizes="(min-width:1024px) 20rem, 94vw"
                    className="object-cover"
                  />
                </figure>
              </ImageLightbox>
              </div>
            </div>

            <AudioDeck tracks={evilPetsTracks} accent="moss" columns={1} />

            <section className="games-cut-panel border border-emerald-200/16 bg-bg-900/14 p-3">
              <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-emerald-200/76">
                Scrolling Media Reel
              </p>
              <ScrollingMediaReel images={evilPetsImages.slice(1)} accent="moss" />
            </section>
          </div>
        </Container>
        <SectionDivider accent="gold" />
      </Section>

      {/* -- Panda Tycoon -- */}
      <Section id="panda-tycoon" className="relative overflow-hidden py-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 ${accentMap.gold.sectionBg}`} />
        </div>
        <Container className="relative z-10 max-w-[96rem]">
          <div className="mx-auto max-w-[76rem] space-y-8 lg:space-y-9">
            <div className={`games-cut-panel border border-gold-300/20 bg-bg-900/16 px-4 py-4 sm:px-5 sm:py-5 ${accentMap.gold.glow}`}>
              <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
                <div className="space-y-3 lg:pt-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-100/72">[VOICE CHAT] Released</p>
                  <h2 data-games-scroll-heading className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.9] tracking-tight text-mist-50">Panda Tycoon</h2>
                  <GenrePills genres={gameMeta.pandaTycoon.genres} accent="gold" />
                  <p className="max-w-md text-sm leading-relaxed text-mist-200/82 sm:text-base">
                    {gameMeta.pandaTycoon.description}
                  </p>
                </div>
                <ImageLightbox image={turningRedImages[0]}>
                <figure data-games-scroll-hero className={`games-frame relative aspect-[16/9] overflow-hidden border border-gold-300/24 lg:mx-auto lg:w-[20rem] cursor-pointer ${accentMap.gold.glow}`}>
                  <Image
                    src={turningRedImages[0].src}
                    alt={turningRedImages[0].alt}
                    fill
                    sizes="(min-width:1024px) 20rem, 94vw"
                    className="object-cover"
                  />
                </figure>
              </ImageLightbox>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ImageLightbox image={turningRedImages[1]}>
                <FeatureImage image={turningRedImages[1]} accent="gold" className="aspect-video" sizes="(min-width:640px) 42vw, 94vw" />
              </ImageLightbox>
              <ImageLightbox image={turningRedImages[2]}>
                <FeatureImage image={turningRedImages[2]} accent="gold" className="aspect-video" sizes="(min-width:640px) 42vw, 94vw" />
              </ImageLightbox>
            </div>

            <section className="games-cut-panel border border-gold-300/16 bg-bg-900/14 p-3">
              <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-gold-100/76">
                Scrolling Media Reel
              </p>
              <ScrollingMediaReel images={turningRedImages.slice(3)} accent="gold" />
            </section>
          </div>
        </Container>
        <SectionDivider accent="azure" />
      </Section>

      {/* -- Raise a Brainrot -- */}
      <Section id="raise-a-brainrot" className="relative overflow-hidden py-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 ${accentMap.azure.sectionBg}`} />
        </div>
        <Container className="relative z-10 max-w-[96rem]">
          <div className="mx-auto max-w-[76rem] space-y-8 lg:space-y-9">
            <div className={`games-cut-panel border border-azure-300/20 bg-bg-900/16 px-4 py-4 sm:px-5 sm:py-5 ${accentMap.azure.glow}`}>
              <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
                <div className="space-y-3 lg:pt-1">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-azure-300/72">Released Experience</p>
                  <h2 data-games-scroll-heading className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.9] tracking-tight text-mist-50">Raise a Brainrot</h2>
                  <GenrePills genres={gameMeta.raiseABrainrot.genres} accent="azure" />
                  <p className="max-w-md text-sm leading-relaxed text-mist-200/82 sm:text-base">
                    {gameMeta.raiseABrainrot.description}
                  </p>
                </div>
                <ImageLightbox image={brainrotImages[0]}>
                <figure data-games-scroll-hero className={`games-frame relative aspect-[16/9] overflow-hidden border border-azure-300/24 lg:mx-auto lg:w-[20rem] cursor-pointer ${accentMap.azure.glow}`}>
                  <Image
                    src={brainrotImages[0].src}
                    alt={brainrotImages[0].alt}
                    fill
                    sizes="(min-width:1024px) 20rem, 94vw"
                    className="object-cover"
                  />
                </figure>
              </ImageLightbox>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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

            <section className="games-cut-panel border border-azure-300/16 bg-bg-900/14 p-3">
              <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-azure-300/76">
                Scrolling Media Reel
              </p>
              <ScrollingMediaReel images={brainrotImages.slice(1)} accent="azure" />
            </section>
          </div>
        </Container>
        <SectionDivider accent="emerald" />
      </Section>

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
                <ImageLightbox key={item.title} image={item.image}>
                  <article
                    className="game-media-item games-frame group overflow-hidden border border-emerald-200/16 bg-bg-900/22 cursor-pointer"
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
                </ImageLightbox>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      </GamesScrollScene>
    </GamesPageScene>
  );
}
