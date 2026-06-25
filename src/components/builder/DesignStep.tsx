'use client'
import { useRef, useState } from 'react'
import { Upload, ImageIcon, Sparkles, LayoutGrid, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LayerType } from '@/types'
import { useBuilderStore } from '@/store/builder'
import AIDesignPanel from './AIDesignPanel'
import TemplatePicker from './TemplatePicker'

type Option = 'upload' | 'logo' | 'ai' | 'template'

const MAX_BYTES = 8 * 1024 * 1024
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']

const OPTIONS: { id: Option; label: string; icon: typeof Upload }[] = [
  { id: 'upload', label: 'Upload Image', icon: ImageIcon },
  { id: 'logo', label: 'Upload Logo', icon: Upload },
  { id: 'ai', label: 'AI Generate', icon: Sparkles },
  { id: 'template', label: 'Choose Template', icon: LayoutGrid },
]

export default function DesignStep() {
  const side = useBuilderStore((s) => s.side)
  const addLayer = useBuilderStore((s) => s.addLayer)
  const [option, setOption] = useState<Option>('upload')
  const [error, setError] = useState<string | null>(null)
  const imageInput = useRef<HTMLInputElement>(null)
  const logoInput = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined, type: Extract<LayerType, 'image' | 'logo'>) => {
    setError(null)
    if (!file) return
    if (!ACCEPTED.includes(file.type)) {
      setError('Unsupported file. Use PNG, JPG, WEBP, SVG or GIF.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('File is too large. Max size is 8MB.')
      return
    }
    // Read as a data URL (not an object URL) so the design survives a page reload
    // — the builder persists layers to localStorage, and blob: URLs die on refresh.
    const reader = new FileReader()
    reader.onload = () => {
      const url = typeof reader.result === 'string' ? reader.result : ''
      if (!url) {
        setError('Could not read that file. Please try another.')
        return
      }
      addLayer({
        side,
        type,
        assetUrl: url,
        x: 0.5,
        y: type === 'logo' ? 0.28 : 0.42,
        scale: type === 'logo' ? 0.55 : 1,
        rotation: 0,
      })
    }
    reader.onerror = () => setError('Could not read that file. Please try another.')
    reader.readAsDataURL(file)
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Add your design
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Upload art, drop a logo, generate with AI, or start from a template. Placing on the{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{side}</span> side.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {OPTIONS.map((o) => {
          const Icon = o.icon
          const selected = o.id === option
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setOption(o.id)}
              aria-pressed={selected}
              className={cn(
                'flex flex-col items-center gap-2 rounded-[8px] p-3 text-center transition-colors'
              )}
              style={{
                border: selected ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: selected ? 'var(--accent-light)' : 'var(--bg-surface)',
              }}
            >
              <Icon size={20} style={{ color: selected ? 'var(--accent)' : 'var(--text-secondary)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                {o.label}
              </span>
            </button>
          )
        })}
      </div>

      {error && (
        <div
          className="flex items-center gap-2 rounded-[8px] p-3 text-sm"
          style={{ background: 'var(--accent-light)', color: 'var(--error)' }}
        >
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {(option === 'upload' || option === 'logo') && (
        <div>
          <input
            ref={option === 'upload' ? imageInput : logoInput}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0], option === 'upload' ? 'image' : 'logo')
              e.target.value = ''
            }}
          />
          <button
            type="button"
            onClick={() => (option === 'upload' ? imageInput : logoInput).current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-dashed p-10 transition-colors"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
          >
            <Upload size={28} style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Click to upload {option === 'logo' ? 'a logo' : 'an image'}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              PNG, JPG, WEBP, SVG or GIF · up to 8MB
            </span>
          </button>
        </div>
      )}

      {option === 'ai' && <AIDesignPanel />}
      {option === 'template' && <TemplatePicker />}
    </section>
  )
}
