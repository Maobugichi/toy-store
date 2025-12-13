import React, { useMemo } from 'react';
import {  useLocation } from "react-router-dom";
import Header from '../../components/layout/header';
import Footer from "@/components/layout/footer";
import Newsletter from '@/features/newsletter/components/newsletter';
import FilterItems from "../../features/products/components/ProductFilter/items";
import ProductFilterDialog from '../../features/products/components/ProductFilter/filter-dialog';
import type { Product } from '@/features/products/types/product.types';
import ScrollToTop from '@/hooks/useScrollToTop';
import { ClipLoader } from 'react-spinners';
import { useProducts } from '@/hooks/useProducts';
import {  useProductFilterDialog } from '@/features/products/hooks/useProductFilters';
import { ProductsEmptyState } from '@/features/products/components/ProductFilter/productsEmptyState';
import { calculateMaxPrice } from '@/features/products/utils/filterUtils';


const MainPage: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const { filters , filterOptions , filterProducts } = useProductFilterDialog()
  const location = useLocation();
  const passedData = location.state?.data;
  const filterType = location.state?.filterType;

  const data = (products as Product[] | [])?.filter(
   p => passedData ? p.name.toLowerCase().includes(passedData.toLowerCase()) : true
  ) ?? (products as Product[] ?? []);
  
  const maxPrice = useMemo(() => calculateMaxPrice(data), [data]);

  const applyFilterOptions = useMemo(() =>  filterOptions(data) , [data]);
  
  const filteredProducts = useMemo(() => filterProducts(data,filterType), [data, filters, filterType]);

  if (isLoading) return <div className="h-[80vh] grid place-items-center"><ClipLoader size={40} /></div>;
  if (error) return <p>Failed to load products</p>;
  

  return (
    <div>
      <ScrollToTop/>
      <Header />
     
      
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
              maxPrice={maxPrice}
              filterOptions={applyFilterOptions}
            />
         
        </div>
        
        {filteredProducts.length > 0 ? (
          <FilterItems data={filteredProducts}  />
        ) : (
         <ProductsEmptyState filterType={filterType}/>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};



export default MainPage;