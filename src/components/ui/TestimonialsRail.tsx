"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";
import type { Testimonial, TestimonialHighlight } from "@/types/site";

type TestimonialsRailProps = {
  testimonials: Testimonial[];
  className?: string;
};

const AUTO_SCROLL_SPEED = 0.4;
const RESUME_DELAY_MS = 3000;
const LONG_THRESHOLD = 280;
const SOLO_TRUNCATE = 420;
const STACK_SIZE = 3;

type Slide = { type: "solo"; item: Testimonial } | { type: "stack"; items: Testimonial[] };

function buildSlides(testimonials: Testimonial[]): Slide[] {
  const slides: Slide[] = [];
  const shortQueue: Testimonial[] = [];

  const flushQueue = () => {
    while (shortQueue.length >= STACK_SIZE) {
      slides.push({ type: "stack", items: shortQueue.splice(0, STACK_SIZE) });
    }
    if (shortQueue.length > 0) {
      slides.push({ type: "stack", items: shortQueue.splice(0) });
    }
  };

  for (const t of testimonials) {
    if (t.quote.length > LONG_THRESHOLD) {
      flushQueue();
      slides.push({ type: "solo", item: t });
    } else {
      shortQueue.push(t);
    }
  }
  flushQueue();

  return slides;
}

const highlightColorMap: Record<TestimonialHighlight["color"], string> = {
  emerald: "font-semibold text-emerald-300",
  gold: "font-semibold text-gold-300",
  azure: "font-semibold text-azure-300",
};

function renderHighlightedQuote(
  text: string,
  highlights?: TestimonialHighlight[],
): ReactNode {
  if (!highlights || highlights.length === 0) return text;

  const parts: ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    let earliestIdx = remaining.length;
    let matchedHighlight: TestimonialHighlight | null = null;

    for (const h of highlights) {
      const idx = remaining.indexOf(h.text);
      if (idx !== -1 && idx < earliestIdx) {
        earliestIdx = idx;
        matchedHighlight = h;
      }
    }

    if (!matchedHighlight) {
      parts.push(remaining);
      break;
    }

    if (earliestIdx > 0) {
      parts.push(remaining.slice(0, earliestIdx));
    }

    parts.push(
      <span key={keyIdx++} className={highlightColorMap[matchedHighlight.color]}>
        {matchedHighlight.text}
      </span>,
    );

    remaining = remaining.slice(earliestIdx + matchedHighlight.text.length);
  }

  return parts;
}

function TestimonialCard({ testimonial, compact }: { testimonial: Testimonial; compact?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const truncateAt = compact ? Infinity : SOLO_TRUNCATE;
  const needsTruncation = !compact && testimonial.quote.length > truncateAt;

  const displayText =
    needsTruncation && !expanded
      ? testimonial.quote.slice(0, truncateAt).replace(/\s+\S*$/, "") + "…"
      : testimonial.quote;

  const highlightedContent = renderHighlightedQuote(displayText, testimonial.highlights);

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-emerald-200/14 bg-bg-950/55 backdrop-blur-[2px] transition-all duration-300",
        compact
          ? "flex-1 p-4 hover:border-emerald-200/30 hover:bg-bg-950/70"
          : "h-full p-5 hover:border-emerald-200/30 hover:bg-bg-950/70 sm:p-6",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(110,231,183,0.14),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">
        <p
          className={cn(
            "whitespace-pre-line text-mist-100/86",
            compact ? "text-[0.8rem] leading-6" : "text-sm leading-7",
          )}
        >
          &ldquo;{highlightedContent}&rdquo;
        </p>
        {needsTruncation && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-emerald-300/80 transition-colors hover:text-emerald-200"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      <p
        className={cn(
          "relative font-semibold uppercase tracking-[0.12em] text-emerald-200/70",
          compact ? "mt-2.5 text-[0.6rem]" : "mt-4 text-xs",
        )}
      >
        — {testimonial.attribution}
      </p>
    </article>
  );
}

export function TestimonialsRail({ testimonials, className }: TestimonialsRailProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slides = buildSlides(testimonials);
  const loopedSlides = [...slides, ...slides];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

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
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pauseThenResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY_MS);
  }, []);

  const moveRail = useCallback(
    (direction: 1 | -1) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      pauseThenResume();
      scroller.scrollBy({ left: direction * scroller.clientWidth * 0.7, behavior: "smooth" });
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
        <div className="flex w-max items-stretch gap-4">
          {loopedSlides.map((slide, i) =>
            slide.type === "solo" ? (
              <div
                key={`solo-${slide.item.attribution}-${i}`}
                className="w-[85vw] shrink-0 sm:w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[36vw]"
              >
                <TestimonialCard testimonial={slide.item} />
              </div>
            ) : (
              <div
                key={`stack-${slide.items.map((t) => t.attribution).join("-")}-${i}`}
                className="flex w-[85vw] shrink-0 flex-col gap-3 sm:w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[36vw]"
              >
                {slide.items.map((t) => (
                  <TestimonialCard key={t.attribution} testimonial={t} compact />
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
