import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios-config';

export const usePaymentStatus = (paymentId: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['paymentStatus', paymentId],
    queryFn: async () => {
      if (!paymentId) return null;
      const res = await api.post(`/api/payments/payment-status/${paymentId}`);
      return res.data;
    },
    enabled: enabled && !!paymentId,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    retry: 3,
    retryDelay: 2000,
  });
};