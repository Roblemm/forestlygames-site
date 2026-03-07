"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils/cn";

type GamesHeroSceneProps = {
  children: ReactNode;
  className?: string;
};

export function GamesHeroScene({ children, className }: GamesHeroSceneProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add(
        {
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          hasMotion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mq) => {
          const isMobile = Boolean(mq.conditions?.isMobile);
          const reduce = Boolean(mq.conditions?.reduce);

          if (reduce) {
            return;
          }

          const introTargets = [
            "[data-games-hero-kicker]",
            "[data-games-hero-title]",
            "[data-games-hero-copy]",
            "[data-games-hero-nav]",
            "[data-games-hero-cards]",
          ];

          gsap.set(introTargets, { willChange: "transform, opacity" });

          gsap.fromTo(
            introTargets,
            { y: isMobile ? 16 : 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.45 : 0.7,
              stagger: isMobile ? 0.06 : 0.09,
              ease: "power2.out",
              overwrite: "auto",
            },
          );
        },
      );
    }, root);

    return () => {
      context.revert();
      mm.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {children}
    </div>
  );
}
