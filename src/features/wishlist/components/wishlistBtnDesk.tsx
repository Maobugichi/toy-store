import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Heart, Plus, Loader2 } from "lucide-react";
import { useWishlists, useAddToWatchlist } from "../hooks/useWishlist";
import { useNavigate } from "react-router-dom";

interface AddToWatchlistButtonDeskProps {
  productId: number;
  variant?: "default" | "link" | "secondary" | "destructive" | "outline" | "ghost"; 
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToWatchlistButtonDesk({ 
  productId, 
  variant = "outline", 
  size = "icon"
}: AddToWatchlistButtonDeskProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
 
  const { data: watchlists, isPending } = useWishlists();
  const addToWatchlist = useAddToWatchlist();

  const handleAdd = (watchlistId: number) => {
    addToWatchlist.mutate({ watchlistId, productId });
    setOpen(false);
  };

  // Loading state
  if (isPending) {
    return (
      <Button variant={variant} size={size} disabled>
        <Loader2 className="w-5 h-5 animate-spin" />
      </Button>
    );
  }

  // No watchlists
  if (!watchlists || watchlists.length === 0) {
    return (
      <Button 
        onClick={() => navigate("/watchlist")}
        variant={variant} 
        size={size}
      >
        <Heart className="w-5 h-5" />
      </Button>
    );
  }


  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Heart className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Watchlist</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {watchlists.map((watchlist: any) => (
          <DropdownMenuItem
            key={watchlist.id}
            onClick={() => handleAdd(watchlist.id)}
            disabled={addToWatchlist.isPending}
          >
            <Heart className="w-4 h-4 mr-2" />
            {watchlist.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/watchlist")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Watchlist
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
