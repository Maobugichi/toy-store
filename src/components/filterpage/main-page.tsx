import React, { useState, useMemo } from 'react';
import { useLoaderData } from "react-router-dom";
import TopSlide from "../top-slide";
import Footer from "@/footer";
import NewsLetter from "../newsletter";
import FilterItems from "./items";
import ProductFilterDialog from "./filter-dialog";
import ModernNav from "../sticky-nav";
import type { Product } from '@/types';

interface FilterState {
  search: string;
  priceRange: number[];
  materials: string[];
  sizes: string[];
  categories: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
}

const MainPage: React.FC = () => {
  const data = useLoaderData() as Product[];
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [0],
    materials: [],
    sizes: [],
    categories: [],
    colors: [],
    inStock: false,
    featured: false
  });

  // Calculate max price from actual product data
  const maxPrice = useMemo(() => {
    if (!data || data.length === 0) return 50000;
    return Math.max(...data.map(product => parseFloat(product.price)));
  }, [data]);

  
  const filterOptions = useMemo(() => {
    if (!data || data.length === 0) return {
      materials: [],
      sizes: [],
      categories: [],
      colors: []
    };

    const materials = [...new Set(data.map(p => p.material).filter(Boolean))];
    const sizes = [...new Set(data.map(p => p.size).filter(Boolean))];
    
  
    // or get category names from your API. For now, using a placeholder
    const categories = [...new Set(data.map(p => {
    
      if (p.category_id === 1) return 'Accessories';
      if (p.category_id === 2) return 'Clothing';
      if (p.category_id === 3) return 'Footwear';
      return 'Accessories'; 
    }))];
    
    const colors = [...new Set(data.map(p => p.color).filter(Boolean))];

    return { materials, sizes, categories, colors };
  }, [data]);

  
  const filteredProducts = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.filter((product: Product) => {
      const price = parseFloat(product.price);
      console.log(filters.priceRange[0])
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) 
          && !product.base_name.toLowerCase().includes(filters.search.toLowerCase())
         ) {
        return false;
      }

     
      if (filters.priceRange[0] > 0 && price > filters.priceRange[0]) {
        return false;
      }

    
      if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.includes(product.size)) {
        return false;
      }

    
      if (filters.categories.length > 0) {
        const productCategory = product.category_id === 1 ? 'Accessories' :
                               product.category_id === 2 ? 'Clothing' :
                               product.category_id === 3 ? 'Footwear' : 'Accessories';
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
  }, [data, filters]);

  const handleFiltersChange = (newFilters: FilterState): void => {
    setFilters(newFilters);
  };

 
  return (
    <div>
      <TopSlide />
      <ModernNav />
      
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Products
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} of {data?.length || 0} products
            </p>
          </div>
          
          <ProductFilterDialog 
            onFiltersChange={handleFiltersChange}
            maxPrice={maxPrice}
            filterOptions={filterOptions}
          />
        </div>
        
      
        {filteredProducts.length > 0 ? (
          <FilterItems data={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No products match your current filters.
            </div>
            <button 
              onClick={() => setFilters({
                search: '',
                priceRange: [0],
                materials: [],
                sizes: [],
                categories: [],
                colors: [],
                inStock: false,
                featured: false
              })}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default MainPage;