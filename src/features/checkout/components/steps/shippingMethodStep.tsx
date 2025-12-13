import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { shippingMethodSchema } from "../../validation/checkoutSchema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Shield, ChevronRight } from "lucide-react";
import { ShippingOptionCard } from "./sections/shippingOptionCard";

type ShippingMethodData = z.infer<typeof shippingMethodSchema>;

interface ShippingMethodStepProps {
  subtotal: number;
  shippingOptions: any[];
  currentStep: number;
  onNext: (methodId: string) => void;
  //setCurrentStep: (n: number) => void;
  onBack: () => void;
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
}

const ShippingMethodStep = ({
  subtotal,
  shippingOptions,
  currentStep,
  onNext,
  onBack,
  selectedMethod,
  onMethodChange,
}: ShippingMethodStepProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ShippingMethodData>({
    resolver: zodResolver(shippingMethodSchema),
    defaultValues: { shippingMethod: selectedMethod },
  });

  const currentMethod = watch("shippingMethod");


  useEffect(() => {
    if (currentMethod) {
      onMethodChange(currentMethod);
    }
  }, [currentMethod, onMethodChange]);

  const onSubmit = (data: ShippingMethodData) => {
    if (data.shippingMethod) {
      onNext(data.shippingMethod);
    }
  };

  if (currentStep !== 2) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </div>
          Shipping Method
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <RadioGroup
            value={currentMethod}
            onValueChange={(val) => setValue("shippingMethod", val)}
          >
            {shippingOptions.map((option) => (
              <ShippingOptionCard
                key={option.id}
                option={option}
                isSelected={currentMethod === option.id}
                subtotal={subtotal}
              />
            ))}
          </RadioGroup>

          {errors.shippingMethod && (
            <p className="text-red-500 text-sm mt-2">
              {errors.shippingMethod.message}
            </p>
          )}

          <Alert className="mt-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              All shipments are insured and tracked. You'll receive tracking
              information via email or SMS.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row gap-2 justify-between pt-6">
            <Button variant="outline" onClick={onBack}>
              Back to Information
            </Button>
            <Button type="submit" className="bg-black hover:bg-gray-800">
              Continue to Payment
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShippingMethodStep;