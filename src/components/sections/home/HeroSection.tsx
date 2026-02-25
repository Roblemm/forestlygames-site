import { HeroScene } from "@/components/motion/scenes/HeroScene";
import { LinkButton } from "@/components/ui/LinkButton";
import { ReelVideo } from "@/components/ui/ReelVideo";
import { heroProofChips } from "@/data/site";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-bg-950">
      <HeroScene>
        <div className="mx-auto max-w-[82rem] px-5 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
          {/* Text content — full width */}
          <div className="max-w-4xl">
            <p
              data-hero-kicker
              className="inline-block rounded-full border border-emerald-200/25 bg-emerald-300/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-200/90"
            >
              ForestlyGames Studio
            </p>

            <h1
              data-hero-title
              className="mt-5 font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.9] tracking-[-0.02em] text-mist-50"
            >
              Roblox games built with polish, scale, and replay depth.
            </h1>

            <p
              data-hero-copy
              className="mt-5 max-w-2xl text-base leading-relaxed text-mist-100/82 sm:text-lg sm:leading-relaxed"
            >
              ForestlyGames is a remote Roblox game studio focused on building, testing, and shipping games quickly.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex flex-wrap gap-2.5">
                {heroProofChips.map((chip) => (
                  <span
                    key={chip}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]",
                      chip.includes("YouTube")
                        ? "border-azure-300/30 bg-azure-300/8 text-azure-300"
                        : "border-emerald-200/24 bg-emerald-300/6 text-emerald-100/90",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        chip.includes("YouTube") ? "bg-azure-300/80" : "bg-emerald-300/80",
                      )}
                    />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div data-hero-actions className="flex flex-wrap gap-3">
                <LinkButton href="/games">Explore Games</LinkButton>
                <LinkButton href="/contact" variant="secondary">
                  Contact the Studio
                </LinkButton>
              </div>
              <div
                data-hero-panel
                className="hidden rounded-xl border border-emerald-200/16 bg-emerald-300/4 px-5 py-3.5 lg:block"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/86">Studio Focus</p>
                <p className="mt-1.5 text-sm leading-6 text-mist-100/78">
                  We prioritize communication, initiative, and fast iteration to ship more playable games.
                </p>
              </div>
            </div>
          </div>

          {/* Video — full width below text */}
          <div data-hero-media-shell className="mt-8 lg:mt-10">
            <div
              data-hero-media
              className="relative isolate aspect-video w-full overflow-hidden rounded-xl border border-mist-50/16 bg-[linear-gradient(135deg,#0f3124_2%,#071912_42%,#131206_82%)] shadow-[0_8px_40px_-8px_rgba(85,190,136,0.12)]"
            >
              <ReelVideo
                className="absolute inset-0 h-full w-full object-cover"
                src="/media/fg-showcase-260129-v003.mp4"
              />
              <div
                aria-hidden
                data-hero-media-layer="far"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(137,234,183,0.24),transparent_46%),radial-gradient(circle_at_76%_74%,rgba(216,179,108,0.22),transparent_44%)]"
              />
              <div
                aria-hidden
                data-hero-media-layer="near"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(4,10,8,0.45)_52%,rgba(4,10,8,0.72)_100%)]"
              />
              <div className="pointer-events-none absolute left-4 top-4 sm:left-5 sm:top-5">
                <p className="rounded-md border border-mist-50/12 bg-bg-950/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-100/92 backdrop-blur-sm">
                  Studio Reel
                </p>
              </div>
              <Image
                src="/brand/mascot-smile.png"
                alt="Forestly mascot"
                width={120}
                height={120}
                className="pointer-events-none absolute -right-4 -top-6 h-20 w-20 object-contain opacity-90 drop-shadow-[0_8px_22px_rgba(89,107,255,0.35)] sm:-right-5 sm:-top-8 sm:h-24 sm:w-24"
              />
            </div>
          </div>
        </div>
      </HeroScene>
    </section>
  );
}
