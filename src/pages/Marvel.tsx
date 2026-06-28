import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { BrandLogo } from '@/components/Logo'
import { Chip, Btn, goToApp } from '@/components/Shared'
import { useCountdown, useMovingWinner } from '@/lib/hooks'
import { Reveal } from '@/lib/motion'
import { SplineHero } from '@/components/Spatial'

// =============================================================================
// Marvel — the stunning, animated, spatial ClubrGO landing, rendered in three
// art directions (one route each): /aurora (dark luxe), /daylight (light
// spatial), /stadium (sport energy). Same content/data; the THEME drives the
// palette, the AI hero backdrop, and the accents. Real Spline 3-D hero slot with
// an AI-image + CSS-deck fallback; refined framer-motion reveals; glassmorphism
// throughout. Mobile-first; pointer-tilt no-ops on touch; honors reduced-motion.
// =============================================================================

export type Variant = 'aurora' | 'daylight' | 'stadium'

interface Theme {
  mode: 'dark' | 'light'
  hero: string          // AI hero backdrop image (public/assets/<v>/hero-bg.png)
  eyebrow: string
  spline?: string       // optional Spline scene URL (host supplies later)
  vars: Record<string, string>
}

const ASSET = (p: string) => `/assets/${p}`

const THEMES: Record<Variant, Theme> = {
  aurora: {
    mode: 'dark',
    hero: ASSET('aurora/hero-bg.png'),
    eyebrow: 'For the host who runs the night',
    spline: 'https://prod.spline.design/t7iO-gf5FBfUkyTO/scene.splinecode',
    vars: {
      '--color-bg': '#070D0A', '--color-bg2': '#05080A', '--color-card': '#11161A',
      '--color-surf': '#171E22', '--color-raised': '#222B30', '--color-line': '#26303A',
      '--color-line2': '#33404B', '--color-ink': '#F4F2EC', '--color-ink2': '#C3BCAC',
      '--color-ink3': '#8A8474', '--color-gold': '#E9C46A', '--color-goldD': '#C99B3E',
      '--color-emer': '#36C98B', '--color-blue': '#5AA9E6', '--color-purple': '#B79BEA',
      '--color-red': '#E5604F',
      '--a1': '#5a4400', '--a2': '#3a2a66', '--a3': '#0c3a5a',
      '--glass-bg': 'linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.018))',
      '--glass-bd': 'rgba(255,255,255,.09)', '--glass-hi': 'rgba(255,255,255,.14)',
      '--scrim': 'linear-gradient(180deg,rgba(7,13,10,.15),rgba(7,13,10,.55) 55%,#070D0A 96%)',
    },
  },
  daylight: {
    mode: 'light',
    hero: ASSET('daylight/hero-bg.png'),
    eyebrow: 'The friendliest way to run game night',
    spline: 'https://prod.spline.design/t7iO-gf5FBfUkyTO/scene.splinecode',
    vars: {
      '--color-bg': '#F6F8F4', '--color-bg2': '#EDF0EA', '--color-card': '#FFFFFF',
      '--color-surf': '#F0F3EC', '--color-raised': '#E7ECE2', '--color-line': '#E1E6DB',
      '--color-line2': '#D2D9C9', '--color-ink': '#16211B', '--color-ink2': '#48564D',
      '--color-ink3': '#8A968C', '--color-gold': '#B5832A', '--color-goldD': '#8C6418',
      '--color-emer': '#1FA572', '--color-blue': '#2E7DC0', '--color-purple': '#7E5FCB',
      '--color-red': '#D24A38',
      '--a1': '#bfe6cf', '--a2': '#ffd9c0', '--a3': '#fff0c2',
      '--glass-bg': 'linear-gradient(160deg,rgba(255,255,255,.72),rgba(255,255,255,.42))',
      '--glass-bd': 'rgba(20,33,27,.08)', '--glass-hi': 'rgba(255,255,255,.9)',
      '--scrim': 'linear-gradient(180deg,rgba(246,248,244,.05),rgba(246,248,244,.5) 55%,#F6F8F4 96%)',
    },
  },
  stadium: {
    mode: 'dark',
    hero: ASSET('stadium/hero-bg.png'),
    eyebrow: 'Live scorekeeping with broadcast energy',
    spline: 'https://prod.spline.design/t7iO-gf5FBfUkyTO/scene.splinecode',
    vars: {
      '--color-bg': '#070C09', '--color-bg2': '#040705', '--color-card': '#0E1712',
      '--color-surf': '#14201A', '--color-raised': '#1D2E25', '--color-line': '#21342A',
      '--color-line2': '#2E473A', '--color-ink': '#EFF6F1', '--color-ink2': '#AFC6B8',
      '--color-ink3': '#6E867A', '--color-gold': '#F2C24E', '--color-goldD': '#C99B3E',
      '--color-emer': '#34E59B', '--color-blue': '#5AA9E6', '--color-purple': '#A98BE6',
      '--color-red': '#E5604F',
      '--a1': '#0c5a40', '--a2': '#5a4400', '--a3': '#0c3a5a',
      '--glass-bg': 'linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.015))',
      '--glass-bd': 'rgba(52,229,155,.14)', '--glass-hi': 'rgba(255,255,255,.12)',
      '--scrim': 'linear-gradient(180deg,rgba(7,12,9,.12),rgba(7,12,9,.55) 55%,#070C09 96%)',
    },
  },
}

