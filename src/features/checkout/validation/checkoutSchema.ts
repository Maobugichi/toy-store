import { z } from "zod";

export const shippingSchema = z.object({
    email:z.email('Please enter a valid email address'),
    firstName:z.string().min(1,"First name is required"),
    lastName:z.string().min(1,"Last name is required"),
    company:z.string().optional(),
    address:z.string().min(1,'Address is required'),
    apartment:z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "ZIP code is required"),
    phone: z.string().optional(),
    newsletter: z.boolean()
});


export const shippingMethodSchema = z.object({
  shippingMethod: z.string().min(1, "Please select a shipping method"),
});

export const paymentSchema = z.object({
  paymentMethod: z.string().min(1, "Please select a payment method"),
  payCurrency: z.string().min(1, "Please select a crypto currency"),
  saveInfo: z.boolean().optional(),
  sameAsShipping: z.boolean().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
export type ShippingFormData = z.infer<typeof shippingSchema>;
export type ShippingMethodData = z.infer<typeof shippingMethodSchema>;
