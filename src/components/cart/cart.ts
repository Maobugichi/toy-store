import axios from "axios";

export async function addToCart(cartId: number, productId: number, quantity: number = 1) {
  const res = await axios.post("http://localhost:3000/cart/add", {
    cartId,
    productId,
    quantity,
  } , { withCredentials:true });
  return res.data;
}


export async function getCartItems(cartId: number) {
  const res = await axios.get(`http://localhost:3000/cart/${cartId}`,{ withCredentials:true });
  return res.data;
}
