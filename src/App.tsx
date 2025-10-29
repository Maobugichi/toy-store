import Header from './components/header'
import './App.css'
import Hero from './components/hero'
import ModernNav from './components/sticky-nav'
import { MultiCarousel } from './components/slide-show'
import NewsLetter from './components/newsletter/newsletter'
import Footer from './footer'
import CategorySection from './components/category-section'
import FaqSection from './components/faq-section'
import ScrollToTop from './scroll-to-top'

function App({data}:any) {
  return (
    <div className='overflow-hidden '>
      <ScrollToTop/>
      <Header/>
      <ModernNav/>
      <Hero/>
      <div className='w-[90%] mx-auto gap-4 h-fit py-16  flex flex-col justify-center'>
        <h2 className="text-4xl md:text-5xl md:mb-2 font-bold mb-4">Featured</h2>
         <MultiCarousel data={data}/>
      </div>
     
      <CategorySection data={data}/>
      <FaqSection/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default App
