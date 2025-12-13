import type { RefObject } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

export const useHeroScroll = (sectionRef: RefObject<HTMLElement | null>) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3]);

  return { y, opacity, scrollYProgress, smoothProgress };
};