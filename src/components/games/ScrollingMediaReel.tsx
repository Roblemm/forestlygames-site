"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ImageLightbox, type MediaItem } from "@/components/games/ImageLightbox";

function getMediaKind(src: string, kind?: "image" | "video"): "image" | "video" {
  if (kind) return kind;
  const ext = src.split(".").pop()?.toLowerCase();
  return ext === "mp4" || ext === "webm" || ext === "gif" ? "video" : "image";
}

function isVideoOrGif(item: MediaItem): boolean {
  return getMediaKind(item.src, item.kind) === "video";
}

function getNumberedBase(src: string): string | null {
  const match = src.match(/^(.+)[-_](\d+)(\.[a-z0-9]+)?$/i);
  return match ? match[1] : null;
}

function getNumberedNum(src: string): number {
  const match = src.match(/[-_](\d+)(\.[a-z0-9]+)?$/i);
  return match ? parseInt(match[1], 10) : 0;
}

function orderGalleryMedia(items: MediaItem[]): MediaItem[] {
  if (items.length === 0) return [];

  const videoFirst = [...items].sort((a, b) => {
    const aV = isVideoOrGif(a);
    const bV = isVideoOrGif(b);
    if (aV && !bV) return -1;
    if (!aV && bV) return 1;
    return 0;
  });

  const uniques: MediaItem[] = [];
  const byBase = new Map<string, MediaItem[]>();

  for (const item of videoFirst) {
    const base = getNumberedBase(item.src);
    if (!base) {
      uniques.push(item);
      continue;
    }
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base)!.push(item);
  }

  for (const [, group] of byBase) {
    if (group.length >= 2) {
      group.sort((a, b) => getNumberedNum(a.src) - getNumberedNum(b.src));
    } else {
      uniques.push(...group);
    }
  }

  const numberedGroups = [...byBase.entries()]
    .filter(([, g]) => g.length >= 2)
    .map(([, g]) => g);

  if (numberedGroups.length === 0) {
    return [...uniques];
  }

  const spread: MediaItem[] = [];
  let maxLen = Math.max(...numberedGroups.map((g) => g.length));
  for (let i = 0; i < maxLen; i++) {
    for (const g of numberedGroups) {
      if (i < g.length) spread.push(g[i]);
    }
  }
  return [...uniques, ...spread];
}

type AccentColor = "gold" | "emerald" | "azure" | "moss";

const RESUME_DELAY_MS = 2600;
const PX_PER_SECOND = 24;
const FALLBACK_DURATION_S = 60;

const borderByAccent: Record<AccentColor, string> = {
  gold: "border-gold-300/18",
  emerald: "border-emerald-200/18",
  azure: "border-azure-300/18",
  moss: "border-emerald-200/16",
};

const hoverGlowByAccent: Record<AccentColor, string> = {
  gold: "hover:shadow-[0_8px_28px_-6px_rgba(222,186,120,0.22)]",
  emerald: "hover:shadow-[0_8px_28px_-6px_rgba(95,202,148,0.2)]",
  azure: "hover:shadow-[0_8px_28px_-6px_rgba(121,201,255,0.22)]",
  moss: "hover:shadow-[0_8px_28px_-6px_rgba(85,190,136,0.18)]",
};

const IN_VIEW_RATIO = 0.2;
const OUT_VIEW_RATIO = 0.08;

const REEL_IN_VIEW_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: [0, 0.05, 0.1, OUT_VIEW_RATIO, IN_VIEW_RATIO, 0.3, 0.5, 1],
};

