/**
 * Stránka Služby — /sluzby
 * Přehled všech 6 programů s detailními kartami
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getServices } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Služby',
  description: 'Přehled všech programů Good Move: FyzioMove, SportMove, TeamMove, KidsMove, EducaMove a OnlineMove.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="mb-16 max-w-2xl animate-fade-up">
          <Badge variant="secondary" className="mb-4">Naše programy</Badge>
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">
            Všechny služby
          </h1>
          <p className="mt-5 text-xl text-muted-foreground leading-relaxed">
            Komplexní nabídka fyzioterapie, pohybových terapií a vzdělávání.
            Každý program je postaven na vědeckých základech vývojové kineziologie.
          </p>
        </div>

        {/* Services list */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/sluzby/${service.slug}`}
              className="group flex gap-6 rounded-3xl border border-border bg-card p-8 transition-all duration-300
                         hover:-translate-y-1 hover:shadow-card-hover hover:border-transparent animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-2xl">
                {service.acf.service_icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h2 className="font-display text-2xl font-semibold">{service.title.rendered}</h2>
                    <p className="text-sm font-medium text-primary mt-0.5">{service.acf.service_subtitle}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed">{service.acf.service_description}</p>
                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.acf.service_features.slice(0, 3).map((f) => (
                    <Badge key={f} variant="muted" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Nejste si jistí, která služba je pro vás ta pravá?</p>
          <Button asChild size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/kontakt">Konzultace zdarma</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
