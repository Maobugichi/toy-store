import { NewsletterHeading } from './newsletterHeading';
import { NewsletterForm } from './newsLetterForm';

const Newsletter = () => {
  return (
    <section className="font-family-sans py-10 [@media(width:1024px)_and_(height:1366px)]:py-20 border">
      <div className="flex flex-col [@media(width:1024px)_and_(height:1366px)]:flex-col [@media(width:1024px)_and_(height:1366px)]:h-fit lg:flex-row lg:h-[40vh] w-[90%] mx-auto items-center justify-center gap-5">
        <NewsletterHeading />
        <NewsletterForm />
      </div>
    </section>
  );
};

export default Newsletter;