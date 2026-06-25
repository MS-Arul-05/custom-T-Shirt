'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectComponent({ slug }: { slug: string }) {
  const router = useRouter()
  useEffect(() => {
    router.replace(`/shop/${slug}`)
  }, [router, slug])
  return null
}
