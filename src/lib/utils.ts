import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes safely (shadcn/ui & 21st.dev pattern)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a Czech price string
 */
export function formatPrice(amount: number, currency = 'Kč'): string {
  return `${amount.toLocaleString('cs-CZ')} ${currency}`
}

/**
 * Format a Czech date
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Strip HTML tags from WordPress content
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Truncate a string to a max length with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Convert WordPress REST API URL slug to a route path
 */
export function slugToPath(slug: string): string {
  return `/${slug}`
}
