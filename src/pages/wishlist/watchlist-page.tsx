import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Trash2,
  Heart,
  ShoppingCart,
  ExternalLink,
  Sparkles,
  Loader2,
} from "lucide-react";
import api from "@/config/axios-config";
//import WatchHeader from "@/features/wishlist/components/wishlistDrawer/wishlistHeader";
import { useCart } from "@/hooks/useCart";
import { ClipLoader } from "react-spinners";
import { useWatchlists } from "../../components/refractored/watchlist/hook";


interface WatchlistItem {
  id: number;
  product_id: number;
  base_name:string
  name: string;
  price: string;
  image_url: any;
  added_at: string;
}

export default function WatchlistPage() {
  const queryClient = useQueryClient();
  const [selectedWatchlist, setSelectedWatchlist] = useState<number | null>(null);
  //const [newWatchlistName, setNewWatchlistName] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [deleteWatchlistId, setDeleteWatchlistId] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const { addItem , addingId } = useCart();
 
  const { data: watchlists, isLoading: loadingWatchlists } = useWatchlists();

  const { data: items, isLoading: loadingItems , error , isError } = useQuery({
    queryKey: ["watchlist-items", selectedWatchlist],
    queryFn: async () => {
      if (!selectedWatchlist) return [];
      const res = await api.get(`/api/watchlist/${selectedWatchlist}/items`);
      return res.data as WatchlistItem[];
    },
    enabled: !!selectedWatchlist,
  });

  if (isError) {
    console.log(error)
  }
 
  const deleteWatchlist = useMutation({
    mutationFn: async (watchlistId: number) => {
      await api.delete(`/api/watchlist/${watchlistId}`, {
        headers: { "x-requires-auth": true }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
      if (selectedWatchlist === deleteWatchlistId) {
        setSelectedWatchlist(null);
      }
      setDeleteWatchlistId(null);
      toast.success("Watchlist deleted");
    },
    onError: () => {
      toast.error("Failed to delete watchlist");
    },
  });

  
  const removeItem = useMutation({
    mutationFn: async ({ watchlistId, productId }: { watchlistId: number; productId: number }) => {
      setRemovingId(productId);
      await api.delete(`/api/watchlist/${watchlistId}/items/${productId}`, {
        headers: { "x-requires-auth": true }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist-items", selectedWatchlist] });
      toast.success("Item removed from watchlist");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
    onSettled: () => {
    setRemovingId(null);
  },
  });

  if (watchlists && watchlists.length > 0 && !selectedWatchlist) {
    setSelectedWatchlist(watchlists[0].id);
  }

  const selectedWatchlistData = watchlists?.find((w:any) => w.id === selectedWatchlist);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {loadingWatchlists && (
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        )}

        
        {!loadingWatchlists && watchlists && watchlists.length > 0 && (
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {watchlists.map((watchlist:any) => (
              <button
                key={watchlist.id}
                onClick={() => setSelectedWatchlist(watchlist.id)}
                className={`px-6 md:py-2 p-1 rounded-4xl font-medium transition-all whitespace-nowrap ${
                  selectedWatchlist === watchlist.id
                    ? "bg-gradient-to-r from-gray-100 to-pink-100  text-black shadow-sm"
                    : "bg-white hover:bg-gray-50 text-gray-700 border"
                }`}
              >
                {watchlist.name}
              </button>
            ))}
          </div>
        )}

        {!loadingWatchlists && (!watchlists || watchlists.length === 0) && (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Sparkles className="w-16 h-16 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No watchlists yet</h3>
              <p className="text-gray-600 mb-4">Create your first watchlist to start tracking products</p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Watchlist
              </Button>
            </CardContent>
          </Card>
        )}

      
        {selectedWatchlistData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedWatchlistData.name}</h2>
                <p className="text-gray-600">
                  {items?.length || 0} item{items?.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteWatchlistId(selectedWatchlist)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Watchlist
              </Button>
            </div>

           
            {loadingItems && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-xl" />
                ))}
              </div>
            )}

           
            {!loadingItems && (!items || items.length === 0) && (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No items yet</h3>
                  <p className="text-gray-600">Start adding products to this watchlist</p>
                </CardContent>
              </Card>
            )}

            
            {!loadingItems && items && items.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-xl  transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative rounded-full">
                      <img
                        src={item.image_url || "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          removeItem.mutate({
                            watchlistId: selectedWatchlist!,
                            productId: item.product_id,
                          })
                        }
                      >
                       {removingId === item.product_id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-2xl">{item.name}</CardTitle>
                      <CardDescription>
                        Added {new Date(item.added_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold ">
                        ₦{item.price.toLocaleString()}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                       <Button 
                        onClick={ () => {
                        addItem({productId: item.id,
                        quantity: 1,
                        base_name: item.base_name,
                        price: item.price,
                        images: item.image_url});
                    }} 
                        className={`${addingId == item.id ? "bg-black/80" : "bg-black"} w-[90%] h-9 md:h-10`}
                        disabled={addingId == item.id}
                        style={{ pointerEvents: "auto" }}
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
                      <Button variant="outline" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

     
      <AlertDialog open={!!deleteWatchlistId} onOpenChange={() => setDeleteWatchlistId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this watchlist and all its items. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteWatchlistId && deleteWatchlist.mutate(deleteWatchlistId)}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteWatchlist.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}