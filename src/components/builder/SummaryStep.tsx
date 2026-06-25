'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Check, Save, Info } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useBuilderStore } from '@/store/builder'
import { useCartStore } from '@/store/cart'

export default function SummaryStep() {
  const router = useRouter()
  const style = useBuilderStore((s) => s.style)
  const color = useBuilderStore((s) => s.color)
  const size = useBuilderStore((s) => s.size)
  const layers = useBuilderStore((s) => s.layers)
  const price = useBuilderStore((s) => s.price)
  const reset = useBuilderStore((s) => s.reset)

  const addItem = useCartStore((s) => s.addItem)

  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)

  const total = price()
  const frontLayers = layers.filter((l) => l.side === 'front').length
  const backLayers = layers.filter((l) => l.side === 'back').length

  const handleAddToCart = () => {
    addItem({
      kind: 'custom',
      productId: `custom-${Date.now()}`,
      name: `Custom ${style.name} (${color.name})`,
      price: total,
      size,
      color: color.name,
      image: style.mockupFront,
    })
    setAdded(true)
    reset()
    router.push('/cart')
  }

  const handleSave = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2600)
  }

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Review &amp; checkout
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          One-of-one. Designed by you, printed in India.
        </p>
      </div>

      <div className="rounded-[12px] p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <Row label="Base style" value={style.name} />
        <Row label="Color" value={color.name} />
        <Row label="Size" value={size} />
        <Row label="Design layers" value={`${layers.length} (${frontLayers} front · ${backLayers} back)`} />
        <div className="flex items-center justify-between pt-3">
          <span className="font-heading text-base font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
          <span className="font-heading text-xl font-bold" style={{ color: 'var(--accent)' }}>{formatPrice(total)}</span>
        </div>
        <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          {formatPrice(style.basePrice)} base + ₹100 per design layer.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={added}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-white transition-colors disabled:opacity-60"
          style={{ background: 'var(--accent)' }}
        >
          {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] px-6 text-sm font-semibold transition-colors"
          style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
        >
          {saved ? <Check size={16} style={{ color: 'var(--success)' }} /> : <Save size={16} />}
          {saved ? 'Design saved' : 'Save design'}
        </button>
      </div>

      <div
        className="flex items-start gap-2 rounded-[8px] p-3 text-xs"
        style={{ background: 'var(--accent-light)', color: 'var(--text-secondary)' }}
      >
        <Info size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
        <span>
          Saving is a demo confirmation here. In production your design persists to{' '}
          <code>custom_designs</code> so you can reorder or share it.
        </span>
      </div>
    </section>
  )
}
