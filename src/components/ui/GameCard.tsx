import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import type { Game } from "@/types/game";
import Image from "next/image";

type GameCardProps = {
  game: Game;
};

const accentMap: Record<Game["accent"], string> = {
  moss: "from-emerald-500/35 via-emerald-300/10 to-transparent",
  emerald: "from-green-300/25 via-emerald-400/20 to-transparent",
  gold: "from-amber-300/35 via-gold-400/20 to-transparent",
  azure: "from-azure-500/34 via-cyan-300/16 to-transparent",
};

const mediaTintMap: Record<Game["accent"], string> = {
  moss: "from-emerald-400/22 via-transparent to-bg-950/72",
  emerald: "from-green-300/24 via-transparent to-bg-950/72",
  gold: "from-gold-300/26 via-transparent to-bg-950/70",
  azure: "from-azure-300/24 via-transparent to-bg-950/74",
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-emerald-200/20 bg-bg-900/80">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-45 transition-opacity duration-300 group-hover:opacity-70",
          accentMap[game.accent],
        )}
      />
      <div className="relative flex h-full flex-col gap-5 p-6">
        <div className="relative overflow-hidden rounded-xl border border-mist-50/12">
          <div className="relative aspect-[16/10]">
            <Image
              src={game.media.src}
              alt={game.media.alt}
              fill
              sizes="(min-width: 1280px) 28vw, (min-width: 640px) 42vw, 94vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ objectPosition: game.media.objectPosition ?? "center center" }}
            />
            <div
              aria-hidden
              className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", mediaTintMap[game.accent])}
            />
            {game.mark ? (
              <div className="pointer-events-none absolute bottom-2 right-2 overflow-hidden rounded-lg border border-mist-50/18 bg-bg-950/46 p-1.5 backdrop-blur-[1px]">
                <Image
                  src={game.mark.src}
                  alt={game.mark.alt}
                  width={42}
                  height={42}
                  className="h-10 w-10 object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl leading-tight text-mist-50">{game.title}</p>
            <p className="mt-1 text-sm text-emerald-100/70">{game.subtitle}</p>
          </div>
          <Badge className="border-gold-300/30 bg-gold-400/15 text-gold-100">{game.stage}</Badge>
        </div>

        <p className="text-sm leading-6 text-mist-200/85">{game.description}</p>

        <dl className="mt-auto grid gap-3 text-xs sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200/15 bg-bg-950/50 p-3">
            <dt className="text-mist-300/70">Genre</dt>
            <dd className="mt-1 text-mist-100">{game.genre}</dd>
          </div>
          <div className="rounded-xl border border-emerald-200/15 bg-bg-950/50 p-3">
            <dt className="text-mist-300/70">Platform Focus</dt>
            <dd className="mt-1 text-mist-100">{game.platformFocus}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
