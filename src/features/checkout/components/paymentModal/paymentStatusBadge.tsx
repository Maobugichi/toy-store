import { getPaymentStatusConfig } from '../../utils/paymentHelper';

interface PaymentStatusBadgeProps {
  paymentStatus: string;
}

export const PaymentStatusBadge = ({ paymentStatus }: PaymentStatusBadgeProps) => {
  const statusConfig = getPaymentStatusConfig(paymentStatus);

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border ${statusConfig.color} w-fit`}>
      {statusConfig.icon}
      <span className={`text-xs sm:text-sm font-medium ${statusConfig.textColor} whitespace-nowrap`}>
        {statusConfig.label}
      </span>
    </div>
  );
};