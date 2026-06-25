import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns | FITBOX',
  description: '7-day returns on catalogue items. Custom designs and mystery boxes are non-returnable.',
}

export default function ReturnsPage() {
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
          Policy
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Returns &amp; Exchanges
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '520px', margin: '16px auto 0' }}>
          7-day returns on catalogue items. Read the details below.
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 96px' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>7-day window</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Catalogue (ready-to-ship) items can be returned within 7 days of delivery. Items must be unworn, unwashed
            and in original condition with tags attached. Once we receive and inspect the item, we&apos;ll issue a
            refund to your original payment method.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>What can&apos;t be returned</h2>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Custom and made-to-order designs — printed just for you, so they can&apos;t be resold.</li>
            <li>Mystery boxes — the surprise is the point, so all sales are final.</li>
            <li>Items marked final sale on the product page.</li>
          </ul>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '14px' }}>
            If a custom item or mystery box arrives damaged or with a printing defect, contact us within 48 hours and
            we&apos;ll make it right with a replacement.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>Size exchanges</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Wrong fit on a catalogue item? We offer one free size exchange within the 7-day window, subject to stock.
            Check our{' '}
            <a href="/size-guide" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>size guide</a>{' '}
            before ordering to get it right the first time.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '40px' }} />

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>How to start a return</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Email{' '}
            <a href="mailto:returns@fitbox.in" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              returns@fitbox.in
            </a>{' '}
            with your order number, and we&apos;ll arrange a pickup. Refunds are typically processed within 5–7
            working days of inspection.
          </p>
        </section>
      </div>
    </main>
  )
}
