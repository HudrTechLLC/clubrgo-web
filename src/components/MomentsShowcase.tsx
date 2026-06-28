import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/lib/motion'
import { celebrate, type Moment } from '@/lib/celebrate'

// "Big moments" — interactive showcase of the app's celebration animations. Each
// card auto-fires its OWN burst whenever it scrolls into view (every crossing,
// with a short cooldown so scroll-jitter doesn't spam it) and replays on tap.
const MOMENTS: { kind: Moment; tag: string; h: string; p: string; img?: string; emoji: string }[] = [
  { kind: 'win', tag: '♠ FT Fantasy', h: 'Crown the champion', p: 'When a final-table contest settles, the winner gets a gold confetti shower.', img: '/assets/games/fantasy.webp', emoji: '🏆' },
  { kind: 'chop', tag: '◆ Last Longer', h: 'Seal the chop', p: 'When players agree to split the pool, an emerald-gold flourish marks the deal.', img: '/assets/games/lastlonger.webp', emoji: '🤝' },
  { kind: 'rollover', tag: '▦ Squares', h: 'Roll it over', p: 'An unwon quarter rolls onto Q4 with a shower of gold coins.', img: '/assets/games/squares.webp', emoji: '🪙' },
  { kind: 'hype', tag: '● Live', h: 'Hype the table', p: 'Anyone watching a live game can tap to send a crowd cheer.', emoji: '🔥' },
]

const originOf = (r?: DOMRectReadOnly | DOMRect) =>
  r ? { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight } : undefined

export function MomentsShowcase() {
  const reduce = useReducedMotion()
  // Per-moment cooldown so a card jittering across the viewport edge can't spam.
  const last = useRef<Record<string, number>>({})
  const fire = (kind: Moment, rect?: DOMRectReadOnly | DOMRect) => {
    const t = performance.now()
    if (t - (last.current[kind] ?? 0) < 700) return
    last.current[kind] = t
    celebrate(kind, originOf(rect))
  }

  return (
    <section id="moments" className="mx-auto max-w-[1180px] px-5 py-[72px]">
      <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">Every big moment, celebrated</span>
        <h2 className="my-3 font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] tracking-[-0.02em]">The score is honest. The wins feel <span className="text-gold">huge.</span></h2>
        <p className="text-[17px] text-ink2">Scroll past each — or tap — to see the moment your table will actually get.</p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOMENTS.map((m) => {
          const inner = (
            <button type="button" onClick={(e) => fire(m.kind, e.currentTarget.getBoundingClientRect())} className="block w-full cursor-pointer text-left">
              <div className="relative h-[120px] overflow-hidden">
                {m.img ? (
                  <img src={m.img} alt={m.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover floatpic" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-[44px]">{m.emoji}</div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 42%,var(--color-card))' }} />
                <span className="absolute left-4 top-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-gold">{m.tag}</span>
              </div>
              <div className="px-5 pb-5 pt-1">
                <h3 className="font-display text-[17px] font-semibold">{m.emoji} {m.h}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink2">{m.p}</p>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-line bg-white/5 px-2.5 py-1 text-[11px] font-bold text-gold">Tap to replay ↺</span>
              </div>
            </button>
          )
          if (reduce) {
            return <div key={m.kind} className="glass edge relative overflow-hidden rounded-[18px]">{inner}</div>
          }
          return (
            <motion.div
              key={m.kind}
              className="tilt glass edge relative overflow-hidden rounded-[18px]"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onViewportEnter={(entry) => fire(m.kind, entry?.boundingClientRect)}
            >
              {inner}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
