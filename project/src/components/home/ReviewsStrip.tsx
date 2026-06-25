'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { getFeaturedReviews } from '@/lib/reviews'
import { getProductBySlug } from '@/lib/products'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function ReviewsStrip() {
  const reduce = useReducedMotion()
  const reviews = getFeaturedReviews(3)

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>
            Reviews
          </p>
          <h2 className="font-heading tracking-[-0.01em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            What the fam says
          </h2>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((r) => {
            const product = getProductBySlug(r.productSlug)
            return (
              <motion.div
                key={r.id}
                variants={reduce ? undefined : fadeInUp}
                className="p-6 rounded-[12px] flex flex-col gap-4"
                style={{ background: 'var(--bg-primary)' }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < r.rating ? 'currentColor' : 'none'}
                      style={{ color: i < r.rating ? 'var(--accent)' : 'var(--border)' }}
                    />
                  ))}
                </div>

                {r.title && (
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {r.title}
                  </p>
                )}
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-primary)' }}>
                  &ldquo;{r.body}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  >
                    {r.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                      {r.author}
                      {r.verified && (
                        <span className="text-[10px] font-semibold" style={{ color: 'var(--success)' }}>
                          Verified
                        </span>
                      )}
                    </p>
                    {product && (
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {product.name}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
