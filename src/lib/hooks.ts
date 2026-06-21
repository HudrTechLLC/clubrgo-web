import { useEffect, useRef, useState } from 'react'

/** Adds `.js-anim` to <html> and reveals `.reveal` elements on scroll. */
export function useScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js-anim')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.14 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** A live HH:MM:SS countdown that loops, for the mockup cards. */
export function useCountdown(startSeconds = 47 * 60 + 10) {
  const [s, setS] = useState(startSeconds)
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v <= 0 ? startSeconds : v - 1)), 1000)
    return () => clearInterval(t)
  }, [startSeconds])
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(x)}`
}

/** Rotating "winning square" index for the Squares mini-demo. */
export function useMovingWinner(wins: number[], intervalMs = 1600) {
  const [idx, setIdx] = useState(0)
  const ref = useRef(wins)
  ref.current = wins
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ref.current.length), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  return wins[idx]
}
