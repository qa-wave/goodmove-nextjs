/**
 * Aktuality — /aktuality
 * Blog posts fetched from WordPress
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate, truncate, stripHtml } from '@/lib/utils'
import { getPosts } from '@/lib/wordpress'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Aktuality',
  description: 'Novinky, články a tipy z Good Move. Přečtěte si o pohybu, fyzioterapii a zdravém životním stylu.',
}

export default async function NewsPage() {
  const posts = await getPosts(1, 12)

  return (
    <div className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="mb-16 max-w-2xl animate-fade-up">
          <Badge variant="secondary" className="mb-4">Blog</Badge>
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">Aktuality</h1>
          <p className="mt-5 text-xl text-muted-foreground">
            Tipy, novinky a články o pohybu, fyzioterapii a zdravém životním stylu.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-16 text-center">
            <p className="text-lg text-muted-foreground">Zatím žádné články. Brzy přidáme novinky!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
              const excerpt = truncate(stripHtml(post.excerpt.rendered), 120)

              return (
                <Link
                  key={post.id}
                  href={`/aktuality/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-transparent animate-fade-up"
                  style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-secondary overflow-hidden">
                    {featuredImage ? (
                      <Image
                        src={featuredImage.source_url}
                        alt={featuredImage.alt_text || post.title.rendered}
                        width={600}
                        height={338}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl text-muted-foreground/30">
                        📰
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs text-muted-foreground mb-3">{formatDate(post.date)}</p>
                    <h2 className="font-display text-xl font-semibold leading-snug mb-3 group-hover:text-primary transition-colors">
                      {post.title.rendered}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                      Číst více
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
