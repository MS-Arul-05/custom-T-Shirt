import { describe, it, expect, beforeEach } from 'vitest'
import {
  useBuilderStore,
  PRICE_PER_LAYER,
  MAX_PRICED_LAYERS,
} from '@/store/builder'
import { BASE_STYLES } from '@/lib/builder'

const baseLayer = {
  side: 'front' as const,
  type: 'text' as const,
  text: 'FITBOX',
  x: 0.5,
  y: 0.5,
  scale: 1,
  rotation: 0,
}

describe('builder store', () => {
  beforeEach(() => useBuilderStore.getState().reset())

  it('starts on step 1 with the first base style', () => {
    const s = useBuilderStore.getState()
    expect(s.step).toBe(1)
    expect(s.style.id).toBe(BASE_STYLES[0].id)
    expect(s.layers).toHaveLength(0)
  })

  it('clamps step navigation between 1 and 6', () => {
    const { prev, next, setStep } = useBuilderStore.getState()
    prev()
    expect(useBuilderStore.getState().step).toBe(1)
    setStep(6)
    next()
    expect(useBuilderStore.getState().step).toBe(6)
    setStep(99)
    expect(useBuilderStore.getState().step).toBe(6)
    setStep(-5)
    expect(useBuilderStore.getState().step).toBe(1)
  })

  it('addLayer returns an id, sets it active, and assigns ascending z', () => {
    const { addLayer } = useBuilderStore.getState()
    const id1 = addLayer(baseLayer)
    const id2 = addLayer(baseLayer)
    const s = useBuilderStore.getState()
    expect(s.layers).toHaveLength(2)
    expect(s.activeLayerId).toBe(id2)
    expect(s.layers[1].z).toBeGreaterThan(s.layers[0].z)
    expect(id1).not.toBe(id2)
  })

  it('updateLayer patches a single layer', () => {
    const { addLayer, updateLayer } = useBuilderStore.getState()
    const id = addLayer(baseLayer)
    updateLayer(id, { rotation: 45 })
    expect(useBuilderStore.getState().layers[0].rotation).toBe(45)
  })

  it('removeLayer removes it and clears active selection', () => {
    const { addLayer, removeLayer } = useBuilderStore.getState()
    const id = addLayer(baseLayer)
    removeLayer(id)
    const s = useBuilderStore.getState()
    expect(s.layers).toHaveLength(0)
    expect(s.activeLayerId).toBeNull()
  })

  it('price = base style price + ₹100 per layer, capped at the layer limit', () => {
    const { setStyle, addLayer, price } = useBuilderStore.getState()
    const oversized = BASE_STYLES.find((b) => b.id === 'oversized')!
    setStyle(oversized)
    expect(price()).toBe(oversized.basePrice)
    addLayer(baseLayer)
    addLayer(baseLayer)
    expect(useBuilderStore.getState().price()).toBe(oversized.basePrice + 2 * PRICE_PER_LAYER)
    // exceed the cap
    for (let i = 0; i < MAX_PRICED_LAYERS + 5; i++) addLayer(baseLayer)
    expect(useBuilderStore.getState().price()).toBe(
      oversized.basePrice + MAX_PRICED_LAYERS * PRICE_PER_LAYER
    )
  })
})
