import React, { useState, useMemo } from 'react';
import ProductCard from "../product-card";
import type { Product } from '@/types'; 
import { useCart } from '@/hooks/useCart';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FilterItemsProps {
    data: Product[],
}

const ITEMS_PER_PAGE = 12; 

const FilterItems: React.FC<FilterItemsProps> = ({ data }) => {
    const { addItem, addingId } = useCart();
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return data.slice(start, start + ITEMS_PER_PAGE);
    }, [data, page]);

    const handleNext = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

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
                                images: item.images
                            });
                        }}
                        width="w-[25%]"
                        extraClass='w-[74%] md:w-[17%]'
                        isAdding={addingId === item.id}
                        className="h-auto md:h-[330px] flex flex-col"
                    />
                ))}
            </div>

           
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2 md:gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="p-2 md:px-4 md:py-2 bg-gray-900 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <span className="px-3 py-2 text-sm md:text-base font-medium">
                        {page} / {totalPages}
                    </span>
                    
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="p-2 md:px-4 md:py-2 bg-gray-900 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </>
    );
};

export default FilterItems;