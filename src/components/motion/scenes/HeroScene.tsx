"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Fireflies } from "@/components/ui/Fireflies";
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
            { y: isMobile ? 18 : 34, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.5 : 0.8,
              stagger: isMobile ? 0.05 : 0.09,
              ease: "power2.out",
              overwrite: "auto",
            },
          );

          gsap.fromTo(
            "[data-hero-media]",
            { scale: isMobile ? 0.92 : 0.88, yPercent: 8, autoAlpha: 0 },
            {
              scale: 1,
              yPercent: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.6 : 1.0,
              delay: isMobile ? 0.15 : 0.25,
              ease: "power2.out",
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top top+=6%",
                end: isDesktop ? "+=55%" : isTablet ? "+=46%" : "+=36%",
                pin: false,
                scrub: isMobile ? 0.35 : 0.45,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-hero-bg='far']", { y: isDesktop ? -70 : isTablet ? -42 : -16, opacity: 0.55 }, 0)
            .to("[data-hero-bg='near']", { y: isDesktop ? -38 : isTablet ? -22 : -10, opacity: 0.72 }, 0.02)
            .to("[data-hero-kicker]", { y: isDesktop ? -18 : isTablet ? -11 : -5 }, 0)
            .to("[data-hero-title]", { y: isDesktop ? -30 : isTablet ? -18 : -8 }, 0.02)
            .to("[data-hero-copy]", { y: isDesktop ? -20 : isTablet ? -12 : -6, opacity: isMobile ? 0.98 : 0.88 }, 0.06)
            .to("[data-hero-actions]", { y: isDesktop ? -18 : isTablet ? -11 : -5, opacity: isMobile ? 0.98 : 0.88 }, 0.08)
            .to("[data-hero-panel]", { y: isDesktop ? -16 : isTablet ? -10 : -5, opacity: isMobile ? 0.96 : 0.85 }, 0.1)
            .fromTo(
              "[data-hero-media]",
              { scale: isMobile ? 0.97 : 0.96, yPercent: 4, autoAlpha: 0.9 },
              { scale: isDesktop ? 1.02 : 1, yPercent: 0, autoAlpha: 1 },
              0.04,
            )
            .to("[data-hero-media-layer='far']", { y: isDesktop ? -20 : isTablet ? -12 : -5, opacity: 0.8 }, 0.08)
            .to("[data-hero-media-layer='near']", { y: isDesktop ? -11 : isTablet ? -7 : -3, opacity: 0.94 }, 0.12);
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
      <div
        aria-hidden
        className="forest-canopy-rays pointer-events-none absolute inset-0 overflow-hidden"
        style={{ animation: "canopySway 22s ease-in-out infinite" }}
      >
        <div
          className="absolute -top-[20%] left-[8%] h-[140%] w-[120px] rotate-32 sm:w-[180px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(95,202,148,0.06) 30%, rgba(95,202,148,0.04) 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute -top-[20%] left-[30%] h-[140%] w-[80px] rotate-38 sm:w-[140px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(230,198,138,0.05) 35%, rgba(230,198,138,0.03) 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute -top-[20%] right-[22%] h-[140%] w-[100px] rotate-28 sm:w-[160px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(95,202,148,0.04) 25%, rgba(133,208,255,0.03) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute -top-[20%] right-[5%] h-[140%] w-[60px] rotate-45 sm:w-[100px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(230,198,138,0.04) 40%, rgba(230,198,138,0.02) 60%, transparent 100%)",
          }}
        />
      </div>
      <Fireflies count={22} lgExtra={18} />
      <div className="relative">{children}</div>
    </div>
  );
}
