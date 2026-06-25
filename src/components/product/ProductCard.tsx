'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Plus } from 'lucide-react'
import type { Product, BadgeType } from '@/types'
import { formatPrice, sortSizes } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import RatingStars from './RatingStars'

interface Props {
  product: Product
}

const BADGE_STYLES: Record<BadgeType, { label: string; bg: string; color: string }> = {
  new: { label: 'New', bg: 'var(--accent)', color: '#fff' },
  bestseller: { label: 'Bestseller', bg: 'var(--accent-light)', color: 'var(--accent)' },
  drop: { label: 'Drop', bg: 'var(--bg-dark)', color: '#fff' },
  restock: { label: 'Restock', bg: 'var(--accent-light)', color: 'var(--accent)' },
}

function resolveBadge(product: Product): BadgeType | null {
  if (product.badge) return product.badge
  if (product.isNewArrival) return 'new'
  if (product.isBestseller) return 'bestseller'
  if (product.isDrop) return 'drop'
  return null
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [wished, setWished] = useState(false)
  const [hovered, setHovered] = useState(false)

  const hasSale = typeof product.salePrice === 'number' && product.salePrice < product.price
  const displayPrice = hasSale ? product.salePrice! : product.price
  const badge = resolveBadge(product)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const oos = product.outOfStock ?? []
    const size = sortSizes(product.sizes).find((s) => !oos.includes(s)) ?? product.sizes[0]
    addItem({
      kind: 'product',
      productId: product.id,
      name: product.name,
      price: displayPrice,
      size,
      color: product.colors[0]?.name ?? 'Default',
      image: product.images[0],
    })
  }

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault()
    setWished((w) => !w)
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-[12px]"
        style={{ background: 'var(--bg-surface)' }}
      >
        <Image
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-2 transition-opacity duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge top-left */}
        {badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-[4px]"
            style={{ background: BADGE_STYLES[badge].bg, color: BADGE_STYLES[badge].color }}
          >
            {BADGE_STYLES[badge].label}
          </span>
        )}

        {/* Wishlist top-right */}
        <button
          type="button"
          onClick={handleWish}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: wished ? 'var(--accent)' : 'var(--text-secondary)',
          }}
        >
          <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Quick-add on hover */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 h-10 rounded-[8px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5"
          style={{ background: 'var(--accent)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-hover)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)' }}
        >
          <Plus size={16} />
          Quick add
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1.5">
        {product.designer && (
          <p className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: 'var(--accent)' }}>
            By {product.designer}
          </p>
        )}
        <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
          {product.name}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {product.fabric}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {formatPrice(displayPrice)}
          </p>
          {hasSale && (
            <>
              <p className="text-xs line-through" style={{ color: 'var(--text-tertiary)' }}>
                {formatPrice(product.price)}
              </p>
              <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                Sale
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        {typeof product.rating === 'number' && (
          <RatingStars rating={product.rating} count={product.reviewCount} size={13} />
        )}

        {/* Color swatches */}
        <div className="flex items-center gap-1 pt-0.5">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-3.5 h-3.5 rounded-full"
              style={{ background: c.hex, border: '1px solid rgba(0,0,0,0.12)' }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
              +{product.colors.length - 5}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
