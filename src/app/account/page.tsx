import type { Metadata } from 'next'
import Link from 'next/link'
import { Package, Heart, Palette, MapPin, Gift, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Account | FITBOX',
  description: 'Manage your FITBOX orders, wishlist, saved designs, addresses and rewards.',
}

const SECTIONS = [
  { label: 'Orders', desc: 'Track and review your past orders', href: '/track', Icon: Package },
  { label: 'Wishlist', desc: 'Items you saved for later', href: '/shop', Icon: Heart },
  { label: 'Saved Designs', desc: 'Your custom apparel creations', href: '/customize', Icon: Palette },
  { label: 'Addresses', desc: 'Manage your delivery addresses', href: '/account', Icon: MapPin },
  { label: 'Rewards', desc: 'Points and member perks', href: '/account', Icon: Gift },
]

export default function AccountPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '56px 24px 96px' }}>
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
          Your space
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          My Account
        </h1>

        {/* Sign-in card */}
        <div
          style={{
            marginTop: '28px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '999px',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={24} />
          </div>
          <div>
            <h2 className="font-heading" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
              Sign in to FITBOX
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, maxWidth: '440px' }}>
              Sign in to track orders, save designs and earn rewards. Authentication is a demo — no real account is
              created.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="inline-flex items-center justify-center text-white rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors disabled:opacity-40"
              style={{ background: 'var(--accent)' }}
              disabled
            >
              Sign in (demo)
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-[8px] h-11 px-6 text-sm font-semibold transition-colors disabled:opacity-40"
              style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              disabled
            >
              Create account
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginTop: '28px' }}>
          {SECTIONS.map(({ label, desc, href, Icon }) => (
            <Link
              key={label}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={19} />
              </span>
              <span>
                <span style={{ display: 'block', fontWeight: 600, fontSize: '15px', marginBottom: '3px' }}>{label}</span>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
                  {desc}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
          This is a demo account area — no real authentication, orders or personal data are stored.
        </p>
      </div>
    </main>
  )
}
