import { useMemo } from 'react';
import type { Product } from '@/types';
import type { FilterState } from '../types/filter.types';

export const useFilteredProducts = (
  products: Product[],
  filters: FilterState,
  filterType?: string
) => {
  return useMemo(() => {
    if (!products || products.length === 0) return [];

    let result = [...products];

   
    if (filterType === 'newArrivals') {
      result = getNewArrivals(result);
    }

   
    result = result.filter((product) => {
      const price = parseFloat(product.price);

    
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.base_name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

     
      if (filters.priceRange[0] > 0 && price > filters.priceRange[0]) {
        return false;
      }

     
      if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
        return false;
      }

   
      if (filters.sizes.length > 0 && !filters.sizes.includes(product.size)) {
        return false;
      }

   
      if (filters.categories.length > 0) {
        const productCategory = getCategoryName(product.category_id);
        if (!filters.categories.includes(productCategory)) {
          return false;
        }
      }

      if (filters.colors.length > 0 && product.color && !filters.colors.includes(product.color)) {
        return false;
      }

     
      if (filters.inStock && product.stock_quantity <= 0) {
        return false;
      }

    
      if (filters.featured && !product.featured) {
        return false;
      }

      return true;
    });

    return result;
  }, [products, filters, filterType]);
};

const getNewArrivals = (products: Product[]) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return products
    .filter((product) => {
      const createdAt = new Date(product.created_at);
      return createdAt >= thirtyDaysAgo;
    })
    .sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
};

const getCategoryName = (categoryId: number | null): string => {
  const categories: Record<number, string> = {
    1: 'Accessories',
    2: 'Clothing',
    3: 'Footwear',
  };
  return categories[categoryId || 0] || 'Accessories';
};