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

export function WatchlistDrawer() {
  const [open, setOpen] = useState(false);
  const { addItem , addingId } = useCart();
  const queryClient = useQueryClient();


  const { data: watchlists } = useQuery({
    queryKey: ["watchlists"],
    queryFn: async () => {
      const res = await api.get("/api/watchlist");
      return res.data;
    },
  });

  const defaultWatchlistId = watchlists?.[0]?.id;

  
  const { data: items, isLoading } = useQuery({
    queryKey: ["watchlist-items", defaultWatchlistId],
    queryFn: async () => {
      if (!defaultWatchlistId) return [];
      const res = await api.get(`/api/watchlist/${defaultWatchlistId}/items`);
      return res.data;
    },
    enabled: !!defaultWatchlistId && open,
  });


  const removeItem = useMutation({
    mutationFn: async ({ productId }: { productId: number }) => {
      await api.delete(`/api/watchlist/${defaultWatchlistId}/items/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist-items", defaultWatchlistId] });
      toast.success("Removed from watchlist");
    },
  });

  const totalItems = items?.length || 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart  />
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
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>My Watchlist</SheetTitle>
          <SheetDescription>
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your watchlist
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)] mt-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}

          {!isLoading && (!items || items.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your watchlist is empty</h3>
              <p className="text-gray-600 mb-4">
                Start adding products you love!
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          )}

          <div className="space-y-4">
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
                  <p className="text-purple-600 font-bold text-lg mb-2">
                    ₦{item.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <Button  onClick={ () => {
                      addItem({productId: item.id,
                      quantity: 1,
                      base_name: item.base_name,
                      price: item.price,
                      images: item.image_url});
                    }} 
                      className={`${addingId == item.id ? "bg-black/80" : "bg-black"} w-[90%] h-9 md:h-10`}
                      disabled={addingId == item.id}
                     >
                       {addingId == item.id ? (
                            <ClipLoader color="white" size={10} />
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4 md:w-10 md:h-10" />
                                <span className="ml-2 text-md md:text-lg">Add to Cart</span>
                            </>
                        )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem.mutate({ productId: item.product_id })}
                      disabled={removeItem.isPending}
                    >
                      <Trash2 className="w-3 h-3" />
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

