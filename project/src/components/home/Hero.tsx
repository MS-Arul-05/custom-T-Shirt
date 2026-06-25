'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[620px] sm:min-h-[720px] flex items-end overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0" style={{ background: 'var(--bg-dark)' }}>
        <Image
          src="https://picsum.photos/seed/fitbox-hero/1600/1000"
          alt="FITBOX streetwear drop — oversized graphic tees and heavyweight hoodies"
          fill
          priority
          className="object-cover opacity-90"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.45) 55%, rgba(26,26,26,0.15) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={14} className="text-white/80" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
              New drop live · printed in India
            </p>
          </div>

          {/* Headline */}
          <h1
            className="font-heading text-white leading-[0.95] tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(46px, 8vw, 96px)' }}
          >
            WEAR WHAT<br />YOU DESIGN.
          </h1>

          {/* Sub */}
          <p className="text-base sm:text-lg text-white/80 mb-9 max-w-xl leading-relaxed">
            Heavyweight oversized tees, anime drops, and street-ready fleece — or
            build your own from scratch in the custom tee builder. Bold graphics,
            240 GSM cotton, made to flex.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-12 px-7 text-sm font-semibold rounded-[8px] text-white transition-colors"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.background = 'var(--accent-hover)')
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.background = 'var(--accent)')
              }
            >
              Shop the drop
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/customize"
              className="inline-flex items-center h-12 px-7 text-sm font-semibold rounded-[8px] transition-colors"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.30)',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')
              }
            >
              Customize your tee
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
