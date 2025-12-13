import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { reviewsApi } from "../api/reviewApi";
import type { ReviewFormValues } from "../types/review.types";

interface UseReviewMutationsOptions {
  onSuccess?: () => void;
}

export const useReviewMutations = (
  productId: number,
  options?: UseReviewMutationsOptions
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createReview = useMutation({
    mutationFn: (values: ReviewFormValues) => reviewsApi.createReview(values),
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["hasReviewed", productId] });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        toast.error("User not authorized");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }
      const message = error?.response?.data?.error || "Failed to submit review.";
      toast.error(message);
    },
  });

  const updateReview = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<ReviewFormValues> }) =>
      reviewsApi.updateReview(id, values),
    onSuccess: () => {
      toast.success("Review updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Failed to update review.";
      toast.error(message);
    },
  });

  const deleteReview = useMutation({
    mutationFn: (id: string) => reviewsApi.deleteReview(id),
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

  return { createReview, updateReview, deleteReview };
};