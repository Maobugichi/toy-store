const CART_KEY = "guest_cart";

export function getGuestCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setGuestCart(cart: any[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addGuestItem(item: {
  product_id: number;
  quantity: number;
  base_name: string;
  price: string;
  images: { primary: string; gallery?: { public_id: string }[] };
}) {
  const cart = getGuestCart();
  const existing = cart.find((i:any) => i.product_id === item.product_id);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({
      id: Date.now(),
      ...item,
      optimistic: true,
    });
  }

  try {
    setGuestCart(cart);
  } catch(err) {
    
    console.error("Failed to add guest item:", err);
    throw new Error('error')
  }

  return Promise.resolve(cart); // ensure it returns a promise
}


export function updateGuestItem(itemId: number, quantity: number) {
  const cart = getGuestCart();
  const newCart = cart.map((i:any) => i.id === itemId ? { ...i, quantity } : i);
  setGuestCart(newCart);
  return newCart;
}

export function removeGuestItem(itemId: number) {
  const cart = getGuestCart();
  const newCart = cart.filter((i:any) => i.id !== itemId);
  setGuestCart(newCart);
  return newCart;
}

export function clearGuestCart() {
  localStorage.removeItem(CART_KEY);
}
