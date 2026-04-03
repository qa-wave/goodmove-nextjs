/**
 * ServicesSection — Bento-grid layout for all 6 GoodMove programs
 * 21st.dev pattern: asymmetric grid with alternating large/small cards
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'
import type { GMService } from '@/types/wordpress'

interface ServicesSectionProps {
  services: GMService[]
}

const COLOR_MAP = {
  warm:    'bg-secondary text-secondary-foreground',
  sage:    'bg-sage-light text-sage',
  primary: 'bg-primary/10 text-primary',
} as const

export function ServicesSection({ services }: ServicesSectionProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section ref={ref} className="section-padding" id="sluzby" aria-labelledby="services-heading">
      <div className="section-container">

        {/* Header */}
        <div className={cn(
          'mb-14 max-w-2xl transition-all duration-700',
          inView ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-6'
        )}>
          <Badge variant="secondary" className="mb-4">Naše služby</Badge>
          <h2 id="services-heading" className="font-display text-4xl font-semibold sm:text-5xl">
            Komplexní péče<br />o váš pohyb
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Od diagnostiky přes terapii až po trénink. Šest specializovaných programů
            postavených na vědeckých základech a individuálním přístupu.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const isLarge = index === 0 || index === 4
            return (
              <ServiceCard
                key={service.id}
                service={service}
                large={isLarge}
                index={index}
                inView={inView}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Individual card ──────────────────────────────────────────────────────────

interface ServiceCardProps {
  service: GMService
  large: boolean
  index: number
  inView: boolean
}

function ServiceCard({ service, large, index, inView }: ServiceCardProps) {
  const { acf } = service
  const iconBg = COLOR_MAP[acf.service_color] ?? COLOR_MAP.primary
  const delay = `${index * 80}ms`

  return (
    <Link
      href={`/sluzby/${service.slug}`}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-card-hover hover:border-transparent',
        // Accent top bar
        'before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-primary',
        'before:scale-x-0 before:origin-left before:transition-transform before:duration-300',
        'hover:before:scale-x-100',
        // Grid placement for large cards
        large && 'sm:col-span-2',
        // Entry animation
        'transition-[opacity,transform]',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: inView ? delay : '0ms' }}
      aria-label={`Přejít na ${service.title.rendered}`}
    >
      {/* Ordinal watermark */}
      <span
        aria-hidden="true"
        className="absolute right-6 top-4 font-display text-7xl font-bold text-foreground/5 leading-none select-none"
      >
        {String(service.id).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div className={cn('mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl', iconBg)}>
        {acf.service_icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-display text-2xl font-semibold">{service.title.rendered}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{acf.service_subtitle}</p>
        <p className={cn('mt-3 text-muted-foreground leading-relaxed', large ? 'text-base max-w-lg' : 'text-sm')}>
          {acf.service_description}
        </p>

        {/* Feature list on large cards */}
        {large && (
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {acf.service_features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary">
        {acf.service_cta_label}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
