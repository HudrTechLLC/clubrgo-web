import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/Logo'
import { Chip, Btn, goToApp } from '@/components/Shared'
import { useScrollReveal, useCountdown, useMovingWinner, useRotator } from '@/lib/hooks'

// =============================================================================
// FeltTable — the cinematic ClubrGO marketing landing.
// Pine-felt + chip-gold. Money/betting/poker-free: pure scorekeeper + club
// leaderboard story. Mirrors clubrgo-felt-table.html, as React + Tailwind.
// =============================================================================

const OWN = new Set([3, 5, 12, 18, 21, 29, 33, 36])
const WINS = [10, 27, 19, 5]

export function FeltTable() {
  useScrollReveal()
  const cd = useCountdown()
  const winner = useMovingWinner(WINS)

  return (
    <div className="relative overflow-x-hidden">
      {/* ambient felt wash */}
      <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(120% 80% at 50% -10%, rgba(30,58,44,.55), transparent 60%), radial-gradient(90% 60% at 85% 0%, rgba(233,196,106,.10), transparent 55%), #0B1410' }} />

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-line bg-[rgba(9,17,13,0.66)] backdrop-blur-[14px]">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
          <Link to="/felt-table"><BrandLogo /></Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#hosts" className="text-sm text-ink2 transition hover:text-ink">For hosts</a>
            <a href="#games" className="text-sm text-ink2 transition hover:text-ink">Games</a>
            <a href="#how" className="text-sm text-ink2 transition hover:text-ink">How it works</a>
            <a href="#board" className="text-sm text-ink2 transition hover:text-ink">Leaderboard</a>
          </nav>
          <Btn onClick={() => goToApp('host')}>Start your club</Btn>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="mx-auto max-w-[1180px] px-6 pt-[88px] pb-[60px]">
          <div className="grid items-center gap-[50px] md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink3">For the host who runs the night</span>
              <h1 className="my-[18px] font-display text-[clamp(40px,5.4vw,68px)] font-bold leading-[1.02] tracking-[-0.02em]">
                Run your game night.{' '}
                <span className="relative whitespace-nowrap text-gold">Keep the score honest.
                  <span className="absolute inset-x-0 bottom-[0.08em] h-[0.10em] rounded bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
                </span>
              </h1>
              <p className="mb-[30px] max-w-[34ch] text-[19px] text-ink2">
                ClubrGO is the scorekeeper for your club&rsquo;s games — Fantasy, Last Longer and Squares — tracked live and scored fair, with a club leaderboard that crowns your regulars season after season.
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <Btn lg onClick={() => goToApp('host')}>Start your club →</Btn>
                <Btn lg variant="ghost" onClick={() => document.getElementById('how')?.scrollIntoView()}>See how it works</Btn>
              </div>
              <div className="mt-[26px] flex flex-wrap gap-[22px] text-[13px] text-ink3">
                <span><span className="text-emer">●</span> <b className="font-semibold text-ink2">3</b> game types</span>
                <span>Live <b className="font-semibold text-ink2">club leaderboard</b></span>
                <span>Runs in your <b className="font-semibold text-ink2">group chat&rsquo;s</b> place</span>
              </div>
            </div>

            {/* phone mockup */}
            <PhoneMockup cd={cd} />
          </div>
        </section>

        {/* host steps — anchored under both /#hosts and /#how since the 3 steps ARE the how-it-works narrative */}
        <div id="how" />
        <section id="hosts" className="mx-auto max-w-[1180px] px-6 py-[84px]">
          <SecHead eyebrow="You're the host" title="From group chat to game night in three taps." sub="You already run the night. ClubrGO keeps the score for the games on top of it — live standings, instant winners, and a leaderboard your regulars chase all season." />
          <div className="grid gap-5 md:grid-cols-3">
            <Step n="01 · Create" h="Start your club" p="Name it, pick an emoji, done. Your club is the home for every game you run." />
            <Step n="02 · Choose" h="Spin up a game" p="Fantasy, Last Longer or Squares. Pick the type, set it up, you're live in seconds." />
            <Step n="03 · Invite" h="Share the link" p="Drop one link in your group. Players tap in — no account hoops, no chasing." />
          </div>
        </section>

        {/* games */}
        <section id="games" className="mx-auto max-w-[1180px] px-6 pb-[84px]">
          <SecHead eyebrow="Three games, one scorekeeper" title="The games your table already plays." sub="Each one scored live, with a clear winner the moment it ends — and every result feeding your club leaderboard." />
          <div className="grid gap-5 md:grid-cols-3">
            <GameTile tone="purple" tag="♠ Fantasy" h="FT Fantasy" p="Draft a final table of nine. Score points by where your picks finish — highest total wins." demo={<DraftDemo />} />
            <GameTile tone="gold" tag="◆ Last Longer" h="Last Longer" p="Last player standing wins. Counts update live; the board auto-sorts." demo={<StandingsDemo />} />
            <GameTile tone="emer" tag="▦ Squares" h="Squares" p="Claim squares on the grid. Period scores light up the winners." demo={<SquaresDemo winner={winner} />} />
          </div>
        </section>

        {/* leaderboard */}
        <section id="board" className="mx-auto max-w-[1180px] px-6 py-[20px]">
          <div className="reveal rounded-[28px] border border-line bg-[linear-gradient(160deg,#11201a,#0c1611)] p-10">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink3">The club leaderboard</span>
                <h2 className="my-3.5 font-display text-[clamp(26px,3.2vw,38px)] font-bold tracking-[-0.02em]">One board. <span className="text-gold">All season long.</span></h2>
                <p className="mb-2.5 text-[17px] text-ink2">Every Fantasy, Last Longer and Squares result feeds a single club leaderboard. Points stack across game types, so your regulars have something to chase every single night.</p>
                <p className="text-[15px] text-ink3">Win a Last Longer, take a Squares period, finish top of a Fantasy draft — it all counts toward who sits at the top of your club.</p>
              </div>
              <Leaderboard />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1180px] px-6 pt-[60px] pb-[84px]">
          <div className="mx-auto mb-[30px] max-w-[640px] text-center">
            <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-bold tracking-[-0.02em]">Two ways in.</h2>
            <p className="text-[17px] text-ink2">Here to run the night, or here to play it?</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Door tone="host" role="Host a game" h="Start your club" p="Create a club, spin up your first game, and share the link with your crew." cta="Create my club →" onClick={() => goToApp('host')} />
            <Door tone="play" role="Play a game" h="Join your table" p="Got an invite link? Paste it and you're in. Or browse clubs open to new players." cta="I have an invite →" ghost onClick={() => goToApp('play')} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

/* ---------- pieces ---------- */

function SecHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="reveal mb-12 max-w-[640px]">
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink3">{eyebrow}</span>
      <h2 className="my-3 font-display text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.08] tracking-[-0.02em]">{title}</h2>
      <p className="text-[17px] text-ink2">{sub}</p>
    </div>
  )
}

