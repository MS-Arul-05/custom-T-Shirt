'use client'
import { useState } from 'react'
import { Check, Package, Printer, Truck, MapPin, PartyPopper } from 'lucide-react'

const STEPS = [
  { label: 'Order placed', desc: 'We received your order', Icon: Package },
  { label: 'Printing', desc: 'Your apparel is being printed in India', Icon: Printer },
  { label: 'Shipped', desc: 'Handed to our delivery partner', Icon: Truck },
  { label: 'Out for delivery', desc: 'Arriving today', Icon: MapPin },
  { label: 'Delivered', desc: 'Enjoy your FITBOX fit', Icon: PartyPopper },
]

// Mock current step (Out for delivery) for any input — demo only.
const CURRENT_STEP = 3

export default function TrackPage() {
  const [order, setOrder] = useState('')
  const [email, setEmail] = useState('')
  const [tracked, setTracked] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTracked(order.trim() || 'FITBOX-DEMO')
  }

  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '56px 24px 96px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '10px',
          }}
        >
          Where&apos;s my fit
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Track Your Order
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginTop: '12px' }}>
          Enter your order number and email to see live status. This is a demo — any input shows a sample timeline.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '28px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div>
            <label htmlFor="order" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Order number
            </label>
            <input
              id="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="FITBOX-2026-00821"
              className="w-full h-11 px-3 text-sm rounded-[8px] border outline-none"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full h-11 px-3 text-sm rounded-[8px] border outline-none"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center text-white rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            Track
          </button>
        </form>

        {/* Timeline */}
        {tracked && (
          <div
            style={{
              marginTop: '28px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Tracking</p>
            <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>{tracked}</p>

            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {STEPS.map(({ label, desc, Icon }, i) => {
                const done = i < CURRENT_STEP
                const active = i === CURRENT_STEP
                const reached = done || active
                const isLast = i === STEPS.length - 1
                return (
                  <li key={label} style={{ display: 'flex', gap: '16px' }}>
                    {/* Marker + connector */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '999px',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: reached ? 'var(--accent)' : 'var(--bg-primary)',
                          color: reached ? '#fff' : 'var(--text-tertiary)',
                          border: reached ? 'none' : '1px solid var(--border)',
                        }}
                      >
                        {done ? <Check size={18} /> : <Icon size={17} />}
                      </span>
                      {!isLast && (
                        <span
                          style={{
                            width: '2px',
                            flex: 1,
                            minHeight: '28px',
                            background: done ? 'var(--accent)' : 'var(--border)',
                          }}
                        />
                      )}
                    </div>
                    {/* Text */}
                    <div style={{ paddingBottom: isLast ? 0 : '20px' }}>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: reached ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {label}
                        {active && (
                          <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>
                            CURRENT
                          </span>
                        )}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{desc}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        )}
      </div>
    </main>
  )
}
