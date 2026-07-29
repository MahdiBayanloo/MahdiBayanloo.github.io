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
 * The signature centerpiece: a software-defined supersport.
 * Body digitized point-by-point from a published supercar side-view
 * reference photo (wheelbase, roofline, scoop blade, tail — all measured).
 * Closed = showroom silhouette; scroll/hover lifts the shell into a
 * holographic wireframe revealing ECU network, central compute, OTA uplink,
 * sensors, battery platform, and the software stack.
 */

const BODY = `M 100 312 C 70 310 54 304 48 296 C 44 288 44 280 50 275 L 58 271 C 100 258 170 233 240 221 C 275 215 320 208 348 203 C 358 201 366 200 372 198 C 405 184 445 168 487 160 C 495 158 501 157 505 157 C 525 156 545 159 558 165 C 572 172 583 178 592 182 C 600 177 608 174 618 173 L 654 172 C 674 175 692 181 706 186 C 745 192 800 197 846 200 L 862 202 C 866 224 864 250 856 274 C 850 290 838 300 820 306 L 767 316 A 58 58 0 1 0 659 316 L 289 316 A 58 58 0 1 0 181 316 Z`;

const GLASS = `M 378 202 C 420 184 460 168 497 161 L 543 163 C 560 170 575 177 588 183 C 540 192 460 199 378 202 Z`;

