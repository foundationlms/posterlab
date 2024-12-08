import { z } from 'zod';

export const PaymentIntentSchema = z.object({
  clientSecret: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string()
});

export type PaymentIntent = z.infer<typeof PaymentIntentSchema>;

export interface PaymentError {
  message: string;
  code?: string;
  decline_code?: string;
}

export interface PaymentFormProps {
  amount: number;
  planId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export interface CardInputProps {
  onChange?: (event: any) => void;
  error?: string;
}