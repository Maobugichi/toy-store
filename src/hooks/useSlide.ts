import { useEffect, useState } from "react"

export const useSlide = (slidesLength:number , interval = 3000) => {

    const [currentIndex,setCurrentIndex] = useState<number>(0)
         
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % slidesLength )
        },interval)
        return () => clearInterval(intervalId);
    },[slidesLength ,interval]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % slidesLength);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + slidesLength) % slidesLength);

    return { currentIndex , next , prev };
}