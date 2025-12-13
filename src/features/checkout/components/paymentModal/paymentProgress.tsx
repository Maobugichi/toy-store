interface PaymentProgressProps {
  progress: number;
  amountReceived: number;
  payCurrency: string;
  isComplete: boolean;
}

export const PaymentProgress = ({ 
  progress, 
  amountReceived, 
  payCurrency, 
  isComplete 
}: PaymentProgressProps) => {
  return (
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
        Received: {amountReceived.toLocaleString(undefined, { maximumFractionDigits: 8 })} {payCurrency?.toUpperCase()}
      </p>
    </div>
  );
};