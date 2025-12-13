interface PaymentDetailsGridProps {
  paymentId: string;
  validUntil: string;
  txId?: string;
}

export const PaymentDetailsGrid = ({ 
  paymentId, 
  validUntil, 
  txId 
}: PaymentDetailsGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <p className="text-slate-500">Payment ID</p>
          <p className="text-slate-900 font-mono text-xs break-all">
            {paymentId}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-slate-500">Valid Until</p>
          <p className="text-slate-900">
            {validUntil 
              ? new Date(validUntil).toLocaleDateString()
              : 'N/A'}
          </p>
        </div>
      </div>

      {txId && (
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Transaction ID</p>
          <p className="text-xs text-slate-900 font-mono break-all">
            {txId}
          </p>
        </div>
      )}
    </>
  );
};