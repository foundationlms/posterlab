import React from 'react';
import { PosterElement } from '../../types/poster';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableElement from './DraggableElement';

interface SectionContentProps {
  elements: PosterElement[];
  onElementsChange: (elements: PosterElement[]) => void;
  onElementClick: (element: PosterElement) => void;
}

const SectionContent: React.FC<SectionContentProps> = ({
  elements,
  onElementsChange,
  onElementClick
}) => {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = elements.findIndex(el => el.id === active.id);
      const newIndex = elements.findIndex(el => el.id === over.id);
      
      const newElements = [...elements];
      const [removed] = newElements.splice(oldIndex, 1);
      newElements.splice(newIndex, 0, removed);
      
      onElementsChange(newElements);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={elements.map(el => el.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {elements.map((element) => (
            <DraggableElement
              key={element.id}
              element={element}
              onClick={() => onElementClick(element)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SectionContent;