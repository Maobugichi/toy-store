import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  Trash2,
  ShoppingCart,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/lib/axios-config";
import { useCart } from "@/hooks/useCart";
import { ClipLoader } from "react-spinners";

interface Watchlist {
  id: number;
  name: string;
  created_at: string;
}

export function WatchlistDrawer() {
  const [open, setOpen] = useState(false);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState<number | null>(null);
  const { addItem, addingId } = useCart();
  const queryClient = useQueryClient();

  // Fetch all watchlists with item counts
  const { data: watchlists } = useQuery({
    queryKey: ["watchlists"],
    queryFn: async () => {
      const res = await api.get("/api/watchlist");
      return res.data as Watchlist[];
    },
  });

  // Fetch item counts for all watchlists to find the first populated one
  const { data: watchlistsWithCounts } = useQuery({
    queryKey: ["watchlists-counts", watchlists],
    queryFn: async () => {
      if (!watchlists) return [];
      const countsPromises = watchlists.map(async (w) => {
        try {
          const res = await api.get(`/api/watchlist/${w.id}/items`);
          return { ...w, itemCount: res.data.length };
        } catch {
          return { ...w, itemCount: 0 };
        }
      });
      return Promise.all(countsPromises);
    },
    enabled: !!watchlists && open,
  });

  const defaultWatchlistId = watchlistsWithCounts?.find(w => w.itemCount > 0)?.id || watchlists?.[0]?.id;
  const activeWatchlistId = selectedWatchlistId || defaultWatchlistId;

 
  const { data: items, isLoading } = useQuery({
    queryKey: ["watchlist-items", activeWatchlistId],
    queryFn: async () => {
      if (!activeWatchlistId) return [];
      const res = await api.get(`/api/watchlist/${activeWatchlistId}/items`);
      return res.data;
    },
    enabled: !!activeWatchlistId && open,
  });

  // Remove item mutation
  const removeItem = useMutation({
    mutationFn: async ({ productId }: { productId: number }) => {
      await api.delete(`/api/watchlist/${activeWatchlistId}/items/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist-items", activeWatchlistId] });
      toast.success("Removed from watchlist");
    },
  });

  const totalItems = items?.length || 0;

  return (
    <Sheet  open={open} onOpenChange={setOpen}>
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
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>My Watchlists</SheetTitle>
          <SheetDescription>
            {totalItems} item{totalItems !== 1 ? "s" : ""} in {watchlists?.find(w => w.id === activeWatchlistId)?.name || "this watchlist"}
          </SheetDescription>
        </SheetHeader>

       
        {watchlists && watchlists.length > 0 && (
          <div className="flex px-5 gap-2 overflow-x-auto pb-2 scrollbar-hide mt-4">
            {watchlists.map((watchlist) => (
              <button
                key={watchlist.id}
                onClick={() => setSelectedWatchlistId(watchlist.id)}
                className={`px-4 py-1 rounded-full font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                  activeWatchlistId === watchlist.id
                    ? "bg-gradient-to-r from-zinc-300 via-pink-100 to-zinc-300 text-zinc-900 shadow-sm"
                    : "bg-white hover:bg-gray-50 text-gray-700 border"
                }`}
              >
                {watchlist.name}
              </button>
            ))}
          </div>
        )}

        <ScrollArea className="flex-1 mt-4">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}

          {!isLoading && (!items || items.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">This watchlist is empty</h3>
              <p className="text-gray-600 mb-4">
                Start adding products you love!
              </p>
              <Button asChild>
                <Link to="/filter">Browse Products</Link>
              </Button>
            </div>
          )}

          <div className="space-y-4 px-5 pb-20">
            {items?.map((item: any) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <img
                  src={item.image_url || "/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-zinc-900 font-bold text-lg mb-2">
                    ₦{item.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        addItem({
                          productId: item.product_id,
                          quantity: 1,
                          base_name: item.base_name,
                          price: item.price,
                          images: item.image_url,
                        });
                      }}
                      size="sm"
                      className={`${addingId == item.product_id ? "bg-black/80" : "bg-black"} flex-1`}
                      disabled={addingId == item.product_id}
                    >
                      {addingId == item.product_id ? (
                        <ClipLoader color="white" size={10} />
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          <span className="text-xs">Add to Cart</span>
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem.mutate({ productId: item.product_id })}
                      disabled={removeItem.isPending}
                    >
                      {removeItem.isPending ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {totalItems > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
            <Button asChild className="w-full" size="lg">
              <Link to="/watchlist">
                View All Watchlists
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}