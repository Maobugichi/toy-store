import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReviewStats } from "./reviewStats";
import type { ReviewStats as Stats } from "../types/review.types";

interface ReviewHeaderProps {
  stats?: Stats;
  hasReviewed?: boolean;
  onOpenDialog: () => void;
}

export const ReviewHeader = ({ stats, hasReviewed, onOpenDialog }: ReviewHeaderProps) => {
  return (
    <div className="flex w-full space-y-4 justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold py-4 text-nowrap">Customer Reviews</h2>
        {stats && stats.review_count > 0 && <ReviewStats stats={stats} />}
      </div>

      {!hasReviewed ? (
        <Button className="w-26" onClick={onOpenDialog}>
          Add Review
        </Button>
      ) : (
        <Alert className="max-w-xs">
          <AlertDescription>
            You've already reviewed this product.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};