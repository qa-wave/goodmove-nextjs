/**
 * HeroSection — above-the-fold hero with animated headline, stats and CTA
 *
 * 21st.dev components used:
 *  - AnimatedGroup (tailark/hero-section-1): https://21st.dev/r/tailark/hero-section-1
 *  - Gradient text headline
 *  - Animated badge with live dot
 *  - Floating stat cards
 *  - Spring animations via framer-motion
 */
'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'

const STATS = [
  { value: '10+',  label: 'Let zkušeností' },
  { value: '2 000+', label: 'Spokojených klientů' },
  { value: '6',    label: 'Programů' },
  { value: '98%',  label: 'Spokojenost' },
] as const

export function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Úvod"
    >
      {/* ── Background decoration ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Radial glow behind headline */}
        <div className="absolute -top-1/4 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        {/* Bottom decorative shape */}
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sage/5 blur-[100px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container section-padding relative w-full">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">

          {/* ── Left: Text content — animated via AnimatedGroup (21st.dev) ─ */}
          <AnimatedGroup preset="blur-slide" className="flex flex-col">

            {/* Location badge */}
            <div>
              <Badge variant="dot" className="mb-8">
                Studio pohybu · Praha 4, Podolí
              </Badge>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                S úctou k tělu<br />
                učíme{' '}
                <em className="gradient-text not-italic">pohyb</em>
              </h1>
            </div>

            {/* Sub-headline */}
            <div>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Propojujeme fyzioterapii, pohyb a péči o tělo na základech vývojové kineziologie.
                Pomáháme vám vrátit se k přirozenosti.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/kontakt">Objednat konzultaci</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sluzby">
                  Prozkoumat služby
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              {/* Star rating */}
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9/5</span>
                {' '}· hodnocení od 200+ klientů
              </p>
            </div>
          </AnimatedGroup>

          {/* ── Right: Visual + Stats ────────────────────────────────── */}
          <div className="relative animate-fade-up delay-300">

            {/* Main image placeholder */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px_40px_24px_24px] bg-gradient-to-b from-secondary to-muted">
              {/* In production: replace with <Image> from WP */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary/40">
                <svg viewBox="0 0 80 80" className="h-24 w-24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="40" cy="20" r="10" />
                  <path d="M40 30 L40 55 M40 38 L24 48 M40 38 L56 48 M40 55 L28 70 M40 55 L52 70" strokeLinecap="round" />
                </svg>
                <span className="font-display italic text-sm">Hero fotografie</span>
              </div>

              {/* Decorative ring */}
              <div className="pointer-events-none absolute inset-6 rounded-[36px_36px_18px_18px] border border-primary/10" />
            </div>

            {/* Floating card: specialty tag */}
            <div className="absolute -left-6 top-16 hidden animate-fade-up delay-500 sm:block">
              <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-light text-lg">
                    🧬
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Vývojová kineziologie</p>
                    <p className="text-xs text-muted-foreground">Vědecký základ péče</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card: next availability */}
            <div className="absolute -right-4 bottom-20 hidden animate-fade-up delay-700 sm:block">
              <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-card">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs font-semibold text-green-600">Volné termíny</p>
                </div>
                <p className="text-sm font-semibold">Tento týden</p>
                <p className="text-xs text-muted-foreground">Vstupní konzultace</p>
              </div>
            </div>

            {/* Stats bar at bottom of image */}
            <div className="mt-4 grid grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-card overflow-hidden shadow-card">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center py-4 px-2">
                  <span className="font-display text-2xl font-bold text-primary leading-none">{value}</span>
                  <span className="mt-1 text-center text-[10px] text-muted-foreground leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
