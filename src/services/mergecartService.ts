import { getGuestCart , clearGuestCart } from "@/features/cart/cart-storage";
import { queryClient } from "@/lib/query-client";
import api from "@/config/axios-config";

export async function handleLoginSuccess() {
  const guestCart = getGuestCart();
  try {
    if (guestCart.length > 0) {
       await api.post(
        `/api/cart/merge`,
        { guestCart },
      );
      clearGuestCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  } catch (err) {
    console.error(err);
  }
}
