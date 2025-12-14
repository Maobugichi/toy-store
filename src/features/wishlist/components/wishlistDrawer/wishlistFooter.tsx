import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const WishlistFooter = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
      <Button  asChild className="w-full relative" size="lg">
        <Link to="/watchlist">
          <span className='relative z-10'>View All Watchlists</span>
           <>
              <span className="absolute inset-0 bg-black rounded-xl" />
              <span className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/20 to-black/0 animate-shimmer" />
            </>
          <ExternalLink className="relative z-10 w-4 h-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};