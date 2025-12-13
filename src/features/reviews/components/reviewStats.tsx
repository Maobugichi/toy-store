import { Star } from "lucide-react";
import type { ReviewStats as Stats } from "../types/review.types";

interface ReviewStatsProps {
  stats: Stats;
}

export const ReviewStats = ({ stats }: ReviewStatsProps) => {
  return (
    <div className="flex md:items-center w-full flex-col md:flex-row gap-2 mt-1">
      <div className="flex items-center text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.round(stats.avg_rating) ? "fill-current" : "fill-none"
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
  );
};