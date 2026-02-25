"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils/cn";

type StudioStorySceneProps = {
  children: ReactNode;
  className?: string;
};

export function StudioStoryScene({ children, className }: StudioStorySceneProps) {
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

          const pillars = gsap.utils.toArray<HTMLElement>("[data-studio-pillar]");

          gsap.set(
            [
              "[data-studio-lead]",
              "[data-studio-sub]",
              "[data-studio-media]",
              "[data-studio-media-layer]",
              "[data-studio-narrative]",
              "[data-studio-bg]",
              ...pillars,
            ],
            { willChange: "transform, opacity" },
          );

          // Dramatic entrance: lead content and media slide in from opposite sides
          gsap.fromTo(
            "[data-studio-lead]",
            { y: isMobile ? 50 : 80, autoAlpha: 0, x: isMobile ? 0 : -40 },
            { y: 0, autoAlpha: 1, x: 0, duration: isMobile ? 0.7 : 1.1, ease: "power3.out" },
          );

          gsap.fromTo(
            "[data-studio-media]",
            { y: isMobile ? 50 : 80, autoAlpha: 0, x: isMobile ? 0 : 40, scale: 0.92 },
            { y: 0, autoAlpha: 1, x: 0, scale: 1, duration: isMobile ? 0.7 : 1.1, delay: 0.15, ease: "power3.out" },
          );

          // Pillars stagger in with dramatic offset
          gsap.fromTo(
            pillars,
            { y: isMobile ? 45 : 75, autoAlpha: 0, rotate: isMobile ? 0 : 2, x: isMobile ? 0 : 30 },
            {
              y: 0,
              autoAlpha: 1,
              rotate: 0,
              x: 0,
              duration: isMobile ? 0.6 : 0.95,
              stagger: 0.12,
              ease: "power3.out",
              delay: 0.25,
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top top+=10%",
                end: isDesktop ? "+=90%" : isTablet ? "+=72%" : "+=55%",
                pin: false,
                scrub: isMobile ? 0.35 : 0.45,
                invalidateOnRefresh: true,
              },
            })
            // Background layers with dramatic depth
            .to("[data-studio-bg='far']", { y: isDesktop ? -160 : isTablet ? -95 : -40, opacity: 0.3, scale: 1.06 }, 0)
            .to("[data-studio-bg='near']", { y: isDesktop ? -90 : isTablet ? -55 : -24, opacity: 0.5 }, 0.02)
            // Lead content drifts up and fades
            .to("[data-studio-lead]", { y: isDesktop ? -80 : isTablet ? -48 : -20, opacity: isMobile ? 0.85 : 0.55 }, 0)
            .to("[data-studio-sub]", { y: isDesktop ? -55 : isTablet ? -32 : -14, opacity: isMobile ? 0.8 : 0.5 }, 0.06)
            // Media panel scales up and lifts with rotation
            .to(
              "[data-studio-media]",
              { y: isDesktop ? -85 : isTablet ? -50 : -22, scale: isDesktop ? 1.08 : isTablet ? 1.04 : 1.02, rotate: isDesktop ? -0.6 : 0 },
              0.04,
            )
            // Inner media layers for depth inside the panel
            .to("[data-studio-media-layer='far']", { y: isDesktop ? -60 : isTablet ? -36 : -14, opacity: 0.45, scale: 1.04 }, 0.08)
            .to("[data-studio-media-layer='near']", { y: isDesktop ? -32 : isTablet ? -20 : -8, opacity: 0.7 }, 0.11)
            // Narrative text drifts up
            .to("[data-studio-narrative]", { y: isDesktop ? -50 : isTablet ? -30 : -14, opacity: isMobile ? 0.9 : 0.7 }, 0.1)
            // Pillars parallax with staggered depths and rotation
            .to(
              pillars,
              {
                y: (index) => {
                  if (isDesktop) return -(45 + (index % 2) * 22);
                  if (isTablet) return -(28 + (index % 2) * 14);
                  return -(12 + (index % 2) * 7);
                },
                rotate: (index) => {
                  if (isMobile) return 0;
                  return index % 2 === 0 ? -0.8 : 0.8;
                },
                autoAlpha: isMobile ? 0.9 : 0.75,
                stagger: 0.05,
              },
              0.14,
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
    <div ref={rootRef} className={cn("relative overflow-x-clip bg-bg-950", className)}>
      <div
        aria-hidden
        data-studio-bg="far"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(78,170,130,0.22),transparent_44%),radial-gradient(circle_at_84%_72%,rgba(186,141,66,0.16),transparent_36%)]"
      />
      <div
        aria-hidden
        data-studio-bg="near"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(7,15,12,0.08)_0%,rgba(5,10,8,0.22)_56%,rgba(16,13,7,0.2)_100%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
