import type { CategoryItem } from '@/features/products/types/category.types';

interface CategoryIndicatorsProps {
  categories: CategoryItem[];
  activeIndex: number;
  onIndicatorClick: (index: number) => void;
}

export const CategoryIndicators = ({ 
  categories, 
  activeIndex, 
  onIndicatorClick 
}: CategoryIndicatorsProps) => {
  return (
    <div className="hidden md:flex gap-2">
      {categories.map((_, idx) => (
        <button
          key={idx}
          onClick={() => onIndicatorClick(idx)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            activeIndex === idx ? 'w-12 bg-black' : 'w-8 bg-gray-300'
          }`}
          aria-label={`View ${categories[idx].displayName}`}
        />
      ))}
    </div>
  );
};