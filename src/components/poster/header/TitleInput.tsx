import React from 'react';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
        Title
      </label>
      <textarea
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
        placeholder="Enter your poster title"
      />
    </div>
  );
};

export default TitleInput;