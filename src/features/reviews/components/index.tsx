import { useState } from "react";
import { ReviewHeader } from "./reviewHeader";
import { ReviewDialog } from "./reviewDialog";
import { ReviewList } from "./reviewList";
import { useReviews } from "../hooks/useReview";
import type { Review } from "../types/review.types";
import { useReviewMutations } from "../hooks/useReviewMutation";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewSectionProps {
  productId: number;
  currentUserId?: string;
}

export const ReviewSection = ({ productId, currentUserId }: ReviewSectionProps) => {
  const [open, setOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const { reviews, stats, hasReviewed, isLoading, isError, error } = useReviews(productId, currentUserId);
  
  const { createReview, updateReview, deleteReview } = useReviewMutations(productId, {
    onSuccess: () => {
      setOpen(false);
      setEditingReview(null);
    },
  });

  const handleEdit = (review: Review) => {
    setEditingReview(review);
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
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading reviews...
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load reviews. {error?.message || "Please try again later."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full mx-auto p-0">
      <ReviewHeader
        stats={stats}
        hasReviewed={hasReviewed}
        onOpenDialog={() => setOpen(true)}
      />

      <ReviewDialog
        open={open}
        onOpenChange={handleDialogClose}
        productId={productId}
        editingReview={editingReview}
        createReview={createReview}
        updateReview={updateReview}
      />

      <ReviewList
        reviews={reviews}
        currentUserId={currentUserId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={deleteReview.isPending}
      />
    </div>
  );
};