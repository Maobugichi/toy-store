import type { Product } from '../types/product.types';
import type { FilterState, FilterOptions  } from '../types/filter.types';


export const filterProducts = (products: Product[], filters: FilterOptions): Product[] => {
  let filtered:Product[] = [...products];


  return filtered;
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      );
    case 'popular':
      // Implement popularity logic (e.g., based on sales, views)
      return sorted;
    case 'price-low':
      return sorted.sort((a, b) => Number(a.price) - Number(b.price));
    case 'price-high':
      return sorted.sort((a, b) => Number(b.price) - Number(a.price));
    case 'name-asc':
      return sorted.sort((a, b) => a.base_name.localeCompare(b.base_name));
    case 'name-desc':
      return sorted.sort((a, b) => b.base_name.localeCompare(a.base_name));
    default:
      return sorted;
  }
};



export const shuffleProducts = (products: Product[]): Product[] => {
  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getNewArrivals = (products: Product[]): Product[] => {
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



export const applyProductFilters = (
  products: Product[],
  filters: FilterState
): Product[] => {
  return products.filter((product) => {
    const price = parseFloat(product.price);

   
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.base_name.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
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
};

export const getCategoryName = (categoryId: number | null): string => {
  switch (categoryId) {
    case 1: return 'Accessories';
    case 2: return 'Clothing';
    case 3: return 'Footwear';
    default: return 'Accessories';
  }
};

export const extractFilterOptions = (products: Product[]) => {
  if (!products || products.length === 0) {
    return {
      materials: [],
      sizes: [],
      categories: [],
      colors: []
    };
  }

  const materials = [...new Set(products.map(p => p.material).filter(Boolean))];
  const sizes = [...new Set(products.map(p => p.size).filter(Boolean))];
  const categories = [...new Set(products.map(p => getCategoryName(p.category_id)))];
  const colors = [...new Set(products.map(p => p.color).filter(Boolean))];

  return { materials, sizes, categories, colors };
};

export const getMaxPrice = (products: Product[]): number => {
  if (!products || products.length === 0) return 50000;
  return Math.max(...products.map(product => parseFloat(product.price)));
};


export  const getUnique = <T extends Record<string, any>>(
  data: Product[], 
  key: keyof T
) => [...new Set(data.map((item:any) => item[key]).filter(Boolean))];


export const calculateMaxPrice = (data:Product[]) => {
    if (!data || data.length === 0) return 50000;
    return Math.max(...data.map((product:any) => parseFloat(product.price)));
  }