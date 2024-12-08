import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface HeaderSectionProps {
  content: string;
  onChange: (content: string) => void;
  styles: {
    fontFamily: string;
    titleColor: string;
    backgroundColor: string;
  };
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ content, onChange, styles }) => {
  const [isEditing, setIsEditing] = useState(false);

  const defaultContent = `
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold tracking-tight" style="color: ${styles.titleColor}">
        Your Research Title
      </h1>
      <div class="space-y-3">
        <p class="text-xl">
          Author One<sup>1</sup>, Author Two<sup>2</sup>, Author Three<sup>1</sup>
        </p>
        <div class="text-lg space-y-1 text-gray-600">
          <p><sup>1</sup>Department of Science, University Name</p>
          <p><sup>2</sup>Research Institute, Organization Name</p>
        </div>
        <p class="text-sm text-gray-500 mt-4">
          Corresponding author: author@email.com
        </p>
      </div>
    </div>
  `;

  const handleClick = () => {
    if (!content) {
      onChange(defaultContent);
    }
    setIsEditing(true);
  };

  return (
    <div
      className="relative rounded-lg border-2 border-gray-200 transition-colors overflow-hidden group"
      style={{
        backgroundColor: styles.backgroundColor,
        fontFamily: styles.fontFamily
      }}
      onClick={handleClick}
    >
      <div className="p-8">
        {content ? (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-400">
            <Edit2 className="h-8 w-8 mb-2" />
            <p className="text-sm">Click to add title and authors</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSection;