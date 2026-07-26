import { Section } from "@/components/Section";
import { identity } from "@/content/resume";

export function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="font-display max-w-md text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Let&apos;s build something that proves itself.
          </p>
          <ul className="mt-8 space-y-3">
            <li>
              <a
                href={`mailto:${identity.email}`}
                className="font-mono text-sm text-signal transition-colors hover:text-fg"
              >
                {identity.email}
              </a>
            </li>
            <li>
              <a
                href={identity.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-dim transition-colors hover:text-fg"
              >
                linkedin/mahdi-bayanloo ↗
              </a>
            </li>
            <li>
              <a
                href={identity.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-dim transition-colors hover:text-fg"
              >
                github/mahdibayanloo ↗
              </a>
            </li>
            <li className="tag-mono pt-2 text-dim">{identity.location}</li>
          </ul>
        </div>

        <form
          action="https://formspree.io/f/myyryzrw"
          method="POST"
          className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-7"
        >
          <label className="tag-mono text-dim" htmlFor="cf-name">
            send a message
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-dim/60"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            aria-label="Your email"
            className="rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-dim/60"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your message"
            aria-label="Your message"
            className="rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-dim/60"
          />
          <button
            type="submit"
            className="self-start rounded-full bg-signal px-7 py-3 font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5"
          >
            Send
          </button>
        </form>
      </div>
    </Section>
  );
}
