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
 * Proportions measured from real supercar side-view references
 * (L/H ≈ 4.4, roof peak at ~59% of length, tight round wheel arches,
 * shoulder-to-rocker side intake). Original design — no production car traced.
 *
 * Closed = low-wedge silhouette. On scroll or hover the shell lifts into a
 * holographic wireframe revealing ECU network, central compute, OTA uplink,
 * sensors, battery platform, and the software stack.
 */

const BODY = `M 96 310 C 62 308 50 300 48 290 C 47 279 52 268 66 263 C 120 252 240 228 365 200 C 400 189 450 170 502 162 C 520 160 540 161 555 164 C 575 174 595 186 615 192 C 645 198 665 196 690 189 C 715 183 745 186 765 194 C 800 199 835 202 851 207 L 856 212 C 858 240 856 268 848 287 C 840 296 828 302 812 306 L 759 310 A 58 58 0 1 0 647 310 L 280 310 A 58 58 0 1 0 168 310 Z`;

const GLASS = `M 376 205 C 415 189 462 172 506 167 L 550 169 C 568 178 584 188 600 196 C 545 202 460 208 376 205 Z`;

const ECUS: Array<[number, string]> = [
  [296, "ECU-1"],
  [348, "ECU-2"],
  [512, "ECU-3"],
  [556, "ECU-4"],
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
      <circle cx={cx} cy={CY} r={41} fill="#0c0e12" />
      <circle cx={cx} cy={CY} r={20} fill="none" stroke="#1c2026" strokeWidth={5} />
      <path
        d={`M ${cx + 19} ${CY + 28} A 34 34 0 0 0 ${cx + 33} ${CY + 9}`}
        fill="none"
        stroke="#4ade80"
        strokeWidth={5}
        opacity={0.85}
      />
      {Array.from({ length: 5 }, (_, i) => {
        const a = ((i * 72 - 90) * Math.PI) / 180;
        return [a - 0.14, a + 0.14].map((s, j) => (
          <line
            key={`${i}-${j}`}
            x1={cx + 8 * Math.cos(s)}
            y1={CY + 8 * Math.sin(s)}
            x2={cx + 36 * Math.cos(s)}
            y2={CY + 36 * Math.sin(s)}
            stroke="#5a6272"
            strokeWidth={2.4}
          />
        ));
      })}
      <circle cx={cx} cy={CY} r={40} fill="none" stroke="#6a7383" strokeWidth={2.5} />
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
  const glassOp = useTransform(p, [0, 1], [0.4, 0.05]);
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

        <ellipse cx={450} cy={352} rx={350} ry={11} fill="#000" opacity={0.5} />
        <motion.ellipse cx={450} cy={346} rx={270} ry={6} fill="#4ade80" style={{ opacity: glowOp }} />

        {/* ===== INTERNALS ===== */}
        <motion.g style={{ opacity: internalsOp }}>
          <rect x={292} y={302} width={344} height={30} rx={8} fill="#12151c" stroke="#262b34" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <rect x={302 + i * 42} y={308} width={32} height={18} rx={3} fill="#161b24" stroke="#2b3140" />
              <circle cx={318 + i * 42} cy={317} r={2} fill="#4ade80" opacity={0.7} />
            </g>
          ))}

          <line
            className="v-dash"
            x1={290}
            y1={262}
            x2={640}
            y2={262}
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
            <rect x={404} y={228} width={94} height={52} rx={6} fill="#0d1320" stroke="#5ea2ff" />
            {Array.from({ length: 3 }, (_, i) => (
              <line key={i} x1={414} y1={240 + i * 11} x2={488} y2={240 + i * 11} stroke="#33517e" strokeWidth={1.4} />
            ))}
            <circle className="v-blink" cx={488} cy={236} r={2.4} fill="#5ea2ff" />
          </g>

          {/* roof lidar */}
          <rect x={508} y={150} width={32} height={10} rx={5} fill="#10141b" stroke="#4ade80" strokeOpacity={0.8} />
          <path className="v-pulse" d="M 502 138 A 50 50 0 0 1 546 138" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.6} />

          {/* front radar */}
          <circle cx={60} cy={272} r={3} fill="#4ade80" />
          <path className="v-pulse" d="M 44 256 A 26 26 0 0 0 44 288" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.55} />
          <path className="v-pulse" d="M 30 246 A 40 40 0 0 0 30 298" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.35} />

          {/* OTA fin + uplink */}
          <path d="M 742 190 q 10 -12 24 -9 l -4 9 z" fill="#10141b" stroke="#5ea2ff" strokeOpacity={0.8} />
          <path d="M 756 175 A 18 18 0 0 1 780 165" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.7} />
          <path d="M 762 159 A 30 30 0 0 1 800 145" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.45} />
          <line className="v-dash-slow" x1={782} y1={158} x2={828} y2={60} stroke="#5ea2ff" strokeWidth={1} strokeDasharray="4 7" opacity={0.6} />
          <g transform="translate(828 52)">
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
          <path d="M 300 121 L 404 240" stroke="#5ea2ff" strokeWidth={1} strokeDasharray="3 6" opacity={0.5} />
        </motion.g>

        {/* ===== WHEELS ===== */}
        <Wheel cx={224} />
        <Wheel cx={703} />

        {/* ===== BODY SHELL ===== */}
        <motion.g style={{ y: shellY }}>
          <motion.g style={{ opacity: shellOp }}>
            <path d={BODY} fill="url(#v-paint)" stroke="#3a3f4a" strokeWidth={1.5} />
            {/* fender volume shadows */}
            <path d="M 172 302 A 55 55 0 0 1 276 302" fill="none" stroke="#0c0e12" strokeWidth={7} opacity={0.65} />
            <path d="M 651 302 A 55 55 0 0 1 755 302" fill="none" stroke="#0c0e12" strokeWidth={7} opacity={0.65} />
            {/* rear hip light catch */}
            <path d="M 634 198 C 676 186 724 184 760 196" fill="none" stroke="#78828f" strokeWidth={1.5} opacity={0.75} />
            {/* engine deck slats */}
            <path d="M 626 198 L 646 194 M 652 197 L 672 193 M 678 196 L 698 191" stroke="#12151a" strokeWidth={2.5} />
            {/* diffuser fins */}
            <path d="M 788 297 L 790 309 M 808 294 L 810 307 M 828 291 L 830 304" stroke="#2e333d" strokeWidth={2} />
            {/* windshield/roof rim light */}
            <path d="M 380 196 C 430 176 470 165 505 163 C 528 161 543 162 552 165" fill="none" stroke="#828c9e" strokeWidth={1.6} opacity={0.75} />
            {/* rising scissor crease */}
            <path d="M 108 254 C 250 236 430 246 564 212" fill="none" stroke="#59626f" strokeWidth={1} opacity={0.6} />
            {/* signature angular side intake */}
            <path d="M 572 212 L 640 200 L 646 284 L 588 290 Z" fill="url(#v-carbon)" stroke="#1b1f27" strokeWidth={1} opacity={0.96} />
            <path d="M 580 224 L 636 213" stroke="#2e333d" strokeWidth={2.5} />
            <path d="M 583 244 L 640 233" stroke="#2e333d" strokeWidth={2.5} />
            <motion.path d={GLASS} fill="url(#v-glass)" style={{ fillOpacity: glassOp }} stroke="#6aa9c9" strokeOpacity={0.5} />
            {/* quarter-window divider */}
            <line x1={514} y1={167} x2={522} y2={190} stroke="#12151a" strokeWidth={3} opacity={0.85} />
            {/* angular door seam */}
            <path d="M 438 200 L 452 252 L 446 300" fill="none" stroke="#12151a" strokeWidth={1.6} opacity={0.9} />
            {/* mirror */}
            <path d="M 380 200 l -16 -10 q -9 -4 -6 3 l 6 10 z" fill="#20242c" stroke="#3a3f4a" strokeWidth={1} />
            {/* rocker / splitter / diffuser carbon */}
            <path d="M 286 302 L 642 302 L 644 310 L 284 310 Z" fill="url(#v-carbon)" opacity={0.9} />
            <path d="M 48 296 L 142 302 L 144 312 L 52 308 Z" fill="url(#v-carbon)" opacity={0.95} />
            <path d="M 766 300 L 846 288 L 842 306 L 772 312 Z" fill="url(#v-carbon)" opacity={0.95} />
            {/* DRL slash */}
            <path d="M 58 272 L 110 258" stroke="#7cd2ff" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowB)" />
            {/* tail light blade */}
            <path d="M 851 218 L 845 246" stroke="#4ade80" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowG)" />
            {/* ducktail lip */}
            <path d="M 830 200 L 852 208" stroke="#828c9e" strokeWidth={1.5} opacity={0.8} />
          </motion.g>
          {/* holographic wireframe twin */}
          <motion.g style={{ opacity: wireOp }}>
            <path d={BODY} fill="none" stroke="#4ade80" strokeWidth={1.2} strokeOpacity={0.85} filter="url(#v-glowG)" />
            <path d={GLASS} fill="none" stroke="#4ade80" strokeWidth={0.8} strokeOpacity={0.5} />
          </motion.g>
        </motion.g>

        {/* ===== ENGINEERING CALLOUTS ===== */}
        <motion.g style={{ opacity: labelsOp }} fontFamily="var(--font-mono)" fontSize={10} letterSpacing={1.5}>
          <line x1={310} y1={240} x2={238} y2={204} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={128} y={198} fill="#7de8a8">ECU MODULES</text>
          <line x1={451} y1={280} x2={451} y2={382} stroke="#5ea2ff" strokeWidth={0.8} opacity={0.5} />
          <text x={403} y={398} fill="#8db9f5">CENTRAL COMPUTE</text>
          <line x1={620} y1={262} x2={700} y2={230} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={704} y={226} fill="#7de8a8">CAN / AUTOMOTIVE ETHERNET</text>
          <text x={786} y={38} fill="#8db9f5">OTA UPLINK</text>
          <line x1={340} y1={316} x2={258} y2={354} stroke="#4ade80" strokeWidth={0.8} opacity={0.5} />
          <text x={128} y={368} fill="#7de8a8">BATTERY PLATFORM</text>
          <line x1={528} y1={150} x2={566} y2={108} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={572} y={104} fill="#7de8a8">SENSOR ARRAY</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
