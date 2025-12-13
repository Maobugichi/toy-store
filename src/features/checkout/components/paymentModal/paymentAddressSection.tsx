import { Copy, CheckCircle2 } from 'lucide-react';

interface PaymentAddressSectionProps {
  payAddress: string;
  copied: boolean;
  onCopy: (address: string) => void;
}

export const PaymentAddressSection = ({ 
  payAddress, 
  copied, 
  onCopy 
}: PaymentAddressSectionProps) => {
  return (
    <div className="space-y-2 bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200">
      <p className="text-sm text-slate-600 font-medium">Payment Address</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <code className="flex-1 text-xs bg-white px-3 py-2 rounded border border-slate-200 text-slate-800 font-mono break-all">
          {payAddress}
        </code>
        <button
          onClick={() => onCopy(payAddress)}
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
  );
};