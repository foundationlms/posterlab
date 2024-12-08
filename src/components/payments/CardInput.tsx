import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { CardInputProps } from '../../types/payment';

const CardInput: React.FC<CardInputProps> = ({ onChange, error }) => {
  return (
    <div className="w-full">
      <div className="rounded-md border border-gray-300 px-3 py-2">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          onChange={onChange}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default CardInput;