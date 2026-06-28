import { useEffect, useState } from 'react'

// Floating section-nav pill — HIDDEN at the top (the header menu is the nav there)
// and slides in once you scroll past the header, so it never duplicates the header.
// Leads with a "Top" pill to jump back up, and highlights the section in view.
const LINKS = [
  { id: 'features', label: 'Features' },
  { id: 'games', label: 'Games' },
  { id: 'moments', label: 'Moments' },
  { id: 'how', label: 'How' },
  { id: 'board', label: 'Board' },
]

export function FloatingNav() {
  const [active, setActive] = useState('')
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 220)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`fixed left-1/2 top-2.5 z-[60] -translate-x-1/2 transition-all duration-300 ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
    >
      <nav className="no-scrollbar flex max-w-[92vw] items-center gap-0.5 overflow-x-auto rounded-full border border-white/12 bg-black/55 p-1 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-bold text-white transition-colors hover:bg-white/20"
        >
          ↑ Top
        </button>
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
