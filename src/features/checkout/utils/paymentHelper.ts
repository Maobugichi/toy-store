import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createElement } from 'react';

export const getPaymentStatusConfig = (paymentStatus: string) => {
  switch (paymentStatus) {
    case 'waiting':
      return {
        icon: createElement(Loader2, { className: 'h-5 w-5 animate-spin text-blue-500' }),
        color: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-700',
        label: 'Waiting for Payment'
      };
    case 'confirming':
      return {
        icon: createElement(Loader2, { className: 'h-5 w-5 animate-spin text-yellow-500' }),
        color: 'bg-yellow-50 border-yellow-200',
        textColor: 'text-yellow-700',
        label: 'Confirming Payment'
      };
    case 'confirmed':
    case 'finished':
      return {
        icon: createElement(CheckCircle2, { className: 'h-5 w-5 text-green-500' }),
        color: 'bg-green-50 border-green-200',
        textColor: 'text-green-700',
        label: 'Payment Complete'
      };
    case 'partially_paid':
      return {
        icon: createElement(AlertCircle, { className: 'h-5 w-5 text-yellow-500' }),
        color: 'bg-yellow-50 border-yellow-200',
        textColor: 'text-yellow-700',
        label: 'Partially Paid'
      };
    case 'expired':
      return {
        icon: createElement(AlertCircle, { className: 'h-5 w-5 text-red-500' }),
        color: 'bg-red-50 border-red-200',
        textColor: 'text-red-700',
        label: 'Payment Expired'
      };
    case 'failed':
      return {
        icon: createElement(AlertCircle, { className: 'h-5 w-5 text-red-500' }),
        color: 'bg-red-50 border-red-200',
        textColor: 'text-red-700',
        label: 'Payment Failed'
      };
    default:
      return {
        icon: createElement(Loader2, { className: 'h-5 w-5 animate-spin text-blue-500' }),
        color: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-700',
        label: 'Processing'
      };
  }
};

export const calculatePaymentProgress = (amountReceived: number, payAmount: number): number => {
  return payAmount > 0 ? (amountReceived / payAmount) * 100 : 0;
};

export const isPaymentComplete = (status: string): boolean => {
  return status === 'finished' || status === 'confirmed';
};

export const isPaymentExpiredOrFailed = (status: string): boolean => {
  return status === 'expired' || status === 'failed';
};