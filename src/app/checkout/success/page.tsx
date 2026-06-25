'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Truck, Package, ArrowRight } from 'lucide-react'

function SuccessContent() {
  const params = useSearchParams()
  const orderNo = params.get('order') ?? 'FB-26-000000'

  return (
    <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-20 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7"
        style={{ background: 'var(--accent-light)' }}
      >
        <CheckCircle2 size={40} style={{ color: 'var(--accent)' }} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--accent)' }}>
        Order confirmed
      </p>
      <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        You&apos;re all set. Heat secured. 🔥
      </h1>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Thanks for copping with FITBOX. We&apos;ve emailed your confirmation and we&apos;ll ping you the moment your
        order ships.
      </p>

      <div className="rounded-[12px] p-6 mb-8 text-left" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <span className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Order number
          </span>
          <span className="text-sm font-bold font-heading" style={{ color: 'var(--text-primary)' }}>
            {orderNo}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <Package size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Confirmation emailed</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Check your inbox for the full receipt (demo — no real email sent).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Truck size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Estimated delivery</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              5–7 business days, shipped across India.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/account/orders"
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[8px] text-sm font-semibold border transition-colors"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--bg-surface)' }}
        >
          Track your order
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[8px] text-sm font-semibold text-white transition-colors bg-accent hover:bg-[var(--accent-hover)]"
        >
          Continue shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-[600px] mx-auto px-4 py-20 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>Loading…</div>}>
      <SuccessContent />
    </Suspense>
  )
}
