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
  variant?: "default" | "link" | "secondary" | "destructive" | "outline" | "ghost"; 
  size?: "default" | "sm" | "lg" | "icon";
  width:string
}

export function AddToWatchlistButton({ 
  productId, 
  variant = "outline", 
  size = "default" ,
  width
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
      <Button className="md:hidden" variant={variant} size={size} disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (!watchlists || watchlists.length === 0) {
    return (
      <Button 
      onClick={() => navigate("/watchlist")}
      className={`bg-blackmd:hidden rounded-xl ${width}  grid  items-center`} variant={variant} size={size}>
          <Heart size={14} 
            className="animate-pulse w-4 h-4" 
            stroke="url(#sparkleGradient)" 
            />
            <svg width="0" height="0">
            <defs>
                <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a78bfa" /> 
                </linearGradient>
            </defs>
            </svg> 
        </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="border-none shadow-none flex items-start" asChild>
        <Button className={`bg-black md:hidden  rounded-xl  ${width}  grid  items-center`} variant={variant} size={size}>
          <Heart size={14} 
            className="animate-pulse w-4 h-4" 
            stroke="url(#sparkleGradient)" 
            />
            <svg width="0" height="0">
            <defs>
                <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a78bfa" /> 
                </linearGradient>
            </defs>
            </svg> 
         
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