const OWN = new Set([3, 5, 12, 18, 21, 29, 33, 36])

// Structural CSS shared by all variants (colors come from the scoped vars above).
const CSS = `
.mv{position:relative;overflow-x:hidden;background:var(--color-bg);color:var(--color-ink)}
.mv .aurora{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.mv .aurora i{position:absolute;border-radius:50%;filter:blur(100px);opacity:.5;animation:mv-drift 26s ease-in-out infinite}
.mv .aurora .a{width:48vw;height:48vw;left:-12vw;top:-14vw;background:radial-gradient(circle,var(--a1),transparent 60%)}
.mv .aurora .b{width:44vw;height:44vw;right:-10vw;top:6vw;background:radial-gradient(circle,var(--a2),transparent 60%);animation-delay:-9s}
.mv .aurora .c{width:42vw;height:42vw;left:26vw;bottom:-18vw;background:radial-gradient(circle,var(--a3),transparent 60%);animation-delay:-16s}
@keyframes mv-drift{0%,100%{transform:translate3d(0,0,0) scale(1)}33%{transform:translate3d(4vw,3vh,0) scale(1.1)}66%{transform:translate3d(-3vw,-2vh,0) scale(.93)}}
.mv .glass{background:var(--glass-bg);border:1px solid var(--glass-bd);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 30px 80px -34px rgba(0,0,0,.55),inset 0 1px 1px var(--glass-hi)}
.mv .tilt{transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;transform-style:preserve-3d;will-change:transform}
@media(hover:hover){.mv .tilt:hover{transform:translateY(-6px) rotateX(6deg) rotateY(-6deg);box-shadow:0 44px 96px -30px rgba(0,0,0,.6)}}
.mv .edge::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(145deg,var(--acc,var(--color-gold)),transparent 55%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.55;pointer-events:none}
.mv .floaty{animation:mv-float 7s ease-in-out infinite}
@keyframes mv-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
.mv .chip3{width:58px;height:58px;display:grid;place-items:center;border-radius:50%;font-weight:800;color:#1a1205;font-family:var(--font-display);background:repeating-conic-gradient(var(--color-gold) 0 18deg,var(--color-goldD) 18deg 36deg);border:4px solid #fff3d6;box-shadow:0 18px 40px -12px rgba(0,0,0,.7),0 0 26px rgba(233,196,106,.4)}
.mv .chip3.em{background:repeating-conic-gradient(var(--color-emer) 0 18deg,#1f8f68 18deg 36deg);border-color:#d6fff0;box-shadow:0 18px 40px -12px rgba(0,0,0,.7),0 0 26px rgba(54,201,139,.4)}
.mv .chip3.pu{background:repeating-conic-gradient(var(--color-purple) 0 18deg,#7c5cd6 18deg 36deg);border-color:#ece6ff;box-shadow:0 18px 40px -12px rgba(0,0,0,.7),0 0 26px rgba(169,139,230,.4)}
.mv .pcard{width:70px;height:98px;border-radius:12px;background:#fdfdff;color:#111;display:grid;place-items:center;font-family:var(--font-display);font-weight:700;font-size:25px;box-shadow:0 24px 54px -16px rgba(0,0,0,.6)}
.mv .grow{transform-origin:left;animation:mv-grow 2.2s cubic-bezier(.2,.8,.2,1) both}
@keyframes mv-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.mv .heroimg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.mv .heroscrim{position:absolute;inset:0;z-index:1;background:var(--scrim)}
`

