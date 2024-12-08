import React from 'react';
import { Plus, X, Mail } from 'lucide-react';

interface Author {
  name: string;
  affiliations: number[];
  isCorresponding?: boolean;
  email?: string;
}

interface Affiliation {
  id: number;
  institution: string;
  department?: string;
  city?: string;
  country?: string;
}

interface AuthorListProps {
  authors: Author[];
  affiliations: Affiliation[];
  onAuthorsChange: (authors: Author[]) => void;
}

const AuthorList: React.FC<AuthorListProps> = ({
  authors = [],
  affiliations = [],
  onAuthorsChange
}) => {
  const addAuthor = () => {
    onAuthorsChange([...authors, {
      name: '',
      affiliations: [],
      isCorresponding: false,
      email: ''
    }]);
  };

  const removeAuthor = (index: number) => {
    onAuthorsChange(authors.filter((_, i) => i !== index));
  };

  const updateAuthor = (index: number, updates: Partial<Author>) => {
    onAuthorsChange(
      authors.map((author, i) => 
        i === index ? { ...author, ...updates } : author
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Authors
        </label>
        <button
          type="button"
          onClick={addAuthor}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Author
        </button>
      </div>

      <div className="space-y-4">
        {authors.map((author, index) => (
          <div key={index} className="relative border border-gray-200 rounded-lg p-4">
            <button
              onClick={() => removeAuthor(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-4">
              <input
                type="text"
                value={author.name || ''}
                onChange={(e) => updateAuthor(index, { name: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Author name"
              />

              <select
                multiple
                value={author.affiliations || []}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => Number(option.value));
                  updateAuthor(index, { affiliations: values });
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {affiliations.map((aff) => (
                  <option key={aff.id} value={aff.id}>
                    {aff.institution}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`corresponding-${index}`}
                  checked={author.isCorresponding || false}
                  onChange={(e) => updateAuthor(index, { isCorresponding: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`corresponding-${index}`} className="text-sm text-gray-700">
                  Corresponding Author
                </label>
              </div>

              {author.isCorresponding && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={author.email || ''}
                    onChange={(e) => updateAuthor(index, { email: e.target.value })}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;