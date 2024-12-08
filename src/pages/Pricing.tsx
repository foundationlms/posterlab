import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../config/stripe';
import PaymentModal from '../components/PaymentModal';

const plans = [
  {
    id: 'plan_free',
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out PosterLab',
    features: [
      'Build, save, and edit 1 poster',
      'Basic templates',
      'Standard export formats',
      'Community support'
    ],
    popular: false
  },
  {
    id: 'plan_standard',
    name: 'Standard',
    price: 999, // $9.99 in cents
    description: 'Great for researchers and students',
    features: [
      'Build, save, and edit up to 100 posters',
      'All professional templates',
      'High-resolution exports',
      'Priority support',
      'Remove watermark'
    ],
    popular: true
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    price: 1699, // $16.99 in cents
    description: 'Best for power users',
    features: [
      'Everything in Standard',
      'Build, save, and edit up to 100 posters',
      'AI co-pilot assistance',
      'Advanced customization',
      'Premium support',
      'Early access to features'
    ],
    popular: false
  }
];

const Pricing = () => {
  const { user, updatePlan } = useAuth();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    id: string;
  } | null>(null);

  const handlePlanSelect = (plan: typeof plans[0]) => {
    if (!user) {
      navigate('/signin', { state: { from: '/pricing', plan: plan.name.toLowerCase() } });
      return;
    }

    if (plan.price === 0) {
      updatePlan('free');
      navigate('/dashboard');
      return;
    }

    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      id: plan.id
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    if (!selectedPlan) return;
    
    const planName = selectedPlan.name.toLowerCase() as 'free' | 'standard' | 'pro';
    await updatePlan(planName);
    setShowPaymentModal(false);
    navigate('/dashboard');
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    // Could add toast notification here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Choose the perfect plan for your academic poster needs
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg shadow-xl bg-white ring-1 ring-gray-200 ${
              plan.popular ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            <div className="p-8">
              {plan.popular && (
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                  Most Popular
                </span>
              )}
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900">${(plan.price / 100).toFixed(2)}</span>
                  <span className="text-gray-500">/year</span>
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`mt-8 w-full py-3 px-6 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-500'
                }`}
              >
                {plan.price === 0 ? 'Get Started Free' : `Subscribe for $${(plan.price / 100).toFixed(2)}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-base text-gray-500">
          All plans include a 14-day money-back guarantee
        </p>
      </div>

      {selectedPlan && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            planName={selectedPlan.name}
            amount={selectedPlan.price}
            planId={selectedPlan.id}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </Elements>
      )}
    </div>
  );
};

export default Pricing;