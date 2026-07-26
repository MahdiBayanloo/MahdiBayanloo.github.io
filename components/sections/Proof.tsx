import { proof } from "@/content/resume";

/** Quiet typographic employer strip — the 3-second credibility scan. */
export function Proof() {
  return (
    <section aria-label="Employers and institutions" className="border-y border-line">
      <ul className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-7 md:justify-between md:px-10">
        {proof.map((name) => (
          <li
            key={name}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim transition-colors duration-200 hover:text-fg"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
