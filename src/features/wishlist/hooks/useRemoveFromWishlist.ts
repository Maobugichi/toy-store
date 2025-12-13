import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { wishlistApi } from '../api/wishListApi';

export const useRemoveFromWishlist = (wishlistId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      await wishlistApi.removeFromWatchlist(wishlistId, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-items', wishlistId] });
      queryClient.invalidateQueries({ queryKey: ['wishlists-counts'] });
      toast.success('Removed from wishlist');
    },
  });
};