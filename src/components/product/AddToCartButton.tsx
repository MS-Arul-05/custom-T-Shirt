'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Loader2 } from 'lucide-react'
import type { Product } from '@/types'
import { useCartStore } from '@/store/cart'

interface Props {
  product: Product
  selectedSize: string | null
  selectedColor: string
}

export default function AddToCartButton({ product, selectedSize, selectedColor }: Readonly<Props>) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const hasSale = typeof product.salePrice === 'number' && product.salePrice < product.price
  const price = hasSale ? product.salePrice! : product.price
  const disabled = !selectedSize

  const doAdd = () => {
    if (!selectedSize) return false
    addItem({
      kind: 'product',
      productId: product.id,
      name: product.name,
      price,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
    })
    return true
  }

  const handleAdd = () => {
    if (!selectedSize) {
      setShowError(true)
      return
    }
    setShowError(false)
    setLoading(true)
    setTimeout(() => {
      doAdd() // addItem opens the drawer
      setLoading(false)
    }, 300)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowError(true)
      return
    }
    setShowError(false)
    if (doAdd()) router.push('/checkout')
  }

  return (
    <div className="space-y-2.5">
      <button
        type="button"
        onClick={handleAdd}
        disabled={loading}
        className="w-full h-12 rounded-[8px] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
        style={{ background: 'var(--accent)' }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent-hover)' }}
        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = 'var(--accent)' }}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <ShoppingBag size={16} />
            Add to cart
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleBuyNow}
        className="w-full h-12 rounded-[8px] text-sm font-semibold border transition-colors"
        style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)', background: 'transparent' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-dark)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)' }}
      >
        Buy now
      </button>

      {showError && disabled && (
        <p className="text-xs font-medium" style={{ color: 'var(--error)' }}>
          Please select a size
        </p>
      )}
    </div>
  )
}
