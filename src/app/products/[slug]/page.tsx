import { PRODUCTS } from '@/lib/products'
import RedirectComponent from './RedirectComponent'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default function LegacyProductPage({ params }: { params: { slug: string } }) {
  return <RedirectComponent slug={params.slug} />
}
