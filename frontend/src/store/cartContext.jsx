import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'amazon_clone_cart_v1'

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json)
    return v ?? fallback
  } catch {
    return fallback
  }
}

function calcTotals(items) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const quantity = items.reduce((sum, it) => sum + it.quantity, 0)
  return { subtotal, quantity }
}

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate': {
      const nextItems = Array.isArray(action.items) ? action.items : []
      return { ...state, items: nextItems, ...calcTotals(nextItems) }
    }
    case 'add': {
      const { item, quantity = 1 } = action
      const idx = state.items.findIndex((x) => x.id === item.id)
      const nextItems = [...state.items]
      if (idx >= 0) {
        nextItems[idx] = { ...nextItems[idx], quantity: nextItems[idx].quantity + quantity }
      } else {
        nextItems.push({ ...item, quantity })
      }
      return { ...state, items: nextItems, ...calcTotals(nextItems) }
    }
    case 'setQty': {
      const { id, quantity } = action
      const nextItems = state.items
        .map((it) => (it.id === id ? { ...it, quantity: Math.max(1, Number(quantity) || 1) } : it))
        .filter((it) => it.quantity > 0)
      return { ...state, items: nextItems, ...calcTotals(nextItems) }
    }
    case 'remove': {
      const nextItems = state.items.filter((it) => it.id !== action.id)
      return { ...state, items: nextItems, ...calcTotals(nextItems) }
    }
    case 'clear': {
      return { ...state, items: [], subtotal: 0, quantity: 0 }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], subtotal: 0, quantity: 0 })

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const items = raw ? safeParse(raw, []) : []
    dispatch({ type: 'hydrate', items })
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const value = useMemo(() => ({
    ...state,
    addItem: (item, quantity) => dispatch({ type: 'add', item, quantity }),
    setQuantity: (id, quantity) => dispatch({ type: 'setQty', id, quantity }),
    removeItem: (id) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
  }), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
