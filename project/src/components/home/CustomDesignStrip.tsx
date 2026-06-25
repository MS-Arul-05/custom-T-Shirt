'use client'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Shirt, Wand2, Eye } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const STEPS = [
  { icon: Shirt, title: 'Pick a style', detail: 'Oversized, regular, or crop — choose your blank and colour.' },
  { icon: Wand2, title: 'Add your art / AI', detail: 'Upload a graphic or generate one with the AI design tool.' },
  { icon: Eye, title: 'Preview live', detail: 'See it on the mockup front and back before you add to cart.' },
]

export default function CustomDesignStrip() {
  const reduce = useReducedMotion()

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--accent)' }}>
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 text-white/80">
              Custom T-Shirt Builder
            </p>
            <h2 className="font-heading text-white leading-[0.98] tracking-[-0.01em] mb-5" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Design it your way.
            </h2>
            <p className="text-base text-white/85 mb-8 max-w-md leading-relaxed">
              No minimums, no design skills needed. Drop your own art or let AI generate
              it, then print it on premium 240 GSM cotton — shipped across India.
            </p>
            <Link
              href="/customize"
              className="inline-flex items-center gap-2 h-12 px-7 text-sm font-semibold rounded-[8px] transition-colors"
              style={{ background: 'var(--bg-dark)', color: '#fff' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.background = '#000')
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.background = 'var(--bg-dark)')
              }
            >
              Start designing <ArrowRight size={15} />
            </Link>
          </div>

          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? undefined : 'hidden'}
            whileInView={reduce ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-4"
          >
            {STEPS.map(({ icon: Icon, title, detail }, i) => (
              <motion.div
                key={title}
                variants={reduce ? undefined : fadeInUp}
                className="flex items-start gap-4 p-5 rounded-[12px]"
                style={{ background: 'rgba(255,255,255,0.14)' }}
              >
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold"
                  style={{ background: 'rgba(0,0,0,0.25)' }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">
                    {i + 1}. {title}
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">{detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
