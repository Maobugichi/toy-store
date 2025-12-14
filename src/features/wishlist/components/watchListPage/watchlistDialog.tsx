import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWatchlist } from "@/components/refractored/watchlist/hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWatchlistSchema, type CreateWatchlistData } from "../../validation";
import { useWishlistDialog } from "../../wishlistContext";



export const  CreateWatchlistDialog = () => {
 const createWatchlist = useCreateWatchlist();
 const { isCreateDialogOpen , setIsCreateDialogOpen } = useWishlistDialog();
const {
register,
handleSubmit,
formState: { errors },
reset,
} = useForm<CreateWatchlistData>({
resolver: zodResolver(createWatchlistSchema),
defaultValues: {
    name: "",
},
});

const onSubmit = (data: CreateWatchlistData) => {
    console.log(data)
  createWatchlist.mutate(data.name, {
    onSuccess: () => {
      reset();
      setIsCreateDialogOpen(false);
    },
  });
};

 return(
  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
  
  
  <DialogContent>
     
    <DialogHeader>
      <DialogTitle>Create new watchlist</DialogTitle>
      <DialogDescription>
        Give your watchlist a name.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Input
      placeholder="Tech Picks"
      {...register("name")}
    />
    {errors.name && (
      <p className="text-sm text-red-500">
        {errors.name.message}
      </p>
    )}

    <DialogFooter>
      <Button type="submit" disabled={createWatchlist.isPending}>
        {createWatchlist.isPending ? "Creating..." : "Create"}
      </Button>
    </DialogFooter>
    </form>
  </DialogContent>


</Dialog>

 )
}