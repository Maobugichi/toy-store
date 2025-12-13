import api from "@/config/axios-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { wishlistApi } from "../api/wishListApi";

export const useWishlists = (enabled = true) => {
  return useQuery({
    queryKey: ['wishlists'],
    queryFn: wishlistApi.fetchWatchlists,
    enabled,
  });
};


export function useAddToWatchlist() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ watchlistId, productId }: { watchlistId: number; productId: number }) => {
      const res = await api.post(`/api/watchlist/${watchlistId}/items`, { productId }, {
        headers: { "x-requires-auth": true }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
      queryClient.invalidateQueries({ queryKey: ["watchlist-items"] });
      toast.success("Added to watchlist!");
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        toast.info("Already in watchlist");
      } else if (error.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error("Failed to add to watchlist");
      }
    },
  });
}