export const NewsletterHeading = () => {
  return (
    <div className="h-[50%] flex flex-col gap-3 [@media(width:1024px)_and_(height:1366px)]:w-full lg:w-1/2">
      <h2 className="text-4xl md:text-5xl font-bold md:mb-2 mb-3 font-family-heading">
        Come Ride with Us
      </h2>
      <p className="text-lg tracking-wide text-black/70 leading-7 md:text-xl w-[90%]">
        Be the first to get the latest updates on our promotion campaigns,
        products and services.
      </p>
    </div>
  );
};
