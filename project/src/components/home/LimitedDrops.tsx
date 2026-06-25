'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { getDrops } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function LimitedDrops() {
  const reduce = useReducedMotion()
  const drops = getDrops()

  if (drops.length === 0) return null

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>
              <Flame size={14} /> Limited stock
            </p>
            <h2 className="font-heading tracking-[-0.01em] text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Limited Edition Drops
            </h2>
            <p className="text-sm text-white/60 mt-3 max-w-md">
              Numbered runs, sold as-is. Restocks are not guaranteed — when it&apos;s gone, it&apos;s gone.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            View drops <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {drops.map((p) => (
            <motion.div key={p.id} variants={reduce ? undefined : fadeInUp}>
              <Link
                href={`/shop/${p.slug}`}
                className="group block overflow-hidden rounded-[12px]"
                style={{ background: '#242424' }}
              >
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-[4px] text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    Numbered drop
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-white text-lg leading-tight mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-3">Restocks not guaranteed</p>
                  <p className="text-base font-semibold text-white">{formatPrice(p.salePrice ?? p.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
