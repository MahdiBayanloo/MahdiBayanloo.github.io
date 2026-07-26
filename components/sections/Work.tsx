import { Section } from "@/components/Section";
import { SpineProgress } from "@/components/SpineProgress";
import { experience } from "@/content/resume";

/**
 * Experience timeline. The spine draws itself as a signal trace on scroll;
 * the static border-l underneath is the no-JS / reduced-motion fallback.
 */
export function Work() {
  return (
    <Section id="work" index="01" title="Experience">
      <ol className="relative ml-2 border-l border-line md:ml-4">
        <SpineProgress />
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
            {/* Node */}
            <span
              className={`absolute -left-[5px] top-1.5 block h-2 w-2 rounded-full ${
                job.highlight ? "status-dot status-dot--amber" : "bg-line"
              }`}
              aria-hidden
            />

            <p className="tag-mono text-dim">
              {job.start} — {job.end}
              {job.current && <span className="ml-3 text-amber">● current</span>}
              <span className="ml-3">{job.location}</span>
            </p>
            <h3 className="font-display mt-2 text-xl font-bold tracking-tight md:text-2xl">
              {job.company}
              <span className="mt-0.5 block text-base font-medium text-dim md:mt-0 md:inline md:before:mx-2.5 md:before:text-line md:before:content-['—']">
                {job.title}
              </span>
            </h3>

            <ul className="mt-4 max-w-3xl space-y-2.5">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed text-dim">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wider text-dim"
                >
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
