import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { PRODUCT_CATEGORIES } from '@/config/constants';

export const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleCategoryClick } = useNavigation();

  const onCategorySelect = (category: { name: string; id: number }) => {
    handleCategoryClick(category);
    setIsOpen(false);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button variant="ghost" className="font-medium">
        Categories
        <ChevronDown 
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};