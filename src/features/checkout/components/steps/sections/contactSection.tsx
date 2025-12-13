import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const ContactSection = ({ register, errors }: ContactSectionProps) => {
  return (
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
        <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
      )}
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox id="newsletter" {...register("newsletter")} />
        <Label htmlFor="newsletter" className="text-sm text-gray-600">
          Subscribe to our newsletter for exclusive offers
        </Label>
      </div>
    </div>
  );
};