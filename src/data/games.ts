import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    slug: "encaved",
    title: "Encaved",
    subtitle: "Horror Survival Adventure",
    description:
      "Blends horror survival with simulator elements as players journey through an ancient mine filled with monsters, secrets, and unpredictable events. Ride minecarts through dangerous tunnels, explore the caves on foot, mine resources, upgrade your tools, and fight with friends to survive the spirits that haunt the deep.",
    shortDescription:
      "Journey through an ancient mine filled with monsters, secrets, and unpredictable events. Ride minecarts, mine resources, upgrade your tools, and fight with friends to survive the spirits that haunt the deep.",
    stage: "In Dev",
    genre: "Horror, Adventure, Story, Survival",
    platformFocus: "Roblox",
    accent: "moss",
    featured: true,
    media: {
      src: "/games/encaved/main-hero.png",
      alt: "Encaved mine tunnel with blue lanterns and glowing trail.",
      objectPosition: "center 50%",
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
      "A real time strategy kingdom builder where players construct villages, train troops, and attack enemy bases across a variety of single player and multiplayer modes. Players upgrade buildings, defend their base, and expand their empire through progression and strategic planning.",
    shortDescription:
      "Construct villages, train troops, and attack enemy bases across single player and multiplayer modes. Upgrade buildings, defend your base, and expand your empire.",
    stage: "Alpha",
    genre: "Strategy, Building, Action",
    platformFocus: "Roblox",
    accent: "emerald",
    featured: true,
    media: {
      src: "/games/roempires/thumbnail.png",
      alt: "RoEmpires battle key art with armored troops.",
      objectPosition: "center center",
    },
    mark: {
      src: "/games/roempires/logo.png",
      alt: "RoEmpires game logo.",
    },
  },
  {
    slug: "boss-battles",
    title: "Boss Battles",
    subtitle: "Dungeon Combat Co-op",
    description:
      "A classic dungeon fighting game where players upgrade their swords, optimize their builds through unique classes, and team up with friends to defeat powerful bosses and earn rewards.",
    stage: "Released",
    genre: "Simulator, Action, Fighting",
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
      "An obby game where players must outrun Bruno while navigating various obstacle filled maps.",
    stage: "Released",
    genre: "Obby, Horror, Fighting",
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
  {
    slug: "evil-pets",
    title: "Evil Pets",
    subtitle: "Pet-Powered Tycoon",
    description: "Employ pet allies to build your tycoon faster and defend against enemy waves across themed stages.",
    stage: "Live",
    genre: "Tycoon / Action",
    platformFocus: "Roblox",
    accent: "moss",
    featured: false,
    media: {
      src: "/games/evil-pets/thumbnail.png",
      alt: "Evil Pets gameplay thumbnail from ForestlyGames.",
      objectPosition: "center center",
    },
  },
  {
    slug: "turning-red-tycoon",
    title: "Turning Red Tycoon",
    subtitle: "Themed Tycoon Event",
    description:
      "A themed tycoon world with progression loops, upgrade chains, and high-volume media captures across multiple builds.",
    stage: "Live",
    genre: "Tycoon",
    platformFocus: "Roblox",
    accent: "gold",
    featured: false,
    media: {
      src: "/games/turning-red-tycoon/shot-1.png",
      alt: "Turning Red Tycoon gameplay screenshot from ForestlyGames.",
      objectPosition: "center center",
    },
  },
  {
    slug: "raise-a-brainrot",
    title: "Raise a Brainrot",
    subtitle: "Meme-Horror Challenge",
    description:
      "A fast-paced challenge game focused on repeat sessions, creator-friendly moments, and short-form clip highlights.",
    stage: "Live",
    genre: "Horror / Challenge",
    platformFocus: "Roblox",
    accent: "azure",
    featured: false,
    media: {
      src: "/games/raise-a-brainrot/thumbnail.png",
      alt: "Raise a Brainrot game thumbnail.",
      objectPosition: "center center",
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
