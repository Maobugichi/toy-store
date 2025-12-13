import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {  Loader2, X,  } from 'lucide-react';
import { toast } from 'sonner';
import { usePaymentStatus } from '../../hooks/usePaymentStatus';
import { PaymentStatusBadge } from './paymentStatusBadge';
import { PaymentProgress } from './paymentProgress';
import { PaymentAddressSection } from './paymentAddressSection';
import { PaymentDetailsGrid } from './paymentDetailsGrid';
import { PaymentAlerts } from './paymentAlerts';

interface PaymentStatusModalProps {
  paymentData: any;
  onClose: () => void;
  isOpen: boolean;
  onPaymentComplete?: () => void;
}

const PaymentStatusModal = ({ 
  paymentData, 
  onClose, 
  isOpen,
  onPaymentComplete 
}: PaymentStatusModalProps) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const { data: statusData, isLoading: pollingStatus } = usePaymentStatus(
    paymentData?.payment_id,
    isOpen
  );

  const currentPaymentData = statusData || paymentData;


  useEffect(() => {
    if (statusData?.payment_status === 'finished' || statusData?.payment_status === 'confirmed') {
      toast.success('Payment confirmed!');
      onPaymentComplete?.();
    }
  }, [statusData?.payment_status, onPaymentComplete]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || !currentPaymentData?.expiration_estimate_date) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(currentPaymentData.expiration_estimate_date).getTime();
      const distance = expiry - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [currentPaymentData, isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Address copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !currentPaymentData) return null;

  const amountReceived = currentPaymentData.amount_received || 0;
  const progress = currentPaymentData.pay_amount > 0 
    ? (amountReceived / currentPaymentData.pay_amount) * 100 
    : 0;
  const isComplete = currentPaymentData.payment_status === 'finished' || 
                     currentPaymentData.payment_status === 'confirmed';
  const isExpiredOrFailed = currentPaymentData.payment_status === 'expired' || 
                            currentPaymentData.payment_status === 'failed';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <Card className="shadow-2xl border-slate-200 relative my-4">
          <button
            onClick={onClose}
            className="sticky top-4 right-4 ml-auto p-2 rounded-full hover:bg-slate-100 transition-colors bg-white shadow-md z-10"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>

          <CardHeader className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pr-10">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                  Payment Details
                </CardTitle>
                {pollingStatus && (
                  <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                )}
              </div>
              <PaymentStatusBadge paymentStatus={currentPaymentData.payment_status} />
            </div>
            <CardDescription className="text-sm sm:text-base text-slate-600">
              Order #{currentPaymentData.order_id}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 max-h-[50vh] overflow-y-auto px-6">
            <PaymentAlerts 
              paymentStatus={currentPaymentData.payment_status}
              timeLeft={timeLeft}
              isComplete={isComplete}
              isExpiredOrFailed={isExpiredOrFailed}
            />

            <div className="space-y-4">
              {/* Amount Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500 font-medium">Amount to Pay</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {currentPaymentData.pay_amount?.toLocaleString(undefined, { maximumFractionDigits: 8 }) || 'N/A'}
                  </p>
                  <p className="text-sm text-slate-600 uppercase font-semibold">
                    {currentPaymentData.pay_currency}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-slate-500 font-medium">USD Value</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    ${currentPaymentData.price_amount?.toLocaleString() || 'N/A'}
                  </p>
                  <p className="text-sm text-slate-600">
                    Network: {currentPaymentData.network?.toUpperCase() || 'N/A'}
                  </p>
                </div>
              </div>

              <PaymentProgress 
                progress={progress}
                amountReceived={amountReceived}
                payCurrency={currentPaymentData.pay_currency}
                isComplete={isComplete}
              />

              {!isComplete && !isExpiredOrFailed && currentPaymentData.pay_address && (
                <PaymentAddressSection 
                  payAddress={currentPaymentData.pay_address}
                  copied={copied}
                  onCopy={copyToClipboard}
                />
              )}

              <PaymentDetailsGrid 
                paymentId={currentPaymentData.payment_id}
                validUntil={currentPaymentData.valid_until}
                txId={currentPaymentData.tx_id}
              />
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-200 flex-col gap-3">
            {!isComplete && !isExpiredOrFailed && (
              <p className="text-xs text-slate-500 text-center w-full">
                Send exactly the required amount to the address above. Payment will be confirmed automatically.
              </p>
            )}
            <Button
              onClick={onClose}
              variant={isComplete ? "default" : "outline"}
              className={isComplete ? "w-full bg-green-600 hover:bg-green-700" : "w-full"}
            >
              {isComplete ? "Continue" : "Close"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentStatusModal;