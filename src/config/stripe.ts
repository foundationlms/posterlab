import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe publishable key. Please check your environment variables.');
}

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);