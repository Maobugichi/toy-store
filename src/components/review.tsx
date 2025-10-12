import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";


const API_BASE = import.meta.env.VITE_API_URL;

const reviewSchema = z.object({
  
  username: z.string().min(1, "Username required"),
  review: z.string().min(5, "Review must be at least 5 characters"),
  stars: z.number().min(1).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;


interface Review {
  id: string;
  user_id: string;
  username: string;
  review: string;
  stars: number;
  created_at: string;
}


interface ReviewProps {
    reviews:Review[],
    isLoading:boolean,
    error:any,
    isError:any
}


const ReviewSection:React.FC<ReviewProps> = ({reviews , isLoading , error , isError}) =>  {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);


  const createReview = useMutation({
    mutationFn: async (values: ReviewFormValues) => {
      const res = await axios.post(`${API_BASE}/api/reviews`, values , { withCredentials:true});
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      form.reset();
      setOpen(false);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to submit review.";
      toast.error(message);
    },
  });

  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { 
     
      username: "",
      review: "",
      stars: 5 
    },
  });

  const onSubmit = (values: ReviewFormValues) => {
    createReview.mutate(values);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Reviews</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Write a Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share your review</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-2"
              >
               
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your display name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your honest feedback..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Select
                          value={String(field.value)}
                          onValueChange={(v) => field.onChange(Number(v))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select stars" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={String(num)}>
                                {"⭐".repeat(num)} ({num} star{num > 1 ? "s" : ""})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createReview.isPending}
                >
                  {createReview.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

     
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading reviews...
        </div>
      ) : isError ? (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load reviews. {error?.message || "Please try again later."}
          </AlertDescription>
        </Alert>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No reviews yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{r.username}</h3>
                <div className="text-yellow-500 font-medium">
                  {"⭐".repeat(r.stars)} {r.stars}/5
                </div>
              </div>
              <p className="text-foreground mb-2">{r.review}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString()} at{" "}
                {new Date(r.created_at).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewSection