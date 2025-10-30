import React, { useState, useMemo } from 'react';
import {  useLocation } from "react-router-dom";
import TopSlide from "../top-slide";
import Footer from "@/footer";
import NewsLetter from "../newsletter/newsletter";
import FilterItems from "./items";
import ProductFilterDialog from "./filter-dialog";
import ModernNav from "../sticky-nav";
import type { Product } from '@/types';
import ScrollToTop from '@/scroll-to-top';
import { ClipLoader } from 'react-spinners';
import { useProducts } from '@/hooks/useProducts';

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
  const { data: products, isLoading, error } = useProducts();
  const location = useLocation();
  const passedData = location.state?.data;
  const filterType = location.state?.filterType;
 
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


  const data = (products as Product[] | undefined)?.filter(
   p => passedData ? p.name.toLowerCase().includes(passedData.toLowerCase()) : true
  ) ?? (products as Product[] ?? []);
  
  const maxPrice = useMemo(() => {
    if (!data || data.length === 0) return 50000;
    return Math.max(...data.map((product:any) => parseFloat(product.price)));
  }, [data]);

  const filterOptions = useMemo(() => {
    if (!data || data.length === 0) return {
      materials: [],
      sizes: [],
      categories: [],
      colors: []
    };

    const materials = [...new Set(data.map((p:any) => p.material).filter(Boolean))];
    const sizes = [...new Set(data.map((p:any) => p.size).filter(Boolean))];
    
    const categories = [...new Set(data.map((p:any) => {  
      if (p.category_id === 1) return 'Accessories';
      if (p.category_id === 2) return 'Clothing';
      if (p.category_id === 3) return 'Footwear';
      return 'Accessories'; 
    }))];
    
    const colors = [...new Set(data.map((p:any) => p.color).filter(Boolean))];

    return { materials, sizes, categories, colors };
  }, [data]);

 
  const getNewArrivals = (products: Product[]) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return products.filter((product) => {
      const createdAt = new Date(product.created_at);
      return createdAt >= thirtyDaysAgo;
    }).sort((a, b) => {
     
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  const filteredProducts = useMemo(() => {
    if (!data || data.length === 0) return [];

    let result = data;

   
    if (filterType === 'newArrivals') {
      result = getNewArrivals(result);
    }

   
    result = result.filter((product: Product) => {
      const price = parseFloat(product.price);

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

    return result;
  }, [data, filters, filterType]);

  if (isLoading) return <div className="h-[80vh] grid place-items-center"><ClipLoader size={40} /></div>;
  if (error) return <p>Failed to load products</p>;
  
  const handleFiltersChange = (newFilters: FilterState): void => {
    setFilters(newFilters);
  };
 
  return (
    <div>
      <ScrollToTop/>
      <TopSlide />
      <ModernNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {filterType === 'newArrivals' ? 'New Arrivals' : 'Products'}
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} of {data?.length || 0} products
              {filterType === 'newArrivals' && ' • Added in the last 30 days'}
            </p>
          </div>
          
          <ProductFilterDialog 
            onFiltersChange={handleFiltersChange}
            maxPrice={maxPrice}
            filterOptions={filterOptions}
          />
        </div>
        
        {filteredProducts.length > 0 ? (
          <FilterItems data={filteredProducts}  />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {filterType === 'newArrivals' 
                ? 'No new arrivals in the last 30 days.' 
                : 'No products match your current filters.'}
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

export function FilterHydrateFallback() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <ClipLoader />
    </div>
  );
}

export default MainPage;