import { Heart, Sparkles } from "lucide-react";
import { WatchlistDialogTrigger } from "./watchlistDialogTrigger";

export default function ModernWatchlistHeader() {
  return (
    <div className="flex items-center justify-between h-16 sm:h-20 border-b bg-gradient-to-r from-background to-muted/20 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <Heart className="w-20 h-14 md:w-10 md:h-10 text-red-500 fill-red-500" />
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 absolute top-2 right-2 md:-top-1 md:-right-1 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl hidden md:block sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Your Watchlist
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
            Track your favorite picks
          </p>
        </div>
      </div>
      <WatchlistDialogTrigger />
    </div>
  );
}