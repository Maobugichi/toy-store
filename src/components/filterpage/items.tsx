import React from 'react';
import ProductCard from "../product-card";
import type { Product } from '@/types'; 
import { useCart } from '@/hooks/useCart';

interface FilterItemsProps {
    data: Product[],
    cartId:number | null,
}

const FilterItems: React.FC<FilterItemsProps> = ({ data , cartId  }) => {
    const { addItem , addingId } = useCart()
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-[95%] mx-auto md:w-full">
            {data?.map((item: Product) => (
                <ProductCard 
                    key={item.id} 
                    id={item.id}
                    name={item.base_name}
                    price={item.price}
                    src={item.images?.primary}
                    addToCart={async () => {
                        if (cartId !== null) {
                        addItem(item.id, 1);
                        } else {
                        console.warn("No cart ID found!");
                        }
                    }}
                   
                    isAdding={addingId == item.id}
                    className="h-[330px] items-center justify-center rounded-lg border bg-white shadow-sm font-semibold"
                />
            ))}
        </div>
    );
};

export default FilterItems;