import { FAQAccordion } from "./faq"

const FaqSection = () => {
    return(
        <section className="py-10">
            <div className="w-[90%] mx-auto space-y-7">
                <h2 className="text-2xl w-full  md:text-4xl font-semibold">
                    Frequently Asked Questions
                </h2>
                <FAQAccordion/>
            </div>
        </section>
    )
}

export default FaqSection