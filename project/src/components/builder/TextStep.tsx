'use client'
import { useState } from 'react'
import { Type, AlignLeft, AlignCenter, AlignRight, Plus } from 'lucide-react'
import { BUILDER_FONTS, TEXT_COLORS } from '@/lib/builder'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/store/builder'

type Align = 'left' | 'center' | 'right'

const ALIGNMENTS: { id: Align; icon: typeof AlignLeft }[] = [
  { id: 'left', icon: AlignLeft },
  { id: 'center', icon: AlignCenter },
  { id: 'right', icon: AlignRight },
]

export default function TextStep() {
  const side = useBuilderStore((s) => s.side)
  const addLayer = useBuilderStore((s) => s.addLayer)

  const [text, setText] = useState('')
  const [font, setFont] = useState<string>(BUILDER_FONTS[0])
  const [textColor, setTextColor] = useState<string>(TEXT_COLORS[1])
  const [align, setAlign] = useState<Align>('center')

  const handleAdd = () => {
    if (!text.trim()) return
    addLayer({
      side,
      type: 'text',
      text: text.trim(),
      font,
      textColor,
      align,
      x: 0.5,
      y: 0.55,
      scale: 1,
      rotation: 0,
    })
    setText('')
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Add text
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Drop a slogan, name or number. Adds to the{' '}
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{side}</span> side.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Your text
        </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={40}
          placeholder="STAY HUNGRY"
          className="w-full rounded-[8px] p-3 text-sm outline-none focus:ring-2"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Font</p>
        <div className="flex flex-wrap gap-2">
          {BUILDER_FONTS.map((f) => {
            const selected = f === font
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFont(f)}
                aria-pressed={selected}
                className="rounded-[8px] px-3 py-2 text-sm transition-colors"
                style={{
                  fontFamily: `'${f}', sans-serif`,
                  border: selected ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: selected ? 'var(--accent-light)' : 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                }}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Text color</p>
        <div className="flex flex-wrap gap-2">
          {TEXT_COLORS.map((c) => {
            const selected = c === textColor
            return (
              <button
                key={c}
                type="button"
                onClick={() => setTextColor(c)}
                aria-label={`Text color ${c}`}
                aria-pressed={selected}
                className="h-9 w-9 rounded-full transition-transform hover:scale-105"
                style={{
                  background: c,
                  boxShadow: selected
                    ? '0 0 0 2px var(--bg-primary), 0 0 0 4px var(--accent)'
                    : '0 0 0 1px var(--border)',
                }}
              />
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Alignment</p>
        <div className="flex gap-2">
          {ALIGNMENTS.map((a) => {
            const Icon = a.icon
            const selected = a.id === align
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setAlign(a.id)}
                aria-pressed={selected}
                aria-label={`Align ${a.id}`}
                className={cn('flex h-10 w-10 items-center justify-center rounded-[8px] transition-colors')}
                style={{
                  border: selected ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: selected ? 'var(--accent-light)' : 'var(--bg-surface)',
                  color: selected ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                <Icon size={16} />
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!text.trim()}
        className="inline-flex h-11 items-center gap-2 rounded-[8px] px-5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: 'var(--accent)' }}
      >
        <Type size={16} /> Add text layer
      </button>
    </section>
  )
}
