import React, { useState } from 'react';
import { Book, Plus, Search, X } from 'lucide-react';
import { Citation } from '../../types/poster';

interface CitationManagerProps {
  citations: Citation[];
  onAddCitation: (citation: Citation) => void;
  onRemoveCitation: (id: string) => void;
}

const CitationManager: React.FC<CitationManagerProps> = ({
  citations,
  onAddCitation,
  onRemoveCitation
}) => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCitation, setNewCitation] = useState<Partial<Citation>>({
    type: 'article',
    authors: [],
    title: '',
    year: new Date().getFullYear()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCitation.title || !newCitation.authors?.length) return;

    onAddCitation({
      id: Math.random().toString(36).substr(2, 9),
      type: newCitation.type || 'article',
      authors: newCitation.authors || [],
      title: newCitation.title,
      year: newCitation.year || new Date().getFullYear(),
      journal: newCitation.journal,
      doi: newCitation.doi,
      url: newCitation.url
    });

    setNewCitation({
      type: 'article',
      authors: [],
      title: '',
      year: new Date().getFullYear()
    });
    setShowForm(false);
  };

  const filteredCitations = citations.filter(citation =>
    citation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    citation.authors.some(author => 
      author.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citations..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Citation
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={newCitation.type}
                onChange={(e) => setNewCitation({ ...newCitation, type: e.target.value as Citation['type'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="article">Article</option>
                <option value="book">Book</option>
                <option value="conference">Conference Paper</option>
                <option value="website">Website</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Authors</label>
              <input
                type="text"
                value={newCitation.authors?.join('; ')}
                onChange={(e) => setNewCitation({ 
                  ...newCitation, 
                  authors: e.target.value.split(';').map(a => a.trim()).filter(Boolean)
                })}
                placeholder="Author names (separated by semicolons)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newCitation.title}
                onChange={(e) => setNewCitation({ ...newCitation, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  value={newCitation.year}
                  onChange={(e) => setNewCitation({ ...newCitation, year: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {newCitation.type === 'article' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Journal</label>
                  <input
                    type="text"
                    value={newCitation.journal}
                    onChange={(e) => setNewCitation({ ...newCitation, journal: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">DOI/URL</label>
              <input
                type="text"
                value={newCitation.doi || newCitation.url}
                onChange={(e) => setNewCitation({ 
                  ...newCitation, 
                  [newCitation.type === 'article' ? 'doi' : 'url']: e.target.value 
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                Add Citation
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {filteredCitations.map((citation) => (
          <div
            key={citation.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex items-start space-x-3">
              <Book className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {citation.authors.join(', ')} ({citation.year})
                </p>
                <p className="text-sm text-gray-500">{citation.title}</p>
                {citation.journal && (
                  <p className="text-sm text-gray-500 italic">{citation.journal}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => onRemoveCitation(citation.id)}
              className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitationManager;