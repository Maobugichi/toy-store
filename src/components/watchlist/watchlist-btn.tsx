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
import { useWatchlists , useAddToWatchlist } from "./hook";
import { useNavigate } from "react-router-dom";


interface AddToWatchlistButtonProps {
  productId: number;
  variant?: "default" | "link" | "secondary" | "destructive" | "outline" | "ghost"; // Fixed: removed "icon"
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToWatchlistButton({ 
  productId, 
  variant = "outline", 
  size = "default" 
}: AddToWatchlistButtonProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: watchlists, isLoading } = useWatchlists();
  const addToWatchlist = useAddToWatchlist();

  const handleAdd = (watchlistId: number) => {
    addToWatchlist.mutate({ watchlistId, productId });
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Button variant={variant} size={size} disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (!watchlists || watchlists.length === 0) {
    return (
      <Button 
        variant={variant} 
        size={size}
        onClick={() => navigate("/watchlist")}
      >
        <Heart className="w-4 h-4 mr-2" />
        {size !== "icon" && "Create Watchlist"}
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Heart className="w-4 h-4 mr-2" />
          {size !== "icon" && "Add to Watchlist"}
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