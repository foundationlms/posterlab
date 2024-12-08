import React from 'react';
import { Author, Affiliation } from './types';

interface PosterHeaderProps {
  title: string;
  authors: Author[];
  affiliations: Affiliation[];
  onTitleChange: (title: string) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    textColor: string;
    backgroundColor: string;
  };
}

const PosterHeader: React.FC<PosterHeaderProps> = ({
  title,
  authors,
  affiliations,
  onTitleChange,
  styles
}) => {
  const handleTitleClick = () => {
    const newTitle = prompt('Enter title:', title);
    if (newTitle !== null) {
      onTitleChange(newTitle);
    }
  };

  return (
    <div className="text-center space-y-6 p-8">
      {/* Title */}
      <h1 
        className="text-4xl font-bold cursor-pointer"
        onClick={handleTitleClick}
        style={{ color: styles.titleColor }}
      >
        {title || 'Click to add title'}
      </h1>

      {/* Authors */}
      <div className="text-xl">
        {authors.map((author, index) => (
          <span key={author.id}>
            {author.name}
            <sup>
              {author.affiliations.join(',')}
              {author.isCorresponding && '*'}
            </sup>
            {index < authors.length - 1 && ', '}
          </span>
        ))}
      </div>

      {/* Affiliations */}
      <div className="space-y-1 text-base text-gray-600">
        {affiliations.map((aff) => (
          <div key={aff.id}>
            <sup>{aff.id}</sup>
            {[
              aff.department,
              aff.institution,
              [aff.city, aff.country].filter(Boolean).join(', ')
            ].filter(Boolean).join(', ')}
          </div>
        ))}
      </div>

      {/* Corresponding Author */}
      {authors.some(a => a.isCorresponding) && (
        <div className="text-sm text-gray-500">
          *Corresponding author: {authors.find(a => a.isCorresponding)?.email}
        </div>
      )}
    </div>
  );
};

export default PosterHeader;