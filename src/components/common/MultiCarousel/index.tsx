import { CarouselContainer } from './carouselContainer';
import { CarouselControls } from './carouselControls';
import { CarouselProgress } from './carouselProgress';
import { useCarouselLogic } from './useCarouselLogic';
import type { Product } from '@/types';

interface MultiCarouselProps {
  data?: Product[];
  isLoading?: boolean;
}

export function MultiCarousel({ data, isLoading }: MultiCarouselProps) {
  const { 
    emblaRef, 
    emblaApi, 
    selectedIndex, 
    smoothProgress,
    canScrollPrev,
    canScrollNext 
  } = useCarouselLogic();

  return (
    <div className="font-sans w-full mx-auto relative space-y-5">
      <CarouselContainer 
        emblaRef={emblaRef}
        data={data}
        isLoading={isLoading}
      />

      <CarouselControls
        emblaApi={emblaApi}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        isLoading={isLoading}
      />

      <CarouselProgress smoothProgress={smoothProgress} />
    </div>
  );
}