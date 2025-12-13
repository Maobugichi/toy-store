import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Tag } from 'lucide-react';

interface PromoCodeProps {
  code: string;
  isApplied: boolean;
  onChange: (code: string) => void;
  onApply: () => void;
}

export const PromoCode = ({ code, isApplied, onChange, onApply }: PromoCodeProps) => {
  return (
    <div>
      <div className="flex gap-2">
        <Input
          placeholder="Promo code"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          disabled={isApplied}
        />
        {!isApplied ? (
          <Button variant="outline" onClick={onApply}>
            Apply
          </Button>
        ) : (
          <Button variant="outline" className="bg-green-50 text-green-700">
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isApplied && (
        <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
          <Tag className="h-3 w-3" />
          {code.toUpperCase()} applied - 10% off
        </p>
      )}
    </div>
  );
};