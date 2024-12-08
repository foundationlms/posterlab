import React from 'react';
import { Edit2 } from 'lucide-react';

interface HeaderDisplayProps {
  content: {
    title: string;
    authors: Array<{
      name: string;
      affiliations: string[];
      isCorresponding?: boolean;
      email?: string;
    }>;
    affiliations: Array<{
      id: string;
      institution: string;
      department?: string;
      city?: string;
      country?: string;
    }>;
  };
  onEdit: () => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    textColor: string;
  };
}

const HeaderDisplay: React.FC<HeaderDisplayProps> = ({
  content,
  onEdit,
  styles
}) => {
  return (
    <div 
      className="relative p-8 text-center space-y-6 group"
      style={{ fontFamily: styles.fontFamily }}
    >
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit2 className="h-4 w-4 text-gray-600" />
      </button>

      <h1 
        className="text-4xl font-bold"
        style={{ color: styles.titleColor }}
      >
        {content.title || 'Click to add title'}
      </h1>

      <div className="space-y-4">
        <div className="text-xl" style={{ color: styles.textColor }}>
          {content.authors.map((author, index) => (
            <span key={index}>
              {author.name}
              <sup>
                {author.affiliations.join(',')}
                {author.isCorresponding && '*'}
              </sup>
              {index < content.authors.length - 1 && ', '}
            </span>
          ))}
        </div>

        <div className="space-y-1 text-base" style={{ color: styles.textColor }}>
          {content.affiliations.map((aff) => (
            <div key={aff.id}>
              <sup>{aff.id}</sup>
              {[
                aff.institution,
                aff.department,
                [aff.city, aff.country].filter(Boolean).join(', ')
              ].filter(Boolean).join(', ')}
            </div>
          ))}
        </div>

        {content.authors.some(a => a.isCorresponding) && (
          <div className="text-sm" style={{ color: styles.textColor }}>
            *Corresponding author: {content.authors.find(a => a.isCorresponding)?.email}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDisplay;