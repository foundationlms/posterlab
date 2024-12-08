import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { PosterSection } from '../../types/poster';
import DraggableSection from './DraggableSection';

interface SectionListProps {
  sections: PosterSection[];
  onSectionsChange: (sections: PosterSection[]) => void;
  onSectionClick: (sectionId: string) => void;
  activeSection?: string;
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  onSectionsChange,
  onSectionClick,
  activeSection
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);
      
      const newSections = [...sections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);
      
      onSectionsChange(newSections);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {sections.map((section) => (
            <DraggableSection
              key={section.id}
              section={section}
              isActive={section.id === activeSection}
              onClick={() => onSectionClick(section.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SectionList;