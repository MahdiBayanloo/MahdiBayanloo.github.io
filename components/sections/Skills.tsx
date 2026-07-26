import { Section } from "@/components/Section";
import { skills } from "@/content/resume";

/** Grouped skill matrix. No progress bars — grouping IS the information. */
export function Skills() {
  return (
    <Section id="skills" index="03" title="Skills">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div
            key={g.group}
            className="rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-dim"
          >
            <h3 className="tag-mono text-signal">{g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wider text-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
