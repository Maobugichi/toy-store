import { ShoppingCart } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { FiInfo } from 'react-icons/fi';
import { AddToWatchlistButton } from "./watchlist/watchlist-btn"
import { AddToWatchlistButtonDesk } from "./watchlist/desktopBtn"

const ProductCard = ({
    className, 
    src, 
    name, 
    price, 
    id, 
    addToCart, 
    isAdding, 
    extraClass='w-[78%] md:w-[17%]',
    width
    
}: {
    className: string
    src: string
    name: string
    price: string
    id: number
    addToCart: any
    isAdding: boolean
    direction?: string;
    extraClass?:string
    width:string
}) => {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div 
            id={id.toString()} 
            className={`${className} relative font-family-sans border shadow p-2 md:p-3 space-y-2 md:space-y-5`}
        >
            
            <div className="h-[140px] md:h-[45%] w-full border rounded-2xl overflow-hidden">
                <img 
                    src={src} 
                    className="h-full rounded-sm w-full object-fill"
                    alt={name}
                />
            </div>

            <div className="w-full space-y-2 md:space-y-3">
                
                <div className="flex w-full relative justify-between items-center">
                    <Badge className="rounded-full px-2 md:px-3 text-[9px] md:text-[10px] bg-gradient-to-r from-slate-100 to-slate-200 text-black">
                        TOY
                    </Badge>
                    <AddToWatchlistButtonDesk productId={id} variant="outline"/>
                    <Link to={`/product/${id}`} className="md:hidden flex items-center gap-1">
                        <FiInfo size={18}/>
                    </Link>
                </div>

               
                <div className="w-full">
                    <h4 className="text-sm md:text-lg lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                    </h4>
                    <p className="text-sm md:text-lg text-black/70  font-light mt-1">
                        {Number(price).toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                        })}
                    </p>
                </div>
                
                
               
                <div className="w-full flex  items-center gap-1">
    
                    <Button 
                        className="hidden md:block w-full md:w-[80%] font-family-heading text font-semibold md:text-md tracking-wider h-9 md:h-10" 
                        onClick={handleNavigate}
                    >
                        Buy Now
                    </Button>
                    
                    <Button 
                        onClick={() => addToCart({ 
                            productId: id, 
                            base_name: name, 
                            price, 
                            images: { primary: src } 
                        })} 
                        className={`${isAdding ? "bg-black/80" : "bg-black"} ${extraClass} rounded-xl  h-9 md:h-10`}
                        disabled={isAdding}
                        style={{ pointerEvents: "auto" }}
                    >
                        {isAdding ? (
                            <ClipLoader color="white" size={10} />
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="md:hidden ml-2 text-xs">Add</span>
                            </>
                        )}
                    </Button>
                  
                    <AddToWatchlistButton productId={id} variant="default" width={width} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard