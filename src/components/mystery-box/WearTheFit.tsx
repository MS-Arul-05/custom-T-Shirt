'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '@/types'

interface Props {
  hero: Product
  /** Accent colour (tier) used for the figure backdrop. */
  accent: string
  /** Fun one-liner shown under the figure. */
  line: string
}

/**
 * A simple styled mannequin/silhouette "wearing" the revealed hero item.
 * The product image is overlaid on the torso of an SVG figure.
 */
export default function WearTheFit({ hero, accent, line }: Props) {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative mx-auto w-[220px]"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Backdrop glow */}
        <div
          className="absolute inset-x-6 bottom-6 top-2 rounded-[40%] opacity-15 blur-2xl"
          style={{ background: accent }}
          aria-hidden
        />

        {/* SVG mannequin */}
        <svg
          viewBox="0 0 200 320"
          className="relative w-full"
          role="img"
          aria-label={`Figure wearing the ${hero.name}`}
        >
          {/* head */}
          <circle cx="100" cy="40" r="26" fill="var(--text-tertiary)" opacity="0.55" />
          {/* neck */}
          <rect x="90" y="62" width="20" height="16" rx="6" fill="var(--text-tertiary)" opacity="0.55" />
          {/* legs */}
          <rect x="82" y="210" width="14" height="92" rx="7" fill="var(--text-tertiary)" opacity="0.45" />
          <rect x="104" y="210" width="14" height="92" rx="7" fill="var(--text-tertiary)" opacity="0.45" />
          {/* arms */}
          <rect x="46" y="92" width="14" height="96" rx="7" fill="var(--text-tertiary)" opacity="0.4" />
          <rect x="140" y="92" width="14" height="96" rx="7" fill="var(--text-tertiary)" opacity="0.4" />
          {/* torso plate (the garment sits here) */}
          <rect x="56" y="84" width="88" height="130" rx="14" fill={accent} opacity="0.9" />
        </svg>

        {/* Garment overlay on the torso */}
        <div className="absolute left-1/2 top-[26%] h-[42%] w-[46%] -translate-x-1/2 overflow-hidden rounded-[10px] shadow-md ring-1 ring-black/10">
          <Image
            src={hero.images[0]}
            alt={`${hero.name} worn on the figure`}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
      </motion.div>

      <p
        className="mt-4 max-w-xs text-center text-sm font-medium"
        style={{ color: 'var(--text-secondary)' }}
      >
        {line}
      </p>
    </div>
  )
}
