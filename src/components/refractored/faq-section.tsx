import { FAQAccordion } from "./faq"

const FaqSection = () => {
    return(
        <section className="py-10">
            <div className="w-[90%] mx-auto grid gap-6">
                <h2 className="text-4xl font-family-heading md:text-5xl font-bold md:mb-2 mb-3">
                    Frequently Asked Questions
                </h2>
                <FAQAccordion/>
            </div>
        </section>
    )
}

export default FaqSection