import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./product-card"
import { Link } from "react-router-dom"
import { useCart } from "@/hooks/useCart"

const slides = Array.from({ length: 10 }, (_, i) => `Slide ${i + 1}`)

export function MultiCarousel({data}:any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { addItem , addingId } = useCart();
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
      setScrollProgress(progress * 100)
    }

    emblaApi.on("select", onSelect)
    emblaApi.on("scroll", onScroll)

    onSelect()
    onScroll()
  }, [emblaApi])

  return (
    <div className="font-sans w-full  mx-auto relative space-y-5">
     
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.slice(0,5).map((item:any,index:number) => (
            <div
              key={index}
              className="flex-[0_0_80%] md:flex-[0_0_28%]  p-2" 
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
                   
                  isAdding={addingId == item.id} className="h-[330px] items-center justify-center rounded-lg border bg-white shadow-sm font-semibold"/>
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

      
      <div className="md:w-1/2 w-[90%] mx-auto">
        <Progress value={scrollProgress} className="h-1" />
      </div>
    
      <Link className="flex md:w-[15%] items-center justify-center py-3 bg-transparent hover:border text-black text-lg mx-auto mt-8" to='/filter'>
          View More 
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
       
       </Link>
    </div>
  )
}
