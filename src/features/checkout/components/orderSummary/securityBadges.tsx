import { Shield, Lock } from 'lucide-react';

export const SecurityBadges = () => {
  return (
    <div className="pt-4 space-y-2">
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Shield className="h-4 w-4 text-green-600" />
        <span>SSL encrypted checkout</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Lock className="h-4 w-4 text-purple-600" />
        <span>Secure payment processing</span>
      </div>
    </div>
  );
};