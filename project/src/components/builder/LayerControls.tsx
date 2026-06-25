'use client'
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  RotateCcw,
  RotateCw,
  Trash2,
  Type,
  ImageIcon,
  Sparkles,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DesignLayer, LayerType } from '@/types'
import { useBuilderStore } from '@/store/builder'

const NUDGE = 0.04
const SCALE_STEP = 0.12
const ROT_STEP = 8

const ICONS: Record<LayerType, typeof Type> = {
  text: Type,
  image: ImageIcon,
  logo: ImageIcon,
  ai: Sparkles,
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

export default function LayerControls() {
  const layers = useBuilderStore((s) => s.layers)
  const side = useBuilderStore((s) => s.side)
  const activeLayerId = useBuilderStore((s) => s.activeLayerId)
  const setActiveLayer = useBuilderStore((s) => s.setActiveLayer)
  const updateLayer = useBuilderStore((s) => s.updateLayer)
  const removeLayer = useBuilderStore((s) => s.removeLayer)

  const sideLayers = layers.filter((l) => l.side === side)
  const active = layers.find((l) => l.id === activeLayerId && l.side === side)

  const labelFor = (l: DesignLayer) =>
    l.type === 'text' ? l.text || 'Text' : l.type === 'logo' ? 'Logo' : l.type === 'ai' ? 'AI art' : 'Image'

  const Ctrl = ({
    onClick,
    children,
    label,
  }: {
    onClick: () => void
    children: React.ReactNode
    label: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-[8px] transition-colors"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
    >
      {children}
    </button>
  )

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          <Layers size={15} /> Layers on {side} ({sideLayers.length})
        </p>
        {sideLayers.length === 0 ? (
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            No layers on this side. Add a design or text from the earlier steps.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {sideLayers.map((l) => {
              const Icon = ICONS[l.type]
              const selected = l.id === activeLayerId
              return (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => setActiveLayer(selected ? null : l.id)}
                    aria-pressed={selected}
                    className={cn('flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-left text-sm transition-colors')}
                    style={{
                      border: selected ? '2px solid var(--accent)' : '1px solid var(--border)',
                      background: selected ? 'var(--accent-light)' : 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <Icon size={15} style={{ color: 'var(--accent)' }} />
                    <span className="flex-1 truncate font-medium">{labelFor(l)}</span>
                    <Trash2
                      size={15}
                      style={{ color: 'var(--text-tertiary)' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        removeLayer(l.id)
                      }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {active && (
        <div className="rounded-[12px] p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Edit: {labelFor(active)}
          </p>

          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Move</span>
            <div className="flex gap-1.5">
              <Ctrl label="Move up" onClick={() => updateLayer(active.id, { y: clamp01(active.y - NUDGE) })}><ArrowUp size={15} /></Ctrl>
              <Ctrl label="Move down" onClick={() => updateLayer(active.id, { y: clamp01(active.y + NUDGE) })}><ArrowDown size={15} /></Ctrl>
              <Ctrl label="Move left" onClick={() => updateLayer(active.id, { x: clamp01(active.x - NUDGE) })}><ArrowLeft size={15} /></Ctrl>
              <Ctrl label="Move right" onClick={() => updateLayer(active.id, { x: clamp01(active.x + NUDGE) })}><ArrowRight size={15} /></Ctrl>
            </div>

            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Scale</span>
            <div className="flex gap-1.5">
              <Ctrl label="Shrink" onClick={() => updateLayer(active.id, { scale: Math.max(0.2, active.scale - SCALE_STEP) })}><Minus size={15} /></Ctrl>
              <Ctrl label="Enlarge" onClick={() => updateLayer(active.id, { scale: Math.min(3, active.scale + SCALE_STEP) })}><Plus size={15} /></Ctrl>
              <span className="self-center text-xs" style={{ color: 'var(--text-tertiary)' }}>{Math.round(active.scale * 100)}%</span>
            </div>

            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Rotate</span>
            <div className="flex gap-1.5">
              <Ctrl label="Rotate left" onClick={() => updateLayer(active.id, { rotation: active.rotation - ROT_STEP })}><RotateCcw size={15} /></Ctrl>
              <Ctrl label="Rotate right" onClick={() => updateLayer(active.id, { rotation: active.rotation + ROT_STEP })}><RotateCw size={15} /></Ctrl>
              <span className="self-center text-xs" style={{ color: 'var(--text-tertiary)' }}>{active.rotation % 360}°</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeLayer(active.id)}
            className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-sm font-semibold transition-colors"
            style={{ border: '1px solid var(--error)', color: 'var(--error)', background: 'transparent' }}
          >
            <Trash2 size={14} /> Delete layer
          </button>
        </div>
      )}
    </div>
  )
}
