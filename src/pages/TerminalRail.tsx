import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/Logo'
import { Chip, Btn, goToApp } from '@/components/Shared'
import { useScrollReveal, useCountdown, useMovingWinner, useRotator } from '@/lib/hooks'

// =============================================================================
// TerminalRail — the structured, product-led ClubrGO landing.
// Grid backdrop, mono nav, browser device-frame mockup. Same content + tokens
// as FeltTable; different art direction. Mirrors clubrgo-terminal-rail.html.
// =============================================================================

const OWN = new Set([3, 5, 12, 18, 21, 29, 33, 36, 40])
const WINS = [10, 27, 19, 5]

export function TerminalRail() {
  useScrollReveal()
  const cd = useCountdown()
  const winner = useMovingWinner(WINS)

  return (
    <div className="relative overflow-x-hidden">
      {/* structured grid backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20" style={{ background: 'linear-gradient(var(--color-line) 1px, transparent 1px) 0 0/100% 64px, linear-gradient(90deg, var(--color-line) 1px, transparent 1px) 0 0/64px 100%', maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 78%)' }} />
      <div className="fixed inset-0 -z-20" style={{ background: 'radial-gradient(80% 50% at 80% 0%, rgba(233,196,106,.07), transparent 60%), #0B1410' }} />

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-line bg-[rgba(9,17,13,0.72)] backdrop-blur-[14px]">
        <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between px-7">
          <Link to="/terminal-rail"><BrandLogo /></Link>
          <nav className="hidden items-center gap-2 md:flex">
            {[['/ how-it-works', '#how'], ['/ games', '#games'], ['/ leaderboard', '#board'], ['/ start', '#start']].map(([t, href]) => (
              <a key={t} href={href} className="rounded-lg px-3 py-2 font-mono text-[12px] tracking-[0.04em] text-ink2 transition hover:bg-surf hover:text-ink">{t}</a>
            ))}
          </nav>
          <Btn onClick={() => goToApp('host')}>Start your club</Btn>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="mx-auto max-w-[1140px] px-7 pt-16 pb-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-[22px] flex flex-wrap gap-2">
                {['FT FANTASY', 'LAST LONGER', 'SQUARES'].map((t) => (
                  <span key={t} className="rounded-md border border-line bg-card px-2.5 py-1.5 font-mono text-[11px] tracking-[0.06em] text-ink2">{t}</span>
                ))}
              </div>
              <h1 className="mb-5 font-display text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.05] tracking-[-0.02em]">The scorekeeper for your club&rsquo;s <span className="text-gold">games.</span></h1>
              <p className="mb-7 max-w-[44ch] text-[18px] text-ink2">ClubrGO tracks every Fantasy draft, Last Longer and Squares grid your club plays — live, accurate, and rolled into one leaderboard that runs all season.</p>
              <div className="flex flex-wrap gap-3">
                <Btn lg onClick={() => goToApp('host')}>Start your club →</Btn>
                <Btn lg variant="ghost" onClick={() => document.getElementById('games')?.scrollIntoView()}>Explore the games</Btn>
              </div>
              <div className="mt-[30px] grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {[['3', 'Game types'], ['1', 'Club board'], ['∞', 'Seasons']].map(([n, l]) => (
                  <div key={l} className="bg-card p-4"><div className="font-display text-[22px] font-bold">{n}</div><div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink3">{l}</div></div>
                ))}
              </div>
            </div>
            <DeviceMockup cd={cd} />
          </div>
        </section>

        {/* how it works */}
        <section id="how" className="border-t border-line py-[72px]">
          <div className="mx-auto max-w-[1140px] px-7">
            <SecHead title="From group chat to game night, in three steps." sub="You run the night. ClubrGO keeps the score — and the leaderboard — so you don't have to." />
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[['01', 'Start your club', 'Name it, pick an emoji. Your club is the home for every game and the season-long board.', '~20 sec'],
                ['02', 'Spin up a game', 'Choose Fantasy, Last Longer or Squares, set it up, and it goes live for your members.', '3 types'],
                ['03', 'Share the link', 'One link into your group chat. Players tap in — no setup, no chasing, no spreadsheet.', '1 link']].map(([idx, h, p, tag]) => (
                <div key={idx} className="reveal grid grid-cols-[64px_1fr_auto] items-center gap-5 bg-card px-6 py-[22px] transition hover:bg-surf max-md:grid-cols-[40px_1fr]">
                  <span className="font-mono text-[13px] text-gold">{idx}</span>
                  <div><h3 className="mb-0.5 font-display text-[19px] font-semibold">{h}</h3><p className="text-[14px] text-ink2">{p}</p></div>
                  <span className="whitespace-nowrap font-mono text-[11px] text-ink3 max-md:hidden">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* games */}
        <section id="games" className="border-t border-line py-[72px]">
          <div className="mx-auto max-w-[1140px] px-7">
            <SecHead title="Three games. One scorekeeper." sub="Each tracked live, each scored the moment it ends, each feeding your club board." />
            <div className="grid gap-4 md:grid-cols-3">
              <GameTile tone="purple" tag="♠ Fantasy" h="FT Fantasy" p="Draft a final table of nine. Points by where your picks finish." demo={<DraftDemo />} />
              <GameTile tone="gold" tag="◆ Last Longer" h="Last Longer" p="Last player standing. Counts update live; the board auto-sorts." demo={<StandingsDemo />} />
              <GameTile tone="emer" tag="▦ Squares" h="Squares" p="Claim squares on the grid. Period scores light up winners." demo={<SquaresDemo winner={winner} />} />
            </div>
          </div>
        </section>

        {/* leaderboard */}
        <section id="board" className="border-t border-line py-[72px]">
          <div className="mx-auto grid max-w-[1140px] items-center gap-10 px-7 md:grid-cols-2">
            <div className="reveal">
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink3">The club leaderboard</span>
              <h2 className="my-3 font-display text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.1] tracking-[-0.02em]">One board.<br />All season long.</h2>
              <p className="mb-3 text-[16px] text-ink2">Every result — a Fantasy finish, a Last Longer win, a Squares period — rolls into a single club leaderboard. Points stack across all three games.</p>
              <p className="text-[14px] text-ink3">Your regulars always have a reason to show up: the top of the board is never settled for long.</p>
            </div>
            <Leaderboard />
          </div>
        </section>

        {/* CTA */}
        <section id="start" className="border-t border-line py-[72px]">
          <div className="mx-auto max-w-[1140px] px-7">
            <div className="reveal mb-10 text-center"><h2 className="font-display text-[clamp(26px,3.2vw,38px)] font-bold tracking-[-0.02em]">Two ways in.</h2></div>
            <div className="grid gap-4 md:grid-cols-2">
              <Door tone="host" role="Host" h="Start your club" p="Create a club, spin up your first game, share the link with your crew." cta="Create my club →" onClick={() => goToApp('host')} />
              <Door tone="play" role="Play" h="Join your table" p="Got an invite link? Paste it and you're in. Or browse clubs open to new players." cta="I have an invite →" ghost onClick={() => goToApp('play')} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

/* ---------- pieces ---------- */

function SecHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-[30px]">
      <h2 className="max-w-[18ch] font-display text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.1] tracking-[-0.02em]">{title}</h2>
      <p className="max-w-[36ch] text-[15px] text-ink2">{sub}</p>
    </div>
  )
}

function DeviceMockup({ cd }: { cd: string }) {
  const active = useRotator(3, 2000) // 0=FT Fantasy, 1=Last Longer, 2=Squares
  const winner = useMovingWinner([10, 27, 19, 5])

  const cards = [
    // 0 — FT Fantasy
    <div key="ft" className="relative overflow-hidden rounded-[14px] border border-gold/[0.22] bg-card p-3.5">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
      <div className="mb-2 flex justify-between">
        <Chip tone="purple">♠ FT Fantasy</Chip>
        <div className="text-right"><div className="font-mono text-[9px] uppercase text-ink3">Locks in</div><div className="font-mono text-[14px] font-semibold text-gold">{cd}</div></div>
      </div>
      <div className="font-display text-[15px] font-bold">WSOP Main — Final Table</div>
      <div className="mt-2 flex border-t border-line pt-2.5">
        {[['Format', 'Draft 4'], ['Finalists', '9'], ['Players', '32/40']].map(([k, v], i) => (
          <div key={k} className={`flex-1 ${i > 0 ? 'border-l border-line pl-2.5' : ''}`}><div className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink3">{k}</div><div className="mt-0.5 font-display text-[13px] font-bold">{v}</div></div>
        ))}
      </div>
    </div>,
    // 1 — Last Longer
    <div key="ll" className="relative overflow-hidden rounded-[14px] border border-gold/[0.22] bg-card p-3.5">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
      <div className="mb-2 flex justify-between">
        <Chip tone="blue">◆ Last Longer</Chip>
        <div className="text-right"><div className="font-mono text-[9px] uppercase text-ink3">Next break</div><div className="font-mono text-[14px] font-semibold text-gold">01:59:47</div></div>
      </div>
      <div className="mb-2.5 font-display text-[15px] font-bold">Sunday Million — Last Longer</div>
      <div className="flex flex-col gap-2 border-t border-line pt-2.5">
        {([[1, 'Gary "Grinder" P.', 92, true], [2, 'Lena Park', 60, false], [3, 'Sam Rivers', 38, false]] as const).map(([r, name, w, lead]) => (
          <div key={r} className="flex items-center gap-2">
            <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full font-display text-[10px] font-bold ${lead ? 'bg-gold text-bg' : 'bg-surf text-ink2'}`}>{r}</span>
            <span className="w-[88px] shrink-0 truncate text-[11px] text-ink2">{name}</span>
            <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#0C1A13]"><i className="block h-full rounded-full" style={{ width: `${w}%`, background: lead ? 'linear-gradient(90deg,var(--color-goldD),var(--color-gold))' : 'var(--color-emer)' }} /></span>
          </div>
        ))}
      </div>
    </div>,
    // 2 — Squares
    <div key="sq" className="relative overflow-hidden rounded-[14px] border border-gold/[0.22] bg-card p-3.5">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,var(--color-gold),transparent)]" />
      <div className="mb-2 flex justify-between">
        <Chip tone="emer">▦ Squares</Chip>
        <div className="text-right"><div className="font-mono text-[9px] uppercase text-ink3">Closes in</div><div className="font-mono text-[14px] font-semibold text-gold">33:57</div></div>
      </div>
      <div className="mb-2.5 font-display text-[15px] font-bold">Sunday Squares — Texans @ Colts</div>
      <div className="grid grid-cols-10 gap-[3px] border-t border-line pt-2.5">
        {Array.from({ length: 60 }).map((_, i) => {
          const own = new Set([3, 5, 12, 18, 21, 29, 33, 36, 41, 47, 52])
          return <i key={i} className={`block aspect-square rounded-[2px] ${i === winner ? 'bg-gold' : own.has(i) ? 'bg-raised shadow-[inset_0_0_0_1px_rgba(233,196,106,0.3)]' : 'bg-card'}`} />
        })}
      </div>
    </div>,
  ]

  return (
    <div className="reveal rounded-[18px] border border-line2 bg-[linear-gradient(160deg,#13241b,#0c1611)] p-3.5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-1.5 px-1 pb-3">
        <i className="h-2.5 w-2.5 rounded-full bg-line2" /><i className="h-2.5 w-2.5 rounded-full bg-line2" /><i className="h-2.5 w-2.5 rounded-full bg-line2" />
        <span className="ml-2.5 flex-1 text-center font-mono text-[11px] text-ink3">clubrgo.app / felt-and-friends</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-bg">
        <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2"><BrandLogo chip={15} /><Chip tone="gold">Host</Chip></div>
        <div className="px-3.5 pt-1.5 pb-2 font-display text-[20px] font-bold">Games</div>
        <div className="flex flex-wrap gap-1.5 px-3.5 pb-1.5">
          <Chip tone="gold" className="!bg-gold !text-bg !border-gold">Available 6</Chip><Chip>Playing 2</Chip><Chip>Hosting 1</Chip><Chip>Done 14</Chip>
        </div>
        {/* rotating game card: crossfade between the three every 2s */}
        <div className="relative m-3.5" style={{ minHeight: 176 }}>
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

function GameTile({ tone, tag, h, p, demo }: { tone: 'purple' | 'gold' | 'emer'; tag: string; h: string; p: string; demo: React.ReactNode }) {
  const tagColor = tone === 'purple' ? 'text-purple' : tone === 'gold' ? 'text-gold' : 'text-emer'
  return (
    <div className="reveal overflow-hidden rounded-[14px] border border-line bg-card transition hover:-translate-y-[3px]">
      <div className="border-b border-line p-[18px]">
        <span className={`font-mono text-[10px] uppercase tracking-[0.08em] ${tagColor}`}>{tag}</span>
        <h3 className="my-1.5 font-display text-[19px] font-semibold">{h}</h3>
        <p className="text-[14px] text-ink2">{p}</p>
      </div>
      <div className="h-24 bg-bg2">{demo}</div>
    </div>
  )
}

function DraftDemo() {
  return (
    <div className="p-3.5">
      <div className="mb-[7px] flex justify-between font-mono text-[9px] text-ink3"><span>BUDGET LEFT</span><span>PICKS 2/4</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-[#0C1A13]"><div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-goldD),var(--color-gold))]" style={{ animation: 'fill 3.5s ease-in-out infinite' }} /></div>
      <div className="mt-2 flex gap-1.5">
        <div className="h-4 flex-1 rounded-md bg-[linear-gradient(135deg,#1E3A2C,#15281E)]" /><div className="h-4 flex-1 rounded-md bg-[linear-gradient(135deg,#1E3A2C,#15281E)]" />
        <div className="h-4 flex-1 rounded-md border border-dashed border-line bg-[#0E1B14]" /><div className="h-4 flex-1 rounded-md border border-dashed border-line bg-[#0E1B14]" />
      </div>
    </div>
  )
}
function StandingsDemo() {
  const rows = [[1, 92, true], [2, 58, false], [3, 36, false]] as const
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
    <div className="grid grid-cols-9 gap-[3px] p-3">
      {Array.from({ length: 45 }).map((_, i) => (
        <i key={i} className={`block aspect-square rounded-[3px] ${i === winner ? 'bg-gold' : OWN.has(i) ? 'bg-raised shadow-[inset_0_0_0_1px_rgba(233,196,106,0.3)]' : 'bg-card'}`} />
      ))}
    </div>
  )
}
function Leaderboard() {
  const rows: [string, string, string, boolean][] = [
    ['1', 'Gary "Grinder" P.', '1,840', true], ['2', 'Lena Park', '1,620', false], ['3', 'Sam Rivers', '1,475', false], ['4', 'Marcus Yu', '1,290', false], ['5', 'Priya N.', '1,155', false],
  ]
  return (
    <div className="reveal rounded-[14px] border border-line bg-bg2 p-2">
      <div className="flex items-center justify-between px-[15px] pt-3 pb-2.5"><span className="font-display text-[16px] font-bold">Felt &amp; Friends</span><span className="font-mono text-[11px] text-ink3">SEASON 2 · WK 6</span></div>
      {rows.map(([r, name, pts, lead]) => (
        <div key={r} className={`my-0.5 flex items-center gap-2.5 rounded-[10px] px-[15px] py-2.5 ${lead ? 'border border-gold/30 bg-[linear-gradient(110deg,#1A3326,#14271C)]' : ''}`}>
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
    <div onClick={onClick} className={`reveal cursor-pointer rounded-2xl border bg-card p-[30px] transition hover:-translate-y-[3px] ${tone === 'host' ? 'border-gold/30' : 'border-line'}`}>
      <span className={`font-mono text-[11px] uppercase tracking-[0.1em] ${tone === 'host' ? 'text-gold' : 'text-emer'}`}>{role}</span>
      <h3 className="my-2 font-display text-[23px] font-bold">{h}</h3>
      <p className="mb-5 text-[14px] text-ink2">{p}</p>
      <Btn lg variant={ghost ? 'ghost' : 'gold'}>{cta}</Btn>
    </div>
  )
}
function Footer() {
  return (
    <footer className="border-t border-line py-11">
      <div className="mx-auto max-w-[1140px] px-7">
        <div className="flex flex-wrap justify-between gap-[30px]">
          <div><BrandLogo /><p className="mt-3 max-w-[38ch] text-[13px] text-ink3">The transparent scorekeeper and club leaderboard for private clubs.</p></div>
          <div className="flex flex-wrap gap-10">
            {[['Product', ['Games', 'How it works', 'Leaderboard']], ['Company', ['About', 'Contact', 'Privacy']], ['Get started', ['Start your club', 'Join a game']]].map(([h, links]) => (
              <div key={h as string}>
                <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink3">{h as string}</h4>
                {(links as string[]).map((l) => <a key={l} href="#" className="mb-2 block text-[14px] text-ink2 transition hover:text-gold">{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-2.5 border-t border-line pt-[22px] font-mono text-[12px] text-ink3">
          <span>© 2026 ClubrGO · the game scorekeeper &amp; club leaderboard</span><span>keep the score. play on.</span>
        </div>
      </div>
    </footer>
  )
}
