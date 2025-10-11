import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { shippingMethodSchema } from "../validation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Truck, Shield, ChevronRight } from "lucide-react";

type ShippingMethodData = z.infer<typeof shippingMethodSchema>;

interface StepTwoProps {
  subtotal: number;
  shippingOptions: any[];
  currentStep: number;
  setCurrentStep: (n: number) => void;
  shippingMethod: string;
  setShippingMethod: (id: string) => void;
}

const StepTwo = ({
  subtotal,
  shippingOptions,
  currentStep,
  setCurrentStep,
  shippingMethod,
  setShippingMethod,
}: StepTwoProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ShippingMethodData>({
    resolver: zodResolver(shippingMethodSchema),
    defaultValues: { shippingMethod },
  });

  const selectedMethod = watch("shippingMethod");

  // 🔁 Sync form state → parent state
  useEffect(() => {
    if (selectedMethod) {
      setShippingMethod(selectedMethod);
    }
  }, [selectedMethod, setShippingMethod]);

  const onSubmit = (data: ShippingMethodData) => {
    if (data.shippingMethod) {
      setShippingMethod(data.shippingMethod);
      setCurrentStep(3);
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
            value={selectedMethod}
            onValueChange={(val) => setValue("shippingMethod", val)}
          >
            {shippingOptions.map((option) => {
              const displayPrice =
                option.id === "standard" && subtotal >= 100000
                  ? "FREE"
                  : `₦${option.price.toLocaleString()}`;

              return (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 ${
                    selectedMethod === option.id ? "border-black" : ""
                  }`}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    // Don't use {...register()} here to avoid conflict
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={option.id}
                        className="font-medium cursor-pointer"
                      >
                        {option.name}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Truck className="h-5 w-5 text-gray-400" />
                        <span className="font-semibold">{displayPrice}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{option.time}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>

          {errors.shippingMethod && (
            <p className="text-red-500 text-sm mt-2">
              {errors.shippingMethod.message}
            </p>
          )}

          <Alert className="mt-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              All shipments are insured and tracked. You’ll receive tracking
              information via email or SMS.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row gap-2 justify-between pt-6">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
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

export default StepTwo;
