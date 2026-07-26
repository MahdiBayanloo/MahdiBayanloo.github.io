# mahdibayanloo.github.io

Personal portfolio of **Mahdi Bayanloo** — Software Integration Engineer (Vehicle OTA & Embedded Test), Berlin.

Live at **https://mahdibayanloo.github.io**

## Stack

- [Next.js](https://nextjs.org) (static export) + TypeScript
- Tailwind CSS v4 — design tokens in `app/globals.css`
- [Motion](https://motion.dev) — scroll reveals & timeline trace
- Canvas 2D — the hero oscilloscope trace
- Self-hosted fonts via `next/font`: Space Grotesk · Inter · JetBrains Mono

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

All site content (experience, projects, skills, education) lives in a single
typed file: [`content/resume.ts`](content/resume.ts). Edit it and rebuild —
no component changes needed for content updates.

## Deployment

Built site is served by GitHub Pages. `.github/workflows/deploy.yml` builds on
every push (and can deploy from `main` once Pages is switched to the
"GitHub Actions" source in repo settings).

The previous site is preserved under [`legacy/`](legacy/).
