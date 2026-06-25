import type { MysteryBox, MysteryCategory, MysteryTier } from '@/types'

export const MYSTERY_CATEGORIES: { slug: MysteryCategory; name: string; blurb: string; image: string }[] = [
  { slug: 'anime', name: 'Anime', blurb: 'Otaku-approved tees, caps & extras.', image: 'https://picsum.photos/seed/fitbox-mb-anime/800/800' },
  { slug: 'streetwear', name: 'Streetwear', blurb: 'Oversized fits & bold graphics.', image: 'https://picsum.photos/seed/fitbox-mb-street/800/800' },
  { slug: 'gym', name: 'Gym', blurb: 'Performance fits for the grind.', image: 'https://picsum.photos/seed/fitbox-mb-gym/800/800' },
  { slug: 'creator', name: 'Creator', blurb: 'Community-designer surprise picks.', image: 'https://picsum.photos/seed/fitbox-mb-creator/800/800' },
]

export const TIERS: { tier: MysteryTier; name: string; accent: string }[] = [
  { tier: 'bronze', name: 'Bronze Box', accent: '#CD7F32' },
  { tier: 'silver', name: 'Silver Box', accent: '#9CA3AF' },
  { tier: 'gold', name: 'Gold Box', accent: '#F5A623' },
]

// Prices in INR paise.
export const MYSTERY_BOXES: MysteryBox[] = (() => {
  const out: MysteryBox[] = []
  const config: Record<MysteryTier, { price: number; itemCount: number; estValue: number; blurb: string }> = {
    bronze: { price: 79900, itemCount: 1, estValue: 119900, blurb: '1 surprise piece worth more than you pay.' },
    silver: { price: 149900, itemCount: 2, estValue: 249900, blurb: '2 pieces — at least one premium fit.' },
    gold: { price: 249900, itemCount: 3, estValue: 449900, blurb: '3 pieces incl. a guaranteed limited drop.' },
  }
  for (const cat of MYSTERY_CATEGORIES) {
    for (const t of TIERS) {
      const cfg = config[t.tier]
      out.push({
        id: `mb-${cat.slug}-${t.tier}`,
        category: cat.slug,
        tier: t.tier,
        price: cfg.price,
        itemCount: cfg.itemCount,
        estValue: cfg.estValue,
        blurb: cfg.blurb,
      })
    }
  }
  return out
})()

export function getBoxesForCategory(category: MysteryCategory): MysteryBox[] {
  return MYSTERY_BOXES.filter((b) => b.category === category)
}

export function getBox(category: MysteryCategory, tier: MysteryTier): MysteryBox | undefined {
  return MYSTERY_BOXES.find((b) => b.category === category && b.tier === tier)
}
