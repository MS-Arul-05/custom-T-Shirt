import type { Collection } from '@/types'
import { PRODUCTS } from './products'

export const COLLECTIONS: Collection[] = [
  {
    slug: 'streetwear',
    name: 'Streetwear Collection',
    tagline: 'Built for the block',
    description:
      'Oversized cuts, bold graphics, heavyweight fleece. The core FITBOX streetwear line for everyday rotation.',
    heroImage: 'https://picsum.photos/seed/fitbox-col-street/1600/900',
    productSlugs: [],
    accent: '#FF6B00',
  },
  {
    slug: 'gym',
    name: 'Gym Collection',
    tagline: 'Train. Print. Repeat.',
    description:
      'Sweat-wicking performance tees and tanks with minimal hits. For the pump and the post-workout flex.',
    heroImage: 'https://picsum.photos/seed/fitbox-col-gym/1600/900',
    productSlugs: [],
    accent: '#166534',
  },
  {
    slug: 'college',
    name: 'College Collection',
    tagline: 'Campus core',
    description:
      'Varsity bombers, collegiate crews, and piqué polos. Dorm-room essentials with a clean retro edge.',
    heroImage: 'https://picsum.photos/seed/fitbox-col-college/1600/900',
    productSlugs: [],
    accent: '#1E3A8A',
  },
  {
    slug: 'creator',
    name: 'Creator Collection',
    tagline: 'Made by the community',
    description:
      'Collabs and pieces from FITBOX community designers. Every sale pays the artist behind the print.',
    heroImage: 'https://picsum.photos/seed/fitbox-col-creator/1600/900',
    productSlugs: [],
    accent: '#FF6B00',
  },
]

// Populate productSlugs from the catalog membership.
for (const c of COLLECTIONS) {
  c.productSlugs = PRODUCTS.filter((p) => p.collections?.includes(c.slug)).map((p) => p.slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export function getFeaturedCollections(limit = 4): Collection[] {
  return COLLECTIONS.slice(0, limit)
}
