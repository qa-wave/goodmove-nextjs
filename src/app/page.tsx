/**
 * Homepage — /
 *
 * Server Component: fetches all data from WordPress at build time (ISR).
 * Passes data to Client Components (sections) for interactivity.
 */
import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/HeroSection'
import { MarqueeSection }     from '@/components/sections/MarqueeSection'
import { ServicesSection }    from '@/components/sections/ServicesSection'
import { PhilosophySection }  from '@/components/sections/PhilosophySection'
import { PricingSection }     from '@/components/sections/PricingSection'
import { TeamSection }        from '@/components/sections/TeamSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection }         from '@/components/sections/CTASection'
import {
  getServices,
  getPricingItems,
  getTeamMembers,
  getTestimonials,
} from '@/lib/wordpress'

// ─── ISR: revalidate every hour ──────────────────────────────────────────────
export const revalidate = 3600

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Good Move – Studio fyzioterapie a pohybu, Praha Podolí',
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  // Parallel data fetching — all requests run simultaneously
  const [services, pricingItems, teamMembers, testimonials] = await Promise.all([
    getServices(),
    getPricingItems(),
    getTeamMembers(),
    getTestimonials(),
  ])

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection  services={services} />
      <PhilosophySection />
      <PricingSection   items={pricingItems} />
      <TeamSection      members={teamMembers} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  )
}
