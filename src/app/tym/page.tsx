/**
 * Tým — /tym
 */
import type { Metadata } from 'next'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CTASection } from '@/components/sections/CTASection'
import { getTeamMembers } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Náš tým',
  description: 'Poznejte tým fyzioterapeutů a trenérů Good Move. Certifikovaní odborníci se specializací na vývojovou kineziologii.',
}

export default async function TeamPage() {
  const members = await getTeamMembers()

  return (
    <>
      <div className="section-padding">
        <div className="section-container">
          {/* Header */}
          <div className="mb-16 max-w-2xl animate-fade-up">
            <Badge variant="secondary" className="mb-4">Náš tým</Badge>
            <h1 className="font-display text-5xl font-semibold sm:text-6xl">
              Tým odborníků
            </h1>
            <p className="mt-5 text-xl text-muted-foreground leading-relaxed">
              Naši fyzioterapeuti a trenéři sdílejí společnou vizi: pomáhat lidem pohybovat
              se přirozeně, bez bolesti a s radostí.
            </p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => {
              const photo = member._embedded?.['wp:featuredmedia']?.[0]
              const { acf } = member
              return (
                <div
                  key={member.id}
                  className="rounded-3xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Photo or placeholder */}
                  <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                    {photo ? (
                      <Image
                        src={photo.source_url}
                        alt={photo.alt_text || member.title.rendered}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-primary/40">
                        <span className="font-display text-6xl font-semibold">{acf.member_initials}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h2 className="font-display text-2xl font-semibold">{member.title.rendered}</h2>
                    <p className="text-primary font-medium mt-1 mb-3">{acf.member_role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{acf.member_bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {acf.member_specializations.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">{spec}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <CTASection />
    </>
  )
}
