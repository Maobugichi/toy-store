import axios from "axios";
const url = import.meta.env.VITE_API_URL
export async function addToCart(cartId: number | null, productId: number, quantity: number = 1) {

  try {
     const res = await axios.post(`${url}/api/cart/add`, {
      cartId,
      productId,
      quantity,
    } , { withCredentials:true });
    return res.data;
  } catch(err) {
     console.log(err)
    throw new Error()
  }
}


export async function getCartItems(cartId: number | null) {
  try {
    
    const res = await axios.get(`${url}/api/cart/${cartId}`,{ withCredentials:true });
    console.log(res.data)
    return res.data;
  } catch(err) {
     console.log(err)
     throw new Error()
  }
}


export async function updateCartItem(cartItemId: number, quantity: number) {
  console.log(cartItemId)
  try {
    const res = await axios.put(
      `${url}/api/cart/${cartItemId}`,
      { quantity },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Update cart item error:", err);
    throw new Error("Failed to update cart item");
  }
}


export async function removeCartItem(cartItemId: number) {
  try {
    const res = await axios.delete(`${url}/api/cart/${cartItemId}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Remove cart item error:", err);
    throw new Error("Failed to remove cart item");
  }
}