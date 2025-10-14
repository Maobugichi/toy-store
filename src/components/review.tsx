import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Star, Edit, Trash2 } from "lucide-react";
import api from "@/lib/axios-config";
import { useNavigate } from "react-router-dom";

const reviewSchema = z.object({
  username: z.string().min(1, "Username required"),
  review: z.string().min(5, "Review must be at least 5 characters"),
  stars: z.number().min(1).max(5),
  product_id: z.number().min(1, "Product ID is required"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface Review {
  id: string;
  user_id: string;
  product_id: number;
  username: string;
  review: string;
  stars: number;
  created_at: string;
}

interface ReviewStats {
  avg_rating: number;
  review_count: number;
}

interface ReviewProps {
  productId: number;
  currentUserId?: string; // Optional: to show edit/delete buttons
}

const ReviewSection: React.FC<ReviewProps> = ({ productId, currentUserId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Fetch reviews and stats for specific product
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await api.get(`/api/reviews/product/${productId}`);
      return res.data as { reviews: Review[]; stats: ReviewStats };
    },
  });

  // Check if current user has already reviewed this product
  const { data: hasReviewed } = useQuery({
    queryKey: ["hasReviewed", productId],
    queryFn: async () => {
      if (!currentUserId) return { hasReviewed: false };
      const res = await api.get(`/api/reviews/check/${productId}`);
      return res.data;
    },
    enabled: !!currentUserId,
  });

 
  const createReview = useMutation({
    mutationFn: async (values: ReviewFormValues) => {
      const res = await api.post("/api/reviews", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["hasReviewed", productId] });
      form.reset();
      setOpen(false);
    },
    onError: (error: any) => {
     
      if(error?.response?.status === 401) {
        
         toast.error("user not authorized");
         setTimeout(() => {
           navigate('/login')
         }, 2000);
         return
      }
       const message = error?.response?.data?.error || "Failed to submit review.";
       toast.error(message);
    },
  });

 
  const updateReview = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<ReviewFormValues> }) => {
      const res = await api.put(`/api/reviews/${id}`, values);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      form.reset();
      setEditingReview(null);
      setOpen(false);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Failed to update review.";
      toast.error(message);
    },
  });

  
  const deleteReview = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["hasReviewed", productId] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Failed to delete review.";
      toast.error(message);
    },
  });

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      username: "",
      review: "",
      stars: 5,
      product_id: productId,
    },
  });

  const onSubmit = (values: ReviewFormValues) => {
    if (editingReview) {
      updateReview.mutate({
        id: editingReview.id,
        values: { review: values.review, stars: values.stars },
      });
    } else {
      createReview.mutate(values);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    form.setValue("username", review.username);
    form.setValue("review", review.review);
    form.setValue("stars", review.stars);
    form.setValue("product_id", review.product_id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview.mutate(id);
    }
  };

  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingReview(null);
      form.reset({ username: "", review: "", stars: 5, product_id: productId });
    }
  };

  const reviews = data?.reviews || [];
  const stats = data?.stats;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with Stats */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          {stats && stats.review_count > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(stats.avg_rating)
                        ? "fill-current"
                        : "fill-none"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">
                {stats.avg_rating.toFixed(1)} out of 5
              </span>
              <span className="text-muted-foreground">
                ({stats.review_count} {stats.review_count === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>

      
        {!hasReviewed?.hasReviewed && (
          <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button>Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingReview ? "Edit your review" : "Share your review"}
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <div onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
                  {!editingReview && (
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
                  )}

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
                    disabled={createReview.isPending || updateReview.isPending}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    {createReview.isPending || updateReview.isPending
                      ? "Submitting..."
                      : editingReview
                      ? "Update Review"
                      : "Submit Review"}
                  </Button>
                </div>
              </Form>
            </DialogContent>
          </Dialog>
        )}

        {hasReviewed?.hasReviewed && (
          <Alert className="max-w-xs">
            <AlertDescription>
              You've already reviewed this product.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Reviews List */}
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
        <div className="text-center py-12 text-muted-foreground border rounded-lg">
          <p className="text-lg">No reviews yet.</p>
          <p className="text-sm mt-1">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{r.username}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < r.stars ? "fill-current" : "fill-none"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-foreground ml-1">
                      {r.stars}/5
                    </span>
                  </div>
                </div>

                {/* Edit/Delete buttons for own reviews */}
                {currentUserId && r.user_id === currentUserId && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(r)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(r.id)}
                      disabled={deleteReview.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-foreground mb-3 leading-relaxed">{r.review}</p>

              <p className="text-sm text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} at{" "}
                {new Date(r.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;