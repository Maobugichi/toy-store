import { getGuestCart, clearGuestCart } from "@/components/cart/cart-storage";
import axios from "axios";

export async function handleLoginSuccess() {
  const url = import.meta.env.VITE_API_URL
  const guestCart = getGuestCart();

  try {
    if (guestCart.length > 0) {
    const response = await axios.post(`${url}/api/cart/merge`, { guestCart } , { withCredentials:true});
    console.log(response)
    clearGuestCart(); 
  }
  } catch(err) {
    console.log(err)
  }
  
}

