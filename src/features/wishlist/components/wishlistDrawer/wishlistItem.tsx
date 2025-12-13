import { ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useRemoveFromWishlist } from '../../hooks/useRemoveFromWishlist';
import { ClipLoader } from 'react-spinners';
import type { WishlistItem as WishlistItemType } from '../../types/wishlistTypes';

interface WishlistItemProps {
  item: WishlistItemType;
  wishlistId: number;
}

export const WishlistItem = ({ item, wishlistId }: WishlistItemProps) => {
  const { addItem, addingId } = useCart();
  const removeItem = useRemoveFromWishlist(wishlistId);

  const handleAddToCart = () => {
    addItem({
      productId: item.product_id,
      quantity: 1,
      base_name: item.base_name,
      price: item.price,
      images: item.image_url,
    });
  };

  const isAdding = addingId === item.product_id;
  const isRemoving = removeItem.isPending;

  return (
    <div className="flex gap-4 p-3 border rounded-lg hover:bg-gray-50 transition">
      <img
        src={item.image_url || '/placeholder.png'}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm line-clamp-2 mb-1">
          {item.name}
        </h4>
        <p className="text-zinc-900 font-bold text-lg mb-2">
          ₦{item.price.toLocaleString()}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`${isAdding ? 'bg-black/80' : 'bg-black'} flex-1`}
            disabled={isAdding}
          >
            {isAdding ? (
              <ClipLoader color="white" size={10} />
            ) : (
              <>
                <ShoppingCart className="w-3 h-3 mr-1" />
                <span className="text-xs">Add to Cart</span>
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => removeItem.mutate(item.product_id)}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Trash2 className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};