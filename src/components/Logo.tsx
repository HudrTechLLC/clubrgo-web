// ClubrGO Medallion mark — "Champion of the Club". Fills its box; reads as a
// medal at every size. `gold` renders the gold-on-dark chip glyph; pass a size.
export function MedalGlyph({ size = 22, gradientId = 'cg-gold' }: { size?: number; gradientId?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 84 84" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0D285" />
          <stop offset="1" stopColor="#C99B3E" />
        </linearGradient>
      </defs>
      <path d="M27 60 L22 80 L42 68 L62 80 L57 60 Z" fill="#C99B3E" />
      <circle cx="42" cy="34" r="30" fill={`url(#${gradientId})`} />
      <path d="M42 16 l5.4 12 13.2 1 -10 8.9 3 12.9 -11.6 -6.9 -11.6 6.9 3 -12.9 -10 -8.9 13.2 -1 Z" fill="#11201A" />
    </svg>
  )
}

/** Full brand lockup: medal chip + ClubrGO wordmark (one word, caps GO). */
export function BrandLogo({ chip = 22 }: { chip?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-display font-bold text-[20px]">
      <span className="grid place-items-center rounded-[10px] border border-line bg-card" style={{ width: chip + 12, height: chip + 12 }}>
        <MedalGlyph size={chip} />
      </span>
      <span className="whitespace-nowrap">Clubr<span className="text-gold">GO</span></span>
    </span>
  )
}
