import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Truck } from "lucide-react";
import { calculateShippingPrice } from "@/features/checkout/utils/checkOutHelper";

interface ShippingOptionCardProps {
  option: {
    id: string;
    name: string;
    price: number;
    time: string;
    description: string;
  };
  isSelected: boolean;
  subtotal: number;
}

export const ShippingOptionCard = ({ 
  option, 
  isSelected, 
  subtotal 
}: ShippingOptionCardProps) => {
  const displayPrice = calculateShippingPrice(option.id, option.price, subtotal);

  return (
    <div
      className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 ${
        isSelected ? "border-black" : ""
      }`}
    >
      <RadioGroupItem value={option.id} id={option.id} />
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
};