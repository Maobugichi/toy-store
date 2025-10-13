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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Star,
  Plus,
  Trash2,
  Heart,
  ShoppingCart,
  ExternalLink,
  Sparkles,
  Loader2,
} from "lucide-react";
import api from "@/lib/axios-config";

interface Watchlist {
  id: number;
  name: string;
  created_at: string;
}

interface WatchlistItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  added_at: string;
}

export default function WatchlistPage() {
  const queryClient = useQueryClient();
  const [selectedWatchlist, setSelectedWatchlist] = useState<number | null>(null);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteWatchlistId, setDeleteWatchlistId] = useState<number | null>(null);

 
  const { data: watchlists, isLoading: loadingWatchlists } = useQuery({
    queryKey: ["watchlists"],
    queryFn: async () => {
      const res = await api.get("/api/watchlist");
      return res.data as Watchlist[];
    },
  });


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

  // Create new watchlist
  const createWatchlist = useMutation({
    mutationFn: async (name: string) => {
      const res = await api.post("/api/watchlist", { name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
      setNewWatchlistName("");
      setIsCreateDialogOpen(false);
      toast.success("Watchlist created successfully!");
    },
    onError: () => {
      toast.error("Failed to create watchlist");
    },
  });

  // Delete watchlist
  const deleteWatchlist = useMutation({
    mutationFn: async (watchlistId: number) => {
      await api.delete(`/api/watchlist/${watchlistId}`);
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

  // Remove item from watchlist
  const removeItem = useMutation({
    mutationFn: async ({ watchlistId, productId }: { watchlistId: number; productId: number }) => {
      await api.delete(`/api/watchlist/${watchlistId}/items/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist-items", selectedWatchlist] });
      toast.success("Item removed from watchlist");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  // Auto-select first watchlist
  if (watchlists && watchlists.length > 0 && !selectedWatchlist) {
    setSelectedWatchlist(watchlists[0].id);
  }

  const selectedWatchlistData = watchlists?.find((w) => w.id === selectedWatchlist);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br  rounded-2xl">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold  ">
                  My Watchlists
                </h1>
                <p className="text-gray-600">Track your favorite products</p>
              </div>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="">
                  <Plus className="w-4 h-4 mr-2" />
                  New Watchlist
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Watchlist</DialogTitle>
                  <DialogDescription>
                    Give your watchlist a name to get started
                  </DialogDescription>
                </DialogHeader>
                <Input
                  placeholder="e.g., Birthday Gifts, Electronics"
                  value={newWatchlistName}
                  onChange={(e) => setNewWatchlistName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newWatchlistName.trim()) {
                      createWatchlist.mutate(newWatchlistName);
                    }
                  }}
                />
                <DialogFooter>
                  <Button
                    onClick={() => createWatchlist.mutate(newWatchlistName)}
                    disabled={!newWatchlistName.trim() || createWatchlist.isPending}
                  >
                    {createWatchlist.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {watchlists && (
            <Badge variant="secondary" className="text-sm">
              {watchlists.length} watchlist{watchlists.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>

        {/* Loading State */}
        {loadingWatchlists && (
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        )}

        
        {!loadingWatchlists && watchlists && watchlists.length > 0 && (
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {watchlists.map((watchlist) => (
              <button
                key={watchlist.id}
                onClick={() => setSelectedWatchlist(watchlist.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedWatchlist === watchlist.id
                    ? "bg-black text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 text-gray-700 border"
                }`}
              >
                {watchlist.name}
              </button>
            ))}
          </div>
        )}

        {/* Empty State - No Watchlists */}
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

        {/* Watchlist Items */}
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

            {/* Loading Items */}
            {loadingItems && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-xl" />
                ))}
              </div>
            )}

            {/* Empty Watchlist */}
            {!loadingItems && (!items || items.length === 0) && (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No items yet</h3>
                  <p className="text-gray-600">Start adding products to this watchlist</p>
                </CardContent>
              </Card>
            )}

            {/* Items Grid */}
            {!loadingItems && items && items.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
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
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{item.name}</CardTitle>
                      <CardDescription>
                        Added {new Date(item.added_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        ₦{item.price.toLocaleString()}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button className="flex-1" size="sm">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
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

      {/* Delete Confirmation Dialog */}
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