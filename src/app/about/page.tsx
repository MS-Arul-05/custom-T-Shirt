import type { Metadata } from 'next'
import Link from 'next/link'
import { Palette, Sparkles, Gift, Store } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About FITBOX | Custom Streetwear, Drops & Mystery Boxes',
  description: 'FITBOX is an Indian custom-apparel label — design your own tees and hoodies, cop limited drops, open mystery boxes, and shop independent designers. Made & printed in India.',
}

const PILLARS = [
  { Icon: Palette, title: 'Custom apparel', body: 'Design your own tees, hoodies and crop tops in our builder — add text, art and AI-generated graphics, then we print them on demand.' },
  { Icon: Sparkles, title: 'Limited drops', body: 'Numbered, small-batch releases that move fast. When a drop sells out, restocks are not guaranteed.' },
  { Icon: Gift, title: 'Mystery boxes', body: 'Curated surprise boxes across categories and tiers — more value than you pay, every time.' },
  { Icon: Store, title: 'Designer marketplace', body: 'Independent Indian designers list their work on FITBOX and earn on every sale.' },
]

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--bg-dark)', color: '#fff', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '14px',
          }}
        >
          Made &amp; printed in India
        </p>
        <h1
          className="font-heading"
          style={{ fontSize: 'clamp(34px, 6vw, 60px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05 }}
        >
          Wear what you mean.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', maxWidth: '600px', margin: '18px auto 0', lineHeight: 1.65 }}>
          FITBOX started with a simple idea: your wardrobe should say something. We give you the tools to make it —
          and the drops to live in it.
        </p>
      </div>

      {/* Story */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px 32px' }}>
        <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
          Our story
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '16px' }}>
          We&apos;re a Bengaluru-based streetwear label built for a generation that doesn&apos;t want to look like
          everyone else. Half of FITBOX is a creative studio — a design builder where you put your own text, art and
          AI-generated graphics on premium tees and hoodies, printed on demand and shipped pan-India.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          The other half is the hype: numbered limited drops, surprise mystery boxes, and a growing marketplace of
          independent Indian designers who earn on every piece they sell. Everything is made and printed in India, so
          your order supports local print partners and creators.
        </p>
      </div>

      {/* Pillars */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 24px 56px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PILLARS.map(({ Icon, title, body }) => (
            <div
              key={title}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon size={21} />
              </span>
              <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                {title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 96px', textAlign: 'center' }}>
        <div
          style={{
            background: 'var(--accent-light)',
            borderRadius: '16px',
            padding: '40px 24px',
          }}
        >
          <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
            Start your first piece
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
            Design something one-of-one, or cop the latest drop.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/customize"
              className="inline-flex items-center justify-center text-white rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Open the builder
            </Link>
            <Link
              href="/drops"
              className="inline-flex items-center justify-center rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              See the drops
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
