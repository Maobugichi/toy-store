import { createContext, useContext, useMemo, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "@/components/cart/cart"
import { useAuth } from "@/context/authContext"

// Types
interface ProductImage {
  gallery?: Array<{ public_id: string }>
  primary: string
}

interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  base_name: string;
  price: string;
  stock_quantity: number;
  variant?: string;
  images: ProductImage;
  optimistic?:boolean
}
type CartContextType = {
  items: CartItem[]
  isLoading: boolean
  addItem: (productId: number, quantity?: number) => void
  updateItem: (itemId: number, quantity: number) => void
  removeItem: (itemId: number) => void
  updatingId: number | null
  removingId: number | null
  addingId: number | null
  adding: boolean
  totalQuantity: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const { cartId } = useAuth()

  // Stable query key
  const cartKey = useMemo(() => ["cart", String(cartId ?? "no-cart")], [cartId])

  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [removingId, setRemovingId] = useState<number | null>(null)

  // ---- QUERY ----
  const { data: items = [], isLoading } = useQuery<CartItem[]>({
    queryKey: cartKey,
    queryFn: async () => {
      if (!cartId) return []
      return await getCartItems(cartId)
    },
    enabled: !!cartId,
    placeholderData: (prev) => prev, // keeps UI stable during refetch
  })

 
  // inside CartProvider
const [addingId, setAddingId] = useState<number | null>(null)

const addMutation = useMutation({
  mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
    addToCart(cartId, productId, quantity),
  onMutate: async ({ productId, quantity }) => {
    setAddingId(productId) // 👈 mark which product is being added
    await queryClient.cancelQueries({ queryKey: cartKey })
    const prevItems = queryClient.getQueryData<any[]>(cartKey) ?? []

    const existing = prevItems.find(i => i.product_id === productId)
    let newItems
    if (existing) {
      newItems = prevItems.map(i =>
        i.product_id === productId ? { ...i, quantity: i.quantity + quantity } : i
      )
    } else {
      newItems = [
        ...prevItems,
        {
          id: Date.now(),
          product_id: productId,
          quantity,
          base_name: "…",
          price: "0",
          images: { primary: "" },
          optimistic: true,
        },
      ]
    }
    queryClient.setQueryData(cartKey, newItems)
    return { prevItems }
  },
  onError: (_err, _vars, ctx) => {
    if (ctx?.prevItems) queryClient.setQueryData(cartKey, ctx.prevItems)
  },
  onSettled: () => {
    setAddingId(null) // 👈 reset
    queryClient.invalidateQueries({ queryKey: cartKey })
  },
})


  // ---- UPDATE ----
  const updateMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      updateCartItem(itemId, quantity),
    onMutate: async ({ itemId, quantity }) => {
      setUpdatingId(itemId)
      await queryClient.cancelQueries({ queryKey: cartKey })
      const prevItems = queryClient.getQueryData<CartItem[]>(cartKey) ?? []
      const newItems = prevItems.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      )
      queryClient.setQueryData(cartKey, newItems)
      return { prevItems }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevItems) queryClient.setQueryData(cartKey, ctx.prevItems)
    },
    onSettled: () => {
      setUpdatingId(null)
      queryClient.invalidateQueries({ queryKey: cartKey })
    },
  })

  // ---- REMOVE ----
  const removeMutation = useMutation({
    mutationFn: (itemId: number) => removeCartItem(itemId),
    onMutate: async (itemId) => {
      setRemovingId(itemId)
      await queryClient.cancelQueries({ queryKey: cartKey })
      const prevItems = queryClient.getQueryData<CartItem[]>(cartKey) ?? []
      const newItems = prevItems.filter((i) => i.id !== itemId)
      queryClient.setQueryData(cartKey, newItems)
      return { prevItems }
    },
    onError: (_err, _itemId, ctx) => {
      if (ctx?.prevItems) queryClient.setQueryData(cartKey, ctx.prevItems)
    },
    onSettled: () => {
      setRemovingId(null)
      queryClient.invalidateQueries({ queryKey: cartKey })
    },
  })

  // ---- TOTAL ----
  const totalQuantity = useMemo(
    () => items.reduce((sum, it) => sum + (it.quantity || 0), 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem: (productId, quantity = 1) =>
          addMutation.mutate({ productId, quantity }),
        updateItem: (itemId, quantity) =>
          updateMutation.mutate({ itemId, quantity }),
        removeItem: (itemId) => removeMutation.mutate(itemId),
        updatingId,
        removingId,
        addingId,
        adding: addMutation.isPending,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
