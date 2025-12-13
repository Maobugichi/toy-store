import { HeroBadge } from './heroBadge';
import { HeroHeading } from './heroHeading';
import { HeroActions } from './heroActions';
//import { HeroSocialProof } from './heroSocialProof';

export const HeroContent = () => {
  return (
    <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-16 pt-20 pb-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl space-y-8">
          <HeroBadge />
          <HeroHeading />
          <HeroActions />
        
        </div>
      </div>
    </div>
  );
};