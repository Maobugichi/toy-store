import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

export const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  canIncrement,
  canDecrement,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">Quantity:</span>
      <div className="flex items-center border rounded-lg">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onDecrement}
          disabled={!canDecrement}
          className="h-10 w-10 p-0"
        >
          -
        </Button>
        <span className="w-16 text-center font-semibold">{quantity}</span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onIncrement}
          disabled={!canIncrement}
          className="h-10 w-10 p-0"
        >
          +
        </Button>
      </div>
    </div>
  );
};