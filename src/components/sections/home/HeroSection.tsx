import { HeroScene } from "@/components/motion/scenes/HeroScene";
import { LinkButton } from "@/components/ui/LinkButton";

export function HeroSection() {
  return (
    <section className="relative bg-bg-950">
      <HeroScene>
        <div className="mx-auto max-w-[88rem] px-5 pb-10 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="min-w-0">
              <p data-hero-kicker className="font-semibold uppercase tracking-[0.24em] text-emerald-200/90">
                ForestlyGames Studio
              </p>

              <h1
                data-hero-title
                className="mt-4 max-w-[11ch] font-display text-[clamp(2.2rem,7vw,5.2rem)] leading-[0.92] tracking-[-0.01em] text-mist-50"
              >
                Cinematic worlds. Systems-first gameplay.
              </h1>

              <p data-hero-copy className="mt-5 max-w-xl text-base leading-relaxed text-mist-100/86 sm:text-lg">
                ForestlyGames builds high-craft game experiences with clear direction, production discipline, and
                cinematic presence.
              </p>

              <div data-hero-actions className="mt-7 flex flex-wrap gap-3">
                <LinkButton href="/games">Explore Games</LinkButton>
                <LinkButton href="/contact" variant="secondary">
                  Contact the Studio
                </LinkButton>
              </div>

              <div data-hero-panel className="mt-7 max-w-lg space-y-3 border-l border-emerald-200/25 pl-5 text-mist-100/82">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/90">Studio Focus</p>
                <p className="text-sm leading-7 sm:text-base">
                  Gameplay-first production paired with visual storytelling systems and performance-aware motion design.
                </p>
              </div>
            </div>

            <div data-hero-media-shell className="min-w-0 lg:pl-2">
              <div
                data-hero-media
                className="relative isolate w-full overflow-hidden border border-mist-50/20 bg-[linear-gradient(135deg,#0f3124_2%,#071912_42%,#131206_82%)] aspect-[5/4] sm:aspect-[16/11]"
              >
                <div
                  aria-hidden
                  data-hero-media-layer="far"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(137,234,183,0.24),transparent_46%),radial-gradient(circle_at_76%_74%,rgba(216,179,108,0.22),transparent_44%)]"
                />
                <div
                  aria-hidden
                  data-hero-media-layer="near"
                  className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(4,10,8,0.45)_52%,rgba(4,10,8,0.72)_100%)]"
                />
                <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/92">Studio Reel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroScene>
    </section>
  );
}
