import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterProductsByCategory } from '../utils/categoryHelper';
import type { Product } from '../types/category.types';

export const useCategoryNavigation = (products: Product[]) => {
  const navigate = useNavigate();

  const navigateToCategory = useCallback((searchTerm: string, displayName: string) => {
    const filteredItems = filterProductsByCategory(products, searchTerm);
    
    if (filteredItems.length > 0) {
      navigate("/filter", { 
        state: { 
          data: displayName, 
          items: filteredItems 
        } 
      });
    }
  }, [products, navigate]);

  return { navigateToCategory };
};