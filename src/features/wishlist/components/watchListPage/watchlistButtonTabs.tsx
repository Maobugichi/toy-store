import { useWatchlists } from "@/components/refractored/watchlist/hook";
import type { SetStateAction } from "react";

interface WatchlistButtonTabsProps {
    selectedWatchlist:number | null;
    setSelectedWatchlist:React.Dispatch<SetStateAction<number | null>>
}

export const WatchlistButtonTabs:React.FC<WatchlistButtonTabsProps> = ({selectedWatchlist,setSelectedWatchlist}) => {
    const { data: watchlists, isLoading: loadingWatchlists } = useWatchlists();
    return(
        <>
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
        </>
    )
}