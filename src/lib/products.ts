import type { Product, CategorySlug } from '@/types'

// All prices are INR paise (₹1 = 100 paise).
// Product photos are real merch shots in /public/products (each shows front + back).

export const CATEGORIES: { slug: CategorySlug; name: string }[] = [
  { slug: 'oversized-t-shirts', name: 'Oversized T-Shirts' },
  { slug: 'regular-fit-t-shirts', name: 'Regular Fit T-Shirts' },
  { slug: 'graphic-tees', name: 'Graphic Tees' },
  { slug: 'anime-collection', name: 'Anime Collection' },
  { slug: 'streetwear-collection', name: 'Streetwear Collection' },
  { slug: 'hoodies', name: 'Hoodies' },
  { slug: 'sweatshirts', name: 'Sweatshirts' },
  { slug: 'polo-shirts', name: 'Polo Shirts' },
  { slug: 'crop-tops', name: 'Crop Tops' },
  { slug: 'jackets', name: 'Jackets' },
  { slug: 'accessories', name: 'Accessories' },
]

const TEE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// Price buckets (paise)
const PRICE_HOODIE = 50000 // ₹500
const PRICE_OVERSIZED = 40000 // ₹400
const PRICE_REGULAR = 30000 // ₹300
const PRICE_POLO = 35000 // ₹350

