import type { Wishlist } from "../../types/wishlistTypes";

interface WishlistTabsProps {
  wishlists: Wishlist[];
  activeWishlistId: number | null;
  onSelectWishlist: (id: number) => void;
}

export const WishlistTabs = ({
  wishlists,
  activeWishlistId,
  onSelectWishlist,
}: WishlistTabsProps) => {
  console.log(wishlists)
  return (
    <div className="flex px-5 gap-2 overflow-x-auto pb-2 scrollbar-hide mt-4">
      {wishlists.map((wishlist) => (
        <button
          key={wishlist.id}
          onClick={() => onSelectWishlist(wishlist.id)}
          className={`px-4 py-1  rounded-full font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 ${
            activeWishlistId === wishlist.id
              ? 'bg-gradient-to-r from-zinc-300 via-pink-100 to-zinc-300 text-zinc-900 shadow-sm'
              : 'bg-white hover:bg-gray-50 text-gray-700 border'
          }`}
        >
          {wishlist.name}
        </button>
      ))}
    </div>
  );
};