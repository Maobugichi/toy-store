import api from '@/config/axios-config';
import type { NewsletterPayload , NewsletterResponse } from '../types/newsletter.types';
export const newsletterApi = {
  subscribe: async ({ email, name }: NewsletterPayload): Promise<NewsletterResponse> => {
    const response = await api.post('/api/newsletter/subscribe', {
      email,
      name,
    });
    return response.data;
  },

  unsubscribe: async (email: string): Promise<NewsletterResponse> => {
    const response = await api.post('/api/newsletter/unsubscribe', {
      email,
    });
    return response.data;
  },
};