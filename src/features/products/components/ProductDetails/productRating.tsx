import { Star } from 'lucide-react';

interface ProductRatingProps {
  avgRating?: number;
  reviewCount?: number;
}

export const ProductRating = ({ avgRating = 0, reviewCount = 0 }: ProductRatingProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${
              i < Math.floor(avgRating) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>
      <span className="font-semibold">
        {avgRating > 0 ? avgRating.toFixed(1) : 'No ratings yet'}
      </span>
      <span className="text-muted-foreground">
        ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
      </span>
    </div>
  );
};