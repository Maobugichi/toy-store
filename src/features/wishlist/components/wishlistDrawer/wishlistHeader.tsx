import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface WishlistHeaderProps {
  totalItems: number;
  wishlistName?: string;
}

export const WishlistHeader = ({ totalItems, wishlistName }: WishlistHeaderProps) => {
  return (
    <SheetHeader>
      <SheetTitle>My Watchlists</SheetTitle>
      <SheetDescription>
        {totalItems} item{totalItems !== 1 ? 's' : ''} in {wishlistName || 'this wishlist'}
      </SheetDescription>
    </SheetHeader>
  );
};