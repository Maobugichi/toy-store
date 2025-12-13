import type { Product } from "./features/products/types/product.types";

interface ProductImage {
  public_id: string;
}

interface ProductImages {
  gallery: ProductImage[];
  primary: string;
}

interface ProductTags {
  [key: string]: any;
}




// Optional: More specific types for better type safety
interface StrictProduct {
  id: number;
  name: string;
  base_name: string;
  slug: string | null;
  price: string; // Consider using number if you want to parse it
  compare_at_price: string; // Consider using number if you want to parse it
  description: string;
  short_description: string;
  category_id: number | null;
  color: string | null;
  size: 'small' | 'medium' | 'large' | 'xl' | 'xxl' | string; // Enum or union type
  material: string;
  extra_attributes: Record<string, any> | null;
  sku: string;
  stock_quantity: number;
  weight: number | null;
  images: ProductImages;
  primary_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: Record<string, any>;
  is_active: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string; // Consider using Date if you want to parse it
  updated_at: string; // Consider using Date if you want to parse it
}

// For API responses that might include arrays
interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// For creating/updating products (some fields might be optional)
interface CreateProductData {
  name: string;
  base_name?: string;
  price: string;
  compare_at_price?: string;
  description: string;
  short_description?: string;
  category_id?: number;
  color?: string;
  size: string;
  material: string;
  extra_attributes?: any;
  sku: string;
  stock_quantity: number;
  weight?: number;
  images?: ProductImages;
  meta_title?: string;
  meta_description?: string;
  tags?: ProductTags;
  is_active?: boolean;
  featured?: boolean;
  sort_order?: number;
}

interface UpdateProductData extends Partial<CreateProductData> {
  id: number;
}

export type {
  StrictProduct,
  ProductImage,
  ProductImages,
  ProductTags,
  ProductsResponse,
  CreateProductData,
  UpdateProductData
};