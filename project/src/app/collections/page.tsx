import type { Metadata } from 'next'
import Image from 'next/image'
import { COLLECTIONS } from '@/lib/collections'
import CollectionCard from '@/components/collections/CollectionCard'

export const metadata: Metadata = {
  title: 'Collections — FITBOX',
  description:
    'Shop FITBOX collections — anime drops, streetwear staples, gym fits, campus core, build-season uniforms and community-creator collabs. Made and printed in India.',
}

export default function CollectionsPage() {
  const [hero, ...rest] = COLLECTIONS

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-10">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'var(--accent)' }}
        >
          Curated lines
        </p>
        <h1
          className="font-heading text-3xl font-semibold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          Collections
        </h1>
        <p className="mt-2 max-w-xl text-sm" style={{ color: 'var(--text-secondary)' }}>
          Every drop has a vibe. Find yours — from neon-samurai anime art to build-season
          crewnecks. Heavyweight cotton, numbered runs, printed in India.
        </p>
      </div>

      {/* Featured hero collection */}
      {hero && (
        <div className="mb-6">
          <FeaturedHero />
        </div>
      )}

      {/* Grid of the rest */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((c) => (
          <CollectionCard key={c.slug} collection={c} />
        ))}
      </div>
    </div>
  )
}

function FeaturedHero() {
  const hero = COLLECTIONS[0]
  if (!hero) return null
  const accent = hero.accent ?? 'var(--accent)'
  return (
    <a
      href={`/collections/${hero.slug}`}
      className="group relative block overflow-hidden rounded-[16px]"
      style={{ background: 'var(--bg-dark)' }}
    >
      <div className="relative aspect-[16/10] sm:aspect-[16/7]">
        <Image
          src={hero.heroImage}
          alt={`${hero.name} — ${hero.tagline}`}
          fill
          className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1280px) 100vw, 1216px"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.5) 55%, rgba(26,26,26,0.1) 100%)',
          }}
        />
      </div>
      <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center p-6 sm:p-10">
        <span
          className="inline-block w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
          style={{ background: accent }}
        >
          Featured · {hero.tagline}
        </span>
        <h2 className="font-heading mt-4 text-2xl font-semibold text-white sm:text-4xl">
          {hero.name}
        </h2>
        <p className="mt-2 text-sm text-white/80 sm:text-base">{hero.description}</p>
        <span
          className="mt-5 inline-flex w-fit items-center justify-center rounded-[8px] px-6 text-sm font-semibold text-white transition-colors"
          style={{ background: accent, height: '44px' }}
        >
          Shop {hero.name}
        </span>
      </div>
    </a>
  )
}
