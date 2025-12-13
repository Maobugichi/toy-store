import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { reviewSchema } from "../validation/reviewSchema";
import type { ReviewFormValues, Review } from "../types/review.types";
import type { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";

interface ReviewFormProps {
  productId: number;
  editingReview: Review | null;
  createReview: UseMutationResult<any, any, any, any>;
  updateReview: UseMutationResult<any, any, any, any>;
}

export const ReviewForm = ({
  productId,
  editingReview,
  createReview,
  updateReview,
}: ReviewFormProps) => {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      username: "",
      review: "",
      stars: 5,
      product_id: productId,
    },
  });

  useEffect(() => {
    if (editingReview) {
      form.setValue("username", editingReview.username);
      form.setValue("review", editingReview.review);
      form.setValue("stars", editingReview.stars);
      form.setValue("product_id", editingReview.product_id);
    } else {
      form.reset({ username: "", review: "", stars: 5, product_id: productId });
    }
  }, [editingReview, form, productId]);

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

  const isSubmitting = createReview.isPending || updateReview.isPending;

  return (
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
          disabled={isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isSubmitting
            ? "Submitting..."
            : editingReview
            ? "Update Review"
            : "Submit Review"}
        </Button>
      </div>
    </Form>
  );
};