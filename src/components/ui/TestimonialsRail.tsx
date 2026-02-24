"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";
import type { Testimonial } from "@/types/site";

type TestimonialsRailProps = {
  testimonials: Testimonial[];
  className?: string;
};

const AUTO_SCROLL_SPEED = 0.48;
const RESUME_DELAY_MS = 2600;

function isLongTestimonial(testimonial: Testimonial) {
  return testimonial.quote.length > 340;
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

  const pauseThenResume = () => {
    setIsPaused(true);

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY_MS);
  };

  const moveRail = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    pauseThenResume();
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div className="mb-5 flex items-center justify-end gap-2 sm:mb-6">
        <button
          type="button"
          onClick={() => moveRail(-1)}
          className="border border-emerald-200/24 bg-bg-950/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-mist-100 transition-colors hover:border-emerald-200/46 hover:text-emerald-100"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => moveRail(1)}
          className="border border-emerald-200/24 bg-bg-950/72 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-mist-100 transition-colors hover:border-emerald-200/46 hover:text-emerald-100"
        >
          Next
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="themed-scrollbar overflow-x-auto pb-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="grid h-[30rem] w-max grid-flow-col grid-rows-1 auto-cols-[minmax(86vw,86vw)] gap-4 pr-4 sm:auto-cols-[minmax(22rem,28rem)] md:h-[31rem] md:grid-rows-2 md:auto-cols-[minmax(24rem,30rem)] lg:auto-cols-[minmax(27rem,33rem)]">
          {loopingTestimonials.map((testimonial, index) => {
            const long = isLongTestimonial(testimonial);

            return (
              <article
                key={`${testimonial.attribution}-${index}`}
                className={cn(
                  "themed-scrollbar min-w-0 overflow-y-auto border border-emerald-200/18 bg-bg-950/64 p-5 sm:p-6",
                  long ? "md:row-span-2" : "md:row-span-1",
                )}
              >
                <p className="whitespace-pre-line break-words text-sm leading-7 text-mist-100/86">{`"${testimonial.quote}"`}</p>
                <p className="mt-4 break-words text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200/86">
                  - {testimonial.attribution}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
