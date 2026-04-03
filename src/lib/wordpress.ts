/**
 * WordPress REST API client
 *
 * Fetches content from the headless WordPress backend.
 * All functions use Next.js fetch with ISR (Incremental Static Regeneration).
 *
 * WordPress plugins required:
 *   - Advanced Custom Fields (ACF) Pro
 *   - ACF to REST API
 *   - Contact Form 7 (for contact form)
 *   - WP Mail SMTP (for email delivery)
 *   - Yoast SEO (for metadata)
 */

import type {
  WPPost,
  WPPage,
  GMService,
  GMTeamMember,
  GMTestimonial,
  GMPricingItem,
} from '@/types/wordpress'

// ─── Base config ──────────────────────────────────────────────────────────────

const BASE_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ?? 'https://goodmove.cz/wp-json/wp/v2'

/** Revalidation TTL in seconds (1 hour) */
const REVALIDATE = 3600

/**
 * Core fetch wrapper with error handling and ISR config
 */
async function wpFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
  revalidate = REVALIDATE
): Promise<T> {
  const url = new URL(`${BASE_URL}/${endpoint}`)
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, String(value))
  )

  const res = await fetch(url.toString(), {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} — ${url}`)
  }

  return res.json() as Promise<T>
}

// ─── Posts (Aktuality / Blog) ─────────────────────────────────────────────────

/** Fetch a paginated list of published posts */
export async function getPosts(page = 1, perPage = 9): Promise<WPPost[]> {
  try {
    return await wpFetch<WPPost[]>('posts', {
      page,
      per_page: perPage,
      status: 'publish',
      _embed: 1,
    })
  } catch {
    return []
  }
}

/** Fetch a single post by slug */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const posts = await wpFetch<WPPost[]>('posts', { slug, _embed: 1 })
    return posts[0] ?? null
  } catch {
    return null
  }
}

/** Fetch all post slugs (for generateStaticParams) */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const posts = await wpFetch<WPPost[]>('posts', { per_page: 100, fields: 'slug' })
    return posts.map((p) => p.slug)
  } catch {
    return []
  }
}

// ─── Pages ────────────────────────────────────────────────────────────────────

/** Fetch a single WP page by slug */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const pages = await wpFetch<WPPage[]>('pages', { slug, _embed: 1 })
    return pages[0] ?? null
  } catch {
    return null
  }
}

// ─── Services (CPT: gm_service) ───────────────────────────────────────────────

/**
 * Fetch all services ordered by menu_order.
 *
 * Register the CPT "gm_service" in WordPress with:
 *   register_post_type('gm_service', ['show_in_rest' => true, ...])
 */
export async function getServices(): Promise<GMService[]> {
  try {
    return wpFetch<GMService[]>('gm_service', {
      per_page: 20,
      order: 'asc',
      orderby: 'menu_order',
      _embed: 1,
    })
  } catch {
    // Return static fallback when WP is unavailable (dev mode)
    return FALLBACK_SERVICES
  }
}

/** Fetch a single service by slug */
export async function getServiceBySlug(slug: string): Promise<GMService | null> {
  try {
    const items = await wpFetch<GMService[]>('gm_service', { slug, _embed: 1 })
    return items[0] ?? null
  } catch {
    return FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null
  }
}

// ─── Team Members (CPT: gm_team) ─────────────────────────────────────────────

export async function getTeamMembers(): Promise<GMTeamMember[]> {
  try {
    return wpFetch<GMTeamMember[]>('gm_team', {
      per_page: 20,
      order: 'asc',
      orderby: 'menu_order',
      _embed: 1,
    })
  } catch {
    return FALLBACK_TEAM
  }
}

// ─── Testimonials (CPT: gm_testimonial) ──────────────────────────────────────

export async function getTestimonials(): Promise<GMTestimonial[]> {
  try {
    return wpFetch<GMTestimonial[]>('gm_testimonial', { per_page: 12 })
  } catch {
    return FALLBACK_TESTIMONIALS
  }
}

// ─── Pricing (CPT: gm_pricing) ───────────────────────────────────────────────

export async function getPricingItems(): Promise<GMPricingItem[]> {
  try {
    return wpFetch<GMPricingItem[]>('gm_pricing', {
      per_page: 20,
      order: 'asc',
      orderby: 'menu_order',
    })
  } catch {
    return FALLBACK_PRICING
  }
}

// ─── Contact Form (CF7) ───────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}

/** Submit Contact Form 7 */
export async function submitContactForm(
  formId: string,
  data: ContactFormData
): Promise<{ status: 'mail_sent' | 'mail_failed' | 'validation_failed'; message: string }> {
  const formData = new FormData()
  formData.append('your-name', data.name)
  formData.append('your-email', data.email)
  if (data.phone) formData.append('your-phone', data.phone)
  if (data.service) formData.append('your-service', data.service)
  formData.append('your-message', data.message)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CF7_API_URL ?? 'https://goodmove.cz/wp-json/contact-form-7/v1/contact-forms'}/${formId}/feedback`,
    { method: 'POST', body: formData }
  )
  return res.json()
}

