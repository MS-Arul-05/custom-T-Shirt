'use client'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { getTrending } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function TrendingCollection() {
  const reduce = useReducedMotion()
  const products = getTrending(8)

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>
              <TrendingUp size={14} /> Hot right now
            </p>
            <h2 className="font-heading tracking-[-0.01em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Trending Now
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            Shop all <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {products.map((p) => (
            <motion.div key={p.id} variants={reduce ? undefined : fadeInUp}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
