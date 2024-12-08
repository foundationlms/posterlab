import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Package } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
}

const creditPackages: CreditPackage[] = [
  {
    id: 'starter',
    credits: 5,
    price: 10,
  },
  {
    id: 'pro',
    credits: 15,
    price: 25,
    popular: true,
  },
  {
    id: 'enterprise',
    credits: 50,
    price: 75,
  },
];

const CreditPurchase: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    setIsProcessing(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // In a real app, this would call your backend to create a Stripe session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          credits: selectedPackage.credits,
          amount: selectedPackage.price,
        }),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Purchase Credits
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Choose a credit package that suits your needs
        </p>
      </div>

      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto">
        {creditPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
              pkg.popular
                ? 'border-2 border-indigo-500 relative'
                : 'border border-gray-200'
            }`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-600">
                  Popular
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-center">
                <Package className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-center text-2xl font-semibold text-gray-900 mt-4">
                {pkg.credits} Credits
              </h3>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${pkg.price}
                </span>
              </p>
              <button
                onClick={() => setSelectedPackage(pkg)}
                className={`mt-8 block w-full rounded-md px-4 py-2 text-sm font-semibold text-center ${
                  selectedPackage?.id === pkg.id
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                }`}
              >
                Select Package
              </button>
            </div>

            <div className="px-6 pt-6 pb-8">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                What's included:
              </h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    {pkg.credits} poster credits
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    Valid for 12 months
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    High-resolution exports
                  </p>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div className="mt-10 text-center">
          <button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isProcessing ? (
              'Processing...'
            ) : (
              <>
                Purchase {selectedPackage.credits} Credits for ${selectedPackage.price}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditPurchase;