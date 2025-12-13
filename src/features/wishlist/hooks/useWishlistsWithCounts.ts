import { useQuery } from '@tanstack/react-query';
import { wishlistApi } from "../api/wishListApi";
import type { Wishlist } from '../types/wishlistTypes';

export const useWishlistsWithCounts = (wishlists: Wishlist[] | undefined, enabled = true) => {
  return useQuery({
    queryKey: ['wishlists-counts', wishlists],
    queryFn: async () => {
      if (!wishlists) return [];
      
      const countsPromises = wishlists.map(async (w) => {
        try {
          const items = await wishlistApi.fetchWatchlistItems(w.id);
          return { ...w, itemCount: items.length };
        } catch {
          return { ...w, itemCount: 0 };
        }
      });
      
      return Promise.all(countsPromises);
    },
    enabled: !!wishlists && enabled,
  });
};