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
      className="relative min-h-screen w-full bg-black overflow-hidden font-family-sans"
    >
      <HeroBackground y={y} opacity={opacity} />

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        <HeroContent />
        <HeroFeatures />
      </div>
    </section>
  );
};

export default Hero;