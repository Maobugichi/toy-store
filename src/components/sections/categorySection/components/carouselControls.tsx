import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import type { CategoryItem } from '@/features/products/types/category.types';

interface CarouselControlsProps {
  categories: CategoryItem[];
  cardStack: number[];
  isAutoPlaying: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
  onDotClick: (index: number) => void;
}

export const CarouselControls = ({
  categories,
  cardStack,
  isAutoPlaying,
  onPrevious,
  onNext,
  onToggleAutoPlay,
  onDotClick,
}: CarouselControlsProps) => {
  return (
    <div className=" flex items-center justify-center gap-3 w-[70%] md:w-[40%] bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-gray-200">
      <button
        onClick={onPrevious}
        className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:scale-110 group"
        aria-label="Previous collection"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
      </button>

      <div className="flex gap-1.5">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${cardStack[0] === index 
                ? 'bg-gray-900 scale-125 w-4' 
                : 'bg-gray-400 hover:bg-gray-600'
              }
            `}
            aria-label={`Go to ${categories[index].displayName}`}
          />
        ))}
      </div>

      <button
        onClick={onToggleAutoPlay}
        className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:scale-110 group"
        aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
      >
        {isAutoPlaying ? (
          <Pause className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
        ) : (
          <Play className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
        )}
      </button>

      <button
        onClick={onNext}
        className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:scale-110 group"
        aria-label="Next collection"
      >
        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
      </button>
    </div>
  );
};