import { describe, it, expect } from 'vitest'
import { COLLECTIONS, getCollectionBySlug, getFeaturedCollections } from '@/lib/collections'
import { getProductBySlug } from '@/lib/products'

describe('collections', () => {
  it('only contains populated collections', () => {
    expect(COLLECTIONS.length).toBe(4)
    expect(new Set(COLLECTIONS.map((c) => c.slug))).toEqual(
      new Set(['streetwear', 'creator', 'gym', 'college'])
    )
  })

  it('every collection has at least one product, and those products exist', () => {
    for (const c of COLLECTIONS) {
      expect(c.productSlugs.length).toBeGreaterThan(0)
      for (const slug of c.productSlugs) {
        expect(getProductBySlug(slug)).toBeDefined()
      }
    }
  })

  it('getCollectionBySlug resolves known slugs and rejects removed ones', () => {
    expect(getCollectionBySlug('streetwear')?.name).toMatch(/streetwear/i)
    expect(getCollectionBySlug('anime')).toBeUndefined()
    expect(getCollectionBySlug('startup')).toBeUndefined()
  })

  it('getFeaturedCollections never returns more than asked and all are real', () => {
    const featured = getFeaturedCollections(4)
    expect(featured.length).toBe(4)
    featured.forEach((c) => expect(c.productSlugs.length).toBeGreaterThan(0))
  })
})
