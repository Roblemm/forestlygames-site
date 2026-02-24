"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils/cn";

type GamesShowcaseSceneProps = {
  children: ReactNode;
  className?: string;
};

export function GamesShowcaseScene({ children, className }: GamesShowcaseSceneProps) {
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

          const items = gsap.utils.toArray<HTMLElement>("[data-games-item]");
          const floats = gsap.utils.toArray<HTMLElement>("[data-games-float]");

          gsap.set(
            [
              "[data-games-heading]",
              "[data-games-media]",
              "[data-games-media-image]",
              "[data-games-media-layer]",
              "[data-games-footer]",
              "[data-games-bg]",
              "[data-games-float-field]",
              ...floats,
              ...items,
            ],
            { willChange: "transform, opacity" },
          );

          gsap.fromTo(
            ["[data-games-heading]", "[data-games-media-shell]", ...items],
            { y: isMobile ? 14 : 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.42 : 0.68,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: "auto",
            },
          );

          gsap.fromTo(
            floats,
            { autoAlpha: 0, y: isMobile ? 10 : 36, scale: isMobile ? 1.02 : 1.08 },
            {
              autoAlpha: isMobile ? 0.2 : 0.42,
              y: 0,
              scale: 1,
              duration: isMobile ? 0.48 : 0.82,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: "auto",
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                // Run from section entry to exit to avoid a pinned/sticky feel.
                start: "top bottom-=10%",
                end: "bottom top+=10%",
                pin: false,
                scrub: isMobile ? 0.22 : 0.28,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              "[data-games-float-field]",
              { yPercent: isDesktop ? 14 : isTablet ? 11 : 7 },
              { yPercent: isDesktop ? -12 : isTablet ? -9 : -6 },
              0,
            )
            .to("[data-games-bg='far']", { y: isDesktop ? -82 : isTablet ? -46 : -18, opacity: 0.58 }, 0)
            .to("[data-games-bg='near']", { y: isDesktop ? -46 : isTablet ? -28 : -10, opacity: 0.72 }, 0.02)
            .to("[data-games-heading]", { y: isDesktop ? -42 : isTablet ? -26 : -10, opacity: isMobile ? 0.98 : 0.84 }, 0)
            .to("[data-games-media]", { scale: isDesktop ? 1.05 : isTablet ? 1.02 : 1, y: isDesktop ? -36 : isTablet ? -22 : -8 }, 0.03)
            .to(
              "[data-games-media-image]",
              { scale: isDesktop ? 1.08 : isTablet ? 1.05 : 1.03, y: isDesktop ? -26 : isTablet ? -16 : -8 },
              0.04,
            )
            .to("[data-games-media-layer='far']", { y: isDesktop ? -28 : isTablet ? -18 : -7 }, 0.07)
            .to("[data-games-media-layer='near']", { y: isDesktop ? -14 : isTablet ? -9 : -4 }, 0.1)
            .to(
              items,
              {
                y: (index) => {
                  if (isDesktop) {
                    return -(28 + (index % 3) * 12);
                  }

                  if (isTablet) {
                    return -(18 + (index % 2) * 8);
                  }

                  return -(8 + (index % 2) * 4);
                },
                rotate: (index) => {
                  if (isMobile) {
                    return 0;
                  }

                  return index % 2 === 0 ? -0.35 : 0.35;
                },
                autoAlpha: isMobile ? 1 : 0.93,
                stagger: 0.04,
              },
              0.08,
            )
            .to(
              floats,
              {
                y: (_, target) => {
                  const depth = Number((target as HTMLElement).dataset.gamesFloatDepth ?? 2);

                  if (isDesktop) {
                    return -(74 + depth * 12);
                  }

                  if (isTablet) {
                    return -(52 + depth * 9);
                  }

                  return -(28 + depth * 6);
                },
                x: (index) => {
                  if (isMobile) {
                    return 0;
                  }

                  if (isDesktop) {
                    return index % 2 === 0 ? 10 : -10;
                  }

                  return index % 2 === 0 ? 6 : -6;
                },
                rotate: (index) => {
                  if (isMobile) {
                    return index % 2 === 0 ? "+=1.1" : "-=1.1";
                  }

                  if (isDesktop) {
                    return index % 2 === 0 ? "+=3.8" : "-=3.8";
                  }

                  return index % 2 === 0 ? "+=2.4" : "-=2.4";
                },
                autoAlpha: (_, target) => {
                  const depth = Number((target as HTMLElement).dataset.gamesFloatDepth ?? 1);

                  if (isMobile) {
                    return 0.18 + depth * 0.03;
                  }

                  return 0.22 + depth * 0.045;
                },
                stagger: 0.04,
              },
              0.04,
            )
            .to("[data-games-footer]", { y: isDesktop ? -16 : isTablet ? -10 : -4, opacity: 0.9 }, 0.34);
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
        data-games-bg="far"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(81,176,133,0.22),transparent_42%),radial-gradient(circle_at_82%_78%,rgba(200,151,73,0.18),transparent_38%)]"
      />
      <div
        aria-hidden
        data-games-bg="near"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(7,17,13,0.06)_0%,rgba(4,10,8,0.22)_56%,rgba(18,16,8,0.2)_100%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
