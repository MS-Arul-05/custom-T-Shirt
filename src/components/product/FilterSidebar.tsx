'use client'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/products'
import { formatPrice } from '@/lib/utils'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'bestsellers'

export interface FilterState {
  categories: string[]
  collections: string[]
  colors: string[]
  sizes: string[]
  fits: string[]
  priceMax: number // paise
}

export const COLLECTION_OPTIONS: { slug: string; name: string }[] = [
  { slug: 'anime', name: 'Anime' },
  { slug: 'streetwear', name: 'Streetwear' },
  { slug: 'gym', name: 'Gym' },
  { slug: 'college', name: 'College' },
  { slug: 'startup', name: 'Startup' },
  { slug: 'creator', name: 'Creator' },
]

export const BASE_COLORS: { name: string; hex: string }[] = [
  { name: 'Jet Black', hex: '#1A1A1A' },
  { name: 'Off White', hex: '#FFFFFF' },
  { name: 'Beige', hex: '#E8DCC4' },
  { name: 'Crimson', hex: '#DC2626' },
  { name: 'Army Green', hex: '#166534' },
  { name: 'Midnight Blue', hex: '#1E3A8A' },
]

export const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export const FIT_OPTIONS: { value: string; label: string }[] = [
  { value: 'oversized', label: 'Oversized' },
  { value: 'regular', label: 'Regular' },
  { value: 'hoodie', label: 'Hoodie' },
  { value: 'polo', label: 'Polo' },
  { value: 'crop', label: 'Crop' },
  { value: 'jacket', label: 'Jacket' },
  { value: 'accessory', label: 'Accessory' },
]

export const PRICE_MAX = 300000 // ₹3,000 in paise

export const INITIAL_FILTERS: FilterState = {
  categories: [],
  collections: [],
  colors: [],
  sizes: [],
  fits: [],
  priceMax: PRICE_MAX,
}

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
}

function AccordionSection({ title, children, defaultOpen = true }: Readonly<{ title: string; children: React.ReactNode; defaultOpen?: boolean }>) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b" style={{ borderColor: 'var(--border)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-sm font-semibold text-left"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
        <ChevronRight
          size={14}
          style={{
            color: 'var(--text-secondary)',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s',
          }}
        />
      </button>
      {open && <div className="pb-4 space-y-2.5">{children}</div>}
    </div>
  )
}

function Checkbox({ checked, onChange, label }: Readonly<{ checked: boolean; onChange: () => void; label: string }>) {
  return (
    <button type="button" onClick={onChange} className="flex items-center gap-2 w-full text-left">
      <span
        className="w-4 h-4 rounded-[4px] border flex-shrink-0 flex items-center justify-center transition-colors"
        style={{
          borderColor: checked ? 'var(--accent)' : 'var(--border)',
          background: checked ? 'var(--accent)' : 'transparent',
        }}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
            <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </button>
  )
}

function toggleArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}

export default function FilterSidebar({ filters, onChange }: Readonly<Props>) {
  const hasActive =
    filters.categories.length > 0 ||
    filters.collections.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.fits.length > 0 ||
    filters.priceMax < PRICE_MAX

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
          Filters
        </p>
        {hasActive && (
          <button type="button" onClick={() => onChange(INITIAL_FILTERS)} className="text-xs underline" style={{ color: 'var(--accent)' }}>
            Clear all
          </button>
        )}
      </div>

      <AccordionSection title="Category">
        {CATEGORIES.map((cat) => (
          <Checkbox
            key={cat.slug}
            checked={filters.categories.includes(cat.slug)}
            onChange={() => onChange({ ...filters, categories: toggleArray(filters.categories, cat.slug) })}
            label={cat.name}
          />
        ))}
      </AccordionSection>

      <AccordionSection title="Collection" defaultOpen={false}>
        {COLLECTION_OPTIONS.map((c) => (
          <Checkbox
            key={c.slug}
            checked={filters.collections.includes(c.slug)}
            onChange={() => onChange({ ...filters, collections: toggleArray(filters.collections, c.slug) })}
            label={c.name}
          />
        ))}
      </AccordionSection>

      <AccordionSection title="Color" defaultOpen={false}>
        <div className="flex flex-wrap gap-2.5">
          {BASE_COLORS.map((c) => {
            const on = filters.colors.includes(c.name)
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onChange({ ...filters, colors: toggleArray(filters.colors, c.name) })}
                title={c.name}
                aria-label={c.name}
                aria-pressed={on}
                className="w-7 h-7 rounded-full transition-all"
                style={{
                  background: c.hex,
                  outline: on ? '2px solid var(--accent)' : '2px solid transparent',
                  outlineOffset: '2px',
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
                }}
              />
            )
          })}
        </div>
      </AccordionSection>

      <AccordionSection title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => {
            const on = filters.sizes.includes(s)
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ ...filters, sizes: toggleArray(filters.sizes, s) })}
                aria-pressed={on}
                className="h-9 min-w-[40px] px-2.5 text-xs font-medium rounded-[8px] border transition-colors"
                style={{
                  borderColor: on ? 'var(--accent)' : 'var(--border)',
                  background: on ? 'var(--accent-light)' : 'transparent',
                  color: on ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
      </AccordionSection>

      <AccordionSection title="Fit" defaultOpen={false}>
        {FIT_OPTIONS.map((f) => (
          <Checkbox
            key={f.value}
            checked={filters.fits.includes(f.value)}
            onChange={() => onChange({ ...filters, fits: toggleArray(filters.fits, f.value) })}
            label={f.label}
          />
        ))}
      </AccordionSection>

      <AccordionSection title="Price">
        <input
          type="range"
          aria-label="Maximum price"
          min={50000}
          max={PRICE_MAX}
          step={5000}
          value={filters.priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-[var(--accent)]"
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
          <span>{formatPrice(50000)}</span>
          <span>Up to {formatPrice(filters.priceMax)}</span>
        </div>
      </AccordionSection>
    </aside>
  )
}
