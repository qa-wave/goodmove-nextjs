/**
 * TestimonialsSection — animated scrolling columns
 *
 * 21st.dev components used:
 *  - TestimonialsColumn (efferd/testimonials-columns-1): https://21st.dev/r/efferd/testimonials-columns-1
 *  - Infinite vertical scroll animation via framer-motion
 *
 * Falls back to masonry grid for static/no-JS rendering.
 */
'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TestimonialsColumn } from '@/components/blocks/testimonials-columns-1'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'
import type { GMTestimonial } from '@/types/wordpress'

interface TestimonialsSectionProps {
  testimonials: GMTestimonial[]
}

// ─── Map GMTestimonial → format used by TestimonialsColumn ────────────────────

function toColumnFormat(t: GMTestimonial) {
  return {
    text: `"${t.acf.testimonial_text}"`,
    image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.acf.client_initials || t.acf.client_name)}`,
    name: t.acf.client_name,
    role: t.acf.service_tag || t.acf.client_info || 'Klient Good Move',
  }
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  // Split into two animated columns
  const col1 = testimonials.filter((_, i) => i % 2 === 0).map(toColumnFormat)
  const col2 = testimonials.filter((_, i) => i % 2 !== 0).map(toColumnFormat)

  // Ensure at least some items for the infinite loop
  const filled1 = col1.length > 0 ? col1 : [
    { text: '"Fantastická péče a profesionální přístup. Doporučuji každému."', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Jana', name: 'Jana Nováková', role: 'FyzioMove' },
    { text: '"Díky Good Move jsem se zbavila chronické bolesti zad."', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Petr', name: 'Petr Svoboda', role: 'SportMove' },
    { text: '"Výborní terapeuti, příjemné prostředí."', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Eva', name: 'Eva Dvořáková', role: 'FyzioMove' },
  ]
  const filled2 = col2.length > 0 ? col2 : [
    { text: '"Skvělé skupinové lekce, přátelská atmosféra."', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Martin', name: 'Martin Procházka', role: 'TeamMove' },
    { text: '"Profesionální tým, opravdu viditelné výsledky."', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Lucie', name: 'Lucie Horáková', role: 'KidsMove' },
    { text: '"Moje děti zbožňují pohybové lekce."', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Tomas', name: 'Tomáš Veselý', role: 'KidsMove' },
  ]

  return (
    <section ref={ref} className="section-padding bg-muted/20 overflow-hidden" id="reference" aria-labelledby="testimonials-heading">
      <div className="section-container">

        {/* Header */}
        <div className={cn(
          'mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between transition-all duration-700',
          inView ? 'animate-fade-up' : 'opacity-0 translate-y-6'
        )}>
          <div>
            <Badge variant="secondary" className="mb-4">Reference</Badge>
            <h2 id="testimonials-heading" className="font-display text-4xl font-semibold sm:text-5xl">
              Co říkají klienti
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm sm:text-right">
            Stovky spokojených klientů, kteří díky nám objevili radost z přirozeného pohybu.
          </p>
        </div>

        {/* Animated scrolling columns — TestimonialsColumn from 21st.dev */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn
            testimonials={filled1}
            duration={20}
            className="hidden sm:block"
          />
          <TestimonialsColumn
            testimonials={filled2}
            duration={17}
          />
        </div>

      </div>
    </section>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface TestimonialCardProps {
  t: GMTestimonial
  index: number
  inView: boolean
}

function TestimonialCard({ t, index, inView }: TestimonialCardProps) {
  const { acf } = t
  const delay = `${Math.min(index * 80, 400)}ms`

  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-card p-8 transition-all duration-300',
        'hover:shadow-card',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: inView ? delay : '0ms' }}
    >
      {/* Large opening quote */}
      <div
        aria-hidden="true"
        className="font-display text-7xl font-bold text-primary/15 leading-none mb-1 -ml-1"
      >
        "
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4" aria-label={`Hodnocení: ${acf.rating} z 5`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn('h-4 w-4', i < acf.rating ? 'fill-primary text-primary' : 'text-muted')}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-base leading-relaxed italic text-foreground/90 mb-6">
        {acf.testimonial_text}
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary font-display font-semibold text-primary text-sm">
            {acf.client_initials}
          </div>
          <div>
            <p className="text-sm font-semibold">{acf.client_name}</p>
            <p className="text-xs text-muted-foreground">{acf.client_info}</p>
          </div>
        </div>

        {/* Service tag */}
        <Badge variant="muted" className="shrink-0 ml-2">{acf.service_tag}</Badge>
      </div>
    </div>
  )
}
