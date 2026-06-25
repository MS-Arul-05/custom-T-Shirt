import { describe, it, expect } from 'vitest'
import {
  BASE_STYLES,
  BUILDER_COLORS,
  AI_STYLES,
  DESIGN_TEMPLATES,
  mockGenerateAiDesigns,
} from '@/lib/builder'

describe('builder config', () => {
  it('offers 4 base styles (oversized/regular/hoodie/polo)', () => {
    expect(BASE_STYLES.length).toBe(4)
    expect(new Set(BASE_STYLES.map((s) => s.id))).toEqual(
      new Set(['oversized', 'regular', 'hoodie', 'polo'])
    )
    BASE_STYLES.forEach((s) => expect(s.basePrice).toBeGreaterThan(0))
  })

  it('offers the 6 builder colors', () => {
    expect(BUILDER_COLORS.map((c) => c.name)).toEqual([
      'White',
      'Black',
      'Beige',
      'Blue',
      'Green',
      'Red',
    ])
  })

  it('offers the 4 AI styles', () => {
    expect(new Set(AI_STYLES.map((s) => s.id))).toEqual(
      new Set(['anime', 'typography', 'streetwear', 'minimal'])
    )
  })

  it('has design templates with valid categories', () => {
    expect(DESIGN_TEMPLATES.length).toBeGreaterThan(0)
    const cats = new Set(['anime', 'typography', 'streetwear', 'minimal'])
    DESIGN_TEMPLATES.forEach((t) => expect(cats.has(t.category)).toBe(true))
  })
})

describe('mockGenerateAiDesigns', () => {
  it('resolves to the requested number of image URLs', async () => {
    const urls = await mockGenerateAiDesigns('samurai cat', 'anime', 4)
    expect(urls).toHaveLength(4)
    urls.forEach((u) => expect(typeof u).toBe('string'))
  })

  it('defaults to 4 results', async () => {
    const urls = await mockGenerateAiDesigns('bold type', 'typography')
    expect(urls).toHaveLength(4)
  })
})
