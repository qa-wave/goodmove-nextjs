/**
 * PricingSection — clean pricing cards with featured highlight
 * 21st.dev pattern: card with glowing border on featured item
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'
import type { GMPricingItem } from '@/types/wordpress'

interface PricingSectionProps {
  items: GMPricingItem[]
}

export function PricingSection({ items }: PricingSectionProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section ref={ref} className="section-padding bg-muted/30" id="cenik" aria-labelledby="pricing-heading">
      <div className="section-container">

        {/* Header */}
        <div className={cn(
          'mb-14 text-center transition-all duration-700',
          inView ? 'animate-fade-up' : 'opacity-0 translate-y-6'
        )}>
          <Badge variant="secondary" className="mb-4">Ceník</Badge>
          <h2 id="pricing-heading" className="font-display text-4xl font-semibold sm:text-5xl">
            Transparentní ceny
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
            Žádné skryté poplatky. Vyberte si službu, která vám nejlépe vyhovuje.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <PricingCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Full pricing CTA */}
        <p className={cn(
          'mt-10 text-center text-sm text-muted-foreground transition-all duration-700 delay-500',
          inView ? 'opacity-100' : 'opacity-0'
        )}>
          Potřebujete jiný typ služby?{' '}
          <Link href="/cenik" className="font-semibold text-primary hover:underline">
            Zobrazit kompletní ceník →
          </Link>
        </p>
      </div>
    </section>
  )
}

// ─── Individual pricing card ──────────────────────────────────────────────────

interface PricingCardProps {
  item: GMPricingItem
  index: number
  inView: boolean
}

function PricingCard({ item, index, inView }: PricingCardProps) {
  const { acf } = item
  const delay = `${index * 100}ms`

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-3xl border p-8 transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-card-hover',
        acf.pricing_featured
          ? 'border-primary bg-primary text-primary-foreground shadow-glow'
          : 'border-border bg-card',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: inView ? delay : '0ms' }}
    >
      {/* Featured badge */}
      {acf.pricing_featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="bg-background text-primary border-border shadow-sm">
            ⭐ Nejoblíbenější
          </Badge>
        </div>
      )}

      {/* Category */}
      <p className={cn(
        'text-xs font-semibold uppercase tracking-widest mb-2',
        acf.pricing_featured ? 'text-primary-foreground/70' : 'text-primary'
      )}>
        {acf.pricing_category}
      </p>

      {/* Name */}
      <h3 className="font-display text-2xl font-semibold mb-2">{acf.pricing_name}</h3>

      {/* Description */}
      <p className={cn(
        'text-sm leading-relaxed mb-6',
        acf.pricing_featured ? 'text-primary-foreground/75' : 'text-muted-foreground'
      )}>
        {acf.pricing_description}
      </p>

      {/* Price */}
      <div className="mb-1">
        <span className="font-display text-5xl font-bold tracking-tight">
          {acf.pricing_amount.toLocaleString('cs-CZ')}
        </span>
        <span className={cn(
          'ml-1 text-xl',
          acf.pricing_featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
        )}>
          Kč
        </span>
      </div>
      <p className={cn(
        'text-sm mb-8',
        acf.pricing_featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
      )}>
        {acf.pricing_unit}
      </p>

      {/* Divider */}
      <div className={cn('mb-6 h-px', acf.pricing_featured ? 'bg-primary-foreground/20' : 'bg-border')} />

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {acf.pricing_features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className={cn(
              'mt-0.5 h-4 w-4 shrink-0',
              acf.pricing_featured ? 'text-primary-foreground' : 'text-primary'
            )} />
            <span className={cn(
              'text-sm',
              acf.pricing_featured ? 'text-primary-foreground/85' : 'text-muted-foreground'
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        asChild
        variant={acf.pricing_featured ? 'secondary' : 'outline'}
        size="lg"
        className="w-full"
      >
        <Link href="/kontakt">{acf.pricing_cta}</Link>
      </Button>
    </div>
  )
}
