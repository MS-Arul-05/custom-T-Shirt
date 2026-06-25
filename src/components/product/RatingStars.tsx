import { Star, StarHalf } from 'lucide-react'

interface Props {
  /** 0–5 rating, supports halves (e.g. 4.5). */
  rating: number
  /** optional review count rendered next to the stars */
  count?: number
  size?: number
  /** show the numeric rating value (e.g. "4.8") */
  showValue?: boolean
}

const STAR_COLOR = '#FF8A00' // orange/amber

export default function RatingStars({ rating, count, size = 14, showValue = false }: Props) {
  const safe = Math.max(0, Math.min(5, rating || 0))
  const full = Math.floor(safe)
  const hasHalf = safe - full >= 0.25 && safe - full < 0.75
  const roundedUp = safe - full >= 0.75 ? 1 : 0
  const fullCount = full + roundedUp
  const halfCount = hasHalf ? 1 : 0
  const emptyCount = 5 - fullCount - halfCount

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-flex items-center"
        role="img"
        aria-label={`Rated ${safe} out of 5`}
        style={{ color: STAR_COLOR }}
      >
        {Array.from({ length: fullCount }).map((_, i) => (
          <Star key={`f${i}`} size={size} fill="currentColor" strokeWidth={0} />
        ))}
        {halfCount === 1 && (
          <span className="relative inline-flex" style={{ width: size, height: size }}>
            <Star
              size={size}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="absolute inset-0"
              style={{ opacity: 0.35 }}
            />
            <StarHalf size={size} fill="currentColor" strokeWidth={0} className="absolute inset-0" />
          </span>
        )}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <Star key={`e${i}`} size={size} fill="none" stroke="currentColor" strokeWidth={1.5} style={{ opacity: 0.35 }} />
        ))}
      </span>
      {showValue && (
        <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
          {safe.toFixed(1)}
        </span>
      )}
      {typeof count === 'number' && (
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          ({count})
        </span>
      )}
    </span>
  )
}
