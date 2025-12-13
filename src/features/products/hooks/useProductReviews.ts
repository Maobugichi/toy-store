import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios-config';


export const useProductReviews = (productId: number | null) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!productId) return null;
      const res = await api.get(`/api/reviews/product/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });
};