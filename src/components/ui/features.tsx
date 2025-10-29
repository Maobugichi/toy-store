import { useEffect,useState } from 'react';




const FeatureCard = ({ icon: Icon, title, description }:any) => (
  <div className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-gradient-to-br from-white/20 to-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

const MobileFeatureCarousel = ({ features }:any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {features.map((feature:any, index:number) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
      
     
      <div className="flex justify-center gap-2 mt-4">
        {features.map((_, index:number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export { FeatureCard, MobileFeatureCarousel }