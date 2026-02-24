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

          gsap.fromTo(
            ["[data-studio-lead]", "[data-studio-media]", ...pillars],
            { y: isMobile ? 14 : 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.42 : 0.66,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: "auto",
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                // Medium-high scene: parallax + sequencing, no long pin on mobile.
                trigger: root,
                start: "top top+=14%",
                end: isDesktop ? "+=70%" : isTablet ? "+=58%" : "+=48%",
                pin: false,
                scrub: isMobile ? 0.42 : 0.52,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-studio-bg='far']", { y: isDesktop ? -56 : isTablet ? -32 : -12, opacity: 0.54 }, 0)
            .to("[data-studio-bg='near']", { y: isDesktop ? -34 : isTablet ? -20 : -8, opacity: 0.72 }, 0.02)
            .to("[data-studio-lead]", { y: isDesktop ? -28 : isTablet ? -16 : -7, opacity: isMobile ? 0.98 : 0.9 }, 0)
            .to("[data-studio-sub]", { y: isDesktop ? -16 : isTablet ? -10 : -4 }, 0.06)
            .to("[data-studio-media]", { y: isDesktop ? -30 : isTablet ? -18 : -8, scale: isDesktop ? 1.03 : 1.01 }, 0.04)
            .to("[data-studio-media-layer='far']", { y: isDesktop ? -24 : isTablet ? -14 : -5 }, 0.08)
            .to("[data-studio-media-layer='near']", { y: isDesktop ? -12 : isTablet ? -8 : -3 }, 0.11)
            .to("[data-studio-narrative]", { y: isDesktop ? -18 : isTablet ? -12 : -5, opacity: isMobile ? 1 : 0.94 }, 0.1)
            .to(
              pillars,
              {
                y: (index) => {
                  if (isDesktop) {
                    return -(16 + (index % 2) * 8);
                  }

                  if (isTablet) {
                    return -(10 + (index % 2) * 5);
                  }

                  return -(5 + (index % 2) * 3);
                },
                rotate: (index) => {
                  if (isMobile) {
                    return 0;
                  }

                  return index % 2 === 0 ? -0.2 : 0.2;
                },
                autoAlpha: isMobile ? 1 : 0.95,
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
