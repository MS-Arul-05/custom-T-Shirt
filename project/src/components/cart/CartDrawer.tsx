'use client'
import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { cartDrawerVariants, backdropVariants } from '@/lib/motion'
import type { CartItem } from '@/types'
import ShippingProgress from './ShippingProgress'

/** Human-readable variant line for a cart item. */
function variantLabel(item: CartItem): string {
  if (item.kind === 'custom') return 'Custom design'
  if (item.kind === 'mystery_box') return 'Mystery box'
  return `${item.color} · ${item.size}`
}

export default function CartDrawer() {
  const items = useCartStore((s) => s.items)
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.subtotal)
  const itemCount = useCartStore((s) => s.itemCount)

  const prefersReduced = useReducedMotion()
  const total = subtotal()
  const count = itemCount()

  // Escape closes the drawer.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  const motionProps = prefersReduced
    ? { initial: 'visible' as const, animate: 'visible' as const, exit: 'visible' as const }
    : { initial: 'hidden' as const, animate: 'visible' as const, exit: 'exit' as const }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeCart}
          />
          <motion.div
            key="drawer"
            variants={cartDrawerVariants}
            {...motionProps}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] z-50 flex flex-col shadow-2xl"
            style={{ background: 'var(--bg-primary)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Cart ({count})
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                style={{ color: 'var(--text-secondary)' }}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <ShoppingBag
                  size={36}
                  className="mb-4 opacity-30"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <p className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Your cart is empty
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center h-11 px-6 rounded-[8px] text-white text-sm font-semibold transition-colors"
                  style={{ background: 'var(--accent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                <ShippingProgress subtotal={total} />

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-5">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-4">
                      {/* Thumbnail */}
                      <div
                        className="w-[80px] h-[100px] flex-shrink-0 overflow-hidden relative rounded-[12px]"
                        style={{ background: 'var(--bg-surface)' }}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p
                            className="text-sm font-semibold leading-tight"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                            {variantLabel(item)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity <= 1
                                ? removeItem(item.key)
                                : updateQuantity(item.key, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="w-7 h-7 rounded-[8px] border flex items-center justify-center hover:opacity-70 transition-opacity"
                            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span
                            className="text-sm font-semibold w-5 text-center"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 rounded-[8px] border flex items-center justify-center hover:opacity-70 transition-opacity"
                            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="ml-auto hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      <p
                        className="text-sm font-semibold whitespace-nowrap"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  className="px-6 py-5 border-t space-y-3"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex items-center justify-center w-full h-12 rounded-[8px] text-white text-sm font-semibold transition-colors"
                    style={{ background: 'var(--accent)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                  >
                    Checkout
                  </Link>
                  <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
                    Taxes calculated at checkout
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
