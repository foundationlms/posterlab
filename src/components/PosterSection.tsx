import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PosterSection as PosterSectionType, PosterElement } from '../types/poster';
import SectionWorkspace from './SectionWorkspace';

interface PosterSectionProps {
  section: PosterSectionType;
  elements: PosterElement[];
  onElementAdd: (element: PosterElement) => void;
  onElementDelete: (elementId: string) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    headingColor: string;
    textColor: string;
    backgroundColor: string;
    accentColor: string;
  };
}

const PosterSection: React.FC<PosterSectionProps> = ({
  section,
  elements,
  onElementAdd,
  onElementDelete,
  styles,
}) => {
  const [showWorkspace, setShowWorkspace] = useState(false);

  const handleClick = () => {
    setShowWorkspace(true);
  };

  return (
    <div
      className="relative rounded-lg border border-gray-200 h-full cursor-pointer hover:border-indigo-500 transition-colors overflow-hidden flex flex-col"
      style={{
        gridArea: section.area,
        backgroundColor: styles.backgroundColor,
        fontFamily: styles.fontFamily
      }}
      onClick={handleClick}
    >
      {/* Section Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
        <h3 
          className="text-lg font-semibold"
          style={{ color: styles.headingColor }}
        >
          {section.name}
        </h3>
      </div>

      {/* Section Content */}
      <div className="flex-1 p-4 overflow-auto">
        {elements.length > 0 ? (
          <div className="space-y-4">
            {elements.map((element) => (
              <div 
                key={element.id}
                className="prose max-w-none break-words"
                style={{ color: styles.textColor }}
                dangerouslySetInnerHTML={{ __html: element.content }}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Plus className="h-8 w-8 mb-2" />
            <p className="text-sm text-center px-4">{section.placeholder}</p>
          </div>
        )}
      </div>

      {showWorkspace && (
        <SectionWorkspace
          section={section}
          onClose={() => setShowWorkspace(false)}
          onSave={(element) => {
            onElementAdd(element);
            setShowWorkspace(false);
          }}
          styles={styles}
        />
      )}
    </div>
  );
};

export default PosterSection;