'use client'
import { useState } from 'react'
import { Upload, IndianRupee, Rocket, CheckCircle2 } from 'lucide-react'

const STEPS = [
  { Icon: Upload, title: '1. Apply & upload', body: 'Tell us about your work and share a few designs. We review every application.' },
  { Icon: Rocket, title: '2. We print & list', body: 'Approved designs go live on FITBOX. We handle printing, payments and pan-India shipping.' },
  { Icon: IndianRupee, title: '3. You earn', body: 'Get a royalty on every sale, paid out monthly. No inventory, no upfront cost.' },
]

export default function DesignerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [about, setAbout] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
          FITBOX marketplace
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Become a FITBOX Designer
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', maxWidth: '560px', margin: '18px auto 0', lineHeight: 1.65 }}>
          Put your art on premium apparel and reach buyers across India. You design — we print, ship and pay you a
          royalty on every sale. Zero inventory, zero upfront cost.
        </p>
      </div>

      {/* How it works */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 24px 24px' }}>
        <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STEPS.map(({ Icon, title, body }) => (
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
              <h3 className="font-heading" style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>
                {title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Apply form */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 24px 96px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <span
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '999px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={28} />
              </span>
              <h3 className="font-heading" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>
                Application received
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
                Thanks{name ? `, ${name.split(' ')[0]}` : ''}! Our team reviews applications within 5–7 working days
                and will reach out at {email || 'your email'}. (Demo — nothing was actually submitted.)
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: 700 }}>
                Apply now
              </h3>
              <div>
                <label htmlFor="d-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Full name
                </label>
                <input
                  id="d-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3 text-sm rounded-[8px] border outline-none"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label htmlFor="d-email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Email
                </label>
                <input
                  id="d-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3 text-sm rounded-[8px] border outline-none"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label htmlFor="d-portfolio" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Portfolio / Instagram link
                </label>
                <input
                  id="d-portfolio"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://"
                  className="w-full h-11 px-3 text-sm rounded-[8px] border outline-none"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label htmlFor="d-about" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Tell us about your work
                </label>
                <textarea
                  id="d-about"
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-[8px] border outline-none"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)', resize: 'vertical' }}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center text-white rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors"
                style={{ background: 'var(--accent)' }}
              >
                Submit application
              </button>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                Demo form — submissions are not stored or sent.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
