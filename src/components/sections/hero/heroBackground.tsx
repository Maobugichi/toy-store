import { motion, type MotionValue } from 'framer-motion';
import { HERO_IMAGE_URL } from './constants';

interface HeroBackgroundProps {
  y: MotionValue<string>;
  opacity: MotionValue<number>;
}

export const HeroBackground = ({ y, opacity }: HeroBackgroundProps) => {
  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      style={{
        y,
        opacity,
        height: '100vh',
        top: '-1vh',
      }}
    >
      <img
        src={HERO_IMAGE_URL}
        alt="Hero background"
        className="w-full h-full"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
    </motion.div>
  );
};