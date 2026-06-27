import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Refined scroll-reveal: fades + rises into view once, with a tasteful spring-y
 * ease. Honors prefers-reduced-motion (renders static). Used across the
 * "marvel" landing variants in place of the old class-toggle reveal.
 */
export function Reveal({
  children, delay = 0, y = 26, className = '',
}: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
