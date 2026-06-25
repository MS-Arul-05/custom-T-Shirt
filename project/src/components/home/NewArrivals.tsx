'use client'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getNewArrivals } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function NewArrivals() {
  const reduce = useReducedMotion()
  const products = getNewArrivals().slice(0, 4)

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Fresh in
            </p>
            <h2 className="font-heading tracking-[-0.01em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              New Arrivals
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
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
