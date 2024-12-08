import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

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

interface TitleSectionProps {
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

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  authors,
  affiliations,
  onTitleChange,
  onAuthorsChange,
  onAffiliationsChange,
  styles
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsEditingTitle(false);
    onTitleChange(e.target.value);
  };

  const renderAffiliations = () => {
    return affiliations.map((aff) => (
      <div key={aff.id} className="text-base text-gray-600">
        <sup>{aff.id}</sup>
        {[
          aff.department,
          aff.institution,
          [aff.city, aff.country].filter(Boolean).join(', ')
        ].filter(Boolean).join(', ')}
      </div>
    ));
  };

  const renderAuthors = () => {
    return (
      <div className="text-xl">
        {authors.map((author, index) => (
          <span key={index}>
            {author.name}
            <sup>
              {author.affiliations.join(',')}
              {author.isCorresponding && '*'}
            </sup>
            {index < authors.length - 1 && ', '}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className="w-full rounded-lg p-8 space-y-6"
      style={{
        backgroundColor: styles.backgroundColor,
        fontFamily: styles.fontFamily
      }}
    >
      <div className="text-center space-y-8">
        {isEditingTitle ? (
          <textarea
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={handleTitleBlur}
            className="w-full text-4xl font-bold text-center border-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={2}
            autoFocus
            style={{ color: styles.titleColor }}
          />
        ) : (
          <h1
            className="text-4xl font-bold cursor-text"
            onClick={handleTitleClick}
            style={{ color: styles.titleColor }}
          >
            {title || 'Click to add title'}
          </h1>
        )}

        <div className="space-y-4">
          {renderAuthors()}
          <div className="space-y-1">
            {renderAffiliations()}
          </div>
          {authors.some(a => a.isCorresponding) && (
            <div className="text-sm text-gray-500">
              *Corresponding author: {authors.find(a => a.isCorresponding)?.email}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleSection;