import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  BuilderBaseStyle,
  BuilderColor,
  DesignLayer,
  LayerSide,
} from '@/types'
import { BASE_STYLES, BUILDER_COLORS } from '@/lib/builder'

/** ₹100 (10000 paise) added to the price per design layer. */
export const PRICE_PER_LAYER = 10000
/** Reasonable cap so layer-stacking can't inflate the price absurdly. */
export const MAX_PRICED_LAYERS = 8

export type AddLayerInput = Omit<DesignLayer, 'id' | 'z'> &
  Partial<Pick<DesignLayer, 'z'>>

interface BuilderStore {
  step: number // 1..6
  style: BuilderBaseStyle
  color: BuilderColor
  size: string
  side: LayerSide
  layers: DesignLayer[]
  activeLayerId: string | null

  setStyle: (style: BuilderBaseStyle) => void
  setColor: (color: BuilderColor) => void
  setSize: (size: string) => void
  setSide: (side: LayerSide) => void
  setStep: (step: number) => void
  next: () => void
  prev: () => void

  addLayer: (layer: AddLayerInput) => string
  updateLayer: (id: string, patch: Partial<DesignLayer>) => void
  removeLayer: (id: string) => void
  setActiveLayer: (id: string | null) => void

  reset: () => void
  price: () => number
}

export const BUILDER_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const

const TOTAL_STEPS = 6

function makeId(): string {
  return `layer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const initialState = {
  step: 1,
  style: BASE_STYLES[0],
  color: BUILDER_COLORS[0],
  size: 'M',
  side: 'front' as LayerSide,
  layers: [] as DesignLayer[],
  activeLayerId: null as string | null,
}

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStyle: (style) => set({ style }),
      setColor: (color) => set({ color }),
      setSize: (size) => set({ size }),
      setSide: (side) => set({ side }),
      setStep: (step) =>
        set({ step: Math.min(TOTAL_STEPS, Math.max(1, step)) }),
      next: () => set((s) => ({ step: Math.min(TOTAL_STEPS, s.step + 1) })),
      prev: () => set((s) => ({ step: Math.max(1, s.step - 1) })),

      addLayer: (layer) => {
        const id = makeId()
        set((s) => {
          const maxZ = s.layers.reduce((m, l) => Math.max(m, l.z), 0)
          const next: DesignLayer = {
            id,
            z: layer.z ?? maxZ + 1,
            ...layer,
          }
          return { layers: [...s.layers, next], activeLayerId: id }
        })
        return id
      },
      updateLayer: (id, patch) =>
        set((s) => ({
          layers: s.layers.map((l) => (l.id === id ? { ...l, ...patch } : l)),
        })),
      removeLayer: (id) =>
        set((s) => ({
          layers: s.layers.filter((l) => l.id !== id),
          activeLayerId: s.activeLayerId === id ? null : s.activeLayerId,
        })),
      setActiveLayer: (id) => set({ activeLayerId: id }),

      reset: () => set({ ...initialState }),

      price: () => {
        const { style, layers } = get()
        const pricedLayers = Math.min(layers.length, MAX_PRICED_LAYERS)
        return style.basePrice + pricedLayers * PRICE_PER_LAYER
      },
    }),
    {
      name: 'fitbox-builder',
      // Don't persist transient UI state (step/active layer).
      partialize: (s) => ({
        style: s.style,
        color: s.color,
        size: s.size,
        side: s.side,
        layers: s.layers,
      }),
    }
  )
)
