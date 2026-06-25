import { describe, it, expect } from 'vitest'
import { REVIEWS, getReviews, getReviewSummary, getFeaturedReviews } from '@/lib/reviews'
import { getProductBySlug } from '@/lib/products'

describe('reviews', () => {
  it('every review references an existing product (no stale slugs)', () => {
    for (const r of REVIEWS) {
      expect(getProductBySlug(r.productSlug), `review ${r.id} -> ${r.productSlug}`).toBeDefined()
    }
  })

  it('getReviews returns reviews for a product that has them', () => {
    const rs = getReviews('suriya-kaaval-karuppu-oversized-tee')
    expect(rs.length).toBe(2)
    rs.forEach((r) => expect(r.rating).toBeGreaterThanOrEqual(1))
  })

  it('getReviewSummary averages correctly', () => {
    const s = getReviewSummary('suriya-kaaval-karuppu-oversized-tee')
    expect(s.count).toBe(2)
    expect(s.avg).toBe(5)
  })

  it('getReviewSummary is empty for products with no reviews', () => {
    expect(getReviewSummary('no-such-product')).toEqual({ avg: 0, count: 0 })
  })

  it('getFeaturedReviews returns up to the limit, all 5-star', () => {
    const f = getFeaturedReviews(3)
    expect(f.length).toBeLessThanOrEqual(3)
    f.forEach((r) => expect(r.rating).toBe(5))
  })
})
