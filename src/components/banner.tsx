import { Button } from "./ui/button"
import place from "@/assets/banner.jpg"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

const Banner = () => {
    return(
        <motion.div
         className="md:h-[70vh] h-[90%] grid relative  place-items-center border w-full rounded-2xl mx-auto"
         initial={{ backgroundSize: '100% 100%' }}
         transition={{ duration: 1, ease: 'easeInOut',type:"tween" }}
         style={{backgroundImage:`url(${place})`,backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize: "contain"}}
        >
             <div className=" bg-black/30 inset-0 absolute z-10 rounded-2xl"></div>
             <div className="h-1/2 relative z-20 w-[90%] text-white  space-y-5">
                <h2 className="text-3xl font-family-heading font-bold md:text-5xl ">The Hood Tees</h2>
                <p className="text-2xl">Catch Our latest Drop...</p>
                <Link to="/details">
                    <Button className="h-12 px-5 hover:bg-white hover:text-black transition-colors">
                        Shop Now
                    </Button>
                  </Link>
            </div>
        </motion.div>
    )
}


export default Banner