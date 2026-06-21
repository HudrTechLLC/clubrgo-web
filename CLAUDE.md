# ClubrGO Marketing Site — project conventions

This is the **marketing/landing site** for ClubrGO (a separate concern from the
ClubrGO product app). Stack: **Vite + React 19 + TypeScript + Tailwind CSS v4**.

## What ClubrGO is (copy guardrails — IMPORTANT)
ClubrGO is a **scorekeeper + club leaderboard** for three club games: **FT Fantasy,
Last Longer, Squares**. The site copy MUST avoid:
- ❌ money / cash / "Stakes" / buy-in / pool / pay / settle / "who owes who"
- ❌ betting / wager / "side-bets" / odds
- ❌ the word "poker"
Frame everything as **keeping score**, **live tracking**, **winners**, and the
**season-long club leaderboard**. Brand is always **ClubrGO** — one word, capital GO.

## Design tokens (Tailwind v4, defined in src/styles/index.css @theme)
Pine-felt + chip-gold, matching the Golden-Real app:
bg #0B1410 · card #11201A · surf #16291F · raised #1E3A2C · line #23382C
ink #F3F6F2 / ink2 #AFC4B6 / ink3 #6E8678 · gold #E9C46A / goldD #C99B3E
emer #36C98B · blue #5AA9E6 · purple #A98BE6 · red #E5604F
Fonts: font-display (Space Grotesk), font-sans (Inter), font-mono (IBM Plex Mono).
Use the Tailwind color utilities (e.g. `text-gold`, `bg-card`, `border-line`).

## Structure
- `src/main.tsx` — router. Routes: `/felt-table`, `/terminal-rail` (/, redirects to felt-table)
- `src/pages/FeltTable.tsx` — cinematic variation
- `src/pages/TerminalRail.tsx` — product-led variation
- `src/components/Logo.tsx` — Medallion mark + BrandLogo lockup (the committed logo)
- `src/components/Shared.tsx` — Chip, Btn, and `goToApp(intent)` handoff stub
- `src/lib/hooks.ts` — useScrollReveal, useCountdown, useMovingWinner

## App handoff
`goToApp(intent)` in `src/components/Shared.tsx` is a STUB. Wire it to the real
ClubrGO app route (e.g. `/app?intent=host|play`) per the onboarding spec
(cold web users are asked "play or host?" once).

## Conventions
- Reuse the shared primitives; keep both pages visually consistent in tokens, distinct in art direction.
- `npm run dev` to develop; `npm run build` must pass (tsc strict: noUnusedLocals/Parameters).
- Reference designs (the original standalone HTML) live in `/reference`.
