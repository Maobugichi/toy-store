import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { WishlistHeader } from './wishlistHeader';
import { WishlistTabs } from './wishlistTabs';
import { WishlistContent } from './wishlistContent';
import { WishlistFooter } from './wishlistFooter';
import { useWishlists } from '../../hooks/useWishlist';
import { useWishlistsWithCounts } from '../../hooks/useWishlistsWithCounts';
import { useWishlistItems } from '../../hooks/useWishlistItems';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WishlistDrawer() {
  const [open, setOpen] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState<number | null>(null);

  const { data: wishlists } = useWishlists(open);
  const { data: wishlistsWithCounts } = useWishlistsWithCounts(wishlists, open);

  const defaultWishlistId =
    wishlistsWithCounts?.find((w) => w.itemCount! > 0)?.id ??
    wishlists?.[0]?.id ??
    null;

  const activeWishlistId:number | null = selectedWishlistId || defaultWishlistId;
  const { data: items, isLoading } = useWishlistItems(activeWishlistId, open);

  const activeWishlist = wishlists?.find((w) => w.id === activeWishlistId);
  const totalItems = items?.length || 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute rounded-full top-1 right-1 w-3 h-3 p-1 flex items-center justify-center text-[8px]"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg  flex flex-col">
        <WishlistHeader 
          totalItems={totalItems} 
          wishlistName={activeWishlist?.name} 
        />

        {wishlists && wishlists.length > 0 && (
          <WishlistTabs
            wishlists={wishlists}
            activeWishlistId={activeWishlistId}
            onSelectWishlist={setSelectedWishlistId}
          />
        )}
        <ScrollArea className='h-72'>
           <WishlistContent
            items={items}
            isLoading={isLoading}
            wishlistId={activeWishlistId!}
          />
        </ScrollArea>
        

        {totalItems > 0 && <WishlistFooter />}
      </SheetContent>
    </Sheet>
  );
}