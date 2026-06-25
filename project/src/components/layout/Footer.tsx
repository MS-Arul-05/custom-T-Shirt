'use client'
import Link from 'next/link'

const COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Oversized T-Shirts', href: '/shop/category/oversized-t-shirts' },
      { label: 'Hoodies', href: '/shop/category/hoodies' },
      { label: 'Polo Shirts', href: '/shop/category/polo-shirts' },
      { label: 'Regular Fit', href: '/shop/category/regular-fit-t-shirts' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Track Order', href: '/track' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Designers', href: '/designer' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
]

const PAYMENTS = ['UPI', 'Visa', 'Mastercard', 'Razorpay']

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
    >
      {/* Main footer grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo + tagline + newsletter */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Link
              href="/"
              aria-label="FITBOX home"
              className="font-heading font-extrabold tracking-tight text-2xl"
            >
              <span style={{ color: 'var(--text-primary)' }}>FIT</span>
              <span style={{ color: 'var(--accent)' }}>BOX</span>
            </Link>
            <p className="text-sm mt-2 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Streetwear drops, custom prints and mystery boxes. Built for the bold.
            </p>
          </div>

          {/* Newsletter mini-line */}
          <form
            className="flex items-center gap-2 w-full max-w-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Email for drop alerts"
              aria-label="Email address"
              className="flex-1 h-11 px-3 text-sm rounded-[8px] border outline-none"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              type="submit"
              className="h-11 px-5 text-sm font-semibold text-white rounded-[8px] transition-colors"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Notify me
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} FITBOX. All rights reserved.</span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span>Made &amp; printed in India</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {PAYMENTS.map((label) => (
              <span
                key={label}
                className="px-2 py-1 rounded-[4px] border text-[11px] font-semibold"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-secondary)',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div
          className="flex gap-4 mt-4 text-xs"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/accessibility" className="hover:underline">Accessibility</Link>
        </div>
      </div>
    </footer>
  )
}
