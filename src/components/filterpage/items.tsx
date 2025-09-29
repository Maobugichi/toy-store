import React, { useState, useMemo } from 'react';
import ProductCard from "../product-card";
import type { Product } from '@/types'; 
import { useCart } from '@/hooks/useCart';

interface FilterItemsProps {
    data: Product[],
}

const ITEMS_PER_PAGE = 6;

const FilterItems: React.FC<FilterItemsProps> = ({ data }) => {
    const { addItem, addingId } = useCart();
    const [page, setPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    // Get items for current page
    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return data.slice(start, start + ITEMS_PER_PAGE);
    }, [data, page]);

    const handleNext = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[95%] mx-auto md:w-full">
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
                        isAdding={addingId === item.id}
                        className="h-[330px] items-center justify-center rounded-lg border bg-white shadow-sm font-semibold"
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-4">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-2 py-2">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default FilterItems;
