/**
 * ContactForm — Client Component
 * Submits to WordPress Contact Form 7 via REST API
 */
'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitContactForm } from '@/lib/wordpress'
import { cn } from '@/lib/utils'

const SERVICES = [
  'FyzioMove – Fyzioterapie',
  'SportMove – Fyziofitness',
  'TeamMove – Skupinové lekce',
  'KidsMove – Děti',
  'EducaMove – Kurzy',
  'OnlineMove – Online',
  'Jiné / Nevím',
]

// CF7 form ID — set in WordPress admin (Forms → Contact form ID)
const CF7_FORM_ID = process.env.NEXT_PUBLIC_CF7_FORM_ID ?? '1'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const result = await submitContactForm(CF7_FORM_ID, {
        name:    data.get('name') as string,
        email:   data.get('email') as string,
        phone:   data.get('phone') as string,
        service: data.get('service') as string,
        message: data.get('message') as string,
      })

      if (result.status === 'mail_sent') {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMsg(result.message || 'Odeslání se nezdařilo. Zkuste to prosím znovu.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Došlo k chybě. Zkontrolujte prosím připojení k internetu.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-scale-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-semibold">Zpráva odeslána!</h3>
        <p className="text-muted-foreground max-w-sm">
          Děkujeme za zprávu. Ozveme se vám do 24 hodin.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Odeslat další zprávu
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium mb-1.5">
            Jméno a příjmení <span className="text-destructive" aria-hidden>*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jana Nováková"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium mb-1.5">
            E-mail <span className="text-destructive" aria-hidden>*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jana@example.cz"
            className={inputCls}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="cf-phone" className="block text-sm font-medium mb-1.5">
          Telefon (nepovinné)
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+420 123 456 789"
          className={inputCls}
        />
      </div>

      {/* Service select */}
      <div>
        <label htmlFor="cf-service" className="block text-sm font-medium mb-1.5">
          O jakou službu máte zájem?
        </label>
        <select id="cf-service" name="service" className={cn(inputCls, 'cursor-pointer')}>
          <option value="">– Vyberte –</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium mb-1.5">
          Zpráva <span className="text-destructive" aria-hidden>*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Dobrý den, chtěl/a bych se objednat na…"
          className={cn(inputCls, 'resize-none')}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive animate-scale-in">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        loading={status === 'loading'}
        rightIcon={<Send className="h-4 w-4" />}
        className="w-full sm:w-auto"
      >
        Odeslat zprávu
      </Button>

      <p className="text-xs text-muted-foreground">
        Odesláním formuláře souhlasíte se{' '}
        <a href="/zasady-ochrany-osobnich-udaju" className="underline hover:text-primary">
          zpracováním osobních údajů
        </a>
        .
      </p>
    </form>
  )
}

// ─── Shared input styles ──────────────────────────────────────────────────────

const inputCls =
  `w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm
   placeholder:text-muted-foreground/50
   focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
   transition-all duration-200
   disabled:cursor-not-allowed disabled:opacity-50`
