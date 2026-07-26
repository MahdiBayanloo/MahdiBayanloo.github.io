/**
 * MB monogram — the "M" drawn as an oscilloscope trace.
 * A square-wave rising through two peaks (the M), terminating in a
 * measurement dot. Used in the nav, favicon, and OG image.
 */
export function Monogram({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size * 1.5}
      height={size}
      viewBox="0 0 48 32"
      fill="none"
      role="img"
      aria-label="Mahdi Bayanloo"
      className={className}
    >
      {/* baseline in */}
      <path
        d="M1 26 H8 L15 6 L22 26 L29 6 L36 26 H43"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* signal terminal */}
      <circle cx={44.5} cy={26} r={2.5} fill="var(--signal)" />
    </svg>
  );
}
