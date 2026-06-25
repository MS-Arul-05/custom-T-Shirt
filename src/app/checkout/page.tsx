'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Lock, ShoppingBag, Tag, Gift, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, shippingFor } from '@/lib/utils'

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallets'

const PAYMENT_METHODS: { id: PaymentMethod; label: string; sub: string }[] = [
  { id: 'upi', label: 'UPI', sub: 'GPay, PhonePe, Paytm & more' },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay, Amex' },
  { id: 'netbanking', label: 'Net Banking', sub: 'All major Indian banks' },
  { id: 'wallets', label: 'Wallets', sub: 'Paytm, Mobikwik, Amazon Pay' },
]

function kindLabel(kind: string): string {
  if (kind === 'mystery_box') return 'Mystery Box'
  if (kind === 'custom') return 'Custom'
  return ''
}

function Field({
  label,
  id,
  type = 'text',
  placeholder,
  required = true,
  className = '',
  value,
  onChange,
  inputMode,
  maxLength,
}: {
  label: string
  id: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
  value: string
  onChange: (v: string) => void
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  maxLength?: number
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 text-sm rounded-[8px] border outline-none transition-colors focus:border-[var(--accent)]"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subtotalFn = useCartStore((s) => s.subtotal)
  const itemCount = useCartStore((s) => s.itemCount)
  const clear = useCartStore((s) => s.clear)

  // Contact
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Shipping (India)
  const [fullName, setFullName] = useState('')
  const [shipPhone, setShipPhone] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [stateName, setStateName] = useState('')
  const [pin, setPin] = useState('')

  // Payment
  const [method, setMethod] = useState<PaymentMethod>('upi')
  const [upiId, setUpiId] = useState('')

  // Coupon / gift card
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState<{ code: string; type: 'percent' | 'flat'; value: number } | null>(null)
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [giftInput, setGiftInput] = useState('')
  const [giftCredit, setGiftCredit] = useState(0)
  const [giftMsg, setGiftMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const [processing, setProcessing] = useState(false)

  const subtotal = subtotalFn()
  const count = itemCount()
  const hasNonReturnable = items.some((i) => i.kind === 'custom' || i.kind === 'mystery_box')

  const couponDiscount = useMemo(() => {
    if (!coupon) return 0
    if (coupon.type === 'percent') return Math.round((subtotal * coupon.value) / 100)
    return Math.min(coupon.value, subtotal)
  }, [coupon, subtotal])

  const giftDiscount = Math.min(giftCredit, Math.max(0, subtotal - couponDiscount))
  const discount = couponDiscount + giftDiscount
  const discountedSubtotal = Math.max(0, subtotal - discount)
  // Free-shipping threshold applies to the amount actually paid (after discounts).
  const shipping = shippingFor(discountedSubtotal)
  const grandTotal = discountedSubtotal + shipping

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase()
    if (!code) return
    if (code === 'FITBOX10') {
      setCoupon({ code, type: 'percent', value: 10 })
      setCouponMsg({ ok: true, text: 'FITBOX10 applied — 10% off' })
    } else if (code === 'FLAT200') {
      setCoupon({ code, type: 'flat', value: 20000 })
      setCouponMsg({ ok: true, text: 'FLAT200 applied — ₹200 off' })
    } else {
      setCoupon(null)
      setCouponMsg({ ok: false, text: 'Invalid code' })
    }
  }

  function applyGift() {
    const code = giftInput.trim().toUpperCase()
    if (!code) return
    if (code === 'GIFT500') {
      setGiftCredit(50000)
      setGiftMsg({ ok: true, text: 'Gift card applied — ₹500 credit' })
    } else {
      setGiftCredit(0)
      setGiftMsg({ ok: false, text: 'Invalid code' })
    }
  }

  const requiredFilled =
    email.trim() !== '' &&
    phone.trim() !== '' &&
    fullName.trim() !== '' &&
    shipPhone.trim() !== '' &&
    line1.trim() !== '' &&
    city.trim() !== '' &&
    stateName.trim() !== '' &&
    pin.trim().length === 6 &&
    (method !== 'upi' || upiId.trim() !== '')

  const canPay = requiredFilled && count > 0 && !processing

  function handlePay() {
    if (!canPay) return
    setProcessing(true)
    // Simulate a Razorpay-style payment round-trip (client-side mock).
    setTimeout(() => {
      const seq = String(Math.floor(Math.random() * 900000) + 100000)
      const orderNo = `FB-26-${seq.slice(0, 6)}`
      clear()
      router.push(`/checkout/success?order=${encodeURIComponent(orderNo)}`)
    }, 900)
  }

  if (count === 0) {
    return (
      <div className="max-w-[560px] mx-auto px-4 sm:px-6 py-24 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--accent-light)' }}
        >
          <ShoppingBag size={28} style={{ color: 'var(--accent)' }} />
        </div>
        <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Your bag is empty
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          Nothing to check out yet. Go grab some heat from the latest drops.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 h-11 px-7 text-sm font-semibold rounded-[8px] text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          Shop the drop
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
        {/* LEFT */}
        <div>
          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              Contact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email address" id="email" type="email" inputMode="email" placeholder="you@example.com" value={email} onChange={setEmail} />
              <Field label="Phone number" id="phone" type="tel" inputMode="tel" placeholder="+91 98765 43210" value={phone} onChange={setPhone} />
            </div>
          </section>

          {/* Shipping address (India) */}
          <section className="mb-10">
            <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              Shipping address
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full name" id="fullName" placeholder="Aarav Sharma" value={fullName} onChange={setFullName} />
                <Field label="Phone" id="shipPhone" type="tel" inputMode="tel" placeholder="98765 43210" value={shipPhone} onChange={setShipPhone} />
              </div>
              <Field label="Address line 1" id="line1" placeholder="Flat / House no, Building, Street" value={line1} onChange={setLine1} />
              <Field label="Address line 2" id="line2" placeholder="Area, Landmark (optional)" required={false} value={line2} onChange={setLine2} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="City" id="city" placeholder="Mumbai" value={city} onChange={setCity} />
                <Field label="State" id="state" placeholder="Maharashtra" value={stateName} onChange={setStateName} />
                <Field label="PIN code" id="pin" inputMode="numeric" maxLength={6} placeholder="400001" value={pin} onChange={(v) => setPin(v.replace(/\D/g, ''))} />
              </div>
              <div>
                <label htmlFor="country" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Country <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  id="country"
                  value="India"
                  readOnly
                  className="w-full h-11 px-4 text-sm rounded-[8px] border outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                Payment method
              </h2>
              <span className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Lock size={12} /> 🔒 Secured by Razorpay (demo)
              </span>
            </div>

            <div className="space-y-2.5">
              {PAYMENT_METHODS.map((m) => {
                const active = method === m.id
                return (
                  <div key={m.id}>
                    <label
                      className="flex items-center justify-between p-4 rounded-[8px] border cursor-pointer transition-all"
                      style={{
                        borderColor: active ? 'var(--accent)' : 'var(--border)',
                        background: active ? 'var(--accent-light)' : 'var(--bg-surface)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={active}
                          onChange={() => setMethod(m.id)}
                          className="accent-[var(--accent)]"
                        />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{m.label}</p>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{m.sub}</p>
                        </div>
                      </div>
                      {active && <Check size={16} style={{ color: 'var(--accent)' }} />}
                    </label>

                    {m.id === 'upi' && active && (
                      <div className="mt-2.5 px-4">
                        <Field
                          label="Enter your UPI ID (demo)"
                          id="upiId"
                          placeholder="yourname@upi"
                          required={false}
                          value={upiId}
                          onChange={setUpiId}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              International cards are processed via Stripe. This is a demo checkout — no real payment is collected
              or processed.
            </p>
          </section>

          {/* Coupon + Gift card */}
          <section>
            <h2 className="text-base font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              Offers
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Tag size={12} /> Coupon code
                </label>
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="FITBOX10"
                    className="flex-1 h-11 px-4 text-sm rounded-[8px] border outline-none transition-colors focus:border-[var(--accent)] uppercase"
                    style={{ border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="h-11 px-5 rounded-[8px] text-sm font-semibold border transition-colors"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--bg-surface)' }}
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className="text-xs mt-1.5" style={{ color: couponMsg.ok ? 'var(--success)' : 'var(--error)' }}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Gift size={12} /> Gift card
                </label>
                <div className="flex gap-2">
                  <input
                    value={giftInput}
                    onChange={(e) => setGiftInput(e.target.value)}
                    placeholder="GIFT500"
                    className="flex-1 h-11 px-4 text-sm rounded-[8px] border outline-none transition-colors focus:border-[var(--accent)] uppercase"
                    style={{ border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  />
                  <button
                    type="button"
                    onClick={applyGift}
                    className="h-11 px-5 rounded-[8px] text-sm font-semibold border transition-colors"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--bg-surface)' }}
                  >
                    Apply
                  </button>
                </div>
                {giftMsg && (
                  <p className="text-xs mt-1.5" style={{ color: giftMsg.ok ? 'var(--success)' : 'var(--error)' }}>
                    {giftMsg.text}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: order summary */}
        <div>
          <div className="sticky top-24 rounded-[12px] p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Order summary ({count})
            </h3>

            <div className="space-y-4 mb-5">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="w-14 h-[70px] flex-shrink-0 overflow-hidden relative rounded-[8px]" style={{ background: 'var(--bg-primary)' }}>
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    )}
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white flex items-center justify-center font-semibold"
                      style={{ background: 'var(--text-secondary)', fontSize: '10px' }}
                    >
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-snug truncate" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                      {[item.color, item.size].filter(Boolean).join(' · ') || kindLabel(item.kind)}
                    </p>
                  </div>
                  <p className="text-xs font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-xs" style={{ color: 'var(--success)' }}>
                  <span>Coupon{coupon ? ` (${coupon.code})` : ''}</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              {giftDiscount > 0 && (
                <div className="flex justify-between text-xs" style={{ color: 'var(--success)' }}>
                  <span>Gift card</span>
                  <span>-{formatPrice(giftDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--accent)' : undefined }}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-3 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePay}
              disabled={!canPay}
              className="w-full mt-5 h-12 rounded-[8px] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-accent hover:bg-[var(--accent-hover)]"
            >
              <Lock size={14} />
              {processing ? 'Processing…' : `Pay ${formatPrice(grandTotal)}`}
            </button>

            <p className="text-[11px] mt-3 text-center" style={{ color: 'var(--text-tertiary)' }}>
              🔒 Secured by Razorpay (demo). No real payment is taken.
            </p>

            {hasNonReturnable && (
              <p className="text-[11px] mt-3 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                Note: custom designs and mystery-box items are non-returnable.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
