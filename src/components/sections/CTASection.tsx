/**
 * CTASection — full-width call-to-action with contact details
 * 21st.dev pattern: dark/branded section with radial glow + contact grid
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

export function CTASection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="section-padding"
      id="kontakt-cta"
      aria-labelledby="cta-heading"
    >
      <div className="section-container">
        <div className="relative overflow-hidden rounded-[40px] bg-primary px-8 py-20 text-center sm:px-16 lg:px-24">

          {/* Background decorations */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-black/5 blur-2xl" />
          </div>

          {/* Content */}
          <div className={cn(
            'relative z-10 transition-all duration-700',
            inView ? 'animate-fade-up' : 'opacity-0 translate-y-6'
          )}>
            <h2
              id="cta-heading"
              className="font-display text-4xl font-semibold text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              Začněte svou cestu<br />
              k přirozenému pohybu
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/75 max-w-xl mx-auto leading-relaxed">
              Objednejte se na vstupní konzultaci a společně najdeme nejlepší cestu
              k vašemu zdraví a pohodě.
            </p>

            {/* Primary CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="xl"
                variant="secondary"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                <Link href="/kontakt">Objednat konzultaci</Link>
              </Button>
              <Button
                asChild
                size="xl"
                className="border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+420603409782">
                  <Phone className="h-4 w-4 mr-2" />
                  603 409 782
                </a>
              </Button>
            </div>

            {/* Contact details */}
            <div className={cn(
              'mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10',
              'transition-all duration-700 delay-300',
              inView ? 'opacity-100' : 'opacity-0'
            )}>
              <a
                href="mailto:info@goodmove.cz"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@goodmove.cz
              </a>
              <a
                href="https://maps.google.com/?q=Na+Lysině+772/12,Praha+4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Na Lysině 772/12, Praha 4 – Podolí
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
