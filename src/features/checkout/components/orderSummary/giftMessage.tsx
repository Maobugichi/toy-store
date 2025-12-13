import { Label } from '@/components/ui/label';
import { Gift } from 'lucide-react';

interface GiftMessageProps {
  value: string;
  onChange: (message: string) => void;
}

export const GiftMessage = ({ value, onChange }: GiftMessageProps) => {
  return (
    <div className="pt-4">
      <Label htmlFor="giftMessage" className="text-sm flex items-center gap-2">
        <Gift className="h-4 w-4" />
        Gift Message (optional)
      </Label>
      <textarea
        id="giftMessage"
        className="w-full mt-2 p-2 border rounded-md text-sm"
        rows={3}
        placeholder="Add a personal message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};