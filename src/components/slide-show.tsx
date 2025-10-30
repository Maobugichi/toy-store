import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./product-card"
import { Link } from "react-router-dom"
import { useCart } from "@/hooks/useCart"

const slides = Array.from({ length: 10 }, (_, i) => `Slide ${i + 1}`);

export function MultiCarousel({data}:any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0)
  

  const scrollProgressMotion = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgressMotion, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const { addItem , addingId } = useCart();
  
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
      scrollProgressMotion.set(progress * 100)
    }

    emblaApi.on("select", onSelect)
    emblaApi.on("scroll", onScroll)

    onSelect()
    onScroll()
  }, [emblaApi, scrollProgressMotion])

  return (
    <div className="font-sans w-full  mx-auto relative space-y-5">
     
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.slice(0,5).map((item:any,index:number) => (
            <div
              key={index}
              className="flex-[0_0_70%] md:flex-[0_0_28%]  p-2" 
            >
              <ProductCard 
                    key={item.id} 
                    id={item.id}
                    name={item.base_name}
                    price={item.price}
                    src={item.images?.primary}
                    addToCart={async () => {
                        addItem({productId: item.id,
                        quantity: 1,
                        base_name: item.base_name,
                        price: item.price,
                        images: item.images});
                    }}
                  extraClass="w-[80%] md:w-[17%]"
                  width="w-[20%]"
                  isAdding={addingId == item.id} className="h-fit md:h-[360px] pt-3 pb-4  items-center justify-center rounded-3xl border bg-white shadow-sm font-semibold" />
            </div>
          ))}
        </div>
      </div>

     
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          className="rounded-full bg-white border-black md:border-none h-10 absolute top-32 -left-4 md:-left-10"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={selectedIndex === 0}
        >
          <ChevronLeft/>
        </Button>
        <Button
          variant="outline"
          onClick={() => emblaApi?.scrollNext()}
          className="rounded-full border-black md:border-none h-10 absolute top-32 -right-4 md:-right-10"
          disabled={selectedIndex === slides.length - 1} 
        >
         <ChevronRight/>
        </Button>
      </div>

      
      <div className="md:w-1/2 grid space-y- h-20  place-items-center w-[90%] mx-auto ">
        {/* Custom progress bar with motion */}
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-black rounded-full"
            style={{ 
              width: useTransform(smoothProgress, (v) => `${v}%`)
            }}
          />
        </div>
        
        <Link className="flex  items-center justify-center py-3 bg-transparent px-3 hover:border text-black text-lg mx-auto mt-8" to='/filter'>
          View More 
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
       </Link>
      </div>
    
      
    </div>
  )
}