import React, { useState } from 'react';
import { Plus, X, Mail, Link } from 'lucide-react';

interface Author {
  name: string;
  affiliations: number[];
  isCorresponding?: boolean;
  email?: string;
  orcid?: string;
}

interface Affiliation {
  id: number;
  institution: string;
  department?: string;
  city?: string;
  country?: string;
}

interface AuthorEditorProps {
  authors: Author[];
  affiliations: Affiliation[];
  onAuthorsChange: (authors: Author[]) => void;
  onAffiliationsChange: (affiliations: Affiliation[]) => void;
}

const AuthorEditor: React.FC<AuthorEditorProps> = ({
  authors,
  affiliations,
  onAuthorsChange,
  onAffiliationsChange
}) => {
  const [newAuthor, setNewAuthor] = useState<Partial<Author>>({});
  const [newAffiliation, setNewAffiliation] = useState<Partial<Affiliation>>({});

  const addAuthor = () => {
    if (!newAuthor.name) return;
    onAuthorsChange([...authors, { 
      name: newAuthor.name,
      affiliations: newAuthor.affiliations || [],
      isCorresponding: newAuthor.isCorresponding,
      email: newAuthor.email,
      orcid: newAuthor.orcid
    }]);
    setNewAuthor({});
  };

  const addAffiliation = () => {
    if (!newAffiliation.institution) return;
    onAffiliationsChange([...affiliations, {
      id: affiliations.length + 1,
      institution: newAffiliation.institution,
      department: newAffiliation.department,
      city: newAffiliation.city,
      country: newAffiliation.country
    }]);
    setNewAffiliation({});
  };

  const removeAuthor = (index: number) => {
    onAuthorsChange(authors.filter((_, i) => i !== index));
  };

  const removeAffiliation = (id: number) => {
    onAffiliationsChange(affiliations.filter(a => a.id !== id));
    // Update authors' affiliations
    onAuthorsChange(authors.map(author => ({
      ...author,
      affiliations: author.affiliations.filter(a => a !== id)
    })));
  };

  return (
    <div className="space-y-6">
      {/* Authors Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Authors</h3>
        <div className="space-y-4">
          {authors.map((author, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1 flex items-center space-x-2">
                <span>{author.name}</span>
                {author.isCorresponding && (
                  <Mail className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <button
                onClick={() => removeAuthor(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex items-end space-x-4">
            <div className="flex-1 space-y-4">
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
            </div>
            <button
              onClick={addAuthor}
              className="flex-shrink-0 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Affiliations Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Affiliations</h3>
        <div className="space-y-4">
          {affiliations.map((affiliation) => (
            <div key={affiliation.id} className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="font-medium">{affiliation.institution}</div>
                {affiliation.department && (
                  <div className="text-sm text-gray-500">{affiliation.department}</div>
                )}
                {(affiliation.city || affiliation.country) && (
                  <div className="text-sm text-gray-500">
                    {[affiliation.city, affiliation.country].filter(Boolean).join(', ')}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeAffiliation(affiliation.id)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="space-y-4">
            <input
              type="text"
              value={newAffiliation.institution || ''}
              onChange={(e) => setNewAffiliation({ ...newAffiliation, institution: e.target.value })}
              placeholder="Institution name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              onClick={addAffiliation}
              className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Affiliation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorEditor;