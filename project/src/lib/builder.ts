import type { BuilderBaseStyle, BuilderColor, DesignTemplate, AiStyle } from '@/types'

// Base styles for the Custom T-Shirt Builder. Prices in INR paise.
export const BASE_STYLES: BuilderBaseStyle[] = [
  {
    id: 'oversized',
    name: 'Oversized Tee',
    basePrice: 99900,
    mockupFront: 'https://picsum.photos/seed/fitbox-base-over-front/800/1000',
    mockupBack: 'https://picsum.photos/seed/fitbox-base-over-back/800/1000',
  },
  {
    id: 'regular',
    name: 'Regular Fit Tee',
    basePrice: 79900,
    mockupFront: 'https://picsum.photos/seed/fitbox-base-reg-front/800/1000',
    mockupBack: 'https://picsum.photos/seed/fitbox-base-reg-back/800/1000',
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    basePrice: 189900,
    mockupFront: 'https://picsum.photos/seed/fitbox-base-hood-front/800/1000',
    mockupBack: 'https://picsum.photos/seed/fitbox-base-hood-back/800/1000',
  },
  {
    id: 'polo',
    name: 'Polo',
    basePrice: 109900,
    mockupFront: 'https://picsum.photos/seed/fitbox-base-polo-front/800/1000',
    mockupBack: 'https://picsum.photos/seed/fitbox-base-polo-back/800/1000',
  },
]

// Builder color choices (spec: White, Black, Beige, Blue, Green, Red).
export const BUILDER_COLORS: BuilderColor[] = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'Beige', hex: '#E8DCC4' },
  { name: 'Blue', hex: '#1E3A8A' },
  { name: 'Green', hex: '#166534' },
  { name: 'Red', hex: '#DC2626' },
]

export const BUILDER_FONTS = [
  'Cabinet Grotesk',
  'Inter',
  'Bebas Neue',
  'Anton',
  'Pacifico',
  'Courier New',
] as const

export const TEXT_COLORS = [
  '#FFFFFF',
  '#1A1A1A',
  '#FF6B00',
  '#DC2626',
  '#1E3A8A',
  '#166534',
  '#F5A623',
] as const

export const AI_STYLES: { id: AiStyle; label: string; hint: string }[] = [
  { id: 'anime', label: 'Anime', hint: 'e.g. "samurai cat under neon cherry blossoms"' },
  { id: 'typography', label: 'Typography', hint: 'e.g. "bold STAY HUNGRY in brutalist type"' },
  { id: 'streetwear', label: 'Streetwear', hint: 'e.g. "graffiti skull, spray-paint texture"' },
  { id: 'minimal', label: 'Minimal', hint: 'e.g. "single line-art mountain, one color"' },
]

export const DESIGN_TEMPLATES: DesignTemplate[] = [
  { id: 't1', name: 'Neon Samurai', category: 'anime', url: 'https://picsum.photos/seed/fitbox-tpl-1/400/400' },
  { id: 't2', name: 'Cherry Blossom', category: 'anime', url: 'https://picsum.photos/seed/fitbox-tpl-2/400/400' },
  { id: 't3', name: 'Stay Hungry', category: 'typography', url: 'https://picsum.photos/seed/fitbox-tpl-3/400/400' },
  { id: 't4', name: 'Build Mode', category: 'typography', url: 'https://picsum.photos/seed/fitbox-tpl-4/400/400' },
  { id: 't5', name: 'Spray Skull', category: 'streetwear', url: 'https://picsum.photos/seed/fitbox-tpl-5/400/400' },
  { id: 't6', name: 'Graffiti Tag', category: 'streetwear', url: 'https://picsum.photos/seed/fitbox-tpl-6/400/400' },
  { id: 't7', name: 'Line Mountain', category: 'minimal', url: 'https://picsum.photos/seed/fitbox-tpl-7/400/400' },
  { id: 't8', name: 'Single Dot', category: 'minimal', url: 'https://picsum.photos/seed/fitbox-tpl-8/400/400' },
]

/**
 * Mock AI design generation. In production this calls the Studio API
 * (`POST /ai/generate`) which proxies an image model and logs ai_generations.
 * Here we return placeholder images so the builder UX is fully functional offline.
 */
export async function mockGenerateAiDesigns(
  prompt: string,
  style: AiStyle,
  count = 4
): Promise<string[]> {
  const seedBase = encodeURIComponent(`${style}-${prompt}`.slice(0, 40))
  await new Promise((r) => setTimeout(r, 1200))
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/ai-${seedBase}-${i}/400/400`
  )
}
