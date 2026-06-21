# ClubrGO — Marketing Site

Vite + React + TypeScript + Tailwind CSS v4. Two landing-page designs for ClubrGO,
the scorekeeper + club leaderboard for FT Fantasy, Last Longer and Squares.

## Run it
```bash
npm install
npm run dev      # → http://localhost:5173
```
Routes:
- `/felt-table` — cinematic variation (default)
- `/terminal-rail` — product-led variation

## Build
```bash
npm run build    # type-checks (tsc -b) then builds to dist/
npm run preview  # preview the production build
```

## Deploy
Static output in `dist/`. Drop it on Vercel / Netlify / GitHub Pages.
(Single-page app: configure a catch-all rewrite to `/index.html` so client routes work.)

See `CLAUDE.md` for design tokens, copy guardrails, and structure — and
`HANDOFF.md` for the build brief and next steps.
