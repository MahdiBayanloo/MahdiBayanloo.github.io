"use client";

import { useEffect, useRef } from "react";

/**
 * The signature hero element: a phosphor-green oscilloscope trace sweeping
 * across the strip. Telemetry-style square pulses ride a slow sine carrier;
 * cursor proximity eases the amplitude up. Honors prefers-reduced-motion
 * by rendering a single static frame.
 */
export function ScopeTrace({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
    };
    const onLeave = () => (mouseX.current = null);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    /** Telemetry waveform: slow carrier + square data bursts. */
    const sample = (x: number, w: number, t: number) => {
      const carrier = Math.sin(x * 0.008 + t * 0.9) * 0.35;
      const burst =
        Math.sign(Math.sin(x * 0.05 + t * 2.1)) *
        (Math.sin(x * 0.002 + t * 0.4) > 0.2 ? 0.5 : 0.12);
      // cursor proximity gain (1 → 2.2 within ~140px)
      const mx = mouseX.current;
      const gain =
        mx === null ? 1 : 1 + 1.2 * Math.exp(-((x - mx) ** 2) / (2 * 140 ** 2));
      return (carrier + burst) * gain;
    };

    const draw = (t: number) => {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;
      const amp = h * 0.32;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = mid + sample(x, w, t) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(74, 222, 128, 0.55)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    if (reduced) {
      draw(0); // single static frame
    } else {
      const loop = (ms: number) => {
        if (!running) return;
        draw(ms / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`h-24 w-full opacity-60 ${className}`}
      aria-hidden
    />
  );
}