export function ScrollingMediaReel({
  images,
  accent,
  rows = 1,
}: {
  images: MediaItem[];
  accent: AccentColor;
  rows?: 1 | 2;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isReelInView, setIsReelInView] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [durationSec, setDurationSec] = useState(FALLBACK_DURATION_S);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const orderedImages = orderGalleryMedia(images);
  const loopedImages = [...orderedImages, ...orderedImages];
  const isTwoRows = rows === 2;
  const half = Math.ceil(orderedImages.length / 2);
  const row1Items = orderedImages.slice(0, half);
  const row2Items = orderedImages.slice(half);

  const isActive = isReelInView && !isPaused && !prefersReducedMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const fn = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // Duration from track width so pixel speed is constant across reels
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateDuration = () => {
      const loopWidthPx = track.scrollWidth / 2;
      if (loopWidthPx > 0) {
        setDurationSec(Math.max(30, loopWidthPx / PX_PER_SECOND));
      }
    };

    updateDuration();
    const ro = new ResizeObserver(updateDuration);
    ro.observe(track);
    return () => ro.disconnect();
  }, [isTwoRows]);

  // Observe the whole reel block (wrapper) for "in view"
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const ratio = entry.intersectionRatio;
        setIsReelInView((prev) => {
          if (ratio >= IN_VIEW_RATIO) return true;
          if (ratio < OUT_VIEW_RATIO) return false;
          return prev;
        });
      }
    }, REEL_IN_VIEW_OPTIONS);

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Play/pause reel videos when section enters/leaves view
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const videos = wrapper.querySelectorAll<HTMLVideoElement>("video");
    if (isReelInView) {
      videos.forEach((v) => {
        v.play().catch(() => {});
      });
    } else {
      videos.forEach((v) => v.pause());
    }
  }, [isReelInView]);

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
      pauseThenResume();
      setNudge((prev) => prev + direction * Math.max(5, Math.floor(durationSec / 6)));
    },
    [pauseThenResume, durationSec],
  );

  const renderCard = useCallback(
    (item: MediaItem, index: number) => {
      const parts = item.alt.split("|").map((part) => part.trim());
      const title = parts[0] ?? "Project media";
      const note = parts[1] ?? "Captured from production footage.";
      const isVideo = getMediaKind(item.src, item.kind) === "video";
      return (
        <ImageLightbox key={`${item.src}-${index}`} image={item}>
          <figure
            className={`games-frame group relative aspect-video w-[min(78vw,22rem)] shrink-0 cursor-pointer overflow-hidden border bg-bg-900/30 transition-all duration-300 hover:-translate-y-0.5 sm:w-[17.5rem] lg:w-[18.5rem] ${borderByAccent[accent]} ${hoverGlowByAccent[accent]}`}
          >
            {isVideo ? (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <Image
                src={item.src}
                alt={title}
                fill
                sizes="(min-width:1280px) 23rem, (min-width:640px) 22rem, 84vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-950/80 via-bg-950/18 to-transparent" />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
              <p className="font-display text-[0.94rem] leading-none text-mist-50">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-mist-100/78">{note}</p>
            </figcaption>
          </figure>
        </ImageLightbox>
      );
    },
    [accent],
  );

  return (
    <div ref={wrapperRef}>
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
        className="games-reel-scroll media-rail-mask overflow-x-hidden pb-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="media-rail-track flex w-max gap-4 pr-2"
          style={{
            animationDuration: `${durationSec}s`,
            animationDelay: `${-(nudge % Math.max(1, durationSec))}s`,
            animationPlayState: isActive ? "running" : "paused",
          }}
        >
          {isTwoRows ? (
            <>
              <div className="flex shrink-0 flex-col gap-3 pr-2">
                <div className="flex w-max gap-4">{row1Items.map((item, i) => renderCard(item, i))}</div>
                <div className="flex w-max gap-4">{row2Items.map((item, i) => renderCard(item, half + i))}</div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 pr-2">
                <div className="flex w-max gap-4">{row1Items.map((item, i) => renderCard(item, orderedImages.length + i))}</div>
                <div className="flex w-max gap-4">{row2Items.map((item, i) => renderCard(item, orderedImages.length + half + i))}</div>
              </div>
            </>
          ) : (
            loopedImages.map((item, index) => renderCard(item, index))
          )}
        </div>
      </div>
    </div>
  );
}
