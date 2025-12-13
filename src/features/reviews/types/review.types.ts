export interface Review {
  id: string;
  user_id: string;
  product_id: number;
  username: string;
  review: string;
  stars: number;
  created_at: string;
}

export interface ReviewStats {
  avg_rating: number;
  review_count: number;
}

export interface ReviewFormValues {
  username: string;
  review: string;
  stars: number;
  product_id: number;
}