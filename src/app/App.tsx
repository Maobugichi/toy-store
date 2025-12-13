import Header from '@/components/layout/header'
import '@/App.css'
import Hero from '@/components/sections/hero'
import { MultiCarousel } from '@/components/common/MultiCarousel'
import Newsletter from '@/features/newsletter/components/newsletter'
import Footer from '@/components/layout/footer'
import CategorySection from '@/components/sections/categorySection'
import useScrollToTop from '@/hooks/useScrollToTop'
import { useQuery } from '@tanstack/react-query'
import { productsQueryOptions } from '@/features/products/services/fetchProduts'
import FAQPage from '@/pages/faq'


function CarouselSkeleton() {
  useScrollToTop()
  return (
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex-shrink-0 w-64">
          <div className="bg-gray-200 animate-pulse rounded-lg h-64 mb-3" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

function CategorySkeleton() {
  return (
    <div className="w-[90%] mx-auto py-16">
      <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="space-y-3">
            <div className="h-48 bg-gray-200 animate-pulse rounded-lg" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const { data: products, isLoading } = useQuery(productsQueryOptions);

  return (
    <div className='overflow-hidden'>
      <Header/>
      <Hero/>
      <div className='w-[90%] mx-auto gap-4 h-fit py-16 flex flex-col justify-center'>
        <h2 className="text-4xl md:text-5xl md:mb-2 font-bold mb-4">Featured</h2>
        {isLoading ? (
          <CarouselSkeleton />
        ) : (
          <MultiCarousel data={products} isLoading={false}/>
        )}
      </div>
     
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <CategorySection data={products}/>
      )}
      
      <FAQPage/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default App