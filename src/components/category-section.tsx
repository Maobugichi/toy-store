import { useState, useEffect, useRef } from 'react';
import Category from './category';
import hood from "@/assets/hood-tee.jpg"
import testsrc from "@/assets/toy-hero2.jpg"
import place from "@/assets/banner.jpg"
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const CategorySection = ({ data }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStack, setCardStack] = useState([0, 1, 2]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef<any>(null);
  
  const categoryItem = [
    {
      gender: "Hat",
      src: testsrc,
    },
    {
      gender: "Tees",
      src: hood,
    },
    {
      gender: "Hoodies",
      src: place,
    },
  ];

 

  const getGridStyle = (idx: number) => {
    if (activeIndex === idx) {
      return 'col-span-2 row-span-2';
    }
    
    if (activeIndex === 0) {
      return idx === 1 ? 'col-start-3 row-start-1' : 'col-start-3 row-start-2';
    } else if (activeIndex === 1) {
      return idx === 0 ? 'col-start-1 row-start-1' : 'col-start-1 row-start-2';
    } else {
      return idx === 0 ? 'col-start-1 row-start-1' : 'col-start-1 row-start-2';
    }
  };

  const moveToNext = () => {
    const [top, ...rest] = cardStack;
    setCardStack([...rest, top]);
    setActiveIndex((prev) => (prev + 1) % categoryItem.length);
  };

  const moveToPrevious = () => {
    const last = cardStack[cardStack.length - 1];
    const rest = cardStack.slice(0, -1);
    setCardStack([last, ...rest]);
    setActiveIndex((prev) => (prev - 1 + categoryItem.length) % categoryItem.length);
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
    
    if (Math.abs(dragOffset) > 100) {
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
    }, 6000);

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

  return (
    <section className="w-full h-fit md:min-h-screen pt-16 pb-28  md:py-20">
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
          <div className="hidden md:flex gap-2">
            {categoryItem.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-12 bg-black' : 'w-8 bg-gray-300'
                }`}
                aria-label={`View ${categoryItem[idx].gender}`}
              />
            ))}
          </div>
        </div>

       
        <div className="hidden md:grid grid-cols-3 grid-rows-2 w-full h-[600px] gap-4">
          {categoryItem.map((item, idx) => (
            <div
              key={item.gender}
              className={`transition-all duration-700 ease-out ${getGridStyle(idx)}`}
            >
              <Category
                gender={item.gender}
                src={item.src}
                collection={data}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
                onNavigate={setIsAutoPlaying}
              />
            </div>
          ))}
        </div>

     
        <div className="md:hidden relative w-full  h-[500px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {cardStack.map((cardIndex, stackIndex) => {
            const isTop = stackIndex === 0;
            const zIndex = categoryItem.length - stackIndex;
            const baseScale = 1 - stackIndex * 0.05;
            const baseY = stackIndex * -20;
            
            const transform = isTop && isDragging 
              ? `translateX(${dragOffset}px) translateY(${baseY}px) scale(${baseScale})` 
              : `translateY(${baseY}px) scale(${baseScale})`;

            const item = categoryItem[cardIndex];

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
                onMouseDown={isTop ? handleDragStart : undefined}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchStart={isTop ? handleDragStart : undefined}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onClick={!isDragging && isTop ? moveToNext : undefined}
              >
                <Category
                  gender={item.gender}
                  src={item.src}
                  collection={data}
                  isActive={true}
                  onClick={() => {}}
                  onNavigate={setIsAutoPlaying}
                />
                
             
                {isTop && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full z-10" />
                )}
              </div>
            );
          })}

        
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-gray-200">
            <button
              onClick={moveToPrevious}
              className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:scale-110 group"
              aria-label="Previous collection"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
            </button>

            <div className="flex gap-1.5">
              {categoryItem.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const currentCardIndex = cardStack.findIndex(c => c === index);
                    for (let i = 0; i < currentCardIndex; i++) {
                      moveToNext();
                    }
                  }}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${cardStack[0] === index 
                      ? 'bg-gray-900 scale-125 w-4' 
                      : 'bg-gray-400 hover:bg-gray-600'
                    }
                  `}
                  aria-label={`Go to ${categoryItem[index].gender}`}
                />
              ))}
            </div>

            <button
              onClick={toggleAutoPlay}
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
              onClick={moveToNext}
              className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:scale-110 group"
              aria-label="Next collection"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full px-3 py-1 border border-white/20 z-10">
            <span className="text-white text-sm font-medium">
              {cardStack[0] + 1} / {categoryItem.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;