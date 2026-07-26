"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * The timeline's signal trace: a phosphor-green line that draws itself down
 * the spine as the section scrolls through the viewport.
 * Rendered inside a `relative` container with a static `border-l` fallback.
 */
export function SpineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="pointer-events-none absolute -left-px inset-y-0" aria-hidden>
      <motion.div
        className="h-full w-px origin-top bg-signal shadow-[0_0_8px_rgba(74,222,128,0.6)]"
        style={{ scaleY: reduced ? 1 : scaleY }}
      />
    </div>
  );
}
