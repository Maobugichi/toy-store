import { useRemoveWatchlistItem, useWatchlistItems, useWatchlists } from "@/components/refractored/watchlist/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { ExternalLink, Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import type { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";


interface LoaderProp {
    loadingItems:any
    items?:any
}


interface SelectedWatchlistDataProp {
    selectedWatchlist:number | null;
    removingId:number | null;
    setRemovingId:React.Dispatch<SetStateAction<number | null>>;
    setDeleteWatchlistId:React.Dispatch<SetStateAction<number | null>>;
}

const ItemsLoader = ({loadingItems}:LoaderProp) => {
    return(
        <>
           {loadingItems && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-xl" />
                ))}
              </div>
            )}
        </>
    )
}

const EmptyState = ({loadingItems , items}:LoaderProp) => {
    return(
        <>
           {!loadingItems && (!items || items.length === 0) && (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-16 space-y-6">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No items yet</h3>
                  <p className="text-gray-600">Start adding products to this watchlist</p>
                   <Button className="relative rounded-xl py-5">
                     <>
                      <span className="absolute inset-0 bg-black rounded-xl" />
                      <span className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/20 to-black/0 animate-shimmer" />
                     </>
                    <Link className=" relative z-10 text-white" to="/filter">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
        </>
    )
}


export const SelectedWatchlistData = ({selectedWatchlist , removingId , setRemovingId, setDeleteWatchlistId}:SelectedWatchlistDataProp) => {
  const {
    data: items,
    isLoading: loadingItems,
    } = useWatchlistItems(selectedWatchlist);
   const removeItem = useRemoveWatchlistItem({
    selectedWatchlist,
    onStart: setRemovingId,
    onEnd: () => setRemovingId(null),
  });
  

    const { data: watchlists, } = useWatchlists();  
    const selectedWatchlistData = watchlists?.find((w:any) => w.id === selectedWatchlist);
    const { addItem , addingId } = useCart();
    return(
        <>
          {selectedWatchlistData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedWatchlistData.name}</h2>
                <p className="text-gray-600">
                  {items?.length || 0} item{items?.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteWatchlistId(selectedWatchlist)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Watchlist
              </Button>
            </div>

           
            <ItemsLoader loadingItems={loadingItems}/>
           
            <EmptyState loadingItems={loadingItems} items={items}/>

         
              {!loadingItems && items && items.length > 0 && (
                <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-4">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className="group hover:shadow-xl p-4 rounded-3xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative rounded-full">
                        <img
                          src={item.image_url || "/placeholder.png"}
                          alt={item.name}
                          className="w-full h-40 object-fit border rounded-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            removeItem.mutate({
                              watchlistId: selectedWatchlist!,
                              productId: item.product_id,
                            })
                          }
                        >
                        {removingId === item.product_id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                              <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <CardHeader className="p-0">
                        <CardTitle className="line-clamp-2 text-2xl">{item.name}</CardTitle>
                        <CardDescription>
                          Added {new Date(item.added_at).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader >
                      <CardContent className="p-0">
                        <div className="text-xl tracking-wider font-bold ">
                         
                           {Number(item.price).toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                        })}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between p-0">
                        <Button 
                          onClick={ () => {
                          addItem({productId: item.id,
                          quantity: 1,
                          base_name: item.base_name,
                          price: item.price,
                          images: item.image_url});
                      }} 
                          className={`${addingId == item.id ? "bg-black/80" : "bg-black"} w-[80%] shrink relative  h-9 md:h-10`}
                          disabled={addingId == item.id}
                          style={{ pointerEvents: "auto" }}
                      >
                          {addingId == item.id ? (
                              <ClipLoader color="white" size={10} />
                          ) : (
                              <>
                                  <ShoppingCart className="relative z-10 w-4 h-4 md:w-10 md:h-10" />
                                  <span className="ml-2 text-md md:text-lg relative z-10">Add to Cart</span>
                                  <>
                                    <span className="absolute inset-0 bg-black rounded-xl" />
                                    <span className="absolute inset-0 bg-gradient-to-r from-black/0 via-white/20 to-black/0 animate-shimmer" />
                                  </>
                              </>
                               
                          )}
                        </Button>
                        <Button variant="outline" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
       
        )}
        </>
    )
}