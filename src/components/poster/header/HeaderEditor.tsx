import React, { useState } from 'react';
import TitleInput from './TitleInput';
import AuthorList from './AuthorList';
import AffiliationList from './AffiliationList';

interface HeaderContent {
  title: string;
  authors: Array<{
    name: string;
    affiliations: number[];
    isCorresponding?: boolean;
    email?: string;
  }>;
  affiliations: Array<{
    id: number;
    institution: string;
    department?: string;
    city?: string;
    country?: string;
  }>;
}

interface HeaderEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: HeaderContent) => void;
  initialContent: HeaderContent;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  initialContent
}) => {
  const [content, setContent] = useState<HeaderContent>(initialContent);

  const handleSave = () => {
    onSave(content);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white px-6 py-6">
      <div className="space-y-6">
        <TitleInput 
          value={content.title}
          onChange={(title) => setContent({ ...content, title })}
        />

        <AuthorList
          authors={content.authors}
          affiliations={content.affiliations}
          onAuthorsChange={(authors) => setContent({ ...content, authors })}
        />

        <AffiliationList
          affiliations={content.affiliations}
          onAffiliationsChange={(affiliations) => setContent({ ...content, affiliations })}
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;