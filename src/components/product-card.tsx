import { ShoppingCart, Sparkle } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { FiInfo } from 'react-icons/fi';

const ProductCard = ({
    className, 
    src, 
    name, 
    price, 
    id, 
    addToCart, 
    isAdding, 
    
}: {
    className: string
    src: string
    name: string
    price: string
    id: number
    addToCart: any
    isAdding: boolean
    direction?: string
}) => {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div 
            id={id.toString()} 
            className={`${className} font-family-sans border rounded-2xl shadow p-2 md:p-3 space-y-2 md:space-y-5`}
        >
            
            <div className="h-[140px] md:h-[45%] w-full border rounded-sm overflow-hidden">
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
                    
                    
                  <Sparkle 
                    size={14} 
                    className="animate-pulse absolute right-2 hidden md:block" 
                    stroke="url(#sparkleGradient)" 
                    />
                    <svg width="0" height="0">
                    <defs>
                        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" /> {/* pink-400 */}
                        <stop offset="100%" stopColor="#a78bfa" /> {/* purple-500 */}
                        </linearGradient>
                    </defs>
                    </svg>

                    <Link to={`/product/${id}`} className="md:hidden flex items-center gap-1">
                        <FiInfo size={18}/>
                    </Link>
                </div>

               
                <div className="w-full">
                    <h4 className="text-sm md:text-lg lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                    </h4>
                    <p className="text-sm md:text-lg font-light mt-1">
                        {Number(price).toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                        })}
                    </p>
                </div>

               
                <div className="w-full flex flex-col md:flex-row items-center gap-2">
                    <Button 
                        className="hidden md:block w-full md:w-[80%] font-family-heading text-xs md:text-sm h-9 md:h-10" 
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
                        className={`${isAdding ? "bg-black/80" : "bg-black"} w-full md:w-[17%] h-9 md:h-10`}
                        disabled={isAdding}
                        style={{ pointerEvents: "auto" }}
                    >
                        {isAdding ? (
                            <ClipLoader color="white" size={10} />
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="md:hidden ml-2 text-xs">Add to Cart</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard