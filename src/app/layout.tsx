import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FITBOX — Custom T-Shirts & Streetwear',
  description:
    'Design your own oversized tees, hoodies and streetwear. Premium custom apparel, anime drops, mystery boxes — made and printed in India.',
  keywords: [
    'custom t shirts india',
    'oversized t shirts',
    'anime t shirts',
    'streetwear clothing',
    'graphic tees india',
    'personalized t shirts',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
