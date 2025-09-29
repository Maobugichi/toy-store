interface ProductImage {
  public_id: string;
}

interface ProductImages {
  gallery: ProductImage[];
  primary: string;
}

interface Product {
  id: number;
  name: string;
  base_name: string;
  slug: string | null;
  price: string;
  compare_at_price: string;
  description: string;
  short_description: string;
  category_id: number | null;
  color: string | null;
  size: string;
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
  created_at: string;
  updated_at: string;
}

interface UIData {
  rating: number;
  reviewCount: number;
}

export type { ProductImage , ProductImages , Product , UIData }