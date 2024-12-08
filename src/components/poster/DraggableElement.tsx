import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit2, Trash2 } from 'lucide-react';
import { PosterElement } from '../../types/poster';

interface DraggableElementProps {
  element: PosterElement;
  onClick: () => void;
  onDelete?: () => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  onClick,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onClick}
          className="p-1 rounded-full bg-white shadow-sm hover:bg-gray-50"
          title="Edit"
        >
          <Edit2 className="h-4 w-4 text-gray-600" />
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1 rounded-full bg-white shadow-sm hover:bg-gray-50"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        )}
      </div>

      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <div className="p-4 mt-2">
        {element.type === 'image' ? (
          <img
            src={element.content}
            alt=""
            className="w-full h-auto rounded"
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: element.content }} />
        )}
      </div>
    </div>
  );
};

export default DraggableElement;