export function Marvel({ variant }: { variant: Variant }) {
  const t = THEMES[variant]
  const cd = useCountdown()
  return (
    <div className="mv" style={t.vars as React.CSSProperties}>
      <style>{CSS}</style>
      <div className="aurora"><i className="a" /><i className="b" /><i className="c" /></div>

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-line glass">
        <div className="mx-auto flex h-[66px] max-w-[1180px] items-center justify-between px-5">
          <Link to={`/${variant}`}><BrandLogo /></Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-ink2 hover:text-ink">Features</a>
            <a href="#games" className="text-sm text-ink2 hover:text-ink">Games</a>
            <a href="#how" className="text-sm text-ink2 hover:text-ink">How it works</a>
            <a href="#board" className="text-sm text-ink2 hover:text-ink">Leaderboard</a>
          </nav>
          <Btn onClick={() => goToApp('host')}>Sign up</Btn>
        </div>
      </header>

      <main className="relative z-10">
        {/* hero — AI backdrop + spatial 3-D slot */}
        <section className="relative">
          <img className="heroimg" src={t.hero} alt="" aria-hidden loading="eager" />
          <div className="heroscrim" />
          <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-[46px] px-5 pt-[64px] pb-[56px] md:grid-cols-[1.05fr_.95fr]">
            <Reveal>
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">{t.eyebrow}</span>
              <h1 className="my-4 font-display text-[clamp(40px,6.2vw,70px)] font-bold leading-[1.01] tracking-[-0.02em]">
                Run your game night.<br />
                <span className="relative whitespace-nowrap" style={{ background: 'linear-gradient(120deg,var(--color-gold),var(--color-ink) 62%,var(--color-goldD))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Keep the score honest.</span>
              </h1>
              <p className="mb-7 max-w-[36ch] text-[18px] leading-relaxed text-ink2">
                ClubrGO is the scorekeeper for your club&rsquo;s games — Fantasy, Last Longer &amp; Squares — tracked live and scored fair, with a club leaderboard that crowns your regulars season after season.
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <Btn lg onClick={() => goToApp('host')}>Start your club →</Btn>
                <Btn lg variant="ghost" onClick={() => document.getElementById('how')?.scrollIntoView()}>See how it works</Btn>
              </div>
              <div className="mt-7 flex flex-wrap gap-5 text-[13px] text-ink3">
                <span><span className="text-emer">●</span> <b className="font-semibold text-ink2">3</b> game types</span>
                <span><span className="text-blue">●</span> Live <b className="font-semibold text-ink2">club leaderboard</b></span>
                <span><span className="text-purple">●</span> Provably-fair &amp; <b className="font-semibold text-ink2">tamper-proof</b></span>
              </div>
            </Reveal>
            <div className="h-[440px] md:h-[540px]">
              <SplineHero scene={t.spline} fallback={<HeroDeck cd={cd} />} />
            </div>
          </div>
        </section>

        {/* features */}
        <section id="features" className="mx-auto max-w-[1180px] px-5 py-[72px]">
          <SecHead eyebrow="Everything your club night needs" title="One app. Every part of the night, covered." sub="From the first invite to the season trophy — scored live, settled fair, and remembered forever." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feat acc="g"  icon="🏆" h="Three live games" p="FT Fantasy, Last Longer and Squares — each scored in real time with a clear winner the moment it ends." />
            <Feat acc="em" icon="📊" h="Season-long leaderboard" p="Every result stacks into one club board. Your regulars chase the crown all season." />
            <Feat acc="pu" icon="🔒" h="Provably-fair Squares" p="The grid is shuffled from a sealed seed — anyone can verify the draw. No 'trust me'." />
            <Feat acc="g"  icon="🔁" h="Rollover that carries" p="Unwon quarters roll onto Q4. An unwon Q4 carries its whole pool into your next game — automatically." badge="New" />
            <Feat acc="bl" icon="⚡" h="Live filters" p="Flip between Live and Finished, filter by game type — a pinned summary keeps your place as you scroll." badge="New" />
            <Feat acc="em" icon="🎴" h="Profile avatars & emblems" p="Players pick an avatar; clubs get a 3-D emblem. Your table looks like your table." badge="New" />
            <Feat acc="pu" icon="💬" h="Runs in your group chat" p="Drop one link in the chat — players tap in, no account hoops. Optional Telegram broadcast." />
            <Feat acc="bl" icon="🛡️" h="Private clubs" p="Invite-only by default. You decide who sees the games and who's on the board." />
            <Feat acc="rd" icon="🥇" h="Instant winners" p="The moment a game settles, the winner is crowned and the stakes are tallied — no spreadsheets." />
          </div>
        </section>

        {/* games */}
        <section id="games" className="mx-auto max-w-[1180px] px-5 pb-[72px]">
          <SecHead eyebrow="Three games, one scorekeeper" title="The games your table already plays." sub="Each scored live, with every result feeding your club leaderboard." />
          <div className="grid gap-4 md:grid-cols-3">
            <GameTile acc="pu" tag="♠ Fantasy" h="FT Fantasy" p="Draft a final table of nine. Score by where your picks finish — highest total wins." demo={<DraftDemo />} />
            <GameTile acc="g"  tag="◆ Last Longer" h="Last Longer" p="Last player standing wins. Counts update live; the board auto-sorts in real time." demo={<StandingsDemo />} />
            <GameTile acc="em" tag="▦ Squares" h="Squares" p="Claim squares on a provably-fair grid. Unwon quarters roll onto Q4 — an unwon Q4 carries to your next game." demo={<SquaresDemo />} />
          </div>
        </section>

        {/* how */}
        <section id="how" className="mx-auto max-w-[1180px] px-5 py-[20px]">
          <SecHead eyebrow="How it works" title="Group chat to game night in three taps." sub="You already run the night. ClubrGO keeps the score on top of it." />
          <div className="grid gap-4 md:grid-cols-3">
            <Step n="01 · Create" h="Start your club" p="Name it, pick a 3-D emblem, done. Your club is home for every game you run." />
            <Step n="02 · Choose" h="Spin up a game" p="Fantasy, Last Longer or Squares. Pick the type, set it up, you're live in seconds." />
            <Step n="03 · Invite" h="Share the link" p="Drop one link in your group. Players tap in — no account hoops, no chasing." />
          </div>
        </section>

        {/* leaderboard */}
        <section id="board" className="mx-auto max-w-[1180px] px-5 py-[72px]">
          <Reveal className="glass relative overflow-hidden rounded-[28px] p-8 md:p-10">
            <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full" style={{ background: 'radial-gradient(circle,rgba(233,196,106,.25),transparent 70%)', filter: 'blur(30px)' }} />
            <div className="grid items-center gap-9 md:grid-cols-2">
              <div>
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-gold">The club leaderboard</span>
                <h2 className="my-3 font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.02em]">One board. <span className="text-gold">All season long.</span></h2>
                <p className="mb-2.5 text-[17px] text-ink2">Every Fantasy, Last Longer and Squares result feeds a single club leaderboard. Points stack across game types, so your regulars have something to chase every single night.</p>
                <p className="text-[15px] text-ink3">Win a Last Longer, take a Squares quarter, finish top of a Fantasy draft — it all counts toward who sits at the top.</p>
              </div>
              <Leaderboard />
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1180px] px-5 pb-[84px]">
          <Reveal className="mx-auto mb-7 max-w-[640px] text-center">
            <h2 className="font-display text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em]">Two ways in.</h2>
            <p className="text-[17px] text-ink2">Here to run the night, or here to play it?</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <Door acc="g"  role="Host a game" h="Start your club" p="Create a club, spin up your first game, share the link with your crew." cta="Create my club →" onClick={() => goToApp('host')} />
            <Door acc="em" role="Play a game" h="Join your table" p="Got an invite link? Paste it and you're in. Or browse clubs open to new players." cta="I have an invite →" ghost onClick={() => goToApp('play')} />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line py-12">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 text-[13px] text-ink3">
          <BrandLogo />
          <span>© 2026 ClubrGO — the transparent scorekeeper &amp; club leaderboard for private clubs.</span>
          <span className="font-mono">Keep the score. Play on.</span>
        </div>
      </footer>
    </div>
  )
}

/* ---------- hero deck (pointer-parallax 3-D fallback) ---------- */
function HeroDeck({ cd }: { cd: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scene = sceneRef.current, el = ref.current
    if (!scene || !el || window.matchMedia('(hover:none)').matches) return
    let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0
    const move = (e: PointerEvent) => { const r = scene.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5 }
    const leave = () => { tx = 0; ty = 0 }
    const loop = () => { rx += (ty * -10 - rx) * .08; ry += (tx * 14 - ry) * .08; el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; raf = requestAnimationFrame(loop) }
    scene.addEventListener('pointermove', move); scene.addEventListener('pointerleave', leave); loop()
    return () => { scene.removeEventListener('pointermove', move); scene.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div ref={sceneRef} className="grid min-h-[440px] place-items-center" style={{ perspective: 1400 }}>
      <div ref={ref} className="relative h-[420px] w-[320px]" style={{ transformStyle: 'preserve-3d' }}>
        <div className="pcard floaty absolute" style={{ left: -26, top: 36, transform: 'translateZ(-90px) rotate(-15deg)' }}>A♠</div>
        <div className="pcard floaty absolute" style={{ right: -28, top: 12, transform: 'translateZ(-60px) rotate(13deg)', color: '#e23b4e', animationDelay: '-2s' }}>K♥</div>
        <div className="chip3 floaty absolute" style={{ left: -42, bottom: 28, transform: 'translateZ(40px)' }}>25</div>
        <div className="chip3 em floaty absolute" style={{ right: -38, bottom: 76, transform: 'translateZ(70px)', animationDelay: '-3s' }}>10</div>
        <div className="chip3 pu floaty absolute" style={{ left: 44, top: -32, transform: 'translateZ(90px)', animationDelay: '-5s' }}>50</div>
        <div className="glass floaty absolute inset-0 rounded-[22px] p-4" style={{ transform: 'translateZ(20px)' }}>
          <div className="mb-3 flex items-center justify-between"><BrandLogo chip={16} /><Chip tone="emer" className="!py-1">● Live</Chip></div>
          <Chip className="mb-2.5">Felt &amp; Friends · wk 6</Chip>
          <div className="mb-1 font-display text-[15px] font-bold">Sunday Million — Last Longer</div>
          {([[1, 'Gary "Grinder"', 96, true], [2, 'Lena Park', 64, false], [3, 'Sam Rivers', 42, false], [4, 'Mia Chen', 28, false]] as const).map(([r, nm, w, lead], i) => (
            <div key={r} className="my-2 flex items-center gap-2.5">
              <span className={`grid h-5 w-5 place-items-center rounded-[7px] font-display text-[11px] font-bold ${lead ? 'bg-gold text-bg' : 'bg-surf text-ink2'}`}>{r}</span>
              <span className="w-[88px] shrink-0 truncate text-[12px] text-ink2">{nm}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-bg2"><i className="grow block h-full rounded-full" style={{ width: `${w}%`, background: lead ? 'linear-gradient(90deg,var(--color-goldD),var(--color-gold))' : 'linear-gradient(90deg,var(--color-emer),var(--color-blue))', animationDelay: `${i * .12}s` }} /></span>
            </div>
          ))}
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="font-mono text-[10px] uppercase text-ink3">Next break</span>
            <span className="font-mono text-[14px] font-semibold text-gold">{cd}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- pieces ---------- */
function SecHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">{eyebrow}</span>
      <h2 className="my-3 font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] tracking-[-0.02em]">{title}</h2>
      <p className="text-[17px] text-ink2">{sub}</p>
    </Reveal>
  )
}

const ACC: Record<string, string> = { g: 'var(--color-gold)', em: 'var(--color-emer)', pu: 'var(--color-purple)', bl: 'var(--color-blue)', rd: 'var(--color-red)' }
function Feat({ acc, icon, h, p, badge }: { acc: string; icon: string; h: string; p: string; badge?: string }) {
  return (
    <Reveal className="tilt glass edge relative rounded-[18px] p-5" >
      <div style={{ ['--acc' as string]: ACC[acc] } as React.CSSProperties}>
        <div className="mb-3 grid h-11 w-11 place-items-center rounded-[13px] border border-line bg-white/5 text-[22px]">{icon}</div>
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[17px] font-semibold">{h}</h3>
          {badge && <span className="rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide" style={{ color: ACC[acc], background: 'rgba(127,127,127,.12)' }}>{badge}</span>}
        </div>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink2">{p}</p>
      </div>
    </Reveal>
  )
}

function GameTile({ acc, tag, h, p, demo }: { acc: string; tag: string; h: string; p: string; demo: React.ReactNode }) {
  return (
    <Reveal className="tilt glass edge relative rounded-[20px] p-6">
      <div style={{ ['--acc' as string]: ACC[acc] } as React.CSSProperties}>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: ACC[acc] }}>{tag}</span>
        <h3 className="my-2 font-display text-[22px] font-semibold">{h}</h3>
        <p className="mb-4 text-[14.5px] leading-relaxed text-ink2">{p}</p>
        <div className="h-[92px] overflow-hidden rounded-xl border border-line bg-bg2">{demo}</div>
      </div>
    </Reveal>
  )
}

