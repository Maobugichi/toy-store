import { useMutation, useQueryClient } from "@tanstack/react-query";

const addToCart = async ({ userId, productId, quantity } :{ userId:number | string, productId: number | string , quantity:number | string}) => {
  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // refresh cart query
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
