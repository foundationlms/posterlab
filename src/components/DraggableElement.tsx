import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DraggableElementProps {
  type: string;
  icon: LucideIcon;
  label: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, icon: Icon, label }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/posterlab', JSON.stringify({
      type,
      label
    }));
    e.dataTransfer.effectAllowed = 'copy';

    // Create drag preview
    const preview = document.createElement('div');
    preview.className = 'bg-white shadow-lg rounded p-2 pointer-events-none';
    preview.innerHTML = `<div class="flex items-center"><span class="mr-2">${label}</span></div>`;
    document.body.appendChild(preview);
    e.dataTransfer.setDragImage(preview, 0, 0);
    
    // Clean up preview after drag
    requestAnimationFrame(() => {
      document.body.removeChild(preview);
    });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center p-2 rounded cursor-move hover:bg-gray-50 transition-colors group"
    >
      <Icon className="h-4 w-4 text-gray-500 mr-2 group-hover:text-indigo-500" />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
      <div className="ml-auto opacity-0 group-hover:opacity-100">
        <div className="bg-gray-100 rounded-sm px-1.5 py-0.5">
          <span className="text-xs text-gray-500">Drag</span>
        </div>
      </div>
    </div>
  );
};

export default DraggableElement;