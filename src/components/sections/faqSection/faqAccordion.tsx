import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from './constants';

export const FAQAccordion = () => {
  return (
    <Accordion type="single" collapsible className="border rounded-3xl mx-auto w-full">
      {FAQ_ITEMS.map((faq, index) => (
        <AccordionItem
          key={faq.id}
          className="py-5 px-6 md:px-10"
          value={`item-${index + 1}`}
        >
          <AccordionTrigger className="text-[clamp(1.2rem,2.5vw,1.5rem)] md:text-[clamp(1.5rem,2vw,2xl)] [&>svg]:size-6 whitespace-nowrap tracking-wider overflow-hidden text-ellipsis">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="tracking-wide text-black/70 text-[clamp(0.9rem,1.5vw,0.25rem)] md:text-xl">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
