'use client'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { CATEGORIES } from '@/lib/products'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function FeaturedCategories() {
  const reduce = useReducedMotion()

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-10">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Find your fit
          </p>
          <h2 className="font-heading tracking-[-0.01em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            Shop by Category
          </h2>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-wrap gap-3"
        >
          {CATEGORIES.map((c) => (
            <motion.div key={c.slug} variants={reduce ? undefined : fadeInUp}>
              <Link
                href={`/shop/category/${c.slug}`}
                className="inline-flex items-center h-11 px-5 text-sm font-semibold rounded-full transition-colors"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.background = 'var(--accent)'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.background = 'var(--bg-surface)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                {c.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
