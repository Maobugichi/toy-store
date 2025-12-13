import { useState } from 'react';

export const useProductQuantity = (maxStock: number) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(maxStock, prev + change)));
  };

  const incrementQuantity = () => handleQuantityChange(1);
  const decrementQuantity = () => handleQuantityChange(-1);

  return {
    quantity,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    canIncrement: quantity < maxStock,
    canDecrement: quantity > 1,
  };
};