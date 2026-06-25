'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="py-24 md:py-16 px-4 sm:px-6" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-[560px] mx-auto text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent)' }}>
          Drop list
        </p>
        <h2 className="font-heading text-white tracking-[-0.01em] mb-3" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
          Get the drop before it sells out
        </h2>
        <p className="text-sm text-white/70 mb-8">
          New drops, restock alerts, and member-only deals — straight to your inbox. No spam.
        </p>

        {submitted ? (
          <div
            className="inline-flex items-center gap-2 px-5 h-11 rounded-[8px] text-sm font-semibold text-white"
            style={{ background: 'var(--success)' }}
          >
            <Check size={16} /> You&apos;re on the list. Watch your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-label="Email address"
              className="flex-1 h-11 px-4 text-sm rounded-[8px] outline-none text-white placeholder:text-white/40"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.20)',
              }}
            />
            <button
              type="submit"
              className="h-11 px-6 text-sm font-semibold rounded-[8px] text-white flex-shrink-0 transition-colors"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Join the drop list
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
