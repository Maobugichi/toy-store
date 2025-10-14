import  { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, Copy, CheckCircle2, AlertCircle, Loader2, X, PartyPopper } from 'lucide-react';
import api from '@/lib/axios-config';


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

  
  const { data: statusData, isLoading: pollingStatus } = useQuery({
    queryKey: ['paymentStatus', paymentData?.payment_id],
    queryFn: async () => {
      if (!paymentData?.payment_id) return null;
      const res = await api.post(`/api/payments/payment-status/${paymentData.payment_id}`);
      
      return res.data;
    },
    enabled: isOpen && !!paymentData?.payment_id,
    refetchInterval: 10000, 
    refetchIntervalInBackground: true,
    retry: 3,
    retryDelay: 2000,
  });

 
  const currentPaymentData = statusData || paymentData;

  
  useEffect(() => {
    if (statusData?.payment_status === 'finished' || statusData?.payment_status === 'confirmed') {
      toast.success('Payment confirmed! 🎉');
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

  const getStatusConfig = () => {
    switch (currentPaymentData?.payment_status) {
      case 'waiting':
        return {
          icon: <Loader2 className="h-5 w-5 animate-spin text-blue-500" />,
          color: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-700',
          label: 'Waiting for Payment'
        };
      case 'confirming':
        return {
          icon: <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />,
          color: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-700',
          label: 'Confirming Payment'
        };
      case 'confirmed':
      case 'finished':
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          color: 'bg-green-50 border-green-200',
          textColor: 'text-green-700',
          label: 'Payment Complete'
        };
      case 'partially_paid':
        return {
          icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
          color: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-700',
          label: 'Partially Paid'
        };
      case 'expired':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          color: 'bg-red-50 border-red-200',
          textColor: 'text-red-700',
          label: 'Payment Expired'
        };
      case 'failed':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          color: 'bg-red-50 border-red-200',
          textColor: 'text-red-700',
          label: 'Payment Failed'
        };
      default:
        return {
          icon: <Loader2 className="h-5 w-5 animate-spin text-blue-500" />,
          color: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-700',
          label: 'Processing'
        };
    }
  };

  if (!isOpen || !currentPaymentData) return null;

  const statusConfig = getStatusConfig();
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
              <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border ${statusConfig.color} w-fit`}>
                {statusConfig.icon}
                <span className={`text-xs sm:text-sm font-medium ${statusConfig.textColor} whitespace-nowrap`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>
            <CardDescription className="text-sm sm:text-base text-slate-600">
              Order #{currentPaymentData.order_id}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 max-h-[50vh] overflow-y-auto px-6">
            {/* Success Alert */}
            {isComplete && (
              <Alert className="bg-green-50 border-green-200">
                <PartyPopper className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 font-medium">
                  Payment successful! Your order has been confirmed.
                </AlertDescription>
              </Alert>
            )}

            {/* Expired/Failed Alert */}
            {isExpiredOrFailed && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  {currentPaymentData.payment_status === 'expired' 
                    ? 'Payment expired. Please create a new order.' 
                    : 'Payment failed. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Timer Alert (only show if not complete/expired/failed) */}
            {!isComplete && !isExpiredOrFailed && (
              <Alert className="bg-amber-50 border-amber-200">
                <Clock className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 font-medium">
                  Time remaining: {timeLeft}
                </AlertDescription>
              </Alert>
            )}

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

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Payment Progress</span>
                  <span className="text-slate-900 font-semibold">
                    {progress.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isComplete 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Received: {amountReceived.toLocaleString(undefined, { maximumFractionDigits: 8 })} {currentPaymentData.pay_currency?.toUpperCase()}
                </p>
              </div>

              {/* Payment Address (only show if not complete) */}
              {!isComplete && !isExpiredOrFailed && currentPaymentData.pay_address && (
                <div className="space-y-2 bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 font-medium">Payment Address</p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <code className="flex-1 text-xs bg-white px-3 py-2 rounded border border-slate-200 text-slate-800 font-mono break-all">
                      {currentPaymentData.pay_address}
                    </code>
                    <button
                      onClick={() => copyToClipboard(currentPaymentData.pay_address)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-slate-500">Payment ID</p>
                  <p className="text-slate-900 font-mono text-xs break-all">
                    {currentPaymentData.payment_id}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500">Valid Until</p>
                  <p className="text-slate-900">
                    {currentPaymentData.valid_until 
                      ? new Date(currentPaymentData.valid_until).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Transaction ID (if available) */}
              {currentPaymentData.tx_id && (
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Transaction ID</p>
                  <p className="text-xs text-slate-900 font-mono break-all">
                    {currentPaymentData.tx_id}
                  </p>
                </div>
              )}
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