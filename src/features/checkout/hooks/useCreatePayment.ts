import { useMutation } from "@tanstack/react-query";
import api from "@/config/axios-config";
import { toast } from "sonner";

interface CreatePaymentPayload {
  price_amount: number;
  pay_currency: string;
}

interface UseCreatePaymentOptions {
  onSuccess?: (data: any) => void;
}

export const useCreatePayment = ({ onSuccess }: UseCreatePaymentOptions = {}) => {
  return useMutation({
    mutationFn: async (payload: CreatePaymentPayload) => {
      const res = await api.post(
        `/api/payments/create-payment`,
        {
          order_id: `ORDER-${Date.now()}`,
          price_amount: payload.price_amount,
          price_currency: "usd",
          pay_currency: payload.pay_currency,
          order_description: "Order payment via NOWPayments",
        },
        {
          headers: { "x-requires-auth": true },
        }
      );
      console.log("Payment created:", res.data);
      return res.data;
    },
    onMutate: () => {
      toast.loading("Creating your payment invoice...", {
        id: "create-payment",
      });
    },
    onSuccess: (data) => {
      toast.dismiss("create-payment");
      toast.success("Payment invoice created! Please complete the payment.", {
        duration: 4000,
      });
      onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.dismiss("create-payment");
      console.error("Payment creation error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create payment. Please try again.",
        { duration: 5000 }
      );
    },
  });
};