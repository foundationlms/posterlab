import React from 'react';
import { Plus, X, Building } from 'lucide-react';

interface Affiliation {
  id: number;
  institution: string;
  department?: string;
  city?: string;
  country?: string;
}

interface AffiliationListProps {
  affiliations: Affiliation[];
  onAffiliationsChange: (affiliations: Affiliation[]) => void;
}

const AffiliationList: React.FC<AffiliationListProps> = ({
  affiliations = [],
  onAffiliationsChange
}) => {
  const addAffiliation = () => {
    onAffiliationsChange([
      ...affiliations,
      {
        id: (affiliations.length + 1),
        institution: '',
        department: '',
        city: '',
        country: ''
      }
    ]);
  };

  const removeAffiliation = (id: number) => {
    onAffiliationsChange(affiliations.filter(a => a.id !== id));
  };

  const updateAffiliation = (id: number, updates: Partial<Affiliation>) => {
    onAffiliationsChange(
      affiliations.map(aff => 
        aff.id === id ? { ...aff, ...updates } : aff
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Affiliations
        </label>
        <button
          type="button"
          onClick={addAffiliation}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Affiliation
        </button>
      </div>

      <div className="space-y-4">
        {affiliations.map((affiliation) => (
          <div key={affiliation.id} className="relative border border-gray-200 rounded-lg p-4">
            <button
              onClick={() => removeAffiliation(affiliation.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={affiliation.institution || ''}
                  onChange={(e) => updateAffiliation(affiliation.id, { institution: e.target.value })}
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Institution name"
                />
              </div>

              <input
                type="text"
                value={affiliation.department || ''}
                onChange={(e) => updateAffiliation(affiliation.id, { department: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Department (optional)"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={affiliation.city || ''}
                  onChange={(e) => updateAffiliation(affiliation.id, { city: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="City (optional)"
                />
                <input
                  type="text"
                  value={affiliation.country || ''}
                  onChange={(e) => updateAffiliation(affiliation.id, { country: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Country (optional)"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliationList;