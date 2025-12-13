import ProductCard from '@/features/products/components/ProductFilter/product-card';
import { ProductCardSkeleton } from './productCardSkeleton';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/features/products/types/product.types';

interface CarouselContainerProps {
  emblaRef: any;
  data?: Product[];
  isLoading?: boolean;
}

export function CarouselContainer({ emblaRef, data, isLoading }: CarouselContainerProps) {
  const { addItem, addingId } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      quantity: 1,
      base_name: product.base_name,
      price: product.price,
      images: product.images,
    });
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-[0_0_70%] md:flex-[0_0_28%] p-2">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {data?.slice(0, 5).map((product) => (
          <div key={product.id} className="flex-[0_0_70%] md:flex-[0_0_28%] p-2">
            <ProductCard
              id={product.id}
              name={product.base_name}
              price={product.price}
              src={product.images?.primary}
              addToCart={() => handleAddToCart(product)}
              extraClass="w-[80%] md:w-[17%]"
              width="w-[20%]"
              isAdding={addingId === product.id}
              compare_at_price={product.compare_at_price}
              className="h-fit md:h-[360px] pt-3 pb-4 items-center justify-center rounded-3xl border bg-white shadow-sm font-semibold"
            />
          </div>
        ))}
      </div>
    </div>
  );
}