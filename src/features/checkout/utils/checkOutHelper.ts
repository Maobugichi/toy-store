const calculateSubtotal = (price: string, quantity: number): number => {
    return parseFloat(price) * quantity;
  };

export const calculateTotal = (items:any): number => {
    return items.reduce((sum:any, item:any) => sum + calculateSubtotal(item.price, item.quantity), 0);
};


export const calculateShippingPrice = (
  methodId: string,
  basePrice: number,
  subtotal: number
): string => {
  if (methodId === "standard" && subtotal >= 100000) {
    return "FREE";
  }
  return `₦${basePrice.toLocaleString()}`;
};

export const calculateShippingCost = (
  subtotal: number,
  shippingMethodId: string,
  shippingOptions: any[]
) => {
  if (subtotal >= 100000) return 0;
  const selectedMethod = shippingOptions.find((opt) => opt.id === shippingMethodId);
  return selectedMethod?.price ?? 0;
};


export const fetchExchangeRate = async (): Promise<number> => {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/NGN");
  const data = await res.json();
  return data.rates.USD;
};


let cachedRate: number | null = null;

export const getCachedExchangeRate = async (): Promise<number> => {
  if (!cachedRate) {
    cachedRate = await fetchExchangeRate();
  }
  return cachedRate;
};

export const convertNGNtoUSD = (amountInNGN: number, rate?: number): number => {
  const exchangeRate = rate || cachedRate || 0.0012; 
  return Math.round(amountInNGN * exchangeRate * 100) / 100;
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);
};
