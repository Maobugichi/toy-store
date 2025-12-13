import { AnimatePresence } from "motion/react";
import { SlideContent } from "./slideContent";
import { NavigationArrow } from "./navigationArrow";
import { ANNOUNCEMENT_SLIDES } from "./constants";
import { useCarousel } from "@/hooks/useCarousel";

const TopSlide = () => {
   const { currentIndex, goToNext, goToPrevious } = useCarousel({
    itemCount: ANNOUNCEMENT_SLIDES.length,
    autoPlayInterval: 3000,
  });

 

  return (
    <div className="border-b bg-black h-11 text-white grid place-items-center">
      <div className="flex justify-between items-center w-[90%] lg:w-1/2 mx-auto">
        <NavigationArrow direction="left" onClick={goToPrevious} />
        
        <AnimatePresence mode="wait">
          <SlideContent
            key={currentIndex}
            message={ANNOUNCEMENT_SLIDES[currentIndex]}
          />
        </AnimatePresence>
        
        <NavigationArrow direction="right" onClick={goToNext} />
      </div>
    </div>
  );
};

export default TopSlide;