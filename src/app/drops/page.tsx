import type { Metadata } from 'next'
import Link from 'next/link'
import { getDrops } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'Limited Drops | FITBOX',
  description: 'Numbered, limited-run drops from FITBOX. Once they sell out, restocks are not guaranteed.',
}

export default function DropsPage() {
  const drops = getDrops()

  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          background: 'var(--bg-dark)',
          color: '#fff',
          padding: '72px 24px 56px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '12px',
          }}
        >
          Numbered &amp; limited
        </p>
        <h1
          className="font-heading"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05 }}
        >
          Limited Drops
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '560px', margin: '16px auto 0', lineHeight: 1.6 }}>
          Small-batch releases printed in India. Each drop is numbered — when it&apos;s gone, restocks are not
          guaranteed. Move fast.
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '56px 24px 96px' }}>
        {drops.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {drops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              maxWidth: '480px',
              margin: '0 auto',
              padding: '64px 24px',
              border: '1px dashed var(--border)',
              borderRadius: '16px',
              background: 'var(--bg-surface)',
            }}
          >
            <h2 className="font-heading" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>
              No live drops right now
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              The next drop is being printed. Sign up for drop alerts in the footer, or browse the full catalogue
              while you wait.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center text-white rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Shop the catalogue
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
