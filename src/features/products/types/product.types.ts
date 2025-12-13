export interface Product {
  id: number;

  name: string;
  base_name: string;
  slug: string;

  price: string; 
  compare_at_price: string;

  description: string;
  short_description: string;

  category_id: number | null;

  color: string | null;
  size: string 
  material: string 

  extra_attributes: Record<string, any> | null;

  sku: string;

  stock_quantity: number;
  weight: string | null; 

  images: { primary: string; [key: string]: string; }; 
  primary_image: string | null;

  meta_title: string | null;
  meta_description: string | null;

  tags: any[] | null; 

  is_active: boolean;
  featured: boolean;
  sort_order: number;

  features: any[] | null; 
  perfect_for: any[] | null; 
  product_details: Record<string, any> | null; 

  created_at: string;
  updated_at: string;
}



export interface ProductDetailsProps {
  productId: number;
}

export interface FilterProductOptions {
  sortBy: string;
  category: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
}



export type SortOption = 'recent' | 'popular' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc';