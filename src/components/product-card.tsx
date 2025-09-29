import { ShoppingCart, Star } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const ProductCard = ({className, src , name , price, id}:{className:string , src:string , name:string, price:string,id:number}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };

    return(
        <div id={id.toString()} className={`${className} border rounded-2xl shadow  p-3 space-y-5`}>
            <div className="h-[45%] w-full border rounded-sm">
                <img src={src} className="h-full rounded-sm w-full object-fill"/>
            </div>

            <div className=" w-full  h-[50%] space-y-3">
                <div className="flex w-full justify-between">
                    
                        <Badge className="rounded-full px-3 text-[10px] bg-gradient-to-r from-slate-100 to-slate-200 text-black">
                            TOY
                        </Badge>
                    
                    <div className="flex items-center gap-1">
                        <Star size={18}/>
                        <span className="text-sm">4.56</span>
                    </div>
                </div>

                <div className="w-full">
                    <h4 className="text-xl">{name}</h4>
                    <p className="text-lg">{Number(price).toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                    })}</p>
                </div>


                <div className="w-full flex items-center gap-2">
                    <Button className="w-[80%]" onClick={handleNavigate}>
                        Buy Now
                    </Button>

                    <Button className="w-[17%]">
                        <ShoppingCart/>
                    </Button>
                </div>
             </div>
        </div>
    )
}

export default ProductCard