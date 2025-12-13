import type { Product } from "@/types";

export const formatPrice = (price: string | number): string => {
  return `₦${parseFloat(price.toString()).toLocaleString('en-NG')}`;
};

export const formatProductName = (product: Product): string => {
  const baseName = product.base_name || product.name;
  const colorSuffix = product.color
    ? ` - ${product.color.charAt(0).toUpperCase() + product.color.slice(1)}`
    : '';
  
  return `${baseName}${colorSuffix}`;
};