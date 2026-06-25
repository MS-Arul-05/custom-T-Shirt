'use client'
import type { ProductColor } from '@/types'

interface Props {
  colors: ProductColor[]
  selected: string
  onChange: (name: string) => void
}

export default function ColorSelector({ colors, selected, onChange }: Readonly<Props>) {
  return (
    <div>
      <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
        Color: <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{selected}</span>
      </p>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((c) => {
          const isSelected = selected === c.name
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(c.name)}
              aria-label={c.name}
              aria-pressed={isSelected}
              title={c.name}
              className="w-8 h-8 rounded-full transition-all"
              style={{
                background: c.hex,
                outline: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
                outlineOffset: '2px',
                boxShadow: isSelected ? 'inset 0 0 0 2px var(--accent-light)' : 'inset 0 0 0 1px rgba(0,0,0,0.12)',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
