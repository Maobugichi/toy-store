import {  useRef } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Award, Star } from 'lucide-react';
import { FeatureCard, MobileFeatureCarousel } from './ui/features';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

 
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3]);

  const features = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Handpicked materials'
    },
    {
      icon: TrendingUp,
      title: 'Trending Styles',
      description: 'Latest collections'
    },
    {
      icon: Award,
      title: 'Free Shipping',
      description: 'Orders above $100'
    }
  ];

  const handleExploreCollection = () => {
    navigate('/filter');
  };

  const handleNewArrivals = () => {
    navigate('/filter', { state: { filterType: 'newArrivals' } });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-black overflow-hidden font-family-sans">
     
      <motion.div 
        className="absolute inset-0 will-change-transform"
        style={{ 
          y,
          opacity,
          height: '100vh', 
          top: '-1vh' 
        }}
      >
        <img
          src="https://res.cloudinary.com/dao2a3ib4/image/upload/f_auto,q_auto,w_auto/v1759243127/toy-hero_jwodbh.jpg"
          alt="Hero background"
          className="w-full h-full "
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

     
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
      
        <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-16 pt-20 pb-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl space-y-8">
            
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">New Collection 2025</span>
              </motion.div>

             
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-5xl sm:text-6xl font-family-heading lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                  <span className="inline-block">Time. Of. </span>
                 <span className="inline-block text-white text-[1.1em] font-extrabold">
                    YOU<span className='font-normal'>th.</span>
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-white/70 font-light max-w-2xl">
                  Shop style like no other. Discover timeless pieces that define your unique journey.
                </p>
              </motion.div>

            
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button onClick={handleExploreCollection} className="group relative px-8 py-4 bg-white text-black font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button onClick={handleNewArrivals} className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                   New Arrivals
                </button>
              </motion.div>

             
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-6 pt-8"
              >
               <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1531384441138-2736e62e0919',
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df'
                ].map((img, i) => (
                  <img
                    key={i}
                    src={`${img}?w=80&h=80&fit=crop&crop=faces`}
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
            </div>
          </div>
        </div>

      
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative px-6 sm:px-10 lg:px-16 pb-8"
        >
          <div className="max-w-7xl mx-auto">
           
            <div className="hidden md:grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

         
            <div className="md:hidden">
              <MobileFeatureCarousel features={features} />
            </div>
          </div>
        </motion.div>

       
      </div>
    </section>
  );
};

export default Hero;