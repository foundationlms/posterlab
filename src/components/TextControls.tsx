import React from 'react';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';

interface TextControlsProps {
  onStyleChange: (style: any) => void;
  isVisible: boolean;
  position: { x: number; y: number };
}

const TextControls: React.FC<TextControlsProps> = ({ onStyleChange, isVisible, position }) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50"
      style={{ top: position.y - 50, left: position.x }}
    >
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onStyleChange({ fontWeight: 'bold' })}
          className="p-1 hover:bg-gray-100 rounded"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => onStyleChange({ fontStyle: 'italic' })}
          className="p-1 hover:bg-gray-100 rounded"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <button
          onClick={() => onStyleChange({ textAlign: 'left' })}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onStyleChange({ textAlign: 'center' })}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          onClick={() => onStyleChange({ textAlign: 'right' })}
          className="p-1 hover:bg-gray-100 rounded"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <select
          onChange={(e) => onStyleChange({ fontSize: e.target.value })}
          className="text-sm border-gray-200 rounded"
          title="Font Size"
        >
          <option value="text-sm">Small</option>
          <option value="text-base">Normal</option>
          <option value="text-lg">Large</option>
          <option value="text-xl">Extra Large</option>
          <option value="text-2xl">Huge</option>
        </select>
      </div>
    </div>
  );
};

export default TextControls;