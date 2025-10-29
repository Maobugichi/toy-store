import api from "@/lib/axios-config";
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
  });
}

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

