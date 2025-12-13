import { useMemo } from 'react';
import type { Product } from '@/types';

export const useFilterOptions = (products?: Product[]) => {
  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return 50000;
    return Math.max(...products.map((product) => parseFloat(product.price)));
  }, [products]);

  const filterOptions = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        materials: [],
        sizes: [],
        categories: [],
        colors: [],
      };
    }

    const materials = [...new Set(products.map((p) => p.material).filter(Boolean))];
    const sizes = [...new Set(products.map((p) => p.size).filter(Boolean))];

    const categories = [...new Set(products.map((p) => {
      if (p.category_id === 1) return 'Accessories';
      if (p.category_id === 2) return 'Clothing';
      if (p.category_id === 3) return 'Footwear';
      return 'Accessories';
    }))];

    const colors = [...new Set(products.map((p) => p.color).filter(Boolean))];

    return { materials, sizes, categories, colors };
  }, [products]);

  return { maxPrice, filterOptions };
};