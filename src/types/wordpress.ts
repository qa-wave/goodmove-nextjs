/**
 * WordPress REST API type definitions
 * Covers WP core + ACF fields used by GoodMove
 */

// ─── Core WP Types ────────────────────────────────────────────────────────────

export interface WPRendered {
  rendered: string
  protected?: boolean
}

export interface WPImage {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes: Record<string, { source_url: string; width: number; height: number }>
  }
}

export interface WPPost {
  id: number
  slug: string
  status: string
  type: string
  date: string
  modified: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<WPImage>
    'wp:term'?: Array<Array<WPTerm>>
    author?: Array<WPAuthor>
  }
  acf?: Record<string, unknown>
  categories: number[]
  tags: number[]
}

export interface WPPage {
  id: number
  slug: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  featured_media: number
  _embedded?: { 'wp:featuredmedia'?: Array<WPImage> }
  acf?: Record<string, unknown>
  template?: string
}

export interface WPTerm {
  id: number
  name: string
  slug: string
  taxonomy: string
  count: number
}

export interface WPAuthor {
  id: number
  name: string
  slug: string
  avatar_urls: Record<string, string>
}

// ─── GoodMove Custom Post Types (via ACF) ────────────────────────────────────

export interface GMService {
  id: number
  slug: string
  title: WPRendered
  acf: {
    service_subtitle: string
    service_description: string
    service_icon: string           // emoji or SVG string
    service_color: 'warm' | 'sage' | 'primary'
    service_features: string[]
    service_cta_label: string
    service_cta_url: string
  }
  _embedded?: { 'wp:featuredmedia'?: Array<WPImage> }
}

export interface GMTeamMember {
  id: number
  slug: string
  title: WPRendered
  acf: {
    member_role: string
    member_bio: string
    member_specializations: string[]
    member_initials: string
    member_order: number
  }
  _embedded?: { 'wp:featuredmedia'?: Array<WPImage> }
}

export interface GMTestimonial {
  id: number
  acf: {
    testimonial_text: string
    client_name: string
    client_info: string
    client_initials: string
    rating: number
    service_tag: string
  }
}

export interface GMPricingItem {
  id: number
  acf: {
    pricing_name: string
    pricing_category: string
    pricing_description: string
    pricing_amount: number
    pricing_unit: string
    pricing_features: string[]
    pricing_featured: boolean
    pricing_cta: string
    pricing_order: number
  }
}

// ─── API response wrappers ────────────────────────────────────────────────────

export type WPCollection<T> = T[]

export interface WPError {
  code: string
  message: string
  data: { status: number }
}
