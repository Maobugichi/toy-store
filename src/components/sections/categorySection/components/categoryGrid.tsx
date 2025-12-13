import Category from '@/features/products/components/CategorySection/category';
import type { CategoryItem } from '@/features/products/types/category.types';

interface CategoryGridProps {
  categories: CategoryItem[];
  activeIndex: number;
  onCategoryClick: (index: number) => void;
  onShopNow: (searchTerm: string, displayName: string) => void;
}

const getGridStyle = (idx: number, activeIndex: number) => {
  if (activeIndex === idx) {
    return 'col-span-2 row-span-2';
  }
  
  if (activeIndex === 0) {
    return idx === 1 ? 'col-start-3 row-start-1' : 'col-start-3 row-start-2';
  } else if (activeIndex === 1) {
    return idx === 0 ? 'col-start-1 row-start-1' : 'col-start-1 row-start-2';
  } else {
    return idx === 0 ? 'col-start-1 row-start-1' : 'col-start-1 row-start-2';
  }
};

export const CategoryGrid = ({ 
  categories, 
  activeIndex, 
  onCategoryClick, 
  onShopNow 
}: CategoryGridProps) => {
  return (
    <div className="hidden md:grid grid-cols-3 grid-rows-2 w-full h-[600px] gap-4">
      {categories.map((item, idx) => (
        <div
          key={item.displayName}
          className={`transition-all duration-700 ease-out ${getGridStyle(idx, activeIndex)}`}
        >
          <Category
            gender={item.displayName}
            src={item.src}
            isActive={activeIndex === idx}
            onClick={() => onCategoryClick(idx)}
            onShopNow={() => onShopNow(item.searchTerm, item.displayName)}
          />
        </div>
      ))}
    </div>
  );
};