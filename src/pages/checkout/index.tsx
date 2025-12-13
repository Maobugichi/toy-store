import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { StepIndicator } from '@/features/checkout/components/stepIndicator';
import { OrderSummary } from '@/features/checkout/components/orderSummary';
import ShippingStep from '@/features/checkout/components/steps/shippingInfo';
import ShippingMethodStep from '@/features/checkout/components/steps/shippingMethodStep';
import PaymentStep from '@/features/checkout/components/steps/paymentStep';
import { useCheckout } from '@/features/checkout/hooks/useCheckout';
import { usePromoCode } from '@/features/checkout/hooks/usePromoCode';
import { calculateTotal } from '@/features/checkout/utils/checkOutHelper';

import { SHIPPING_OPTIONS } from '@/features/checkout/constants/shippingOptions';
import useScrollToTop from '@/hooks/useScrollToTop';

const CHECKOUT_STEPS = [
  { number: 1, title: 'Information', description: 'Contact & shipping' },
  { number: 2, title: 'Shipping', description: 'Delivery method' },
  { number: 3, title: 'Payment', description: 'Payment details' },
];

const CheckoutPage = () => {
  const { items, updatingId, updateItem, removeItem, totalQuantity } = useCart();
  const [giftMessage, setGiftMessage] = useState('');

  const {
    currentStep,
    shippingMethod,
    handleShippingSubmit,
    handleShippingMethodSubmit,
    handleShippingMethodChange,
    handleBack,
  } = useCheckout();

  const {
    promoCode,
    promoApplied,
    setPromoCode,
    applyPromoCode,
    calculateDiscount,
  } = usePromoCode();

  useScrollToTop();

  
  const subtotal = calculateTotal(items);
  const discount = calculateDiscount(subtotal);
  
  const selectedShipping = SHIPPING_OPTIONS.find(
    (option) => option.id === shippingMethod
    );
   
  const shippingCost = subtotal >= 100000 ? 0 : selectedShipping?.price ?? 5000;
  const total = subtotal - discount + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
          {items.length > 0 && (
            <Badge variant="secondary">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </div>

        <StepIndicator currentStep={currentStep} steps={CHECKOUT_STEPS} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ShippingStep currentStep={currentStep} onNext={handleShippingSubmit} />
            <ShippingMethodStep
              currentStep={currentStep}
              subtotal={subtotal}
              shippingOptions={SHIPPING_OPTIONS}
              selectedMethod={shippingMethod}
              onMethodChange={handleShippingMethodChange}
              onNext={handleShippingMethodSubmit}
              onBack={handleBack}
            />
            <PaymentStep
              subtotal={subtotal}
              currentStep={currentStep}
              onBack={handleBack}
              shippingCost={shippingCost}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              discount={discount}
              shippingCost={shippingCost}
              total={total}
              promoCode={promoCode}
              promoApplied={promoApplied}
              onPromoCodeChange={setPromoCode}
              onPromoApply={applyPromoCode}
              giftMessage={giftMessage}
              onGiftMessageChange={setGiftMessage}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
              updatingId={updatingId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;