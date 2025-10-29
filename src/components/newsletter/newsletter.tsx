import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
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
    <section className="font-family-sans py-10 border">
      <div className="flex flex-col md:flex-row md:h-[40vh] md:w-[98%] w-[90%] mx-auto items-center justify-center gap-5">
      
        <div className="h-[50%] flex flex-col gap-3 md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold md:mb-2 mb-3 font-family-heading">
            Come Ride with Us
          </h2>
          <p className="text-lg tracking-wide md:text-xl w-[90%]">
            Be the first to get the latest updates on our promotion campaigns,
            products and services.
          </p>
        </div>

      
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[45%] h-[50%] space-x-2 space-y-5 md:space-y-0 flex flex-col md:flex-row items-center"
        >
          <div className="w-full md:w-[75%]">
            <Input
              type="email"
              placeholder="Enter your Email"
              className="h-12 md:h-16 placeholder:text-lg md:placeholder:text-xl"
              {...register("email")}
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-black  w-full md:w-32 hover:bg-white hover:text-black transition-colors duration-300 hover:border-2 hover:border-black hover:shadow text-white py-2 md:py-4 px-7 text-lg tracking-wider rounded-md flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <ClipLoader className="text-white"/>
                
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
