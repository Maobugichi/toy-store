import { motion, useTransform, type MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CarouselProgressProps {
  smoothProgress: MotionValue<number>;
}

export function CarouselProgress({ smoothProgress }: CarouselProgressProps) {
  return (
    <div className="md:w-1/2 grid space-y- h-20 place-items-center w-[90%] mx-auto">
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-black rounded-full"
          style={{
            width: useTransform(smoothProgress, (v) => `${v}%`),
          }}
        />
      </div>

      <Link
        className="flex items-center justify-center py-3 bg-transparent px-3 hover:border text-black text-lg mx-auto mt-8"
        to="/filter"
      >
        View More
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}