function Step({ n, h, p }: { n: string; h: string; p: string }) {
  return (
    <div className="reveal rounded-[20px] border border-line bg-card p-[26px] transition hover:-translate-y-[3px] hover:border-line2">
      <div className="mb-4 font-mono text-[13px] text-gold">{n}</div>
      <h3 className="mb-2 font-display text-[20px] font-semibold">{h}</h3>
      <p className="text-[15px] text-ink2">{p}</p>
    </div>
  )
}

function GameTile({ tone, tag, h, p, demo }: { tone: 'purple' | 'gold' | 'emer'; tag: string; h: string; p: string; demo: React.ReactNode }) {
  const top = tone === 'purple' ? 'border-t-purple' : tone === 'gold' ? 'border-t-gold' : 'border-t-emer'
  const tagColor = tone === 'purple' ? 'text-purple' : tone === 'gold' ? 'text-gold' : 'text-emer'
  return (
    <div className={`reveal rounded-[20px] border border-line border-t-[3px] ${top} bg-card p-[26px] transition hover:-translate-y-[3px]`}>
      <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${tagColor}`}>{tag}</span>
      <h3 className="my-2 font-display text-[22px] font-semibold">{h}</h3>
      <p className="mb-[18px] text-[15px] text-ink2">{p}</p>
      <div className="h-[88px] overflow-hidden rounded-xl border border-line bg-bg2">{demo}</div>
    </div>
  )
}

function PhoneMockup({ cd }: { cd: string }) {
  const active = useRotator(3, 2000) // 0=FT Fantasy, 1=Last Longer, 2=Squares
  const winner = useMovingWinner([10, 27, 19, 5])

  const cards = [
    // 0 — FT Fantasy
    <div key="ft" className="relative overflow-hidden rounded-[20px] border border-gold/20 bg-[linear-gradient(150deg,#16291e,#11201a)] p-[15px]">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
      <div className="mb-2.5 flex items-start justify-between">
        <Chip tone="purple">♠ FT Fantasy</Chip>
        <div className="text-right"><div className="font-mono text-[10px] uppercase text-ink3">Locks in</div><div className="font-mono text-[15px] font-semibold text-gold">{cd}</div></div>
      </div>
      <div className="font-display text-[17px] font-bold leading-[1.15]">WSOP Main — Final Table</div>
      <div className="mt-0.5 mb-3 text-[12px] text-ink3">♠ Felt &amp; Friends</div>
      <div className="mb-3 flex border-t border-line pt-3">
        {[['Format', 'Draft 4'], ['Finalists', '9'], ['Players', '32 / 40']].map(([k, v], i) => (
          <div key={k} className={`flex-1 ${i > 0 ? 'border-l border-line pl-3' : ''}`}>
            <div className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink3">{k}</div>
            <div className="font-display text-[15px] font-bold">{v}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red/30 bg-[#3A1C18] px-2.5 py-1 font-mono text-[11px] font-semibold text-red">
          <span className="h-1.5 w-1.5 rounded-full bg-red" style={{ animation: 'blink 1.4s infinite' }} />LIVE · drafting open
        </span>
        <span className="inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-gold">Draft →</span>
      </div>
    </div>,
    // 1 — Last Longer
    <div key="ll" className="relative overflow-hidden rounded-[20px] border border-gold/20 bg-[linear-gradient(150deg,#16291e,#11201a)] p-[15px]">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
      <div className="mb-2.5 flex items-start justify-between">
        <Chip tone="blue">◆ Last Longer</Chip>
        <div className="text-right"><div className="font-mono text-[10px] uppercase text-ink3">Next break</div><div className="font-mono text-[15px] font-semibold text-gold">01:59:47</div></div>
      </div>
      <div className="font-display text-[17px] font-bold leading-[1.15]">Sunday Million — Last Longer</div>
      <div className="mt-0.5 mb-3 text-[12px] text-ink3">◆ Felt &amp; Friends</div>
      <div className="flex flex-col gap-2.5 border-t border-line pt-3">
        {([[1, 'Gary "Grinder" P.', 92, true], [2, 'Lena Park', 60, false], [3, 'Sam Rivers', 38, false]] as const).map(([r, name, w, lead]) => (
          <div key={r} className="flex items-center gap-2.5">
            <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-display text-[11px] font-bold ${lead ? 'bg-gold text-bg' : 'bg-surf text-ink2'}`}>{r}</span>
            <span className="w-[96px] shrink-0 truncate text-[12px] text-ink2">{name}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#0C1A13]"><i className="block h-full rounded-full" style={{ width: `${w}%`, background: lead ? 'linear-gradient(90deg,var(--color-goldD),var(--color-gold))' : 'var(--color-emer)' }} /></span>
          </div>
        ))}
      </div>
    </div>,
    // 2 — Squares
    <div key="sq" className="relative overflow-hidden rounded-[20px] border border-gold/20 bg-[linear-gradient(150deg,#16291e,#11201a)] p-[15px]">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
      <div className="mb-2.5 flex items-start justify-between">
        <Chip tone="emer">▦ Squares</Chip>
        <div className="text-right"><div className="font-mono text-[10px] uppercase text-ink3">Closes in</div><div className="font-mono text-[15px] font-semibold text-gold">33:57</div></div>
      </div>
      <div className="font-display text-[17px] font-bold leading-[1.15]">Sunday Squares — Texans @ Colts</div>
      <div className="mt-0.5 mb-3 text-[12px] text-ink3">▦ Felt &amp; Friends</div>
      <div className="grid grid-cols-10 gap-[3px] border-t border-line pt-3">
        {Array.from({ length: 70 }).map((_, i) => {
          const own = new Set([3, 5, 12, 18, 21, 29, 33, 36, 41, 47, 52, 58, 63])
          return <i key={i} className={`block aspect-square rounded-[2px] ${i === winner ? 'bg-gold' : own.has(i) ? 'bg-raised shadow-[inset_0_0_0_1px_rgba(233,196,106,0.3)]' : 'bg-card'}`} />
        })}
      </div>
    </div>,
  ]

  return (
    <div className="reveal mx-auto w-[330px] justify-self-center rounded-[42px] border border-line2 bg-[linear-gradient(160deg,#1a2c22,#0c1611)] p-3 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)]">
      <div className="relative h-[600px] overflow-hidden rounded-[32px] border border-line bg-bg">
        <div className="flex items-center justify-between px-4 pt-[18px] pb-2.5">
          <BrandLogo chip={17} />
          <Chip tone="gold" className="!py-1">Host</Chip>
        </div>
        <div className="mx-3.5 my-1.5 flex items-center justify-between rounded-2xl border border-line bg-[linear-gradient(110deg,#15281e,#11201a)] px-3 py-2.5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink3">Felt &amp; Friends</div>
            <div className="font-display text-[18px] font-bold">Club leaderboard <span className="text-[13px] text-gold">· wk 6</span></div>
          </div>
          <Btn className="!px-3.5 !py-2 !text-[13px]">View</Btn>
        </div>
        <div className="px-4 pt-3 pb-2 font-display text-[23px] font-bold">Games</div>
        <div className="flex gap-1.5 overflow-hidden px-4">
          <Chip tone="gold" className="!bg-gold !text-bg !border-gold whitespace-nowrap">Available 6</Chip>
          <Chip className="whitespace-nowrap">Playing 2</Chip>
          <Chip className="whitespace-nowrap">Hosting 1</Chip>
        </div>
        {/* rotating game card: crossfade between the three every 2s */}
        <div className="relative m-3.5" style={{ minHeight: 250 }}>
          {cards.map((card, i) => (
            <div key={i} className="transition-opacity duration-500" style={{
              opacity: active === i ? 1 : 0,
              position: active === i ? 'relative' : 'absolute',
              inset: active === i ? undefined : 0,
              pointerEvents: active === i ? 'auto' : 'none',
            }}>{card}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DraftDemo() {
  return (
    <div className="p-3">
      <div className="mb-1.5 flex justify-between font-mono text-[10px] text-ink3"><span>BUDGET LEFT</span><span>PICKS 2/4</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-[#0C1A13]"><div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-goldD),var(--color-gold))]" style={{ animation: 'fill 3.5s ease-in-out infinite' }} /></div>
      <div className="mt-2 flex gap-1.5">
        <div className="h-[18px] flex-1 rounded-md bg-[linear-gradient(135deg,#1E3A2C,#15281E)]" />
        <div className="h-[18px] flex-1 rounded-md bg-[linear-gradient(135deg,#1E3A2C,#15281E)]" />
        <div className="h-[18px] flex-1 rounded-md border border-dashed border-line bg-[#0E1B14]" />
        <div className="h-[18px] flex-1 rounded-md border border-dashed border-line bg-[#0E1B14]" />
      </div>
    </div>
  )
}

function StandingsDemo() {
  const rows = [[1, 92, true], [2, 60, false], [3, 38, false]] as const
  return (
    <div className="flex flex-col gap-2 p-3.5">
      {rows.map(([r, w, lead]) => (
        <div key={r} className="flex items-center gap-2">
          <span className={`grid h-[18px] w-[18px] place-items-center rounded-full font-display text-[10px] font-bold ${lead ? 'bg-gold text-bg' : 'bg-surf text-ink2'}`}>{r}</span>
          <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#0C1A13]"><i className="block h-full rounded-full" style={{ width: `${w}%`, background: lead ? 'linear-gradient(90deg,var(--color-goldD),var(--color-gold))' : 'var(--color-emer)' }} /></span>
        </div>
      ))}
    </div>
  )
}

function SquaresDemo({ winner }: { winner: number }) {
  return (
    <div className="grid grid-cols-8 gap-[3px] p-2.5">
      {Array.from({ length: 40 }).map((_, i) => (
        <i key={i} className={`block aspect-square rounded-[3px] ${i === winner ? 'bg-gold' : OWN.has(i) ? 'bg-raised shadow-[inset_0_0_0_1px_rgba(233,196,106,0.3)]' : 'bg-card'}`} />
      ))}
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
    <div className="rounded-[18px] border border-line bg-bg2 p-2">
      <div className="flex items-center justify-between px-3.5 pt-3 pb-2.5">
        <span className="font-display text-[16px] font-bold">Felt &amp; Friends</span>
        <span className="font-mono text-[11px] text-ink3">SEASON 2 · WK 6</span>
      </div>
      {rows.map(([r, name, pts, lead]) => (
        <div key={r} className={`my-[3px] flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 ${lead ? 'border border-gold/30 bg-[linear-gradient(110deg,#1A3326,#14271C)]' : ''}`}>
          <span className={`grid h-6 w-6 place-items-center rounded-full font-display text-[12px] font-bold ${lead ? 'bg-gold text-bg' : 'bg-surf text-ink2'}`}>{r}</span>
          <span className="flex-1 text-[14px] font-semibold">{name}</span>
          <span className={`font-mono text-[14px] font-semibold ${lead ? 'text-gold' : ''}`}>{pts}<span className="text-[11px] text-ink3"> pts</span></span>
        </div>
      ))}
    </div>
  )
}

function Door({ tone, role, h, p, cta, ghost, onClick }: { tone: 'host' | 'play'; role: string; h: string; p: string; cta: string; ghost?: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`reveal cursor-pointer rounded-[24px] border p-9 transition hover:-translate-y-1 ${tone === 'host' ? 'border-gold/30 bg-[linear-gradient(160deg,#1a2c1f,#11201a)]' : 'border-emer/25 bg-card'}`}>
      <span className={`font-mono text-[12px] uppercase tracking-[0.1em] ${tone === 'host' ? 'text-gold' : 'text-emer'}`}>{role}</span>
      <h3 className="my-2.5 font-display text-[26px] font-bold">{h}</h3>
      <p className="mb-[22px] text-[15px] text-ink2">{p}</p>
      <Btn lg variant={ghost ? 'ghost' : 'gold'}>{cta}</Btn>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-line py-[50px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-wrap items-start justify-between gap-[30px]">
          <div>
            <BrandLogo />
            <p className="mt-3.5 max-w-[40ch] text-[13px] text-ink3">The transparent scorekeeper and club leaderboard for private clubs. Built for the host who runs the night.</p>
          </div>
          <div className="flex flex-wrap gap-10">
            <FootCol h="Product" links={['Games', 'How it works', 'For hosts']} />
            <FootCol h="Company" links={['About', 'Contact', 'Privacy']} />
            <FootCol h="Get the app" links={['Start your club', 'Join a game']} />
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-2.5 border-t border-line pt-6 text-[12px] text-ink3">
          <span>© 2026 ClubrGO. The game scorekeeper &amp; club leaderboard for private clubs.</span>
          <span className="font-mono">Keep the score. Play on.</span>
        </div>
      </div>
    </footer>
  )
}

function FootCol({ h, links }: { h: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">{h}</h4>
      {links.map((l) => <a key={l} href="#" className="mb-2.5 block text-[14px] text-ink2 transition hover:text-gold">{l}</a>)}
    </div>
  )
}
