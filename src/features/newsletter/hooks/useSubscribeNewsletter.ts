import { useMutation } from '@tanstack/react-query';
import { newsletterApi } from '../api/newsletterApi';
import type { NewsletterPayload, NewsletterResponse } from '../types/newsletter.types';

export function useSubscribeNewsletter() {
  return useMutation<NewsletterResponse, Error, NewsletterPayload>({
    mutationFn: newsletterApi.subscribe,
    onSuccess: (data) => {
      console.log('✅ Subscription success:', data.message);
    },
    onError: (error: any) => {
      console.error(
        'Subscription failed:',
        error.response?.data || error.message
      );
    },
  });
}