import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { WishlistItem } from './wishlistItem';
import { EmptyWishlist } from './emptyWishlist';
import type { WishlistItem as WishlistItemType } from '../../types/wishlistTypes';

interface WishlistContentProps {
  items?: WishlistItemType[];
  isLoading: boolean;
  wishlistId: number;
}

export const WishlistContent = ({ items, isLoading, wishlistId }: WishlistContentProps) => {
  return (
    <ScrollArea className="flex-1 mt-4">
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      )}

      {!isLoading && (!items || items.length === 0) && <EmptyWishlist />}

      <div className="space-y-4 px-5 pb-20">
        {items?.map((item) => (
          <WishlistItem key={item.id} item={item} wishlistId={wishlistId} />
        ))}
      </div>
    </ScrollArea>
  );
};