import { useCategoryCarousel } from './hooks/useCategoryCarousel';
import { useCategoryNavigation } from '@/features/products/hooks/useCategoryNavigation';
import { CategoryGrid } from './components/categoryGrid';
import { CategoryStack } from './components/categoryStack';
import { CATEGORY_ITEMS } from './constants';
import { CategoryIndicators } from './components/categoryIndicators';
import { CarouselControls } from './components/carouselControls';


interface CategorySectionProps {
  data: any[];
}

const CategorySection = ({ data }: CategorySectionProps) => {
  const {
    activeIndex,
    setActiveIndex,
    cardStack,
    isAutoPlaying,
    isDragging,
    dragOffset,
    moveToNext,
    moveToPrevious,
    toggleAutoPlay,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleMouseEnter,
    handleMouseLeave,
  } = useCategoryCarousel(CATEGORY_ITEMS.length);

  const { navigateToCategory } = useCategoryNavigation(data);

  const handleShopNow = (searchTerm: string, displayName: string) => {
    navigateToCategory(searchTerm, displayName);
  };

  const handleDotClick = (index: number) => {
    const currentCardIndex = cardStack.findIndex(c => c === index);
    for (let i = 0; i < currentCardIndex; i++) {
      moveToNext();
    }
  };

  return (
    <section className="w-full h-fit  py-20">
      <div className="h-full w-[90%] max-w-7xl mx-auto space-y-10">
      
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold md:mb-2 mb-3">
              Collections
            </h2>
            <p className="text-gray-600 text-lg">
              Discover your style
            </p>
          </div>
          <CategoryIndicators 
            categories={CATEGORY_ITEMS}
            activeIndex={activeIndex}
            onIndicatorClick={setActiveIndex}
          />
        </div>

        
        <CategoryGrid 
          categories={CATEGORY_ITEMS}
          activeIndex={activeIndex}
          onCategoryClick={setActiveIndex}
          onShopNow={handleShopNow}
        />

      
        <div className="relative grid place-items-center">
          <CategoryStack 
            categories={CATEGORY_ITEMS}
            cardStack={cardStack}
            isDragging={isDragging}
            dragOffset={dragOffset}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onShopNow={handleShopNow}
            onCardClick={moveToNext}
          />

          <CarouselControls 
            categories={CATEGORY_ITEMS}
            cardStack={cardStack}
            isAutoPlaying={isAutoPlaying}
            onPrevious={moveToPrevious}
            onNext={moveToNext}
            onToggleAutoPlay={toggleAutoPlay}
            onDotClick={handleDotClick}
          />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
