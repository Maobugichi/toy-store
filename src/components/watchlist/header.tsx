import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Star, Plus, Loader2, Bookmark } from "lucide-react";
import type { SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios-config";
import { toast } from "sonner";

interface Watchlist {
  id: number;
  name: string;
  created_at: string;
}

type WatchHeaderProp = {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  newWatchlistName: string;
  setNewWatchlistName: React.Dispatch<SetStateAction<string>>;
  watchlists?: Watchlist[];
};

const WatchHeader: React.FC<WatchHeaderProp> = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  newWatchlistName,
  setNewWatchlistName,
  watchlists,
}) => {
  const queryClient = useQueryClient();

  const createWatchlist = useMutation({
    mutationFn: async (name: string) => {
      const res = await api.post("/api/watchlists", { name });
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

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 hidden md:block bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <Star className="hidden md:block w-5 h-5 sm:w-6 sm:h-6 text-zinc-700 dark:text-zinc-300" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              My Watchlists
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Track your favorite products
            </p>
          </div>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-auto shrink-0 ">
              <Plus className="w-4 h-4 mr-2 hidden md:block" />
              <Bookmark className="md:hidden block"/>
              <span className="md:block hidden">New Watchlist</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
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
                className="w-full sm:w-auto"
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

      {watchlists && watchlists.length > 0 && (
        <Badge variant="secondary" className="text-xs sm:text-sm font-normal rounded-full mt-5">
          {watchlists.length} {watchlists.length === 1 ? "watchlist" : "watchlists"}
        </Badge>
      )}
    </div>
  );
};

export default WatchHeader;