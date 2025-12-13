import { useState, useEffect } from "react";

interface UseCarouselOptions {
  itemCount: number;
  autoPlayInterval?: number;
  autoPlay?: boolean;
}

export const useCarousel = ({
  itemCount,
  autoPlayInterval = 3000,
  autoPlay = true,
}: UseCarouselOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, autoPlayInterval);

    return () => clearInterval(intervalId);
  }, [itemCount, autoPlayInterval, autoPlay]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
  };
};