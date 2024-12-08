import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { PosterTemplate } from '../../types/poster';
import PosterSection from './PosterSection';

interface PosterCanvasProps {
  template: PosterTemplate;
  elements: Record<string, any>;
  onElementsChange: (sectionId: string, content: any) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    textColor: string;
    backgroundColor: string;
  };
  onSectionClick?: (sectionId: string) => void;
}

const PosterCanvas: React.FC<PosterCanvasProps> = ({
  template,
  elements,
  onElementsChange,
  styles,
  onSectionClick
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div
        className="relative bg-white shadow-lg rounded-lg"
        style={{
          aspectRatio: template.orientation === 'landscape' ? '4/3' : '3/4',
          backgroundColor: styles.backgroundColor,
          fontFamily: styles.fontFamily
        }}
      >
        <div 
          className="grid gap-4 p-6 h-full"
          style={{
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gridTemplateRows: template.orientation === 'landscape' 
              ? 'repeat(8, minmax(0, 1fr))'
              : 'repeat(12, minmax(0, 1fr))'
          }}
        >
          <SortableContext items={template.sections.map(s => s.id)} strategy={rectSortingStrategy}>
            {template.sections.map((section) => (
              <div
                key={section.id}
                style={{ gridArea: section.area }}
                onClick={() => onSectionClick?.(section.id)}
              >
                <PosterSection
                  section={section}
                  content={elements[section.id]}
                  onContentChange={(content) => onElementsChange(section.id, content)}
                  styles={styles}
                />
              </div>
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default PosterCanvas;