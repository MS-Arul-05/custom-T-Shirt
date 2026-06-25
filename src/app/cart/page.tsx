'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, shippingFor } from '@/lib/utils'
import type { CartItem } from '@/types'

/** Human-readable variant line for a cart item. */
function variantLabel(item: CartItem): string {
  if (item.kind === 'custom') return 'Custom design'
  if (item.kind === 'mystery_box') return 'Mystery box'
  return `${item.color} · Size ${item.size}`
}

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.subtotal)
  const itemCount = useCartStore((s) => s.itemCount)

  const total = subtotal()
  const count = itemCount()
  const shippingCost = shippingFor(total)
  const estimatedTotal = total + shippingCost

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag
          size={48}
          className="mx-auto mb-6 opacity-20"
          style={{ color: 'var(--text-secondary)' }}
        />
        <h1 className="font-heading text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Your cart is empty
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 h-11 px-7 text-sm font-semibold rounded-[8px] text-white transition-colors"
          style={{ background: 'var(--accent)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Start shopping <ArrowRight size={15} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
        Cart ({count})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {items.map((item) => (
              <div key={item.key} className="flex gap-5 py-6 first:pt-0">
                <div
                  className="w-[100px] h-[125px] flex-shrink-0 overflow-hidden relative rounded-[12px]"
                  style={{ background: 'var(--bg-surface)' }}
                >
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="100px" />
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {item.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {variantLabel(item)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className="flex-shrink-0 hover:opacity-60 transition-opacity"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center border rounded-[8px] overflow-hidden"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity <= 1
                            ? removeItem(item.key)
                            : updateQuantity(item.key, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-[var(--bg-surface)] transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span
                        className="w-10 text-center text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[var(--bg-surface)] transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div
            className="sticky top-24 rounded-[16px] p-6"
            style={{ background: 'var(--bg-surface)' }}
          >
            <h2 className="font-heading text-lg font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
              Order summary
            </h2>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span>Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
                <span style={{ color: 'var(--text-primary)' }}>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span style={{ color: shippingCost === 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
            </div>
            <div
              className="flex justify-between text-base font-bold pt-4 mb-5 border-t"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <span>Total</span>
              <span>{formatPrice(estimatedTotal)}</span>
            </div>
            <Link
              href="/checkout"
              className="flex items-center justify-center w-full h-12 rounded-[8px] text-white text-sm font-semibold gap-2 transition-colors"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Proceed to checkout <ArrowRight size={15} />
            </Link>
            <p className="text-xs text-center mt-3" style={{ color: 'var(--text-tertiary)' }}>
              Taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
