import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';


const Category = ({ gender, src, isActive, onClick, collection , onNavigate }: any) => {
   const [filtered, setFiltered] = useState<any[]>([])
   const navigate = useNavigate()
 
  const handleNavigate = () => {
    onNavigate(false)
    const filteredItems = collection.filter(
      (item:any) =>
        item.name?.toLowerCase().includes(gender.toLowerCase()) ||
        item.base_name?.toLowerCase().includes(gender.toLowerCase()) ||
        item.description?.toLowerCase().includes(gender.toLowerCase())
    )
  
    setFiltered(filteredItems)
  }

  useEffect(() => {
    if (filtered.length > 0) {
      navigate("/filter", { state: { data: gender } })
    }
  }, [filtered])

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-out h-full"
    >
      <div className="absolute inset-0">
        <img
          src={src}
          alt={gender}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
        <div className={`transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
          <h3 className={`font-bold mb-2 transition-all duration-500 ${
            isActive ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
          }`}>
            {gender}
          </h3>
          <p className={`text-white/80 mb-4 transition-all duration-500 ${
            isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            Explore our curated collection
          </p>
          <Button 
            className={`flex items-center gap-2 bg-white text-black px-8 text-lg tracking-wide py-6 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 ${
              isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 pointer-events-none'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            } }
          >
            Shop Now
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Category