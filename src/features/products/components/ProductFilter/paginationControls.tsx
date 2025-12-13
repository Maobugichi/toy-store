import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-center items-center mt-8 gap-2 md:gap-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="p-2 md:px-4 md:py-2 bg-gray-900 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="px-3 py-2 text-sm md:text-base font-medium">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="p-2 md:px-4 md:py-2 bg-gray-900 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};