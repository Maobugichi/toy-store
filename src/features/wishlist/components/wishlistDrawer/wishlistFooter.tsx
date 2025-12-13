import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const WishlistFooter = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
      <Button asChild className="w-full" size="lg">
        <Link to="/watchlist">
          View All Watchlists
          <ExternalLink className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};