'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DesignLayer, LayerSide } from '@/types'
import { useBuilderStore } from '@/store/builder'

interface Props {
  /** Show the Front / Back / 360 toggle (used on the dedicated preview step). */
  showToggle?: boolean
  /** Allow clicking a layer to select it. */
  selectable?: boolean
  className?: string
}

function LayerView({ layer, color }: { layer: DesignLayer; color: string }) {
  const transform = `translate(-50%, -50%) scale(${layer.scale}) rotate(${layer.rotation}deg)`
  const common: React.CSSProperties = {
    position: 'absolute',
    left: `${layer.x * 100}%`,
    top: `${layer.y * 100}%`,
    transform,
    zIndex: layer.z,
  }

  if (layer.type === 'text') {
    return (
      <span
        style={{
          ...common,
          fontFamily: `'${layer.font ?? 'Inter'}', sans-serif`,
          color: layer.textColor ?? '#1A1A1A',
          textAlign: layer.align ?? 'center',
          fontWeight: 800,
          fontSize: '7%',
          lineHeight: 1.1,
          whiteSpace: 'pre-wrap',
          maxWidth: '70%',
          textShadow: color === '#1A1A1A' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
          pointerEvents: 'none',
        }}
      >
        {layer.text}
      </span>
    )
  }

  return (
    <span style={{ ...common, width: layer.type === 'logo' ? '28%' : '46%', pointerEvents: 'none' }}>
      {layer.assetUrl && (
        <Image
          src={layer.assetUrl}
          alt="Design layer"
          width={400}
          height={400}
          unoptimized
          className="h-auto w-full rounded-[6px] object-contain"
        />
      )}
    </span>
  )
}

export default function PreviewCanvas({ showToggle = false, selectable = false, className }: Props) {
  const style = useBuilderStore((s) => s.style)
  const color = useBuilderStore((s) => s.color)
  const side = useBuilderStore((s) => s.side)
  const setSide = useBuilderStore((s) => s.setSide)
  const layers = useBuilderStore((s) => s.layers)
  const activeLayerId = useBuilderStore((s) => s.activeLayerId)
  const setActiveLayer = useBuilderStore((s) => s.setActiveLayer)

  const reduceMotion = useReducedMotion()
  const [spin, setSpin] = useState(false)

  // 360° mode: alternate front/back unless reduced motion is requested.
  useEffect(() => {
    if (!spin || reduceMotion) return
    const t = setInterval(() => setSide(side === 'front' ? 'back' : 'front'), 1400)
    return () => clearInterval(t)
  }, [spin, reduceMotion, side, setSide])

  const mockup = side === 'front' ? style.mockupFront : style.mockupBack
  const visibleLayers = layers.filter((l) => l.side === side)

  return (
    <div className={cn('w-full', className)}>
      {showToggle && (
        <div className="mb-3 flex items-center justify-center gap-2">
          {(['front', 'back'] as LayerSide[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSpin(false)
                setSide(s)
              }}
              aria-pressed={side === s && !spin}
              className="rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors"
              style={{
                background: side === s && !spin ? 'var(--accent)' : 'var(--bg-surface)',
                color: side === s && !spin ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSpin((v) => !v)}
            aria-pressed={spin}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
            style={{
              background: spin ? 'var(--accent)' : 'var(--bg-surface)',
              color: spin ? '#fff' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <RotateCw size={14} className={spin && !reduceMotion ? 'animate-spin' : ''} /> 360°
          </button>
        </div>
      )}

      <div
        className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[12px]"
        style={{ background: color.hex, border: '1px solid var(--border)' }}
      >
        {/* Garment mockup, tinted toward the chosen color via blend. */}
        <Image
          src={mockup}
          alt={`${style.name} ${side} preview`}
          fill
          sizes="420px"
          unoptimized
          className="object-cover"
          style={{ mixBlendMode: 'multiply', opacity: 0.92 }}
        />

        {visibleLayers.map((layer) => {
          const active = layer.id === activeLayerId
          return (
            <div
              key={layer.id}
              onClick={selectable ? () => setActiveLayer(active ? null : layer.id) : undefined}
              className={cn('absolute inset-0', selectable && 'cursor-pointer')}
              style={{ zIndex: layer.z }}
            >
              <LayerView layer={layer} color={color.hex} />
              {selectable && active && (
                <span
                  className="absolute"
                  style={{
                    left: `${layer.x * 100}%`,
                    top: `${layer.y * 100}%`,
                    width: layer.type === 'logo' ? '32%' : layer.type === 'text' ? '74%' : '50%',
                    height: layer.type === 'text' ? '18%' : '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px dashed var(--accent)',
                    borderRadius: 8,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          )
        })}

        {visibleLayers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: 'rgba(0,0,0,0.35)', color: '#fff' }}
            >
              No design on {side} yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
