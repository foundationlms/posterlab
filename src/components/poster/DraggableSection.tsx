import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Copy, Trash2 } from 'lucide-react';
import { PosterSection } from '../../types/poster';

interface DraggableSectionProps {
  section: PosterSection;
  onDuplicate: (section: PosterSection) => void;
  onDelete: (sectionId: string) => void;
  onClick: () => void;
  isActive?: boolean;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  section,
  onDuplicate,
  onDelete,
  onClick,
  isActive = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 'auto'
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate(section);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(section.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`relative bg-white rounded-lg border-2 transition-colors ${
        isActive 
          ? 'border-indigo-500 shadow-md'
          : isDragging 
            ? 'border-gray-300 shadow-lg' 
            : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div 
        className={`flex items-center p-4 ${
          isActive ? 'bg-indigo-50' : 'bg-gray-50'
        }`}
      >
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center w-8 h-8 -ml-2 cursor-grab hover:bg-gray-100 rounded-full transition-colors"
        >
          <GripVertical className={`h-4 w-4 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`} />
        </div>

        <div className="flex-1 min-w-0 px-2">
          <h3 className={`text-sm font-medium truncate ${
            isActive ? 'text-indigo-900' : 'text-gray-900'
          }`}>
            {section.name}
          </h3>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleDuplicate}
            className="p-1 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            title="Duplicate section"
          >
            <Copy className="h-4 w-4" />
          </button>
          {!section.required && (
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
              title="Delete section"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {section.placeholder}
      </div>
    </div>
  );
};

export default DraggableSection;