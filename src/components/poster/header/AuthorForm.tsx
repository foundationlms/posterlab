import React, { useState } from 'react';
import { Plus, X, Mail } from 'lucide-react';
import { Author, Affiliation } from './types';

interface AuthorFormProps {
  affiliations: Affiliation[];
  onSubmit: (author: Omit<Author, 'id'>) => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ affiliations, onSubmit }) => {
  const [newAuthor, setNewAuthor] = useState<Partial<Author>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.name) return;

    onSubmit({
      name: newAuthor.name,
      affiliations: newAuthor.affiliations || [],
      isCorresponding: newAuthor.isCorresponding,
      email: newAuthor.email,
      orcid: newAuthor.orcid
    });

    setNewAuthor({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={newAuthor.name || ''}
        onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
        placeholder="Author name"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <div className="flex items-center space-x-4">
        <select
          multiple
          value={newAuthor.affiliations || []}
          onChange={(e) => setNewAuthor({
            ...newAuthor,
            affiliations: Array.from(e.target.selectedOptions, option => Number(option.value))
          })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {affiliations.map((aff) => (
            <option key={aff.id} value={aff.id}>
              {aff.institution}
            </option>
          ))}
        </select>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={newAuthor.isCorresponding || false}
            onChange={(e) => setNewAuthor({ ...newAuthor, isCorresponding: e.target.checked })}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-600">Corresponding</span>
        </label>
      </div>

      {newAuthor.isCorresponding && (
        <input
          type="email"
          value={newAuthor.email || ''}
          onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
          placeholder="Email address"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      )}

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Author
      </button>
    </form>
  );
};

export default AuthorForm;