function Step({ n, h, p }: { n: string; h: string; p: string }) {
  return (
    <Reveal className="tilt glass rounded-[18px] p-6">
      <div className="mb-3 font-mono text-[13px] text-gold">{n}</div>
      <h3 className="mb-1.5 font-display text-[19px] font-semibold">{h}</h3>
      <p className="text-[14.5px] text-ink2">{p}</p>
    </Reveal>
  )
}

function Door({ acc, role, h, p, cta, ghost, onClick }: { acc: string; role: string; h: string; p: string; cta: string; ghost?: boolean; onClick: () => void }) {
  return (
    <Reveal className="tilt glass edge relative cursor-pointer rounded-[22px] p-8">
      <div onClick={onClick} style={{ ['--acc' as string]: ACC[acc] } as React.CSSProperties}>
        <span className="font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: ACC[acc] }}>{role}</span>
        <h3 className="my-2.5 font-display text-[26px] font-bold">{h}</h3>
        <p className="mb-5 text-[15px] text-ink2">{p}</p>
        <Btn lg variant={ghost ? 'ghost' : 'gold'}>{cta}</Btn>
      </div>
    </Reveal>
  )
}

function Leaderboard() {
  const rows: [string, string, string, boolean][] = [
    ['1', 'Gary "Grinder" P.', '1,840', true],
    ['2', 'Lena Park', '1,620', false],
    ['3', 'Sam Rivers', '1,475', false],
    ['4', 'Marcus Yu', '1,290', false],
    ['5', 'Priya N.', '1,155', false],
  ]
  return (
    <div className="glass rounded-[18px] p-2">
      <div className="flex items-center justify-between px-3.5 pt-3 pb-2.5">
        <span className="font-display text-[16px] font-bold">Felt &amp; Friends</span>
        <span className="font-mono text-[11px] text-ink3">SEASON 2 · WK 6</span>
      </div>
      {rows.map(([r, name, pts, lead]) => (
        <div key={r} className={`my-[3px] flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 ${lead ? 'border border-gold/30 bg-[linear-gradient(110deg,rgba(233,196,106,.14),transparent)]' : ''}`}>
          <span className={`grid h-6 w-6 place-items-center rounded-full font-display text-[12px] font-bold ${lead ? 'bg-gold text-bg' : 'bg-surf text-ink2'}`}>{r}</span>
          <span className="flex-1 text-[14px] font-semibold">{name}</span>
          <span className={`font-mono text-[14px] font-semibold ${lead ? 'text-gold' : ''}`}>{pts}<span className="text-[11px] text-ink3"> pts</span></span>
        </div>
      ))}
    </div>
  )
}

