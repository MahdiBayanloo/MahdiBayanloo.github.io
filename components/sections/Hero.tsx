import { ScopeTrace } from "@/components/canvas/ScopeTrace";
import { RobotReveal } from "@/components/canvas/RobotReveal";
import { StatusLine } from "@/components/StatusLine";
import { identity } from "@/content/resume";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-blueprint relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-28 pt-24 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="tag-mono mb-5 text-signal">{"// Berlin · AI, Robotics & Software"}</p>
        <h1 className="font-display text-[13vw] font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[6rem]">
          Mahdi<br className="sm:hidden" /> Bayanloo
        </h1>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div>
            <p className="font-display max-w-xl text-3xl font-medium leading-tight text-fg md:text-4xl">{identity.headline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-dim">{identity.subline}</p>
            <p className="tag-mono mt-5 hidden max-w-xl !text-[10px] leading-loose text-dim sm:block">
              {identity.tagline.split(" | ").map((part, i, arr) => (
                <span key={part}>{part}{i < arr.length - 1 && <span className="mx-2 text-signal">/</span>}</span>
              ))}
            </p>
            <p className="mt-5 font-mono text-xs text-signal">{identity.availability}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#projects" className="rounded-full bg-signal px-6 py-3 font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5">Explore my work</a>
              <a href={identity.links.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-6 py-3 font-medium text-fg transition-colors duration-200 hover:border-dim">LinkedIn ↗</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-3xl">
            <RobotReveal />
            <p className="mx-auto max-w-lg text-center font-mono text-[10px] leading-relaxed text-dim">{identity.message}</p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-10"><ScopeTrace className="opacity-40" /></div>
      <div className="absolute bottom-5 left-6 md:left-10"><StatusLine /></div>
    </section>
  );
}
