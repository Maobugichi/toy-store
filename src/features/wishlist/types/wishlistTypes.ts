export interface Wishlist {
  id: number;
  name: string;
  created_at: string;
  itemCount?: number;
}

export interface WishlistItem {
  id: number;
  product_id: number;
  name: string;
  base_name: string;
  price: string;
  image_url: any;
  added_at?: string;
}

