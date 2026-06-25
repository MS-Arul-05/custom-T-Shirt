'use client'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useBuilderStore } from '@/store/builder'
import BuilderStepper from '@/components/builder/BuilderStepper'
import StyleStep from '@/components/builder/StyleStep'
import ColorStep from '@/components/builder/ColorStep'
import DesignStep from '@/components/builder/DesignStep'
import TextStep from '@/components/builder/TextStep'
import PreviewCanvas from '@/components/builder/PreviewCanvas'
import LayerControls from '@/components/builder/LayerControls'
import SummaryStep from '@/components/builder/SummaryStep'

export default function CustomizePage() {
  const step = useBuilderStore((s) => s.step)
  const next = useBuilderStore((s) => s.next)
  const prev = useBuilderStore((s) => s.prev)
  const reset = useBuilderStore((s) => s.reset)
  const price = useBuilderStore((s) => s.price)

  // Avoid SSR/CSR mismatch from persisted (localStorage) builder state.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const isPreviewStep = step === 5

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
              <Sparkles size={13} /> FITBOX Studio
            </p>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
              Custom T-Shirt Builder
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Design your own. Upload art, generate with AI, add text — printed in India.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-sm font-semibold transition-colors"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
          >
            <RotateCcw size={14} /> Start over
          </button>
        </div>

        {/* Stepper */}
        <div className="mb-8 rounded-[12px] p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <BuilderStepper />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
          {/* Step content */}
          <div className="order-2 lg:order-1">
            {!hydrated ? (
              <div className="h-64 animate-pulse rounded-[12px]" style={{ background: 'var(--bg-surface)' }} />
            ) : (
              <>
                {step === 1 && <StyleStep />}
                {step === 2 && <ColorStep />}
                {step === 3 && <DesignStep />}
                {step === 4 && <TextStep />}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-heading text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        Live preview
                      </h2>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Toggle Front / Back / 360°, select a layer and fine-tune it.
                      </p>
                    </div>
                    <LayerControls />
                  </div>
                )}
                {step === 6 && <SummaryStep />}
              </>
            )}

            {/* Nav buttons */}
            {hydrated && step < 6 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 1}
                  className="inline-flex h-11 items-center gap-2 rounded-[8px] px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-11 items-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-white transition-colors"
                  style={{ background: 'var(--accent)' }}
                >
                  {step === 5 ? 'Review order' : 'Continue'} <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Sticky live preview */}
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-[16px] p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                {hydrated ? (
                  <>
                    <PreviewCanvas showToggle={isPreviewStep} selectable={isPreviewStep} />
                    <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                        Live price
                      </span>
                      <span className="font-heading text-lg font-bold" style={{ color: 'var(--accent)' }}>
                        {formatPrice(price())}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="aspect-[4/5] w-full animate-pulse rounded-[12px]" style={{ background: 'var(--bg-primary)' }} />
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
