/**
 * Reference — /reference
 */
import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CTASection } from '@/components/sections/CTASection'
import { getTestimonials } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Reference',
  description: 'Co říkají klienti Good Move. Přečtěte si recenze a zkušenosti z fyzioterapie, SportMove a FyzioFit lekcí.',
}

export default async function ReferencePage() {
  const testimonials = await getTestimonials()
  const avg = (testimonials.reduce((s, t) => s + t.acf.rating, 0) / testimonials.length).toFixed(1)

  return (
    <>
      <div className="section-padding">
        <div className="section-container">

          {/* Header + Overall rating */}
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between animate-fade-up">
            <div>
              <Badge variant="secondary" className="mb-4">Co říkají klienti</Badge>
              <h1 className="font-display text-5xl font-semibold sm:text-6xl">Reference</h1>
            </div>

            {/* Overall rating card */}
            <div className="flex items-center gap-6 rounded-3xl border border-border bg-card px-8 py-6">
              <div className="text-center">
                <p className="font-display text-5xl font-bold text-primary">{avg}</p>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">průměrné hodnocení</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold">{testimonials.length}+</p>
                <p className="text-xs text-muted-foreground">recenzí</p>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className="break-inside-avoid mb-4 rounded-3xl border border-border bg-card p-6 transition-all hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.acf.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <div aria-hidden className="font-display text-5xl text-primary/10 font-bold leading-none -mb-2">"</div>
                <blockquote className="text-sm leading-relaxed italic mb-4">{t.acf.testimonial_text}</blockquote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary font-display text-sm font-semibold text-primary">
                      {t.acf.client_initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{t.acf.client_name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.acf.client_info}</p>
                    </div>
                  </div>
                  <Badge variant="muted" className="text-[10px]">{t.acf.service_tag}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CTASection />
    </>
  )
}
