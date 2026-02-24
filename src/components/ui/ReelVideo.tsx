"use client";

import { useMemo, useState, type MouseEventHandler } from "react";

type ReelVideoProps = {
  src: string;
  className?: string;
};

export function ReelVideo({ src, className }: ReelVideoProps) {
  const [isMuted, setIsMuted] = useState(true);

  const canHoverForAudio = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const handleMouseEnter: MouseEventHandler<HTMLVideoElement> = (event) => {
    if (!canHoverForAudio) {
      return;
    }

    event.currentTarget.muted = false;
    setIsMuted(false);
  };

  const handleMouseLeave: MouseEventHandler<HTMLVideoElement> = (event) => {
    if (!canHoverForAudio) {
      return;
    }

    event.currentTarget.muted = true;
    setIsMuted(true);
  };

  const handleToggleAudio: MouseEventHandler<HTMLButtonElement> = (event) => {
    const root = event.currentTarget.closest("[data-reel-root]");
    const video = root?.querySelector("video");

    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div data-reel-root className="absolute inset-0">
      <video
        className={className}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controls
        controlsList="nodownload"
        preload="metadata"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onVolumeChange={(event) => {
          setIsMuted(event.currentTarget.muted || event.currentTarget.volume === 0);
        }}
      />
      <button
        type="button"
        onClick={handleToggleAudio}
        className="absolute left-4 top-11 border border-mist-50/26 bg-bg-950/68 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-100 transition-colors hover:border-emerald-200/40 hover:text-emerald-100 sm:left-5 sm:top-12"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
