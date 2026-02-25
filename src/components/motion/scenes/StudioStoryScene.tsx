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

          // Medium-high scene: entrance tied to viewport
          ScrollTrigger.create({
            trigger: root,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                ["[data-studio-lead]", "[data-studio-media]", ...pillars],
                { y: isMobile ? 16 : 28, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: isMobile ? 0.45 : 0.7,
                  stagger: 0.08,
                  ease: "power2.out",
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
                start: "top top+=14%",
                end: isDesktop ? "+=72%" : isTablet ? "+=60%" : "+=48%",
                pin: false,
                scrub: isMobile ? 0.42 : 0.52,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-studio-bg='far']", { y: isDesktop ? -60 : isTablet ? -36 : -14, opacity: 0.52 }, 0)
            .to("[data-studio-bg='near']", { y: isDesktop ? -36 : isTablet ? -22 : -9, opacity: 0.7 }, 0.02)
            .to("[data-studio-lead]", { y: isDesktop ? -32 : isTablet ? -18 : -8, opacity: isMobile ? 0.98 : 0.88 }, 0)
            .to("[data-studio-sub]", { y: isDesktop ? -18 : isTablet ? -11 : -5 }, 0.06)
            .to("[data-studio-media]", { y: isDesktop ? -34 : isTablet ? -20 : -9, scale: isDesktop ? 1.03 : 1.01 }, 0.04)
            .to("[data-studio-media-layer='far']", { y: isDesktop ? -26 : isTablet ? -16 : -6 }, 0.08)
            .to("[data-studio-media-layer='near']", { y: isDesktop ? -14 : isTablet ? -9 : -4 }, 0.11)
            .to("[data-studio-narrative]", { y: isDesktop ? -20 : isTablet ? -13 : -6, opacity: isMobile ? 1 : 0.92 }, 0.1)
            .to(
              pillars,
              {
                y: (index) => {
                  if (isDesktop) return -(18 + (index % 2) * 10);
                  if (isTablet) return -(12 + (index % 2) * 6);
                  return -(6 + (index % 2) * 3);
                },
                rotate: (index) => {
                  if (isMobile) return 0;
                  return index % 2 === 0 ? -0.25 : 0.25;
                },
                autoAlpha: isMobile ? 1 : 0.94,
                stagger: 0.04,
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
