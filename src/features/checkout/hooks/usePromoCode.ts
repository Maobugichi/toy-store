import { useState } from 'react';

const VALID_PROMO_CODES: Record<string, number> = {
  save10: 0.1, // 10% discount
  save20: 0.2, // 20% discount
};

export const usePromoCode = () => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);

  const applyPromoCode = () => {
    const code = promoCode.toLowerCase();
    const discount = VALID_PROMO_CODES[code];

    if (discount) {
      setPromoApplied(true);
      setDiscountRate(discount);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoApplied(false);
    setDiscountRate(0);
  };

  const calculateDiscount = (subtotal: number) => {
    return promoApplied ? subtotal * discountRate : 0;
  };

  return {
    promoCode,
    promoApplied,
    discountRate,
    setPromoCode,
    applyPromoCode,
    removePromoCode,
    calculateDiscount,
  };
};