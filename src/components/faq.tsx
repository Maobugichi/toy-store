import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className=" border rounded-2xl  mx-auto">
      <AccordionItem className="py-5 px-10" value="item-1">
        <AccordionTrigger className="text-lg md:text-2xl [&>svg]:size-6">What is your return policy?</AccordionTrigger>
        <AccordionContent className="text-md md:text-xl">
          You can return the item within 30 days if unused and in original packaging.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className=" py-5 px-10" value="item-2">
        <AccordionTrigger className="text-lg md:text-2xl [&>svg]:size-6">Do you ship internationally?</AccordionTrigger>
        <AccordionContent className="text-md md:text-xl">
          Yes, we ship worldwide. Shipping times and rates vary by location.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className="py-5 px-10"  value="item-3">
        <AccordionTrigger className="text-lg md:text-2xl [&>svg]:size-6">How do I track my order?</AccordionTrigger>
        <AccordionContent className="text-md md:text-xl">
          Once shipped, you’ll receive a tracking number via email.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
