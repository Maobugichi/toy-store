import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/authContext";
import { useSubscribeNewsletter } from "./hook";
import { toast } from "sonner"; 
import { ClipLoader } from "react-spinners";


const newsletterSchema = z.object({
  email: z.email("Enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsLetter = () => {
  const { user } = useAuth();
  const { mutate, isPending } = useSubscribeNewsletter();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterFormData) => {
    mutate(
      { email: data.email, name: user?.name },
      {
        onSuccess: () => {
          toast.success("🎉 You’re subscribed to our newsletter!");
          reset();
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Subscription failed");
        },
      }
    );
  };

  return (
    <section className="font-family-sans py-10  border">
      <div className="flex flex-col md:flex-row md:h-[40vh] w-[90%] mx-auto items-center justify-center gap-5">
      
        <div className="h-[50%] flex flex-col gap-3 md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold md:mb-2 mb-3 font-family-heading">
            Come Ride with Us
          </h2>
          <p className="text-lg tracking-wide text-black/70 leading-7 md:text-xl w-[90%]">
            Be the first to get the latest updates on our promotion campaigns,
            products and services.
          </p>
        </div>

      
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-[45%] space-y-2"
    >
  <div className="relative w-full">
    <input
      type="email"
      placeholder="Enter your Email"
      className="w-full h-12 md:h-16 pl-4 md:pl-6 pr-32 md:pr-36 rounded-full border-2 border-gray-300 focus:border-black focus:outline-none text-base md:text-lg placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })}
      disabled={isPending}
    />
    
    <button
      type="submit"
      disabled={isPending}
      className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-2 md:py-3 px-4 md:px-6 text-sm md:text-base font-medium tracking-wide rounded-full transition-all duration-200 flex items-center justify-center gap-2 min-w-[100px] md:min-w-[120px]"
    >
      {isPending ? (
        <ClipLoader size={20} color="white" />
      ) : (
        "Subscribe"
      )}
    </button>
  </div>

  {errors.email && (
    <p className="text-red-500 text-sm pl-4">{errors.email.message}</p>
  )}
</form>
      </div>
    </section>
  );
};

export default NewsLetter;
