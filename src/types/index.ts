// ============================================================================
// FITBOX shared types. Prices are ALWAYS integer INR paise (₹1 = 100 paise).
// ============================================================================

export type CategorySlug =
  | 'oversized-t-shirts'
  | 'regular-fit-t-shirts'
  | 'graphic-tees'
  | 'anime-collection'
  | 'streetwear-collection'
  | 'hoodies'
  | 'sweatshirts'
  | 'polo-shirts'
  | 'crop-tops'
  | 'jackets'
  | 'accessories'

export type BadgeType = 'new' | 'bestseller' | 'drop' | 'restock'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: CategorySlug
  collections?: string[] // collection slugs, e.g. ['anime', 'streetwear']
  price: number // INR paise
  salePrice?: number | null // INR paise
  description: string
  fabric: string // e.g. "240 GSM combed cotton"
  fabricDetail?: string
  gsm?: number
  fit: 'oversized' | 'regular' | 'hoodie' | 'polo' | 'crop' | 'jacket' | 'accessory'
  origin: string // e.g. "Designed & printed in India"
  images: string[] // [0]=primary, [1]=hover, ...
  colors: ProductColor[]
  sizes: string[] // XS..XXXL
  outOfStock?: string[] // size labels out of stock
  inStock: boolean
  rating?: number // 0..5
  reviewCount?: number
  isNewArrival: boolean
  isBestseller: boolean
  isDrop?: boolean // limited edition drop
  designer?: string | null // community designer name, null = FITBOX house
  badge?: BadgeType
}

// ----------------------------------------------------------------------------
// Cart
// ----------------------------------------------------------------------------

export type CartItemKind = 'product' | 'custom' | 'mystery_box'

export interface CartItem {
  /** uniqueness key: for products `${productId}|${size}|${color}`,
   *  for custom designs `custom|${customDesignId}`,
   *  for mystery boxes `mb|${mysteryBoxId}` */
  key: string
  kind: CartItemKind
  productId: string
  name: string
  price: number // INR paise
  size: string
  color: string
  quantity: number
  image: string
}

// ----------------------------------------------------------------------------
// Collections
// ----------------------------------------------------------------------------

export interface Collection {
  slug: string
  name: string
  tagline: string
  description: string
  heroImage: string
  productSlugs: string[]
  accent?: string // optional collection accent hex
}

// ----------------------------------------------------------------------------
// Custom T-Shirt Builder
// ----------------------------------------------------------------------------

export type BuilderStyle = 'oversized' | 'regular' | 'hoodie' | 'polo'
export type LayerType = 'image' | 'logo' | 'text' | 'ai'
export type LayerSide = 'front' | 'back'

export interface BuilderBaseStyle {
  id: BuilderStyle
  name: string
  basePrice: number // INR paise
  mockupFront: string
  mockupBack: string
}

export interface BuilderColor {
  name: string
  hex: string
}

export interface DesignLayer {
  id: string
  side: LayerSide
  type: LayerType
  assetUrl?: string // image/logo/ai
  text?: string
  font?: string
  textColor?: string
  align?: 'left' | 'center' | 'right'
  x: number // 0..1 relative to canvas
  y: number // 0..1 relative to canvas
  scale: number
  rotation: number
  z: number
}

export interface DesignTemplate {
  id: string
  name: string
  category: 'anime' | 'typography' | 'streetwear' | 'minimal'
  url: string
}

export type AiStyle = 'anime' | 'typography' | 'streetwear' | 'minimal'

// ----------------------------------------------------------------------------
// Mystery Box
// ----------------------------------------------------------------------------

export type MysteryCategory = 'anime' | 'streetwear' | 'gym' | 'creator'
export type MysteryTier = 'bronze' | 'silver' | 'gold'

export interface MysteryBox {
  id: string
  category: MysteryCategory
  tier: MysteryTier
  price: number // INR paise
  itemCount: number
  estValue: number // INR paise — typical retail value inside
  blurb: string
}

// ----------------------------------------------------------------------------
// Reviews
// ----------------------------------------------------------------------------

export interface Review {
  id: string
  productSlug: string
  author: string
  rating: number // 1..5
  title?: string
  body: string
  date: string
  verified: boolean
}
