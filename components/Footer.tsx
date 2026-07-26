export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 md:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3">
        <span className="tag-mono text-dim">© {new Date().getFullYear()} Mahdi Bayanloo</span>
        <a
          href="https://github.com/MahdiBayanloo/MahdiBayanloo.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="tag-mono text-dim transition-colors hover:text-fg"
        >
          built with next.js · view source ↗
        </a>
      </div>
    </footer>
  );
}
