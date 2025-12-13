import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "@/features/checkout/validation/checkoutSchema";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { ShippingAddressSection } from "./sections/shippingAddressSection";
import { ContactSection } from "./sections/contactSection";

type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingStepProps {
  currentStep: number;
  onNext: (data: ShippingFormData) => void;
}

const ShippingStep = ({ currentStep, onNext }: ShippingStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      newsletter: false,
    },
  });

  const onSubmit = (data: ShippingFormData) => {
   
    onNext(data);
  };

  if (currentStep !== 1) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
          Contact Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ContactSection register={register} errors={errors} />

          <Separator />

          <ShippingAddressSection register={register} errors={errors} />

          <div className="flex justify-end pt-6">
            <Button type="submit" className="bg-black hover:bg-gray-800">
              Continue to Shipping
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShippingStep;