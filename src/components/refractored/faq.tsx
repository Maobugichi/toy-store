import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="border rounded-3xl mx-auto w-full">
      <AccordionItem className="py-5 px-6 md:px-10" value="item-1">
        <AccordionTrigger className=" text-[clamp(1.2rem,2.5vw,1.5rem)] md:text-[clamp(1.5rem,2vw,2xl)] [&>svg]:size-6 whitespace-nowrap tracking-wider overflow-hidden text-ellipsis">
          What is your return policy?
        </AccordionTrigger>
        <AccordionContent className="tracking-wide text-black/70  text-[clamp(0.9rem,1.5vw,0.25rem)] md:text-xl">
          You can return the item within 30 days if unused and in original packaging.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className="py-5 px-6 md:px-10" value="item-2">
        <AccordionTrigger className=" text-[clamp(1.2rem,2.5vw,1.5rem)] md:text-[clamp(1.5rem,2vw,2xl)] [&>svg]:size-6 whitespace-nowrap tracking-wider  overflow-hidden text-ellipsis">
          Do you ship internationally?
        </AccordionTrigger>
        <AccordionContent className="tracking-wide text-[clamp(0.9rem,2vw,1.25rem)] text-black/70  md:text-xl">
          Yes, we ship worldwide. Shipping times and rates vary by location.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className="py-5 px-6 md:px-10" value="item-3">
        <AccordionTrigger className="text-[clamp(1.2rem,2.5vw,1.5rem)] md:text-[clamp(1.5rem,2vw,2xl)] [&>svg]:size-6 whitespace-nowrap tracking-wider  overflow-hidden text-ellipsis">
          How do I track my order?
        </AccordionTrigger>
        <AccordionContent className="tracking-wide text-[clamp(0.9rem,2vw,1.25rem)] text-black/70  md:text-xl">
          Once shipped, you’ll receive a tracking number via email.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
