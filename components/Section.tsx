import { Reveal } from "@/components/Reveal";

/**
 * Section shell with the "measured document" header motif: `02 / WORK`.
 * Header and body reveal on scroll (skipped under reduced motion).
 */
export function Section({
  id,
  index,
  title,
  children,
  className = "",
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 py-20 md:px-10 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <header className="mb-10 flex items-baseline gap-4 md:mb-14">
            <span className="tag-mono text-signal">
              {index} <span className="text-line">/</span>
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
            <span className="hidden h-px flex-1 self-center bg-line md:block" aria-hidden />
          </header>
        </Reveal>
        <Reveal delay={0.08}>{children}</Reveal>
      </div>
    </section>
  );
}
