import { useWatchlists } from "@/components/refractored/watchlist/hook";
import { Skeleton } from "@/components/ui/skeleton"

export const WatchListLoader = () => {
      const {  isLoading: loadingWatchlists } = useWatchlists();
    return(
        <>
         {loadingWatchlists && (
            <div className="grid gap-4 md:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
            </div>
          )}
        </>
    )
}