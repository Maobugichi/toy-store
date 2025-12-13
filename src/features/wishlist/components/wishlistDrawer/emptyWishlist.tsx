import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Heart className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold mb-2">This watchlist is empty</h3>
      <p className="text-gray-600 mb-4">Start adding products you love!</p>
      <Button asChild>
        <Link to="/filter">Browse Products</Link>
      </Button>
    </div>
  );
};