'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Check, RotateCcw, ShoppingBag } from 'lucide-react'
import type { Product, MysteryBox, MysteryCategory, MysteryTier } from '@/types'
import { MYSTERY_CATEGORIES, TIERS, getBoxesForCategory } from '@/lib/mystery-boxes'
import { getProductsByCollection, PRODUCTS } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import BoxPicker from './BoxPicker'
import UnboxReveal from './UnboxReveal'
import WearTheFit from './WearTheFit'

interface Props {
  category: MysteryCategory
}

type Step = 'select' | 'unbox' | 'wear'

const STEP_LABELS: { id: Step; label: string }[] = [
  { id: 'select', label: 'Select box' },
  { id: 'unbox', label: 'Unbox' },
  { id: 'wear', label: 'Wear the fit' },
]

// Category -> collection slug used to source the surprise items.
const CATEGORY_COLLECTION: Record<MysteryCategory, string> = {
  anime: 'anime',
  streetwear: 'streetwear',
  gym: 'gym',
  creator: 'creator',
}

const tierName = (tier: MysteryTier) =>
  TIERS.find((t) => t.tier === tier)?.name ?? tier
const tierAccent = (tier: MysteryTier) =>
  TIERS.find((t) => t.tier === tier)?.accent ?? 'var(--accent)'

const WEAR_LINES = [
  'Certified drip. Wear it like you planned the whole fit.',
  'The algorithm chose violence and great taste.',
  'Fresh out the box and already the main character.',
  'Surprise unlocked. Now go ruin everyone else’s fit check.',
]

/** Deterministic-ish shuffle + pick of N items from a pool. */
function pickItems(pool: Product[], n: number): Product[] {
  const source = pool.length > 0 ? pool : PRODUCTS
  const shuffled = [...source].sort(() => Math.random() - 0.5)
  if (shuffled.length === 0) return []
  const out: Product[] = []
  for (let i = 0; i < n; i++) {
    out.push(shuffled[i % shuffled.length])
  }
  return out
}

export default function MysteryBoxExperience({ category }: Props) {
  const reduce = useReducedMotion()
  const addItem = useCartStore((s) => s.addItem)

  const meta = MYSTERY_CATEGORIES.find((c) => c.slug === category)
  const categoryName = meta?.name ?? category
  const categoryImage = meta?.image ?? PRODUCTS[0]?.images[0] ?? ''
  const boxes = useMemo(() => getBoxesForCategory(category), [category])

  const [step, setStep] = useState<Step>('select')
  const [box, setBox] = useState<MysteryBox | null>(null)
  const [items, setItems] = useState<Product[]>([])
  const [revealed, setRevealed] = useState(false)
  const [added, setAdded] = useState(false)

  const pool = useMemo(
    () => getProductsByCollection(CATEGORY_COLLECTION[category]),
    [category]
  )

  const openBox = (chosen: MysteryBox) => {
    setBox(chosen)
    setItems(pickItems(pool, chosen.itemCount))
    setRevealed(false)
    setAdded(false)
    setStep('unbox')
  }

  const reset = () => {
    setBox(null)
    setItems([])
    setRevealed(false)
    setAdded(false)
    setStep('select')
  }

  const handleAddToCart = () => {
    if (!box) return
    addItem({
      kind: 'mystery_box',
      productId: box.id,
      name: `${categoryName} ${tierName(box.tier)}`,
      price: box.price,
      size: '—',
      color: 'Surprise',
      image: categoryImage,
    })
    setAdded(true)
  }

  const hero = items[0]
  const accent = box ? tierAccent(box.tier) : 'var(--accent)'
  const currentIndex = STEP_LABELS.findIndex((s) => s.id === step)
  const wearLine = WEAR_LINES[items.length % WEAR_LINES.length]

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Top nav + stepper */}
      <Link
        href="/mystery-box"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={15} />
        All categories
      </Link>

      <div className="mt-4 mb-8">
        <h1
          className="font-heading text-3xl font-semibold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {categoryName} Mystery Box
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {meta?.blurb}
        </p>
      </div>

      {/* Stepper */}
      <ol className="mb-10 flex items-center gap-3">
        {STEP_LABELS.map((s, i) => {
          const done = i < currentIndex
          const active = i === currentIndex
          return (
            <li key={s.id} className="flex flex-1 items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors"
                  style={{
                    background: active || done ? 'var(--accent)' : 'var(--bg-surface)',
                    color: active || done ? '#fff' : 'var(--text-secondary)',
                    border: active || done ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {done ? <Check size={14} /> : i + 1}
                </span>
                <span
                  className="hidden text-sm font-medium sm:inline"
                  style={{
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <span
                  className="h-px flex-1"
                  style={{ background: done ? 'var(--accent)' : 'var(--border)' }}
                />
              )}
            </li>
          )
        })}
      </ol>

      <AnimatePresence mode="wait">
        {/* STEP 1 — select box */}
        {step === 'select' && (
          <motion.div
            key="select"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <BoxPicker boxes={boxes} onOpen={openBox} />
          </motion.div>
        )}

        {/* STEP 2 — unbox */}
        {step === 'unbox' && box && (
          <motion.div
            key="unbox"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? false : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UnboxReveal box={box} items={items} onRevealed={() => setRevealed(true)} />

            {revealed && (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {hero && (
                  <button
                    onClick={() => setStep('wear')}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-[8px] text-sm font-semibold text-white transition-colors sm:w-auto sm:px-7"
                    style={{ background: 'var(--accent)' }}
                  >
                    Wear the fit
                  </button>
                )}
                <button
                  onClick={reset}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-[8px] border text-sm font-semibold transition-colors sm:w-auto sm:px-7"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  <RotateCcw size={15} />
                  Open another
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 3 — wear the fit */}
        {step === 'wear' && box && hero && (
          <motion.div
            key="wear"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
          >
            <div
              className="rounded-[16px] border p-8"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <WearTheFit hero={hero} accent={accent} line={wearLine} />
            </div>

            <div>
              <h2
                className="font-heading text-2xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Your {tierName(box.tier)} fit
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                Hero piece: <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{hero.name}</span>
                {items.length > 1 && ` + ${items.length - 1} more in the box`}.
                Surprise colours, your size at checkout.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="flex h-11 items-center justify-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-white transition-colors disabled:opacity-60"
                  style={{ background: 'var(--accent)' }}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      Added to cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      Add box to cart · {formatPrice(box.price)}
                    </>
                  )}
                </button>
                <button
                  onClick={reset}
                  className="flex h-11 items-center justify-center gap-2 rounded-[8px] border px-6 text-sm font-semibold transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  <RotateCcw size={15} />
                  Open another
                </button>
              </div>

              {added && (
                <p className="mt-3 text-sm" style={{ color: 'var(--success)' }}>
                  Nice pull. Your box is in the cart — surprise stays sealed until it ships.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
