# ClubrGO Marketing Site — Handoff Brief (for Claude Code in VS Code)

This is a **runnable** Vite + React 19 + TypeScript + Tailwind v4 project. It contains
two finished landing-page designs for ClubrGO. Open the folder in VS Code and you can
start immediately.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173  (/, /felt-table, /terminal-rail)
npm run build    # must stay green (tsc strict)
```

## What's done
- ✅ Both designs as routes: `/felt-table` (cinematic), `/terminal-rail` (product-led)
- ✅ Committed logo (filled Medallion "Champion of the Club") in `src/components/Logo.tsx`
- ✅ Pine-felt + chip-gold tokens in `src/styles/index.css` (Tailwind v4 @theme)
- ✅ Shared primitives (Chip, Btn), animated mockups, scroll-reveal, live countdown
- ✅ Copy is money/betting/poker-free — scorekeeper + club-leaderboard framing only

## Suggested next tasks (good Claude Code jobs)
1. **Wire the app handoff.** `goToApp(intent)` in `src/components/Shared.tsx` is a stub.
   Point it at the real ClubrGO app (e.g. `/app?intent=host|play`), matching the
   onboarding spec (cold web users get the one-tap "play or host?" split).
2. **Pick one design** as primary (or keep both and add a `/` chooser). If consolidating,
   delete the other page + route.
3. **Build Variation 3 "Spotlight"** (bold/energetic, big type, scroll-storytelling) as a
   third route `/spotlight`, reusing the shared components.
4. **SEO/meta**: per-route `<title>`/OG tags (react-helmet or a small head manager),
   `public/og-*.png` social images, sitemap.
5. **Real content**: replace mock leaderboard/games data with real or CMS-driven content.
6. **Analytics**: fire an event on each CTA (host/play) to measure conversion.

## Guardrails (don't drift)
- Brand is **ClubrGO** — one word, capital GO, no space. (See `.wordmark` handling.)
- NEVER introduce money/cash/Stakes/buy-in/bet/wager/"poker" into copy. See CLAUDE.md.
- Keep both pages on the same tokens; differ only in art direction.
- `npm run build` is the gate — strict TS (noUnusedLocals/Parameters).

## Reference
`/reference` holds the original standalone HTML (`*.html`) these components were built
from, plus the full logo SVG set, in case you want to diff against the source designs.
