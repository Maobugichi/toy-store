import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderItem } from './orderItem';
import { PromoCode } from './promoCode';
import { PriceSummary } from './priceSummary';
import { GiftMessage } from './giftMessage';
import { SecurityBadges } from './securityBadges';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderSummaryProps {
  items: any[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  promoCode: string;
  promoApplied: boolean;
  onPromoCodeChange: (code: string) => void;
  onPromoApply: () => void;
  giftMessage: string;
  onGiftMessageChange: (message: string) => void;
  onUpdateItem: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  updatingId: number | null;
}

export const OrderSummary = ({
  items,
  subtotal,
  discount,
  shippingCost,
  total,
  promoCode,
  promoApplied,
  onPromoCodeChange,
  onPromoApply,
  giftMessage,
  onGiftMessageChange,
  onUpdateItem,
  onRemoveItem,
  updatingId,
}: OrderSummaryProps) => {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="space-y-4 h-52">
          {items.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              onUpdate={onUpdateItem}
              onRemove={onRemoveItem}
              isUpdating={updatingId === item.id}
            />
          ))}
        </ScrollArea>

        <Separator />

        <PromoCode
          code={promoCode}
          isApplied={promoApplied}
          onChange={onPromoCodeChange}
          onApply={onPromoApply}
        />

        <Separator />

        <PriceSummary
          subtotal={subtotal}
          discount={discount}
          shippingCost={shippingCost}
          total={total}
        />

        <GiftMessage value={giftMessage} onChange={onGiftMessageChange} />

        <SecurityBadges />
      </CardContent>
    </Card>
  );
};