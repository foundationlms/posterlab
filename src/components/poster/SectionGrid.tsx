import React from 'react';
import { PosterSection } from '../../types/poster';

interface SectionGridProps {
  sections: PosterSection[];
  onSectionAreaChange: (sectionId: string, area: string) => void;
  children: React.ReactNode;
}

const SectionGrid: React.FC<SectionGridProps> = ({
  sections,
  onSectionAreaChange,
  children
}) => {
  const gridAreas = sections.map(section => ({
    id: section.id,
    area: section.area
  }));

  return (
    <div
      className="w-full h-full"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(12, 1fr)',
        gap: '1rem',
        gridTemplateAreas: gridAreas.map(({ id, area }) => `"${area}"`).join(' ')
      }}
    >
      {children}
    </div>
  );
};

export default SectionGrid;