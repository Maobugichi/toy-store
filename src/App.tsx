import Header from './components/header'
import './App.css'
import Hero from './components/hero'
import ModernNav from './components/sticky-nav'
import { MultiCarousel } from './components/slide-show'
import NewsLetter from './components/newsletter'
import Footer from './footer'
import CategorySection from './components/category-section'
import FaqSection from './components/faq-section'
import BannerSection from './components/banner-section'
import ScrollToTop from './scroll-to-top'

function App({data}:any) {
  return (
    <div className='overflow-hidden '>
      <ScrollToTop/>
      <Header/>
      <ModernNav/>
      <Hero/>
      <div className='w-[90%] mx-auto space-y-8 md:py-5  h-fit py-10 md:h-[100vh]  flex flex-col justify-center'>
        <h2 className='text-3xl font-semibold font-family-heading md:text-4xl'>Featured</h2>
         <MultiCarousel data={data}/>
      </div>
     
      <CategorySection data={data}/>
      <BannerSection/>
      <FaqSection/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default App
