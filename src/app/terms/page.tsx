import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | FITBOX',
  description: 'Read the terms and conditions governing your use of FITBOX.',
}

export default function TermsPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* Page header */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          padding: '64px 24px 48px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '12px',
          }}
        >
          Legal
        </p>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}
        >
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '520px', margin: '0 auto' }}>
          Last updated: June 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px 96px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>1. Agreement to Terms</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            By accessing or purchasing from FITBOX (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;),
            you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use
            our website or services.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>2. Products and Pricing</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            All prices are listed in Indian Rupees (INR) and include applicable taxes. We reserve the right to
            change prices at any time, but changes will not affect orders already placed and confirmed.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Product images are representative. Minor colour variations may occur due to photography and screen
            calibration. We strive for accuracy in all product descriptions.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>3. Orders and Payment</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Placing an order constitutes an offer to purchase. We reserve the right to cancel or refuse any order
            at our discretion, including in cases of pricing errors or suspected fraudulent activity.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Payment is processed securely at checkout. We accept major debit/credit cards, UPI, and net banking.
            Your payment details are encrypted and never stored on our servers.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>4. Shipping and Delivery</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            We ship across India. Estimated delivery times are provided at checkout and are indicative, not
            guaranteed. We are not liable for delays caused by logistics partners or circumstances beyond our control.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Risk of loss passes to you when the item is handed to the carrier. Please inspect your delivery and
            report any damage within 48 hours of receipt.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>5. Returns and Refunds</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            We accept returns within 30 days of delivery for unworn, unwashed items in their original packaging.
            To initiate a return, contact our support team with your order number.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Refunds are processed to the original payment method within 7&ndash;10 business days of receiving the
            returned item. Shipping costs for returns are borne by the customer unless the item is defective.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>6. Intellectual Property</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            All content on this site — including text, images, logos, and product designs — is owned by or
            licensed to FITBOX. You may not reproduce, distribute, or use our content without written
            permission.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>7. Limitation of Liability</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            To the fullest extent permitted by law, FITBOX is not liable for any indirect, incidental,
            or consequential damages arising from your use of our products or services. Our total liability
            shall not exceed the value of your most recent order.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>8. Governing Law</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            These terms are governed by the laws of India. Any disputes shall be subject to the exclusive
            jurisdiction of the courts of Bengaluru, Karnataka. For questions, contact us at{' '}
            <a
              href="mailto:legal@fitbox.in"
              style={{ color: 'var(--accent)', textDecoration: 'underline' }}
            >
              legal@fitbox.in
            </a>.
          </p>
        </section>
      </div>
    </main>
  )
}
