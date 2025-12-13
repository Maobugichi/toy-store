import type { Product } from "../types/product.types";

export const calculateDiscount = (price: number, compareAtPrice: number | null) => {
  if (!compareAtPrice || compareAtPrice <= price) {
    return { hasDiscount: false, discountPercentage: 0 };
  }
  
  return {
    hasDiscount: true,
    discountPercentage: Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
  };
};

export const getPrimaryImage = (product: Product): string => {
  return product.primary_image || product.images?.primary || '/placeholder.png';
};

export const formatPrice = (price: number, currency = "NGN"): string => {
  return Number(price).toLocaleString("en-NG", {
    style: "currency",
    currency,
  });
};