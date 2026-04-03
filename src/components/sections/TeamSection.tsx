/**
 * TeamSection — team member cards with initials avatar
 */
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'
import type { GMTeamMember } from '@/types/wordpress'

interface TeamSectionProps {
  members: GMTeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section ref={ref} className="section-padding" id="tym" aria-labelledby="team-heading">
      <div className="section-container">

        {/* Header */}
        <div className={cn(
          'mb-14 max-w-xl transition-all duration-700',
          inView ? 'animate-fade-up' : 'opacity-0 translate-y-6'
        )}>
          <Badge variant="secondary" className="mb-4">Náš tým</Badge>
          <h2 id="team-heading" className="font-display text-4xl font-semibold sm:text-5xl">
            Tým odborníků
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Kvalifikovaní fyzioterapeuti a trenéři, kteří stavějí svůj přístup
            na základech vývojové kineziologie.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          'mt-12 text-center transition-all duration-700 delay-500',
          inView ? 'opacity-100' : 'opacity-0'
        )}>
          <Link href="/tym" className="text-sm font-semibold text-primary hover:underline">
            Poznat celý tým →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface TeamCardProps {
  member: GMTeamMember
  index: number
  inView: boolean
}

function TeamCard({ member, index, inView }: TeamCardProps) {
  const { acf } = member
  const photo = member._embedded?.['wp:featuredmedia']?.[0]
  const delay = `${index * 80}ms`
  const name = member.title.rendered

  return (
    <div
      className={cn(
        'group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-transparent',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: inView ? delay : '0ms' }}
    >
      {/* Avatar */}
      <div className="relative mb-5">
        {/* Dashed ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-border scale-110 transition-transform duration-300 group-hover:scale-[1.15] group-hover:border-primary/30" />

        {photo ? (
          <Image
            src={photo.source_url}
            alt={photo.alt_text || name}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <span className="font-display text-3xl font-semibold text-primary">
              {acf.member_initials}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-display text-xl font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{acf.member_role}</p>

      {/* Specializations */}
      {acf.member_specializations.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {acf.member_specializations.slice(0, 3).map((spec) => (
            <Badge key={spec} variant="outline" className="text-[11px]">
              {spec}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
