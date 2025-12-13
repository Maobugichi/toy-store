export interface NewsletterPayload {
  email: string;
  name?: string;
}

export interface NewsletterResponse {
  message: string;
  success?: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: Date;
  isActive: boolean;
}