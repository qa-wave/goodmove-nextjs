/**
 * MarqueeSection — infinite scrolling ticker with keywords
 * 21st.dev pattern: seamless CSS marquee
 */

import React from 'react'

const ITEMS = [
  'Fyzioterapie',
  'SportMove',
  'FyzioFit',
  'KidsMove',
  'Vývojová kineziologie',
  'Lymfatická drenáž',
  'Online lekce',
  'EducaMove',
  'Rehabilitace',
  'Pohybová terapie',
]

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
      {text}
      <span className="h-1.5 w-1.5 rounded-full bg-primary/50" aria-hidden="true" />
    </span>
  )
}

export function MarqueeSection() {
  const doubledItems = [...ITEMS, ...ITEMS]

  return (
    <div
      className="relative overflow-hidden border-y border-border bg-muted/30 py-5"
      aria-hidden="true"  // decorative only
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scrolling track */}
      <div className="flex animate-marquee gap-8 w-max">
        {doubledItems.map((item, i) => (
          <MarqueeItem key={`${item}-${i}`} text={item} />
        ))}
      </div>
    </div>
  )
}
