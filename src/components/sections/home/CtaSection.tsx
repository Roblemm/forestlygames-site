import { CtaScene } from "@/components/motion/scenes/CtaScene";
import { CtaCard } from "@/components/ui/CtaCard";
import { Fireflies } from "@/components/ui/Fireflies";
import { LinkButton } from "@/components/ui/LinkButton";
import { siteConfig } from "@/data/site";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-emerald-200/8 bg-bg-900">
      <Fireflies count={18} lgExtra={14} palette="mixed" />
      <CtaScene>
        <div className="mx-auto max-w-328 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-14 lg:px-12 lg:pb-32 lg:pt-16">
          <CtaCard>
            <p
              data-cta-kicker
              className="inline-block rounded-full border border-gold-300/30 bg-gold-300/8 px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-100"
            >
              Collaborate
            </p>

            <h2
              data-cta-title
              className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2rem,5.5vw,4rem)] leading-[0.94] tracking-[-0.01em]"
            >
              <span className="bg-[linear-gradient(135deg,var(--mist-50)_0%,var(--emerald-200)_40%,var(--gold-300)_70%,var(--azure-300)_100%)] bg-clip-text text-transparent">
                Want to build or back the next ForestlyGames release?
              </span>
            </h2>

            <p
              data-cta-copy
              className="mx-auto mt-4 max-w-2xl text-base leading-7 text-mist-100/80 sm:text-lg"
            >
              We are looking for developers, collaborators, and investors who want to help us ship more games.
            </p>

            <div
              aria-hidden
              className="mx-auto mt-6 h-px w-48 animate-[shimmer_3s_ease-in-out_infinite]"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent, var(--emerald-300), var(--gold-300), transparent)",
                backgroundSize: "200% 100%",
              }}
            />

            <div data-cta-actions className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</LinkButton>
              <LinkButton href="/about" variant="ghost">
                View Studio Direction
              </LinkButton>
            </div>
          </CtaCard>
        </div>
      </CtaScene>
    </section>
  );
}
