import { ReviewCard } from "./reviewCard";
import type { Review } from "../types/review.types";

interface ReviewListProps {
  reviews: Review[];
  currentUserId?: string;
  onEdit: (review: Review) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const ReviewList = ({
  reviews,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
}: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground border rounded-lg">
        <p className="text-lg">No reviews yet.</p>
        <p className="text-sm mt-1">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};