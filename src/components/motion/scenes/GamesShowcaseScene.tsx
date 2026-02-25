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

          // Entrance tied to viewport entry so it plays when visible
          ScrollTrigger.create({
            trigger: root,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                ["[data-games-heading]", "[data-games-media-shell]", ...items],
                { y: isMobile ? 16 : 32, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: isMobile ? 0.45 : 0.72,
                  ease: "power2.out",
                  stagger: 0.08,
                  overwrite: "auto",
                },
              );

              gsap.fromTo(
                floats,
                { autoAlpha: 0, y: isMobile ? 12 : 40, scale: isMobile ? 1.02 : 1.08 },
                {
                  autoAlpha: isMobile ? 0.2 : 0.42,
                  y: 0,
                  scale: 1,
                  duration: isMobile ? 0.5 : 0.84,
                  ease: "power2.out",
                  stagger: 0.06,
                  overwrite: "auto",
                },
              );
            },
          });

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
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
            .to("[data-games-bg='far']", { y: isDesktop ? -90 : isTablet ? -50 : -20, opacity: 0.55 }, 0)
            .to("[data-games-bg='near']", { y: isDesktop ? -50 : isTablet ? -30 : -12, opacity: 0.7 }, 0.02)
            .to("[data-games-heading]", { y: isDesktop ? -48 : isTablet ? -28 : -12, opacity: isMobile ? 0.98 : 0.82 }, 0)
            .to("[data-games-media]", { scale: isDesktop ? 1.05 : isTablet ? 1.03 : 1.01, y: isDesktop ? -40 : isTablet ? -24 : -10 }, 0.03)
            .to(
              "[data-games-media-image]",
              { scale: isDesktop ? 1.08 : isTablet ? 1.05 : 1.03, y: isDesktop ? -28 : isTablet ? -18 : -8 },
              0.04,
            )
            .to("[data-games-media-layer='far']", { y: isDesktop ? -30 : isTablet ? -20 : -8 }, 0.07)
            .to("[data-games-media-layer='near']", { y: isDesktop ? -16 : isTablet ? -10 : -4 }, 0.1)
            .to(
              items,
              {
                y: (index) => {
                  if (isDesktop) return -(32 + (index % 3) * 14);
                  if (isTablet) return -(20 + (index % 2) * 10);
                  return -(10 + (index % 2) * 5);
                },
                rotate: (index) => {
                  if (isMobile) return 0;
                  return index % 2 === 0 ? -0.4 : 0.4;
                },
                autoAlpha: isMobile ? 1 : 0.92,
                stagger: 0.04,
              },
              0.08,
            )
            .to(
              floats,
              {
                y: (_, target) => {
                  const depth = Number((target as HTMLElement).dataset.gamesFloatDepth ?? 2);
                  if (isDesktop) return -(80 + depth * 14);
                  if (isTablet) return -(56 + depth * 10);
                  return -(30 + depth * 7);
                },
                x: (index) => {
                  if (isMobile) return 0;
                  if (isDesktop) return index % 2 === 0 ? 12 : -12;
                  return index % 2 === 0 ? 7 : -7;
                },
                rotate: (index) => {
                  if (isMobile) return index % 2 === 0 ? "+=1.2" : "-=1.2";
                  if (isDesktop) return index % 2 === 0 ? "+=4" : "-=4";
                  return index % 2 === 0 ? "+=2.6" : "-=2.6";
                },
                autoAlpha: (_, target) => {
                  const depth = Number((target as HTMLElement).dataset.gamesFloatDepth ?? 1);
                  if (isMobile) return 0.18 + depth * 0.03;
                  return 0.22 + depth * 0.045;
                },
                stagger: 0.04,
              },
              0.04,
            )
            .to("[data-games-footer]", { y: isDesktop ? -18 : isTablet ? -11 : -5, opacity: 0.88 }, 0.34);
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
