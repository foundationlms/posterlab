import React, { useState, useRef, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

interface EditableTitleProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
  isActive?: boolean;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ 
  initialTitle, 
  onSave,
  isActive = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTitle(initialTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center min-w-0">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="block w-full px-2 py-1 text-sm border-2 border-indigo-500 rounded focus:outline-none"
        />
      ) : (
        <div className="flex items-center group w-full min-w-0">
          <h3 className={`text-sm font-medium truncate flex-1 ${
            isActive ? 'text-indigo-900' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-gray-100"
          >
            <Edit2 className={`h-4 w-4 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableTitle;