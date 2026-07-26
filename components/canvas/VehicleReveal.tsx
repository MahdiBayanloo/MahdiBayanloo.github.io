"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * The signature centerpiece: a conceptual software-defined vehicle.
 * Closed = premium EV silhouette. As the user scrolls or hovers, the body
 * shell lifts into a holographic wireframe and the vehicle's software
 * architecture is revealed: ECU network, central compute, OTA uplink,
 * sensor array, battery platform, software stack.
 *
 * Pure SVG — no 3D assets, no external requests. Fictional design; not
 * based on any production car.
 */

const BODY = `M 84 296 C 76 280 74 258 88 248 C 106 238 150 228 210 219 C 262 211 296 208 314 204 C 336 199 352 170 396 157 C 432 147 472 143 520 143 C 572 143 622 150 662 167 C 702 184 746 202 776 221 C 794 233 800 249 801 263 C 802 281 796 290 776 292 L 741 293 A 62 62 0 0 0 609 293 L 291 293 A 62 62 0 0 0 159 293 L 96 294 Z`;

const GLASS = `M 332 202 C 352 176 398 161 434 155 C 486 147 556 148 606 157 C 632 162 652 170 666 179 L 648 196 C 560 188 430 190 356 200 Z`;

const ECUS: Array<[number, string]> = [
  [300, "ECU-1"],
  [354, "ECU-2"],
  [518, "ECU-3"],
  [562, "ECU-4"],
];

const STACK: Array<[string, number, string]> = [
  ["APPLICATION", 64, "#5ea2ff"],
  ["MIDDLEWARE", 88, "#7de8a8"],
  ["RTOS / OS", 112, "#4ade80"],
];

function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      <circle cx={cx} cy={302} r={49} fill="#0d0f13" stroke="#2a2e37" strokeWidth={2} />
      <circle cx={cx} cy={302} r={27} fill="#0b0d11" stroke="#3a3f4a" strokeWidth={1.5} />
      <circle cx={cx} cy={302} r={31} fill="none" stroke="#4ade80" strokeOpacity={0.18} strokeWidth={1.5} />
      {Array.from({ length: 5 }, (_, i) => {
        const a = ((i * 72 - 18) * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx + 8 * Math.cos(a)}
            y1={302 + 8 * Math.sin(a)}
            x2={cx + 25 * Math.cos(a)}
            y2={302 + 25 * Math.sin(a)}
            stroke="#3a3f4a"
            strokeWidth={3}
          />
        );
      })}
      <circle cx={cx} cy={302} r={4.5} fill="#23262e" />
    </g>
  );
}

