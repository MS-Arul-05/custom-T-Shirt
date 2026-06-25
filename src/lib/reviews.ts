import type { Review } from '@/types'

// Reviews reference current product slugs (see src/lib/products.ts).
export const REVIEWS: Review[] = [
  { id: 'r1', productSlug: 'suriya-kaaval-karuppu-oversized-tee', author: 'Aarav M.', rating: 5, title: 'Print is insane', body: 'The back Kaaval Karuppu artwork quality is unreal and the fabric is proper heavyweight. True oversized fit — size down if you want it less boxy.', date: '2026-05-02', verified: true },
  { id: 'r2', productSlug: 'suriya-kaaval-karuppu-oversized-tee', author: 'Sneha R.', rating: 5, title: 'My new favourite', body: 'Washed it 4 times, zero fade. Worth every rupee.', date: '2026-04-18', verified: true },
  { id: 'r3', productSlug: 'karppu-oversized-tee', author: 'Kabir S.', rating: 4, body: 'Love the full-back print but XL ran a little large for me. Still a 9/10.', date: '2026-03-30', verified: true },
  { id: 'r4', productSlug: 'ajith-kumar-racing-hoodie-black', author: 'Ishaan T.', rating: 5, title: 'Heavyweight done right', body: '380 GSM is no joke. Warm, structured, and the racing livery print is clean. Proper limited-edition feel.', date: '2026-05-11', verified: true },
  { id: 'r5', productSlug: 'ajith-kumar-racing-hoodie-white', author: 'Diya P.', rating: 5, body: 'The white colourway is gorgeous in person and the back AJITH graphic pops. Fits relaxed as expected.', date: '2026-04-22', verified: true },
  { id: 'r6', productSlug: 'karuppu-god-mode-tee', author: 'Rohit K.', rating: 4, title: 'Great everyday tee', body: 'Soft cotton, true-to-size regular fit, and the God Mode front graphic is fire. Wish it came in more colours.', date: '2026-05-06', verified: true },
  { id: 'r7', productSlug: '24h-series-racing-polo', author: 'Meera J.', rating: 5, body: 'The red 24H polo is a head-turner — all the sponsor prints look crisp. Got compliments all day.', date: '2026-05-01', verified: true },
  { id: 'r8', productSlug: 'ajith-kumar-racing-mk-oversized-tee', author: 'Arjun V.', rating: 5, title: 'Clean MK drop', body: 'Best white oversized tee I have found in India. Heavyweight, boxy, and the MK back graphic is sharp.', date: '2026-04-09', verified: true },
]

export function getReviews(productSlug: string): Review[] {
  return REVIEWS.filter((r) => r.productSlug === productSlug)
}

export function getReviewSummary(productSlug: string): { avg: number; count: number } {
  const rs = getReviews(productSlug)
  if (rs.length === 0) return { avg: 0, count: 0 }
  const avg = rs.reduce((s, r) => s + r.rating, 0) / rs.length
  return { avg: Math.round(avg * 10) / 10, count: rs.length }
}

/** A few highlighted reviews for the homepage social-proof section. */
export function getFeaturedReviews(limit = 3): Review[] {
  return REVIEWS.filter((r) => r.rating === 5).slice(0, limit)
}
