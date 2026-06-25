import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

interface ShippingProgressProps {
  /** Cart subtotal in INR paise. */
  subtotal: number
}

export default function ShippingProgress({ subtotal }: Readonly<ShippingProgressProps>) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const unlocked = remaining === 0

  return (
    <div className="px-6 py-4">
      <p
        className="text-xs font-medium mb-2"
        style={{ color: unlocked ? 'var(--success)' : 'var(--text-secondary)' }}
      >
        {unlocked
          ? "🎉 You've unlocked free shipping!"
          : `You're ${formatPrice(remaining)} away from free shipping`}
      </p>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--accent-light)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'var(--accent)',
          }}
        />
      </div>
    </div>
  )
}
