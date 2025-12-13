import { useState, useEffect, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

export function useCarouselLogic() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    slidesToScroll: 1 
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollProgressMotion = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgressMotion, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    scrollProgressMotion.set(progress * 100);
  }, [emblaApi, scrollProgressMotion]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onSelect);

    onSelect();
    onScroll();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onScroll);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    smoothProgress,
    canScrollPrev,
    canScrollNext,
  };
}