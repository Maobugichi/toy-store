import { useState, useEffect, useRef } from 'react';
import { AUTO_PLAY_INTERVAL, DRAG_THRESHOLD } from '../constants';

export const useCategoryCarousel = (itemCount: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStack, setCardStack] = useState([0, 1, 2]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const moveToNext = () => {
    const [top, ...rest] = cardStack;
    setCardStack([...rest, top]);
    setActiveIndex((prev) => (prev + 1) % itemCount);
  };

  const moveToPrevious = () => {
    const last = cardStack[cardStack.length - 1];
    const rest = cardStack.slice(0, -1);
    setCardStack([last, ...rest]);
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > DRAG_THRESHOLD) {
      if (dragOffset > 0) {
        moveToPrevious();
      } else {
        moveToNext();
      }
    }
    
    setDragOffset(0);
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      moveToNext();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cardStack, isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => {
    if (!isDragging) setIsAutoPlaying(true);
  };

  return {
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
  };
};