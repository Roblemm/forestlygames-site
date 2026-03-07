"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils/cn";

type GamesScrollSceneProps = {
  children: ReactNode;
  className?: string;
};

export function GamesScrollScene({ children, className }: GamesScrollSceneProps) {
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
          isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mq) => {
          const isDesktop = Boolean(mq.conditions?.isDesktop);
          const reduce = Boolean(mq.conditions?.reduce);

          if (reduce) {
            return;
          }

          const headings = gsap.utils.toArray<HTMLElement>("[data-games-scroll-heading]");
          const heroes = gsap.utils.toArray<HTMLElement>("[data-games-scroll-hero]");

          gsap.set([...headings, ...heroes], { willChange: "transform, opacity" });

          headings.forEach((el) => {
            gsap.fromTo(
              el,
              { y: isDesktop ? 18 : 12, opacity: 0.82 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  end: "top 55%",
                  scrub: isDesktop ? 0.35 : 0.28,
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          heroes.forEach((el) => {
            gsap.fromTo(
              el,
              { scale: 0.98, y: isDesktop ? 12 : 8 },
              {
                scale: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 92%",
                  end: "top 45%",
                  scrub: isDesktop ? 0.3 : 0.25,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
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
