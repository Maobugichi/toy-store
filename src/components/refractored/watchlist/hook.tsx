import api from "@/config/axios-config";
import type { WishlistItem } from "@/features/wishlist/types/wishlistTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export function useWatchlists() {
  return useQuery({
    queryKey: ["watchlists"],
    queryFn: async () => {
      const res = await api.get("/api/watchlist");
      return res.data;
    },
    refetchOnMount:false,
    refetchOnWindowFocus: false, 
  });
}

export const useWatchlistItems = (watchlistId?: number | null) => {
  return useQuery({
    queryKey: ["watchlist-items", watchlistId],

    queryFn: async (): Promise<WishlistItem[]> => {
      if (!watchlistId) return [];

      const res = await api.get(
        `/api/watchlist/${watchlistId}/items`
      );

      return res.data;
    },

    enabled: Boolean(watchlistId),
  });
};

export function useAddToWatchlist() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ watchlistId, productId }: { watchlistId: number; productId: number }) => {
      const res = await api.post(`/api/watchlist/${watchlistId}/items`, { productId },  {
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
      }  else if (error.response?.status == 401) {
         navigate('/login')
       } else {
        toast.error("Failed to add to watchlist");
      }
    },
  });
}

interface UseDeleteWatchlistProps {
  onSelectClear?: () => void;
}

export const useDeleteWatchlist = ({
  onSelectClear,
}: UseDeleteWatchlistProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (watchlistId: string | number) => {
      await api.delete(`/api/watchlist/${watchlistId}`, {
        headers: { "x-requires-auth": true },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
      onSelectClear?.();
      toast.success("Watchlist deleted");
    },

    onError: () => {
      toast.error("Failed to delete watchlist");
    },
  });
};


interface RemoveItemPayload {
  watchlistId: number;
  productId: number;
}

interface UseRemoveWatchlistItemOptions {
  selectedWatchlist?: number | null;
  onStart?: (productId: number) => void;
  onEnd?: () => void;
}

export const useRemoveWatchlistItem = ({
  selectedWatchlist,
  onStart,
  onEnd,
}: UseRemoveWatchlistItemOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ watchlistId, productId }: RemoveItemPayload) => {
      onStart?.(productId);

      await api.delete(
        `/api/watchlist/${watchlistId}/items/${productId}`,
        { headers: { "x-requires-auth": true } }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist-items", selectedWatchlist],
      });
      toast.success("Item removed from watchlist");
    },

    onError: () => {
      toast.error("Failed to remove item");
    },

    onSettled: () => {
      onEnd?.();
    },
  });
};

export const useCreateWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      await api.post(
        "/api/watchlist",
        { name },
        { headers: { "x-requires-auth": true } }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
      toast.success("Watchlist created");
    },

    onError: () => {
      toast.error("Failed to create watchlist");
    },
  });
};