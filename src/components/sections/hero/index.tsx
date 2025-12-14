import { useRef } from 'react';
import { HeroBackground } from './heroBackground';
import { HeroContent } from './heroContent';
import { HeroFeatures } from './heroFeatures';
import { useHeroScroll } from './useHeroScroll';

const Hero = () => {
  const sectionRef = useRef(null);
  const { y, opacity } = useHeroScroll(sectionRef);

  return (
    <section 
      ref={sectionRef} 
      className="relative [@media(min-width:400px)_and_(max-width:430px)]:h-[80vh]  w-full bg-black overflow-hidden font-family-sans"
    >
      <HeroBackground y={y} opacity={opacity} />

      <div className="relative z-10  flex flex-col justify-between">
        <HeroContent />
        <HeroFeatures />
      </div>
    </section>
  );
};

export default Hero;