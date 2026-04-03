/**
 * O nás — /o-nas
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TeamSection } from '@/components/sections/TeamSection'
import { CTASection } from '@/components/sections/CTASection'
import { getTeamMembers } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'O nás',
  description: 'Poznejte příběh Good Move – studio fyzioterapie a pohybu v Praze – Podolí, postavené na základech vývojové kineziologie.',
}

const VALUES = [
  { icon: '🧬', title: 'Vývojová kineziologie', desc: 'Celý náš přístup vychází z vědeckých poznatků vývojové kineziologie – metody pracující se správnými pohybovými vzorci od nejranějšího věku.' },
  { icon: '🙏', title: 'Úcta k tělu', desc: 'Každý klient je jedinečný. Přistupujeme individuálně, nasloucháme tělu a respektujeme jeho přirozené limity i možnosti.' },
  { icon: '📚', title: 'Kontinuální vzdělávání', desc: 'Náš tým se neustále vzdělává, sleduje nejnovější poznatky a absolvuje certifikované kurzy, aby klientům nabídl péči nejvyšší kvality.' },
  { icon: '🤝', title: 'Partnerství s klientem', desc: 'Terapie není jednosměrná. Pracujeme společně s klientem, edukujeme ho a motivujeme k aktivní péči o vlastní zdraví.' },
]

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()

  return (
    <>
      {/* Hero */}
      <div className="section-padding">
        <div className="section-container max-w-4xl">
          <Badge variant="secondary" className="mb-6 animate-fade-up">Náš příběh</Badge>
          <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl animate-fade-up delay-75">
            Studio, kde se pohyb<br />
            <em className="gradient-text not-italic">stává přirozeností</em>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-up delay-150">
            Good Move vzniklo z přesvědčení, že kvalitní pohyb je základem zdravého a
            spokojeného života. Od roku 2014 pomáháme klientům v Praze vrátit se
            k přirozenému pohybu.
          </p>
        </div>
      </div>

      {/* Story section */}
      <div className="section-padding bg-muted/30">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-semibold mb-6">Jak jsme začínali</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Zakladatelka Jana Chramostová otevřela Good Move v roce 2014 s jednoduchou
                  myšlenkou: fyzioterapie by měla být dostupná, srozumitelná a skutečně efektivní.
                </p>
                <p>
                  Dnes provozujeme moderní studio v Praze 4 – Podolí s komplexní nabídkou
                  fyzioterapie, pohybové terapie a vzdělávání. Náš tým tvoří certifikovaní
                  fyzioterapeuti a trenéři sdílející společnou filosofii péče.
                </p>
                <p>
                  Každý rok pracujeme s více než 500 klienty a naše skupinové lekce FyzioFit
                  navštěvují desítky nadšenců týdně.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {VALUES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="text-2xl mb-3">{icon}</div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prostory */}
      <div className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-semibold mb-4">Naše prostory</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Moderní studio navržené pro maximální komfort a efektivitu terapie.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: '🏥', name: 'Dvě soukromé ordinace', desc: 'Pro individuální fyzioterapeutická sezení v soukromí' },
              { icon: '🏋️', name: 'Prostorná tělocvična', desc: 'Pro individuální i skupinové lekce SportMove a FyzioFit' },
              { icon: '🧘', name: 'MiniGym', desc: 'Intimnější prostor pro klienty preferující více soukromí' },
            ].map(({ icon, name, desc }) => (
              <div key={name} className="flex flex-col items-center text-center rounded-3xl border border-border bg-card p-8">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-semibold text-lg mb-2">{name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            📍 Na Lysině 772/12, 147 00 Praha 4 – Podolí
            {' · '}
            <a
              href="https://maps.google.com/?q=Na+Lysině+772/12,Praha+4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Zobrazit na mapě →
            </a>
          </p>
        </div>
      </div>

      {/* Team */}
      <TeamSection members={teamMembers} />
      <CTASection />
    </>
  )
}
