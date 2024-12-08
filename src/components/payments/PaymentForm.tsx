import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAuth } from '../../hooks/useAuth';
import { CreditCard, Lock } from 'lucide-react';
import { PaymentFormProps } from '../../types/payment';
import { handleStripeError, createPaymentIntent, validatePaymentResponse } from '../../utils/stripe';
import CardInput from './CardInput';
import PaymentStatus from './PaymentStatus';

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, planId, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onError('Payment system is not available');
      return;
    }

    setIsProcessing(true);
    setCardError(undefined);

    try {
      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
        billing_details: {
          email: user?.email,
          name: user?.name,
        },
      });

      if (cardError) {
        const error = handleStripeError(cardError);
        throw new Error(error.message);
      }

      const response = await createPaymentIntent(amount, planId);
      const { clientSecret } = await validatePaymentResponse(response);

      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);

      if (confirmError) {
        const error = handleStripeError(confirmError);
        throw new Error(error.message);
      }

      onSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Payment failed';
      setCardError(message);
      onError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <Lock className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Secure Payment</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <CardInput 
              error={cardError}
              onChange={() => cardError && setCardError(undefined)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <CreditCard className="h-4 w-4 mr-1" />
              Powered by Stripe
            </div>
            <div className="text-gray-500">
              Amount: ${(amount / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <PaymentStatus isProcessing={isProcessing} />

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>

      <p className="text-xs text-center text-gray-500">
        Your payment information is encrypted and secure.
      </p>
    </form>
  );
};

export default PaymentForm;