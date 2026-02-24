"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils/cn";

type CtaSceneProps = {
  children: ReactNode;
  className?: string;
};

export function CtaScene({ children, className }: CtaSceneProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add(
        {
          isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isTablet: "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mq) => {
          const isDesktop = Boolean(mq.conditions?.isDesktop);
          const isTablet = Boolean(mq.conditions?.isTablet);
          const isMobile = Boolean(mq.conditions?.isMobile);
          const reduce = Boolean(mq.conditions?.reduce);

          if (reduce) {
            return;
          }

          const introTargets = ["[data-cta-kicker]", "[data-cta-title]", "[data-cta-copy]", "[data-cta-actions]"];

          gsap.set(["[data-cta-bg]", ...introTargets], { willChange: "transform, opacity" });

          gsap.fromTo(
            introTargets,
            { y: isMobile ? 12 : 24, autoAlpha: 0.2 },
            {
              y: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.42 : 0.66,
              stagger: 0.07,
              ease: "power2.out",
              overwrite: "auto",
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                // CTA is a low-medium finish: clear, confident, and not over-theatrical.
                trigger: root,
                start: "top 82%",
                end: isDesktop ? "bottom top+=18%" : isTablet ? "bottom top+=26%" : "bottom top+=36%",
                scrub: isMobile ? 0.45 : 0.68,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-cta-bg='far']", { y: isDesktop ? -42 : isTablet ? -24 : -10, opacity: 0.58 }, 0)
            .to("[data-cta-bg='near']", { y: isDesktop ? -22 : isTablet ? -14 : -5, opacity: 0.74 }, 0.03)
            .to("[data-cta-title]", { y: isDesktop ? -18 : isTablet ? -10 : -4 }, 0.05)
            .to("[data-cta-actions]", { y: isDesktop ? -16 : isTablet ? -10 : -4 }, 0.08)
            .to("[data-cta-copy]", { autoAlpha: isMobile ? 1 : 0.9 }, 0.62);
        },
      );
    }, root);

    return () => {
      context.revert();
      mm.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative overflow-x-clip bg-bg-900", className)}>
      <div
        aria-hidden
        data-cta-bg="far"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(120,220,168,0.16),transparent_42%),radial-gradient(circle_at_78%_76%,rgba(220,177,105,0.2),transparent_38%)]"
      />
      <div
        aria-hidden
        data-cta-bg="near"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(5,11,8,0.1)_0%,rgba(8,13,10,0.44)_50%,rgba(11,11,7,0.38)_100%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
