import { HeroScene } from "@/components/motion/scenes/HeroScene";
import { LinkButton } from "@/components/ui/LinkButton";
import { ReelVideo } from "@/components/ui/ReelVideo";
import { TypewriterHeadline, type TypewriterSequence } from "@/components/ui/TypewriterHeadline";
import { heroProofChips } from "@/data/site";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

const heroSequences: TypewriterSequence[] = [
  {
    prefix: "We build Roblox games that",
    phrases: [
      { text: "go viral.", color: "emerald" },
      { text: "hook millions.", color: "gold" },
      { text: "break records.", color: "azure" },
      { text: "players never forget.", color: "emerald" },
      { text: "dominate the platform.", color: "gold" },
    ],
  },
  {
    prefix: "Let's",
    phrases: [
      { text: "grow together.", color: "emerald" },
      { text: "build something legendary.", color: "gold" },
      { text: "ship the next big hit.", color: "azure" },
      { text: "scale to millions.", color: "emerald" },
    ],
  },
];

export function HeroSection() {
  return (
    <section className="relative bg-bg-950">
      <HeroScene>
        <div className="mx-auto max-w-328 px-5 pb-8 pt-8 sm:px-8 sm:pt-12 lg:px-12 lg:pt-14">
          <div className="mx-auto max-w-3xl text-center">
            <p
              data-hero-kicker
              className="inline-block rounded-full border border-emerald-200/25 bg-emerald-300/8 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-200/90"
            >
              ForestlyGames Studio
            </p>

            <TypewriterHeadline
              data-hero-title
              sequences={heroSequences}
              className="mt-4 font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.92] tracking-[-0.02em] text-mist-50"
            />

            <p
              data-hero-copy
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mist-100/82 sm:text-lg sm:leading-relaxed"
            >
              ForestlyGames is a remote Roblox game studio focused on building, testing, and shipping games quickly.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {heroProofChips.map((chip) => (
                <span
                  key={chip}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.06] active:scale-[0.97]",
                    chip.includes("YouTube")
                      ? "border-azure-300/30 bg-azure-300/8 text-azure-300 hover:border-azure-300/50 hover:bg-azure-300/16 hover:shadow-[0_0_18px_-3px_rgba(133,208,255,0.35)]"
                      : "border-emerald-200/24 bg-emerald-300/6 text-emerald-100/90 hover:border-emerald-200/45 hover:bg-emerald-300/14 hover:shadow-[0_0_18px_-3px_rgba(95,202,148,0.35)]",
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

            <div data-hero-actions className="mt-6 flex flex-wrap justify-center gap-3">
              <LinkButton href="/games">Explore Games</LinkButton>
              <LinkButton href="/contact" variant="secondary">
                Contact the Studio
              </LinkButton>
            </div>
          </div>

          <div data-hero-media-shell className="mt-6 lg:mt-8">
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
                className="pointer-events-none absolute right-3 top-3 h-16 w-16 object-contain opacity-90 drop-shadow-[0_8px_22px_rgba(89,107,255,0.35)] sm:right-4 sm:top-4 sm:h-20 sm:w-20"
              />
            </div>
          </div>
        </div>
      </HeroScene>
    </section>
  );
}
