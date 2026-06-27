import { Suspense, lazy, type ReactNode } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

/**
 * Spatial hero slot. When a Spline scene URL is supplied (host provides it from
 * their Spline account), renders the live interactive 3-D scene; otherwise (and
 * always under reduced-motion) renders the static `fallback` — our AI hero image
 * + CSS floating deck. This lets the site ship marvellous today and upgrade to
 * real 3-D the moment a scene URL exists, with zero other changes.
 */
export function SplineHero({ scene, fallback }: { scene?: string; fallback: ReactNode }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!scene || reduce) return <>{fallback}</>
  return (
    <Suspense fallback={fallback}>
      <div className="h-full w-full">
        <Spline scene={scene} />
      </div>
    </Suspense>
  )
}
