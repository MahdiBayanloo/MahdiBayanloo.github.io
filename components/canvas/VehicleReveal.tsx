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
 * The signature centerpiece: a conceptual software-defined supercar.
 * Closed = low-wedge supersport silhouette. On scroll or hover the body
 * shell lifts into a holographic wireframe revealing the vehicle's software
 * architecture: ECU network, central compute, OTA uplink, sensor array,
 * battery platform, software stack.
 *
 * Pure SVG — no 3D assets. Original fictional design; no production car copied.
 */

const BODY = `M 92 292 C 62 290 52 284 52 276 C 52 264 66 256 92 250 C 118 245 148 241 182 237 C 222 231 258 226 288 221 C 312 213 340 191 382 176 C 412 167 446 163 478 163 C 510 163 542 170 572 182 C 606 196 640 206 676 212 C 712 216 758 218 786 220 L 800 216 L 806 222 C 810 240 806 258 796 268 C 788 280 776 288 758 292 A 56 56 0 0 0 642 292 L 243 292 A 56 56 0 0 0 127 292 Z`;

const GLASS = `M 318 214 C 342 199 370 183 404 174 C 430 167 460 165 480 165 C 508 165 534 171 560 181 C 576 187 588 194 596 200 C 540 194 470 194 420 199 C 380 203 344 209 318 214 Z`;

const ECUS: Array<[number, string]> = [
  [298, "ECU-1"],
  [350, "ECU-2"],
  [514, "ECU-3"],
  [558, "ECU-4"],
];

const STACK: Array<[string, number, string]> = [
  ["APPLICATION", 64, "#5ea2ff"],
  ["MIDDLEWARE", 88, "#7de8a8"],
  ["RTOS / OS", 112, "#4ade80"],
];

function Wheel({ cx }: { cx: number }) {
  const CY = 294;
  return (
    <g>
      <circle cx={cx} cy={CY} r={50} fill="#14171d" stroke="#343a45" strokeWidth={2.5} />
      <circle cx={cx} cy={CY} r={39} fill="#0c0e12" />
      <circle cx={cx} cy={CY} r={20} fill="none" stroke="#1c2026" strokeWidth={5} />
      <path
        d={`M ${cx + 18} ${CY + 27} A 32 32 0 0 0 ${cx + 31} ${CY + 9}`}
        fill="none"
        stroke="#4ade80"
        strokeWidth={5}
        opacity={0.85}
      />
      {Array.from({ length: 5 }, (_, i) => {
        const a = ((i * 72 - 90) * Math.PI) / 180;
        return [a - 0.15, a + 0.15].map((s, j) => (
          <line
            key={`${i}-${j}`}
            x1={cx + 8 * Math.cos(s)}
            y1={CY + 8 * Math.sin(s)}
            x2={cx + 34 * Math.cos(s)}
            y2={CY + 34 * Math.sin(s)}
            stroke="#5a6272"
            strokeWidth={2.6}
          />
        ));
      })}
      <circle cx={cx} cy={CY} r={38} fill="none" stroke="#6a7383" strokeWidth={2.5} />
      <circle cx={cx} cy={CY} r={6} fill="#191c22" stroke="#6a7383" strokeWidth={1.5} />
    </g>
  );
}

