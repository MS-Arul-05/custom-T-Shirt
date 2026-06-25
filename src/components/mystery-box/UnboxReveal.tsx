'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { Gift, Sparkles } from 'lucide-react'
import type { Product, MysteryBox, MysteryTier } from '@/types'
import { TIERS } from '@/lib/mystery-boxes'
import { formatPrice } from '@/lib/utils'

interface Props {
  box: MysteryBox
  items: Product[]
  /** Called once the reveal animation has finished and items are shown. */
  onRevealed?: () => void
}

const tierAccent = (tier: MysteryTier) =>
  TIERS.find((t) => t.tier === tier)?.accent ?? 'var(--accent)'

// Box shake while sealed.
const boxVariants: Variants = {
  shake: {
    rotate: [0, -4, 4, -3, 3, -2, 2, 0],
    scale: [1, 1.03, 1, 1.04, 1, 1.05, 1.08, 1.12],
    transition: { duration: 1.1, ease: 'easeInOut' },
  },
  burst: {
    scale: [1.12, 1.3, 0],
    opacity: [1, 1, 0],
    transition: { duration: 0.45, ease: 'easeIn' },
  },
}

// Confetti-ish sparks bursting outward.
const SPARKS = Array.from({ length: 12 }, (_, i) => i)

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.18, duration: 0.5, ease: 'backOut' },
  }),
}

type Phase = 'sealed' | 'bursting' | 'revealed'

export default function UnboxReveal({ box, items, onRevealed }: Props) {
  const reduce = useReducedMotion()
  const accent = tierAccent(box.tier)
  const [phase, setPhase] = useState<Phase>(reduce ? 'revealed' : 'sealed')

  useEffect(() => {
    if (reduce) {
      onRevealed?.()
      return
    }
    // shake (1.1s) -> burst (0.45s) -> reveal
    const t1 = window.setTimeout(() => setPhase('bursting'), 1100)
    const t2 = window.setTimeout(() => {
      setPhase('revealed')
      onRevealed?.()
    }, 1550)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <div className="flex flex-col items-center">
      {/* Sealed / bursting box stage */}
      <AnimatePresence>
        {phase !== 'revealed' && (
          <motion.div
            className="relative flex h-64 w-full items-center justify-center"
            exit={{ opacity: 0 }}
          >
            {/* Sparks */}
            {phase === 'bursting' &&
              SPARKS.map((s) => {
                const angle = (s / SPARKS.length) * Math.PI * 2
                const dist = 140
                return (
                  <motion.span
                    key={s}
                    className="absolute"
                    style={{ color: accent }}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      scale: 1.3,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <Sparkles size={18} fill="currentColor" />
                  </motion.span>
                )
              })}

            <motion.div
              variants={boxVariants}
              animate={phase === 'bursting' ? 'burst' : 'shake'}
              className="flex h-40 w-40 items-center justify-center rounded-[20px] shadow-lg"
              style={{ background: accent }}
            >
              <Gift size={72} className="text-white" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed items */}
      {phase === 'revealed' && (
        <div className="w-full">
          <div className="mb-5 text-center">
            <p
              className="font-heading text-2xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Surprise — you unboxed {items.length} fit{items.length !== 1 ? 's' : ''}!
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Total retail value typically {formatPrice(box.estValue)}. You paid{' '}
              {formatPrice(box.price)}.
            </p>
          </div>

          <div
            className={
              items.length === 1
                ? 'mx-auto grid max-w-xs grid-cols-1 gap-4'
                : 'grid grid-cols-2 gap-4 sm:grid-cols-3'
            }
          >
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={reduce ? undefined : itemVariants}
                initial={reduce ? false : 'hidden'}
                animate={reduce ? false : 'show'}
                className="overflow-hidden rounded-[12px] border"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                  <span
                    className="absolute left-2 top-2 rounded-[4px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                    style={{ background: accent }}
                  >
                    Pull #{i + 1}
                  </span>
                </div>
                <div className="p-3">
                  <p
                    className="truncate text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Worth {formatPrice(item.price)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
