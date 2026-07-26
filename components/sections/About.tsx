import { Section } from "@/components/Section";
import { about, languages } from "@/content/resume";

export function About() {
  return (
    <Section id="about" index="05" title="About">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-dim">{about.paragraph}</p>
          <p className="tag-mono mt-8 leading-loose text-dim">
            <span className="text-signal">$ career --trace</span>
            <br />
            {about.arc}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-7 self-start">
          <h3 className="tag-mono text-signal">Languages</h3>
          <ul className="mt-4 space-y-3">
            {languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{l.name}</span>
                <span className="text-right text-sm text-dim">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
