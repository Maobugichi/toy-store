import Category from '@/features/products/components/CategorySection/category';
import type { CategoryItem } from '@/features/products/types/category.types';

interface CategoryStackProps {
  categories: CategoryItem[];
  cardStack: number[];
  isDragging: boolean;
  dragOffset: number;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onDragMove: (e: React.MouseEvent | React.TouchEvent) => void;
  onDragEnd: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onShopNow: (searchTerm: string, displayName: string) => void;
  onCardClick: () => void;
}

export const CategoryStack = ({
  categories,
  cardStack,
  isDragging,
  dragOffset,
  onDragStart,
  onDragMove,
  onDragEnd,
  onMouseEnter,
  onMouseLeave,
  onShopNow,
  onCardClick,
}: CategoryStackProps) => {
  return (
    <div 
      className="md:hidden relative w-full h-[500px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {cardStack.map((cardIndex, stackIndex) => {
        const isTop = stackIndex === 0;
        const zIndex = categories.length - stackIndex;
        const baseScale = 1 - stackIndex * 0.05;
        const baseY = stackIndex * -20;
        
        const transform = isTop && isDragging 
          ? `translateX(${dragOffset}px) translateY(${baseY}px) scale(${baseScale})` 
          : `translateY(${baseY}px) scale(${baseScale})`;

        const item = categories[cardIndex];

        return (
          <div
            key={cardIndex}
            className={`
              absolute w-full h-[450px] rounded-xl overflow-hidden
              transition-all duration-300 ease-out
              ${isTop ? 'opacity-100' : 'opacity-75'}
              ${isDragging && isTop ? 'cursor-grabbing' : 'cursor-grab'}
            `}
            style={{
              zIndex,
              transform,
              top: 0,
              left: 0,
            }}
            onMouseDown={isTop ? onDragStart : undefined}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onTouchStart={isTop ? onDragStart : undefined}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
            onClick={!isDragging && isTop ? onCardClick : undefined}
          >
            <Category
              gender={item.displayName}
              src={item.src}
              isActive={true}
              onClick={() => {}}
              onShopNow={() => onShopNow(item.searchTerm, item.displayName)}
            />
            
            {isTop && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full z-10" />
            )}
          </div>
        );
      })}

      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full px-3 py-1 border border-white/20 z-10">
        <span className="text-white text-sm font-medium">
          {cardStack[0] + 1} / {categories.length}
        </span>
      </div>
    </div>
  );
};