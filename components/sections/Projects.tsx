import { Section } from "@/components/Section";
import { projects } from "@/content/resume";

/** Case-study cards: problem → built → stack. No thumbnails, no iframes. */
export function Projects() {
  return (
    <Section id="projects" index="02" title="Selected Projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="group flex flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-dim"
          >
            <p className="tag-mono text-dim">{p.kicker}</p>
            <h3 className="font-display mt-3 text-xl font-bold tracking-tight">{p.name}</h3>

            <dl className="mt-4 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="tag-mono mb-1 text-signal">problem</dt>
                <dd className="text-dim">{p.problem}</dd>
              </div>
              <div>
                <dt className="tag-mono mb-1 text-signal">built</dt>
                <dd className="text-dim">{p.built}</dd>
              </div>
            </dl>

            <div className="mt-auto pt-5">
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wider text-dim"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {p.link && (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:text-fg"
                >
                  {p.link.label} ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
