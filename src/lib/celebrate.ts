import confetti from 'canvas-confetti'

// Celebration bursts for the marketing "Big moments" showcase — the same moments
// the app fires (winner, chop, rollover, hype). Reduced-motion + no-canvas safe.
export type Moment = 'win' | 'chop' | 'rollover' | 'hype'

const reduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const canPaint = () => {
  if (typeof document === 'undefined') return false
  try { return !!document.createElement('canvas').getContext?.('2d') } catch { return false }
}

const COLORS: Record<Moment, string[]> = {
  win: ['#E9C46A', '#F2C24E', '#FFFFFF', '#C99B3E'],
  chop: ['#36C98B', '#E9C46A', '#FFFFFF'],
  rollover: ['#E9C46A', '#C99B3E', '#FFD78A'],
  hype: ['#5AA9E6', '#A98BE6', '#E9C46A', '#36C98B'],
}

/** Fire a moment's burst, optionally originating from a screen point (0..1). */
export function celebrate(kind: Moment = 'win', origin?: { x: number; y: number }) {
  if (reduced() || !canPaint()) return
  const colors = COLORS[kind]
  const o = origin ?? { x: 0.5, y: 0.4 }
  try {
    if (kind === 'win' || kind === 'chop') {
      confetti({ particleCount: 110, spread: 80, startVelocity: 45, origin: o, colors, scalar: 1.05, zIndex: 9999 })
      window.setTimeout(() => confetti({ particleCount: 70, spread: 115, startVelocity: 32, origin: o, colors, zIndex: 9999 }), 160)
    } else if (kind === 'hype') {
      confetti({ particleCount: 55, spread: 70, startVelocity: 30, ticks: 130, origin: o, colors, scalar: 0.9, zIndex: 9999 })
    } else {
      confetti({ particleCount: 40, spread: 60, startVelocity: 26, ticks: 150, origin: o, colors, scalar: 0.85, zIndex: 9999 })
    }
  } catch { /* no-op */ }
}
