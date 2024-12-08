import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Author, Affiliation } from './types';
import Title from './Title';
import AuthorList from './AuthorList';
import AffiliationList from './AffiliationList';
import CorrespondingAuthor from './CorrespondingAuthor';
import HeaderEditor from './HeaderEditor';

interface HeaderWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  authors: Author[];
  affiliations: Affiliation[];
  onTitleChange: (title: string) => void;
  onAuthorsChange: (authors: Author[]) => void;
  onAffiliationsChange: (affiliations: Affiliation[]) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    textColor: string;
    backgroundColor: string;
  };
}

const HeaderWorkspace: React.FC<HeaderWorkspaceProps> = ({
  isOpen,
  onClose,
  title,
  authors,
  affiliations,
  onTitleChange,
  onAuthorsChange,
  onAffiliationsChange,
  styles
}) => {
  const [view, setView] = useState<'preview' | 'edit'>('preview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Edit Header
                </h2>
                <div className="flex rounded-md shadow-sm">
                  <button
                    onClick={() => setView('preview')}
                    className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                      view === 'preview'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setView('edit')}
                    className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                      view === 'edit'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {view === 'preview' ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <Title title={title} onChange={onTitleChange} styles={styles} />
                <AuthorList authors={authors} />
                <AffiliationList affiliations={affiliations} />
                <CorrespondingAuthor authors={authors} />
              </div>
            ) : (
              <HeaderEditor
                authors={authors}
                affiliations={affiliations}
                onAuthorsChange={onAuthorsChange}
                onAffiliationsChange={onAffiliationsChange}
              />
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderWorkspace;