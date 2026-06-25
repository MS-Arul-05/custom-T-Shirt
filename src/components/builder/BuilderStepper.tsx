'use client'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/store/builder'

const STEPS = [
  { n: 1, label: 'Style' },
  { n: 2, label: 'Color' },
  { n: 3, label: 'Design' },
  { n: 4, label: 'Text' },
  { n: 5, label: 'Preview' },
  { n: 6, label: 'Checkout' },
] as const

export default function BuilderStepper() {
  const step = useBuilderStore((s) => s.step)
  const setStep = useBuilderStore((s) => s.setStep)

  return (
    <nav aria-label="Builder progress" className="w-full">
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {STEPS.map((s, i) => {
          const done = s.n < step
          const active = s.n === step
          const reachable = s.n <= step
          return (
            <li key={s.n} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => reachable && setStep(s.n)}
                disabled={!reachable}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2 group',
                  reachable ? 'cursor-pointer' : 'cursor-not-allowed'
                )}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
                  style={{
                    background: done || active ? 'var(--accent)' : 'var(--bg-surface)',
                    color: done || active ? '#fff' : 'var(--text-tertiary)',
                    border:
                      done || active
                        ? '1px solid var(--accent)'
                        : '1px solid var(--border)',
                  }}
                >
                  {done ? <Check size={15} /> : s.n}
                </span>
                <span
                  className="hidden text-xs font-semibold sm:inline"
                  style={{
                    color: active
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                  }}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className="mx-1 h-px flex-1 sm:mx-2"
                  style={{
                    background:
                      s.n < step ? 'var(--accent)' : 'var(--border)',
                  }}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
