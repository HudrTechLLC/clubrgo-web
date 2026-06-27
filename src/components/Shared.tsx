import type { ReactNode } from 'react'

/** A mono "chip" pill in the ClubrGO language. */
export function Chip({ tone = 'neutral', children, className = '' }: { tone?: 'gold' | 'blue' | 'purple' | 'emer' | 'red' | 'neutral'; children: ReactNode; className?: string }) {
  const tones: Record<string, string> = {
    gold: 'bg-gold/[0.13] text-gold border-gold/[0.27]',
    blue: 'bg-[#16314A] text-blue border-blue/30',
    purple: 'bg-[#2A2245] text-purple border-purple/30',
    emer: 'bg-[#0F3327] text-emer border-emer/30',
    red: 'bg-[#3A1C18] text-red border-red/30',
    neutral: 'bg-surf text-ink2 border-line',
  }
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.02em] ${tones[tone]} ${className}`}>{children}</span>
}

/** Gold pill button + ghost button. */
export function Btn({ variant = 'gold', lg = false, children, onClick, className = '' }: { variant?: 'gold' | 'ghost'; lg?: boolean; children: ReactNode; onClick?: () => void; className?: string }) {
  const base = 'inline-flex items-center gap-2 font-display font-semibold rounded-[10px] cursor-pointer transition-transform active:scale-95'
  const v = variant === 'gold'
    ? 'bg-gold text-bg hover:brightness-105 shadow-[0_10px_30px_-12px_rgba(233,196,106,0.5)]'
    : 'bg-transparent text-ink border border-line2 hover:bg-surf'
  const size = lg ? 'px-7 py-3.5 text-[15px]' : 'px-5 py-2.5 text-[13px]'
  return <button onClick={onClick} className={`${base} ${v} ${size} ${className}`}>{children}</button>
}

/**
 * App handoff. The ClubrGO app is live at qa.clubrgo.app, so every CTA
 * ("Start your club", "Sign up", "Join a game") opens it directly. The app's
 * own onboarding handles host-vs-play; we pass the intent as a hint.
 */
export function goToApp(intent?: 'host' | 'play') {
  window.location.href = intent ? `https://qa.clubrgo.app/?intent=${intent}` : 'https://qa.clubrgo.app/'
}
