import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { MysteryCategory } from '@/types'
import { MYSTERY_CATEGORIES } from '@/lib/mystery-boxes'
import MysteryBoxExperience from '@/components/mystery-box/MysteryBoxExperience'

export function generateStaticParams() {
  return MYSTERY_CATEGORIES.map((c) => ({ category: c.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { category: string }
}): Metadata {
  const meta = MYSTERY_CATEGORIES.find((c) => c.slug === params.category)
  if (!meta) return { title: 'Mystery Box not found — FITBOX' }
  return {
    title: `${meta.name} Mystery Box — FITBOX`,
    description: `${meta.blurb} Open a Bronze, Silver or Gold ${meta.name} mystery box and unbox surprise fits typically worth more than you pay.`,
  }
}

export default function MysteryBoxCategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const meta = MYSTERY_CATEGORIES.find((c) => c.slug === params.category)
  if (!meta) notFound()
  return <MysteryBoxExperience category={meta.slug as MysteryCategory} />
}
