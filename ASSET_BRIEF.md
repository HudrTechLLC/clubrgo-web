# ClubrGO marketing site — AI asset brief (parallel production)

Goal: a stunning, animated, spatial PWA marketing site in **three art directions**, each
at its own route: `/aurora` (dark luxe), `/daylight` (light spatial), `/stadium` (sport
energy). Real **Spline** 3D hero; refined (tasteful) motion; glassmorphism throughout.

Division of labor:
- **You (Midjourney):** the big cinematic hero stills + ambient backgrounds + textures.
- **You (Spline, free):** one interactive 3D hero scene (spec below) → gives me a public
  scene URL I embed.
- **You (Recraft V3, free tier):** clean **transparent-PNG** product objects (chips,
  trophies, tokens, badges) — MJ can't do clean alpha.
- **You (Runway/Luma, optional):** one 4–6s ambient hero loop per variant (only if we go
  cinematic later — we chose Refined, so this is optional polish).
- **Me (Nano Banana / Gemini, automated):** backgrounds, glass objects on dark, app-screen
  mockups, section illustrations, icon art, variations, quick edits. I generate these
  directly into `public/assets/<variant>/`.

Save everything into `public/assets/aurora/`, `public/assets/daylight/`, `public/assets/stadium/`.
Prefer **WebP** ≤300KB for backgrounds, transparent **PNG** for objects, **AVIF/WebP** for screens.

---

## 1) Midjourney — hero stills & backgrounds (you)
Use `--ar 9:16` for mobile hero, `--ar 16:9` for desktop, `--style raw`, `--v 6`.

### Aurora (dark luxe — ink + gold)
- `premium dark editorial hero, deep ink-black to aubergine aurora gradient, volumetric soft gold stage light through fog, floating frosted-glass panels with subtle refraction, fine film grain, lots of negative space, no text, cinematic, 8k --ar 9:16 --style raw`
- `abstract 3D frosted glass prism shards floating, warm gold rim light, dark background, depth of field --ar 16:9 --style raw`

### Daylight (light spatial — off-white + pastel glass)
- `airy light landing hero, off-white to soft pastel mint-and-peach mesh gradient, soft 3D frosted-glass cards casting gentle shadows, bright clean, generous whitespace, no text, friendly premium consumer app --ar 9:16 --style raw`
- `soft pastel 3D blobs and glass orbs floating on cream background, gentle studio light --ar 16:9 --style raw`

### Stadium (sport energy — dark + team-color streaks)
- `kinetic sports broadcast hero, dark arena, sweeping light streaks in emerald and gold, motion blur, frosted glass scoreboard panels with neon edges, energetic, no text, cinematic --ar 9:16 --style raw`
- `dynamic light trails and particles over dark stadium, green and gold, high energy --ar 16:9 --style raw`

## 2) Recraft V3 — transparent product objects (you)
Set **background: transparent**, style **3D / realistic**, export **PNG**:
- Glossy poker chip (gold + ink), 3/4 view
- Small gold trophy
- American football (subtle)
- "LIVE" badge token, leaderboard medal (1st gold / 2nd silver / 3rd bronze)
- A frosted-glass rounded card chip with a tiny club crest
Each as its own transparent PNG (these become the **orbiting tokens** + scattered accents).

## 3) Spline — the interactive 3D hero (you, free account)
Build ONE scene, publish, send me the **public scene URL** (looks like
`https://prod.spline.design/XXXX/scene.splinecode`). Spec:
- A floating **glass phone** in the center, slight idle bob + slow rotation.
- 3–5 **orbiting tokens** around it (chip, trophy, football, medal) on slow orbits.
- Soft studio + warm rim light; environment matches the variant (dark for aurora/stadium,
  light for daylight — you can duplicate the scene and recolor).
- Enable **mouse/drag orbit** + idle animation. Keep poly count modest (mobile).
- Export 3 variants (dark-gold / light-pastel / dark-emerald) OR one neutral I can tint.
I'll wire it via `@splinetool/react-spline` with a static-image fallback (the MJ hero)
for reduced-motion / slow connections.

## 4) Nano Banana (me — already running)
I will auto-generate: per-variant backgrounds, glass-object clusters on color, stylized
in-app screen mockups (leaderboard, Squares grid, Last-Longer ladder), section
illustrations, the PWA icon/maskable set, and an OG share image. You don't need to do these.

---

## What unblocks the build fastest (priority order for you)
1. **Spline hero scene URL** (biggest visual upgrade; everything else has fallbacks).
2. **Recraft transparent tokens** (chip/trophy/football/medals) — used as orbiting + accents.
3. **Midjourney hero backgrounds** (3 variants) — I have Nano-Banana stand-ins already, so
   these are upgrades, not blockers.

Drop files into the `public/assets/<variant>/` folders (create them) and tell me the
filenames + the Spline URL; I'll wire each in and redeploy. I'm building the shared
spatial/glass/motion kit + the Aurora variant now with stand-in assets so you can see the
shape immediately.
