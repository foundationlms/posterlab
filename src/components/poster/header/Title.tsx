import React, { useState } from 'react';
import { HeaderStyles } from './types';

interface TitleProps {
  title: string;
  onChange: (title: string) => void;
  styles: HeaderStyles;
}

const Title: React.FC<TitleProps> = ({ title, onChange, styles }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsEditing(false);
    onChange(e.target.value);
  };

  return (
    <div className="mb-8">
      {isEditing ? (
        <textarea
          value={title}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          className="w-full text-4xl font-bold text-center border-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={2}
          autoFocus
          style={{ color: styles.titleColor }}
        />
      ) : (
        <h1
          className="text-4xl font-bold cursor-text"
          onClick={() => setIsEditing(true)}
          style={{ color: styles.titleColor }}
        >
          {title || 'Click to add title'}
        </h1>
      )}
    </div>
  );
};

export default Title;