// ─── Static fallback data (used in dev / when WP is unavailable) ─────────────

const FALLBACK_SERVICES: GMService[] = [
  { id: 1, slug: 'fyziomove', title: { rendered: 'FyzioMove' },
    acf: { service_subtitle: 'Fyzioterapie & Rehabilitace', service_description: 'Podrobná diagnostika pohybového aparátu, individuální fyzioterapie a rehabilitace na míru vašeho těla.', service_icon: '🩺', service_color: 'warm', service_features: ['Vstupní diagnostika', 'Individuální terapie', 'Rehabilitace pohybového aparátu', 'Lymfatická drenáž'], service_cta_label: 'Objednat se', service_cta_url: '/kontakt' } },
  { id: 2, slug: 'sportmove', title: { rendered: 'SportMove' },
    acf: { service_subtitle: 'Fyziofitness & Trénink', service_description: 'Fyziofitness terapie zaměřená na zlepšení pohybu, trénink i kompenzaci sedavého zaměstnání.', service_icon: '💪', service_color: 'sage', service_features: ['Pohybová diagnostika', 'Individuální trénink', 'Kompenzační cvičení', 'Správné pohybové vzorce'], service_cta_label: 'Zjistit více', service_cta_url: '/sluzby/sportmove' } },
  { id: 3, slug: 'teammove', title: { rendered: 'TeamMove' },
    acf: { service_subtitle: 'Skupinové lekce & Firmy', service_description: 'Skupinové FyzioFit lekce a specializované programy pro firmy zaměřené na prevenci a zdraví zaměstnanců.', service_icon: '👥', service_color: 'primary', service_features: ['FyzioFit skupinky', 'Firemní programy', 'Prevence zranění', 'Wellbeing na pracovišti'], service_cta_label: 'Pro firmy', service_cta_url: '/sluzby/teammove' } },
  { id: 4, slug: 'kidsmove', title: { rendered: 'KidsMove' },
    acf: { service_subtitle: 'Děti & Dorost', service_description: 'Skupinová cvičení pro děti a dorost se zaměřením na správné pohybové návyky od útlého věku.', service_icon: '🧒', service_color: 'warm', service_features: ['Pohybové kroužky', 'Správné držení těla', 'Zábavnou formou', 'Věk 3–18 let'], service_cta_label: 'Zjistit více', service_cta_url: '/sluzby/kidsmove' } },
  { id: 5, slug: 'educamove', title: { rendered: 'EducaMove' },
    acf: { service_subtitle: 'Kurzy & Vzdělávání', service_description: 'Kurzy, semináře, workshopy a webináře pro profesionály i veřejnost zájemce o pohyb a zdraví.', service_icon: '🎓', service_color: 'sage', service_features: ['Workshopy pro veřejnost', 'Kurzy pro profesionály', 'Online webináře', 'Certifikované kurzy'], service_cta_label: 'Zobrazit kurzy', service_cta_url: '/sluzby/educamove' } },
  { id: 6, slug: 'onlinemove', title: { rendered: 'OnlineMove' },
    acf: { service_subtitle: 'Online knihovna', service_description: 'Komplexní online knihovna s pohybovými lekcemi, terapiemi a tréninky. Přístupná odkudkoliv, kdykoliv.', service_icon: '🖥', service_color: 'primary', service_features: ['Neomezený přístup', 'Všechny programy online', 'Nový obsah každý týden', 'HD video lekce'], service_cta_label: 'Vyzkoušet zdarma', service_cta_url: '/sluzby/onlinemove' } },
]

