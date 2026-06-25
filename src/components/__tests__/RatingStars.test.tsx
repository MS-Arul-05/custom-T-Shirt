import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RatingStars from '@/components/product/RatingStars'

describe('RatingStars', () => {
  it('exposes an accessible "Rated X out of 5" label', () => {
    render(<RatingStars rating={4.5} />)
    expect(screen.getByLabelText('Rated 4.5 out of 5')).toBeInTheDocument()
  })

  it('renders the review count when provided', () => {
    render(<RatingStars rating={5} count={214} />)
    expect(screen.getByText('(214)')).toBeInTheDocument()
  })

  it('clamps out-of-range ratings to 0..5', () => {
    render(<RatingStars rating={9} />)
    expect(screen.getByLabelText('Rated 5 out of 5')).toBeInTheDocument()
  })

  it('shows the numeric value when showValue is set', () => {
    render(<RatingStars rating={4.8} showValue />)
    expect(screen.getByText('4.8')).toBeInTheDocument()
  })
})
