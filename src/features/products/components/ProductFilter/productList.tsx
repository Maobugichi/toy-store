import React from 'react';
import ProductCard from './product-card';
import { PaginationControls } from './paginationControls';
import { usePagination } from '../../hooks/usePagination';
import { useCart } from '@/hooks/useCart';
import type { Product } from '../../types/product.types';

interface ProductListProps {
  products: Product[];
  itemsPerPage?: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, itemsPerPage = 12 }) => {
  const { addItem, addingId } = useCart();
  const { paginatedItems, page, totalPages, handleNext, handlePrev } = usePagination(
    products,
    itemsPerPage
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-[95%] mx-auto md:w-full">
        {paginatedItems.map((item: Product) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.base_name}
            price={item.price}
            src={item.images?.primary}
            addToCart={() => {
              addItem({
                productId: item.id,
                quantity: 1,
                base_name: item.base_name,
                price: item.price,
                images: item.images,
              });
            }}
            width="w-[25%]"
            extraClass="w-[74%] md:w-[17%]"
            isAdding={addingId === item.id}
            compare_at_price={item.compare_at_price}
            className="h-fit rounded-3xl md:h-[350px] flex flex-col"
          />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
};

export default ProductList;