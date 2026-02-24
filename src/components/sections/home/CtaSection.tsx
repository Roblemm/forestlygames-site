import { CtaScene } from "@/components/motion/scenes/CtaScene";
import { LinkButton } from "@/components/ui/LinkButton";
import { siteConfig } from "@/data/site";

export function CtaSection() {
  return (
    <section className="relative border-t border-emerald-200/10 bg-bg-900">
      <CtaScene>
        <div className="mx-auto max-w-[82rem] px-5 pb-20 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-20">
          <p data-cta-kicker className="font-semibold uppercase tracking-[0.22em] text-gold-100/90">
            Collaborate
          </p>
          <h2
            data-cta-title
            className="mx-auto mt-4 max-w-[16ch] font-display text-[clamp(2rem,6vw,4.8rem)] leading-[0.94] tracking-[-0.01em] text-mist-50"
          >
            Want to build or back the next ForestlyGames release?
          </h2>
          <p data-cta-copy className="mx-auto mt-6 max-w-3xl text-base leading-7 text-mist-100/84 sm:text-lg">
            We are looking for developers, collaborators, and investors who want to help us ship more Roblox games.
          </p>
          <div data-cta-actions className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</LinkButton>
            <LinkButton href="/about" variant="ghost">
              View Studio Direction
            </LinkButton>
          </div>
        </div>
      </CtaScene>
    </section>
  );
}
