'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search, User, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/customize', label: 'Customize' },
  { href: '/mystery-box', label: 'Mystery Box' },
  { href: '/drops', label: 'Drops' },
]

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className} style={{ color: 'var(--text-primary)' }}>
      FIT<span style={{ color: 'var(--accent)' }}>BOX</span>
    </span>
  )
}

export default function Navbar() {
  const toggleCart = useCartStore((s) => s.toggleCart)
  const itemCount = useCartStore((s) => s.itemCount)
  const count = itemCount()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header
        className="sticky top-0 z-40 h-16 border-b"
        style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile: hamburger */}
          <button
            className="flex lg:hidden items-center justify-center w-9 h-9"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            style={{ color: 'var(--text-primary)' }}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            aria-label="FITBOX home"
            className="font-heading font-extrabold tracking-tight text-xl sm:text-2xl flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              aria-label="Search"
              className="hidden sm:flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <Search size={19} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden sm:flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <User size={19} />
            </Link>
            <Link
              href="/account"
              aria-label="Wishlist"
              className="hidden sm:flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <Heart size={19} />
            </Link>
            <button
              onClick={toggleCart}
              aria-label={`Open cart, ${count} item${count !== 1 ? 's' : ''}`}
              className="relative flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <ShoppingBag size={21} />
              {count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full min-w-[18px] h-[18px] px-1 text-white font-bold"
                  style={{ fontSize: '10px', background: 'var(--accent)' }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div
            className="h-16 px-4 sm:px-6 flex items-center justify-between border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center w-9 h-9"
              style={{ color: 'var(--text-primary)' }}
            >
              <X size={22} />
            </button>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              aria-label="FITBOX home"
              className="font-heading font-extrabold tracking-tight text-xl absolute left-1/2 -translate-x-1/2"
            >
              <Wordmark />
            </Link>
            <div className="w-9 h-9" aria-hidden />
          </div>

          <nav className="flex-1 flex flex-col px-6 py-8 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 font-heading text-2xl font-bold transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="mt-auto pt-6 border-t flex items-center gap-6"
              style={{ borderColor: 'var(--border)' }}
            >
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                <User size={18} /> Account
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Heart size={18} /> Wishlist
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
