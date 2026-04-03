/**
 * Ceník — /cenik
 * Kompletní přehled cen všech služeb
 *
 * 21st.dev components used:
 *  - Pricing2 (shadcnblockscom/pricing2): https://21st.dev/r/shadcnblockscom/pricing2
 *    Used for the main service pricing cards with monthly/yearly toggle
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CTASection } from '@/components/sections/CTASection'
import { Pricing2 } from '@/components/blocks/shadcnblocks-com-pricing2'
import { getPricingItems } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Ceník',
  description: 'Přehled cen fyzioterapie, SportMove, FyzioFit a dalších služeb Good Move. Transparentní ceník platný od září 2024.',
}

export default async function PricingPage() {
  const items = await getPricingItems()

  // Additional pricing info not from WP CPT
  const additionalPricing = [
    { name: 'Lymfatická drenáž', duration: '60 minut', price: '1 400 Kč' },
    { name: 'Lymfatická drenáž', duration: '90 minut', price: '1 800 Kč' },
    { name: 'Fyzioterapie dětí 0–2 roky', duration: 'do 30 minut', price: '800 Kč' },
    { name: 'FyzioFit balíček', duration: '16 lekcí', price: '5 120 Kč' },
  ]

  return (
    <>
      <div className="section-padding">
        <div className="section-container">

          {/* Header */}
          <div className="mb-16 text-center animate-fade-up">
            <Badge variant="secondary" className="mb-4">Ceník platný od 1. 9. 2024</Badge>
            <h1 className="font-display text-5xl font-semibold sm:text-6xl">
              Transparentní ceny
            </h1>
            <p className="mt-5 text-xl text-muted-foreground max-w-xl mx-auto">
              Žádné skryté poplatky. Přesně víte, za co platíte.
            </p>
          </div>

          {/* Main pricing cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
            {items.map((item, index) => {
              const { acf } = item
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1 hover:shadow-card-hover animate-fade-up ${
                    acf.pricing_featured
                      ? 'border-primary bg-primary text-primary-foreground shadow-glow'
                      : 'border-border bg-card'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {acf.pricing_featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-background text-primary border-border shadow-sm">⭐ Nejoblíbenější</Badge>
                    </div>
                  )}
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${acf.pricing_featured ? 'text-primary-foreground/70' : 'text-primary'}`}>
                    {acf.pricing_category}
                  </p>
                  <h2 className="font-display text-2xl font-semibold mb-2">{acf.pricing_name}</h2>
                  <p className={`text-sm leading-relaxed mb-6 ${acf.pricing_featured ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>
                    {acf.pricing_description}
                  </p>
                  <div className="mb-1">
                    <span className="font-display text-5xl font-bold">{acf.pricing_amount.toLocaleString('cs-CZ')}</span>
                    <span className={`ml-1 text-xl ${acf.pricing_featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>Kč</span>
                  </div>
                  <p className={`text-sm mb-8 ${acf.pricing_featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{acf.pricing_unit}</p>
                  <div className={`mb-6 h-px ${acf.pricing_featured ? 'bg-primary-foreground/20' : 'bg-border'}`} />
                  <ul className="flex-1 space-y-3 mb-8">
                    {acf.pricing_features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${acf.pricing_featured ? 'text-primary-foreground' : 'text-primary'}`} />
                        <span className={`text-sm ${acf.pricing_featured ? 'text-primary-foreground/85' : 'text-muted-foreground'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant={acf.pricing_featured ? 'secondary' : 'outline'} size="lg" className="w-full">
                    <Link href="/kontakt">{acf.pricing_cta}</Link>
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Additional prices table */}
          <div className="rounded-3xl border border-border bg-card overflow-hidden animate-fade-up delay-300">
            <div className="p-8 border-b border-border">
              <h2 className="font-display text-2xl font-semibold">Další ceny</h2>
            </div>
            <div className="divide-y divide-border">
              {additionalPricing.map(({ name, duration, price }) => (
                <div key={`${name}-${duration}`} className="flex items-center justify-between px-8 py-4">
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">{duration}</p>
                  </div>
                  <p className="font-display text-xl font-semibold text-primary">{price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <p className="mt-8 text-center text-sm text-muted-foreground animate-fade-up delay-500">
            Ceny jsou uvedeny včetně DPH. Nevíte si rady s výběrem?{' '}
            <Link href="/kontakt" className="text-primary hover:underline font-medium">
              Napište nám →
            </Link>
          </p>
        </div>
      </div>

      {/* ── Pricing2 block from 21st.dev ──────────────────────────────────────── */}
      <Pricing2
        heading="Pohybové balíčky"
        description="Předplaťte si sérii lekcí a ušetřete oproti jednorázovým cenám"
        plans={[
          {
            id: 'starter',
            name: 'Starter',
            description: 'Pro nové klienty a příležitostné cvičence',
            monthlyPrice: '4 500 Kč',
            yearlyPrice: '3 800 Kč',
            features: [
              { text: '5 lekcí FyzioFit nebo SportMove' },
              { text: 'Vstupní pohybová analýza' },
              { text: 'Platnost 2 měsíce' },
              { text: 'Flexibilní rozvrh' },
            ],
            button: { text: 'Objednat Starter', url: '/kontakt' },
          },
          {
            id: 'pro',
            name: 'Pro',
            description: 'Pro pravidelné cvičence s ambicemi',
            monthlyPrice: '7 900 Kč',
            yearlyPrice: '6 500 Kč',
            features: [
              { text: '10 lekcí FyzioFit nebo SportMove' },
              { text: 'Vstupní i průběžná analýza' },
              { text: 'Platnost 3 měsíce' },
              { text: 'Prioritní rezervace termínů' },
            ],
            button: { text: 'Objednat Pro', url: '/kontakt' },
          },
          {
            id: 'unlimited',
            name: 'Unlimited',
            description: 'Maximální péče pro ty, kteří to myslí vážně',
            monthlyPrice: '14 900 Kč',
            yearlyPrice: '12 500 Kč',
            features: [
              { text: 'Neomezené lekce po dobu 1 měsíce' },
              { text: 'Osobní fyzioterapeut' },
              { text: 'Vstupní, průběžná i výstupní analýza' },
              { text: 'Domácí cvičební program' },
            ],
            button: { text: 'Objednat Unlimited', url: '/kontakt' },
          },
        ]}
      />

      <CTASection />
    </>
  )
}
