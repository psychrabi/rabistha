import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      discount: false,
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id)
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter(i => i.id !== itemId)
      })),
      updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i
        )
      })),
      clearCart: () => set({ items: [], discount: null }),
      setDiscount: (discount) => set({ discount }),
      clearDiscount: () => set({ discount: null }),
      getSubtotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      getDiscountAmount: () => {
        const state = get()
        if (!state.discount) return 0
        return state.getSubtotal() * 0.20 // 20% discount
      },
      getTotal: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        const discountAmount = state.getDiscountAmount()
        return subtotal - discountAmount
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)

export default useCartStore 