import { ScopeTrace } from "@/components/canvas/ScopeTrace";
import { VehicleReveal } from "@/components/canvas/VehicleReveal";
import { StatusLine } from "@/components/StatusLine";
import { identity } from "@/content/resume";

/**
 * Hero: the name front and center, the conceptual software-defined vehicle
 * as the signature element, the oscilloscope trace grounding the bottom.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="bg-blueprint relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-36 pt-24 md:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="tag-mono mb-5 text-signal">
          {"// Berlin · Automotive Command Center"}
        </p>

        {/* THE NAME */}
        <h1 className="font-display text-[13vw] font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]">
          Mahdi
          <br className="sm:hidden" /> Bayanloo
        </h1>

        <p className="font-display mt-5 max-w-3xl text-2xl font-medium leading-tight text-fg md:text-4xl">
          {identity.headline}
        </p>
        <p className="tag-mono mt-4 max-w-3xl !text-[13px] leading-relaxed text-dim md:!text-sm">
          {identity.tagline.split(" | ").map((part, i, arr) => (
            <span key={part}>
              {part}
              {i < arr.length - 1 && <span className="mx-2 text-signal">|</span>}
            </span>
          ))}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-signal px-7 py-3.5 font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5"
          >
            Get in touch
          </a>
          <a
            href={identity.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-7 py-3.5 font-medium text-fg transition-colors duration-200 hover:border-dim"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* THE VEHICLE — scroll or hover to open it */}
        <div className="relative mx-auto mt-6 w-full max-w-4xl md:-mt-2">
          <VehicleReveal />
          <p className="tag-mono -mt-2 text-center text-dim">
            {identity.message}
          </p>
        </div>
      </div>

      {/* Oscilloscope trace strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-14">
        <ScopeTrace className="opacity-40" />
      </div>

      {/* Status line */}
      <div className="absolute bottom-5 left-6 md:left-10">
        <StatusLine />
      </div>
    </section>
  );
}
