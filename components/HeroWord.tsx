"use client";

import { useEffect, useState } from "react";

/**
 * The cycling word in the landing page's h1: "Your church" widens one step
 * at a time (ministry, nonprofit, business) and settles on "organization".
 *
 * - It starts on "church", which is what the server renders, so first paint,
 *   link previews, and crawlers all see the original headline.
 * - It plays once per browser session, then renders settled. With reduced
 *   motion it goes straight to the settled word.
 * - It stops rather than loops, so it needs no pause control (WCAG 2.2.2).
 * - It is aria-hidden; the h1's aria-label carries the full sentence, so a
 *   screen reader never hears the swaps.
 */
const WORDS = ["church", "ministry", "nonprofit", "business", "organization"];
const LAST = WORDS.length - 1;
const BEAT_MS = 900;
const OUT_MS = 240;
const PLAYED_KEY = "raifc-hero-played-v1";

type Phase = "in" | "out" | "enter";

const PHASE_STYLE: Record<Phase, React.CSSProperties> = {
  in: { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
  out: { opacity: 0, transform: "translateY(-0.2em)", filter: "blur(6px)" },
  enter: { opacity: 0, transform: "translateY(0.26em)", filter: "blur(6px)" },
};

export default function HeroWord() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("in");
  // Settling without the cycle (reduced motion, or already played) should
  // not draw the underline in either.
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    let played = false;
    try {
      played = window.sessionStorage.getItem(PLAYED_KEY) === "1";
    } catch {
      /* storage unavailable: play it */
    }
    if (played || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setIndex(LAST);
      return;
    }

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    // Fade and blur out, swap while invisible (so the re-centred line never
    // visibly slides), then rise back in.
    const step = (next: number) => {
      setPhase("out");
      later(() => {
        setIndex(next);
        setPhase("enter");
        later(() => {
          setPhase("in");
          if (next < LAST) {
            later(() => step(next + 1), BEAT_MS);
          } else {
            // Marked only once it has finished, so React's development-mode
            // double effect (and leaving mid-animation) doesn't skip it.
            try {
              window.sessionStorage.setItem(PLAYED_KEY, "1");
            } catch {
              /* nothing to remember it in */
            }
          }
        }, 40);
      }, OUT_MS);
    };

    later(() => step(1), 400 + BEAT_MS);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const settled = index === LAST && phase === "in";

  return (
    <span aria-hidden="true" className="relative isolate inline-block">
      <span
        className="inline-block font-serif font-semibold italic tracking-[-0.01em] text-brand"
        style={{
          ...PHASE_STYLE[phase],
          transition: instant
            ? "none"
            : "opacity 240ms ease, transform 320ms cubic-bezier(.2,.7,.2,1), filter 240ms ease",
        }}
      >
        {WORDS[index]}
      </span>
      <span
        className="absolute bottom-[0.08em] left-0 -z-10 h-[0.16em] rounded-sm bg-accent/25"
        style={{
          width: settled ? "100%" : "0%",
          transition: instant ? "none" : "width 700ms cubic-bezier(.2,.7,.2,1) 120ms",
        }}
      />
    </span>
  );
}
