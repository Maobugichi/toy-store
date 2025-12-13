import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fadeInUp } from './animation';

export const HeroBadge = () => {
  return (
    <motion.div
      {...fadeInUp(0)}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
    >
      <Sparkles className="w-4 h-4 text-yellow-400" />
      <span className="text-white text-sm font-medium">New Collection 2025</span>
    </motion.div>
  );
};