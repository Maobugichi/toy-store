import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { fadeInUp } from './animation';

export const HeroActions = () => {
  const { navigateToFilter, handleNewArrivals } = useNavigation();

  return (
    <motion.div
      {...fadeInUp(0.2)}
      className="flex flex-col sm:flex-row gap-4 pt-4"
    >
      <button
        onClick={navigateToFilter}
        className="group relative px-8 py-4 bg-white text-black font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Explore Collection
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>

      <button
        onClick={handleNewArrivals}
        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        New Arrivals
      </button>
    </motion.div>
  );
};