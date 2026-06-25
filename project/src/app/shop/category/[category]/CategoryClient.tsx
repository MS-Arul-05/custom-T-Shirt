'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import type { Product, CategorySlug } from '@/types'
import ProductCard from '@/components/product/ProductCard'
import FilterSidebar, {
  INITIAL_FILTERS,
  type FilterState,
  type SortOption,
} from '@/components/product/FilterSidebar'

const PAGE_SIZE = 12

function effectivePrice(p: Product): number {
  return typeof p.salePrice === 'number' && p.salePrice < p.price ? p.salePrice : p.price
}

function applyFilters(list: Product[], f: FilterState): Product[] {
  return list.filter((p) => {
    if (f.collections.length > 0 && !f.collections.some((c) => p.collections?.includes(c))) return false
    if (f.colors.length > 0 && !p.colors.some((c) => f.colors.includes(c.name))) return false
    if (f.sizes.length > 0) {
      const oos = new Set(p.outOfStock ?? [])
      const available = p.sizes.filter((s) => !oos.has(s))
      if (!f.sizes.some((s) => available.includes(s))) return false
    }
    if (f.fits.length > 0 && !f.fits.includes(p.fit)) return false
    if (effectivePrice(p) > f.priceMax) return false
    return true
  })
}

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const arr = [...list]
  switch (sort) {
    case 'price-asc':
      return arr.sort((a, b) => effectivePrice(a) - effectivePrice(b))
    case 'price-desc':
      return arr.sort((a, b) => effectivePrice(b) - effectivePrice(a))
    case 'bestsellers':
      return arr.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    case 'newest':
    default:
      return arr.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
  }
}

interface Props {
  category: CategorySlug
  categoryName: string
}

export default function CategoryClient({ category, categoryName }: Readonly<Props>) {
  const inCategory = useMemo(() => PRODUCTS.filter((p) => p.category === category), [category])
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [sort, setSort] = useState<SortOption>('newest')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => sortProducts(applyFilters(inCategory, filters), sort), [inCategory, filters, sort])
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:underline">Shop</Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--text-primary)' }}>{categoryName}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{categoryName}</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-8 pb-4 border-b justify-end" style={{ borderColor: 'var(--border)' }}>
        <label htmlFor="cat-sort" className="text-sm shrink-0" style={{ color: 'var(--text-secondary)' }}>Sort by</label>
        <select
          id="cat-sort"
          value={sort}
          onChange={(e) => { setSort(e.target.value as SortOption); setVisibleCount(PAGE_SIZE) }}
          className="h-9 px-3 rounded-[8px] border text-sm focus:outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="bestsellers">Bestsellers</option>
        </select>
      </div>

      <div className="flex gap-10">
        <div className="hidden lg:block w-[220px] flex-shrink-0">
          <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setVisibleCount(PAGE_SIZE) }} />
        </div>

        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="py-20 text-center" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-lg mb-3">No products in this category match your filters.</p>
              <Link href="/shop" className="text-sm font-medium underline" style={{ color: 'var(--accent)' }}>
                Browse all products
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="h-11 px-10 rounded-[8px] border text-sm font-semibold transition-colors"
                    style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
                  >
                    Load more ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
