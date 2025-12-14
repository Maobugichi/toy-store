import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from './constants';

export const FAQAccordion = () => {
  return (
    <Accordion type="single" collapsible className="border rounded-3xl mx-auto w-full ">
      {FAQ_ITEMS.map((faq, index) => (
        <AccordionItem
          key={faq.id}
          className="py-5 px-6 md:px-10"
          value={`item-${index + 1}`}
        >
          <AccordionTrigger className="text-base md:text-xl lg:text-2xl [&>svg]:size-5 md:[&>svg]:size-6 tracking-wide text-left hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="tracking-wide text-black/70 text-sm md:text-base lg:text-lg pt-2">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};