import api from '@/config/axios-config';
import type { Product } from '../types/product.types';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/api/products/');
      const products = response.data;

      // Shuffle products
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }

      return products;
    } catch (err) {
      console.error('Failed to load products:', err);
      return [];
    }
  },

  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to load product:', err);
      return null;
    }
  },
};