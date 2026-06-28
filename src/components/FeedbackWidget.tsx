import { useEffect, useRef, useState } from 'react'

// Draggable feedback widget for the marketing site. Captures a quick note + 5
// rated questions (each with an optional remark) to improve the site, and POSTs
// to TournamentPro's central `submit-feedback` store (same endpoint ClubR uses).
// Name is remembered locally and prefilled next time.

const ENDPOINT = 'https://tgblnqsckkrdhjmncmhu.supabase.co/functions/v1/submit-feedback'
const NAME_KEY = 'clubrgo.fb.name'
const POS_KEY = 'clubrgo.fb.pos'

const QUESTIONS: { key: string; q: string }[] = [
  { key: 'clarity', q: 'How clearly did the site explain what ClubrGO does?' },
  { key: 'design', q: 'How appealing are the visuals & overall design?' },
  { key: 'intent', q: 'After seeing this, how likely are you to start or join a club?' },
  { key: 'navigation', q: 'How easy was it to find what you were looking for?' },
  { key: 'recommend', q: 'How likely are you to recommend this site to a friend or club-mate?' },
]

type Pos = { x: number; y: number }
const readPos = (): Pos | null => { try { const v = localStorage.getItem(POS_KEY); return v ? JSON.parse(v) : null } catch { return null } }

function Stars({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n === value ? 0 : n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={`text-[22px] leading-none transition-transform active:scale-90 ${n <= value ? 'text-gold' : 'text-ink3 hover:text-ink2'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [name, setName] = useState('')
  const [quick, setQuick] = useState('')
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [remarks, setRemarks] = useState<Record<string, string>>({})
  const [pos, setPos] = useState<Pos | null>(null)
  const drag = useRef({ active: false, moved: false, dx: 0, dy: 0 })

  useEffect(() => {
    try { const n = localStorage.getItem(NAME_KEY); if (n) setName(n) } catch { /* ignore */ }
    setPos(readPos())
  }, [])

  // --- drag the launcher ---
  const onPointerDown = (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement
    const r = el.getBoundingClientRect()
    drag.current = { active: true, moved: false, dx: e.clientX - r.left, dy: e.clientY - r.top }
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return
    const nx = e.clientX - drag.current.dx
    const ny = e.clientY - drag.current.dy
    if (Math.abs(e.movementX) + Math.abs(e.movementY) > 0) drag.current.moved = true
    setPos({ x: Math.max(8, Math.min(window.innerWidth - 60, nx)), y: Math.max(8, Math.min(window.innerHeight - 60, ny)) })
  }
  const onPointerUp = () => {
    if (drag.current.active && drag.current.moved && pos) { try { localStorage.setItem(POS_KEY, JSON.stringify(pos)) } catch { /* ignore */ } }
    const wasDrag = drag.current.moved
    drag.current.active = false
    if (!wasDrag) setOpen(true)
  }

  async function submit() {
    setBusy(true)
    try { if (name.trim()) localStorage.setItem(NAME_KEY, name.trim()) } catch { /* ignore */ }
    const sections: Record<string, { score?: number; disliked?: string }> = {}
    for (const { key } of QUESTIONS) {
      if (ratings[key] || remarks[key]?.trim()) sections[key] = { score: ratings[key] || undefined, disliked: remarks[key]?.trim() || undefined }
    }
    const scores = QUESTIONS.map((x) => ratings[x.key]).filter((n) => n > 0)
    const avg = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : null
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          product: 'clubr', app: 'clubrgo-marketing', kind: 'guided_review',
          reviewer_name: name.trim() || undefined,
          overall_note: quick.trim() || undefined,
          sections, avg_score: avg,
          context: {
            user_agent: navigator.userAgent, referrer: document.referrer, page_url: location.href,
            viewport: `${window.innerWidth}x${window.innerHeight}`, language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          raw: { name, quick, ratings, remarks, questions: QUESTIONS },
        }),
      }).catch(() => { /* never block on network */ })
    } finally {
      setBusy(false); setSent(true)
      setTimeout(() => { setOpen(false); setSent(false); setQuick(''); setRatings({}); setRemarks({}) }, 1600)
    }
  }

  const launcherStyle = pos ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' } : undefined

  return (
    <>
      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        aria-label="Give feedback"
        style={launcherStyle}
        className="fixed bottom-[5.5rem] right-4 z-[70] flex h-12 w-12 touch-none items-center justify-center rounded-full border border-gold/40 bg-gold/90 text-[20px] text-bg shadow-[0_12px_30px_-10px_rgba(233,196,106,0.6)] active:scale-95"
      >
        💬
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center" onClick={() => setOpen(false)}>
          <div className="mv max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-line bg-bg-card p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()} style={{ background: 'var(--color-card)' }}>
            {sent ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <span className="text-4xl">🎉</span>
                <p className="font-display text-lg font-bold text-ink">Thank you!</p>
                <p className="text-sm text-ink2">Your feedback helps us make ClubrGO better.</p>
              </div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">Quick feedback</h3>
                  <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink2 hover:text-ink">✕</button>
                </div>

                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink3">Your name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className="mb-3 w-full rounded-xl border border-line bg-bg2 px-3 py-2 text-sm text-ink outline-none focus:border-gold/60" />

                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink3">Your feedback</label>
                <textarea value={quick} onChange={(e) => setQuick(e.target.value)} rows={2} placeholder="Anything you loved or that could be better…" className="mb-4 w-full resize-none rounded-xl border border-line bg-bg2 px-3 py-2 text-sm text-ink outline-none focus:border-gold/60" />

                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink3">A few quick ratings <span className="font-normal text-ink3">(remarks optional)</span></div>
                <div className="flex flex-col gap-3.5">
                  {QUESTIONS.map(({ key, q }) => (
                    <div key={key}>
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <span className="text-[13px] text-ink2">{q}</span>
                        <Stars value={ratings[key] || 0} onChange={(n) => setRatings((r) => ({ ...r, [key]: n }))} />
                      </div>
                      <input value={remarks[key] || ''} onChange={(e) => setRemarks((r) => ({ ...r, [key]: e.target.value }))} placeholder="Remark (optional)" className="w-full rounded-lg border border-line bg-bg2 px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-gold/60" />
                    </div>
                  ))}
                </div>

                <button type="button" disabled={busy} onClick={submit} className="mt-5 w-full rounded-xl bg-gold py-3 text-sm font-bold text-bg transition active:scale-95 disabled:opacity-60">
                  {busy ? 'Sending…' : 'Send feedback'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
