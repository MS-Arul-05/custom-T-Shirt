'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { DESIGN_TEMPLATES } from '@/lib/builder'
import { cn } from '@/lib/utils'
import type { DesignTemplate } from '@/types'
import { useBuilderStore } from '@/store/builder'

type Filter = 'all' | DesignTemplate['category']

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'anime', label: 'Anime' },
  { id: 'typography', label: 'Typography' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'minimal', label: 'Minimal' },
]

export default function TemplatePicker() {
  const side = useBuilderStore((s) => s.side)
  const addLayer = useBuilderStore((s) => s.addLayer)
  const [filter, setFilter] = useState<Filter>('all')
  const [added, setAdded] = useState<string | null>(null)

  const templates =
    filter === 'all'
      ? DESIGN_TEMPLATES
      : DESIGN_TEMPLATES.filter((t) => t.category === filter)

  const handleAdd = (t: DesignTemplate) => {
    addLayer({
      side,
      type: 'image',
      assetUrl: t.url,
      x: 0.5,
      y: 0.42,
      scale: 1,
      rotation: 0,
    })
    setAdded(t.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const selected = f.id === filter
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={selected}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: selected ? 'var(--accent)' : 'var(--bg-surface)',
                color: selected ? '#fff' : 'var(--text-secondary)',
                border: selected ? '1px solid var(--accent)' : '1px solid var(--border)',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleAdd(t)}
            className={cn('group relative overflow-hidden rounded-[12px] transition-all')}
            style={{
              border: added === t.id ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: 'var(--bg-surface)',
            }}
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image src={t.url} alt={t.name} fill sizes="25vw" className="object-cover" />
              <span
                className="absolute inset-0 flex items-center justify-center gap-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: 'rgba(0,0,0,0.45)' }}
              >
                <Plus size={14} /> {added === t.id ? 'Added' : 'Add'}
              </span>
            </div>
            <p className="truncate p-2 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
              {t.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
