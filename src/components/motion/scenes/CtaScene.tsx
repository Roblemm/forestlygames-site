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
            { y: isMobile ? 35 : 60, autoAlpha: 0, scale: 0.97 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: isMobile ? 0.6 : 0.9,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: "auto",
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top 78%",
                end: isDesktop ? "bottom top+=14%" : isTablet ? "bottom top+=22%" : "bottom top+=32%",
                scrub: isMobile ? 0.35 : 0.55,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-cta-bg='far']", { y: isDesktop ? -110 : isTablet ? -65 : -28, opacity: 0.35, scale: 1.05 }, 0)
            .to("[data-cta-bg='near']", { y: isDesktop ? -60 : isTablet ? -36 : -16, opacity: 0.55 }, 0.03)
            .to("[data-cta-kicker]", { y: isDesktop ? -30 : isTablet ? -18 : -8, opacity: 0.6 }, 0.04)
            .to("[data-cta-title]", { y: isDesktop ? -50 : isTablet ? -30 : -12, opacity: isMobile ? 0.85 : 0.7 }, 0.05)
            .to("[data-cta-copy]", { y: isDesktop ? -35 : isTablet ? -20 : -8, autoAlpha: isMobile ? 0.85 : 0.65 }, 0.08)
            .to("[data-cta-actions]", { y: isDesktop ? -40 : isTablet ? -24 : -10, opacity: isMobile ? 0.9 : 0.75 }, 0.1);
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
