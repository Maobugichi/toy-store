import { useQuery } from '@tanstack/react-query';
import { wishlistApi } from "../api/wishListApi";

export const useWishlistItems = (wishlistId: number | null, enabled = true) => {
  return useQuery({
    queryKey: ['wishlist-items', wishlistId],
    queryFn: () => wishlistApi.fetchWatchlistItems(wishlistId!),
    enabled: !!wishlistId && enabled,
  });
};