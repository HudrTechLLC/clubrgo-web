import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { BrandLogo } from '@/components/Logo'
import { Chip, Btn, goToApp } from '@/components/Shared'
import { useScrollReveal, useCountdown, useMovingWinner } from '@/lib/hooks'

// =============================================================================
// PrismDeck — the "extremely 3-D, glassy" ClubrGO landing variant.
// Same content/data as FeltTable, restyled as deep-glass + neon depth: aurora
// wash, pointer-parallax hero deck, glass cards that tilt in 3-D, and a full
// product-highlights grid covering every feature (incl. the new Squares
// cross-game rollover). Mobile-first: every grid collapses to one column and the
// pointer-tilt simply no-ops on touch.
// =============================================================================

const OWN = new Set([3, 5, 12, 18, 21, 29, 33, 36])

// Scoped CSS for this variant only (keeps FeltTable untouched).
const CSS = `
.pd{--g:#E9C46A;--gd:#C99B3E;--em:#36C98B;--pu:#A98BE6;--bl:#5AA9E6;--rd:#E5604F}
.pd .aurora{position:fixed;inset:0;z-index:-2;overflow:hidden;pointer-events:none}
.pd .aurora i{position:absolute;border-radius:50%;filter:blur(90px);opacity:.45;animation:pd-drift 24s ease-in-out infinite}
.pd .aurora .a{width:46vw;height:46vw;left:-10vw;top:-12vw;background:radial-gradient(circle,#5a4400,transparent 60%)}
.pd .aurora .b{width:42vw;height:42vw;right:-8vw;top:4vw;background:radial-gradient(circle,#0c5a40,transparent 60%);animation-delay:-8s}
.pd .aurora .c{width:40vw;height:40vw;left:24vw;bottom:-16vw;background:radial-gradient(circle,#3a2a66,transparent 60%);animation-delay:-15s}
@keyframes pd-drift{0%,100%{transform:translate3d(0,0,0) scale(1)}33%{transform:translate3d(4vw,3vh,0) scale(1.1)}66%{transform:translate3d(-3vw,-2vh,0) scale(.94)}}
.pd .glass{background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(14px);box-shadow:0 30px 80px -34px rgba(0,0,0,.85),inset 0 1px 1px rgba(255,255,255,.14)}
.pd .tilt{transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s;transform-style:preserve-3d}
@media(hover:hover){.pd .tilt:hover{transform:translateY(-6px) rotateX(7deg) rotateY(-7deg);box-shadow:0 40px 90px -30px rgba(0,0,0,.9)}}
.pd .edge::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(145deg,var(--acc,var(--g)),transparent 55%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.6;pointer-events:none}
.pd .floaty{animation:pd-float 7s ease-in-out infinite}
@keyframes pd-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
.pd .chip3{width:58px;height:58px;display:grid;place-items:center;border-radius:50%;font-weight:800;color:#1a1205;font-family:'Space Grotesk';background:repeating-conic-gradient(var(--g) 0 18deg,#caa23c 18deg 36deg);border:4px solid #fff3d6;box-shadow:0 18px 40px -12px rgba(0,0,0,.8),0 0 26px rgba(233,196,106,.4)}
.pd .chip3.em{background:repeating-conic-gradient(var(--em) 0 18deg,#1f8f68 18deg 36deg);border-color:#d6fff0;box-shadow:0 18px 40px -12px rgba(0,0,0,.8),0 0 26px rgba(54,201,139,.4)}
.pd .chip3.pu{background:repeating-conic-gradient(var(--pu) 0 18deg,#7c5cd6 18deg 36deg);border-color:#ece6ff;box-shadow:0 18px 40px -12px rgba(0,0,0,.8),0 0 26px rgba(169,139,230,.4)}
.pd .pcard{width:70px;height:98px;border-radius:12px;background:#fdfdff;color:#111;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:700;font-size:25px;box-shadow:0 24px 54px -16px rgba(0,0,0,.85)}
.pd .grow{transform-origin:left;animation:pd-grow 2.2s cubic-bezier(.2,.8,.2,1) both}
@keyframes pd-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
`

