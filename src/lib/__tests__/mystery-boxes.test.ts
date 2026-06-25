import { describe, it, expect } from 'vitest'
import {
  MYSTERY_BOXES,
  MYSTERY_CATEGORIES,
  TIERS,
  getBoxesForCategory,
  getBox,
} from '@/lib/mystery-boxes'

describe('mystery boxes', () => {
  it('has one box per category × tier (4 × 3 = 12)', () => {
    expect(MYSTERY_CATEGORIES.length).toBe(4)
    expect(TIERS.length).toBe(3)
    expect(MYSTERY_BOXES.length).toBe(12)
  })

  it('getBoxesForCategory returns all three tiers', () => {
    const boxes = getBoxesForCategory('anime')
    expect(boxes.length).toBe(3)
    expect(new Set(boxes.map((b) => b.tier))).toEqual(new Set(['bronze', 'silver', 'gold']))
  })

  it('tier prices (INR paise) are correct and ascending', () => {
    expect(getBox('anime', 'bronze')?.price).toBe(79900)
    expect(getBox('anime', 'silver')?.price).toBe(149900)
    expect(getBox('anime', 'gold')?.price).toBe(249900)
  })

  it('every box advertises a value greater than its price', () => {
    for (const b of MYSTERY_BOXES) expect(b.estValue).toBeGreaterThan(b.price)
  })

  it('getBox returns undefined for unknown combos', () => {
    // @ts-expect-error invalid tier on purpose
    expect(getBox('anime', 'platinum')).toBeUndefined()
  })
})
