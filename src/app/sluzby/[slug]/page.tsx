/**
 * Detailní stránka služby — /sluzby/[slug]
 * Dynamická stránka pro každý program (fyziomove, sportmove, …)
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CTASection } from '@/components/sections/CTASection'
import { getServices, getServiceBySlug } from '@/lib/wordpress'

export const revalidate = 3600

// ─── Generate all static paths at build time ──────────────────────────────────
export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)
  if (!service) return { title: 'Služba nenalezena' }
  return {
    title: service.title.rendered,
    description: service.acf.service_description,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ServiceDetailPage(
  { params }: { params: { slug: string } }
) {
  const [service, allServices] = await Promise.all([
    getServiceBySlug(params.slug),
    getServices(),
  ])

  if (!service) notFound()

  const { acf } = service
  const otherServices = allServices.filter((s) => s.slug !== params.slug).slice(0, 3)

  return (
    <>
      <div className="section-padding">
        <div className="section-container max-w-4xl">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Domů</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/sluzby" className="hover:text-primary transition-colors">Služby</Link></li>
              <li aria-hidden>/</li>
              <li className="text-foreground font-medium">{service.title.rendered}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-3xl">
                {acf.service_icon}
              </div>
              <div>
                <Badge variant="secondary">{acf.service_subtitle}</Badge>
                <h1 className="font-display text-4xl font-semibold mt-1 sm:text-5xl">
                  {service.title.rendered}
                </h1>
              </div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {acf.service_description}
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 animate-fade-up delay-150">
            {acf.service_features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4"
              >
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4 animate-fade-up delay-300">
            <Button asChild size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/kontakt">{acf.service_cta_label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/cenik">Zobrazit ceník</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related services */}
      {otherServices.length > 0 && (
        <div className="section-padding bg-muted/30">
          <div className="section-container">
            <h2 className="font-display text-3xl font-semibold mb-8">Další programy</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/sluzby/${s.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card hover:border-transparent"
                >
                  <span className="text-2xl">{s.acf.service_icon}</span>
                  <div>
                    <p className="font-semibold">{s.title.rendered}</p>
                    <p className="text-xs text-muted-foreground">{s.acf.service_subtitle}</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <CTASection />
    </>
  )
}
