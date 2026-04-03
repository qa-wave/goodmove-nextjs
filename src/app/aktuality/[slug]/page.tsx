/**
 * Detail článku — /aktuality/[slug]
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CTASection } from '@/components/sections/CTASection'
import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress'
import { formatDate, stripHtml, truncate } from '@/lib/utils'

export const revalidate = 3600
export const dynamicParams = true

// Static paths — rendered on demand with ISR (WP may be unavailable at build)
export async function generateStaticParams() {
  return []
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Článek nenalezen' }
  return {
    title: post.title.rendered,
    description: truncate(stripHtml(post.excerpt.rendered), 160),
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
  const author = post._embedded?.author?.[0]

  return (
    <>
      <article className="section-padding">
        <div className="section-container max-w-3xl">

          {/* Back link */}
          <Link
            href="/aktuality"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět na aktuality
          </Link>

          {/* Header */}
          <header className="mb-10 animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">Aktuality</Badge>
              <time dateTime={post.date} className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="font-display text-4xl font-semibold sm:text-5xl leading-tight">
              {post.title.rendered}
            </h1>
            {author && (
              <p className="mt-4 text-sm text-muted-foreground">
                Autor: <span className="font-medium text-foreground">{author.name}</span>
              </p>
            )}
          </header>

          {/* Featured image */}
          {featuredImage && (
            <div className="mb-10 overflow-hidden rounded-3xl animate-fade-up delay-150">
              <Image
                src={featuredImage.source_url}
                alt={featuredImage.alt_text || post.title.rendered}
                width={featuredImage.media_details.width}
                height={featuredImage.media_details.height}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Content — rendered from WordPress HTML */}
          <div
            className="prose prose-lg max-w-none animate-fade-up delay-300
              prose-headings:font-display prose-headings:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </article>
      <CTASection />
    </>
  )
}
