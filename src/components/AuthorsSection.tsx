import React, { useState, useRef, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

interface AuthorsSectionProps {
  authors: string;
  affiliations: string;
  onAuthorsChange: (authors: string) => void;
  onAffiliationsChange: (affiliations: string) => void;
  textColor: string;
}

const AuthorsSection: React.FC<AuthorsSectionProps> = ({
  authors,
  affiliations,
  onAuthorsChange,
  onAffiliationsChange,
  textColor,
}) => {
  const [isEditingAuthors, setIsEditingAuthors] = useState(false);
  const [isEditingAffiliations, setIsEditingAffiliations] = useState(false);
  const authorsRef = useRef<HTMLTextAreaElement>(null);
  const affiliationsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingAuthors && authorsRef.current) {
      authorsRef.current.focus();
      authorsRef.current.select();
    }
  }, [isEditingAuthors]);

  useEffect(() => {
    if (isEditingAffiliations && affiliationsRef.current) {
      affiliationsRef.current.focus();
      affiliationsRef.current.select();
    }
  }, [isEditingAffiliations]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    type: 'authors' | 'affiliations'
  ) => {
    if (e.key === 'Enter' && e.metaKey) {
      if (type === 'authors') {
        setIsEditingAuthors(false);
      } else {
        setIsEditingAffiliations(false);
      }
    } else if (e.key === 'Escape') {
      if (type === 'authors') {
        setIsEditingAuthors(false);
      } else {
        setIsEditingAffiliations(false);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative group">
        {isEditingAuthors ? (
          <textarea
            ref={authorsRef}
            value={authors}
            onChange={(e) => onAuthorsChange(e.target.value)}
            onBlur={() => setIsEditingAuthors(false)}
            onKeyDown={(e) => handleKeyDown(e, 'authors')}
            className="w-full text-base resize-none border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter authors (one per line)"
            rows={3}
            style={{ color: textColor }}
          />
        ) : (
          <div 
            className="flex items-start cursor-text"
            onClick={() => setIsEditingAuthors(true)}
          >
            <div className="flex-1" style={{ color: textColor }}>
              {authors || 'Add authors'}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingAuthors(true);
              }}
              className="ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-gray-100"
              title="Edit authors"
            >
              <Edit2 className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>

      <div className="relative group">
        {isEditingAffiliations ? (
          <textarea
            ref={affiliationsRef}
            value={affiliations}
            onChange={(e) => onAffiliationsChange(e.target.value)}
            onBlur={() => setIsEditingAffiliations(false)}
            onKeyDown={(e) => handleKeyDown(e, 'affiliations')}
            className="w-full text-sm resize-none border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter affiliations (one per line)"
            rows={2}
            style={{ color: textColor }}
          />
        ) : (
          <div 
            className="flex items-start cursor-text"
            onClick={() => setIsEditingAffiliations(true)}
          >
            <div 
              className="flex-1 text-sm"
              style={{ color: textColor }}
            >
              {affiliations || 'Add affiliations'}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingAffiliations(true);
              }}
              className="ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-gray-100"
              title="Edit affiliations"
            >
              <Edit2 className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>

      {(isEditingAuthors || isEditingAffiliations) && (
        <div className="text-xs text-gray-500 mt-1">
          Press ⌘+Enter or Escape to finish editing
        </div>
      )}
    </div>
  );
};

export default AuthorsSection;