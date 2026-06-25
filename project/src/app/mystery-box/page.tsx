import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Gift, PackageOpen, Shirt, Sparkles } from 'lucide-react'
import { MYSTERY_CATEGORIES, TIERS } from '@/lib/mystery-boxes'

export const metadata: Metadata = {
  title: 'Mystery Box — FITBOX',
  description:
    'Pick a vibe, open a box, unbox your fit. Bronze, Silver and Gold FITBOX mystery boxes — surprise pieces typically worth more than you pay. Anime, streetwear, gym and creator drops.',
}

const STEPS = [
  { n: '01', title: 'Pick category', body: 'Anime, streetwear, gym or creator — choose your vibe.', icon: Sparkles },
  { n: '02', title: 'Select box', body: 'Bronze, Silver or Gold. More tier, more loot.', icon: Gift },
  { n: '03', title: 'Unbox', body: 'Tap to open and watch your fits reveal.', icon: PackageOpen },
  { n: '04', title: 'Wear the fit', body: 'Style it up and add the box to your cart.', icon: Shirt },
]

export default function MysteryBoxLanding() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
            style={{ background: 'var(--accent)' }}
          >
            <Sparkles size={12} />
            Gamified drops
          </span>
          <h1 className="font-heading mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-6xl">
            Open a FITBOX <span style={{ color: 'var(--accent)' }}>Mystery Box</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80">
            Roll the dice on your next fit. Every box is packed with surprise pieces typically
            worth more than you pay — printed in India, shipped free.
          </p>
          <Link
            href="#categories"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            Start unboxing
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <h2
          className="font-heading text-2xl font-semibold sm:text-3xl"
          style={{ color: 'var(--text-primary)' }}
        >
          How it works
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.n}
                className="relative rounded-[16px] border p-5"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <span
                  className="font-heading text-3xl font-semibold"
                  style={{ color: 'var(--accent-light)' }}
                >
                  {s.n}
                </span>
                <div
                  className="mt-2 flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                >
                  <Icon size={18} />
                </div>
                <h3
                  className="font-heading mt-3 text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {s.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {s.body}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        <h2
          className="font-heading text-2xl font-semibold sm:text-3xl"
          style={{ color: 'var(--text-primary)' }}
        >
          Pick your category
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Four vibes, three tiers each. Choose where to start.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MYSTERY_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/mystery-box/${cat.slug}`}
              className="group relative block overflow-hidden rounded-[16px]"
              style={{ background: 'var(--bg-dark)' }}
            >
              <div className="relative aspect-square">
                <Image
                  src={cat.image}
                  alt={`${cat.name} mystery box`}
                  fill
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.2) 60%, rgba(26,26,26,0) 100%)',
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-heading text-xl font-semibold text-white">{cat.name}</h3>
                <p className="mt-1 text-sm text-white/80">{cat.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Open a box
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tier explainer */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <h2
          className="font-heading text-2xl font-semibold sm:text-3xl"
          style={{ color: 'var(--text-primary)' }}
        >
          The tiers
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Same surprise energy, different drop size. Bigger tier, bigger pull.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.tier}
              className="overflow-hidden rounded-[16px] border"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <div
                className="flex h-20 items-center justify-center"
                style={{ background: t.accent }}
              >
                <Gift size={32} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="p-5">
                <h3
                  className="font-heading text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t.name}
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t.tier === 'bronze' && '1 surprise piece worth more than you pay. The easy yes.'}
                  {t.tier === 'silver' && '2 pieces with at least one premium fit in the mix.'}
                  {t.tier === 'gold' && '3 pieces including a guaranteed limited drop. Max loot.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
