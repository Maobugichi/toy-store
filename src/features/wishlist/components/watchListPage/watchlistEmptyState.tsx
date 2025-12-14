import { useWatchlists } from "@/components/refractored/watchlist/hook";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Sparkles } from "lucide-react"
import { useWishlistDialog } from "../../wishlistContext";


export const WatchlistEmptyState = () => {
    const { data: watchlists, isLoading: loadingWatchlists } = useWatchlists();
    const { setIsCreateDialogOpen } = useWishlistDialog();
    return(
        <>
           {!loadingWatchlists && (!watchlists || watchlists.length === 0) && (
            <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-16">
                <Sparkles className="w-16 h-16 text-black mb-4" />
                <h3 className="text-xl font-semibold mb-2">No watchlists yet</h3>
                <p className="text-gray-600 mb-4">Create your first watchlist to start tracking products</p>
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-to-r from-black to-[#333]"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Watchlist
                </Button>
                </CardContent>
            </Card>
           )}
        </>
    )
}