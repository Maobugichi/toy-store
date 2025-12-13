import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReviewForm } from "./reviewForm";
import type { Review } from "../types/review.types";
import type { UseMutationResult } from "@tanstack/react-query";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: number;
  editingReview: Review | null;
  createReview: UseMutationResult<any, any, any, any>;
  updateReview: UseMutationResult<any, any, any, any>;
}

export const ReviewDialog = ({
  open,
  onOpenChange,
  productId,
  editingReview,
  createReview,
  updateReview,
}: ReviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingReview ? "Edit your review" : "Share your review"}
          </DialogTitle>
        </DialogHeader>

        <ReviewForm
          productId={productId}
          editingReview={editingReview}
          createReview={createReview}
          updateReview={updateReview}
        />
      </DialogContent>
    </Dialog>
  );
};