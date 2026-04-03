/**
 * Footer — full-featured site footer with links, contact and tagline
 */
import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const SERVICES = [
  { href: '/sluzby/fyziomove',  label: 'FyzioMove' },
  { href: '/sluzby/sportmove',  label: 'SportMove' },
  { href: '/sluzby/teammove',   label: 'TeamMove' },
  { href: '/sluzby/kidsmove',   label: 'KidsMove' },
  { href: '/sluzby/educamove',  label: 'EducaMove' },
  { href: '/sluzby/onlinemove', label: 'OnlineMove' },
]

const NAVIGATION = [
  { href: '/',          label: 'Domů' },
  { href: '/o-nas',     label: 'O nás' },
  { href: '/tym',       label: 'Náš tým' },
  { href: '/cenik',     label: 'Ceník' },
  { href: '/reference', label: 'Reference' },
  { href: '/aktuality', label: 'Aktuality' },
  { href: '/kontakt',   label: 'Kontakt' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="section-container section-padding pb-10">

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl font-semibold text-primary">
              Good<span className="text-foreground font-normal">Move</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              S úctou k tělu učíme pohyb. Studio fyzioterapie a pohybu v Praze – Podolí, postavené na základech vývojové kineziologie.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/goodmove.cz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/goodmove.cz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">
              Služby
            </h3>
            <ul className="space-y-3">
              {SERVICES.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">
              Navigace
            </h3>
            <ul className="space-y-3">
              {NAVIGATION.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+420603409782"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  +420 603 409 782
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@goodmove.cz"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  info@goodmove.cz
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Na+Lysině+772/12,Praha+4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Na Lysině 772/12<br />
                    147 00 Praha 4 – Podolí
                  </span>
                </a>
              </li>
            </ul>

            {/* Opening hours */}
            <div className="mt-6 rounded-xl bg-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                Otevírací doba
              </p>
              <p className="text-xs text-muted-foreground">Po–Pá: 7:00 – 20:00</p>
              <p className="text-xs text-muted-foreground">So: 8:00 – 14:00</p>
              <p className="text-xs text-muted-foreground">Ne: Zavřeno</p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <Separator className="mb-6" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Good Move by Chramosta. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/zasady-ochrany-osobnich-udaju" className="hover:text-primary transition-colors">
              Ochrana osobních údajů
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
