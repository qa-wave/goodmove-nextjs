/**
 * PhilosophySection — "O nás / Náš přístup" split section
 * 21st.dev pattern: left quote + right feature grid
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

const FEATURES = [
  { icon: '🧬', title: 'Vývojová kineziologie', desc: 'Vědecký základ celého přístupu k pohybu a terapii' },
  { icon: '🎯', title: 'Individuální přístup', desc: 'Každý klient je jedinečný – terapie na míru' },
  { icon: '🏋️', title: 'Moderní vybavení', desc: 'Tělocvična, 2 ordinace a MiniGym' },
  { icon: '👩‍⚕️', title: 'Zkušený tým', desc: 'Certifikovaní fyzioterapeuti a trenéři' },
] as const

export function PhilosophySection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding" id="o-nas" aria-labelledby="philosophy-heading">
      <div className="section-container">
        <div className="overflow-hidden rounded-[40px] border border-border bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── Left: quote + text ───────────────────────────────── */}
            <div className={cn(
              'flex flex-col justify-center p-10 lg:p-16 transition-all duration-700',
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            )}>
              <Badge variant="secondary" className="mb-6 self-start">Náš přístup</Badge>

              {/* Decorated blockquote */}
              <blockquote
                id="philosophy-heading"
                className="relative font-display text-3xl font-medium leading-snug lg:text-4xl pl-5 border-l-[3px] border-primary text-foreground"
              >
                „Věříme, že kvalitní pohyb je základem zdravého a spokojeného života."
              </blockquote>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                Tým kvalifikovaných fyzioterapeutů a trenérů Good Move staví svůj přístup
                na základech vývojové kineziologie. Pracujeme s respektem k tělu a
                individualitě každého klienta.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Naše prostory zahrnují dvě soukromé ordinace, prostornou tělocvičnu pro
                individuální i skupinové lekce a MiniGym pro ty, kdo preferují soukromí.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-8 self-start"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link href="/o-nas">Poznat náš příběh</Link>
              </Button>
            </div>

            {/* ── Right: feature grid + visual ────────────────────── */}
            <div className={cn(
              'relative flex flex-col gap-6 bg-muted/40 p-10 lg:p-16 transition-all duration-700 delay-150',
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            )}>

              {/* Decorative circle */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-8 top-8 h-48 w-48 rounded-full bg-primary/5 blur-3xl"
              />

              {/* Feature grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 relative z-10">
                {FEATURES.map(({ icon, title, desc }, i) => (
                  <div
                    key={title}
                    className={cn(
                      'rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card',
                      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}
                    style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                  >
                    <div className="mb-3 text-2xl">{icon}</div>
                    <h3 className="text-sm font-semibold mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Trust bar */}
              <div className="mt-2 flex items-center gap-6 border-t border-border pt-6">
                {[
                  { val: '10+', label: 'let praxe' },
                  { val: '2K+', label: 'klientů' },
                  { val: '98%', label: 'spokojenost' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-display text-2xl font-bold text-primary">{val}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
