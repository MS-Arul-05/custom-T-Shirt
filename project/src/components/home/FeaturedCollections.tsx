'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getFeaturedCollections } from '@/lib/collections'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function FeaturedCollections() {
  const reduce = useReducedMotion()
  const collections = getFeaturedCollections(4)

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Curated
            </p>
            <h2 className="font-heading tracking-[-0.01em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Shop by Collection
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            All collections <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {collections.map((c) => (
            <motion.div key={c.slug} variants={reduce ? undefined : fadeInUp}>
              <Link
                href={`/collections/${c.slug}`}
                className="group relative block overflow-hidden rounded-[12px] aspect-[3/4]"
                style={{ background: 'var(--bg-dark)' }}
              >
                <Image
                  src={c.heroImage}
                  alt={`${c.name} — ${c.tagline}`}
                  fill
                  className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.25) 60%, rgba(26,26,26,0.05) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-[4px] mb-3 text-white"
                    style={{ background: c.accent ?? 'var(--accent)' }}
                  >
                    {c.tagline}
                  </span>
                  <h3 className="font-heading text-white text-xl leading-tight mb-1">{c.name}</h3>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/90">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
