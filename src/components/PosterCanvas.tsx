import React from 'react';
import { PosterTemplate, PosterElement } from '../types/poster';
import PosterSection from './PosterSection';

interface PosterCanvasProps {
  template: PosterTemplate;
  elements: PosterElement[];
  onElementsChange: (elements: PosterElement[]) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    headingColor: string;
    textColor: string;
    backgroundColor: string;
    accentColor: string;
  };
}

const PosterCanvas: React.FC<PosterCanvasProps> = ({
  template,
  elements,
  onElementsChange,
  styles,
}) => {
  const handleElementAdd = (element: PosterElement) => {
    onElementsChange([...elements, element]);
  };

  const handleElementDelete = (elementId: string) => {
    onElementsChange(elements.filter(el => el.id !== elementId));
  };

  return (
    <div
      className="relative bg-white shadow-lg rounded-lg"
      style={{
        aspectRatio: template.orientation === 'landscape' ? '4/3' : '3/4',
        backgroundColor: styles.backgroundColor,
        fontFamily: styles.fontFamily
      }}
    >
      <div
        className="grid h-full p-6 gap-6"
        style={{
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gridTemplateRows: template.orientation === 'landscape' 
            ? 'repeat(8, minmax(0, 1fr))'
            : 'repeat(12, minmax(0, 1fr))'
        }}
      >
        {template.sections.map((section) => (
          <PosterSection
            key={section.id}
            section={section}
            elements={elements.filter(el => el.sectionId === section.id)}
            onElementAdd={handleElementAdd}
            onElementDelete={handleElementDelete}
            styles={styles}
          />
        ))}
      </div>
    </div>
  );
};

export default PosterCanvas;