import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/lib/products'
import CategoryClient from './CategoryClient'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.category)
  if (!category) notFound()
  return <CategoryClient category={category.slug} categoryName={category.name} />
}
