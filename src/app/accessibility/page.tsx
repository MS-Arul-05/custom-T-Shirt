import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement | FITBOX',
  description: 'FITBOX is committed to making our website accessible to everyone.',
}

export default function AccessibilityPage() {
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
          Commitment
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
          Accessibility Statement
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '520px', margin: '0 auto' }}>
          Last updated: June 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px 96px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Our Commitment</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            FITBOX is committed to ensuring that our website is accessible to everyone, including people
            with disabilities. We believe great streetwear should be available to all, and that includes
            making the experience of shopping with us welcoming and usable for every customer.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Conformance Status</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines
            explain how to make web content more accessible to people with disabilities.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We are continuously working to improve our conformance status. Some pages may be in the process
            of being updated to meet these standards.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Technical Measures</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
            We have implemented the following accessibility features:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Keyboard navigation</strong> — all interactive
              elements are reachable and operable using a keyboard alone
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Visible focus indicators</strong> — a clear
              orange outline shows keyboard focus position at all times
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Semantic HTML</strong> — pages use proper heading
              hierarchy and landmark regions (nav, main, footer)
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Descriptive alt text</strong> — all meaningful
              images have descriptive alternatives
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Colour contrast</strong> — text meets WCAG AA
              contrast ratios (minimum 4.5:1 for body text)
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Reduced motion</strong> — animations are disabled
              for users who prefer reduced motion via the OS setting
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Responsive design</strong> — the site works
              at any zoom level up to 400% without horizontal scrolling
            </li>
          </ul>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Known Limitations</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Despite our best efforts, some older product imagery may lack sufficient alt text descriptions.
            We are systematically reviewing and updating these. Some third-party embedded content (such as
            payment providers) may not fully meet our accessibility standards.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We test our site regularly with assistive technologies including NVDA, VoiceOver, and JAWS.
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '48px' }} />

        {/* Highlight box */}
        <div
          style={{
            background: 'var(--accent-light)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: '8px',
            padding: '24px 28px',
            marginBottom: '48px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--accent)' }}>
            Need Assistance?
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            If you experience any accessibility barriers or need content in a different format, our team is
            here to help. Please contact us and we will respond within 2 business days.
          </p>
        </div>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Feedback and Contact</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We welcome your feedback on the accessibility of our website. Please contact us at{' '}
            <a
              href="mailto:accessibility@fitbox.in"
              style={{ color: 'var(--accent)', textDecoration: 'underline' }}
            >
              accessibility@fitbox.in
            </a>{' '}
            or call us at +91 80 4567 8900. We try to respond to accessibility feedback within 2 business days.
          </p>
        </section>
      </div>
    </main>
  )
}
