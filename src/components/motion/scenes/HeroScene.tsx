"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils/cn";

type HeroSceneProps = {
  children: ReactNode;
  className?: string;
};

export function HeroScene({ children, className }: HeroSceneProps) {
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

          const introTargets = [
            "[data-hero-kicker]",
            "[data-hero-title]",
            "[data-hero-copy]",
            "[data-hero-panel]",
            "[data-hero-actions]",
          ];

          gsap.set(["[data-hero-bg]", "[data-hero-media-layer]", "[data-hero-media]", ...introTargets], {
            willChange: "transform, opacity",
          });

          gsap.fromTo(
            introTargets,
            { y: isMobile ? 14 : 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.4 : 0.68,
              stagger: isMobile ? 0.04 : 0.07,
              ease: "power2.out",
              overwrite: "auto",
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                // Hero scene intentionally gets extra runway on desktop for a cinematic opening handoff.
                trigger: root,
                start: "top top+=6%",
                end: isDesktop ? "+=52%" : isTablet ? "+=44%" : "+=34%",
                pin: false,
                scrub: isMobile ? 0.35 : 0.45,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-hero-bg='far']", { y: isDesktop ? -62 : isTablet ? -38 : -14, opacity: 0.6 }, 0)
            .to("[data-hero-bg='near']", { y: isDesktop ? -34 : isTablet ? -20 : -8, opacity: 0.76 }, 0.02)
            .to("[data-hero-kicker]", { y: isDesktop ? -14 : isTablet ? -9 : -4 }, 0)
            .to("[data-hero-title]", { y: isDesktop ? -26 : isTablet ? -16 : -7 }, 0.02)
            .to("[data-hero-copy]", { y: isDesktop ? -16 : isTablet ? -10 : -5, opacity: isMobile ? 0.98 : 0.92 }, 0.06)
            .to("[data-hero-actions]", { y: isDesktop ? -16 : isTablet ? -10 : -5, opacity: isMobile ? 0.98 : 0.92 }, 0.08)
            .to("[data-hero-panel]", { y: isDesktop ? -14 : isTablet ? -9 : -4, opacity: isMobile ? 0.96 : 0.9 }, 0.1)
            .fromTo(
              "[data-hero-media]",
              { scale: isDesktop ? 0.94 : isTablet ? 0.96 : 0.98, yPercent: 6, autoAlpha: 0.84 },
              { scale: isDesktop ? 1.01 : 1, yPercent: 0, autoAlpha: 1 },
              0.04,
            )
            .to("[data-hero-media-layer='far']", { y: isDesktop ? -16 : isTablet ? -10 : -4, opacity: 0.85 }, 0.12)
            .to("[data-hero-media-layer='near']", { y: isDesktop ? -9 : isTablet ? -6 : -3, opacity: 0.96 }, 0.14);
        },
      );
    }, root);

    return () => {
      context.revert();
      mm.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative overflow-x-clip bg-bg-950", className)}>
      <div
        aria-hidden
        data-hero-bg="far"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(72,165,126,0.28),transparent_40%),radial-gradient(circle_at_88%_74%,rgba(188,142,67,0.2),transparent_34%)]"
      />
      <div
        aria-hidden
        data-hero-bg="near"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(61,153,110,0.16)_0%,rgba(7,16,12,0.08)_44%,rgba(201,149,69,0.16)_100%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