export function VehicleReveal({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "start 0.15"],
  });
  const hover = useMotionValue(0);
  const combined = useTransform(() => Math.max(scrollYProgress.get(), hover.get()));
  const spring = useSpring(combined, { stiffness: 65, damping: 18 });
  const staticOpen = useMotionValue(1);
  const p = reduced ? staticOpen : spring;

  const shellY = useTransform(p, [0, 1], [0, -46]);
  const shellOp = useTransform(p, [0, 1], [1, 0.08]);
  const wireOp = useTransform(p, [0, 1], [0, 0.9]);
  const glassOp = useTransform(p, [0, 1], [0.35, 0.04]);
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
        aria-label="Conceptual software-defined supercar: body opens to reveal ECU network, central compute, OTA uplink, sensors, and software stack"
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

        <ellipse cx={450} cy={352} rx={340} ry={11} fill="#000" opacity={0.5} />
        <motion.ellipse cx={450} cy={344} rx={260} ry={6} fill="#4ade80" style={{ opacity: glowOp }} />

        {/* ===== INTERNALS ===== */}
        <motion.g style={{ opacity: internalsOp }}>
          <rect x={290} y={300} width={316} height={32} rx={8} fill="#12151c" stroke="#262b34" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <rect x={300 + i * 38} y={306} width={30} height={20} rx={3} fill="#161b24" stroke="#2b3140" />
              <circle cx={315 + i * 38} cy={316} r={2} fill="#4ade80" opacity={0.7} />
            </g>
          ))}

          <line
            className="v-dash"
            x1={296}
            y1={264}
            x2={602}
            y2={264}
            stroke="#4ade80"
            strokeWidth={1.6}
            strokeDasharray="7 9"
            filter="url(#v-glowG)"
            opacity={0.8}
          />

          {ECUS.map(([x, id]) => (
            <g key={id}>
              <rect x={x} y={240} width={42} height={36} rx={4} fill="#0e1218" stroke="#3ddc84" strokeOpacity={0.7} />
              <line x1={x + 7} y1={248} x2={x + 35} y2={248} stroke="#2f9e63" strokeWidth={1} />
              <line x1={x + 7} y1={255} x2={x + 35} y2={255} stroke="#2f9e63" strokeWidth={1} opacity={0.6} />
              <text x={x + 21} y={270} fill="#7de8a8" fontFamily="var(--font-mono)" fontSize={9} textAnchor="middle">
                {id}
              </text>
            </g>
          ))}

          <g filter="url(#v-glowB)">
            <rect x={406} y={228} width={94} height={52} rx={6} fill="#0d1320" stroke="#5ea2ff" />
            {Array.from({ length: 3 }, (_, i) => (
              <line key={i} x1={416} y1={240 + i * 11} x2={490} y2={240 + i * 11} stroke="#33517e" strokeWidth={1.4} />
            ))}
            <circle className="v-blink" cx={490} cy={236} r={2.4} fill="#5ea2ff" />
          </g>

          {/* roof lidar */}
          <rect x={440} y={148} width={36} height={10} rx={5} fill="#10141b" stroke="#4ade80" strokeOpacity={0.8} />
          <path className="v-pulse" d="M 434 136 A 55 55 0 0 1 482 136" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.6} />

          {/* front radar */}
          <circle cx={70} cy={266} r={3} fill="#4ade80" />
          <path className="v-pulse" d="M 52 250 A 26 26 0 0 0 52 282" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.55} />
          <path className="v-pulse" d="M 38 240 A 40 40 0 0 0 38 292" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.35} />

          {/* OTA fin on rear deck + uplink */}
          <path d="M 646 206 q 10 -12 24 -9 l -4 9 z" fill="#10141b" stroke="#5ea2ff" strokeOpacity={0.8} />
          <path d="M 660 191 A 18 18 0 0 1 684 181" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.7} />
          <path d="M 666 175 A 30 30 0 0 1 704 161" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.45} />
          <line className="v-dash-slow" x1={690} y1={174} x2={784} y2={58} stroke="#5ea2ff" strokeWidth={1} strokeDasharray="4 7" opacity={0.6} />
          <g transform="translate(784 50)">
            <rect x={-7} y={-6} width={14} height={12} rx={2} fill="#0d1320" stroke="#5ea2ff" />
            <rect x={-22} y={-3} width={12} height={6} fill="#0d1320" stroke="#5ea2ff" strokeOpacity={0.7} />
            <rect x={10} y={-3} width={12} height={6} fill="#0d1320" stroke="#5ea2ff" strokeOpacity={0.7} />
          </g>
        </motion.g>

        {/* software stack hologram */}
        <motion.g style={{ opacity: stackOp, y: stackY }}>
          {STACK.map(([t, y, c]) => (
            <g key={t}>
              <rect x={150} y={y} width={150} height={17} rx={4} fill="#0d1118" fillOpacity={0.75} stroke={c} strokeOpacity={0.6} />
              <text x={160} y={y + 12} fill={c} fontFamily="var(--font-mono)" fontSize={9} letterSpacing={1}>
                {t}
              </text>
            </g>
          ))}
          <path d="M 300 121 L 406 242" stroke="#5ea2ff" strokeWidth={1} strokeDasharray="3 6" opacity={0.5} />
        </motion.g>

        {/* ===== WHEELS ===== */}
        <Wheel cx={185} />
        <Wheel cx={700} />

        {/* ===== BODY SHELL ===== */}
        <motion.g style={{ y: shellY }}>
          <motion.g style={{ opacity: shellOp }}>
            <path d={BODY} fill="url(#v-paint)" stroke="#3a3f4a" strokeWidth={1.5} />
            {/* roof rim light */}
            <path d="M 364 186 C 410 172 448 165 476 165 C 508 165 538 172 566 183" fill="none" stroke="#828c9e" strokeWidth={1.6} opacity={0.75} />
            {/* wedge character line */}
            <path d="M 90 258 C 220 244 400 236 556 238" fill="none" stroke="#59626f" strokeWidth={1} opacity={0.55} />
            {/* side air intake */}
            <path d="M 566 240 L 626 233 L 632 276 L 576 279 Z" fill="url(#v-carbon)" stroke="#1b1f27" strokeWidth={1} opacity={0.95} />
            <path d="M 571 247 L 623 240" stroke="#2e333d" strokeWidth={2} />
            <path d="M 574 257 L 627 250" stroke="#2e333d" strokeWidth={2} />
            <motion.path d={GLASS} fill="url(#v-glass)" style={{ fillOpacity: glassOp }} stroke="#6aa9c9" strokeOpacity={0.5} />
            <line x1={462} y1={166} x2={470} y2={196} stroke="#12151a" strokeWidth={3} opacity={0.8} />
            {/* angular door seam */}
            <path d="M 430 198 L 446 252 L 442 288" fill="none" stroke="#12151a" strokeWidth={1.6} opacity={0.9} />
            {/* mirror */}
            <path d="M 336 206 l -16 -7 q -8 -3 -5 3 l 5 8 z" fill="#20242c" stroke="#3a3f4a" strokeWidth={1} />
            {/* rocker / splitter / diffuser carbon */}
            <path d="M 252 284 L 630 284 L 632 292 L 250 292 Z" fill="url(#v-carbon)" opacity={0.9} />
            <path d="M 54 283 L 118 279 L 120 292 L 58 294 Z" fill="url(#v-carbon)" opacity={0.95} />
            <path d="M 768 282 L 800 270 L 798 288 L 770 292 Z" fill="url(#v-carbon)" opacity={0.95} />
            {/* angular DRL slash */}
            <path d="M 66 258 L 122 246" stroke="#7cd2ff" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowB)" />
            {/* rear light blade */}
            <path d="M 803 228 L 796 254" stroke="#4ade80" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowG)" />
            {/* ducktail lip highlight */}
            <path d="M 786 220 L 800 216" stroke="#828c9e" strokeWidth={1.5} opacity={0.8} />
          </motion.g>
          {/* holographic wireframe twin */}
          <motion.g style={{ opacity: wireOp }}>
            <path d={BODY} fill="none" stroke="#4ade80" strokeWidth={1.2} strokeOpacity={0.85} filter="url(#v-glowG)" />
            <path d={GLASS} fill="none" stroke="#4ade80" strokeWidth={0.8} strokeOpacity={0.5} />
          </motion.g>
        </motion.g>

        {/* ===== ENGINEERING CALLOUTS ===== */}
        <motion.g style={{ opacity: labelsOp }} fontFamily="var(--font-mono)" fontSize={10} letterSpacing={1.5}>
          <line x1={312} y1={240} x2={240} y2={202} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={130} y={196} fill="#7de8a8">ECU MODULES</text>
          <line x1={452} y1={280} x2={452} y2={382} stroke="#5ea2ff" strokeWidth={0.8} opacity={0.5} />
          <text x={404} y={398} fill="#8db9f5">CENTRAL COMPUTE</text>
          <line x1={586} y1={264} x2={682} y2={234} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={686} y={230} fill="#7de8a8">CAN / AUTOMOTIVE ETHERNET</text>
          <text x={742} y={36} fill="#8db9f5">OTA UPLINK</text>
          <line x1={330} y1={316} x2={252} y2={352} stroke="#4ade80" strokeWidth={0.8} opacity={0.5} />
          <text x={122} y={366} fill="#7de8a8">BATTERY PLATFORM</text>
          <line x1={462} y1={148} x2={508} y2={108} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={514} y={104} fill="#7de8a8">SENSOR ARRAY</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
