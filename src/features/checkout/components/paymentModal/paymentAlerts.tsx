import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, PartyPopper, AlertCircle } from 'lucide-react';

interface PaymentAlertsProps {
  paymentStatus: string;
  timeLeft: string;
  isComplete: boolean;
  isExpiredOrFailed: boolean;
}

export const PaymentAlerts = ({ 
  paymentStatus, 
  timeLeft, 
  isComplete, 
  isExpiredOrFailed 
}: PaymentAlertsProps) => {
  return (
    <>
      {isComplete && (
        <Alert className="bg-green-50 border-green-200">
          <PartyPopper className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 font-medium">
            Payment successful! Your order has been confirmed.
          </AlertDescription>
        </Alert>
      )}

      {isExpiredOrFailed && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            {paymentStatus === 'expired' 
              ? 'Payment expired. Please create a new order.' 
              : 'Payment failed. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {!isComplete && !isExpiredOrFailed && (
        <Alert className="bg-amber-50 border-amber-200">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 font-medium">
            Time remaining: {timeLeft}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};