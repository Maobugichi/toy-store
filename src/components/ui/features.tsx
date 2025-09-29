import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, Award } from 'lucide-react';
import  useEmblaCarousel  from 'embla-carousel-react';
import { useEffect, useCallback } from 'react';

const HeroFeature = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Autoplay functionality for mobile slideshow
  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => {
      autoplay();
    }, 3000); // Slide changes every 3 seconds
    return () => clearInterval(timer);
  }, [emblaApi, autoplay]);

  return (
    <div className="w-full mx-auto">
  
      <div className="md:hidden" ref={emblaRef}>
        <div className="flex">
          <div className="flex-[0_0_100%] min-w-0">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 mx-2  h-40">
              <CardContent className="pt-2">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Premium Quality</h3>
                    <p className="text-white/70 text-md">
                      Handpicked materials and crafted with attention to every detail.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-[0_0_100%] min-w-0">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 mx-2 h-40">
              <CardContent className="pt-2">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Trending Styles</h3>
                    <p className="text-white/70 text-md">
                      Stay ahead with the latest fashion trends and seasonal collections.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-[0_0_100%] min-w-0">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 mx-2 h-40">
              <CardContent className="pt-3">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Free Shipping</h3>
                    <p className="text-white/70 text-md">
                      Enjoy free worldwide shipping on orders above $100.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 gap-5">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 h-40">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Premium Quality</h3>
                <p className="text-white/70 text-md">
                  Handpicked materials and crafted with attention to every detail.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 h-40">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Trending Styles</h3>
                <p className="text-white/70 text-md">
                  Stay ahead with the latest fashion trends and seasonal collections.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105 h-40">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Free Shipping</h3>
                <p className="text-white/70 text-md">
                  Enjoy free worldwide shipping on orders above $100.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroFeature;