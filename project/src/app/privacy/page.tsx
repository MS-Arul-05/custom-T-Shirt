import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | FITBOX',
  description: 'Learn how FITBOX collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '520px', margin: '0 auto' }}>
          Last updated: June 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px 96px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>1. Information We Collect</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            When you shop with FITBOX, we collect information you provide directly — your name, email address,
            shipping address, and payment details. We also collect information automatically when you visit our site,
            such as your IP address, browser type, pages viewed, and referring URLs.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We use cookies and similar tracking technologies to remember your preferences, keep items in your cart,
            and understand how our site is used so we can improve it.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>2. How We Use Your Information</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
            We use the information we collect to:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Process and fulfil your orders, including sending order confirmations and shipping updates</li>
            <li>Respond to your questions and provide customer support</li>
            <li>Send you marketing communications if you have opted in</li>
            <li>Prevent fraud and keep our platform secure</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>3. Sharing Your Information</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            We do not sell your personal data. We share information only with trusted service providers who help us
            operate our business — such as payment processors (Razorpay/Stripe), shipping partners, and email
            service providers. These partners are contractually bound to keep your data secure.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We may also disclose information where required by law or to protect our legal rights.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>4. Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            We use essential cookies to make our site work (cart, login session), functional cookies to remember
            your preferences, and analytics cookies to understand how visitors use our site.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            You can manage cookie preferences through your browser settings. Disabling essential cookies may affect
            your ability to shop on our site.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>5. Your Rights</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
            You have the right to:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data, subject to legal requirements</li>
            <li>Withdraw consent for marketing communications at any time</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>6. Data Retention</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We retain your order data for 7 years for tax and accounting purposes. Account data is kept for as long
            as your account is active. Marketing preferences are retained until you unsubscribe. You can request
            earlier deletion by contacting us.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>7. Contact Us</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
            <a
              href="mailto:privacy@fitbox.in"
              style={{ color: 'var(--accent)', textDecoration: 'underline' }}
            >
              privacy@fitbox.in
            </a>{' '}
            or write to: FITBOX, 21 MG Road, Bengaluru 560001, India.
          </p>
        </section>
      </div>
    </main>
  )
}
