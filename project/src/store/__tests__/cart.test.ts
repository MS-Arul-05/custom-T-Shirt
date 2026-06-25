import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore, cartKey } from '@/store/cart'

function reset() {
  useCartStore.setState({ items: [], isOpen: false })
}

const product = {
  kind: 'product' as const,
  productId: 'p01',
  name: 'Suriya Tee',
  price: 40000,
  size: 'L',
  color: 'Jet Black',
  image: '/products/tee.jpeg',
}

describe('cartKey', () => {
  it('keys products by id|size|color', () => {
    expect(cartKey({ productId: 'p01', size: 'L', color: 'Jet Black' })).toBe('p01|L|Jet Black')
  })
  it('keys custom designs and mystery boxes by kind', () => {
    expect(cartKey({ kind: 'custom', productId: 'c1' })).toBe('custom|c1')
    expect(cartKey({ kind: 'mystery_box', productId: 'mb-anime-gold' })).toBe('mb|mb-anime-gold')
  })
})

describe('cart store', () => {
  beforeEach(reset)

  it('adds an item and opens the drawer', () => {
    useCartStore.getState().addItem(product)
    const s = useCartStore.getState()
    expect(s.items).toHaveLength(1)
    expect(s.isOpen).toBe(true)
    expect(s.items[0].key).toBe('p01|L|Jet Black')
    expect(s.items[0].quantity).toBe(1)
  })

  it('increments quantity when the same variant is added again (no duplicate line)', () => {
    const { addItem } = useCartStore.getState()
    addItem(product)
    addItem(product)
    const s = useCartStore.getState()
    expect(s.items).toHaveLength(1)
    expect(s.items[0].quantity).toBe(2)
  })

  it('treats a different size/color as a separate line item', () => {
    const { addItem } = useCartStore.getState()
    addItem(product)
    addItem({ ...product, size: 'M' })
    expect(useCartStore.getState().items).toHaveLength(2)
  })

  it('computes subtotal and itemCount across quantities', () => {
    const { addItem } = useCartStore.getState()
    addItem({ ...product, quantity: 2 }) // 2 x 40000
    addItem({ ...product, size: 'M', price: 30000 }) // 1 x 30000
    const s = useCartStore.getState()
    expect(s.itemCount()).toBe(3)
    expect(s.subtotal()).toBe(110000)
  })

  it('removes an item by key', () => {
    const { addItem, removeItem } = useCartStore.getState()
    addItem(product)
    removeItem('p01|L|Jet Black')
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('updateQuantity sets quantity, and removes the line when qty <= 0', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(product)
    updateQuantity('p01|L|Jet Black', 5)
    expect(useCartStore.getState().items[0].quantity).toBe(5)
    updateQuantity('p01|L|Jet Black', 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('clear empties the cart', () => {
    const { addItem, clear } = useCartStore.getState()
    addItem(product)
    clear()
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('supports custom and mystery_box items with their own keys', () => {
    const { addItem } = useCartStore.getState()
    addItem({ kind: 'custom', productId: 'custom-1', name: 'Custom Tee', price: 99900, size: 'L', color: 'Black', image: '/x.png' })
    addItem({ kind: 'mystery_box', productId: 'mb-anime-gold', name: 'Anime Gold Box', price: 249900, size: '—', color: 'Surprise', image: '/y.png' })
    const keys = useCartStore.getState().items.map((i) => i.key)
    expect(keys).toContain('custom|custom-1')
    expect(keys).toContain('mb|mb-anime-gold')
  })
})
