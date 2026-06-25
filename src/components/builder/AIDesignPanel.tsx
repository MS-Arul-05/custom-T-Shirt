'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Loader2, Plus } from 'lucide-react'
import { AI_STYLES, mockGenerateAiDesigns } from '@/lib/builder'
import { cn } from '@/lib/utils'
import type { AiStyle } from '@/types'
import { useBuilderStore } from '@/store/builder'

export default function AIDesignPanel() {
  const side = useBuilderStore((s) => s.side)
  const addLayer = useBuilderStore((s) => s.addLayer)

  const [prompt, setPrompt] = useState('')
  const [aiStyle, setAiStyle] = useState<AiStyle>(AI_STYLES[0].id)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [added, setAdded] = useState<string | null>(null)

  const activeHint = AI_STYLES.find((s) => s.id === aiStyle)?.hint

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setResults([])
    try {
      const urls = await mockGenerateAiDesigns(prompt.trim(), aiStyle)
      setResults(urls)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = (url: string) => {
    addLayer({
      side,
      type: 'ai',
      assetUrl: url,
      x: 0.5,
      y: 0.42,
      scale: 1,
      rotation: 0,
    })
    setAdded(url)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Describe your design
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder={activeHint}
          className="w-full resize-none rounded-[8px] p-3 text-sm outline-none focus:ring-2"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Art style
        </p>
        <div className="flex flex-wrap gap-2">
          {AI_STYLES.map((s) => {
            const selected = s.id === aiStyle
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setAiStyle(s.id)}
                aria-pressed={selected}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
                style={{
                  background: selected ? 'var(--accent)' : 'var(--bg-surface)',
                  color: selected ? '#fff' : 'var(--text-secondary)',
                  border: selected ? '1px solid var(--accent)' : '1px solid var(--border)',
                }}
              >
                {s.label}
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!prompt.trim() || loading}
        className="inline-flex h-11 items-center gap-2 rounded-[8px] px-5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: 'var(--accent)' }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        {loading ? 'Generating…' : 'Generate designs'}
      </button>

      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
        Demo previews are placeholders. In production this calls the FITBOX Studio API to
        render real artwork from your prompt.
      </p>

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-[12px]"
              style={{ background: 'var(--bg-primary)' }}
            />
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {results.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => handleAdd(url)}
              className={cn(
                'group relative aspect-square overflow-hidden rounded-[12px] transition-all'
              )}
              style={{
                border: added === url ? '2px solid var(--accent)' : '1px solid var(--border)',
              }}
            >
              <Image src={url} alt="AI generated design option" fill sizes="25vw" className="object-cover" />
              <span
                className="absolute inset-0 flex items-center justify-center gap-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: 'rgba(0,0,0,0.45)' }}
              >
                <Plus size={14} /> {added === url ? 'Added' : 'Add'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
