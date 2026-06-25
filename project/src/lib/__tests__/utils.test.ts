import { describe, it, expect } from 'vitest'
import {
  formatPrice,
  cn,
  slugify,
  shippingFor,
  sortSizes,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
  SIZE_ORDER,
} from '@/lib/utils'

describe('formatPrice (INR paise)', () => {
  it('formats whole-rupee paise with no decimals', () => {
    expect(formatPrice(50000)).toBe('₹500')
    expect(formatPrice(40000)).toBe('₹400')
    expect(formatPrice(30000)).toBe('₹300')
    expect(formatPrice(35000)).toBe('₹350')
  })

  it('adds Indian thousands grouping', () => {
    expect(formatPrice(149900)).toBe('₹1,499')
    expect(formatPrice(249900)).toBe('₹2,499')
  })

  it('shows paise as decimals only when not a whole rupee', () => {
    expect(formatPrice(49950)).toBe('₹499.50')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('₹0')
  })
})

describe('shippingFor', () => {
  it('is free at or above the ₹1499 threshold', () => {
    expect(shippingFor(FREE_SHIPPING_THRESHOLD)).toBe(0)
    expect(shippingFor(FREE_SHIPPING_THRESHOLD + 1)).toBe(0)
    expect(shippingFor(200000)).toBe(0)
  })

  it('charges standard shipping below the threshold', () => {
    expect(shippingFor(FREE_SHIPPING_THRESHOLD - 1)).toBe(STANDARD_SHIPPING)
    expect(shippingFor(0)).toBe(STANDARD_SHIPPING)
    expect(STANDARD_SHIPPING).toBe(7900)
    expect(FREE_SHIPPING_THRESHOLD).toBe(149900)
  })
})

describe('sortSizes', () => {
  it('orders apparel sizes XS→XXXL regardless of input order', () => {
    expect(sortSizes(['L', 'XS', 'XXXL', 'M', 'S'])).toEqual(['XS', 'S', 'M', 'L', 'XXXL'])
  })

  it('does not mutate the input array', () => {
    const input = ['L', 'XS']
    sortSizes(input)
    expect(input).toEqual(['L', 'XS'])
  })

  it('exposes the canonical size order', () => {
    expect(SIZE_ORDER).toEqual(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'])
  })
})

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World!')).toBe('hello-world')
    expect(slugify('  Akatsuki  Oversized  Tee  ')).toBe('akatsuki-oversized-tee')
    expect(slugify('24H Series Racing Polo')).toBe('24h-series-racing-polo')
  })
})

describe('cn', () => {
  it('joins truthy class names and drops falsy ones', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
    expect(cn('only')).toBe('only')
  })
})
