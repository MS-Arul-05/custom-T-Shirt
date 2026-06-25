'use client'
import { Suspense, useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import type { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard'
import FilterSidebar, {
  INITIAL_FILTERS,
  COLLECTION_OPTIONS,
  type FilterState,
  type SortOption,
} from '@/components/product/FilterSidebar'

const PAGE_SIZE = 12

function effectivePrice(p: Product): number {
  return typeof p.salePrice === 'number' && p.salePrice < p.price ? p.salePrice : p.price
}

function applyFilters(list: Product[], f: FilterState): Product[] {
  return list.filter((p) => {
    if (f.categories.length > 0 && !f.categories.includes(p.category)) return false
    if (f.collections.length > 0 && !f.collections.some((c) => p.collections?.includes(c))) return false
    if (f.colors.length > 0 && !p.colors.some((c) => f.colors.includes(c.name))) return false
    if (f.sizes.length > 0) {
      const oos = p.outOfStock ?? []
      const available = p.sizes.filter((s) => !oos.includes(s))
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

function ShopContent() {
  const params = useSearchParams()
  const urlCategory = params.get('category')
  const urlCollection = params.get('collection')
  const urlSort = params.get('sort') as SortOption | null

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [sort, setSort] = useState<SortOption>('newest')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sync URL params into filter/sort state.
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: urlCategory ? [urlCategory] : [],
      collections: urlCollection ? [urlCollection] : [],
    }))
    setVisibleCount(PAGE_SIZE)
  }, [urlCategory, urlCollection])

  useEffect(() => {
    if (urlSort) setSort(urlSort)
  }, [urlSort])

  const filtered = useMemo(() => sortProducts(applyFilters(PRODUCTS, filters), sort), [filters, sort])
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Heading reflects active category/collection.
  const activeCategory = CATEGORIES.find((c) => c.slug === (filters.categories[0] ?? ''))
  const activeCollection = COLLECTION_OPTIONS.find((c) => c.slug === (filters.collections[0] ?? ''))
  let heading = 'Shop All'
  if (filters.categories.length === 1 && activeCategory) heading = activeCategory.name
  else if (filters.collections.length === 1 && activeCollection) heading = `${activeCollection.name} Collection`

  const resetFilters = () => { setFilters(INITIAL_FILTERS); setVisibleCount(PAGE_SIZE) }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {heading}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 h-9 px-4 text-sm font-medium border rounded-[8px] self-start"
          style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort" className="text-sm shrink-0" style={{ color: 'var(--text-secondary)' }}>Sort by</label>
          <select
            id="sort"
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
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-[220px] flex-shrink-0">
          <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setVisibleCount(PAGE_SIZE) }} />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-[300px] h-full overflow-y-auto px-6 py-8" style={{ background: 'var(--bg-primary)' }}>
              <div className="flex items-center justify-between mb-6">
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Filters</p>
                <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                  <X size={18} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setVisibleCount(PAGE_SIZE) }} />
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="mt-6 w-full h-11 rounded-[8px] text-white text-sm font-semibold"
                style={{ background: 'var(--accent)' }}
              >
                View {filtered.length} products
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="py-20 text-center" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-lg mb-3">No products match your filters.</p>
              <button type="button" onClick={resetFilters} className="text-sm font-medium underline" style={{ color: 'var(--accent)' }}>
                Clear all filters
              </button>
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
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-surface)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-[1280px] mx-auto px-4 py-20 text-sm" style={{ color: 'var(--text-secondary)' }}>Loading…</div>}>
      <ShopContent />
    </Suspense>
  )
}
