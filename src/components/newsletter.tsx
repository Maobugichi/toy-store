import { Input } from "./ui/input"

const NewsLetter = () => {
    return(
        <section className="font-family-sans py-10 border">
            <div className="flex flex-col md:flex-row md:h-[40vh] md:w-[98%] w-[90%] mx-auto items-center justify-center gap-5">
                <div className=" h-[50%] flex flex-col space-y-4 md:w-1/2">
                    <h2 className="font-family-heading font-semibold text-3xl md:text-4xl">Come Ride with Us</h2>
                    <p className="text-lg md:text-xl w-[90%]">Be the first to get the latest updates on our promotion campaigns, products and services.</p>
                </div>
                <form className="w-full md:w-[45%] h-[50%] space-x-2 space-y-5 md:space-y-0 flex flex-col md:flex-row items-center">
                    <Input className="md:w-[75%] h-12 md:h-16 placeholder:text-lg md:placeholder:text-xl" placeholder="Enter your Email"/>
                    <button className="bg-black w-full md:w-32 hover:bg-white hover:text-black transition-colors duration-300 hover:border-2 hover:border-black hover:shadow text-white py-2 md:py-4 px-7 text-lg rounded-md">
                        Subscribe
                    </button>
                </form>
            </div>
         </section>
    )
}

export default NewsLetter