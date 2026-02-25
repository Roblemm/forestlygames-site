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

          // Cooldown section: subtle entrance tied to viewport
          ScrollTrigger.create({
            trigger: root,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                ["[data-proof-heading]", ...items],
                { y: isMobile ? 14 : 26, autoAlpha: 0.15 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: isMobile ? 0.42 : 0.64,
                  stagger: 0.06,
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
                start: "top 82%",
                end: isDesktop ? "bottom top+=26%" : isTablet ? "bottom top+=34%" : "bottom top+=42%",
                scrub: isMobile ? 0.45 : 0.62,
                invalidateOnRefresh: true,
              },
            })
            .to("[data-proof-bg='soft']", { y: isDesktop ? -22 : isTablet ? -14 : -7, opacity: 0.64 }, 0)
            .to("[data-proof-heading]", { y: isDesktop ? -22 : isTablet ? -14 : -6, opacity: 0.88 }, 0.02)
            .to(
              items,
              {
                y: (index) => {
                  if (isDesktop) return -(16 + index * 5);
                  if (isTablet) return -(10 + index * 3);
                  return -(5 + index * 2);
                },
                autoAlpha: isMobile ? 1 : 0.91,
                stagger: 0.03,
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
