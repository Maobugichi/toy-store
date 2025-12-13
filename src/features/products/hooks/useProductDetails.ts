import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios-config';
import type { Product } from '../types/product.types';

export const useProductDetails = (productId: number | null) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productId) throw new Error('Invalid product ID');
      const res = await api.get(`/api/products/${productId}`);
      return res.data as Product;
    },
    enabled: !!productId && !isNaN(productId),
  });
};