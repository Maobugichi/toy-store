import { Separator } from '@/components/ui/separator';
import { formatPrice } from '../../utils/checkOutHelper';

interface PriceSummaryProps {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
}

export const PriceSummary = ({ subtotal, discount, shippingCost, total }: PriceSummaryProps) => {
  console.log(discount)
  console.log(shippingCost)
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount</span>
          <span>-{formatPrice(discount)}</span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>{shippingCost === 0 ? 'Free (₦0)' : formatPrice(shippingCost)}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
};