import { motion } from "motion/react";

interface SlideContentProps {
  message: string;
}

export const SlideContent = ({ message }: SlideContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        type: "spring",
        duration: 0.3,
        ease: "linear",
        stiffness: 100,
      }}
      className="slide"
    >
      <p className="lg:text-[12px] text-[10px] tracking-wider">
        {message}
      </p>
    </motion.div>
  );
};