import { Section } from "@/components/Section";
import { certifications, education } from "@/content/resume";

export function Education() {
  return (
    <Section id="education" index="04" title="Education & Certifications">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e) => (
          <div key={e.school} className="rounded-2xl border border-line bg-surface p-7">
            <p className="tag-mono text-dim">{e.period}</p>
            <h3 className="font-display mt-2 text-xl font-bold tracking-tight">{e.school}</h3>
            <p className="mt-1 text-dim">{e.degree}</p>
            <div className="mt-5 flex items-baseline gap-3 border-t border-line pt-5">
              <span className="font-display text-4xl font-bold text-signal">{e.stat.value}</span>
              <span className="tag-mono text-dim">{e.stat.label}</span>
            </div>
            <p className="mt-3 text-sm text-dim">{e.detail}</p>
          </div>
        ))}
      </div>

      <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
        {certifications.map((c) => (
          <li key={c.name} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-7 py-4">
            <span className="tag-mono w-20 shrink-0 text-dim">{c.date}</span>
            <span className="flex-1 font-medium">{c.name}</span>
            <span className="tag-mono text-dim">{c.issuer}</span>
            {c.image && (
              <a
                href={c.image}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-signal transition-colors hover:text-fg"
              >
                view ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