export function PrismDeck() {
  useScrollReveal()
  const cd = useCountdown()
  return (
    <div className="pd relative overflow-x-hidden">
      <style>{CSS}</style>
      <div className="aurora"><i className="a" /><i className="b" /><i className="c" /></div>
      <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(120% 80% at 50% -10%, rgba(20,40,32,.5), transparent 60%), #070d0a' }} />

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-line glass">
        <div className="mx-auto flex h-[66px] max-w-[1180px] items-center justify-between px-5">
          <Link to="/prism-deck"><BrandLogo /></Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-ink2 hover:text-ink">Features</a>
            <a href="#games" className="text-sm text-ink2 hover:text-ink">Games</a>
            <a href="#how" className="text-sm text-ink2 hover:text-ink">How it works</a>
            <a href="#board" className="text-sm text-ink2 hover:text-ink">Leaderboard</a>
          </nav>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="mx-auto grid max-w-[1180px] items-center gap-[46px] px-5 pt-[72px] pb-[48px] md:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">For the host who runs the night</span>
            <h1 className="my-4 font-display text-[clamp(40px,6.2vw,70px)] font-bold leading-[1.01] tracking-[-0.02em]">
              Run your game night.<br />
              <span className="relative whitespace-nowrap" style={{ background: 'linear-gradient(120deg,var(--g),#fff 62%,var(--gd))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Keep the score honest.</span>
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
          </div>
          <HeroDeck cd={cd} />
        </section>

        {/* feature grid — every product highlight */}
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

        {/* how it works */}
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
          <div className="reveal glass relative overflow-hidden rounded-[28px] p-8 md:p-10">
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
          </div>
        </section>

        {/* doors / CTA */}
        <section className="mx-auto max-w-[1180px] px-5 pb-[84px]">
          <div className="mx-auto mb-7 max-w-[640px] text-center">
            <h2 className="font-display text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-0.02em]">Two ways in.</h2>
            <p className="text-[17px] text-ink2">Here to run the night, or here to play it?</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Door acc="g"  role="Host a game" h="Start your club" p="Create a club, spin up your first game, share the link with your crew." cta="Create my club →" onClick={() => goToApp('host')} />
            <Door acc="em" role="Play a game" h="Join your table" p="Got an invite link? Paste it and you're in. Or browse clubs open to new players." cta="I have an invite →" ghost onClick={() => goToApp('play')} />
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-12">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 text-[13px] text-ink3">
          <BrandLogo />
          <span>© 2026 ClubrGO — the transparent scorekeeper &amp; club leaderboard for private clubs.</span>
          <span className="font-mono">Keep the score. Play on.</span>
        </div>
      </footer>
    </div>
  )
}

/* ---------- hero deck (pointer-parallax 3-D) ---------- */
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
    <div ref={sceneRef} className="reveal grid min-h-[440px] place-items-center" style={{ perspective: 1400 }}>
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
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#0c1a13]"><i className="grow block h-full rounded-full" style={{ width: `${w}%`, background: lead ? 'linear-gradient(90deg,var(--gd),var(--g))' : 'linear-gradient(90deg,var(--em),var(--bl))', animationDelay: `${i * .12}s` }} /></span>
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
    <div className="reveal mx-auto mb-10 max-w-[640px] text-center">
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">{eyebrow}</span>
      <h2 className="my-3 font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] tracking-[-0.02em]">{title}</h2>
      <p className="text-[17px] text-ink2">{sub}</p>
    </div>
  )
}

const ACC: Record<string, string> = { g: 'var(--g)', em: 'var(--em)', pu: 'var(--pu)', bl: 'var(--bl)', rd: 'var(--rd)' }
function Feat({ acc, icon, h, p, badge }: { acc: string; icon: string; h: string; p: string; badge?: string }) {
  return (
    <div className="reveal tilt glass edge relative rounded-[18px] p-5" style={{ ['--acc' as string]: ACC[acc] }}>
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-[13px] border border-line bg-white/5 text-[22px]">{icon}</div>
      <div className="flex items-center gap-2">
        <h3 className="font-display text-[17px] font-semibold">{h}</h3>
        {badge && <span className="rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide" style={{ color: ACC[acc], background: 'rgba(255,255,255,.06)' }}>{badge}</span>}
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink2">{p}</p>
    </div>
  )
}

function GameTile({ acc, tag, h, p, demo }: { acc: string; tag: string; h: string; p: string; demo: React.ReactNode }) {
  return (
    <div className="reveal tilt glass edge relative rounded-[20px] p-6" style={{ ['--acc' as string]: ACC[acc] }}>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: ACC[acc] }}>{tag}</span>
      <h3 className="my-2 font-display text-[22px] font-semibold">{h}</h3>
      <p className="mb-4 text-[14.5px] leading-relaxed text-ink2">{p}</p>
      <div className="h-[92px] overflow-hidden rounded-xl border border-line bg-bg2">{demo}</div>
    </div>
  )
}

function Step({ n, h, p }: { n: string; h: string; p: string }) {
  return (
    <div className="reveal tilt glass rounded-[18px] p-6">
      <div className="mb-3 font-mono text-[13px] text-gold">{n}</div>
      <h3 className="mb-1.5 font-display text-[19px] font-semibold">{h}</h3>
      <p className="text-[14.5px] text-ink2">{p}</p>
    </div>
  )
}

function Door({ acc, role, h, p, cta, ghost, onClick }: { acc: string; role: string; h: string; p: string; cta: string; ghost?: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className="reveal tilt glass edge relative cursor-pointer rounded-[22px] p-8" style={{ ['--acc' as string]: ACC[acc] }}>
      <span className="font-mono text-[12px] uppercase tracking-[0.1em]" style={{ color: ACC[acc] }}>{role}</span>
      <h3 className="my-2.5 font-display text-[26px] font-bold">{h}</h3>
      <p className="mb-5 text-[15px] text-ink2">{p}</p>
      <Btn lg variant={ghost ? 'ghost' : 'gold'}>{cta}</Btn>
    </div>
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
      <div className="h-2 overflow-hidden rounded-full bg-[#0c1a13]"><div className="h-full rounded-full bg-[linear-gradient(90deg,var(--gd),var(--g))]" style={{ animation: 'fill 3.5s ease-in-out infinite' }} /></div>
      <div className="mt-2 flex gap-1.5">
        <div className="h-[18px] flex-1 rounded-md bg-[linear-gradient(135deg,#1E3A2C,#15281E)]" />
        <div className="h-[18px] flex-1 rounded-md bg-[linear-gradient(135deg,#1E3A2C,#15281E)]" />
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
          <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#0c1a13]"><i className="block h-full rounded-full" style={{ width: `${w}%`, background: lead ? 'linear-gradient(90deg,var(--gd),var(--g))' : 'var(--em)' }} /></span>
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