const FALLBACK_TEAM: GMTeamMember[] = [
  { id: 1, slug: 'jana-chramostova', title: { rendered: 'Jana Chramostová' }, acf: { member_role: 'Zakladatelka & Fyzioterapeutka', member_bio: 'Certifikovaná fyzioterapeutka s více než 10 lety praxe. Specializuje se na vývojovou kineziologii a pohybovou terapii.', member_specializations: ['Vývojová kineziologie', 'DNS', 'Fyzioterapie'], member_initials: 'JC', member_order: 1 } },
  { id: 2, slug: 'martin-kovar', title: { rendered: 'Martin Kovář' }, acf: { member_role: 'Fyzioterapeut', member_bio: 'Fyzioterapeut specializující se na sport a pohybový aparát. Pracuje s vrcholovými sportovci i rekreačními klienty.', member_specializations: ['Sportovní fyzioterapie', 'Manuální terapie'], member_initials: 'MK', member_order: 2 } },
  { id: 3, slug: 'lucie-nova', title: { rendered: 'Lucie Nová' }, acf: { member_role: 'SportMove trenérka', member_bio: 'Certifikovaná trenérka se zaměřením na fyziofitness a pohybovou terapii pro ženy.', member_specializations: ['Fyziofitness', 'Pilates', 'Ženský pohyb'], member_initials: 'LN', member_order: 3 } },
  { id: 4, slug: 'petr-dvorak', title: { rendered: 'Petr Dvořák' }, acf: { member_role: 'FyzioFit instruktor', member_bio: 'Instruktor skupinových lekcí FyzioFit s certifikací v oblasti kondiční přípravy a pohybové terapie.', member_specializations: ['FyzioFit', 'Kondiční příprava', 'KidsMove'], member_initials: 'PD', member_order: 4 } },
]

const FALLBACK_TESTIMONIALS: GMTestimonial[] = [
  { id: 1, acf: { testimonial_text: 'Po letech bolestí zad jsem konečně našla místo, kde mi skutečně pomohli. Přístup založený na vývojové kineziologii je úplně jiný level fyzioterapie.', client_name: 'Klára P.', client_info: 'Klientka 2 roky', client_initials: 'KP', rating: 5, service_tag: 'FyzioMove' } },
  { id: 2, acf: { testimonial_text: 'FyzioFit lekce mě naprosto nadchly. Konečně cvičení, které dává smysl. Skvělý tým profesionálů, kteří vědí, co dělají.', client_name: 'Tomáš M.', client_info: 'Klient 1 rok', client_initials: 'TM', rating: 5, service_tag: 'TeamMove' } },
  { id: 3, acf: { testimonial_text: 'Díky SportMove jsem se naučila správně kompenzovat sedavé zaměstnání. Bolesti jsou pryč a cítím se skvěle každý den.', client_name: 'Anna N.', client_info: 'Klientka 8 měsíců', client_initials: 'AN', rating: 5, service_tag: 'SportMove' } },
  { id: 4, acf: { testimonial_text: 'Moje dcera chodí na KidsMove a změna je viditelná. Drží se přímě, pohybuje se přirozeně. Doporučuji všem rodičům!', client_name: 'Markéta K.', client_info: 'Maminka, 6 měsíců', client_initials: 'MK', rating: 5, service_tag: 'KidsMove' } },
]

const FALLBACK_PRICING: GMPricingItem[] = [
  { id: 1, acf: { pricing_name: 'Fyzioterapie', pricing_category: 'Individuální', pricing_description: 'Podrobná diagnostika a terapie pohybového aparátu.', pricing_amount: 1400, pricing_unit: '60 minut', pricing_features: ['Vstupní vyšetření 75 min / 2 000 Kč', 'Terapie 30 min / 800 Kč', 'Dětská fyzio 0–2 roky / 800 Kč', 'Lymfatická drenáž 60 min / 1 400 Kč'], pricing_featured: false, pricing_cta: 'Objednat se', pricing_order: 1 } },
  { id: 2, acf: { pricing_name: 'SportMove', pricing_category: 'Nejoblíbenější', pricing_description: 'Individuální fyziofitness terapie a trénink na míru.', pricing_amount: 1300, pricing_unit: '60 minut', pricing_features: ['Vstupní konzultace 75 min / 2 000 Kč', 'Individuální terapie 30 min / 800 Kč', 'Přizpůsobení individuálním potřebám', 'Kompenzace sedavého zaměstnání'], pricing_featured: true, pricing_cta: 'Objednat se', pricing_order: 2 } },
  { id: 3, acf: { pricing_name: 'FyzioFit', pricing_category: 'Skupinové', pricing_description: 'Skupinové lekce kombinující fyzioterapii a fitness.', pricing_amount: 320, pricing_unit: 'za lekci (balíček 16)', pricing_features: ['Balíček 16 lekcí / 5 120 Kč', 'Vedené zkušenými trenéry', 'Malé skupiny (max 8 osob)', 'Vhodné pro všechny úrovně'], pricing_featured: false, pricing_cta: 'Objednat se', pricing_order: 3 } },
]
