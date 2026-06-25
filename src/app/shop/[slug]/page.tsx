import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getRelated } from '@/lib/products'
import ProductDetailClient from './ProductDetailClient'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  const related = getRelated(product.slug, 4)
  return <ProductDetailClient product={product} related={related} />
}
