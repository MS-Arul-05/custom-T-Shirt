import type { Metadata } from 'next'
import { formatPrice, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Shipping | FITBOX',
  description: 'FITBOX ships pan-India. Free shipping over ₹1,499, flat ₹79 below, with 5–7 day delivery.',
}

export default function ShippingPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          padding: '64px 24px 48px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
          Delivery
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Shipping
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '520px', margin: '16px auto 0' }}>
          We ship across India, printed and packed in-country.
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 96px' }}>
        {/* Rate cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '48px' }}>
          <div style={{ background: 'var(--accent-light)', borderRadius: '14px', padding: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>Free shipping</p>
            <p className="font-heading" style={{ fontSize: '24px', fontWeight: 800 }}>
              Orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
              Automatically applied at checkout.
            </p>
          </div>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Standard shipping</p>
            <p className="font-heading" style={{ fontSize: '24px', fontWeight: 800 }}>
              {formatPrice(STANDARD_SHIPPING)} flat
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
              On orders below {formatPrice(FREE_SHIPPING_THRESHOLD)}.
            </p>
          </div>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>Delivery time</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Catalogue items typically reach you in 5–7 working days. Custom and made-to-order pieces are printed on
            demand, so they may take 1–2 days longer before they ship. You&apos;ll get a tracking link by email once
            your order is dispatched.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>Where we ship</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We deliver pan-India to all serviceable pin codes through our courier partners. If your pin code is
            unserviceable, we&apos;ll contact you with options before processing the order.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '40px' }} />

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>Order tracking</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Track any order from the{' '}
            <a href="/track" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>order tracking page</a>{' '}
            using your order number and email.
          </p>
        </section>
      </div>
    </main>
  )
}
