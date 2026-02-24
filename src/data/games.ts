import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    slug: "encaved",
    title: "Encaved",
    subtitle: "Horror Survival Adventure",
    description:
      "A horror survival experience built around minecart routes, cave exploration, mining progression, upgrades, and co-op encounters against spirits.",
    stage: "In Development",
    genre: "Horror Survival",
    platformFocus: "Roblox",
    accent: "moss",
    featured: true,
    media: {
      src: "/games/encaved/cave-interior.png",
      alt: "Encaved cave interior concept art.",
      objectPosition: "center 48%",
    },
    mark: {
      src: "/games/encaved/logo.png",
      alt: "Encaved game logo.",
    },
  },
  {
    slug: "roempires",
    title: "RoEmpires",
    subtitle: "Real-Time Strategy Builder",
    description:
      "A strategy kingdom experience where players build villages, train troops, defend territory, and launch attacks across singleplayer and multiplayer play.",
    stage: "Alpha",
    genre: "RTS / Strategy",
    platformFocus: "Roblox",
    accent: "emerald",
    featured: true,
    media: {
      src: "/games/roempires/screenshot-79.png",
      alt: "RoEmpires character key art.",
      objectPosition: "center center",
    },
    mark: {
      src: "/games/roempires/king.png",
      alt: "RoEmpires crown artwork.",
    },
  },
  {
    slug: "boss-battles",
    title: "Boss Battles",
    subtitle: "Dungeon Combat Co-op",
    description:
      "A classic dungeon fighting game focused on sword upgrades, class builds, co-op boss fights, and reward progression.",
    stage: "Released",
    genre: "Action RPG",
    platformFocus: "Roblox",
    accent: "gold",
    featured: true,
    media: {
      src: "/games/boss-battles/thumbnail.png",
      alt: "Boss Battles arena combat key art.",
      objectPosition: "center 44%",
    },
  },
  {
    slug: "escape-bruno",
    title: "Escape Bruno",
    subtitle: "Obstacle Horror Run",
    description:
      "An obstacle survival experience where players outrun Bruno through trap-heavy maps, with strong creator coverage and repeat play sessions.",
    stage: "Live",
    genre: "Obby / Horror",
    platformFocus: "Roblox",
    accent: "azure",
    featured: true,
    media: {
      src: "/games/escape-bruno/mirabel-glow.png",
      alt: "Escape Bruno stylized character close-up.",
      objectPosition: "center center",
    },
    mark: {
      src: "/games/escape-bruno/bruno.png",
      alt: "Escape Bruno character art.",
    },
  },
];

export const featuredGames: Game[] = games.filter((game) => game.featured);

export const archiveHighlights = [
  {
    title: "FNAF Fighting",
    note: "Archive media",
    image: {
      src: "/games/archive/fnaf-fighting-thumbnail.png",
      alt: "FNAF Fighting gameplay image from ForestlyGames archives.",
      objectPosition: "center center",
    },
  },
  {
    title: "Evil Pets",
    note: "Archive media",
    image: {
      src: "/games/archive/evil-pets-icon.png",
      alt: "Evil Pets icon from ForestlyGames archives.",
      objectPosition: "center center",
    },
  },
  {
    title: "V2 Multiverse",
    note: "Archive media",
    image: {
      src: "/games/archive/v2-multiverse-icon.jpg",
      alt: "Undertale Multiverse V2 icon from ForestlyGames archives.",
      objectPosition: "center center",
    },
  },
  {
    title: "Magic Fighters",
    note: "Archive media",
    image: {
      src: "/games/archive/magic-fighters-icon.png",
      alt: "Magic Fighters icon from ForestlyGames archives.",
      objectPosition: "center center",
    },
  },
] as const;