export const PRODUCTS: Product[] = [
  // ---------------- Oversized Tees (₹400) ----------------
  {
    id: 'p01',
    slug: 'suriya-kaaval-karuppu-oversized-tee',
    name: 'Suriya · Kaaval Karuppu Oversized Tee',
    category: 'oversized-t-shirts',
    collections: ['streetwear'],
    price: PRICE_OVERSIZED,
    salePrice: null,
    description:
      'Official-style Suriya "Kaaval Karuppu" oversized tee. Front "SURIYA" fire logo, full-back Kaaval Karuppu artwork. Heavyweight drop-shoulder boxy fit on premium combed cotton.',
    fabric: '240 GSM combed cotton',
    fabricDetail: 'Bio-washed 100% combed cotton, pre-shrunk, boxy oversized cut.',
    gsm: 240,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: ['/products/tee-suriya-kaaval-karuppu.jpeg'],
    colors: [{ name: 'Jet Black', hex: '#1A1A1A' }],
    sizes: TEE_SIZES,
    outOfStock: ['XS'],
    inStock: true,
    rating: 4.8,
    reviewCount: 96,
    isNewArrival: true,
    isBestseller: false,
    designer: null,
    badge: 'new',
  },
  {
    id: 'p02',
    slug: 'karppu-oversized-tee',
    name: 'Karppu Oversized Tee',
    category: 'oversized-t-shirts',
    collections: ['streetwear'],
    price: PRICE_OVERSIZED,
    salePrice: null,
    description:
      'Minimal "Karppu" front script with a bold full-back movie scene print. Heavyweight 240 GSM oversized tee with a relaxed drop-shoulder silhouette.',
    fabric: '240 GSM combed cotton',
    fabricDetail: 'Heavyweight 100% combed cotton, oversized boxy fit.',
    gsm: 240,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: ['/products/tee-karppu-black.jpeg'],
    colors: [{ name: 'Jet Black', hex: '#1A1A1A' }],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.7,
    reviewCount: 134,
    isNewArrival: true,
    isBestseller: true,
    designer: null,
    badge: 'bestseller',
  },
  {
    id: 'p03',
    slug: 'ajith-kumar-racing-mk-oversized-tee',
    name: "Ajith Kumar Racing 'MK' Oversized Tee",
    category: 'oversized-t-shirts',
    collections: ['streetwear', 'creator'],
    price: PRICE_OVERSIZED,
    salePrice: null,
    description:
      'Ajith Kumar Racing oversized tee in clean white. Front "AK Racing" line logo, full-back "MK" race-team graphic. Premium 240 GSM heavyweight cotton, boxy fit.',
    fabric: '240 GSM combed cotton',
    fabricDetail: 'Heavyweight 100% combed cotton, oversized drop-shoulder cut.',
    gsm: 240,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: ['/products/tee-ajith-mk-white.jpeg'],
    colors: [{ name: 'Off White', hex: '#FFFFFF' }],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.6,
    reviewCount: 71,
    isNewArrival: false,
    isBestseller: true,
    designer: null,
    badge: 'bestseller',
  },

  // ---------------- Regular Fit Tees (₹300) ----------------
  {
    id: 'p04',
    slug: 'karuppu-god-mode-tee',
    name: 'Karuppu · God Mode Tee',
    category: 'regular-fit-t-shirts',
    collections: ['gym', 'streetwear'],
    price: PRICE_REGULAR,
    salePrice: null,
    description:
      '"Karuppu — God Mode" regular-fit tee with a fierce front fire graphic and tonal back logo. Soft 190 GSM combed cotton, true-to-size everyday fit.',
    fabric: '190 GSM combed cotton',
    fabricDetail: 'Single-jersey 100% combed cotton, regular fit.',
    gsm: 190,
    fit: 'regular',
    origin: 'Designed & printed in India',
    images: ['/products/tee-god-mode.jpeg'],
    colors: [{ name: 'Jet Black', hex: '#1A1A1A' }],
    sizes: TEE_SIZES,
    outOfStock: ['XXXL'],
    inStock: true,
    rating: 4.5,
    reviewCount: 88,
    isNewArrival: true,
    isBestseller: false,
    designer: null,
    badge: 'new',
  },
  {
    id: 'p05',
    slug: 'retro-eyes-vneck-tee',
    name: 'Retro Eyes V-Neck Tee',
    category: 'regular-fit-t-shirts',
    collections: ['streetwear'],
    price: PRICE_REGULAR,
    salePrice: null,
    description:
      'Women\'s regular-fit V-neck with a moody "Retro Eyes" front strip and a portrait back print. Soft 180 GSM combed cotton with a flattering V-neckline.',
    fabric: '180 GSM combed cotton',
    fabricDetail: 'Single-jersey 100% combed cotton, women\'s regular V-neck fit.',
    gsm: 180,
    fit: 'regular',
    origin: 'Designed & printed in India',
    images: ['/products/tee-retro-eyes-vneck.jpeg'],
    colors: [{ name: 'Jet Black', hex: '#1A1A1A' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    outOfStock: [],
    inStock: true,
    rating: 4.4,
    reviewCount: 52,
    isNewArrival: true,
    isBestseller: false,
    designer: null,
    badge: 'new',
  },
  {
    id: 'p06',
    slug: 'tamizhaga-vetri-flag-tee',
    name: 'Tamizhaga Vetri Flag Tee',
    category: 'regular-fit-t-shirts',
    collections: ['creator', 'college'],
    price: PRICE_REGULAR,
    salePrice: null,
    description:
      'Clean white regular-fit tee with a front flag-wave graphic and a portrait back print. Breathable 180 GSM combed cotton for everyday wear.',
    fabric: '180 GSM combed cotton',
    fabricDetail: 'Single-jersey 100% combed cotton, regular fit.',
    gsm: 180,
    fit: 'regular',
    origin: 'Designed & printed in India',
    images: ['/products/tee-tamizhaga-flag-white.jpeg'],
    colors: [{ name: 'Off White', hex: '#FFFFFF' }],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.3,
    reviewCount: 44,
    isNewArrival: false,
    isBestseller: true,
    designer: null,
    badge: 'bestseller',
  },

  // ---------------- Polo (₹350) ----------------
  {
    id: 'p07',
    slug: '24h-series-racing-polo',
    name: '24H Series Racing Polo',
    category: 'polo-shirts',
    collections: ['college', 'creator'],
    price: PRICE_POLO,
    salePrice: null,
    description:
      'Red 24H Series racing-team polo with a white zip collar and full sponsor print front and back. Lightweight breathable piqué — race-paddock energy.',
    fabric: '220 GSM cotton piqué',
    fabricDetail: 'Moisture-friendly cotton piqué with ribbed zip collar.',
    gsm: 220,
    fit: 'polo',
    origin: 'Designed & printed in India',
    images: ['/products/polo-24h-racing-red.jpeg'],
    colors: [{ name: 'Racing Red', hex: '#DC2626' }],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.6,
    reviewCount: 38,
    isNewArrival: false,
    isBestseller: true,
    designer: null,
    badge: 'bestseller',
  },

  // ---------------- Hoodies (₹500) — Limited Edition ----------------
  {
    id: 'p08',
    slug: 'ajith-kumar-racing-hoodie-black',
    name: 'Ajith Kumar Racing Hoodie — Black',
    category: 'hoodies',
    collections: ['streetwear', 'creator'],
    price: PRICE_HOODIE,
    salePrice: null,
    description:
      'Limited-edition Ajith Kumar Racing hoodie in black with full sponsor-livery front and "AJITH" race graphic on the back. Heavyweight brushed fleece, kangaroo pocket.',
    fabric: '380 GSM brushed fleece',
    fabricDetail: 'Heavyweight cotton-rich brushed-back fleece, double-lined hood.',
    gsm: 380,
    fit: 'hoodie',
    origin: 'Designed & printed in India',
    images: ['/products/hoodie-ajith-black.jpeg'],
    colors: [{ name: 'Jet Black', hex: '#1A1A1A' }],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.9,
    reviewCount: 61,
    isNewArrival: false,
    isBestseller: true,
    isDrop: true,
    designer: null,
    badge: 'drop',
  },
  {
    id: 'p09',
    slug: 'ajith-kumar-racing-hoodie-white',
    name: 'Ajith Kumar Racing Hoodie — White',
    category: 'hoodies',
    collections: ['creator', 'college'],
    price: PRICE_HOODIE,
    salePrice: null,
    description:
      'Limited-edition Ajith Kumar Racing hoodie in white with a clean front race logo and a bold "AJITH" portrait graphic on the back. Premium 380 GSM brushed fleece.',
    fabric: '380 GSM brushed fleece',
    fabricDetail: 'Heavyweight cotton-rich brushed-back fleece, double-lined hood.',
    gsm: 380,
    fit: 'hoodie',
    origin: 'Designed & printed in India',
    images: ['/products/hoodie-ajith-white.jpeg'],
    colors: [{ name: 'Off White', hex: '#FFFFFF' }],
    sizes: TEE_SIZES,
    outOfStock: ['XS', 'S'],
    inStock: true,
    rating: 4.8,
    reviewCount: 47,
    isNewArrival: true,
    isBestseller: false,
    isDrop: true,
    designer: null,
    badge: 'drop',
  },
]

// ----------------------------------------------------------------------------
// Selectors
// ----------------------------------------------------------------------------

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.collections?.includes(collectionSlug))
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestseller)
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.isNewArrival)
}

export function getDrops(): Product[] {
  return PRODUCTS.filter((p) => p.isDrop)
}

/** Trending = mix of bestsellers + new arrivals, de-duplicated. */
export function getTrending(limit = 8): Product[] {
  const seen = new Set<string>()
  const out: Product[] = []
  for (const p of [...getBestsellers(), ...getNewArrivals()]) {
    if (!seen.has(p.id)) {
      seen.add(p.id)
      out.push(p)
    }
  }
  return out.slice(0, limit)
}

export function getRelated(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug)
  if (!product) return []
  const sameCat = PRODUCTS.filter((p) => p.slug !== slug && p.category === product.category)
  if (sameCat.length >= limit) return sameCat.slice(0, limit)
  // top up with other products if the category is small
  const others = PRODUCTS.filter(
    (p) => p.slug !== slug && p.category !== product.category
  )
  return [...sameCat, ...others].slice(0, limit)
}

export const ALL_PRODUCTS = PRODUCTS
