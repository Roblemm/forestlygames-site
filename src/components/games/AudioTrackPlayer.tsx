"use client";

import type { CSSProperties } from "react";
import { useEffect, useId, useRef, useState } from "react";

type AccentColor = "gold" | "emerald" | "azure" | "moss";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "--:--";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remaining = totalSeconds % 60;
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export function AudioTrackPlayer({
  src,
  accent,
  label,
  durationSeconds,
}: {
  src: string;
  accent: AccentColor;
  label: string;
  durationSeconds?: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputId = useId();

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const resolvedDuration = duration > 0 ? duration : (durationSeconds ?? 0);
  const progressPercent =
    resolvedDuration > 0 ? `${(Math.min(position, resolvedDuration) / resolvedDuration) * 100}%` : "0%";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    // Force metadata fetch so duration shows before play in production browsers.
    audio.preload = "auto";
    audio.load();
  }, []);

  const syncDuration = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const handleSeek = (value: number) => {
    setPosition(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  return (
    <div className="games-player" data-accent={accent}>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setPosition(0);
        }}
        onLoadedMetadata={syncDuration}
        onDurationChange={syncDuration}
        onCanPlay={syncDuration}
        onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
      />

      <button
        type="button"
        onClick={togglePlay}
        className="games-player-button"
        aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 6h3v12H8zm5 0h3v12h-3z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="min-w-0">
        <label htmlFor={inputId} className="sr-only">
          Seek {label}
        </label>
        <input
          id={inputId}
          className="games-player-range"
          type="range"
          min={0}
          max={resolvedDuration || 1}
          step={0.1}
          value={Math.min(position, resolvedDuration || 0)}
          onChange={(event) => handleSeek(Number(event.target.value))}
          style={{ "--progress": progressPercent } as CSSProperties}
        />
      </div>

      <p className="games-player-time">
        {formatTime(position)} / {formatTime(resolvedDuration)}
      </p>
    </div>
  );
}
