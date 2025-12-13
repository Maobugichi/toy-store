import { NewsletterHeading } from './newsletterHeading';
import { NewsletterForm } from './newsLetterForm';

const Newsletter = () => {
  return (
    <section className="font-family-sans py-10 border">
      <div className="flex flex-col md:flex-row md:h-[40vh] w-[90%] mx-auto items-center justify-center gap-5">
        <NewsletterHeading />
        <NewsletterForm />
      </div>
    </section>
  );
};

export default Newsletter;