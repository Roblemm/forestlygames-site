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

          gsap.set(
            [
              "[data-games-heading]",
              "[data-games-media]",
              "[data-games-media-layer]",
              "[data-games-footer]",
              "[data-games-bg]",
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

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                // Longer desktop range so media expansion can read as a scene transition.
                trigger: root,
                start: "top top+=8%",
                end: isDesktop ? "+=90%" : isTablet ? "+=68%" : "+=52%",
                pin: false,
                scrub: isMobile ? 0.42 : 0.56,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-games-bg='far']", { y: isDesktop ? -82 : isTablet ? -46 : -18, opacity: 0.58 }, 0)
            .to("[data-games-bg='near']", { y: isDesktop ? -46 : isTablet ? -28 : -10, opacity: 0.72 }, 0.02)
            .to("[data-games-heading]", { y: isDesktop ? -42 : isTablet ? -26 : -10, opacity: isMobile ? 0.98 : 0.84 }, 0)
            .to("[data-games-media]", { scale: isDesktop ? 1.05 : isTablet ? 1.02 : 1, y: isDesktop ? -36 : isTablet ? -22 : -8 }, 0.03)
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
