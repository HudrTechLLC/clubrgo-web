import { Link } from 'react-router-dom'
import type { Variant } from '@/pages/Marvel'

// Floating in-page theme switcher — flips between the three art directions
// (each is its own route). The active theme is highlighted; the pill is a dark
// translucent glass that reads on every background.
const THEMES: { v: Variant; label: string; sw: string }[] = [
  { v: 'aurora', label: 'Aurora', sw: 'linear-gradient(135deg,#0a0f0c 40%,#E9C46A)' },
  { v: 'daylight', label: 'Daylight', sw: 'linear-gradient(135deg,#F6F8F4 40%,#1FA572)' },
  { v: 'stadium', label: 'Stadium', sw: 'linear-gradient(135deg,#0a0f0c 40%,#34E59B)' },
]

export function ThemeSwitcher({ current }: { current: Variant }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2">
      <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-black/45 p-1 pl-2.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <span className="mr-1 hidden text-[11px] font-semibold uppercase tracking-wide text-white/55 sm:inline">Theme</span>
        {THEMES.map((t) => {
          const active = t.v === current
          return (
            <Link
              key={t.v}
              to={`/${t.v}`}
              aria-label={`Switch to ${t.label} theme`}
              aria-current={active ? 'true' : undefined}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${active ? 'bg-white/15 text-white' : 'text-white/65 hover:text-white'}`}
            >
              <span className="h-3.5 w-3.5 rounded-full ring-1 ring-white/40" style={{ background: t.sw }} />
              <span className={active ? 'inline' : 'hidden sm:inline'}>{t.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