export function VehicleReveal({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Opens as the hero scrolls away…
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "start 0.15"],
  });
  // …or when the visitor reaches in with the cursor.
  const hover = useMotionValue(0);
  const combined = useTransform(() => Math.max(scrollYProgress.get(), hover.get()));
  const spring = useSpring(combined, { stiffness: 65, damping: 18 });
  // Reduced motion → permanently open engineering view.
  const staticOpen = useMotionValue(1);
  const p = reduced ? staticOpen : spring;

  const shellY = useTransform(p, [0, 1], [0, -46]);
  const shellOp = useTransform(p, [0, 1], [1, 0.08]);
  const wireOp = useTransform(p, [0, 1], [0, 0.9]);
  const glassOp = useTransform(p, [0, 1], [0.16, 0.03]);
  const internalsOp = useTransform(p, [0.15, 0.7], [0, 1]);
  const labelsOp = useTransform(p, [0.55, 0.95], [0, 1]);
  const stackOp = useTransform(p, [0.35, 0.85], [0, 1]);
  const stackY = useTransform(p, [0, 0.7], [30, 0]);
  const glowOp = useTransform(p, [0, 1], [0.07, 0.16]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerEnter={() => hover.set(1)}
      onPointerLeave={() => hover.set(0)}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={mounted ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 900 420"
        className="h-auto w-full"
        role="img"
        aria-label="Conceptual software-defined vehicle: body opens to reveal ECU network, central compute, OTA uplink, sensors, and software stack"
      >
        <defs>
          <linearGradient id="v-paint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a414c" />
            <stop offset="0.4" stopColor="#20242c" />
            <stop offset="1" stopColor="#12141a" />
          </linearGradient>
          <linearGradient id="v-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fd7ff" />
            <stop offset="1" stopColor="#2b4a66" />
          </linearGradient>
          <pattern id="v-carbon" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#0c0e12" />
            <path d="M0 6 L6 0" stroke="#1b1f27" strokeWidth="1.4" />
          </pattern>
          <filter id="v-glowG">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="v-glowB">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ground shadow + underglow */}
        <ellipse cx={450} cy={352} rx={330} ry={12} fill="#000" opacity={0.5} />
        <motion.ellipse cx={450} cy={344} rx={250} ry={7} fill="#4ade80" style={{ opacity: glowOp }} />

        {/* ===== INTERNALS ===== */}
        <motion.g style={{ opacity: internalsOp }}>
          {/* battery platform */}
          <rect x={288} y={298} width={324} height={34} rx={8} fill="#12151c" stroke="#262b34" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <rect x={300 + i * 38} y={304} width={30} height={22} rx={3} fill="#161b24" stroke="#2b3140" />
              <circle cx={315 + i * 38} cy={315} r={2} fill="#4ade80" opacity={0.7} />
            </g>
          ))}

          {/* CAN / ethernet backbone — dashes flow */}
          <line
            className="v-dash"
            x1={298}
            y1={262}
            x2={606}
            y2={262}
            stroke="#4ade80"
            strokeWidth={1.6}
            strokeDasharray="7 9"
            filter="url(#v-glowG)"
            opacity={0.8}
          />

          {/* ECU modules */}
          {ECUS.map(([x, id]) => (
            <g key={id}>
              <rect x={x} y={238} width={42} height={36} rx={4} fill="#0e1218" stroke="#3ddc84" strokeOpacity={0.7} />
              <line x1={x + 7} y1={246} x2={x + 35} y2={246} stroke="#2f9e63" strokeWidth={1} />
              <line x1={x + 7} y1={253} x2={x + 35} y2={253} stroke="#2f9e63" strokeWidth={1} opacity={0.6} />
              <text x={x + 21} y={268} fill="#7de8a8" fontFamily="var(--font-mono)" fontSize={9} textAnchor="middle">
                {id}
              </text>
            </g>
          ))}

          {/* central compute */}
          <g filter="url(#v-glowB)">
            <rect x={412} y={226} width={96} height={52} rx={6} fill="#0d1320" stroke="#5ea2ff" />
            {Array.from({ length: 3 }, (_, i) => (
              <line key={i} x1={422} y1={238 + i * 11} x2={498} y2={238 + i * 11} stroke="#33517e" strokeWidth={1.4} />
            ))}
            <circle className="v-blink" cx={498} cy={234} r={2.4} fill="#5ea2ff" />
          </g>

          {/* roof lidar */}
          <rect x={428} y={132} width={40} height={11} rx={5} fill="#10141b" stroke="#4ade80" strokeOpacity={0.8} />
          <path className="v-pulse" d="M 420 120 A 60 60 0 0 1 476 120" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.6} />

          {/* front radar */}
          <circle cx={92} cy={252} r={3} fill="#4ade80" />
          <path className="v-pulse" d="M 74 236 A 26 26 0 0 0 74 268" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.55} />
          <path className="v-pulse" d="M 60 226 A 40 40 0 0 0 60 278" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.35} />

          {/* OTA fin + uplink */}
          <path d="M 552 143 q 10 -12 24 -9 l -4 9 z" fill="#10141b" stroke="#5ea2ff" strokeOpacity={0.8} />
          <path d="M 566 128 A 18 18 0 0 1 590 118" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.7} />
          <path d="M 572 112 A 30 30 0 0 1 610 98" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.45} />
          <line className="v-dash-slow" x1={596} y1={112} x2={742} y2={52} stroke="#5ea2ff" strokeWidth={1} strokeDasharray="4 7" opacity={0.6} />
          <g transform="translate(742 44)">
            <rect x={-7} y={-6} width={14} height={12} rx={2} fill="#0d1320" stroke="#5ea2ff" />
            <rect x={-22} y={-3} width={12} height={6} fill="#0d1320" stroke="#5ea2ff" strokeOpacity={0.7} />
            <rect x={10} y={-3} width={12} height={6} fill="#0d1320" stroke="#5ea2ff" strokeOpacity={0.7} />
          </g>
        </motion.g>

        {/* software stack hologram */}
        <motion.g style={{ opacity: stackOp, y: stackY }}>
          {STACK.map(([t, y, c]) => (
            <g key={t}>
              <rect x={180} y={y} width={150} height={17} rx={4} fill="#0d1118" fillOpacity={0.75} stroke={c} strokeOpacity={0.6} />
              <text x={190} y={y + 12} fill={c} fontFamily="var(--font-mono)" fontSize={9} letterSpacing={1}>
                {t}
              </text>
            </g>
          ))}
          <path d="M 330 121 L 412 240" stroke="#5ea2ff" strokeWidth={1} strokeDasharray="3 6" opacity={0.5} />
        </motion.g>

        {/* ===== WHEELS ===== */}
        <Wheel cx={225} />
        <Wheel cx={675} />

        {/* ===== BODY SHELL ===== */}
        <motion.g style={{ y: shellY }}>
          <motion.g style={{ opacity: shellOp }}>
            <path d={BODY} fill="url(#v-paint)" stroke="#3a3f4a" strokeWidth={1.5} />
            <path d="M 340 172 C 400 152 480 146 528 146 C 580 146 626 153 660 167" fill="none" stroke="#828c9e" strokeWidth={1.6} opacity={0.75} />
            <path d="M 150 244 C 320 226 560 224 744 246" fill="none" stroke="#59626f" strokeWidth={1} opacity={0.5} />
            <motion.path d={GLASS} fill="url(#v-glass)" style={{ fillOpacity: glassOp }} stroke="#6aa9c9" strokeOpacity={0.4} />
            <line x1={500} y1={152} x2={512} y2={200} stroke="#12151a" strokeWidth={4} opacity={0.8} />
            <path d="M 452 204 C 456 232 458 258 456 288" fill="none" stroke="#12151a" strokeWidth={1.6} opacity={0.9} />
            <rect x={470} y={216} width={26} height={3.5} rx={1.75} fill="#454b57" />
            <path d="M 330 196 l -14 -8 q -8 -4 -6 3 l 4 9 z" fill="#20242c" stroke="#3a3f4a" strokeWidth={1} />
            <path d="M 296 282 L 604 282 L 604 292 L 296 292 Z" fill="url(#v-carbon)" opacity={0.85} />
            <path d="M 86 252 L 152 240" stroke="#7cd2ff" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowB)" />
            <path d="M 798 254 L 780 236" stroke="#4ade80" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowG)" />
            <path d="M 320 206 C 480 196 620 200 700 214" fill="none" stroke="#454b57" strokeWidth={1} />
          </motion.g>
          {/* holographic wireframe twin */}
          <motion.g style={{ opacity: wireOp }}>
            <path d={BODY} fill="none" stroke="#4ade80" strokeWidth={1.2} strokeOpacity={0.85} filter="url(#v-glowG)" />
            <path d={GLASS} fill="none" stroke="#4ade80" strokeWidth={0.8} strokeOpacity={0.5} />
          </motion.g>
        </motion.g>

        {/* ===== ENGINEERING CALLOUTS ===== */}
        <motion.g style={{ opacity: labelsOp }} fontFamily="var(--font-mono)" fontSize={10} letterSpacing={1.5}>
          <line x1={315} y1={238} x2={240} y2={200} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={130} y={194} fill="#7de8a8">ECU MODULES</text>
          <line x1={460} y1={278} x2={460} y2={382} stroke="#5ea2ff" strokeWidth={0.8} opacity={0.5} />
          <text x={412} y={398} fill="#8db9f5">CENTRAL COMPUTE</text>
          <line x1={590} y1={262} x2={688} y2={228} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={692} y={224} fill="#7de8a8">CAN / AUTOMOTIVE ETHERNET</text>
          <text x={700} y={34} fill="#8db9f5">OTA UPLINK</text>
          <line x1={330} y1={316} x2={250} y2={352} stroke="#4ade80" strokeWidth={0.8} opacity={0.5} />
          <text x={120} y={366} fill="#7de8a8">BATTERY PLATFORM</text>
          <line x1={452} y1={132} x2={500} y2={98} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={506} y={94} fill="#7de8a8">SENSOR ARRAY</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
