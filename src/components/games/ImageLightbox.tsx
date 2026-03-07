"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type MediaItem = { src: string; alt: string; kind?: "image" | "video" };

function mediaKind(src: string, kind?: "image" | "video"): "image" | "video" {
  if (kind) return kind;
  const ext = src.split(".").pop()?.toLowerCase();
  return ext === "mp4" || ext === "webm" ? "video" : "image";
}

export function ImageLightbox({
  image,
  children,
  triggerClassName,
}: {
  image: MediaItem;
  children: React.ReactNode;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const kind = mediaKind(image.src, image.kind);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = open ? (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-bg-950/95 p-4"
      onClick={close}
      onKeyDown={(e) => e.key === "Enter" && close()}
      role="button"
      tabIndex={0}
      aria-label="Close expanded media"
    >
      {kind === "video" ? (
        <video
          src={image.src}
          controls
          autoPlay
          loop
          playsInline
          className="max-h-[90vh] max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[90vh] max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      )}
    </div>
  ) : null;

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950 ${triggerClassName ?? ""}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {children}
      </div>
      {open && typeof document !== "undefined" ? createPortal(overlay, document.body) : null}
    </>
  );
}
