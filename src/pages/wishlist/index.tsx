import { useEffect, useState } from "react";
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

  Loader2,
} from "lucide-react";
//import WatchHeader from "@/features/wishlist/components/wishlistDrawer/wishlistHeader";
import { useDeleteWatchlist, useWatchlistItems, useWatchlists } from "../../components/refractored/watchlist/hook";
import { WatchListLoader } from "@/features/wishlist/components/watchListPage/watchlistLoader";
import { WatchlistButtonTabs } from "@/features/wishlist/components/watchListPage/watchlistButtonTabs";
import { WatchlistEmptyState } from "@/features/wishlist/components/watchListPage/watchlistEmptyState";
import { SelectedWatchlistData } from "@/features/wishlist/components/watchListPage/selectedWatchlistData";
import { CreateWatchlistDialog } from "@/features/wishlist/components/watchListPage/watchlistDialog";

import { WishContextProvider } from "@/features/wishlist/wishlistContext";
import ModernWatchlistHeader from "@/features/wishlist/components/watchListPage/watchlistHeader";


export default function WatchlistPage() {
  const [selectedWatchlist, setSelectedWatchlist] = useState<number | null>(null);
  const [deleteWatchlistId, setDeleteWatchlistId] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  
 
  const { data: watchlists, } = useWatchlists();

  const { error , isError } = useWatchlistItems(selectedWatchlist);
  if (isError) {
    console.log(error)
  }
 
  const deleteWatchlist = useDeleteWatchlist({
    onSelectClear: () => {
      if (selectedWatchlist === deleteWatchlistId) {
        setSelectedWatchlist(null);
      }
      setDeleteWatchlistId(null);
    },
  });


  useEffect(() => {
    if (watchlists && watchlists.length > 0 && !selectedWatchlist) {
      setSelectedWatchlist(watchlists[0].id);
    }
  },[watchlists, selectedWatchlist])

  
  return (
    <div className="min-h-screen p-6 grid space-y-6">
      <WishContextProvider>
      <ModernWatchlistHeader/>

      <CreateWatchlistDialog />
      <div className="w-[95%] mx-auto">

        <WatchListLoader/>

        <WatchlistButtonTabs selectedWatchlist={selectedWatchlist} setSelectedWatchlist={setSelectedWatchlist}/>

        <WatchlistEmptyState />      
        <SelectedWatchlistData selectedWatchlist={selectedWatchlist} removingId={removingId} setRemovingId={setRemovingId} setDeleteWatchlistId={setDeleteWatchlistId}/>
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
      </WishContextProvider>
      
    </div>
  );
}