function DraftDemo() {
  return (
    <div className="p-3">
      <div className="mb-1.5 flex justify-between font-mono text-[10px] text-ink3"><span>BUDGET LEFT</span><span>PICKS 2/4</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-bg2"><div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-goldD),var(--color-gold))]" style={{ animation: 'fill 3.5s ease-in-out infinite' }} /></div>
      <div className="mt-2 flex gap-1.5">
        <div className="h-[18px] flex-1 rounded-md bg-raised" />
        <div className="h-[18px] flex-1 rounded-md bg-raised" />
        <div className="h-[18px] flex-1 rounded-md border border-dashed border-line" />
        <div className="h-[18px] flex-1 rounded-md border border-dashed border-line" />
      </div>
    </div>
  )
}
function StandingsDemo() {
  return (
    <div className="flex flex-col gap-2 p-3.5">
      {([[1, 92, true], [2, 60, false], [3, 38, false]] as const).map(([r, w, lead]) => (
        <div key={r} className="flex items-center gap-2">
          <span className={`grid h-[18px] w-[18px] place-items-center rounded-full font-display text-[10px] font-bold ${lead ? 'bg-gold text-bg' : 'bg-surf text-ink2'}`}>{r}</span>
          <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-bg2"><i className="block h-full rounded-full" style={{ width: `${w}%`, background: lead ? 'linear-gradient(90deg,var(--color-goldD),var(--color-gold))' : 'var(--color-emer)' }} /></span>
        </div>
      ))}
    </div>
  )
}
function SquaresDemo() {
  const winner = useMovingWinner([10, 27, 19, 5])
  return (
    <div className="grid grid-cols-8 gap-[3px] p-2.5">
      {Array.from({ length: 40 }).map((_, i) => (
        <i key={i} className={`block aspect-square rounded-[3px] ${i === winner ? 'bg-gold' : OWN.has(i) ? 'bg-raised shadow-[inset_0_0_0_1px_rgba(233,196,106,0.3)]' : 'bg-card'}`} />
      ))}
    </div>
  )
}
