import api from "@/lib/axios-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ watchlistId, productId }: { watchlistId: number; productId: number }) => {
      const res = await api.post(`/api/watchlist/${watchlistId}/items`, { productId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist-items"] });
      toast.success("Added to watchlist!");
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        toast.info("Already in watchlist");
      } else {
        toast.error("Failed to add to watchlist");
      }
    },
  });
}

// ==========================================
// FILE: components/AddToWatchlistButton.tsx
// ==========================================



// ==========================================
// USAGE EXAMPLES
// ==========================================

// Example 1: In a Product Card
/*
import { AddToWatchlistButton } from "@/components/AddToWatchlistButton";

function ProductCard({ product }) {
  return (
    <Card>
      <CardContent>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>₦{product.price}</p>
        
        <div className="flex gap-2">
          <Button>Add to Cart</Button>
          <AddToWatchlistButton productId={product.id} variant="outline" />
        </div>
      </CardContent>
    </Card>
  );
}
*/

// Example 2: On Product Detail Page
/*
function ProductDetailPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <div className="flex gap-4">
        <Button size="lg">Buy Now</Button>
        <Button size="lg" variant="outline">Add to Cart</Button>
        <AddToWatchlistButton productId={product.id} size="lg" />
      </div>
    </div>
  );
}
*/

// Example 3: Icon Only Button (for compact spaces)
/*
<AddToWatchlistButton 
  productId={product.id} 
  variant="ghost" 
  size="icon" 
/>
*/