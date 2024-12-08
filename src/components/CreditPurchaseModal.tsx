import React from 'react';
import { X, Package, CreditCard } from 'lucide-react';

interface CreditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const packages = [
  { id: 1, credits: 5, price: 10, popular: false },
  { id: 2, credits: 15, price: 25, popular: true },
  { id: 3, credits: 50, price: 75, popular: false },
];

const CreditPurchaseModal: React.FC<CreditPurchaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePurchase = (packageId: number) => {
    // Handle purchase logic
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mb-8">
            <Package className="mx-auto h-12 w-12 text-indigo-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Purchase Credits
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Choose a package that suits your needs
            </p>
          </div>

          <div className="space-y-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-lg border ${
                  pkg.popular ? 'border-indigo-500' : 'border-gray-200'
                } p-4 hover:border-indigo-500 transition-colors cursor-pointer`}
                onClick={() => handlePurchase(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Popular
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {pkg.credits} Credits
                    </h4>
                    <p className="text-sm text-gray-500">
                      Perfect for {pkg.credits === 5 ? 'getting started' : pkg.credits === 15 ? 'regular users' : 'power users'}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    ${pkg.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <CreditCard className="inline-block h-4 w-4 mr-1" />
            Secure payment powered by Stripe
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPurchaseModal;