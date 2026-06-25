'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Truck, RotateCcw, MapPin } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { CATEGORIES } from '@/lib/products'
import ImageGallery from '@/components/product/ImageGallery'
import ColorSelector from '@/components/product/ColorSelector'
import SizeSelector from '@/components/product/SizeSelector'
import AddToCartButton from '@/components/product/AddToCartButton'
import RatingStars from '@/components/product/RatingStars'
import ReviewList from '@/components/product/ReviewList'
import ProductCard from '@/components/product/ProductCard'

interface Props {
  product: Product
  related: Product[]
}

function Accordion({ label, children, defaultOpen = false }: Readonly<{ label: string; children: React.ReactNode; defaultOpen?: boolean }>) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b" style={{ borderColor: 'var(--border)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-sm font-semibold text-left"
        style={{ color: 'var(--text-primary)' }}
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={16} style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>
      {open && <div className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</div>}
    </div>
  )
}

export default function ProductDetailClient({ product: p, related }: Readonly<Props>) {
  const [selectedColor, setSelectedColor] = useState(p.colors[0]?.name ?? 'Default')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const hasSale = typeof p.salePrice === 'number' && p.salePrice < p.price
  const displayPrice = hasSale ? p.salePrice! : p.price
  const categoryName = CATEGORIES.find((c) => c.slug === p.category)?.name ?? p.category

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-8 flex-wrap" style={{ color: 'var(--text-secondary)' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:underline">Shop</Link>
        <ChevronRight size={12} />
        <Link href={`/shop/category/${p.category}`} className="hover:underline">{categoryName}</Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--text-primary)' }}>{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <ImageGallery images={p.images} alt={p.name} />

        {/* Info */}
        <div>
          {p.designer && (
            <p className="text-[11px] uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--accent)' }}>
              By {p.designer}
            </p>
          )}
          <h1 className="font-heading text-3xl font-semibold leading-tight mb-3" style={{ color: 'var(--text-primary)' }}>
            {p.name}
          </h1>

          {typeof p.rating === 'number' && (
            <div className="mb-4">
              <RatingStars rating={p.rating} count={p.reviewCount} size={16} showValue />
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <p className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{formatPrice(displayPrice)}</p>
            {hasSale && (
              <>
                <p className="text-base line-through" style={{ color: 'var(--text-tertiary)' }}>{formatPrice(p.price)}</p>
                <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Sale</span>
              </>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>

          {/* Color */}
          <div className="mb-6">
            <ColorSelector colors={p.colors} selected={selectedColor} onChange={setSelectedColor} />
          </div>

          {/* Size */}
          <div className="mb-6">
            <SizeSelector
              sizes={p.sizes}
              outOfStock={p.outOfStock}
              selected={selectedSize}
              onChange={setSelectedSize}
            />
          </div>

          {/* Add to cart / Buy now */}
          <div className="mb-6">
            <AddToCartButton product={p} selectedSize={selectedSize} selectedColor={selectedColor} />
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-3 py-4 border-t border-b mb-2" style={{ borderColor: 'var(--border)' }}>
            {[
              { icon: Truck, label: 'Free shipping', sub: 'over ₹1,499' },
              { icon: RotateCcw, label: 'Easy returns', sub: '7 days' },
              { icon: MapPin, label: 'Printed', sub: 'in India' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <Icon size={16} style={{ color: 'var(--accent)' }} />
                <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* Fabric details */}
          <div className="py-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm border-b" style={{ borderColor: 'var(--border)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Fabric</span>
            <span style={{ color: 'var(--text-primary)' }}>{p.fabric}</span>
            {typeof p.gsm === 'number' && (
              <>
                <span style={{ color: 'var(--text-secondary)' }}>Weight</span>
                <span style={{ color: 'var(--text-primary)' }}>{p.gsm} GSM</span>
              </>
            )}
            <span style={{ color: 'var(--text-secondary)' }}>Fit</span>
            <span className="capitalize" style={{ color: 'var(--text-primary)' }}>{p.fit}</span>
            <span style={{ color: 'var(--text-secondary)' }}>Origin</span>
            <span style={{ color: 'var(--text-primary)' }}>{p.origin}</span>
          </div>

          {/* Accordions */}
          <div className="mt-2">
            <Accordion label="Fabric & details" defaultOpen>
              <p className="whitespace-pre-line">
                {p.fabricDetail ?? p.fabric}
                {'\n\n'}Fit: {p.fit}. {typeof p.gsm === 'number' ? `${p.gsm} GSM heavyweight feel. ` : ''}{p.origin}.
              </p>
            </Accordion>
            <Accordion label="Care">
              Machine wash cold, inside out, on a gentle cycle. Tumble dry low or line dry. Do not iron directly over prints. Wash with similar colours to keep the print sharp.
            </Accordion>
            <Accordion label="Shipping & returns">
              Free standard shipping on orders over ₹1,499 (else ₹79). Dispatched in 1–2 business days, delivered in 3–6 days across India. Easy 7-day returns on unworn items with tags. Pay via UPI, cards, or COD at checkout.
            </Accordion>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewList productSlug={p.slug} />

      {/* You may also like */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
