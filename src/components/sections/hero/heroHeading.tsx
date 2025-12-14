import { motion } from 'framer-motion';
import { fadeInUp } from './animation';

export const HeroHeading = () => {
  return (
    <motion.div {...fadeInUp(0.1)} className="space-y-4">
     <h1 className="text-[clamp(2rem,12vw,8rem)] font-family-heading font-bold text-white leading-[1.1] tracking-tight whitespace-nowrap">
        <span className="inline-block">Time. Of. </span>
        <span className="inline-block text-white text-[1.1em] font-extrabold">
          YOU<span className="font-normal">th.</span>
        </span>
      </h1>
      <p className="text-[clamp(1rem,5vw,1.8rem)] text-white/70 font-light max-w-2xl">
        Shop style like no other. Discover timeless pieces that define your unique journey.
      </p>
    </motion.div>
  );
};