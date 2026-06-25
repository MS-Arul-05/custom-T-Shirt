'use client'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { BASE_STYLES } from '@/lib/builder'
import { formatPrice, cn } from '@/lib/utils'
import { useBuilderStore } from '@/store/builder'

export default function StyleStep() {
  const style = useBuilderStore((s) => s.style)
  const setStyle = useBuilderStore((s) => s.setStyle)

  return (
    <section>
      <h2 className="font-heading text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        Choose your base
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
        Pick a silhouette to build on. Printed in India on premium combed cotton.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {BASE_STYLES.map((s) => {
          const selected = s.id === style.id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyle(s)}
              aria-pressed={selected}
              className={cn(
                'group relative overflow-hidden rounded-[12px] text-left transition-all'
              )}
              style={{
                border: selected
                  ? '2px solid var(--accent)'
                  : '1px solid var(--border)',
                background: 'var(--bg-surface)',
              }}
            >
              {selected && (
                <span
                  className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  <Check size={14} />
                </span>
              )}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={s.mockupFront}
                  alt={`${s.name} base mockup`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {s.name}
                </p>
                <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                  {formatPrice(s.basePrice)}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
