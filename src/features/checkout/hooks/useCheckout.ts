import { useState } from 'react';
import type { ShippingFormData, ShippingMethodData } from '../validation/checkoutSchema';

export const useCheckout = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string>('');

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handleShippingMethodSubmit = (methodId: string) => {
    setShippingMethod(methodId);
    setCurrentStep(3);
  };

  const handleShippingMethodChange = (methodId: string) => {
    setShippingMethod(methodId);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleComplete = async () => {
    console.log('Order completed:', { 
      shippingData, 
      shippingMethod 
    });
  };

  return {
    currentStep,
    shippingData,
    shippingMethod,
    handleShippingSubmit,
    handleShippingMethodSubmit,
    handleShippingMethodChange,
    handleBack,
    handleComplete,
    setCurrentStep
  };
};