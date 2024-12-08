import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { PosterSection } from '../../types/poster';
import DraggableSection from './DraggableSection';

interface SectionManagerProps {
  sections: PosterSection[];
  onSectionsChange: (sections: PosterSection[]) => void;
  onSectionSelect: (sectionId: string) => void;
  activeSection?: string;
}

const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onSectionsChange,
  onSectionSelect,
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

  const handleDuplicate = (section: PosterSection) => {
    const newSection = {
      ...section,
      id: Math.random().toString(36).substr(2, 9),
      name: `${section.name} (Copy)`,
      required: false
    };

    onSectionsChange([...sections, newSection]);
  };

  const handleDelete = (sectionId: string) => {
    onSectionsChange(sections.filter(s => s.id !== sectionId));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext 
        items={sections.map(s => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {sections.map((section) => (
            <DraggableSection
              key={section.id}
              section={section}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onClick={() => onSectionSelect(section.id)}
              isActive={section.id === activeSection}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SectionManager;