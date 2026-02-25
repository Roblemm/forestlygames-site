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

          // Dramatic entrance for heading and media
          gsap.fromTo(
            ["[data-games-heading]", "[data-games-media-shell]"],
            { y: isMobile ? 50 : 90, autoAlpha: 0, scale: 0.94 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: isMobile ? 0.7 : 1.1,
              ease: "power3.out",
              stagger: 0.12,
              overwrite: "auto",
            },
          );

          // Game items stagger in from below with slight rotation
          gsap.fromTo(
            items,
            { y: isMobile ? 40 : 70, autoAlpha: 0, rotate: isMobile ? 0 : 1.5 },
            {
              y: 0,
              autoAlpha: 1,
              rotate: 0,
              duration: isMobile ? 0.6 : 0.95,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: "auto",
            },
          );

          // Backdrop floats emerge dramatically
          gsap.fromTo(
            floats,
            { autoAlpha: 0, y: isMobile ? 30 : 80, scale: isMobile ? 1.04 : 1.16, rotate: "+=4" },
            {
              autoAlpha: isMobile ? 0.22 : 0.46,
              y: 0,
              scale: 1,
              rotate: "+=0",
              duration: isMobile ? 0.6 : 1.0,
              ease: "power2.out",
              stagger: 0.06,
              overwrite: "auto",
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top bottom-=10%",
                end: "bottom top+=10%",
                pin: false,
                scrub: isMobile ? 0.2 : 0.25,
                invalidateOnRefresh: true,
              },
            })
            // Float field drifts dramatically through the section
            .fromTo(
              "[data-games-float-field]",
              { yPercent: isDesktop ? 22 : isTablet ? 16 : 10 },
              { yPercent: isDesktop ? -20 : isTablet ? -14 : -8 },
              0,
            )
            // Background parallax layers with dramatic depth
            .to("[data-games-bg='far']", { y: isDesktop ? -220 : isTablet ? -130 : -55, opacity: 0.3, scale: 1.05 }, 0)
            .to("[data-games-bg='near']", { y: isDesktop ? -120 : isTablet ? -70 : -30, opacity: 0.5 }, 0.02)
            // Heading drifts up and fades
            .to("[data-games-heading]", { y: isDesktop ? -110 : isTablet ? -65 : -28, opacity: isMobile ? 0.85 : 0.55 }, 0)
            // Media panel scales and lifts dramatically
            .to(
              "[data-games-media]",
              { scale: isDesktop ? 1.1 : isTablet ? 1.06 : 1.02, y: isDesktop ? -90 : isTablet ? -55 : -22, rotate: isDesktop ? -0.6 : 0 },
              0.03,
            )
            .to(
              "[data-games-media-image]",
              { scale: isDesktop ? 1.16 : isTablet ? 1.1 : 1.05, y: isDesktop ? -60 : isTablet ? -36 : -16 },
              0.04,
            )
            // Inner media layers for depth
            .to("[data-games-media-layer='far']", { y: isDesktop ? -70 : isTablet ? -42 : -18, opacity: 0.4 }, 0.07)
            .to("[data-games-media-layer='near']", { y: isDesktop ? -36 : isTablet ? -22 : -10 }, 0.1)
            // Game items parallax with staggered depths and rotation
            .to(
              items,
              {
                y: (index) => {
                  if (isDesktop) return -(70 + (index % 3) * 30);
                  if (isTablet) return -(45 + (index % 2) * 20);
                  return -(20 + (index % 2) * 10);
                },
                rotate: (index) => {
                  if (isMobile) return 0;
                  return index % 2 === 0 ? -1.2 : 1.2;
                },
                autoAlpha: isMobile ? 0.9 : 0.7,
                stagger: 0.04,
              },
              0.08,
            )
            // Backdrop floats drift with dramatic parallax and rotation
            .to(
              floats,
              {
                y: (_, target) => {
                  const depth = Number((target as HTMLElement).dataset.gamesFloatDepth ?? 2);
                  if (isDesktop) return -(160 + depth * 30);
                  if (isTablet) return -(110 + depth * 22);
                  return -(55 + depth * 14);
                },
                x: (index) => {
                  if (isMobile) return 0;
                  if (isDesktop) return index % 2 === 0 ? 24 : -24;
                  return index % 2 === 0 ? 14 : -14;
                },
                rotate: (index) => {
                  if (isMobile) return index % 2 === 0 ? "+=2.5" : "-=2.5";
                  if (isDesktop) return index % 2 === 0 ? "+=8" : "-=8";
                  return index % 2 === 0 ? "+=5.5" : "-=5.5";
                },
                autoAlpha: (_, target) => {
                  const depth = Number((target as HTMLElement).dataset.gamesFloatDepth ?? 1);
                  if (isMobile) return 0.14 + depth * 0.03;
                  return 0.18 + depth * 0.04;
                },
                stagger: 0.03,
              },
              0.04,
            )
            .to("[data-games-footer]", { y: isDesktop ? -40 : isTablet ? -24 : -10, opacity: 0.7 }, 0.34);
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
