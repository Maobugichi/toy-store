import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ShippingAddressSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const ShippingAddressSection = ({ register, errors }: ShippingAddressSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Shipping Address</h3>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input 
            id="firstName" 
            placeholder="John" 
            {...register("firstName")} 
            className="mt-1" 
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input 
            id="lastName" 
            placeholder="Doe" 
            {...register("lastName")} 
            className="mt-1" 
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>
          )}
        </div>
      </div>

      {/* Company */}
      <div className="mt-4">
        <Label htmlFor="company">Company (optional)</Label>
        <Input 
          id="company" 
          placeholder="Acme Inc." 
          {...register("company")} 
          className="mt-1" 
        />
      </div>

      {/* Address */}
      <div className="mt-4">
        <Label htmlFor="address">Address *</Label>
        <Input 
          id="address" 
          placeholder="123 Main Street" 
          {...register("address")} 
          className="mt-1" 
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>
        )}
      </div>

      {/* Apartment */}
      <div className="mt-4">
        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
        <Input 
          id="apartment" 
          placeholder="Apt 4B" 
          {...register("apartment")} 
          className="mt-1" 
        />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input 
            id="city" 
            placeholder="New York" 
            {...register("city")} 
            className="mt-1" 
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="state">State *</Label>
          <Input 
            id="state" 
            placeholder="NY" 
            {...register("state")} 
            className="mt-1" 
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="zip">ZIP Code *</Label>
          <Input 
            id="zip" 
            placeholder="10001" 
            {...register("zip")} 
            className="mt-1" 
          />
          {errors.zip && (
            <p className="text-red-500 text-sm mt-1">{errors.zip.message as string}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="mt-4">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          placeholder="+1 (555) 123-4567" 
          {...register("phone")} 
          className="mt-1" 
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>
        )}
      </div>
    </div>
  );
};