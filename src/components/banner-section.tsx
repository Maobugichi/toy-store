import Banner from "./banner"

const BannerSection = () => {
    return(
        <section className="h-[70vh] mt-20 md:mt-0 md:h-[110vh] grid place-items-center">
            <div className="w-[90%] h-[90%] space-y-10 flex flex-col justify-center">
                <h3 className="text-3xl font-family-heading font-semibold md:text-4xl">Don't Get Left Out</h3>
                <Banner/>
            </div>
        </section>
    )
}

export default BannerSection