import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2 } from "lucide-react";
import { formatReviewDate } from "../utils/reviewHelpers";
import type { Review } from "../types/review.types";

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onEdit: (review: Review) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const ReviewCard = ({
  review,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
}: ReviewCardProps) => {
  const canModify = currentUserId && review.user_id === currentUserId;

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{review.username}</h3>
          <div className="flex items-center gap-1 text-yellow-500 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.stars ? "fill-current" : "fill-none"
                }`}
              />
            ))}
            <span className="text-sm text-foreground ml-1">
              {review.stars}/5
            </span>
          </div>
        </div>

        {canModify && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(review)}
              aria-label="Edit review"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(review.id)}
              disabled={isDeleting}
              aria-label="Delete review"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>

      <p className="text-foreground mb-3 leading-relaxed">{review.review}</p>

      <p className="text-sm text-muted-foreground">
        {formatReviewDate(review.created_at)}
      </p>
    </div>
  );
};