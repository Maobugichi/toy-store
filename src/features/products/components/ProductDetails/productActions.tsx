import { ShoppingCart, Share2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AddToWatchlistButtonDesk } from '@/components/refractored/watchlist/desktopBtn';
import { AddToWatchlistButton } from '@/components/refractored/watchlist/watchlist-btn';

interface ProductActionsProps {
  productId: number;
  quantity: number;
  baseName: string;
  price: number;
  images: any;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}

export const ProductActions = ({
  productId,
  //quantity,
  //baseName,
  //price,
  //images,
  onAddToCart,
  isAddingToCart,
}: ProductActionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button 
          onClick={onAddToCart}
          size="lg" 
          className={`${
            isAddingToCart ? "bg-black/80" : "bg-black"
          } flex-1 h-14 text-lg font-semibold`}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <ClipLoader size={20} color="white" />
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" className="h-14 w-14 md:grid hidden p-0 rounded-xl">
          <AddToWatchlistButtonDesk productId={productId} variant="outline"/>
        </Button>
        <AddToWatchlistButton productId={productId} width='h-14 w-14 py-5'/>
        <Button variant="outline" size="lg" className="h-14 w-14 p-0 rounded-xl">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <Link to="/checkout">
        <Button className="w-full bg-black text-white py-5 h-14" size="lg">
          <Package className="w-10 h-10 mr-2" />
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
};