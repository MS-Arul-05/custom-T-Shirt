'use client'
import { Check } from 'lucide-react'
import { BUILDER_COLORS } from '@/lib/builder'
import { cn } from '@/lib/utils'
import { useBuilderStore, BUILDER_SIZES } from '@/store/builder'

export default function ColorStep() {
  const color = useBuilderStore((s) => s.color)
  const setColor = useBuilderStore((s) => s.setColor)
  const size = useBuilderStore((s) => s.size)
  const setSize = useBuilderStore((s) => s.setSize)

  return (
    <section className="space-y-7">
      <div>
        <h2 className="font-heading text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Choose a color
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Garment-dyed colorways. Your design previews live on the next steps.
        </p>
        <div className="flex flex-wrap gap-3">
          {BUILDER_COLORS.map((c) => {
            const selected = c.name === color.name
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c)}
                aria-pressed={selected}
                aria-label={c.name}
                title={c.name}
                className="relative flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105"
                style={{
                  background: c.hex,
                  boxShadow: selected
                    ? '0 0 0 2px var(--bg-primary), 0 0 0 4px var(--accent)'
                    : '0 0 0 1px var(--border)',
                }}
              >
                {selected && (
                  <Check
                    size={16}
                    style={{ color: c.name === 'White' || c.name === 'Beige' ? '#1A1A1A' : '#fff' }}
                  />
                )}
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Selected: <span style={{ color: 'var(--text-primary)' }}>{color.name}</span>
        </p>
      </div>

      <div>
        <h3 className="font-heading text-base font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Pick your size
        </h3>
        <div className="flex flex-wrap gap-2">
          {BUILDER_SIZES.map((sz) => {
            const selected = sz === size
            return (
              <button
                key={sz}
                type="button"
                onClick={() => setSize(sz)}
                aria-pressed={selected}
                className={cn('h-10 min-w-11 px-3 text-sm font-semibold rounded-[8px] border transition-colors')}
                style={{
                  borderColor: selected ? 'var(--accent)' : 'var(--border)',
                  background: selected ? 'var(--accent-light)' : 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                }}
              >
                {sz}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