const ECUS: Array<[number, string]> = [
  [302, "ECU-1"],
  [354, "ECU-2"],
  [516, "ECU-3"],
  [560, "ECU-4"],
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
  const glassOp = useTransform(p, [0, 1], [0.42, 0.05]);
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
        aria-label="Software-defined supersport: body opens to reveal ECU network, central compute, OTA uplink, sensors, and software stack"
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

        <ellipse cx={455} cy={352} rx={360} ry={11} fill="#000" opacity={0.5} />
        <motion.ellipse cx={455} cy={346} rx={280} ry={6} fill="#4ade80" style={{ opacity: glowOp }} />

        {/* ===== INTERNALS ===== */}
        <motion.g style={{ opacity: internalsOp }}>
          <rect x={298} y={304} width={350} height={28} rx={8} fill="#12151c" stroke="#262b34" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <rect x={308 + i * 42} y={309} width={32} height={18} rx={3} fill="#161b24" stroke="#2b3140" />
              <circle cx={324 + i * 42} cy={318} r={2} fill="#4ade80" opacity={0.7} />
            </g>
          ))}

          <line
            className="v-dash"
            x1={296}
            y1={262}
            x2={648}
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
            <rect x={408} y={228} width={94} height={52} rx={6} fill="#0d1320" stroke="#5ea2ff" />
            {Array.from({ length: 3 }, (_, i) => (
              <line key={i} x1={418} y1={240 + i * 11} x2={492} y2={240 + i * 11} stroke="#33517e" strokeWidth={1.4} />
            ))}
            <circle className="v-blink" cx={492} cy={236} r={2.4} fill="#5ea2ff" />
          </g>

          {/* roof lidar */}
          <rect x={506} y={146} width={32} height={10} rx={5} fill="#10141b" stroke="#4ade80" strokeOpacity={0.8} />
          <path className="v-pulse" d="M 500 134 A 50 50 0 0 1 544 134" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.6} />

          {/* front radar */}
          <circle cx={56} cy={276} r={3} fill="#4ade80" />
          <path className="v-pulse" d="M 40 260 A 26 26 0 0 0 40 292" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.55} />
          <path className="v-pulse" d="M 26 250 A 40 40 0 0 0 26 302" fill="none" stroke="#4ade80" strokeWidth={1} strokeDasharray="3 5" opacity={0.35} />

          {/* OTA fin + uplink */}
          <path d="M 738 188 q 10 -12 24 -9 l -4 9 z" fill="#10141b" stroke="#5ea2ff" strokeOpacity={0.8} />
          <path d="M 752 173 A 18 18 0 0 1 776 163" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.7} />
          <path d="M 758 157 A 30 30 0 0 1 796 143" fill="none" stroke="#5ea2ff" strokeWidth={1.2} opacity={0.45} />
          <line className="v-dash-slow" x1={778} y1={156} x2={824} y2={58} stroke="#5ea2ff" strokeWidth={1} strokeDasharray="4 7" opacity={0.6} />
          <g transform="translate(824 50)">
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
          <path d="M 300 121 L 408 240" stroke="#5ea2ff" strokeWidth={1} strokeDasharray="3 6" opacity={0.5} />
        </motion.g>

        {/* ===== WHEELS ===== */}
        <Wheel cx={235} />
        <Wheel cx={713} />

        {/* ===== BODY SHELL ===== */}
        <motion.g style={{ y: shellY }}>
          <motion.g style={{ opacity: shellOp }}>
            <path d={BODY} fill="url(#v-paint)" stroke="#3a3f4a" strokeWidth={1.5} />
            {/* fender volume shadows */}
            <path d="M 184 305 A 52 52 0 0 1 286 305" fill="none" stroke="#0c0e12" strokeWidth={7} opacity={0.65} />
            <path d="M 662 305 A 52 52 0 0 1 764 305" fill="none" stroke="#0c0e12" strokeWidth={7} opacity={0.65} />
            {/* scissor crease */}
            <path d="M 90 262 C 200 238 300 228 360 224 C 430 218 500 212 556 204 L 600 200" fill="none" stroke="#59626f" strokeWidth={1} opacity={0.6} />
            {/* lower door crease */}
            <path d="M 320 264 C 420 256 520 248 596 234" fill="none" stroke="#454b57" strokeWidth={1} opacity={0.5} />
            {/* hip light catch under blade */}
            <path d="M 660 176 C 690 180 715 186 740 191" fill="none" stroke="#78828f" strokeWidth={1.5} opacity={0.7} />
            {/* engine deck slats */}
            <path d="M 712 191 L 728 187 M 734 192 L 750 188 M 756 193 L 772 189" stroke="#12151a" strokeWidth={2.5} />
            {/* signature side intake */}
            <path d="M 604 196 L 660 180 L 684 248 L 624 258 Z" fill="url(#v-carbon)" stroke="#1b1f27" strokeWidth={1} opacity={0.96} />
            <path d="M 616 210 L 668 197" stroke="#2e333d" strokeWidth={2.5} />
            <path d="M 622 228 L 674 215" stroke="#2e333d" strokeWidth={2.5} />
            {/* black rear bumper / diffuser mass */}
            <path d="M 772 262 C 810 256 840 248 858 238 C 862 254 858 272 850 286 C 842 300 828 308 812 312 L 772 316 Z" fill="url(#v-carbon)" opacity={0.95} />
            <motion.path d={GLASS} fill="url(#v-glass)" style={{ fillOpacity: glassOp }} stroke="#6aa9c9" strokeOpacity={0.5} />
            {/* quarter-window divider */}
            <line x1={527} y1={166} x2={537} y2={184} stroke="#12151a" strokeWidth={3} opacity={0.85} />
            {/* door seam */}
            <path d="M 468 202 L 480 250 L 474 304" fill="none" stroke="#12151a" strokeWidth={1.6} opacity={0.9} />
            {/* mirror */}
            <path d="M 402 197 l -16 -10 q -9 -4 -6 3 l 6 10 z" fill="#20242c" stroke="#3a3f4a" strokeWidth={1} />
            {/* rocker carbon */}
            <path d="M 296 308 L 652 308 L 654 316 L 294 316 Z" fill="url(#v-carbon)" opacity={0.9} />
            {/* front splitter */}
            <path d="M 36 286 L 158 280 L 162 314 L 42 320 Z" fill="url(#v-carbon)" opacity={0.95} />
            <path d="M 60 292 L 140 288 M 64 302 L 144 298" stroke="#2e333d" strokeWidth={2} />
            {/* rear diffuser */}
            <path d="M 790 306 L 858 292 L 854 312 L 796 320 Z" fill="url(#v-carbon)" opacity={0.95} />
            <path d="M 806 300 L 808 314 M 826 296 L 828 310" stroke="#2e333d" strokeWidth={2} />
            {/* rear bumper seam */}
            <path d="M 802 199 C 810 232 808 264 796 298" fill="none" stroke="#12151a" strokeWidth={1.6} opacity={0.9} />
            {/* angular headlight slash */}
            <path d="M 58 272 L 100 259 L 116 257" stroke="#7cd2ff" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowB)" fill="none" />
            {/* tail light blade */}
            <path d="M 859 210 L 853 236" stroke="#4ade80" strokeWidth={3} strokeLinecap="round" filter="url(#v-glowG)" />
            {/* ducktail lip */}
            <path d="M 838 199 L 861 203" stroke="#828c9e" strokeWidth={1.8} opacity={0.85} />
            {/* windshield/roof dome rim light */}
            <path d="M 386 194 C 425 176 462 163 497 159 C 522 156 542 158 555 164" fill="none" stroke="#828c9e" strokeWidth={1.6} opacity={0.75} />
          </motion.g>
          {/* holographic wireframe twin */}
          <motion.g style={{ opacity: wireOp }}>
            <path d={BODY} fill="none" stroke="#4ade80" strokeWidth={1.2} strokeOpacity={0.85} filter="url(#v-glowG)" />
            <path d={GLASS} fill="none" stroke="#4ade80" strokeWidth={0.8} strokeOpacity={0.5} />
          </motion.g>
        </motion.g>

        {/* ===== ENGINEERING CALLOUTS ===== */}
        <motion.g style={{ opacity: labelsOp }} fontFamily="var(--font-mono)" fontSize={10} letterSpacing={1.5}>
          <line x1={316} y1={240} x2={244} y2={204} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={134} y={198} fill="#7de8a8">ECU MODULES</text>
          <line x1={455} y1={280} x2={455} y2={382} stroke="#5ea2ff" strokeWidth={0.8} opacity={0.5} />
          <text x={407} y={398} fill="#8db9f5">CENTRAL COMPUTE</text>
          <line x1={625} y1={262} x2={706} y2={230} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={710} y={226} fill="#7de8a8">CAN / AUTOMOTIVE ETHERNET</text>
          <text x={782} y={38} fill="#8db9f5">OTA UPLINK</text>
          <line x1={348} y1={318} x2={264} y2={356} stroke="#4ade80" strokeWidth={0.8} opacity={0.5} />
          <text x={134} y={370} fill="#7de8a8">BATTERY PLATFORM</text>
          <line x1={524} y1={146} x2={562} y2={104} stroke="#4ade80" strokeWidth={0.8} opacity={0.6} />
          <text x={568} y={100} fill="#7de8a8">SENSOR ARRAY</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
