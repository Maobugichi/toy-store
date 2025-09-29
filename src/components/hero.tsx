import React from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/up.png';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import HeroFeature from './ui/features';

const Hero: React.FC = () => {
  const stats = [
    { icon: Users, label: '10K+', sublabel: 'Happy Customers' },
    { icon: Award, label: '5 Star', sublabel: 'Rated Products' },
    { icon: TrendingUp, label: '99%', sublabel: 'Satisfaction' }
  ];

  return (
    <section className="relative h-fit py-10  w-full bg-red-500">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${heroBackground})`,
         
        }}
      />
      
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent top-0" />
     
      <div className="relative z-10 h-full flex flex-col justify-center px-6 space-y-5 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <Badge 
                variant="secondary" 
                className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                New Collection 2024
              </Badge>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Time. Of.{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    YOUth.
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90">
                  Shop Style Like No Other.
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
                Discover timeless pieces with clean lines and effortless style. 
                Curated collections that define your unique fashion journey.
              </p>

            
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/filter">
                  <Button 
                    size="lg" 
                    className="group h-14 px-8 bg-black text-white hover:text-black hover:bg-white/90 font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

            
              <div className="flex flex-wrap gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white/80">
                    <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-white">{stat.label}</div>
                      <div className="text-sm text-white/60">{stat.sublabel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            
          </div>
        </div>
        <HeroFeature/>
      </div>

    
    </section>
  );
};

export default Hero;