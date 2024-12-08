import React, { useState, useRef, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

interface SectionHeaderProps {
  name: string;
  onNameChange: (newName: string) => void;
  onAddContent: () => void;
  accentColor: string;
  actions?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  name,
  onNameChange,
  onAddContent,
  accentColor,
  actions
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (editedName.trim()) {
      onNameChange(editedName.trim());
    } else {
      setEditedName(name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditedName(name);
      setIsEditing(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering content editor
  };

  return (
    <div 
      className="px-4 py-3 border-b border-gray-200"
      style={{ backgroundColor: `${accentColor}10` }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-sm font-medium border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter section name..."
          />
        ) : (
          <div className="flex items-center group flex-1">
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-gray-100"
              title="Edit section name"
            >
              <Edit2 className="h-3 w-3 text-gray-400" />
            </button>
          </div>
        )}
        {actions}
      </div>
    </div>
  );
};

export default SectionHeader;