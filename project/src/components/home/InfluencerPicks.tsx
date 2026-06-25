'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { getBestsellers } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const HANDLES = ['@rohan.fits', '@aisha.styles', '@thrift.kabir', '@diya.drips']

export default function InfluencerPicks() {
  const reduce = useReducedMotion()
  const picks = getBestsellers().slice(0, 4)

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>
            As seen on
          </p>
          <h2 className="font-heading tracking-[-0.01em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            Influencer Picks
          </h2>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {picks.map((p, i) => (
            <motion.div key={p.id} variants={reduce ? undefined : fadeInUp}>
              <Link href={`/shop/${p.slug}`} className="group block">
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-[12px] mb-3"
                  style={{ background: 'var(--bg-surface)' }}
                >
                  <Image
                    src={p.images[0]}
                    alt={`${p.name} styled by ${HANDLES[i]}`}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-[var(--text-primary)]">
                    <BadgeCheck size={12} style={{ color: 'var(--accent)' }} />
                    {HANDLES[i]}
                  </span>
                </div>
                <h3 className="text-sm font-semibold leading-snug group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </h3>
                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {formatPrice(p.salePrice ?? p.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
