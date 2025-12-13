import { motion } from 'framer-motion';
import { fadeInUp } from './animation';

export const HeroHeading = () => {
  return (
    <motion.div {...fadeInUp(0.1)} className="space-y-4">
      <h1 className="text-5xl sm:text-6xl font-family-heading lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight">
        <span className="inline-block">Time. Of. </span>
        <span className="inline-block text-white text-[1.1em] font-extrabold">
          YOU<span className="font-normal">th.</span>
        </span>
      </h1>
      <p className="text-xl sm:text-2xl text-white/70 font-light max-w-2xl">
        Shop style like no other. Discover timeless pieces that define your unique journey.
      </p>
    </motion.div>
  );
};