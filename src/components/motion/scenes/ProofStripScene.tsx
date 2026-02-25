"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils/cn";

type ProofStripSceneProps = {
  children: ReactNode;
  className?: string;
};

export function ProofStripScene({ children, className }: ProofStripSceneProps) {
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

          const items = gsap.utils.toArray<HTMLElement>("[data-proof-item]");

          gsap.set(["[data-proof-bg]", "[data-proof-heading]", ...items], { willChange: "transform, opacity" });

          // Staggered entrance with items sliding up from offset positions
          gsap.fromTo(
            "[data-proof-heading]",
            { y: isMobile ? 30 : 50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: isMobile ? 0.6 : 0.85, ease: "power3.out" },
          );

          gsap.fromTo(
            items,
            { y: isMobile ? 40 : 65, autoAlpha: 0, scale: 0.96 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: isMobile ? 0.55 : 0.8,
              stagger: isMobile ? 0.06 : 0.1,
              ease: "power3.out",
              delay: 0.15,
            },
          );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top 75%",
                end: isDesktop ? "bottom top+=20%" : isTablet ? "bottom top+=30%" : "bottom top+=38%",
                scrub: isMobile ? 0.35 : 0.5,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-proof-bg='soft']", { y: isDesktop ? -55 : isTablet ? -32 : -16, opacity: 0.5 }, 0)
            .to("[data-proof-heading]", { y: isDesktop ? -50 : isTablet ? -30 : -14, opacity: 0.7 }, 0.02)
            .to(
              items,
              {
                y: (index) => {
                  if (isDesktop) return -(35 + index * 12);
                  if (isTablet) return -(22 + index * 8);
                  return -(10 + index * 5);
                },
                scale: (index) => {
                  if (isMobile) return 1;
                  return 1 - index * 0.008;
                },
                autoAlpha: isMobile ? 0.95 : 0.8,
                stagger: 0.04,
              },
              0.05,
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
    <div ref={rootRef} className={cn("relative overflow-x-clip", className)}>
      <div
        aria-hidden
        data-proof-bg="soft"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.24)_0%,rgba(229,220,205,0.16)_52%,rgba(201,185,160,0.08)_100%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
