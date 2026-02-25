"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface RotatingPhrase {
  text: string;
  color: "emerald" | "gold" | "azure";
}

export interface TypewriterSequence {
  prefix: string;
  phrases: RotatingPhrase[];
}

interface TypewriterHeadlineProps extends Omit<React.ComponentPropsWithoutRef<"h1">, "children"> {
  sequences: TypewriterSequence[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  pauseBeforeWipe?: number;
  wipeSpeed?: number;
}

const colorClasses: Record<RotatingPhrase["color"], { text: string; cursor: string }> = {
  emerald: { text: "text-emerald-300", cursor: "bg-emerald-300" },
  gold: { text: "text-gold-300", cursor: "bg-gold-300" },
  azure: { text: "text-azure-300", cursor: "bg-azure-300" },
};

type Phase =
  | "typing-phrase"
  | "pausing"
  | "deleting-phrase"
  | "pause-between"
  | "pause-before-wipe"
  | "wiping-all"
  | "pause-after-wipe";

export function TypewriterHeadline({
  sequences,
  className,
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseAfterType = 2200,
  pauseAfterDelete = 400,
  pauseBeforeWipe = 800,
  wipeSpeed = 25,
  ...rest
}: TypewriterHeadlineProps) {
  const [seqIdx, setSeqIdx] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing-phrase");
  const [prefixVisible, setPrefixVisible] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useRef(false);

  const seq = sequences[seqIdx];
  const phrase = seq.phrases[phraseIdx];
  const fullPrefix = seq.prefix + " ";
  const colors = colorClasses[phrase.color];
  const isLastPhrase = phraseIdx === seq.phrases.length - 1;

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      setPrefixVisible(fullPrefix.length);
      setPhraseVisible(phrase.text.length);
    }
  }, [fullPrefix.length, phrase.text.length]);

  useEffect(() => {
    if (reducedMotion.current) return;

    const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };
    clear();

    switch (phase) {
      case "typing-phrase": {
        if (prefixVisible < fullPrefix.length) {
          timerRef.current = setTimeout(() => setPrefixVisible((v) => v + 1), typeSpeed);
        } else if (phraseVisible < phrase.text.length) {
          timerRef.current = setTimeout(() => setPhraseVisible((v) => v + 1), typeSpeed);
        } else {
          timerRef.current = setTimeout(() => setPhase("pausing"), 0);
        }
        break;
      }
      case "pausing": {
        timerRef.current = setTimeout(() => {
          if (isLastPhrase) {
            setPhase("pause-before-wipe");
          } else {
            setPhase("deleting-phrase");
          }
        }, pauseAfterType);
        break;
      }
      case "deleting-phrase": {
        if (phraseVisible > 0) {
          timerRef.current = setTimeout(() => setPhraseVisible((v) => v - 1), deleteSpeed);
        } else {
          timerRef.current = setTimeout(() => {
            setPhraseIdx((i) => i + 1);
            setPhase("pause-between");
          }, 0);
        }
        break;
      }
      case "pause-between": {
        timerRef.current = setTimeout(() => setPhase("typing-phrase"), pauseAfterDelete);
        break;
      }
      case "pause-before-wipe": {
        timerRef.current = setTimeout(() => setPhase("wiping-all"), pauseBeforeWipe);
        break;
      }
      case "wiping-all": {
        if (phraseVisible > 0) {
          timerRef.current = setTimeout(() => setPhraseVisible((v) => v - 1), wipeSpeed);
        } else if (prefixVisible > 0) {
          timerRef.current = setTimeout(() => setPrefixVisible((v) => v - 1), wipeSpeed);
        } else {
          timerRef.current = setTimeout(() => setPhase("pause-after-wipe"), 0);
        }
        break;
      }
      case "pause-after-wipe": {
        timerRef.current = setTimeout(() => {
          const nextSeq = (seqIdx + 1) % sequences.length;
          setSeqIdx(nextSeq);
          setPhraseIdx(0);
          setPrefixVisible(0);
          setPhraseVisible(0);
          setPhase("typing-phrase");
        }, pauseAfterDelete);
        break;
      }
    }

    return clear;
  }, [
    phase, prefixVisible, phraseVisible, fullPrefix.length, phrase.text.length,
    isLastPhrase, seqIdx, sequences.length, typeSpeed, deleteSpeed,
    pauseAfterType, pauseAfterDelete, pauseBeforeWipe, wipeSpeed,
  ]);

  const prefixText = fullPrefix.slice(0, prefixVisible);
  const phraseText = phrase.text.slice(0, phraseVisible);
  const isWiping = phase === "wiping-all" || phase === "pause-before-wipe";
  const cursorColor = isWiping && prefixVisible > 0 && phraseVisible === 0
    ? "bg-mist-50"
    : colors.cursor;

  return (
    <h1 className={className} {...rest}>
      <span>{prefixText}</span>
      <span className={cn("transition-colors duration-300", colors.text)}>
        {phraseText}
      </span>
      <span
        className={cn(
          "ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] rounded-full transition-colors duration-300 animate-[cursorBlink_0.8s_steps(2)_infinite]",
          cursorColor,
        )}
        aria-hidden
      />
    </h1>
  );
}
