'use client'
import { useMemo, useState } from 'react'
import { Star, BadgeCheck } from 'lucide-react'
import type { Review } from '@/types'
import { getReviews } from '@/lib/reviews'
import RatingStars from './RatingStars'

interface Props {
  productSlug: string
}

export default function ReviewList({ productSlug }: Readonly<Props>) {
  const seed = useMemo(() => getReviews(productSlug), [productSlug])
  const [local, setLocal] = useState<Review[]>([])

  const reviews = useMemo(() => [...local, ...seed], [local, seed])
  const avg = reviews.length > 0 ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10 : 0

  // form state
  const [open, setOpen] = useState(false)
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !body.trim()) return
    const review: Review = {
      id: `local-${Date.now()}`,
      productSlug,
      author: author.trim(),
      rating,
      title: title.trim() || undefined,
      body: body.trim(),
      date: new Date().toISOString().slice(0, 10),
      verified: false,
    }
    setLocal((prev) => [review, ...prev])
    setAuthor(''); setRating(5); setTitle(''); setBody(''); setOpen(false)
  }

  return (
    <section className="mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Reviews
          </h2>
          {reviews.length > 0 ? (
            <div className="flex items-center gap-3">
              <RatingStars rating={avg} size={16} showValue />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No reviews yet — be the first.</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="h-11 px-6 rounded-[8px] text-sm font-semibold border self-start transition-colors"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'transparent' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          {open ? 'Cancel' : 'Write a review'}
        </button>
      </div>

      {/* Write-a-review form (client-side only) */}
      {open && (
        <form
          onSubmit={submit}
          className="mb-10 p-6 rounded-[16px] space-y-4"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div>
            <span className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Your rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? 's' : ''}`}>
                  <Star
                    size={22}
                    fill={n <= rating ? 'currentColor' : 'none'}
                    strokeWidth={n <= rating ? 0 : 1.5}
                    style={{ color: n <= rating ? '#FF8A00' : 'var(--text-tertiary)' }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="h-11 px-3 rounded-[8px] border text-sm focus:outline-none"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className="h-11 px-3 rounded-[8px] border text-sm focus:outline-none"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell others about the fit, fabric, and print quality…"
            rows={4}
            className="w-full px-3 py-2.5 rounded-[8px] border text-sm focus:outline-none resize-y"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-[8px] text-white text-sm font-semibold transition-colors"
            style={{ background: 'var(--accent)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)' }}
          >
            Submit review
          </button>
        </form>
      )}

      {/* Review list */}
      <div className="space-y-6">
        {reviews.map((r) => (
          <div key={r.id} className="pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.author}</span>
                {r.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: 'var(--success)' }}>
                    <BadgeCheck size={13} /> Verified
                  </span>
                )}
              </div>
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{r.date}</span>
            </div>
            <RatingStars rating={r.rating} size={13} />
            {r.title && (
              <p className="text-sm font-semibold mt-2" style={{ color: 'var(--text-primary)' }}>{r.title}</p>
            )}
            <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
