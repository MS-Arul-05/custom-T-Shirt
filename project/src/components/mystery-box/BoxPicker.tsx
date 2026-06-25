'use client'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Gift, Sparkles, Check } from 'lucide-react'
import type { MysteryBox, MysteryTier } from '@/types'
import { TIERS } from '@/lib/mystery-boxes'
import { formatPrice } from '@/lib/utils'

interface Props {
  boxes: MysteryBox[]
  onOpen: (box: MysteryBox) => void
}

const tierName = (tier: MysteryTier) =>
  TIERS.find((t) => t.tier === tier)?.name ?? tier
const tierAccent = (tier: MysteryTier) =>
  TIERS.find((t) => t.tier === tier)?.accent ?? 'var(--accent)'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
}

export default function BoxPicker({ boxes, onOpen }: Props) {
  const reduce = useReducedMotion()

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {boxes.map((box, i) => {
        const accent = tierAccent(box.tier)
        const highlight = box.tier === 'gold'
        return (
          <motion.div
            key={box.id}
            custom={i}
            variants={reduce ? undefined : cardVariants}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? false : 'show'}
            className="relative flex flex-col overflow-hidden rounded-[16px] border"
            style={{
              background: 'var(--bg-surface)',
              borderColor: highlight ? accent : 'var(--border)',
              borderWidth: highlight ? 2 : 1,
            }}
          >
            {highlight && (
              <span
                className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                style={{ background: accent }}
              >
                <Sparkles size={10} />
                Best value
              </span>
            )}

            {/* Lid / accent band */}
            <div
              className="flex h-28 items-center justify-center"
              style={{ background: accent }}
            >
              <Gift size={44} className="text-white drop-shadow" strokeWidth={1.5} />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3
                className="font-heading text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {tierName(box.tier)}
              </h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {box.blurb}
              </p>

              {/* Facts */}
              <ul className="mt-4 space-y-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                <li className="flex items-center gap-2">
                  <Check size={15} style={{ color: accent }} />
                  {box.itemCount} surprise piece{box.itemCount !== 1 ? 's' : ''}
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} style={{ color: accent }} />
                  Typically worth {formatPrice(box.estValue)}
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} style={{ color: accent }} />
                  Free shipping, surprise colours
                </li>
              </ul>

              <div className="mt-5 flex items-baseline gap-2">
                <span
                  className="font-heading text-2xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {formatPrice(box.price)}
                </span>
                <span
                  className="text-xs line-through"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {formatPrice(box.estValue)}
                </span>
              </div>

              <button
                onClick={() => onOpen(box)}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-[8px] text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: accent }}
              >
                <Gift size={16} />
                Open this box
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
