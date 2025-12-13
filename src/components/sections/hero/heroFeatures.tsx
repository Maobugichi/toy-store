import { motion } from 'framer-motion';
import { FeatureCard, MobileFeatureCarousel } from '@/components/ui/features';
import { fadeInUp } from './animation';
import { HERO_FEATURES } from './constants';

export const HeroFeatures = () => {
  return (
    <motion.div
      {...fadeInUp(0.4)}
      className="relative px-6 sm:px-10 lg:px-16 pb-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {HERO_FEATURES.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <MobileFeatureCarousel features={HERO_FEATURES} />
        </div>
      </div>
    </motion.div>
  );
};