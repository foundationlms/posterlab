import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { PosterElement } from '../types/poster';

interface ElementRendererProps {
  element: PosterElement;
  onUpdate: (element: PosterElement) => void;
  onDelete: (id: string) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    headingColor: string;
    textColor: string;
    backgroundColor: string;
    accentColor: string;
  };
}

const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  onUpdate,
  onDelete,
  styles,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -top-3 right-0 flex space-x-1">
          <button
            onClick={() => onDelete(element.id)}
            className="p-1 bg-white rounded-md shadow-sm hover:bg-red-50 text-red-600"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement edit */}}
            className="p-1 bg-white rounded-md shadow-sm hover:bg-gray-50"
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
      )}
      <div 
        className="prose max-w-none"
        style={{ 
          fontFamily: styles.fontFamily,
          color: styles.textColor,
          '--tw-prose-headings': styles.headingColor,
          '--tw-prose-links': styles.accentColor,
        } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: element.content }}
      />
    </div>
  );
};

export default ElementRenderer;