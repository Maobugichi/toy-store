import { Badge } from '@/components/ui/badge';
import { formatPrice , calculateDiscount } from '../../utils/productHelper';


interface ProductPricingProps {
  price: number;
  compareAtPrice?: number;
}

export const ProductPricing = ({ price, compareAtPrice }: ProductPricingProps) => {
  const { hasDiscount, discountPercentage } = calculateDiscount(price, compareAtPrice || null);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <div className="text-3xl font-bold text-foreground">
          {formatPrice(price)}
        </div>
        
        {hasDiscount && compareAtPrice && (
          <div className='flex flex-col'>
            <div className="text-xl text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </div>
            <Badge className="bg-red-500 text-white hover:bg-red-600">
              Save {discountPercentage}%
            </Badge>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Free shipping on orders over ₦100,000
      </p>
    </div>
  );
};