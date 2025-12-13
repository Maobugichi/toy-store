import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { EmblaCarouselType } from 'embla-carousel';

interface CarouselControlsProps {
  emblaApi?: EmblaCarouselType;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  isLoading?: boolean;
}

export function CarouselControls({ 
  emblaApi, 
  canScrollPrev, 
  canScrollNext,
  isLoading 
}: CarouselControlsProps) {
  return (
    <div className="flex justify-between mt-4">
      <Button
        variant="outline"
        className="rounded-full bg-white border-black md:border-none h-10 absolute top-32 -left-4 md:-left-10"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev || isLoading}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </Button>
      
      <Button
        variant="outline"
        onClick={() => emblaApi?.scrollNext()}
        className="rounded-full border-black md:border-none h-10 absolute top-32 -right-4 md:-right-10"
        disabled={!canScrollNext || isLoading}
        aria-label="Next slide"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}