"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";
import type { Testimonial } from "@/types/site";

type TestimonialsRailProps = {
  testimonials: Testimonial[];
  className?: string;
};

const AUTO_SCROLL_SPEED = 0.4;
const RESUME_DELAY_MS = 3000;
const TRUNCATE_LENGTH = 180;

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.quote.length > TRUNCATE_LENGTH;

  const displayQuote = !isLong || expanded
    ? testimonial.quote
    : testimonial.quote.slice(0, TRUNCATE_LENGTH).replace(/\s+\S*$/, "") + "…";

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-emerald-200/14 bg-bg-950/55 p-4 backdrop-blur-[2px] sm:p-5">
      <div>
        <p className="whitespace-pre-line text-[0.8rem] leading-6 text-mist-100/86 sm:text-sm sm:leading-7">
          &ldquo;{displayQuote}&rdquo;
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-emerald-300/80 transition-colors hover:text-emerald-200"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-emerald-200/70 sm:text-xs">
        — {testimonial.attribution}
      </p>
    </article>
  );
}

export function TestimonialsRail({ testimonials, className }: TestimonialsRailProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopingTestimonials = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let last = performance.now();

    const tick = (timestamp: number) => {
      const delta = (timestamp - last) / 16.67;
      last = timestamp;

      if (!isPaused && !mediaQuery.matches) {
        const loopWidth = scroller.scrollWidth / 2;
        scroller.scrollLeft += AUTO_SCROLL_SPEED * delta;

        if (scroller.scrollLeft >= loopWidth) {
          scroller.scrollLeft -= loopWidth;
        }
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
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

    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY_MS);
  }, []);

  const moveRail = useCallback(
    (direction: 1 | -1) => {
      const scroller = scrollerRef.current;

      if (!scroller) {
        return;
      }

      pauseThenResume();
      scroller.scrollBy({ left: direction * scroller.clientWidth * 0.75, behavior: "smooth" });
    },
    [pauseThenResume],
  );

  return (
    <div className={cn("relative", className)}>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => moveRail(-1)}
          className="rounded-lg border border-emerald-200/20 bg-bg-950/65 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mist-100 transition-colors hover:border-emerald-200/40 hover:text-emerald-100"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => moveRail(1)}
          className="rounded-lg border border-emerald-200/20 bg-bg-950/65 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mist-100 transition-colors hover:border-emerald-200/40 hover:text-emerald-100"
        >
          Next
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="themed-scrollbar overflow-x-auto pb-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="flex w-max gap-3 pr-3 sm:gap-4 sm:pr-4">
          {loopingTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.attribution}-${index}`}
              className="w-[78vw] shrink-0 sm:w-72 md:w-80 lg:w-88"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
