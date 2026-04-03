/**
 * Kontakt — /kontakt
 * Contact form + map + contact info
 */
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Objednejte se na fyzioterapii nebo lekci v Good Move. Kontaktujte nás telefonicky, emailem nebo vyplňte formulář.',
}

const CONTACT_INFO = [
  { icon: '📞', label: 'Telefon', value: '+420 603 409 782', href: 'tel:+420603409782' },
  { icon: '✉️', label: 'E-mail', value: 'info@goodmove.cz', href: 'mailto:info@goodmove.cz' },
  { icon: '📍', label: 'Adresa', value: 'Na Lysině 772/12\n147 00 Praha 4 – Podolí', href: 'https://maps.google.com/?q=Na+Lysině+772/12,Praha+4' },
]

const HOURS = [
  { day: 'Pondělí – Pátek', time: '7:00 – 20:00' },
  { day: 'Sobota', time: '8:00 – 14:00' },
  { day: 'Neděle', time: 'Zavřeno' },
]

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="mb-16 max-w-xl animate-fade-up">
          <Badge variant="secondary" className="mb-4">Kontakt</Badge>
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">
            Ozvěte se nám
          </h1>
          <p className="mt-5 text-xl text-muted-foreground leading-relaxed">
            Rádi vám pomůžeme s výběrem té správné služby nebo vám zodpovíme jakékoliv otázky.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── Left: Contact info + map ────────────────────────────── */}
          <div className="space-y-6 lg:col-span-1 animate-fade-up delay-150">

            {/* Contact cards */}
            {CONTACT_INFO.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card hover:border-primary/20 group"
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                  <p className="text-sm font-medium whitespace-pre-line group-hover:text-primary transition-colors">{value}</p>
                </div>
              </a>
            ))}

            {/* Opening hours */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Otevírací doba
              </p>
              <div className="space-y-2">
                {HOURS.map(({ day, time }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{day}</span>
                    <span className={`font-medium ${time === 'Zavřeno' ? 'text-muted-foreground' : ''}`}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded map */}
            <div className="overflow-hidden rounded-2xl border border-border aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.3!2d14.42!3d50.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDAyJzI0LjAiTiAxNMKwMjUnMTIuMCJF!5e0!3m2!1scs!2scz!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Good Move"
              />
            </div>
          </div>

          {/* ── Right: Contact form ─────────────────────────────────── */}
          <div className="lg:col-span-2 animate-fade-up delay-300">
            <div className="rounded-3xl border border-border bg-card p-8 lg:p-10">
              <h2 className="font-display text-3xl font-semibold mb-2">Napište nám</h2>
              <p className="text-muted-foreground mb-8">
                Vyplňte formulář a ozveme se vám do 24 hodin.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
