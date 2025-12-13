import { useQuery } from "@tanstack/react-query";
import { reviewsApi } from "../api/reviewApi";

export const useReviews = (productId: number, currentUserId?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewsApi.getProductReviews(productId),
  });

  const { data: hasReviewedData } = useQuery({
    queryKey: ["hasReviewed", productId],
    queryFn: () => reviewsApi.checkUserReviewed(productId),
    enabled: !!currentUserId,
  });

  return {
    reviews: data?.reviews || [],
    stats: data?.stats,
    hasReviewed: hasReviewedData?.hasReviewed || false,
    isLoading,
    isError,
    error,
  };
};