import { PaymentError } from '../types/payment';

export const handleStripeError = (error: any): PaymentError => {
  if (error.type === 'card_error' || error.type === 'validation_error') {
    return {
      message: error.message || 'Your card was declined.',
      code: error.code,
      decline_code: error.decline_code
    };
  }

  return {
    message: 'An unexpected error occurred.',
    code: 'unknown_error'
  };
};

export const createPaymentIntent = async (amount: number, planId: string): Promise<Response> => {
  return fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, planId }),
  });
};

export const validatePaymentResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Payment failed');
  }
  return response.json();
};