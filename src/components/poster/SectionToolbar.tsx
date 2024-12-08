import React from 'react';
import { 
  AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  Type, Image as ImageIcon, Table, Link2, Undo, Redo,
  Heading1, Heading2, Heading3
} from 'lucide-react';

interface SectionToolbarProps {
  onStyleChange: (style: any) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const SectionToolbar: React.FC<SectionToolbarProps> = ({
  onStyleChange,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false
}) => {
  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-gray-200 mx-2" />
  );

  const ToolbarButton = ({ 
    onClick, 
    title, 
    icon: Icon,
    isActive = false,
    disabled = false
  }: { 
    onClick: () => void;
    title: string;
    icon: typeof Bold;
    isActive?: boolean;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded-md transition-colors ${
        isActive 
          ? 'bg-indigo-100 text-indigo-700' 
          : disabled
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
      }`}
      title={title}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="flex items-center p-2 bg-white border-b border-gray-200 overflow-x-auto">
      <div className="flex items-center space-x-1">
        <select
          onChange={(e) => onStyleChange({ heading: e.target.value })}
          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-2"
        >
          <option value="">Normal Text</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <select
          onChange={(e) => onStyleChange({ fontSize: e.target.value })}
          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="text-sm">Small</option>
          <option value="text-base">Normal</option>
          <option value="text-lg">Large</option>
          <option value="text-xl">Extra Large</option>
        </select>
      </div>

      <ToolbarDivider />

      <div className="flex items-center space-x-1">
        <ToolbarButton
          onClick={() => onStyleChange({ fontWeight: 'bold' })}
          title="Bold"
          icon={Bold}
        />
        <ToolbarButton
          onClick={() => onStyleChange({ fontStyle: 'italic' })}
          title="Italic"
          icon={Italic}
        />
      </div>

      <ToolbarDivider />

      <div className="flex items-center space-x-1">
        <ToolbarButton
          onClick={() => onStyleChange({ textAlign: 'left' })}
          title="Align Left"
          icon={AlignLeft}
        />
        <ToolbarButton
          onClick={() => onStyleChange({ textAlign: 'center' })}
          title="Align Center"
          icon={AlignCenter}
        />
        <ToolbarButton
          onClick={() => onStyleChange({ textAlign: 'right' })}
          title="Align Right"
          icon={AlignRight}
        />
      </div>

      {(onUndo || onRedo) && (
        <>
          <ToolbarDivider />
          <div className="flex items-center space-x-1">
            <ToolbarButton
              onClick={onUndo!}
              title="Undo"
              icon={Undo}
              disabled={!canUndo}
            />
            <ToolbarButton
              onClick={onRedo!}
              title="Redo"
              icon={Redo}
              disabled={!canRedo}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SectionToolbar;