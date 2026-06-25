import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartItemKind } from '@/types'

/** Compute the uniqueness key for a cart item. */
export function cartKey(input: {
  kind?: CartItemKind
  productId: string
  size?: string
  color?: string
}): string {
  const kind = input.kind ?? 'product'
  if (kind === 'custom') return `custom|${input.productId}`
  if (kind === 'mystery_box') return `mb|${input.productId}`
  return `${input.productId}|${input.size ?? ''}|${input.color ?? ''}`
}

type AddItemInput = Omit<CartItem, 'key' | 'quantity' | 'kind'> & {
  kind?: CartItemKind
  quantity?: number
  key?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: AddItemInput) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, qty: number) => void
  clear: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  subtotal: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (input) =>
        set((state) => {
          const key = input.key ?? cartKey(input)
          const qty = input.quantity ?? 1
          const existing = state.items.find((i) => i.key === key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + qty } : i
              ),
              isOpen: true,
            }
          }
          const item: CartItem = {
            key,
            kind: input.kind ?? 'product',
            productId: input.productId,
            name: input.name,
            price: input.price,
            size: input.size,
            color: input.color,
            quantity: qty,
            image: input.image,
          }
          return { items: [...state.items, item], isOpen: true }
        }),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      updateQuantity: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'fitbox-cart',
      partialize: (s) => ({ items: s.items }),
    }
  )
)
