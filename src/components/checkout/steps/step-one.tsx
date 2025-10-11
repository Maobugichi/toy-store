import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "../validation"; // or same file
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type ShippingFormData = z.infer<typeof shippingSchema>;

const StepOne = ({ currentStep, setCurrentStep }: any) => {
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
    console.log("✅ Shipping Data:", data);
    setCurrentStep(2);
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
         
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="newsletter" {...register("newsletter")} />
              <Label htmlFor="newsletter" className="text-sm text-gray-600">
                Subscribe to our newsletter for exclusive offers
              </Label>
            </div>
          </div>

          <Separator />

          
          <div>
            <h3 className="font-semibold mb-4">Shipping Address</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="John" {...register("firstName")} className="mt-1" />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="Doe" {...register("lastName")} className="mt-1" />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="company">Company (optional)</Label>
              <Input id="company" placeholder="Acme Inc." {...register("company")} className="mt-1" />
            </div>

            <div className="mt-4">
              <Label htmlFor="address">Address *</Label>
              <Input id="address" placeholder="123 Main Street" {...register("address")} className="mt-1" />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="mt-4">
              <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
              <Input id="apartment" placeholder="Apt 4B" {...register("apartment")} className="mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="New York" {...register("city")} className="mt-1" />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input id="state" placeholder="NY" {...register("state")} className="mt-1" />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
              </div>

              <div>
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input id="zip" placeholder="10001" {...register("zip")} className="mt-1" />
                {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" {...register("phone")} className="mt-1" />
            </div>
          </div>

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

export default StepOne;
