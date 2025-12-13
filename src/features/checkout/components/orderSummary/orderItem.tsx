import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

interface OrderItemProps {
  item: any;
  onUpdate: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  isUpdating: boolean;
}

export const OrderItem = ({ item, onUpdate, onRemove, isUpdating }: OrderItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <img
        src={item.images.primary}
        alt={item.base_name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.base_name}</h4>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border rounded">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onUpdate(item.id, Math.max(item.quantity - 1, 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {isUpdating ? <ClipLoader size={10} /> : item.quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onUpdate(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="text-right">
       <p className="font-medium">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(parseFloat(item.price) * item.quantity)}
        </p>
      </div>
    </div>
  );
};