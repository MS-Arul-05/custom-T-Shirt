import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Collection } from '@/types'

interface Props {
  collection: Collection
}

export default function CollectionCard({ collection }: Props) {
  const accent = collection.accent ?? 'var(--accent)'
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative block overflow-hidden rounded-[16px]"
      style={{ background: 'var(--bg-dark)' }}
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4]">
        <Image
          src={collection.heroImage}
          alt={`${collection.name} — ${collection.tagline}`}
          fill
          className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-95"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* gradient scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.25) 45%, rgba(26,26,26,0.05) 100%)',
          }}
        />
        {/* accent bar */}
        <span
          className="absolute left-0 top-0 h-1.5 w-full"
          style={{ background: accent }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span
          className="inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
          style={{ background: accent }}
        >
          {collection.tagline}
        </span>
        <h3 className="font-heading mt-3 text-xl font-semibold text-white sm:text-2xl">
          {collection.name}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors group-hover:text-white">
          Explore collection
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
