import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { COLLECTIONS, getCollectionBySlug } from '@/lib/collections'
import { getProductsByCollection } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = getCollectionBySlug(params.slug)
  if (!collection) return { title: 'Collection not found — FITBOX' }
  return {
    title: `${collection.name} — FITBOX`,
    description: collection.description,
  }
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = getCollectionBySlug(params.slug)
  if (!collection) notFound()

  const products = getProductsByCollection(collection.slug)
  const accent = collection.accent ?? 'var(--accent)'

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
        <div className="relative h-[320px] sm:h-[420px]">
          <Image
            src={collection.heroImage}
            alt={`${collection.name} — ${collection.tagline}`}
            fill
            className="object-cover opacity-60"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.45) 50%, rgba(26,26,26,0.15) 100%)',
            }}
          />
          <span
            className="absolute left-0 top-0 h-2 w-full"
            style={{ background: accent }}
          />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-[1280px] flex-col justify-end px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
              <Link
                href="/collections"
                className="mb-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft size={15} />
                All collections
              </Link>
              <span
                className="inline-block w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
                style={{ background: accent }}
              >
                {collection.tagline}
              </span>
              <h1 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
                {collection.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
                {collection.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2
            className="font-heading text-xl font-semibold sm:text-2xl"
            style={{ color: 'var(--text-primary)' }}
          >
            In this collection
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {products.length === 0 ? (
          <div
            className="rounded-[16px] border border-dashed py-16 text-center"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <p className="mb-3 text-lg">This collection is dropping soon.</p>
            <Link
              href="/shop"
              className="text-sm font-medium underline"
              style={{ color: 'var(--accent)' }}
            >
              Shop all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
