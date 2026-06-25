'use client'
import { useState } from 'react'
import { Ruler, X } from 'lucide-react'
import { sortSizes } from '@/lib/utils'

interface Props {
  sizes: string[]
  outOfStock?: string[]
  selected: string | null
  onChange: (size: string) => void
  error?: boolean
}

// Apparel chest/length chart in cm (XS–XXXL).
const SIZE_CHART: { size: string; chest: string; length: string }[] = [
  { size: 'XS', chest: '96', length: '68' },
  { size: 'S', chest: '102', length: '70' },
  { size: 'M', chest: '108', length: '72' },
  { size: 'L', chest: '114', length: '74' },
  { size: 'XL', chest: '120', length: '76' },
  { size: 'XXL', chest: '126', length: '78' },
  { size: 'XXXL', chest: '132', length: '80' },
]

export default function SizeSelector({ sizes, outOfStock = [], selected, onChange, error = false }: Readonly<Props>) {
  const [guideOpen, setGuideOpen] = useState(false)
  const ordered = sortSizes(sizes)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium" style={{ color: error ? 'var(--error)' : 'var(--text-primary)' }}>
          {error ? 'Please select a size' : 'Select size'}
        </p>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: 'var(--accent)' }}
        >
          <Ruler size={13} />
          Size guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ordered.map((size) => {
          const oos = outOfStock.includes(size)
          const isSelected = selected === size
          return (
            <button
              key={size}
              type="button"
              disabled={oos}
              aria-disabled={oos}
              aria-pressed={isSelected}
              onClick={() => !oos && onChange(size)}
              className="h-11 min-w-[48px] px-3 text-sm font-medium rounded-[8px] border transition-colors"
              style={{
                borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                background: isSelected ? 'var(--accent-light)' : 'transparent',
                color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                opacity: oos ? 0.4 : 1,
                textDecoration: oos ? 'line-through' : 'none',
                cursor: oos ? 'not-allowed' : 'pointer',
              }}
            >
              {size}
            </button>
          )
        })}
      </div>

      {/* Size guide modal */}
      {guideOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setGuideOpen(false)} />
          <div
            className="relative w-full max-w-md rounded-[16px] p-7 overflow-y-auto max-h-[90vh]"
            style={{ background: 'var(--bg-surface)' }}
          >
            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close size guide"
            >
              <X size={20} style={{ color: 'var(--text-secondary)' }} />
            </button>
            <h3 className="font-heading text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Size Guide
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Garment measurements in cm. Lay a tee flat and measure to compare. Between sizes? Size up for an oversized fit.
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Size', 'Chest (cm)', 'Length (cm)'].map((h) => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: 'var(--text-primary)' }}>{row.size}</td>
                    <td className="py-2.5 pr-4" style={{ color: 'var(--text-secondary)' }}>{row.chest}</td>
                    <td className="py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
