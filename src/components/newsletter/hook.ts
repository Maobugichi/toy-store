import api from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";

interface NewsletterPayload {
  email: string;
  name?: string;
}

interface NewsletterResponse {
  message: string;
  success?: boolean;
}

export function useSubscribeNewsletter() {
  return useMutation<NewsletterResponse, Error, NewsletterPayload>({
    mutationFn: async ({ email, name }) => {
      const response = await api.post(`/api/newsletter/subscribe`, {
        email,
        name,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("✅ Subscription success:", data.message);
    },
    onError: (error: any) => {
      console.error(
        "❌ Subscription failed:",
        error.response?.data || error.message
      );
    },
  });
}
