import { describe, it, expect } from 'vitest'
import {
  PRODUCTS,
  CATEGORIES,
  getProductBySlug,
  getProductsByCategory,
  getProductsByCollection,
  getBestsellers,
  getNewArrivals,
  getDrops,
  getTrending,
  getRelated,
} from '@/lib/products'

describe('catalog data', () => {
  it('has 9 real products', () => {
    expect(PRODUCTS).toHaveLength(9)
  })

  it('every product has a unique slug and id', () => {
    expect(new Set(PRODUCTS.map((p) => p.slug)).size).toBe(PRODUCTS.length)
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(PRODUCTS.length)
  })

  it('every product image is a local /products/ asset', () => {
    for (const p of PRODUCTS) {
      expect(p.images.length).toBeGreaterThan(0)
      for (const src of p.images) expect(src.startsWith('/products/')).toBe(true)
    }
  })

  it('every product category is a known category slug', () => {
    const known = new Set(CATEGORIES.map((c) => c.slug))
    for (const p of PRODUCTS) expect(known.has(p.category)).toBe(true)
  })
})

describe('price buckets (INR paise)', () => {
  it('hoodies are ₹500', () => {
    const hoodies = getProductsByCategory('hoodies')
    expect(hoodies.length).toBeGreaterThan(0)
    hoodies.forEach((p) => expect(p.price).toBe(50000))
  })
  it('oversized tees are ₹400', () => {
    getProductsByCategory('oversized-t-shirts').forEach((p) => expect(p.price).toBe(40000))
  })
  it('regular fit tees are ₹300', () => {
    getProductsByCategory('regular-fit-t-shirts').forEach((p) => expect(p.price).toBe(30000))
  })
  it('polos are ₹350', () => {
    getProductsByCategory('polo-shirts').forEach((p) => expect(p.price).toBe(35000))
  })
})

describe('selectors', () => {
  it('getProductBySlug returns the right product or undefined', () => {
    expect(getProductBySlug('24h-series-racing-polo')?.category).toBe('polo-shirts')
    expect(getProductBySlug('does-not-exist')).toBeUndefined()
  })

  it('getDrops returns the limited-edition hoodies', () => {
    const drops = getDrops()
    expect(drops.length).toBe(2)
    drops.forEach((p) => expect(p.isDrop).toBe(true))
  })

  it('getBestsellers and getNewArrivals are non-empty', () => {
    expect(getBestsellers().length).toBeGreaterThan(0)
    expect(getNewArrivals().length).toBeGreaterThan(0)
  })

  it('getTrending de-duplicates and respects the limit', () => {
    const t = getTrending(5)
    expect(t.length).toBeLessThanOrEqual(5)
    expect(new Set(t.map((p) => p.id)).size).toBe(t.length)
  })

  it('getRelated excludes the product itself and returns up to the limit', () => {
    const related = getRelated('suriya-kaaval-karuppu-oversized-tee', 4)
    expect(related.length).toBe(4)
    expect(related.some((p) => p.slug === 'suriya-kaaval-karuppu-oversized-tee')).toBe(false)
  })

  it('getProductsByCollection works for populated collections and is empty for removed ones', () => {
    expect(getProductsByCollection('streetwear').length).toBeGreaterThan(0)
    expect(getProductsByCollection('anime')).toEqual([])
  })
})
