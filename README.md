# mahdibayanloo.github.io

Personal portfolio of **Mahdi Bayanloo** — engineer working across AI, robotics, embedded software, and data, based in Berlin.

Live at **https://mahdibayanloo.github.io**

## Stack

- [Next.js](https://nextjs.org) (static export) + TypeScript
- Tailwind CSS v4 — design tokens in `app/globals.css`
- [Motion](https://motion.dev) — scroll reveals & timeline trace
- SVG + Motion — interactive robotic-arm illustration; Canvas 2D — the oscilloscope trace
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

## Content maintenance

- RV Tech internship: July–September 2026 (completed at the end of September).
- M.Sc. Computational Sciences: current study, expected enrolment through 2028.
- Section order: Work Experience, Selected Projects, Skills, Education, About, Contact. Keep experience ahead of projects.
- Public projects include the [vehicle assistant validation lab](https://github.com/MahdiBayanloo/vehicle-assistant-validation-lab), [AI optimization pipeline](https://github.com/MahdiBayanloo/ai-optimization-pipeline), and [braking-event processing](https://github.com/MahdiBayanloo/braking-events).
- The robotic arm is an original conceptual illustration, not a specific project or employer product.
- Keep simulated benchmark results distinct from hardware measurements and future work distinct from completed work.
