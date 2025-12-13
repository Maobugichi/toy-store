import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeInUp } from './animation';
import { USER_AVATARS } from './constants';

export const HeroSocialProof = () => {
  return (
    <motion.div
      {...fadeInUp(0.3)}
      className="flex items-center gap-6 pt-8"
    >
      <div className="flex -space-x-3">
        {USER_AVATARS.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`User ${i + 1}`}
            className="w-10 h-10 rounded-full border-2 border-black object-cover"
          />
        ))}
      </div>
      
      <div className="text-white">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm text-white/70 mt-1">
          Loved by <span className="font-semibold text-white">YOU</span>
        </p>
      </div>
    </motion.div>
  );
};