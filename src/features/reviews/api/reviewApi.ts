import api from "@/config/axios-config";
import type { Review, ReviewStats, ReviewFormValues  } from "../types/review.types";
export const reviewsApi = {
  getProductReviews: async (productId: number) => {
    const res = await api.get(`/api/reviews/product/${productId}`);
    return res.data as { reviews: Review[]; stats: ReviewStats };
  },

  checkUserReviewed: async (productId: number) => {
    const res = await api.get(`/api/reviews/check/${productId}`);
    return res.data as { hasReviewed: boolean };
  },

  createReview: async (values: ReviewFormValues) => {
    const res = await api.post("/api/reviews", values);
    return res.data;
  },

  updateReview: async (id: string, values: Partial<ReviewFormValues>) => {
    const res = await api.put(`/api/reviews/${id}`, values);
    return res.data;
  },

  deleteReview: async (id: string) => {
    await api.delete(`/api/reviews/${id}`);
  },
};