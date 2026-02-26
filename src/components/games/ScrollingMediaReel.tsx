"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type MediaImage = {
  src: string;
  alt: string;
};

type AccentColor = "gold" | "emerald" | "azure" | "moss";

const AUTO_SCROLL_SPEED = 0.45;
const RESUME_DELAY_MS = 2600;

const borderByAccent: Record<AccentColor, string> = {
  gold: "border-gold-300/18",
  emerald: "border-emerald-200/18",
  azure: "border-azure-300/18",
  moss: "border-emerald-200/16",
};

export function ScrollingMediaReel({
  images,
  accent,
}: {
  images: MediaImage[];
  accent: AccentColor;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const loopedImages = [...images, ...images];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = (now - last) / 16.67;
      last = now;

      if (!isPaused && !mediaQuery.matches) {
        const loopWidth = scroller.scrollWidth / 2;
        scroller.scrollLeft += AUTO_SCROLL_SPEED * delta;
        if (scroller.scrollLeft >= loopWidth) {
          scroller.scrollLeft -= loopWidth;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const pauseThenResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY_MS);
  }, []);

  const moveReel = useCallback(
    (direction: 1 | -1) => {
      const scroller = scrollerRef.current;
      if (!scroller) {
        return;
      }

      pauseThenResume();
      scroller.scrollBy({ left: direction * scroller.clientWidth * 0.72, behavior: "smooth" });
    },
    [pauseThenResume],
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => moveReel(-1)}
          className={`games-reel-nav border ${borderByAccent[accent]}`}
          aria-label="Scroll media left"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.4 5.4 8.8 12l6.6 6.6-1.4 1.4L6 12l8-8 1.4 1.4z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => moveReel(1)}
          className={`games-reel-nav border ${borderByAccent[accent]}`}
          aria-label="Scroll media right"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8.6 18.6 15.2 12 8.6 5.4 10 4l8 8-8 8-1.4-1.4z" />
          </svg>
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="games-reel-scroll media-rail-mask overflow-x-auto pb-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="flex w-max gap-4 pr-2">
          {loopedImages.map((image, index) => {
            const parts = image.alt.split("|").map((part) => part.trim());
            const title = parts[0] ?? "Project media";
            const note = parts[1] ?? "Captured from production footage.";

            return (
              <figure
                key={`${image.src}-${index}`}
                className={`games-frame group relative aspect-video w-[min(84vw,28rem)] shrink-0 overflow-hidden border bg-bg-900/30 sm:w-[22rem] lg:w-[23rem] ${borderByAccent[accent]}`}
              >
                <Image
                  src={image.src}
                  alt={title}
                  fill
                  sizes="(min-width:1280px) 23rem, (min-width:640px) 22rem, 84vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-950/80 via-bg-950/18 to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
                  <p className="font-display text-[1.04rem] leading-none text-mist-50">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist-100/78">{note}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}

