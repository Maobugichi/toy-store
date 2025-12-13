export interface PaymentData {
  payment_id: string;
  order_id: string;
  payment_status: 'waiting' | 'confirming' | 'confirmed' | 'finished' | 'partially_paid' | 'expired' | 'failed';
  pay_amount: number;
  pay_currency: string;
  price_amount: number;
  price_currency: string;
  pay_address: string;
  network: string;
  amount_received: number;
  expiration_estimate_date: string;
  valid_until: string;
  tx_id?: string;
}

export interface PaymentStatusModalProps {
  paymentData: PaymentData | null;
  onClose: () => void;
  isOpen: boolean;
  onPaymentComplete?: () => void;
}

export interface PaymentFormData {
  paymentMethod: string;
  payCurrency: string;
  saveInfo: boolean;
  sameAsShipping: boolean;
}


export interface CreatePaymentPayload {
  price_amount: number;
  pay_currency: string;
}
