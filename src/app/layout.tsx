/**
 * Root Layout — Next.js 14 App Router
 *
 * - Loads Google Fonts via next/font (zero CLS)
 * - Sets default metadata for SEO
 * - Applies theme via data-theme attribute
 * - Wraps all pages in Navbar + Footer
 */
import type { Metadata, Viewport } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

// ─── Fonts ────────────────────────────────────────────────────────────────────
// NOTE: In production, replace these CSS @import statements in globals.css
// with next/font/google for zero-CLS font loading. The sandbox blocks external
// font fetching, so we fall back to system fonts via CSS variables.
const inter = { variable: '' }
const playfair = { variable: '' }

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://goodmove.cz'),
  title: {
    default: 'Good Move – Studio fyzioterapie a pohybu, Praha Podolí',
    template: '%s | Good Move',
  },
  description:
    'S úctou k tělu učíme pohyb. Fyzioterapie, SportMove, FyzioFit a pohybová terapie na základech vývojové kineziologie. Praha 4 – Podolí.',
  keywords: [
    'fyzioterapie',
    'fyzioterapeut Praha',
    'FyzioFit',
    'SportMove',
    'vývojová kineziologie',
    'rehabilitace Praha',
    'pohybová terapie',
    'lymfatická drenáž',
    'Good Move',
  ],
  authors: [{ name: 'Good Move by Chramosta', url: 'https://goodmove.cz' }],
  creator: 'Good Move by Chramosta',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://goodmove.cz',
    siteName: 'Good Move',
    title: 'Good Move – Studio fyzioterapie a pohybu, Praha',
    description: 'S úctou k tělu učíme pohyb. Fyzioterapie, SportMove a FyzioFit v Praze – Podolí.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Good Move – Studio fyzioterapie a pohybu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Good Move – Studio fyzioterapie',
    description: 'S úctou k tělu učíme pohyb.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://goodmove.cz',
  },
}

export const viewport: Viewport = {
  themeColor: '#2D5A3D',
  width: 'device-width',
  initialScale: 1,
}

// ─── Layout component ─────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Theme can be overridden via NEXT_PUBLIC_THEME env var
  const theme = (process.env.NEXT_PUBLIC_THEME as 'default' | 'dark' | 'organic') ?? 'default'

  return (
    <html
      lang="cs"
      data-theme={theme}
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pt-20" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
