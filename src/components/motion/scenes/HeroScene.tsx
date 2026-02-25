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

          // Dramatic entrance: elements slide up from further away with staggered timing
          gsap.fromTo(
            introTargets,
            { y: isMobile ? 40 : 80, autoAlpha: 0, scale: isMobile ? 0.98 : 0.96 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: isMobile ? 0.7 : 1.1,
              stagger: isMobile ? 0.08 : 0.14,
              ease: "power3.out",
              overwrite: "auto",
            },
          );

          // Media panel dramatic reveal
          gsap.fromTo(
            "[data-hero-media]",
            { scale: isMobile ? 0.88 : 0.82, yPercent: 12, autoAlpha: 0, rotate: isMobile ? 0 : 1.5 },
            {
              scale: 1,
              yPercent: 0,
              autoAlpha: 1,
              rotate: 0,
              duration: isMobile ? 0.8 : 1.3,
              delay: isMobile ? 0.2 : 0.35,
              ease: "power3.out",
            },
          );

          // Background layers fade in
          gsap.fromTo(
            "[data-hero-bg]",
            { autoAlpha: 0, scale: 1.08 },
            { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: isDesktop ? "+=85%" : isTablet ? "+=65%" : "+=50%",
                pin: false,
                scrub: isMobile ? 0.3 : 0.4,
                invalidateOnRefresh: true,
              },
            })
            // Background layers move at different speeds for depth
            .to("[data-hero-bg='far']", { y: isDesktop ? -180 : isTablet ? -110 : -50, opacity: 0.3, scale: 1.06 }, 0)
            .to("[data-hero-bg='near']", { y: isDesktop ? -100 : isTablet ? -60 : -28, opacity: 0.5, scale: 1.03 }, 0.02)
            // Text elements drift up at varying rates
            .to("[data-hero-kicker]", { y: isDesktop ? -60 : isTablet ? -36 : -16, opacity: 0.4 }, 0)
            .to("[data-hero-title]", { y: isDesktop ? -90 : isTablet ? -54 : -24, opacity: isMobile ? 0.8 : 0.6, scale: isDesktop ? 0.97 : 1 }, 0.02)
            .to("[data-hero-copy]", { y: isDesktop ? -70 : isTablet ? -42 : -18, opacity: isMobile ? 0.7 : 0.45 }, 0.06)
            .to("[data-hero-actions]", { y: isDesktop ? -55 : isTablet ? -34 : -14, opacity: isMobile ? 0.75 : 0.5 }, 0.08)
            .to("[data-hero-panel]", { y: isDesktop ? -50 : isTablet ? -30 : -12, opacity: isMobile ? 0.6 : 0.35 }, 0.1)
            // Media panel scales up and lifts as user scrolls past
            .to(
              "[data-hero-media]",
              { scale: isDesktop ? 1.08 : isTablet ? 1.04 : 1.02, y: isDesktop ? -60 : isTablet ? -36 : -16, rotate: isDesktop ? -0.8 : 0 },
              0.04,
            )
            // Inner media layers create parallax depth inside the video panel
            .to("[data-hero-media-layer='far']", { y: isDesktop ? -50 : isTablet ? -30 : -14, opacity: 0.5, scale: 1.04 }, 0.08)
            .to("[data-hero-media-layer='near']", { y: isDesktop ? -28 : isTablet ? -16 : -8, opacity: 0.7, scale: 1.02 }, 0.12);
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
