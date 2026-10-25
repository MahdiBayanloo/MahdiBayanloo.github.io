"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

// An original schematic, not a claim about a specific robot Mahdi built.
const UPPER = "M 329 318 L 305 294 L 412 120 Q 425 102 448 116 L 478 137 L 370 321 Z";
const FOREARM = "M 449 111 L 478 115 L 650 185 L 642 225 L 464 171 L 436 145 Z";
const GRIPPER = "M 654 180 L 702 180 L 722 195 L 722 217 L 702 232 L 654 232 Z";

function Joint({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="url(#r-metal)" stroke="#65727e" strokeWidth={1.4} />
      <circle cx={x} cy={y} r={r - 7} fill="#0c1518" stroke="#33454c" />
      <circle cx={x} cy={y} r={r - 14} fill="#17272c" stroke="#4ade80" strokeOpacity={0.75} />
      <circle cx={x} cy={y} r={4} fill="#b7e4d0" />
      {[0, 90, 180, 270].map((a) => (
        <circle key={a} cx={x + (r - 4) * Math.cos(a * Math.PI / 180)} cy={y + (r - 4) * Math.sin(a * Math.PI / 180)} r={1.5} fill="#aab9c3" />
      ))}
    </g>
  );
}

export function RobotReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [opened, setOpened] = useState<boolean | null>(null);
  const toggle = useMotionValue(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.45", "start 0.05"] });
  const combined = useTransform(() => toggle.get() >= 0 ? toggle.get() : scrollYProgress.get());
  const spring = useSpring(combined, { stiffness: 75, damping: 22 });
  const staticOpen = useMotionValue(1);
  const p = reduced ? staticOpen : spring;
  const shellOpacity = useTransform(p, [0, 1], [1, 0.14]);
  const detailOpacity = useTransform(p, [0, 0.65], [0.45, 1]);
  const upperX = useTransform(p, [0, 1], [0, -30]);
  const upperY = useTransform(p, [0, 1], [0, -20]);
  const lowerX = useTransform(p, [0, 1], [0, 20]);
  const lowerY = useTransform(p, [0, 1], [0, -35]);
  const handX = useTransform(p, [0, 1], [0, 28]);

  function toggleView() {
    const next = !opened;
    setOpened(next);
    toggle.set(next ? 1 : 0);
  }

  return (
    <div ref={ref}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <span className="tag-mono !text-[10px] text-dim">Concept study / intelligent systems</span>
        {reduced ? <span className="font-mono text-[11px] text-signal">Static internal view</span> : <button
          type="button"
          onClick={toggleView}
          aria-pressed={opened ?? undefined}
          aria-controls="robot-concept"
          className="rounded-full border border-signal/40 bg-signal/5 px-4 py-2 font-mono text-[11px] text-signal transition-colors hover:bg-signal/15"
        >
          {opened ? "Exterior view −" : "Explore the internals +"}
        </button>}
      </div>
      <svg
        id="robot-concept"
        viewBox="0 0 960 440"
        role="img"
        aria-labelledby="robot-title robot-description"
        className="h-auto w-full"
      >
        <title id="robot-title">Robotic arm with an explorable software and control architecture</title>
        <desc id="robot-description">An illustrative articulated robot opens into a wireframe, showing sensing, AI planning, and embedded control. Use the button or scroll to explore. This is a conceptual illustration.</desc>
        <defs>
          <linearGradient id="r-metal" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#a1afb7" />
            <stop offset="0.22" stopColor="#485963" />
            <stop offset="0.52" stopColor="#25343c" />
            <stop offset="0.8" stopColor="#152127" />
            <stop offset="1" stopColor="#3a4d57" />
          </linearGradient>
          <linearGradient id="r-edge" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#8bdfb0" stopOpacity={0.65} />
            <stop offset="1" stopColor="#4ade80" stopOpacity={0.03} />
          </linearGradient>
          <radialGradient id="r-halo">
            <stop stopColor="#4ade80" stopOpacity={0.1} />
            <stop offset="1" stopColor="#4ade80" stopOpacity={0} />
          </radialGradient>
          <filter id="r-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <ellipse cx={460} cy={240} rx={350} ry={190} fill="url(#r-halo)" />
        <g fill="none" stroke="#284039" strokeWidth={0.7}>
          <ellipse cx={468} cy={369} rx={324} ry={42} />
          <ellipse cx={468} cy={369} rx={235} ry={28} strokeDasharray="4 9" />
          <path d="M 112 369 H 844 M 468 322 V 416" />
          <path d="M 267 290 A 220 220 0 0 1 669 165" strokeDasharray="3 9" opacity={0.7} />
        </g>
        <ellipse cx={355} cy={372} rx={120} ry={13} fill="#000" opacity={0.6} />

        {/* Internal skeleton stays anchored while the casing separates. */}
        <g fill="none" stroke="#4ade80" strokeWidth={1.1} strokeOpacity={0.65}>
          <path d={UPPER} />
          <path d={FOREARM} />
          <path d={GRIPPER} />
          <path d="M 339 310 L 451 140 L 647 205 L 709 205" strokeWidth={10} stroke="#203b31" />
          <path d="M 339 310 L 451 140 L 647 205 L 709 205" strokeDasharray="5 11" className="v-dash" filter="url(#r-glow)" strokeWidth={1.6} />
        </g>

        <motion.g style={{ opacity: detailOpacity }}>
          <g transform="translate(371 221) rotate(-56)">
            <rect x={-9} y={-18} width={22} height={37} rx={3} fill="#123126" stroke="#4ade80" strokeWidth={0.9} />
            <rect x={-4} y={-8} width={12} height={16} rx={1} fill="#0a1114" stroke="#6eaf8a" strokeWidth={0.7} />
            <path d="M -7 -12 H 11 M -7 12 H 11" stroke="#8db9f5" strokeWidth={0.8} />
          </g>
          <g transform="translate(546 173) rotate(20)">
            <rect x={-27} y={-9} width={54} height={18} rx={3} fill="#123126" stroke="#4ade80" strokeWidth={0.9} />
            <rect x={-9} y={-5} width={18} height={10} fill="#0a1114" stroke="#6eaf8a" strokeWidth={0.7} />
            <path d="M -23 0 H -12 M 12 0 H 23" stroke="#8db9f5" />
          </g>
        </motion.g>
        {/* Base, rotary stage, and controller. */}
        <path d="M 276 350 L 392 350 L 418 369 L 257 369 Z" fill="url(#r-metal)" stroke="#52636b" />
        <path d="M 297 330 L 375 330 L 392 350 L 276 350 Z" fill="#1e2c32" stroke="#4a5d66" />
        <rect x={302} y={299} width={69} height={40} rx={9} fill="url(#r-metal)" stroke="#52636b" />
        <path d="M 283 354 H 391" stroke="#4ade80" strokeWidth={2} filter="url(#r-glow)" />
        <rect x={316} y={320} width={31} height={13} rx={2} fill="#0b1116" stroke="#56737b" />
        <circle cx={359} cy={327} r={2} fill="#4ade80" className="v-blink" />

        <motion.g style={{ x: upperX, y: upperY, opacity: shellOpacity }}>
          <path d={UPPER} fill="url(#r-metal)" stroke="#71828c" strokeWidth={1.3} />
          <path d="M 323 287 L 425 126 L 435 130 L 335 291 Z" fill="url(#r-edge)" />
          <path d="M 351 275 L 424 160" stroke="#111e24" strokeWidth={5} strokeLinecap="round" />
          <path d="M 354 275 L 426 161" stroke="#617780" strokeWidth={0.8} />
        </motion.g>
        <motion.g style={{ x: lowerX, y: lowerY, opacity: shellOpacity }}>
          <path d={FOREARM} fill="url(#r-metal)" stroke="#71828c" strokeWidth={1.3} />
          <path d="M 483 125 L 632 186" stroke="#9bb2bd" strokeWidth={1.2} opacity={0.7} />
          <path d="M 495 151 L 600 191" stroke="#101d23" strokeWidth={5} strokeLinecap="round" />
          <rect x={539} y={150} width={38} height={9} rx={3} fill="#111b21" transform="rotate(22 539 150)" />
        </motion.g>

        <Joint x={339} y={302} r={31} />
        <Joint x={451} y={140} r={35} />
        <Joint x={646} y={205} r={26} />
        <motion.g style={{ x: handX }}>
          <path d={GRIPPER} fill="url(#r-metal)" stroke="#71828c" strokeWidth={1.2} />
          <rect x={677} y={190} width={26} height={8} rx={3} fill="#09151b" stroke="#5ea2ff" strokeWidth={1.2} />
          <circle cx={696} cy={194} r={2} fill="#5ea2ff" filter="url(#r-glow)" />
          <path d="M 716 188 L 743 167 L 766 167 L 766 179 L 748 179 L 730 200 M 716 224 L 743 245 L 766 245 L 766 233 L 748 233 L 730 212" fill="#2b3c44" stroke="#8299a5" strokeWidth={1.4} strokeLinejoin="round" />
        </motion.g>

        {/* A sensed object: the bridge between data, inference, and action. */}
        <g stroke="#4ade80" strokeWidth={1.1}>
          <path d="M 782 181 L 807 168 L 834 182 L 809 196 Z" fill="#194132" />
          <path d="M 782 181 L 809 196 L 809 227 L 782 212 Z" fill="#10281f" />
          <path d="M 809 196 L 834 182 L 834 212 L 809 227 Z" fill="#163329" />
          <path d="M 771 162 H 760 V 178 M 841 162 H 852 V 178 M 760 225 V 239 H 774 M 839 239 H 852 V 224" fill="none" opacity={0.6} />
        </g>
        <path d="M 705 194 L 781 181 M 705 194 L 782 212" fill="none" stroke="#5ea2ff" strokeWidth={0.8} strokeDasharray="3 6" opacity={0.5} />

        <motion.g style={{ opacity: detailOpacity }} fontFamily="var(--font-mono)" fontSize={10} letterSpacing={1.2}>
          <g className="hidden sm:inline">
            <path d="M 451 103 L 451 61 H 575" fill="none" stroke="#4ade80" strokeOpacity={0.5} />
            <text x={461} y={53} fill="#93b4a3">MOTION / FEEDBACK</text>
            <path d="M 674 190 L 692 106 H 825" fill="none" stroke="#5ea2ff" strokeOpacity={0.5} />
            <text x={704} y={98} fill="#8db9f5">PERCEPTION</text>
            <path d="M 315 325 L 231 312 H 96" fill="none" stroke="#4ade80" strokeOpacity={0.5} />
            <text x={97} y={303} fill="#93b4a3">EMBEDDED CONTROL</text>
          </g>
          <g transform="translate(88 123)" className="hidden sm:inline">
            <text x={0} y={-17} fill="#8b9eaa">SOFTWARE ↔ PHYSICAL WORLD</text>
            {[["SENSE / DATA", "#8db9f5"], ["REASON / AI", "#b7a4f5"], ["ACT / CONTROL", "#7de8a8"]].map(([label, color], i) => (
              <g key={label}>
                <rect x={0} y={i * 28} width={155} height={22} rx={4} fill="#10181e" stroke={color} strokeOpacity={0.4} />
                <text x={12} y={i * 28 + 15} fill={color} fontSize={9}>{label}</text>
              </g>
            ))}
            <path d="M 155 67 L 206 67 L 249 165" fill="none" stroke="#4ade80" strokeDasharray="4 7" className="v-dash-slow" opacity={0.6} />
          </g>
          <g transform="translate(599 312)" className="hidden sm:inline">
            <rect width={238} height={48} rx={6} fill="#10181e" stroke="#344d44" />
            <text x={14} y={19} fill="#7de8a8">BUILD → TEST → REFINE</text>
            <text x={14} y={35} fill="#9ba1ad" fontSize={8} letterSpacing={0.4}>models · software · real-world signals</text>
            <path d="M 0 24 H -93 L -147 -138" fill="none" stroke="#4ade80" strokeDasharray="4 7" className="v-dash-slow" opacity={0.4} />
          </g>
        </motion.g>
        <text x={479} y={410} textAnchor="middle" fill="#6d8580" fontFamily="var(--font-mono)" fontSize={9} letterSpacing={2}>HARDWARE × SOFTWARE × INTELLIGENCE</text>
      </svg>
      <div className="mb-5 flex flex-wrap justify-center gap-2 sm:hidden" aria-hidden="true">
        {["Sensing & data", "AI & reasoning", "Embedded control"].map((label) => (
          <span key={label} className="rounded-full border border-line px-2 py-1 font-mono text-[9px] text-dim">{label}</span>
        ))}
      </div>
    </div>
  );
}
