import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Affiliation } from './types';

interface AffiliationFormProps {
  onSubmit: (affiliation: Omit<Affiliation, 'id'>) => void;
}

const AffiliationForm: React.FC<AffiliationFormProps> = ({ onSubmit }) => {
  const [newAffiliation, setNewAffiliation] = useState<Partial<Affiliation>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffiliation.institution) return;

    onSubmit({
      institution: newAffiliation.institution,
      department: newAffiliation.department,
      city: newAffiliation.city,
      country: newAffiliation.country
    });

    setNewAffiliation({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={newAffiliation.institution || ''}
        onChange={(e) => setNewAffiliation({ ...newAffiliation, institution: e.target.value })}
        placeholder="Institution name"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />

      <input
        type="text"
        value={newAffiliation.department || ''}
        onChange={(e) => setNewAffiliation({ ...newAffiliation, department: e.target.value })}
        placeholder="Department (optional)"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={newAffiliation.city || ''}
          onChange={(e) => setNewAffiliation({ ...newAffiliation, city: e.target.value })}
          placeholder="City (optional)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <input
          type="text"
          value={newAffiliation.country || ''}
          onChange={(e) => setNewAffiliation({ ...newAffiliation, country: e.target.value })}
          placeholder="Country (optional)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Affiliation
      </button>
    </form>
  );
};

export default AffiliationForm;