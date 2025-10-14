import { createContext, useContext, useMemo, useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "@/components/cart/cart"
import { useAuth } from "@/context/authContext"
import { getGuestCart, addGuestItem, updateGuestItem, removeGuestItem } from "@/components/cart/cart-storage"
import { queryClient } from "@/lib/query-client"
import { toast } from "sonner"


interface ProductImage {
  gallery?: { public_id: string }[]
  primary: string
}

interface CartItem {
  id: number;
  cart_id?: number;
  product_id: number;
  quantity: number;
  created_at?: string;
  base_name: string;
  price: string;
  stock_quantity?: number | undefined;
  variant?: string;
  images: ProductImage;
  optimistic?:boolean
}

type CartContextType = {
  items: CartItem[]
  isLoading: boolean
  addItem:  (item: AddItemArgs) => void 
  updateItem: (itemId: number, quantity: number) => void
  removeItem: (itemId: number) => void
  updatingId: number | null
  removingId: number | null
  addingId: number | null
  adding: boolean
  totalQuantity: number
}

type AddItemArgs = {
  productId: number;
  quantity?: number;
  base_name: string;
  price: string;
  images: { primary: string; gallery?: { public_id: string }[] };
};

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cartId, user } = useAuth()
  const isGuest = !user
  
  const [addingId, setAddingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const cartKey = useMemo(() => 
    ["cart", isGuest ? "guest" : String(cartId ?? "no-cart")],
    [isGuest, cartId])


  const { data: items = [], isLoading } = useQuery<CartItem[]>({
    queryKey: cartKey,
    queryFn: async () => {
      if (isGuest) {
        return getGuestCart()
      }
      if (!cartId) return []
      return await getCartItems(cartId)
    },
    enabled: isGuest || !!cartId,
    placeholderData: (prev) => prev,
  })


  const addMutation = useMutation({
    mutationFn: async (item: {
      product_id: number;
      quantity: number;
      base_name: string;
      price: string;
      images: { primary: string; gallery?: { public_id: string }[] };
    }) => {
      if (isGuest) {
        await new Promise(res => setTimeout(res, 200)); 
        return addGuestItem(item)
      }
       return addToCart(cartId, item.product_id, item.quantity);
    },
    onMutate: async (item) => {
      setAddingId(item.product_id);
      await queryClient.cancelQueries({ queryKey: cartKey });
      const prevItems = queryClient.getQueryData<CartItem[]>(cartKey) ?? [];

      let newItems: CartItem[];

      const existing = prevItems.find((i) => i.product_id === item.product_id);
      if (existing) {
        newItems = prevItems.map((i) =>
          i.product_id === item.product_id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
      
        newItems = [
          ...prevItems,
          {
            id: Date.now(),
            ...item,
            optimistic: true,
          },
        ];
      }

      queryClient.setQueryData(cartKey, newItems);
      
      return { prevItems };
    },
    onSettled: (_data, _error) => {
       toast.success("Success 🎉", {
          description: "Item successfully added to cart",
        });
      setAddingId(null);
      queryClient.invalidateQueries({ queryKey: cartKey });
    },
  });


 
  const updateMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: number; quantity: number }) => {
      if (isGuest) {
          await new Promise(res => setTimeout(res, 200)); 
          updateGuestItem(itemId, quantity)
      }
         return updateCartItem(itemId, quantity)},
    onMutate: async ({ itemId, quantity }) => {
      setUpdatingId(itemId);
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
      setUpdatingId(null);
      queryClient.invalidateQueries({ queryKey: cartKey })
    },
  })

 
  const removeMutation = useMutation({
    mutationFn: (itemId: number) =>
      isGuest ? removeGuestItem(itemId) : removeCartItem(itemId),
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


  const totalQuantity = useMemo(
    () => items.reduce((sum, it) => sum + (it.quantity || 0), 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem: ({ productId, quantity = 1, base_name, price, images }:AddItemArgs) => {
          const existingItem = items.find(i => i.product_id === productId);        
          if (existingItem?.stock_quantity !== undefined && existingItem.quantity + quantity > existingItem.stock_quantity) {
            console.warn("Cannot add more than available stock");
            return;
          }
            addMutation.mutate({
            product_id: productId, 
            quantity,
            base_name,
            price,
            images,
        })},
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
