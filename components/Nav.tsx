"use client";

import { useEffect, useState } from "react";
import { Monogram } from "@/components/svg/Monogram";
import { identity } from "@/content/resume";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
      aria-label="Main"
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="text-fg" aria-label="Back to top">
          <Monogram size={24} />
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-dim transition-colors duration-200 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
          <a
            href={identity.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-fg transition-colors duration-200 hover:border-signal hover:text-signal"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="tag-mono text-dim md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "close ×" : "menu ≡"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-bg/95 px-6 py-4 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-md px-2 py-2.5 text-dim hover:bg-surface hover:text-fg"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={identity.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md border border-line px-2 py-2.5 text-center font-mono text-xs uppercase tracking-widest"
                onClick={() => setOpen(false)}
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
