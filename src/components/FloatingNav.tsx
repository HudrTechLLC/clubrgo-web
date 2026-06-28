import { useEffect, useState } from 'react'

// Floating section-nav pill — fixed near the top-center and travels with the page
// so any section is one tap away without scrolling back up. Horizontally
// scrollable on small screens; highlights the section currently in view.
const LINKS = [
  { id: 'features', label: 'Features' },
  { id: 'games', label: 'Games' },
  { id: 'moments', label: 'Moments' },
  { id: 'how', label: 'How' },
  { id: 'board', label: 'Board' },
]

export function FloatingNav() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="fixed left-1/2 top-2.5 z-[60] -translate-x-1/2">
      <nav className="no-scrollbar flex max-w-[86vw] items-center gap-0.5 overflow-x-auto rounded-full border border-white/12 bg-black/50 p-1 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md">
        {LINKS.map((l) => {
          const on = active === l.id
          return (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={on ? 'true' : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${on ? 'bg-white/15 text-white' : 'text-white/65 hover:text-white'}`}
            >
              {l.label}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
