import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type CategoryProps = {
    gender: string;
    src: string;
    essential?: any;
    essential2?: any;
}

const Category: React.FC<CategoryProps> = ({ gender, src, essential, essential2 }) => {
    const [data, setData] = useState<[]>([])
    const navigate = useNavigate()
    
    const handleNavigate = (e: any) => {
        if (e.target.parentNode.childNodes[0].innerText == "Men") {
            setData(essential);
        } else {
            setData(essential2)
        }
    }
    
    useEffect(() => {
        if (data.length !== 0) {
            navigate("/essentials/essentialSection/1", { state: { data: data } })
        }
    }, [data])
    
    return (
        <motion.div 
            className="group text-white h-[90%] lg:w-1/2 grid place-items-center rounded-md w-[95%] mx-auto lg:mx-0"
            initial={{ backgroundSize: '100% 100%' }}
            whileHover={{ backgroundSize: '110% 110%' }}
            transition={{ duration: 1, ease: 'easeInOut', type: "tween" }}
            style={{
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
        >
            <div className="grid place-items-center h-[20%]">
                <h3 className="text-3xl">{gender}</h3> 
                <motion.button 
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 20 }}
                    transition={{ duration: 0.5, ease: "linear", type: "spring", stiffness: 100 }}
                    onClick={handleNavigate}
                    className="block lg:hidden lg:group-hover:block w-[200px] border-white border-2 h-16"
                >
                    View Collection
                </motion.button>
            </div>
        </motion.div>
    )
}

export default Category