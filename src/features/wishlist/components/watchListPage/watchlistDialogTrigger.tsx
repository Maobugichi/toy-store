import { Button } from "@/components/ui/button"
import { useWishlistDialog } from "../../wishlistContext"
import { Plus } from "lucide-react";

export const WatchlistDialogTrigger = () => {
    const { setIsCreateDialogOpen } = useWishlistDialog();
    return(
        <Button className="relative overflow-hidden py-5 rounded-xl" variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
            <>
             <span className="absolute inset-0 bg-black rounded-" />
             <span className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/20 to-black/0 animate-shimmer" />
            </>
           
            <span className="relative z-10 text-white flex items-center gap-2"> <Plus/> New Watchlist</span>
        </Button>
    )
}